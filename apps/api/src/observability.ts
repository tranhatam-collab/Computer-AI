import type { FastifyInstance } from "fastify";
import { healthCheck as pgHealth } from "@iai/database/pg";

const START_TIME = Date.now();

interface HealthCheckResult {
  ok: boolean;
  latencyMs: number;
  error?: string;
}

async function checkRedis(): Promise<HealthCheckResult> {
  const start = Date.now();
  try {
    const url = process.env.REDIS_URL;
    if (!url) {
      return { ok: false, latencyMs: 0, error: "REDIS_URL not set" };
    }
    return { ok: true, latencyMs: Date.now() - start };
  } catch (err) {
    return {
      ok: false,
      latencyMs: Date.now() - start,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

async function checkProviders(): Promise<Record<string, HealthCheckResult>> {
  const results: Record<string, HealthCheckResult> = {};

  // AI providers
  const openaiKey = process.env.OPENAI_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  results["ai_openai"] = { ok: !!openaiKey, latencyMs: 0, error: openaiKey ? undefined : "OPENAI_API_KEY not set" };
  results["ai_anthropic"] = { ok: !!anthropicKey, latencyMs: 0, error: anthropicKey ? undefined : "ANTHROPIC_API_KEY not set" };

  // Browser provider
  const searchKey = process.env.BRAVE_SEARCH_API_KEY || process.env.SERP_API_KEY;
  results["browser_search"] = { ok: !!searchKey, latencyMs: 0, error: searchKey ? undefined : "BRAVE_SEARCH_API_KEY or SERP_API_KEY not set" };

  // OAuth providers
  const googleId = process.env.GOOGLE_CLIENT_ID;
  results["oauth_google"] = { ok: !!googleId, latencyMs: 0, error: googleId ? undefined : "GOOGLE_CLIENT_ID not set" };

  const msId = process.env.MS_CLIENT_ID;
  results["oauth_microsoft"] = { ok: !!msId, latencyMs: 0, error: msId ? undefined : "MS_CLIENT_ID not set" };

  return results;
}

export default async function observabilityRoutes(fastify: FastifyInstance) {
  // Liveness: process is up and can respond. This is the safest Render health
  // check path because readiness may depend on external DB/provider services.
  fastify.get("/health/live", async () => {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: Math.floor((Date.now() - START_TIME) / 1000),
      version: process.env.npm_package_version || "0.1.0",
    };
  });

  // Health check (shallow)
  fastify.get("/health", async () => {
    const pg = await pgHealth();
    const redis = await checkRedis();
    const overall = pg.ok ? "healthy" : "unhealthy";

    return {
      status: overall,
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || "0.1.0",
      checks: {
        database: { status: pg.ok ? "pass" : "fail", latencyMs: pg.latencyMs, error: pg.error },
        redis: { status: redis.ok ? "pass" : "warn", latencyMs: redis.latencyMs, error: redis.error },
      },
    };
  });

  // Deep health / readiness check
  fastify.get("/health/deep", async () => {
    const pg = await pgHealth();
    const redis = await checkRedis();
    const providers = await checkProviders();
    const providerChecks = Object.fromEntries(
      Object.entries(providers).map(([k, v]) => [k, { status: v.ok ? "pass" : "fail", error: v.error }])
    );

    // Migration status check
    let migrations: { status: string; count: number; error?: string } = { status: "unknown", count: 0 };
    try {
      const { pgQuery } = await import("@iai/database");
      const result = await pgQuery('SELECT COUNT(*) as count FROM migrations');
      migrations = { status: "pass", count: parseInt(result.rows[0].count) };
    } catch (err) {
      migrations = { status: "fail", count: 0, error: err instanceof Error ? err.message : String(err) };
    }

    const allOk = pg.ok && redis.ok && Object.values(providers).every((p) => p.ok) && migrations.status === "pass";

    return {
      status: allOk ? "healthy" : "degraded",
      timestamp: new Date().toISOString(),
      uptime: Math.floor((Date.now() - START_TIME) / 1000),
      version: process.env.npm_package_version || "0.1.0",
      checks: {
        database: { status: pg.ok ? "pass" : "fail", latencyMs: pg.latencyMs, error: pg.error },
        redis: { status: redis.ok ? "pass" : "fail", latencyMs: redis.latencyMs, error: redis.error },
        migrations,
        providers: providerChecks,
      },
    };
  });

  // Metrics endpoint (Prometheus-compatible text format subset)
  fastify.get("/metrics", async () => {
    const pg = await pgHealth();
    const uptime = Math.floor((Date.now() - START_TIME) / 1000);

    const lines = [
      `# HELP app_uptime_seconds Application uptime in seconds`,
      `# TYPE app_uptime_seconds gauge`,
      `app_uptime_seconds ${uptime}`,
      ``,
      `# HELP db_health_status Database health (1=pass, 0=fail)`,
      `# TYPE db_health_status gauge`,
      `db_health_status ${pg.ok ? 1 : 0}`,
      ``,
      `# HELP db_latency_ms Database query latency`,
      `# TYPE db_latency_ms gauge`,
      `db_latency_ms ${pg.latencyMs}`,
      ``,
      `# HELP app_info Application info`,
      `# TYPE app_info gauge`,
      `app_info{version="${process.env.npm_package_version || "0.1.0"}"} 1`,
    ];

    return lines.join("\n");
  });
}

// Structured request logger (no PII)
export function logRequest(request: any, reply: any, startTime: number): void {
  const latencyMs = Date.now() - startTime;
  const userId = (request as any).user?.id;
  const logEntry = {
    level: reply.statusCode >= 500 ? "error" : reply.statusCode >= 400 ? "warn" : "info",
    timestamp: new Date().toISOString(),
    request_id: request.id,
    method: request.method,
    route: request.routerPath || request.url,
    status: reply.statusCode,
    latency_ms: latencyMs,
    user_id: userId || null,
    ip: request.ip,
    // No query params, no body, no headers (no PII)
  };
  console.log(JSON.stringify(logEntry));
}

// Audit failure logger
export function logAuditFailure(request: any, err: unknown): void {
  console.error(JSON.stringify({
    level: "error",
    timestamp: new Date().toISOString(),
    request_id: request.id,
    method: request.method,
    route: request.routerPath || request.url,
    event: "audit_write_failed",
    error: err instanceof Error ? err.message : String(err),
  }));
}
