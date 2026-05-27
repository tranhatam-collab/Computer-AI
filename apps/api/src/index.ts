import dotenv from "dotenv";
import Fastify from "fastify";
import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

dotenv.config({ path: ".env.local" });
dotenv.config();
import fastifyCors from "@fastify/cors";
import fastifyRateLimit from "@fastify/rate-limit";
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
import { createSqliteRunStore, createPgRunStore } from "@iai/database";
import { getPendingApprovals, approve, reject } from "@iai/approval-sdk";
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
import authRoutes, { getUserFromToken } from "./routes/auth.js";
import browserRoutes from "./routes/browser.js";
import calendarRoutes from "./routes/calendar.js";
import { authenticate } from "@iai/auth-sdk";

const app = Fastify({ logger: true });
const PORT = parseInt(process.env.PORT || "3001", 10);

const allowedOrigins = (process.env.CONTROL_API_ALLOWED_ORIGINS || "http://localhost:5173,https://computer.iai.one")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.register(fastifyCors, {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (allowedOrigins.includes("*") || allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error("Origin not allowed"), false);
  },
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
});

app.register(fastifyRateLimit, {
  global: false,
  max: 60,
  timeWindow: "1 minute",
});

async function initStore() {
  if (process.env.DATABASE_URL) {
    const pgStore = await createPgRunStore();
    useStore(pgStore);
    console.log('✅ PostgreSQL run store initialized');
  } else {
    const sqliteStore = await createSqliteRunStore();
    useStore(sqliteStore);
    console.log('⚠️ SQLite run store (fallback — no DATABASE_URL)');
  }
}

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

  const run = await createRun(productId, text);
  await updateRun(run.id, "queue");

  const routeResult = route({
    text,
    productId: productId as any,
    quotaState: { runsUsed: 0, outputCreditsUsed: 0, storageUsedMb: 0, resetAt: Date.now() + 86400000 },
    quotaLimits: { runsPerDay: 100, outputCredits: 50, storageMb: 500 },
    sessionKey,
  });
  await assignRoute(run.id, routeResult);
  await updateRun(run.id, "start");
  const verifyingRun = await setOutput(run.id, {
    body: `Routed to ${routeResult.lane} via ${routeResult.model}`,
    format: "text",
    confidence: 0.65,
    artifacts: [],
  });
  const completedRun = await updateRun(verifyingRun.id, "verify-pass");

  return { success: true, data: { run: completedRun, route: routeResult } };
});

// ── Run routes ──

app.post<{ Body: { productId: string; text: string } }>("/api/runs", async (req) => {
  const run = await createRun(req.body.productId, req.body.text);
  return { success: true, data: run };
});

app.get<{ Params: { id: string } }>("/api/runs/:id", async (req) => {
  const run = await getRun(req.params.id);
  if (!run) return { success: false, error: "Run not found" };
  return { success: true, data: run };
});

app.get("/api/runs", async () => {
  return { success: true, data: await listRuns() };
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

// ── App map routes ──

app.get("/api/app-map", async () => {
  return { success: true, data: getAppMap() };
});

app.get<{ Params: { lane: string } }>("/api/app-map/:lane", async (req) => {
  return { success: true, data: getProductsByLane(req.params.lane as any) };
});

// ── Checkout route (pay.iai.one hub) ──

function asciiSlug(input: string, maxLen = 25): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/gi, "d")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .slice(0, maxLen);
}

