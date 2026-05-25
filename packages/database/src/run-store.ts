import type { RunRecord, RunStore } from "@iai/workflow-engine";
import { getDb } from "./index.js";

export function createSqliteRunStore(): RunStore {
  return {
    create(data) {
      const db = getDb();
      const now = Date.now();
      db.prepare(`
        INSERT INTO runs (id, product_id, text, state, created_at, updated_at, retry_count)
        VALUES (?, ?, ?, 'created', ?, ?, 0)
      `).run(data.id, data.productId, data.text, now, now);
      return this.get(data.id)!;
    },

    get(id) {
      const row = getDb().prepare("SELECT * FROM runs WHERE id = ?").get(id) as any;
      if (!row) return undefined;
      return rowToRecord(row);
    },

    list(productId) {
      const rows = productId
        ? getDb().prepare("SELECT * FROM runs WHERE product_id = ? ORDER BY created_at DESC").all(productId)
        : getDb().prepare("SELECT * FROM runs ORDER BY created_at DESC").all();
      return (rows as any[]).map(rowToRecord);
    },

    update(id, changes) {
      const db = getDb();
      const sets: string[] = [];
      const vals: any[] = [];
      for (const [key, val] of Object.entries(changes)) {
        if (key === "id") continue;
        const col = key.replace(/[A-Z]/g, (m) => "_" + m.toLowerCase());
        sets.push(`${col} = ?`);
        vals.push(typeof val === "object" ? JSON.stringify(val) : val);
      }
      sets.push("updated_at = ?");
      vals.push(Date.now());
      vals.push(id);
      db.prepare(`UPDATE runs SET ${sets.join(", ")} WHERE id = ?`).run(...vals);
      return this.get(id)!;
    },

    delete(id) {
      getDb().prepare("DELETE FROM runs WHERE id = ?").run(id);
    },
  };
}

function rowToRecord(row: any): RunRecord {
  return {
    id: row.id,
    state: row.state,
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
