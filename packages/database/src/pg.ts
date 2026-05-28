import { Pool, PoolClient } from "pg";
import { resolve4 } from "dns";
import { promisify } from "util";

const resolve4Async = promisify(resolve4);

let pool: Pool | null = null;

async function resolveDatabaseHostToIPv4(urlString: string): Promise<string> {
  try {
    const url = new URL(urlString);
    const hostname = url.hostname;

    // Skip if already an IP address
    if (/^\d+\.\d+\.\d+\.\d+$/.test(hostname)) return urlString;

    console.log(`[DB] Resolving ${hostname} to IPv4...`);
    const addresses = await resolve4Async(hostname);
    if (addresses && addresses.length > 0) {
      const ipv4 = addresses[0];
      url.hostname = ipv4;
      console.log(`[DB] Resolved to IPv4: ${ipv4}`);
      return url.toString();
    }
  } catch (err: any) {
    console.warn('[DB] Failed to resolve DB host to IPv4:', err.message || err);
  }
  return urlString;
}

export async function getPgPool(): Promise<Pool> {
  if (!pool) {
    let url = process.env.DATABASE_URL || process.env.TEST_DATABASE_URL;
    if (!url) {
      throw new Error("DATABASE_URL is not set");
    }

    // Render free tier does not support IPv6 outbound.
    // Resolve hostname to IPv4 before creating pool.
    url = await resolveDatabaseHostToIPv4(url);

    pool = new Pool({
      connectionString: url,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });

    pool.on("error", (err) => {
      console.error("Unexpected PostgreSQL pool error", err);
    });
  }
  return pool;
}

export async function query<T = unknown>(
  sql: string,
  params?: unknown[]
): Promise<{ rows: T[]; rowCount: number }> {
  const pool = await getPgPool();
  const result = await pool.query(sql, params);
  return { rows: result.rows as T[], rowCount: result.rowCount ?? 0 };
}

export async function transaction<T>(
  fn: (client: PoolClient) => Promise<T>
): Promise<T> {
  const pool = await getPgPool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await fn(client);
    await client.query("COMMIT");
    return result;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

export async function healthCheck(): Promise<{
  ok: boolean;
  latencyMs: number;
  error?: string;
}> {
  const start = Date.now();
  try {
    const pool = await getPgPool();
    await pool.query("SELECT 1");
    return { ok: true, latencyMs: Date.now() - start };
  } catch (err) {
    return {
      ok: false,
      latencyMs: Date.now() - start,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export async function closePgPool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}
