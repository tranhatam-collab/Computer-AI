import Fastify from "fastify";
import { products, getPricing, getAllShells } from "@iai/product-registry";
import { route } from "@iai/routing-matrix";
import { createRun, getRun, listRuns } from "@iai/workflow-engine";

const app = Fastify({ logger: true });
const PORT = parseInt(process.env.PORT || "3001", 10);

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

  const routeResult = route({
    text,
    productId: productId as any,
    quotaState: { runsUsed: 0, outputCreditsUsed: 0, storageUsedMb: 0, resetAt: Date.now() + 86400000 },
    quotaLimits: { runsPerDay: 100, outputCredits: 50, storageMb: 500 },
    sessionKey,
  });

  return { success: true, data: routeResult };
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