app.post<{
  Body: { productId: string; cycle?: "monthly" | "annual"; locale?: "vi" | "en" };
  Headers: { authorization?: string };
}>("/api/checkout/session", {
  config: { rateLimit: { max: 10, timeWindow: "1 minute" } },
}, async (req) => {
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  const user = token
    ? (authenticate(token) || (await getUserFromToken(token).catch(() => null)))
    : null;
  if (!user) return { success: false, error: "Unauthorized", code: "UNAUTHORIZED" };

  const { productId, cycle = "monthly", locale = "vi" } = req.body;
  const product = products.find((p) => p.id === productId);
  if (!product) return { success: false, error: "Product not found" };

  const pricing = getPricing(productId as any);
  const amount = cycle === "annual" ? pricing.annualVnd : pricing.monthlyVnd;
  if (!amount) {
    return { success: false, error: "Product has no VND price for this cycle" };
  }

  const siteKey = process.env.PAY_IAI_ONE_SITE_KEY;
  if (!siteKey) {
    return { success: false, error: "Payment is not configured yet", code: "PAYMENT_NOT_CONFIGURED" };
  }

  const baseUrl = process.env.PAY_IAI_ONE_BASE_URL || "https://pay.iai.one";
  const siteCode = process.env.COMPUTER_SITE_CODE || "computer-iai";
  const tenantCode = process.env.COMPUTER_TENANT_CODE || "iai";
  const publicBase = process.env.VITE_COMPUTER_PUBLIC_BASE_URL || "https://computer.iai.one";
  const apiPublicUrl = process.env.COMPUTER_API_PUBLIC_URL;
  const internalOrderId = `computer-${randomUUID()}`;
  const idempotencyKey = internalOrderId;

  const payload: Record<string, unknown> = {
    tenant_code: tenantCode,
    site_code: siteCode,
    provider: "payos",
    currency: "VND",
    billing_cycle: "one_time",
    internal_order_id: internalOrderId,
    amount,
    description: asciiSlug(product.name, 25),
    success_url: `${publicBase}/thank-you?order=${internalOrderId}`,
    cancel_url: `${publicBase}/pricing`,
    email: (user as any).email || undefined,
    user_id: (user as any).id || undefined,
    locale,
    metadata: { product_id: productId, cycle },
  };

  if (apiPublicUrl) {
    payload.callback_url = `${apiPublicUrl}/api/webhooks/payment`;
  }

  try {
    const res = await fetch(`${baseUrl}/internal/checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-site-key": siteKey,
        "x-idempotency-key": idempotencyKey,
      },
      body: JSON.stringify(payload),
    });

    const json = await res.json().catch(() => ({ ok: false, message: "Invalid JSON from payment hub" }));
    if (!res.ok || !json.ok) {
      return { success: false, error: json.message || json.code || "Payment hub error", code: json.code };
    }

    return {
      success: true,
      data: {
        checkout_url: json.checkout_url || null,
        internal_order_id: internalOrderId,
        provider_order_id: json.provider_order_id || null,
      },
    };
  } catch (err: any) {
    return { success: false, error: err.message || "Network error to payment hub", code: "NETWORK_ERROR" };
  }
});

// ── Payment webhook from pay.iai.one (member webhook callback) ──

app.post<{
  Body: Record<string, unknown>;
  Headers: { "x-pay-signature"?: string; "x-pay-timestamp"?: string };
}>("/api/webhooks/payment", {
  config: { rateLimit: { max: 120, timeWindow: "1 minute" } },
}, async (req) => {
  const sig = req.headers["x-pay-signature"];
  const timestamp = req.headers["x-pay-timestamp"];
  const expectedSecret = process.env.PAY_IAI_ONE_WEBHOOK_SECRET;
  if (expectedSecret && (!sig || !timestamp)) {
    return { success: false, error: "Missing signature" };
  }
  if (expectedSecret && sig && timestamp) {
    const bodyStr = JSON.stringify(req.body);
    const expectedSig = createHmac("sha256", expectedSecret).update(`${timestamp}.${bodyStr}`).digest("hex");
    const received = Buffer.from(sig, "hex");
    const expected = Buffer.from(expectedSig, "hex");
    if (received.length !== expected.length || !timingSafeEqual(received, expected)) {
      app.log.warn({ sig: "present" }, "Invalid webhook signature");
      return { success: false, error: "Invalid signature" };
    }
  }
  app.log.info({ body: req.body, sig: sig ? "verified" : "absent" }, "pay.iai.one member webhook");
  // Phase 1: ack-only. Fulfillment (subscription activation, email) wired in Phase 2.
  return { success: true, received: true };
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
  const user = authToken ? await getUserFromToken(authToken) : null;
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
app.register(authRoutes, { prefix: "/api" });

// ── AI Browser and Smart Calendar routes ──
app.register(browserRoutes, { prefix: "/api" });
app.register(calendarRoutes, { prefix: "/api" });

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
    // Initialize run store (PostgreSQL preferred, SQLite fallback)
    await initStore();
    
    // Initialize database
    const { initDatabase } = await import('@iai/database');
    await initDatabase();
    console.log('✅ Database initialized');
    
    await app.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`API server running on http://localhost:${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
