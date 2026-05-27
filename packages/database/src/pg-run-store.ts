import type { RunRecord, RunStore } from "@iai/workflow-engine";
import { query } from "./pg.js";

interface PgRunRow {
  id: string;
  state: string;
  product_id: string;
  text: string;
  route_response: string | null;
  output: string | null;
  error: string | null;
  retry_count: number;
  created_at: number;
  updated_at: number;
  completed_at: number | null;
}

async function ensureRunsTable(): Promise<void> {
  await query(`
    CREATE TABLE IF NOT EXISTS runs (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      product_id TEXT NOT NULL,
      text TEXT NOT NULL,
      state TEXT NOT NULL DEFAULT 'created',
      route_response TEXT,
      output TEXT,
      error TEXT,
      retry_count INTEGER NOT NULL DEFAULT 0,
      created_at INTEGER NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW())::INTEGER),
      updated_at INTEGER NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW())::INTEGER),
      completed_at INTEGER
    );
    CREATE INDEX IF NOT EXISTS idx_runs_user ON runs(user_id);
    CREATE INDEX IF NOT EXISTS idx_runs_state ON runs(state);
  `);
}

function rowToRecord(row: PgRunRow): RunRecord {
  return {
    id: row.id,
    state: row.state as RunRecord['state'],
    productId: row.product_id,
    text: row.text,
    routeResponse: row.route_response ? JSON.parse(row.route_response) : undefined,
    output: row.output ? JSON.parse(row.output) : undefined,
    error: row.error || undefined,
    retryCount: row.retry_count,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    completedAt: row.completed_at || undefined,
  };
}

export async function createPgRunStore(): Promise<RunStore> {
  await ensureRunsTable();

  return {
    async create(data) {
      const now = Math.floor(Date.now() / 1000);
      await query(
        `INSERT INTO runs (id, product_id, text, state, created_at, updated_at, retry_count)
         VALUES ($1, $2, $3, 'created', $4, $4, 0)`,
        [data.id, data.productId, data.text, now]
      );
      const res = await query<PgRunRow>(
        `SELECT * FROM runs WHERE id = $1`,
        [data.id]
      );
      return rowToRecord(res.rows[0]);
    },

    async get(id) {
      const res = await query<PgRunRow>(
        `SELECT * FROM runs WHERE id = $1`,
        [id]
      );
      if (res.rowCount === 0) return undefined;
      return rowToRecord(res.rows[0]);
    },

    async list(productId) {
      const sql = productId
        ? `SELECT * FROM runs WHERE product_id = $1 ORDER BY created_at DESC`
        : `SELECT * FROM runs ORDER BY created_at DESC`;
      const res = await query<PgRunRow>(sql, productId ? [productId] : undefined);
      return res.rows.map(rowToRecord);
    },

    async update(id, changes) {
      const sets: string[] = [];
      const vals: (string | number | null)[] = [];
      let idx = 1;

      for (const [key, val] of Object.entries(changes)) {
        if (key === "id") continue;
        const col = key.replace(/[A-Z]/g, (m) => "_" + m.toLowerCase());
        sets.push(`${col} = $${idx}`);
        const value = val === undefined ? null : typeof val === "object" ? JSON.stringify(val) : val;
        vals.push(value as string | number | null);
        idx++;
      }

      sets.push(`updated_at = $${idx}`);
      vals.push(Math.floor(Date.now() / 1000));
      idx++;

      vals.push(id);

      await query(
        `UPDATE runs SET ${sets.join(", ")} WHERE id = $${idx}`,
        vals
      );

      const res = await query<PgRunRow>(
        `SELECT * FROM runs WHERE id = $1`,
        [id]
      );
      return rowToRecord(res.rows[0]);
    },

    async delete(id) {
      await query(`DELETE FROM runs WHERE id = $1`, [id]);
    },
  };
}
