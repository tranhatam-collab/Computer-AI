-- Migration 003: Smart Work Calendar Schema
-- Created: 2026-05-27
-- Description: Database schema for Smart Work Calendar functionality

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Calendars table for user calendar instances
CREATE TABLE IF NOT EXISTS calendars (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    computer_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    timezone VARCHAR(100) NOT NULL DEFAULT 'UTC',
    default_reminder_minutes INTEGER DEFAULT 15,
    color VARCHAR(7), -- hex color code
    visibility VARCHAR(50) DEFAULT 'default', -- default, private, confidential
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(tenant_id, user_id, computer_id, name)
);

-- Calendar events for all calendar entries
CREATE TABLE IF NOT EXISTS calendar_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    computer_id VARCHAR(255) NOT NULL,
    calendar_id UUID REFERENCES calendars(id),
    provider VARCHAR(100) NOT NULL DEFAULT 'computer_native',
    external_id VARCHAR(255), -- ID from external provider (Google, etc.)
    title VARCHAR(500) NOT NULL,
    description TEXT,
    start_at TIMESTAMP NOT NULL,
    end_at TIMESTAMP NOT NULL,
    timezone VARCHAR(100) NOT NULL,
    all_day BOOLEAN NOT NULL DEFAULT false,
    location VARCHAR(500),
    attendees TEXT[],
    recurrence_rule TEXT, -- RRULE format
    visibility VARCHAR(50) NOT NULL DEFAULT 'default',
    status VARCHAR(50) NOT NULL DEFAULT 'confirmed', -- confirmed, tentative, cancelled
    source_version VARCHAR(100), -- for sync versioning
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CHECK (end_at >= start_at)
);

-- Smart tasks for work item management
CREATE TABLE IF NOT EXISTS smart_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    computer_id VARCHAR(255) NOT NULL,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    priority VARCHAR(50) NOT NULL DEFAULT 'normal', -- low, normal, high, urgent
    status VARCHAR(50) NOT NULL DEFAULT 'captured', -- 13 states from spec
    due_at TIMESTAMP,
    scheduled_start_at TIMESTAMP,
    scheduled_end_at TIMESTAMP,
    source_provider VARCHAR(100),
    source_ref VARCHAR(255), -- reference to external task
    approval_required BOOLEAN NOT NULL DEFAULT false,
    parent_task_id UUID REFERENCES smart_tasks(id),
    dependency_task_ids UUID[],
    estimated_duration_minutes INTEGER,
    actual_duration_minutes INTEGER,
    completion_percentage INTEGER DEFAULT 0,
    tags TEXT[],
    metadata JSONB,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    cancelled_at TIMESTAMP
);

-- Reminder rules for intelligent notifications
CREATE TABLE IF NOT EXISTS reminder_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    computer_id VARCHAR(255) NOT NULL,
    task_id UUID REFERENCES smart_tasks(id),
    event_id UUID REFERENCES calendar_events(id),
    rule_type VARCHAR(100) NOT NULL, -- absolute_time, relative_before_due, recurring, etc.
    schedule_expression TEXT, -- cron-like expression or relative time
    condition_expression TEXT, -- for conditional reminders
    timezone VARCHAR(100) NOT NULL DEFAULT 'UTC',
    channels TEXT[] NOT NULL DEFAULT '{"mobile_push"}', -- notification channels
    priority VARCHAR(50) NOT NULL DEFAULT 'normal',
    status VARCHAR(50) NOT NULL DEFAULT 'active', -- active, paused, completed, cancelled
    last_triggered_at TIMESTAMP,
    next_trigger_at TIMESTAMP,
    trigger_count INTEGER DEFAULT 0,
    max_triggers INTEGER, -- limit for recurring reminders
    metadata JSONB,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CHECK ((task_id IS NOT NULL) OR (event_id IS NOT NULL))
);

-- Calendar provider connections for integrations
CREATE TABLE IF NOT EXISTS calendar_provider_connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    computer_id VARCHAR(255) NOT NULL,
    provider VARCHAR(100) NOT NULL, -- google_calendar, microsoft_graph, caldav, etc.
    connection_type VARCHAR(50) NOT NULL, -- oauth, caldav_credentials, api_token, etc.
    status VARCHAR(50) NOT NULL DEFAULT 'connected', -- connected, expired, requires_reauth, etc.
    sync_direction VARCHAR(50) NOT NULL DEFAULT 'two_way', -- inbound, outbound, two_way, etc.
    scopes TEXT[],
    last_sync_at TIMESTAMP,
    sync_error TEXT,
    external_account_id VARCHAR(255),
    external_calendar_id VARCHAR(255),
    access_token_encrypted TEXT,
    refresh_token_encrypted TEXT,
    token_expires_at TIMESTAMP,
    webhook_url VARCHAR(500),
    sync_settings JSONB,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(tenant_id, user_id, computer_id, provider, external_account_id)
);

-- Work queue for tracking task execution states
CREATE TABLE IF NOT EXISTS work_queue_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    computer_id VARCHAR(255) NOT NULL,
    task_id UUID REFERENCES smart_tasks(id),
    queue_type VARCHAR(50) NOT NULL, -- waiting, running, waiting_for_approval, blocked, completed
    priority INTEGER NOT NULL DEFAULT 5, -- 1=highest, 10=lowest
    assigned_to VARCHAR(255), -- who is working on this
    started_at TIMESTAMP,
    estimated_completion_at TIMESTAMP,
    actual_completion_at TIMESTAMP,
    block_reason TEXT,
    error_message TEXT,
    retry_count INTEGER DEFAULT 0,
    max_retries INTEGER DEFAULT 3,
    metadata JSONB,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Approval requests for task automation
