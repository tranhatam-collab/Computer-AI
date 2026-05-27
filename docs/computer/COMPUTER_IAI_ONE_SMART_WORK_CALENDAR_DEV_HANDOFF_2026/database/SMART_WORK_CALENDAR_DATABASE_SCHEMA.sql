CREATE TABLE calendar_provider_connections (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  computer_id TEXT NOT NULL,
  provider TEXT NOT NULL,
  connection_type TEXT NOT NULL,
  status TEXT NOT NULL,
  scopes JSONB NOT NULL DEFAULT '[]'::jsonb,
  sync_direction TEXT NOT NULL,
  last_sync_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE calendar_events (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  computer_id TEXT NOT NULL,
  provider TEXT NOT NULL,
  external_id TEXT,
  title TEXT NOT NULL,
  description TEXT,
  start_at TIMESTAMPTZ NOT NULL,
  end_at TIMESTAMPTZ NOT NULL,
  timezone TEXT NOT NULL,
  all_day BOOLEAN NOT NULL DEFAULT false,
  location TEXT,
  attendees JSONB NOT NULL DEFAULT '[]'::jsonb,
  recurrence_rule TEXT,
  visibility TEXT NOT NULL DEFAULT 'default',
  status TEXT NOT NULL DEFAULT 'confirmed',
  source_version TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE smart_tasks (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  computer_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT NOT NULL DEFAULT 'normal',
  status TEXT NOT NULL DEFAULT 'captured',
  due_at TIMESTAMPTZ,
  scheduled_start_at TIMESTAMPTZ,
  scheduled_end_at TIMESTAMPTZ,
  source_provider TEXT,
  source_ref TEXT,
  approval_required BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE reminder_rules (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  computer_id TEXT NOT NULL,
  task_id TEXT,
  event_id TEXT,
  rule_type TEXT NOT NULL,
  schedule_expression TEXT,
  condition_expression TEXT,
  timezone TEXT NOT NULL,
  channels JSONB NOT NULL DEFAULT '[]'::jsonb,
  priority TEXT NOT NULL DEFAULT 'normal',
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE notification_routes (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  computer_id TEXT NOT NULL,
  channel TEXT NOT NULL,
  endpoint_ref TEXT,
  priority TEXT NOT NULL DEFAULT 'normal',
  quiet_hours JSONB,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE work_runs (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  computer_id TEXT NOT NULL,
  task_id TEXT,
  event_id TEXT,
  command_id TEXT,
  status TEXT NOT NULL,
  risk_level TEXT NOT NULL DEFAULT 'low',
  approval_required BOOLEAN NOT NULL DEFAULT false,
  evidence_pack_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE calendar_approval_requests (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  computer_id TEXT NOT NULL,
  work_run_id TEXT,
  action_summary TEXT NOT NULL,
  risk_level TEXT NOT NULL,
  required_auth TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  preview_ref TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE calendar_evidence_packs (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  computer_id TEXT NOT NULL,
  work_run_id TEXT,
  task_id TEXT,
  event_id TEXT,
  command TEXT NOT NULL,
  actions_taken JSONB NOT NULL DEFAULT '[]'::jsonb,
  approvals JSONB NOT NULL DEFAULT '[]'::jsonb,
  output_refs JSONB NOT NULL DEFAULT '[]'::jsonb,
  provider_refs JSONB NOT NULL DEFAULT '[]'::jsonb,
  final_status TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_calendar_events_user_start ON calendar_events(user_id, start_at);
CREATE INDEX idx_smart_tasks_user_status ON smart_tasks(user_id, status);
CREATE INDEX idx_reminder_rules_status ON reminder_rules(status);
CREATE INDEX idx_work_runs_status ON work_runs(status);
