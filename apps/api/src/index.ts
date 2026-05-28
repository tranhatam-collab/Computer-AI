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
import { createPgRunStore } from "@iai/database";
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
import type { Invoice as BillingInvoice } from "@iai/billing-sdk";
import { getCurrentUsage, getRemainingQuota } from "@iai/usage-sdk";
import { getPgPool, closePgPool, getUserById, createPushToken } from "@iai/database";
import observabilityRoutes, { logRequest, logAuditFailure } from "./observability.js";
import computerRoutes from "./routes/computers.js";
import commandRoutes from "./routes/commands.js";
import runRoutes from "./routes/runs.js";
import authRoutes, { getUserFromToken } from "./routes/auth.js";
import browserRoutes from "./routes/browser.js";
import calendarRoutes from "./routes/calendar.js";
import exportRoutes from "./routes/export.js";
import { authenticate } from "@iai/auth-sdk";

const app = Fastify({ logger: true });
const PORT = parseInt(process.env.PORT || "3001", 10);
let startupReady = false;
let startupError: string | null = null;

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

// Security headers
app.addHook("onSend", async (request, reply, payload) => {
  reply.header("X-Content-Type-Options", "nosniff");
  reply.header("X-Frame-Options", "DENY");
  reply.header("X-XSS-Protection", "1; mode=block");
  reply.header("Referrer-Policy", "strict-origin-when-cross-origin");
  reply.header("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
  reply.header("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  reply.header("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'");
  return payload;
});

// Structured request logging (no PII)
app.addHook("onResponse", async (request, reply) => {
  logRequest(request, reply, (request as any).reqStartTime || Date.now());
});

// Attach start time for latency measurement
app.addHook("onRequest", async (request) => {
  (request as any).reqStartTime = Date.now();
});

// Audit logging for mutations
const AUDIT_ACTIONS = ["POST", "PATCH", "DELETE", "PUT"];
app.addHook("onResponse", async (request, reply) => {
  if (AUDIT_ACTIONS.includes(request.method)) {
    try {
      const { createAuditEntry } = await import("@iai/auth-sdk");
      const actorId = (request as any).user?.id;
      await createAuditEntry({
        entityType: "api_request",
        entityId: request.id as string,
        action: `${request.method} ${request.routerPath || request.url}`,
        actorId,
        actorType: actorId ? "user" : "system",
        metadata: {
          statusCode: reply.statusCode,
          params: request.params,
          query: request.query,
        },
        ipAddress: request.ip,
        userAgent: request.headers["user-agent"],
      });
    } catch (err) {
      logAuditFailure(request, err);
    }
  }
});

async function initStore() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required for PostgreSQL run store.");
  }
  const pgStore = await createPgRunStore();
  useStore(pgStore);
  console.log('✅ PostgreSQL run store initialized');
}

async function initializeDatabase() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required. PostgreSQL-only production path enforced.");
  }
  const { initDatabase } = await import('@iai/database');
  await initDatabase();
  console.log('✅ PostgreSQL database initialized');
}

async function generateInvoiceForUser(
  userId: string,
  productId: string,
  currency: "USD" | "VND" = "USD"
): Promise<BillingInvoice> {
  return generateInvoice(userId, productId as any, currency);
}

async function getInvoicesForUser(userId: string): Promise<BillingInvoice[]> {
  return getUserInvoices(userId);
}

async function markInvoicePaidById(invoiceId: string): Promise<void> {
  await markInvoicePaid(invoiceId);
}

async function getUserForInvoice(userId: string): Promise<{ email: string; name: string } | null> {
  return getUserById(userId);
}

async function savePushToken(userId: string, token: string): Promise<void> {
  await createPushToken(userId, token, "expo");
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
  const inv = await generateInvoiceForUser(req.body.userId, req.body.productId, req.body.currency);
  return { success: true, data: inv };
});

app.get<{ Params: { userId: string } }>("/api/invoices/:userId", async (req) => {
  return { success: true, data: await getInvoicesForUser(req.params.userId) };
});

app.post<{ Body: { invoiceId: string } }>("/api/invoices/pay", async (req) => {
  await markInvoicePaidById(req.body.invoiceId);
  return { success: true };
});

app.post<{ Body: { userId: string; invoiceId: string } }>("/api/invoices/send", async (req) => {
  const invoices = await getInvoicesForUser(req.body.userId);
  const inv = invoices.find((i) => i.id === req.body.invoiceId);
  if (!inv) return { success: false, error: "Invoice not found" };
  // fetch user email from db for demo
  const user = await getUserForInvoice(req.body.userId);
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
  await savePushToken(user.id, req.body.token);
  return { success: true };
});

// ── Usage routes ──

app.get<{ Params: { userId: string; productId: string } }>("/api/usage/:userId/:productId", async (req) => {
  const usage = getCurrentUsage(req.params.userId, req.params.productId as any);
  const quota = getRemainingQuota(req.params.userId, req.params.productId as any);
  return { success: true, data: { usage, quota } };
});

// ── Health / Observability ──
app.register(observabilityRoutes, { prefix: "/api" });

app.get("/api/startup", async () => {
  return {
    ready: startupReady,
    error: startupError,
  };
});

// ── Computer, Command, Run routes ──
app.register(computerRoutes, { prefix: "/api" });
app.register(commandRoutes, { prefix: "/api" });
app.register(runRoutes, { prefix: "/api" });
app.register(authRoutes, { prefix: "/api" });

// ── AI Browser and Smart Calendar routes ──
app.register(browserRoutes, { prefix: "/api" });
app.register(calendarRoutes, { prefix: "/api" });
app.register(exportRoutes, { prefix: "/api" });

// ── Startup / Shutdown ──

app.addHook("onReady", async () => {
  if (!process.env.DATABASE_URL) {
    app.log.warn("DATABASE_URL not set — PostgreSQL pool unavailable");
    return;
  }

  try {
    await getPgPool();
    app.log.info("PostgreSQL pool initialized");
  } catch (err) {
    app.log.error({ err }, "Failed to initialize PostgreSQL pool");
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

    try {
      // Initialize run store and migrations after listen so platform health
      // checks can distinguish process liveness from external readiness.
      await initStore();
      await initializeDatabase();
      startupReady = true;
      startupError = null;
    } catch (err) {
      startupReady = false;
      startupError = err instanceof Error ? err.message : String(err);
      app.log.error({ err }, "Startup initialization failed");
    }
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
