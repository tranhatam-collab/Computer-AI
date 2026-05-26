import type { FastifyInstance, FastifyRequest } from "fastify";
import { query } from "@iai/database/pg";
import { checkCostLimit } from "@iai/cost-governor";

export default async function commandRoutes(app: FastifyInstance) {
  // List commands for user/instance
  app.get("/api/commands", async (req: FastifyRequest<{ Querystring: { user_id?: string; instance_id?: string } }>) => {
    const { user_id, instance_id } = req.query;
    if (!user_id && !instance_id) return { success: false, error: "user_id or instance_id required" };

    const conditions: string[] = [];
    const params: string[] = [];
    if (user_id) { params.push(user_id); conditions.push(`user_id = $${params.length}`); }
    if (instance_id) { params.push(instance_id); conditions.push(`instance_id = $${params.length}`); }

    const res = await query(
      `SELECT * FROM commands WHERE ${conditions.join(" AND ")} ORDER BY created_at DESC LIMIT 50`,
      params
    );
    return { success: true, data: res.rows };
  });

  // Get single command
  app.get<{ Params: { id: string } }>("/api/commands/:id", async (req) => {
    const res = await query(`SELECT * FROM commands WHERE id = $1`, [req.params.id]);
    if (res.rows.length === 0) return { success: false, error: "Not found" };
    return { success: true, data: res.rows[0] };
  });

  // Create command
  app.post("/api/commands", async (req: FastifyRequest<{ Body: { user_id: string; instance_id: string; command_type: string; intent?: string; payload?: Record<string, unknown>; estimated_cost_cents?: number } }>) => {
    const { user_id, instance_id, command_type, intent, payload, estimated_cost_cents = 0 } = req.body;

    // Validate command_type
    const validTypes = ["chat", "code_run", "browser", "file_process", "agent_task", "workflow", "self_upgrade", "deploy"];
    if (!validTypes.includes(command_type)) {
      return { success: false, error: `Invalid command_type. Must be one of: ${validTypes.join(", ")}` };
    }

    // Check cost limit
    const costCheck = await checkCostLimit({
      userId: user_id,
      instanceId: instance_id,
      estimatedCostCents: estimated_cost_cents,
      provider: "openai",
      model: "gpt-4o",
    });

    if (!costCheck.allowed) {
      return { success: false, error: costCheck.reason, cost: costCheck };
    }

    // Check if approval required
    const approvalRes = await query<{ required_approval: boolean }>(
      `SELECT required_approval FROM computer_approval_policies
       WHERE instance_id = $1 AND action_type = $2`,
      [instance_id, command_type]
    );

    const needsApproval = (approvalRes.rows[0]?.required_approval || false) || costCheck.requireApproval;
    const status = needsApproval ? "pending" : "approved";

    const res = await query<{ id: string }>(
      `INSERT INTO commands (user_id, instance_id, command_type, intent, payload, estimated_cost_cents, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id`,
      [user_id, instance_id, command_type, intent || null, JSON.stringify(payload || {}), estimated_cost_cents, status]
    );

    return {
      success: true,
      data: { id: res.rows[0].id, status, needs_approval: needsApproval },
      cost: costCheck,
    };
  });

  // Approve command
  app.post("/api/commands/:id/approve", async (req: FastifyRequest<{ Params: { id: string }; Body: { approved_by: string } }>) => {
    const { approved_by } = req.body;

    await query(
      `UPDATE commands SET status = 'approved', approved_by = $1, approved_at = NOW(), updated_at = NOW() WHERE id = $2`,
      [approved_by, req.params.id]
    );

    return { success: true };
  });

  // Reject command
  app.post("/api/commands/:id/reject", async (req: FastifyRequest<{ Params: { id: string }; Body: { reason?: string } }>) => {
    await query(
      `UPDATE commands SET status = 'rejected', updated_at = NOW() WHERE id = $1`,
      [req.params.id]
    );
    return { success: true };
  });
}
