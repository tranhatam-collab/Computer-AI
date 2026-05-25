import Fastify from "fastify";
import { products, getPricing, getAllShells } from "@iai/product-registry";
import { route } from "@iai/routing-matrix";
import {
  assignRoute,
  createRun,
  getRun,
  listRuns,
  setOutput,
  updateRun,
  useStore
} from "@iai/workflow-engine";
import { createSqliteRunStore } from "@iai/database";
import { getPendingApprovals, approve, reject } from "@iai/approval-sdk";
import { createUser, login, logout, authenticate } from "@iai/auth-sdk";

const app = Fastify({ logger: true });
const PORT = parseInt(process.env.PORT || "3001", 10);

useStore(createSqliteRunStore());

// ── Product routes ──

app.get("/api/products", async () => {
  return { success: true, data: products };
});

app.get<{ Params: { id: string } }>("/api/products/:id", async (req) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return { success: false, error: "Product not found" };
  return { success: true, data: product };
});

app.get<{ Params: { id: string } }>("/api/products/:id/pricing", async (req) => {
  const pricing = getPricing(req.params.id as any);
  return { success: true, data: pricing };
});

app.get<{ Params: { id: string } }>("/api/products/:id/shell", async (req) => {
  const shell = getAllShells().find((s) => s.id === req.params.id);
  if (!shell) return { success: false, error: "Shell not found" };
  return { success: true, data: shell };
});

// ── Command route ──

app.post<{
  Body: { text: string; productId: string; sessionKey?: string };
}>("/api/command", async (req) => {
  const { text, productId, sessionKey = "anon" } = req.body;

  const product = products.find((p) => p.id === productId);
  if (!product) return { success: false, error: "Invalid productId" };

  const run = createRun(productId, text);
  updateRun(run.id, "queue");

  const routeResult = route({
    text,
    productId: productId as any,
    quotaState: { runsUsed: 0, outputCreditsUsed: 0, storageUsedMb: 0, resetAt: Date.now() + 86400000 },
    quotaLimits: { runsPerDay: 100, outputCredits: 50, storageMb: 500 },
    sessionKey,
  });
  assignRoute(run.id, routeResult);
  updateRun(run.id, "start");
  const verifyingRun = setOutput(run.id, {
    body: `Routed to ${routeResult.lane} via ${routeResult.model}`,
    format: "text",
    confidence: 0.65,
    artifacts: [],
  });
  const completedRun = updateRun(verifyingRun.id, "verify-pass");

  return { success: true, data: { run: completedRun, route: routeResult } };
});

// ── Run routes ──

app.post<{ Body: { productId: string; text: string } }>("/api/runs", async (req) => {
  const run = createRun(req.body.productId, req.body.text);
  return { success: true, data: run };
});

app.get<{ Params: { id: string } }>("/api/runs/:id", async (req) => {
  const run = getRun(req.params.id);
  if (!run) return { success: false, error: "Run not found" };
  return { success: true, data: run };
});

app.get("/api/runs", async () => {
  return { success: true, data: listRuns() };
});

// ── Approval routes ──

app.get("/api/approvals", async () => {
  return { success: true, data: getPendingApprovals("user_1") };
});

app.post<{ Params: { id: string } }>("/api/approvals/:id/approve", async (req) => {
  const result = approve(req.params.id, "user_1");
  if (!result) return { success: false, error: "Approval not found or not pending" };
  return { success: true, data: result };
});

app.post<{ Params: { id: string }; Body: { reason?: string } }>("/api/approvals/:id/reject", async (req) => {
  const result = reject(req.params.id, "user_1", req.body.reason || "Rejected");
  if (!result) return { success: false, error: "Approval not found or not pending" };
  return { success: true, data: result };
});

// ── Auth routes ──

app.post<{ Body: { email: string; name: string; locale?: "vi" | "en" } }>("/api/auth/register", async (req) => {
  const { email, name, locale = "vi" } = req.body;
  const user = createUser(email, name, locale);
  return { success: true, data: user };
});

app.post<{ Body: { email: string } }>("/api/auth/login", async (req) => {
  const result = login(req.body.email);
  if (!result) return { success: false, error: "Invalid credentials" };
  return { success: true, data: result };
});

app.post<{ Headers: { authorization?: string } }>("/api/auth/logout", async (req) => {
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  if (token) logout(token);
  return { success: true };
});

app.get<{ Headers: { authorization?: string } }>("/api/me", async (req) => {
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  const user = token ? authenticate(token) : null;
  if (!user) return { success: false, error: "Unauthorized" };
  return { success: true, data: user };
});

// ── Health ──

app.get("/api/health", async () => {
  return {
    success: true,
    data: { status: "ok", products: products.length, timestamp: new Date().toISOString() },
  };
});

// ── Start ──

async function start() {
  try {
    await app.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`API server running on http://localhost:${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
