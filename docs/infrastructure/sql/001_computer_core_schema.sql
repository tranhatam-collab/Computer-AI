-- ============================================================
-- COMPUTER.IAI.ONE — CORE POSTGRESQL SCHEMA 2026
-- Migration: 001_computer_core_schema.sql
-- Status: SCHEMA LOCKED — APPLY ONLY AFTER FOUNDER SIGNOFF
-- Region: ap-southeast-1 (Singapore)
-- ============================================================

-- ----------------------------------------------------------
-- 1. EXTENSIONS
-- ----------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ----------------------------------------------------------
-- 2. PLANE A: IDENTITY & ENTITLEMENT
-- ----------------------------------------------------------

-- 2.1 Users
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  email_hash VARCHAR(64) NOT NULL, -- SHA-256 of email for PII redaction
  display_name VARCHAR(255),
  locale VARCHAR(10) DEFAULT 'vi-VN',
  timezone VARCHAR(50) DEFAULT 'Asia/Ho_Chi_Minh',
  passkey_credential JSONB,
  device_trust_score NUMERIC(3,2) DEFAULT 0.0,
  tier VARCHAR(20) DEFAULT 'free' CHECK (tier IN ('free','personal','creator','business','enterprise')),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active','suspended','deleted')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

-- 2.2 Organizations
CREATE TABLE IF NOT EXISTS organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  billing_email VARCHAR(255),
  plan VARCHAR(20) DEFAULT 'free',
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.3 Organization Memberships
CREATE TABLE IF NOT EXISTS organization_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL DEFAULT 'member' CHECK (role IN ('owner','admin','member','viewer')),
  invited_by UUID REFERENCES users(id),
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (org_id, user_id)
);

-- 2.4 Entitlements
CREATE TABLE IF NOT EXISTS entitlements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type VARCHAR(20) NOT NULL CHECK (entity_type IN ('user','organization')),
  entity_id UUID NOT NULL,
  product_id VARCHAR(50) NOT NULL,
  tier VARCHAR(20) NOT NULL,
  features JSONB NOT NULL DEFAULT '{}',
  limits JSONB NOT NULL DEFAULT '{}', -- {commands_per_day, storage_gb, agents_count, ...}
  starts_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ends_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_entitlements_entity ON entitlements(entity_type, entity_id, is_active);

-- ----------------------------------------------------------
-- 3. PLANE B: COMPUTER CONTROL
-- ----------------------------------------------------------

