import type BetterSqlite3 from "better-sqlite3";
import { createRequire } from "node:module";
import path from "path";
import fs from "fs";

const DB_DIR = process.env.DB_DIR || path.resolve(process.cwd(), ".data");
const DB_PATH = path.join(DB_DIR, "computer-iai.db");
const require = createRequire(import.meta.url);

let db: BetterSqlite3.Database;

export function getDb(): BetterSqlite3.Database {
  if (process.env.DATABASE_URL) {
    throw new Error("SQLite blocked: DATABASE_URL is set. PostgreSQL-only production path enforced.");
  }
  if (!db) {
    const Database = require("better-sqlite3") as typeof BetterSqlite3;
    fs.mkdirSync(DB_DIR, { recursive: true });
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
    migrate(db);
  }
  return db;
}

function migrate(db: BetterSqlite3.Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      display_name TEXT NOT NULL DEFAULT '',
      locale TEXT NOT NULL DEFAULT 'vi-VN',
      created_at INTEGER NOT NULL DEFAULT (unixepoch()),
      updated_at INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE TABLE IF NOT EXISTS sessions (
      token TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      expires_at INTEGER NOT NULL,
      created_at INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE TABLE IF NOT EXISTS subscriptions (
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      product_id TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'active',
      started_at INTEGER NOT NULL DEFAULT (unixepoch()),
      expires_at INTEGER NOT NULL,
      PRIMARY KEY (user_id, product_id)
    );

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
      created_at INTEGER NOT NULL DEFAULT (unixepoch()),
      updated_at INTEGER NOT NULL DEFAULT (unixepoch()),
      completed_at INTEGER
    );

    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      action TEXT NOT NULL,
      resource TEXT NOT NULL,
      details TEXT,
      timestamp INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE TABLE IF NOT EXISTS invoices (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      product_id TEXT NOT NULL,
      amount REAL NOT NULL,
      currency TEXT NOT NULL DEFAULT 'USD',
      status TEXT NOT NULL DEFAULT 'pending',
      created_at INTEGER NOT NULL DEFAULT (unixepoch()),
      paid_at INTEGER
    );

    CREATE TABLE IF NOT EXISTS push_tokens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token TEXT NOT NULL UNIQUE,
      platform TEXT NOT NULL DEFAULT 'expo',
      created_at INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE TABLE IF NOT EXISTS memory_namespaces (
      id TEXT PRIMARY KEY,
      tenant_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      computer_id TEXT NOT NULL,
      namespace_name TEXT NOT NULL,
      namespace_type TEXT NOT NULL DEFAULT 'context',
      memory_data TEXT,
      status TEXT NOT NULL DEFAULT 'active',
      created_at INTEGER NOT NULL DEFAULT (unixepoch()),
      updated_at INTEGER NOT NULL DEFAULT (unixepoch()),
      UNIQUE(tenant_id, user_id, computer_id, namespace_name)
    );

    CREATE TABLE IF NOT EXISTS usage_records (
      id TEXT PRIMARY KEY,
      tenant_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      computer_id TEXT NOT NULL,
      run_id TEXT REFERENCES runs(id) ON DELETE SET NULL,
      provider TEXT NOT NULL,
      model TEXT,
      tokens_input INTEGER DEFAULT 0,
      tokens_output INTEGER DEFAULT 0,
      cost_estimate REAL,
      cost_currency TEXT DEFAULT 'USD',
      quota_type TEXT,
      recorded_at INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE TABLE IF NOT EXISTS upgrade_requests (
      id TEXT PRIMARY KEY,
      tenant_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      computer_id TEXT NOT NULL,
      current_plan TEXT NOT NULL,
      requested_plan TEXT NOT NULL,
      reason TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      approved_by TEXT,
      approved_at INTEGER,
      created_at INTEGER NOT NULL DEFAULT (unixepoch()),
      updated_at INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE TABLE IF NOT EXISTS rollback_plans (
      id TEXT PRIMARY KEY,
      tenant_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      computer_id TEXT NOT NULL,
      run_id TEXT REFERENCES runs(id) ON DELETE CASCADE,
      rollback_reason TEXT NOT NULL,
      rollback_steps TEXT,
      status TEXT NOT NULL DEFAULT 'draft',
      executed_at INTEGER,
      created_at INTEGER NOT NULL DEFAULT (unixepoch()),
      updated_at INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE INDEX IF NOT EXISTS idx_runs_user ON runs(user_id);
    CREATE INDEX IF NOT EXISTS idx_runs_state ON runs(state);
    CREATE INDEX IF NOT EXISTS idx_audit_user ON audit_logs(user_id);
    CREATE INDEX IF NOT EXISTS idx_invoices_user ON invoices(user_id);
    CREATE INDEX IF NOT EXISTS idx_memory_user ON memory_namespaces(tenant_id, user_id, computer_id);
    CREATE INDEX IF NOT EXISTS idx_usage_user ON usage_records(tenant_id, user_id, computer_id, recorded_at);
    CREATE INDEX IF NOT EXISTS idx_upgrade_user ON upgrade_requests(tenant_id, user_id, computer_id, status);
    CREATE INDEX IF NOT EXISTS idx_rollback_status ON rollback_plans(status, created_at);
  `);
}

export function closeDb(): void {
  if (db) {
    db.close();
  }
}


export async function createSqliteRunStore() {
  if (process.env.DATABASE_URL) {
    throw new Error("SQLite fallback blocked: DATABASE_URL is set. Use createPgRunStore() instead.");
  }
  const { createSqliteRunStore: factory } = await import("./run-store.js");
  return factory();
}
export { createPgRunStore } from "./pg-run-store.js";
export * from "./pg.js";
export * from "./connection";
export * from "./migrate";
export * from "./models/browser";
export * from "./models/verification";
export * from "./models/vault";
export * from "./models/approval";
export * from "./models/calendar";
export * from "./models/evidence";
export * from "./models/users";
export * from "./models/subscriptions";