CREATE TABLE IF NOT EXISTS task_approval_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    computer_id VARCHAR(255) NOT NULL,
    task_id UUID REFERENCES smart_tasks(id),
    action_type VARCHAR(100) NOT NULL, -- send_email, schedule_meeting, etc.
    risk_level VARCHAR(50) NOT NULL DEFAULT 'medium',
    status VARCHAR(50) NOT NULL DEFAULT 'pending', -- pending, approved, rejected, expired
    action_data JSONB NOT NULL,
    context_data JSONB,
    requested_by VARCHAR(255),
    approved_by VARCHAR(255),
    approved_at TIMESTAMP,
    rejected_by VARCHAR(255),
    rejected_at TIMESTAMP,
    expires_at TIMESTAMP,
    comments TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Work reports for daily/weekly summaries
CREATE TABLE IF NOT EXISTS work_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    computer_id VARCHAR(255) NOT NULL,
    report_type VARCHAR(50) NOT NULL, -- daily, weekly, monthly
    period_start TIMESTAMP NOT NULL,
    period_end TIMESTAMP NOT NULL,
    completed_items INTEGER DEFAULT 0,
    blocked_items INTEGER DEFAULT 0,
    pending_approvals INTEGER DEFAULT 0,
    total_tasks INTEGER DEFAULT 0,
    hours_worked DECIMAL(5,2),
    productivity_score DECIMAL(5,2),
    next_actions TEXT[],
    achievements TEXT[],
    challenges TEXT[],
    report_data JSONB,
    generated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(tenant_id, user_id, computer_id, report_type, period_start)
);

-- Task time tracking for analytics
CREATE TABLE IF NOT EXISTS task_time_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    computer_id VARCHAR(255) NOT NULL,
    task_id UUID REFERENCES smart_tasks(id),
    entry_type VARCHAR(50) NOT NULL, -- work, break, meeting, etc.
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP,
    duration_minutes INTEGER,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CHECK (end_time IS NULL OR end_time >= start_time)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_calendars_tenant_user ON calendars(tenant_id, user_id);
CREATE INDEX IF NOT EXISTS idx_calendar_events_user_time ON calendar_events(tenant_id, user_id, start_at, end_at);
CREATE INDEX IF NOT EXISTS idx_calendar_events_provider ON calendar_events(provider, external_id);
CREATE INDEX IF NOT EXISTS idx_smart_tasks_user_status ON smart_tasks(tenant_id, user_id, status);
CREATE INDEX IF NOT EXISTS idx_smart_tasks_due_date ON smart_tasks(due_at) WHERE due_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_smart_tasks_parent ON smart_tasks(parent_task_id) WHERE parent_task_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_reminder_rules_next_trigger ON reminder_rules(next_trigger_at) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_reminder_rules_task ON reminder_rules(task_id) WHERE task_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_reminder_rules_event ON reminder_rules(event_id) WHERE event_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_calendar_connections_user ON calendar_provider_connections(tenant_id, user_id, computer_id);
CREATE INDEX IF NOT EXISTS idx_work_queue_type_priority ON work_queue_items(queue_type, priority, created_at);
CREATE INDEX IF NOT EXISTS idx_work_queue_task ON work_queue_items(task_id) WHERE task_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_task_approvals_pending ON task_approval_requests(status, created_at);
CREATE INDEX IF NOT EXISTS idx_task_approvals_task ON task_approval_requests(task_id) WHERE task_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_work_reports_user_period ON work_reports(tenant_id, user_id, report_type, period_start);
CREATE INDEX IF NOT EXISTS idx_task_time_entries_task ON task_time_entries(task_id) WHERE task_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_task_time_entries_user_time ON task_time_entries(tenant_id, user_id, start_time);

-- Create updated_at trigger function (reuse if exists)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'update_updated_at_column') THEN
        CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = CURRENT_TIMESTAMP;
            RETURN NEW;
        END;
        $$ language 'plpgsql';
    END IF;
END
$$;

-- Create triggers for updated_at
CREATE TRIGGER update_calendars_updated_at BEFORE UPDATE ON calendars FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_calendar_events_updated_at BEFORE UPDATE ON calendar_events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_smart_tasks_updated_at BEFORE UPDATE ON smart_tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reminder_rules_updated_at BEFORE UPDATE ON reminder_rules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_calendar_provider_connections_updated_at BEFORE UPDATE ON calendar_provider_connections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_work_queue_items_updated_at BEFORE UPDATE ON work_queue_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_task_approval_requests_updated_at BEFORE UPDATE ON task_approval_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_task_time_entries_updated_at BEFORE UPDATE ON task_time_entries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert initial data
INSERT INTO calendars (tenant_id, user_id, computer_id, name, description, timezone)
VALUES ('default', 'system', 'computer_001', 'Primary Calendar', 'Main calendar for system tasks', 'UTC')
ON CONFLICT (tenant_id, user_id, computer_id, name) DO NOTHING;

-- Create default reminder types
INSERT INTO reminder_rules (tenant_id, user_id, computer_id, rule_type, schedule_expression, channels, priority, status)
VALUES 
    ('default', 'system', 'computer_001', 'relative_before_due', '15 minutes before', '{"mobile_push","email"}', 'normal', 'active'),
    ('default', 'system', 'computer_001', 'relative_before_due', '1 hour before', '{"mobile_push","email"}', 'normal', 'active'),
    ('default', 'system', 'computer_001', 'relative_before_due', '1 day before', '{"mobile_push","email"}', 'normal', 'active')
ON CONFLICT DO NOTHING;