-- 3.1 Computer Templates
CREATE TABLE IF NOT EXISTS computer_templates (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  tier VARCHAR(20) NOT NULL DEFAULT 'personal' CHECK (tier IN ('free','personal','creator','business','enterprise')),
  resources JSONB NOT NULL DEFAULT '{"cpu":1,"memory_gb":2,"disk_gb":10}',
  included_apps TEXT[] DEFAULT '{}',
  default_agents TEXT[] DEFAULT '{}',
  config_schema JSONB NOT NULL DEFAULT '{}',
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3.2 Computer Instances
CREATE TABLE IF NOT EXISTS computer_instances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  org_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
  template_id VARCHAR(50) NOT NULL REFERENCES computer_templates(id),
  name VARCHAR(255) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'inactive' CHECK (status IN ('inactive','provisioning','running','sleeping','waking','terminating','terminated')),
  region VARCHAR(20) DEFAULT 'ap-southeast-1',
  runtime_host VARCHAR(255), -- ECS task ARN, Hetzner VM ID, etc.
  sandbox_config JSONB NOT NULL DEFAULT '{"isolation":"container","network":"proxy_only"}',
  memory_profile_id UUID,
  approval_policy_id UUID,
  cost_policy_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_active_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_computer_instances_user ON computer_instances(user_id, status);
CREATE INDEX idx_computer_instances_org ON computer_instances(org_id, status);
CREATE INDEX idx_computer_instances_active ON computer_instances(status, last_active_at);

-- 3.3 Computer State (persisted state, not hot runtime)
CREATE TABLE IF NOT EXISTS computer_state (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  instance_id UUID NOT NULL REFERENCES computer_instances(id) ON DELETE CASCADE,
  state_type VARCHAR(50) NOT NULL CHECK (state_type IN ('system','app','agent','workflow','memory')),
  key VARCHAR(255) NOT NULL,
  value JSONB,
  version INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (instance_id, state_type, key)
);

CREATE INDEX idx_computer_state_instance ON computer_state(instance_id, state_type);

-- 3.4 Computer Memory Profiles
CREATE TABLE IF NOT EXISTS computer_memory_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  instance_id UUID NOT NULL REFERENCES computer_instances(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  profile_type VARCHAR(50) NOT NULL DEFAULT 'general' CHECK (profile_type IN ('general','work','personal','project','health','finance')),
  preferences JSONB NOT NULL DEFAULT '{}',
  learned_patterns JSONB NOT NULL DEFAULT '{}',
  conversation_summary TEXT,
  embedding_vector VECTOR(1536), -- pgvector extension if available, else store as JSONB
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Fallback if pgvector not available:
-- ALTER TABLE computer_memory_profiles ADD COLUMN IF NOT EXISTS embedding_fallback JSONB;

CREATE INDEX idx_memory_profiles_user ON computer_memory_profiles(user_id, profile_type, is_active);

-- 3.5 Computer Runtime Bindings
CREATE TABLE IF NOT EXISTS computer_runtime_bindings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  instance_id UUID NOT NULL REFERENCES computer_instances(id) ON DELETE CASCADE,
  binding_type VARCHAR(50) NOT NULL CHECK (binding_type IN ('worker','agent','sandbox','browser','code_runner','file_processor')),
  worker_id VARCHAR(255),
  endpoint_url VARCHAR(500),
  status VARCHAR(20) DEFAULT 'connected' CHECK (status IN ('connected','disconnected','error','terminating')),
  health_check_at TIMESTAMPTZ,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_runtime_bindings_instance ON computer_runtime_bindings(instance_id, binding_type);

-- 3.6 Computer Approval Policies
CREATE TABLE IF NOT EXISTS computer_approval_policies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  instance_id UUID NOT NULL REFERENCES computer_instances(id) ON DELETE CASCADE,
  action_type VARCHAR(50) NOT NULL CHECK (action_type IN ('email_send','dns_change','public_deploy','payment','secret_access','data_export','model_escalation','self_upgrade','code_execution','browser_automation')),
  required_approval BOOLEAN NOT NULL DEFAULT false,
  approver_roles TEXT[] DEFAULT '{}',
  auto_approve_below_cents INTEGER DEFAULT 0,
  time_delay_seconds INTEGER DEFAULT 0,
  notify_channels TEXT[] DEFAULT '{"push"}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (instance_id, action_type)
);

-- 3.7 Computer Cost Policies
CREATE TABLE IF NOT EXISTS computer_cost_policies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  instance_id UUID NOT NULL REFERENCES computer_instances(id) ON DELETE CASCADE,
  daily_max_cents INTEGER NOT NULL DEFAULT 500, -- $5
  monthly_max_cents INTEGER NOT NULL DEFAULT 3000, -- $30
  per_command_max_cents INTEGER NOT NULL DEFAULT 100, -- $1
  per_agent_daily_max_cents INTEGER NOT NULL DEFAULT 500,
  global_provider_daily_max_cents INTEGER NOT NULL DEFAULT 20000, -- $200
  global_daily_max_cents INTEGER NOT NULL DEFAULT 100000, -- $1000
  auto_downgrade_on_exceed BOOLEAN DEFAULT true,
  user_confirm_above_cents INTEGER NOT NULL DEFAULT 100, -- $1
  notify_above_cents INTEGER NOT NULL DEFAULT 50, -- $0.50
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------
-- 4. PLANE C: WORK EXECUTION (COMMANDS, RUNS, EVENTS)
-- ----------------------------------------------------------

-- 4.1 Commands
CREATE TABLE IF NOT EXISTS commands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  instance_id UUID NOT NULL REFERENCES computer_instances(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  command_type VARCHAR(50) NOT NULL CHECK (command_type IN ('chat','code_run','browser','file_process','agent_task','workflow','self_upgrade','deploy')),
  intent VARCHAR(255),
  payload JSONB NOT NULL DEFAULT '{}',
  approved_by UUID REFERENCES users(id),
  approved_at TIMESTAMPTZ,
  estimated_cost_cents INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected','running','completed','failed','timeout','cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_commands_instance ON commands(instance_id, status, created_at);
CREATE INDEX idx_commands_user ON commands(user_id, created_at);

-- 4.2 Runs
CREATE TABLE IF NOT EXISTS runs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  command_id UUID NOT NULL REFERENCES commands(id) ON DELETE CASCADE,
  instance_id UUID NOT NULL REFERENCES computer_instances(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  run_type VARCHAR(50) NOT NULL CHECK (run_type IN ('code','browser','file','agent','workflow','sandbox')),
  sandbox_id VARCHAR(255), -- reference to sandbox runtime
  status VARCHAR(20) DEFAULT 'queued' CHECK (status IN ('queued','running','paused','completed','failed','timeout','killed')),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  output JSONB,
  error TEXT,
  artifacts TEXT[], -- S3/R2 references
  cost_cents INTEGER DEFAULT 0,
  confidence_score NUMERIC(4,3),
  verified_by UUID[], -- list of critic agent IDs
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_runs_command ON runs(command_id);
CREATE INDEX idx_runs_instance ON runs(instance_id, status, created_at);
CREATE INDEX idx_runs_user ON runs(user_id, created_at);

-- 4.3 Run Events (immutable event log)
CREATE TABLE IF NOT EXISTS run_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  run_id UUID NOT NULL REFERENCES runs(id) ON DELETE CASCADE,
  event_type VARCHAR(50) NOT NULL CHECK (event_type IN ('started','checkpoint','output','error','paused','resumed','approved','killed','completed')),
  payload JSONB,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  sequence_number INTEGER NOT NULL
);

CREATE INDEX idx_run_events_run ON run_events(run_id, sequence_number);

-- ----------------------------------------------------------
-- 5. AI PROVIDER USAGE (COST GOVERNANCE)
-- ----------------------------------------------------------

CREATE TABLE IF NOT EXISTS ai_usage_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  instance_id UUID REFERENCES computer_instances(id) ON DELETE SET NULL,
  command_id UUID REFERENCES commands(id) ON DELETE SET NULL,
  run_id UUID REFERENCES runs(id) ON DELETE SET NULL,
  provider VARCHAR(50) NOT NULL,
  model VARCHAR(50) NOT NULL,
  input_tokens INTEGER DEFAULT 0,
  output_tokens INTEGER DEFAULT 0,
  duration_ms INTEGER,
  cost_cents INTEGER NOT NULL DEFAULT 0,
  approved_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ai_usage_user ON ai_usage_records(user_id, created_at);
CREATE INDEX idx_ai_usage_instance ON ai_usage_records(instance_id, created_at);
CREATE INDEX idx_ai_usage_provider ON ai_usage_records(provider, created_at);

-- ----------------------------------------------------------
-- 6. AUDIT & EVIDENCE
-- ----------------------------------------------------------

-- 6.1 Audit Logs (immutable, append-only)
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type VARCHAR(50) NOT NULL, -- 'user','instance','command','run','organization'
  entity_id UUID NOT NULL,
  action VARCHAR(100) NOT NULL,
  actor_id UUID REFERENCES users(id),
  actor_type VARCHAR(20) DEFAULT 'user' CHECK (actor_type IN ('user','system','agent','admin')),
  before_state JSONB,
  after_state JSONB,
  metadata JSONB NOT NULL DEFAULT '{}',
  hash_chain VARCHAR(64), -- SHA-256 of previous row hash + current data
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_audit_entity ON audit_logs(entity_type, entity_id, created_at);
CREATE INDEX idx_audit_actor ON audit_logs(actor_id, created_at);
CREATE INDEX idx_audit_action ON audit_logs(action, created_at);

-- 6.2 Evidence Packs (verification results)
CREATE TABLE IF NOT EXISTS evidence_packs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  run_id UUID NOT NULL REFERENCES runs(id) ON DELETE CASCADE,
  source_agent_id VARCHAR(255),
  critic_agent_id VARCHAR(255),
  verifier_agent_id VARCHAR(255),
  policy_agent_id VARCHAR(255),
  summary_agent_id VARCHAR(255),
  confidence_score NUMERIC(4,3) NOT NULL,
  risk_flags TEXT[] DEFAULT '{}',
  verdict VARCHAR(20) CHECK (verdict IN ('pass','fail','review','uncertain')),
  evidence_url VARCHAR(500), -- S3 reference
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------
-- 7. BILLING & USAGE
-- ----------------------------------------------------------

CREATE TABLE IF NOT EXISTS usage_ledgers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  category VARCHAR(50) NOT NULL, -- 'ai','storage','compute','bandwidth'
  quantity NUMERIC(20,8) NOT NULL,
  unit VARCHAR(20) NOT NULL,
  cost_cents INTEGER NOT NULL DEFAULT 0,
  details JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_usage_ledger_user ON usage_ledgers(user_id, period_start, category);

-- ----------------------------------------------------------
-- 8. TRIGGERS
-- ----------------------------------------------------------

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_computer_instances_updated_at BEFORE UPDATE ON computer_instances
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_computer_state_updated_at BEFORE UPDATE ON computer_state
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_computer_memory_profiles_updated_at BEFORE UPDATE ON computer_memory_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_computer_runtime_bindings_updated_at BEFORE UPDATE ON computer_runtime_bindings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_computer_approval_policies_updated_at BEFORE UPDATE ON computer_approval_policies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_computer_cost_policies_updated_at BEFORE UPDATE ON computer_cost_policies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_commands_updated_at BEFORE UPDATE ON commands
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ----------------------------------------------------------
-- 9. ROW LEVEL SECURITY (RLS) — ENABLE AFTER AUTH SETUP
-- ----------------------------------------------------------

-- Example RLS policies (to be applied after auth service is ready):

-- ALTER TABLE computer_instances ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY computer_instances_user_isolation ON computer_instances
--   FOR ALL TO app_user
--   USING (user_id = current_setting('app.current_user_id')::UUID);

-- ALTER TABLE commands ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY commands_user_isolation ON commands
--   FOR ALL TO app_user
--   USING (user_id = current_setting('app.current_user_id')::UUID);

-- ALTER TABLE runs ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY runs_user_isolation ON runs
--   FOR ALL TO app_user
--   USING (user_id = current_setting('app.current_user_id')::UUID);

-- ----------------------------------------------------------
-- 10. SEED DATA (TEMPLATES)
-- ----------------------------------------------------------

INSERT INTO computer_templates (id, name, description, tier, resources, included_apps, default_agents, config_schema)
VALUES
  ('free', 'Free Starter', 'Basic AI computer for exploration', 'free',
   '{"cpu":0.5,"memory_gb":1,"disk_gb":5}'::jsonb,
   '{"chat","browser"}',
   '{"router","planner"}',
   '{"max_agents":2,"max_commands_per_day":10}'::jsonb),
  ('personal', 'Personal', 'Your private AI computer', 'personal',
   '{"cpu":1,"memory_gb":2,"disk_gb":20}'::jsonb,
   '{"chat","browser","code","research"}',
   '{"router","planner","executor","reviewer"}',
   '{"max_agents":5,"max_commands_per_day":100}'::jsonb),
  ('creator', 'Creator', 'For content creators and builders', 'creator',
   '{"cpu":2,"memory_gb":4,"disk_gb":50}'::jsonb,
   '{"chat","browser","code","research","content","media"}',
   '{"router","planner","executor","reviewer","content_agent","media_agent"}',
   '{"max_agents":10,"max_commands_per_day":500}'::jsonb),
  ('business', 'Business', 'Team AI computer with collaboration', 'business',
   '{"cpu":4,"memory_gb":8,"disk_gb":100}'::jsonb,
   '{"chat","browser","code","research","content","media","data","finance","sales","automation"}',
   '{"router","planner","executor","reviewer","security","fact_check","release","report"}',
   '{"max_agents":20,"max_commands_per_day":2000}'::jsonb),
  ('enterprise', 'Enterprise', 'Isolated, compliant, dedicated', 'enterprise',
   '{"cpu":8,"memory_gb":16,"disk_gb":500}'::jsonb,
   '{"all"}',
   '{"all"}',
   '{"max_agents":50,"max_commands_per_day":10000,"isolated":true}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- ----------------------------------------------------------
-- END
-- ----------------------------------------------------------
