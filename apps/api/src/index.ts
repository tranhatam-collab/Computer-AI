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
import { getAppMap, getProductsByLane } from "@iai/product-registry";
import {
  createSubscription,
  cancelSubscription,
  generateInvoice,
  getUserInvoices,
  markInvoicePaid,
  buildInvoiceEmail,
  sendEmail,
} from "@iai/billing-sdk";
import { getCurrentUsage, getRemainingQuota } from "@iai/usage-sdk";
import { getDb, getPgPool, closePgPool } from "@iai/database";
import healthRoutes from "./routes/health.js";
import computerRoutes from "./routes/computers.js";
import commandRoutes from "./routes/commands.js";
import runRoutes from "./routes/runs.js";

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

// ── App map routes ──

app.get("/api/app-map", async () => {
  return { success: true, data: getAppMap() };
});

app.get<{ Params: { lane: string } }>("/api/app-map/:lane", async (req) => {
  return { success: true, data: getProductsByLane(req.params.lane as any) };
});

// ── Billing routes ──

app.post<{ Body: { userId: string; productId: string } }>("/api/subscriptions", async (req) => {
  const sub = createSubscription(req.body.userId, req.body.productId as any);
  return { success: true, data: sub };
});

app.post<{ Body: { userId: string; productId: string } }>("/api/subscriptions/cancel", async (req) => {
  cancelSubscription(req.body.userId, req.body.productId as any);
  return { success: true };
});

app.post<{ Body: { userId: string; productId: string; currency?: "USD" | "VND" } }>("/api/invoices", async (req) => {
  const inv = generateInvoice(req.body.userId, req.body.productId as any, req.body.currency);
  return { success: true, data: inv };
});

app.get<{ Params: { userId: string } }>("/api/invoices/:userId", async (req) => {
  return { success: true, data: getUserInvoices(req.params.userId) };
});

app.post<{ Body: { invoiceId: string } }>("/api/invoices/pay", async (req) => {
  markInvoicePaid(req.body.invoiceId);
  return { success: true };
});

app.post<{ Body: { userId: string; invoiceId: string } }>("/api/invoices/send", async (req) => {
  const invoices = getUserInvoices(req.body.userId);
  const inv = invoices.find((i) => i.id === req.body.invoiceId);
  if (!inv) return { success: false, error: "Invoice not found" };
  // fetch user email from db for demo
  const db = getDb();
  const user = db.prepare(`SELECT email, name FROM users WHERE id = ?`).get(req.body.userId) as any;
  if (!user) return { success: false, error: "User not found" };
  const email = buildInvoiceEmail(inv, user.email, user.name);
  await sendEmail(email);
  return { success: true };
});

// ── Push token routes ──

app.post<{ Body: { token: string }; Headers: { authorization?: string } }>("/api/push-token", async (req) => {
  const authToken = (req.headers.authorization || "").replace("Bearer ", "");
  const user = authToken ? authenticate(authToken) : null;
  if (!user) return { success: false, error: "Unauthorized" };
  const db = getDb();
  db.prepare(`INSERT OR REPLACE INTO push_tokens (user_id, token, platform, created_at) VALUES (?, ?, ?, ?)`)
    .run(user.id, req.body.token, "expo", Math.floor(Date.now() / 1000));
  return { success: true };
});

// ── Usage routes ──

app.get<{ Params: { userId: string; productId: string } }>("/api/usage/:userId/:productId", async (req) => {
  const usage = getCurrentUsage(req.params.userId, req.params.productId as any);
  const quota = getRemainingQuota(req.params.userId, req.params.productId as any);
  return { success: true, data: { usage, quota } };
});

// ── Health ──
app.register(healthRoutes, { prefix: "/api" });

// ── Computer, Command, Run routes ──
app.register(computerRoutes, { prefix: "/api" });
app.register(commandRoutes, { prefix: "/api" });
app.register(runRoutes, { prefix: "/api" });

// ── Startup / Shutdown ──

app.addHook("onReady", async () => {
  // Initialize PostgreSQL connection pool
  try {
    getPgPool();
    app.log.info("PostgreSQL pool initialized");
  } catch (err) {
    app.log.error({ err }, "Failed to initialize PostgreSQL pool");
    // Phase 1: don't crash if DB not available (fallback to SQLite)
  }
});

app.addHook("onClose", async () => {
  await closePgPool();
  app.log.info("PostgreSQL pool closed");
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
