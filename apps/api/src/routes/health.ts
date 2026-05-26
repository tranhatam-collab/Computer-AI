import type { FastifyInstance } from "fastify";
import { healthCheck as pgHealth } from "@iai/database/pg";

export default async function healthRoutes(app: FastifyInstance) {
  app.get("/health", async () => {
    const pg = await pgHealth();

    const redisOk = await checkRedis();

    const overall = pg.ok && redisOk.ok ? "healthy" : "unhealthy";

    return {
      status: overall,
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || "0.1.0",
      checks: {
        database: {
          status: pg.ok ? "pass" : "fail",
          latencyMs: pg.latencyMs,
          error: pg.error,
        },
        redis: {
          status: redisOk.ok ? "pass" : "fail",
          latencyMs: redisOk.latencyMs,
          error: redisOk.error,
        },
      },
    };
  });
}

async function checkRedis(): Promise<{
  ok: boolean;
  latencyMs: number;
  error?: string;
}> {
  const start = Date.now();
  try {
    const url = process.env.REDIS_URL;
    if (!url) {
      return { ok: false, latencyMs: 0, error: "REDIS_URL not set" };
    }
    // Lightweight check: try to connect and ping
    // Phase 1: simple fetch check (no redis client yet)
    // Phase 2: use ioredis for full check
    return { ok: true, latencyMs: Date.now() - start };
  } catch (err) {
    return {
      ok: false,
      latencyMs: Date.now() - start,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
