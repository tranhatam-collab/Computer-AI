import type { FastifyInstance, FastifyRequest } from "fastify";
import { query } from "@iai/database/pg";

export default async function computerRoutes(app: FastifyInstance) {
  // List user's computer instances
  app.get("/api/computers", async (req: FastifyRequest<{ Querystring: { user_id?: string } }>) => {
    const userId = req.query.user_id;
    if (!userId) return { success: false, error: "user_id required" };

    const res = await query(
      `SELECT id, name, template_id, status, region, created_at, last_active_at
       FROM computer_instances
       WHERE user_id = $1 AND deleted_at IS NULL
       ORDER BY created_at DESC`,
      [userId]
    );
    return { success: true, data: res.rows };
  });

  // Get single instance
  app.get<{ Params: { id: string } }>("/api/computers/:id", async (req) => {
    const res = await query(
      `SELECT * FROM computer_instances WHERE id = $1 AND deleted_at IS NULL`,
      [req.params.id]
    );
    if (res.rows.length === 0) return { success: false, error: "Not found" };
    return { success: true, data: res.rows[0] };
  });

  // Create instance from template
  app.post("/api/computers", async (req: FastifyRequest<{ Body: { user_id: string; template_id: string; name?: string } }>) => {
    const { user_id, template_id, name } = req.body;

    // Get template
    const templateRes = await query<{ id: string; name: string; tier: string }>(
      `SELECT id, name, tier FROM computer_templates WHERE id = $1`,
      [template_id]
    );
    if (templateRes.rows.length === 0) {
      return { success: false, error: "Template not found" };
    }
    const template = templateRes.rows[0];

    // Create instance
    const instanceRes = await query<{ id: string }>(
      `INSERT INTO computer_instances (user_id, template_id, name, status)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [user_id, template_id, name || `${template.name} Instance`, "inactive"]
    );

    const instanceId = instanceRes.rows[0].id;

    // Create default cost policy
    const defaultLimits: Record<string, { daily: number; monthly: number; perCmd: number }> = {
      free: { daily: 0, monthly: 0, perCmd: 0 },
      personal: { daily: 1500, monthly: 5000, perCmd: 100 },
      creator: { daily: 3000, monthly: 10000, perCmd: 100 },
      business: { daily: 10000, monthly: 50000, perCmd: 500 },
      enterprise: { daily: 50000, monthly: 200000, perCmd: 1000 },
    };
    const limits = defaultLimits[template.tier] || defaultLimits.personal;

    await query(
      `INSERT INTO computer_cost_policies (instance_id, daily_max_cents, monthly_max_cents, per_command_max_cents)
       VALUES ($1, $2, $3, $4)`,
      [instanceId, limits.daily, limits.monthly, limits.perCmd]
    );

    // Create default approval policy
    await query(
      `INSERT INTO computer_approval_policies (instance_id, action_type, required_approval)
       VALUES
       ($1, 'email_send', true),
       ($1, 'dns_change', true),
       ($1, 'public_deploy', true),
       ($1, 'payment', true),
       ($1, 'secret_access', true),
       ($1, 'data_export', true),
       ($1, 'model_escalation', true),
       ($1, 'self_upgrade', true),
       ($1, 'code_execution', false),
       ($1, 'browser_automation', false)`,
      [instanceId]
    );

    return { success: true, data: { id: instanceId, status: "inactive" } };
  });

  // Update instance status
  app.patch("/api/computers/:id", async (req: FastifyRequest<{ Params: { id: string }; Body: { status?: string; name?: string } }>) => {
    const { status, name } = req.body;
    const sets: string[] = [];
    const vals: (string | null)[] = [];
    let idx = 1;

    if (status) { sets.push(`status = $${idx++}`); vals.push(status); }
    if (name) { sets.push(`name = $${idx++}`); vals.push(name); }
    if (status === "running") { sets.push(`last_active_at = NOW()`); }

    if (sets.length === 0) return { success: false, error: "No fields to update" };

    vals.push(req.params.id);
    await query(
      `UPDATE computer_instances SET ${sets.join(", ")}, updated_at = NOW() WHERE id = $${idx}`,
      vals
    );

    return { success: true };
  });

  // Soft delete instance
  app.delete<{ Params: { id: string } }>("/api/computers/:id", async (req) => {
    await query(
      `UPDATE computer_instances SET deleted_at = NOW(), status = 'terminated' WHERE id = $1`,
      [req.params.id]
    );
    return { success: true };
  });
}
