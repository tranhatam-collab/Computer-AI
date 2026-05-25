CREATE TABLE IF NOT EXISTS computer_products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  family TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS computer_runs (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  workspace_id TEXT,
  state TEXT NOT NULL,
  input TEXT NOT NULL,
  output_json TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS computer_audit_events (
  id TEXT PRIMARY KEY,
  actor_id TEXT NOT NULL,
  action TEXT NOT NULL,
  target TEXT NOT NULL,
  metadata_json TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS computer_entitlements (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  workspace_id TEXT,
  plan_id TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
