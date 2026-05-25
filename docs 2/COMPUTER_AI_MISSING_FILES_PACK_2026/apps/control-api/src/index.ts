import { routeIntent } from "@iai/routing-matrix";
import { createRun, transitionRun } from "@iai/workflow-engine";

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET,POST,OPTIONS",
      "access-control-allow-headers": "content-type,authorization"
    }
  });
}

async function readJson(request: Request): Promise<Record<string, unknown>> {
  try { return await request.json() as Record<string, unknown>; } catch { return {}; }
}

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") return json({ ok: true });
    if (url.pathname === "/v1/health") return json({ ok: true, service: "computer-control-api", status: "healthy" });
    if (url.pathname === "/v1/route" && request.method === "POST") {
      const body = await readJson(request);
      const text = typeof body.text === "string" ? body.text : "";
      const userPlan = typeof body.userPlan === "string" ? body.userPlan : "free";
      return json({ ok: true, decision: routeIntent({ text, userPlan }) });
    }
    if (url.pathname === "/v1/runs" && request.method === "POST") {
      const body = await readJson(request);
      const run = createRun({
        productId: typeof body.productId === "string" ? body.productId : "free",
        userId: typeof body.userId === "string" ? body.userId : "anonymous",
        workspaceId: typeof body.workspaceId === "string" ? body.workspaceId : undefined,
        input: typeof body.input === "string" ? body.input : ""
      });
      return json({ ok: true, run: transitionRun(run, "planned") });
    }
    return json({ ok: false, error: "not_found" }, 404);
  }
};
