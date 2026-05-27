import { Pool, PoolClient } from "pg";

let pool: Pool | null = null;

export function getPgPool(): Pool {
  if (!pool) {
    const url = process.env.DATABASE_URL || process.env.TEST_DATABASE_URL;
    if (!url) {
      throw new Error("DATABASE_URL is not set");
    }
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
  const pool = getPgPool();
  const result = await pool.query(sql, params);
  return { rows: result.rows as T[], rowCount: result.rowCount ?? 0 };
}

export async function transaction<T>(
  fn: (client: PoolClient) => Promise<T>
): Promise<T> {
  const pool = getPgPool();
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
    const pool = getPgPool();
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
