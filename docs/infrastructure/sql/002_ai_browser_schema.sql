-- AI Browser database schema for PostgreSQL
-- PostgreSQL is source of truth. D1/KV must not be primary user data store.

CREATE TABLE verified_users (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  verification_level TEXT NOT NULL CHECK (verification_level IN ('V0','V1','V2','V3','V4')),
  status TEXT NOT NULL CHECK (status IN ('active','suspended','revoked')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE trusted_devices (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  device_name TEXT NOT NULL,
  device_public_key TEXT,
  status TEXT NOT NULL CHECK (status IN ('trusted','revoked','suspicious')),
  first_seen_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE computer_instances (
  id TEXT PRIMARY KEY,
  owner_id TEXT NOT NULL,
  tenant_id TEXT NOT NULL,
  region TEXT NOT NULL,
  verification_level TEXT NOT NULL DEFAULT 'V0',
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE browser_profiles (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  computer_id TEXT NOT NULL REFERENCES computer_instances(id),
  mode TEXT NOT NULL CHECK (mode IN ('local_personal','cloud_sandbox','enterprise_dedicated')),
  status TEXT NOT NULL CHECK (status IN ('active','locked','revoked')),
  storage_region TEXT NOT NULL,
  encrypted_profile_ref TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_used_at TIMESTAMPTZ
);

CREATE TABLE connected_accounts (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  computer_id TEXT NOT NULL REFERENCES computer_instances(id),
  provider TEXT NOT NULL,
  account_label TEXT NOT NULL,
  account_url TEXT,
  connection_type TEXT NOT NULL CHECK (connection_type IN ('oauth','browser_session','api_token','password_fallback')),
  status TEXT NOT NULL CHECK (status IN ('connected','expired','requires_reauth','revoked','suspended')),
  scopes JSONB NOT NULL DEFAULT '[]'::jsonb,
  permission_policy_id TEXT NOT NULL,
  session_id TEXT,
  vault_item_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  last_checked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE vault_items (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  owner_id TEXT NOT NULL,
  computer_id TEXT NOT NULL REFERENCES computer_instances(id),
  provider TEXT NOT NULL,
  type TEXT NOT NULL,
  encrypted_payload_ref TEXT NOT NULL,
  kms_key_ref TEXT NOT NULL,
  key_version TEXT NOT NULL,
  scopes JSONB NOT NULL DEFAULT '[]'::jsonb,
  risk_level TEXT NOT NULL CHECK (risk_level IN ('low','medium','high','critical')),
  status TEXT NOT NULL CHECK (status IN ('active','expired','revoked','rotation_required')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_used_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ
);

CREATE TABLE session_states (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  computer_id TEXT NOT NULL REFERENCES computer_instances(id),
  browser_profile_id TEXT NOT NULL REFERENCES browser_profiles(id),
  platform TEXT NOT NULL,
  encrypted_cookie_jar_ref TEXT NOT NULL,
  encrypted_local_storage_ref TEXT,
  encrypted_device_binding_ref TEXT,
  storage_region TEXT NOT NULL,
  key_version TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('valid','expired','requires_user_verification','revoked')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_used_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ
);

CREATE TABLE browser_runs (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  computer_id TEXT NOT NULL REFERENCES computer_instances(id),
  command_id TEXT NOT NULL,
  browser_profile_id TEXT REFERENCES browser_profiles(id),
  provider TEXT,
  mode TEXT NOT NULL CHECK (mode IN ('local_personal','cloud_sandbox','enterprise_dedicated')),
  action_class TEXT NOT NULL,
  risk_level TEXT NOT NULL CHECK (risk_level IN ('low','medium','high','critical')),
  status TEXT NOT NULL CHECK (status IN ('queued','running','paused','waiting_for_approval','waiting_for_user_verification','completed','failed','cancelled')),
  approval_required BOOLEAN NOT NULL DEFAULT false,
  evidence_pack_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE browser_steps (
  id TEXT PRIMARY KEY,
  run_id TEXT NOT NULL REFERENCES browser_runs(id),
  step_index INTEGER NOT NULL,
  action_type TEXT NOT NULL,
  target_origin TEXT,
  action_summary TEXT NOT NULL,
  risk_level TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('planned','approved','executed','blocked','failed')),
  screenshot_ref TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE approval_requests (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  computer_id TEXT NOT NULL REFERENCES computer_instances(id),
  run_id TEXT NOT NULL REFERENCES browser_runs(id),
  action_class TEXT NOT NULL,
  risk_level TEXT NOT NULL,
  platform TEXT,
  account_label TEXT,
  action_summary TEXT NOT NULL,
  preview_ref TEXT,
  required_auth TEXT NOT NULL CHECK (required_auth IN ('none','click','passkey','mfa','admin_quorum')),
  status TEXT NOT NULL CHECK (status IN ('pending','approved','rejected','expired')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE evidence_packs (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  computer_id TEXT NOT NULL REFERENCES computer_instances(id),
  run_id TEXT NOT NULL REFERENCES browser_runs(id),
  user_command TEXT NOT NULL,
  platforms JSONB NOT NULL DEFAULT '[]'::jsonb,
  screenshots JSONB NOT NULL DEFAULT '[]'::jsonb,
  actions_taken JSONB NOT NULL DEFAULT '[]'::jsonb,
  approvals JSONB NOT NULL DEFAULT '[]'::jsonb,
  final_urls JSONB NOT NULL DEFAULT '[]'::jsonb,
  risk_flags JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL CHECK (status IN ('completed','partial','blocked','failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE audit_events (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  user_id TEXT,
  computer_id TEXT,
  run_id TEXT,
  event_type TEXT NOT NULL,
  event_summary TEXT NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_connected_accounts_user ON connected_accounts(user_id);
CREATE INDEX idx_browser_runs_computer ON browser_runs(computer_id);
CREATE INDEX idx_browser_runs_status ON browser_runs(status);
CREATE INDEX idx_audit_events_run ON audit_events(run_id);
CREATE INDEX idx_vault_items_owner ON vault_items(owner_id);
