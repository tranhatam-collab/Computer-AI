import type { FastifyInstance, FastifyRequest } from "fastify";
import { query } from "@iai/database/pg";
import { recordUsage } from "@iai/cost-governor";
import { generateWithFallback } from "@iai/providers";

export default async function runRoutes(app: FastifyInstance) {
  // List runs
  app.get("/api/runs", async (req: FastifyRequest<{ Querystring: { command_id?: string; instance_id?: string; user_id?: string } }>) => {
    const { command_id, instance_id, user_id } = req.query;
    const conditions: string[] = [];
    const params: string[] = [];

    if (command_id) { params.push(command_id); conditions.push(`command_id = $${params.length}`); }
    if (instance_id) { params.push(instance_id); conditions.push(`instance_id = $${params.length}`); }
    if (user_id) { params.push(user_id); conditions.push(`user_id = $${params.length}`); }

    const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
    const res = await query(
      `SELECT * FROM runs ${where} ORDER BY created_at DESC LIMIT 50`,
      params
    );
    return { success: true, data: res.rows };
  });

  // Get single run
  app.get<{ Params: { id: string } }>("/api/runs/:id", async (req) => {
    const res = await query(`SELECT * FROM runs WHERE id = $1`, [req.params.id]);
    if (res.rows.length === 0) return { success: false, error: "Not found" };
    return { success: true, data: res.rows[0] };
  });

  // Create run from approved command
  app.post("/api/runs", async (req: FastifyRequest<{ Body: { command_id: string; user_id: string; instance_id: string; run_type: string; sandbox_id?: string } }>) => {
    const { command_id, user_id, instance_id, run_type, sandbox_id } = req.body;

    // Verify command is approved
    const cmdRes = await query<{ status: string; command_type: string; payload: string; estimated_cost_cents: number }>(
      `SELECT status, command_type, payload, estimated_cost_cents FROM commands WHERE id = $1`,
      [command_id]
    );

    if (cmdRes.rows.length === 0) return { success: false, error: "Command not found" };
    const cmd = cmdRes.rows[0];

    if (cmd.status !== "approved") {
      return { success: false, error: `Command status is ${cmd.status}, must be approved` };
    }

    // Create run
    const runRes = await query<{ id: string }>(
      `INSERT INTO runs (command_id, instance_id, user_id, run_type, sandbox_id, status)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [command_id, instance_id, user_id, run_type, sandbox_id || null, "running"]
    );

    const runId = runRes.rows[0].id;

    // Update command status
    await query(
      `UPDATE commands SET status = 'running', updated_at = NOW() WHERE id = $1`,
      [command_id]
    );

    return { success: true, data: { id: runId, status: "running" } };
  });

  // Complete run with AI output
  app.post<{ Params: { id: string } }>("/api/runs/:id/complete", async (req: FastifyRequest<{ Params: { id: string }; Body: { output?: Record<string, unknown>; error?: string; cost_cents?: number; artifacts?: string[]; confidence_score?: number } }>) => {
    const { output, error, cost_cents = 0, artifacts, confidence_score } = req.body;
    const runId = req.params.id;

    // Get run info
    const runRes = await query<{ command_id: string; user_id: string; instance_id: string; run_type: string }>(
      `SELECT command_id, user_id, instance_id, run_type FROM runs WHERE id = $1`,
      [runId]
    );
    if (runRes.rows.length === 0) return { success: false, error: "Run not found" };
    const run = runRes.rows[0];

    const status = error ? "failed" : "completed";

    await query(
      `UPDATE runs
       SET status = $1, output = $2, error = $3, cost_cents = $4, artifacts = $5, confidence_score = $6, completed_at = NOW()
       WHERE id = $7`,
      [status, JSON.stringify(output || {}), error || null, cost_cents, artifacts || null, confidence_score || null, runId]
    );

    // Record usage if cost > 0
    if (cost_cents > 0) {
      await recordUsage({
        userId: run.user_id,
        instanceId: run.instance_id,
        runId,
        provider: "openai",
        model: "gpt-4o",
        inputTokens: 0,
        outputTokens: 0,
        costCents: cost_cents,
      });
    }

    // Update command to completed/failed
    await query(
      `UPDATE commands SET status = $1, updated_at = NOW() WHERE id = $2`,
      [status === "completed" ? "completed" : "failed", run.command_id]
    );

    return { success: true };
  });

  // Execute run with AI (direct endpoint for simple commands)
  app.post("/api/runs/execute", async (req: FastifyRequest<{ Body: { user_id: string; instance_id: string; messages: { role: string; content: string }[]; model?: string; max_tokens?: number } }>) => {
    const { user_id, instance_id, messages, model = "gpt-4o", max_tokens = 1024 } = req.body;

    try {
      const result = await generateWithFallback({
        model,
        messages: messages as { role: "system" | "user" | "assistant"; content: string }[],
        maxTokens: max_tokens,
      });

      // Record usage
      await recordUsage({
        userId: user_id,
        instanceId: instance_id,
        provider: result.provider,
        model: result.response.model,
        inputTokens: result.cost.inputTokens,
        outputTokens: result.cost.outputTokens,
        costCents: Math.ceil(result.cost.costCents),
      });

      return {
        success: true,
        data: {
          content: result.response.content,
          provider: result.provider,
          cost_cents: result.cost.costCents,
        },
      };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : String(err),
      };
    }
  });
}
