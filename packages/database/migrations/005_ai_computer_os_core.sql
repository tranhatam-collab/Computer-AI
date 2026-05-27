-- Migration 005: AI Computer OS Core Schema
-- Created: 2026-05-27
-- Description: Canonical core schema for AI Computer Instance OS — commands, runs, memory, usage, upgrades, rollbacks

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Memory namespaces: per-computer instance memory/context
CREATE TABLE IF NOT EXISTS memory_namespaces (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    computer_id VARCHAR(255) NOT NULL,
    namespace_name VARCHAR(255) NOT NULL,
    namespace_type VARCHAR(50) NOT NULL DEFAULT 'context',
    memory_data JSONB,
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(tenant_id, user_id, computer_id, namespace_name)
);

-- Usage records: per-instance provider/model cost and token tracking
CREATE TABLE IF NOT EXISTS usage_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    computer_id VARCHAR(255) NOT NULL,
    run_id UUID REFERENCES runs(id) ON DELETE SET NULL,
    provider VARCHAR(100) NOT NULL,
    model VARCHAR(100),
    tokens_input INTEGER DEFAULT 0,
    tokens_output INTEGER DEFAULT 0,
    cost_estimate DECIMAL(10,6),
    cost_currency VARCHAR(3) DEFAULT 'USD',
    quota_type VARCHAR(50),
    recorded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Upgrade requests: plan upgrades with approval flow
CREATE TABLE IF NOT EXISTS upgrade_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    computer_id VARCHAR(255) NOT NULL,
    current_plan VARCHAR(100) NOT NULL,
    requested_plan VARCHAR(100) NOT NULL,
    reason TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    approved_by VARCHAR(255),
    approved_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Rollback plans: rollback capability for failed or mis-configured runs
CREATE TABLE IF NOT EXISTS rollback_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    computer_id VARCHAR(255) NOT NULL,
    run_id UUID REFERENCES runs(id) ON DELETE CASCADE,
    rollback_reason TEXT NOT NULL,
    rollback_steps JSONB,
    status VARCHAR(50) NOT NULL DEFAULT 'draft',
    executed_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_memory_user ON memory_namespaces(tenant_id, user_id, computer_id);
CREATE INDEX IF NOT EXISTS idx_memory_type ON memory_namespaces(namespace_type, status);
CREATE INDEX IF NOT EXISTS idx_usage_run ON usage_records(run_id) WHERE run_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_usage_user ON usage_records(tenant_id, user_id, computer_id, recorded_at);
CREATE INDEX IF NOT EXISTS idx_upgrade_user ON upgrade_requests(tenant_id, user_id, computer_id, status);
CREATE INDEX IF NOT EXISTS idx_rollback_run ON rollback_plans(run_id) WHERE run_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_rollback_status ON rollback_plans(status, created_at);

-- Create updated_at trigger function (reuse if exists, idempotent)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'update_updated_at_column') THEN
        CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $func$
        BEGIN
            NEW.updated_at = CURRENT_TIMESTAMP;
            RETURN NEW;
        END;
        $func$ language 'plpgsql';
    END IF;
END
$$;

-- Create triggers for updated_at
CREATE TRIGGER update_memory_namespaces_updated_at BEFORE UPDATE ON memory_namespaces FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_upgrade_requests_updated_at BEFORE UPDATE ON upgrade_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rollback_plans_updated_at BEFORE UPDATE ON rollback_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert initial system memory namespace
INSERT INTO memory_namespaces (tenant_id, user_id, computer_id, namespace_name, namespace_type, memory_data, status)
VALUES ('default', 'system', 'computer_001', 'system_context', 'system', '{" initialized": true}', 'active')
ON CONFLICT (tenant_id, user_id, computer_id, namespace_name) DO NOTHING;
