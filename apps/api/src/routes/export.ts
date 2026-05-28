import type { FastifyInstance } from "fastify";

export default async function exportRoutes(fastify: FastifyInstance) {
  fastify.get("/export/calendar", async (request, reply) => {
    const { tenant_id, user_id, computer_id, format = "json" } = request.query as any;
    if (!tenant_id || !user_id || !computer_id) {
      return reply.status(400).send({ success: false, error: "Missing tenant_id, user_id, or computer_id" });
    }

    try {
      const { getCalendarEventsByUser } = await import("@iai/database");
      const events = await getCalendarEventsByUser(tenant_id, user_id, computer_id);

      if (format === "csv") {
        const rows = events.map((e) => [
          e.id, e.title, e.description || "", e.start_at?.toISOString() || "", e.end_at?.toISOString() || "", e.location || "", e.visibility || "", e.status || "",
        ].join(","));
        const csv = ["id,title,description,start_at,end_at,location,visibility,status", ...rows].join("\n");
        reply.header("Content-Type", "text/csv");
        reply.header("Content-Disposition", 'attachment; filename="calendar.csv"');
        return csv;
      }

      return { success: true, data: events, count: events.length };
    } catch (error) {
      return reply.status(500).send({ success: false, error: String(error) });
    }
  });

  fastify.get("/export/tasks", async (request, reply) => {
    const { tenant_id, user_id, computer_id, format = "json" } = request.query as any;
    if (!tenant_id || !user_id || !computer_id) {
      return reply.status(400).send({ success: false, error: "Missing tenant_id, user_id, or computer_id" });
    }

    try {
      const { getSmartTasksByUser } = await import("@iai/database");
      const tasks = await getSmartTasksByUser(tenant_id, user_id, computer_id);

      if (format === "csv") {
        const rows = tasks.map((t) => [
          t.id, t.title, t.description || "", t.state || "", t.priority || "", t.due_date?.toISOString() || "", t.created_at?.toISOString() || "",
        ].join(","));
        const csv = ["id,title,description,state,priority,due_date,created_at", ...rows].join("\n");
        reply.header("Content-Type", "text/csv");
        reply.header("Content-Disposition", 'attachment; filename="tasks.csv"');
        return csv;
      }

      return { success: true, data: tasks, count: tasks.length };
    } catch (error) {
      return reply.status(500).send({ success: false, error: String(error) });
    }
  });

  fastify.get("/export/evidence", async (request, reply) => {
    const { tenant_id, user_id, computer_id, limit = 50 } = request.query as any;
    if (!tenant_id || !user_id || !computer_id) {
      return reply.status(400).send({ success: false, error: "Missing tenant_id, user_id, or computer_id" });
    }

    try {
      const { getEvidencePacksByUser } = await import("@iai/database");
      const packs = await getEvidencePacksByUser(tenant_id, user_id, computer_id, Number(limit));
      return { success: true, data: packs, count: packs.length };
    } catch (error) {
      return reply.status(500).send({ success: false, error: String(error) });
    }
  });
}
