-- Migration 002: AI Browser Schema
-- Created: 2026-05-27
-- Description: Database schema for AI Browser functionality

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Verified users table for human verification
CREATE TABLE IF NOT EXISTS verified_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    computer_id VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255),
    verification_status VARCHAR(50) NOT NULL DEFAULT 'pending',
    verification_method VARCHAR(50),
    verified_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(tenant_id, user_id, computer_id)
);

-- Trusted devices for multi-device support
CREATE TABLE IF NOT EXISTS trusted_devices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    computer_id VARCHAR(255) NOT NULL,
    device_id VARCHAR(255) NOT NULL,
    device_name VARCHAR(255),
    device_type VARCHAR(50),
    device_fingerprint TEXT,
    trust_level VARCHAR(50) NOT NULL DEFAULT 'low',
    last_seen_at TIMESTAMP,
    expires_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(tenant_id, user_id, computer_id, device_id)
);

-- Browser profiles for different browsing contexts
CREATE TABLE IF NOT EXISTS browser_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    computer_id VARCHAR(255) NOT NULL,
    profile_name VARCHAR(255) NOT NULL,
    mode VARCHAR(50) NOT NULL DEFAULT 'local_personal',
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    region VARCHAR(100),
    storage_region VARCHAR(100),
    encrypted_profile_ref VARCHAR(500),
    user_agent VARCHAR(500),
    viewport_width INTEGER,
    viewport_height INTEGER,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_used_at TIMESTAMP
);

-- Connected accounts for OAuth and external integrations
CREATE TABLE IF NOT EXISTS connected_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    computer_id VARCHAR(255) NOT NULL,
    provider VARCHAR(100) NOT NULL,
    account_label VARCHAR(255) NOT NULL,
    account_url VARCHAR(500),
    connection_type VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'connected',
    scopes TEXT[],
    permission_policy_id VARCHAR(255),
    session_id VARCHAR(255),
    vault_item_ids UUID[],
    last_checked_at TIMESTAMP,
    external_account_id VARCHAR(255),
    access_token_encrypted TEXT,
    refresh_token_encrypted TEXT,
    token_expires_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(tenant_id, user_id, computer_id, provider, external_account_id)
);

-- Vault items for secure credential storage
CREATE TABLE IF NOT EXISTS vault_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    owner_id VARCHAR(255) NOT NULL,
    computer_id VARCHAR(255) NOT NULL,
    provider VARCHAR(100) NOT NULL,
    item_type VARCHAR(100) NOT NULL,
    encrypted_payload_ref VARCHAR(500) NOT NULL,
    kms_key_ref VARCHAR(500) NOT NULL,
    key_version VARCHAR(50) NOT NULL,
    scopes TEXT[],
    risk_level VARCHAR(50) NOT NULL DEFAULT 'medium',
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    metadata JSONB,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_used_at TIMESTAMP,
    expires_at TIMESTAMP
);

-- Browser actions for audit trail
CREATE TABLE IF NOT EXISTS browser_action_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    computer_id VARCHAR(255) NOT NULL,
    run_id VARCHAR(255) NOT NULL,
    action_type VARCHAR(100) NOT NULL,
    action_data JSONB NOT NULL,
    target_origin VARCHAR(500),
    risk_level VARCHAR(50) NOT NULL DEFAULT 'medium',
    approval_required BOOLEAN NOT NULL DEFAULT false,
    approval_id UUID,
    status VARCHAR(50) NOT NULL DEFAULT 'planned',
    execution_result JSONB,
    evidence_pack_id UUID,
    error_message TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    executed_at TIMESTAMP
);

-- Approval requests for human-in-the-loop
CREATE TABLE IF NOT EXISTS approval_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    computer_id VARCHAR(255) NOT NULL,
    action_class VARCHAR(100) NOT NULL,
    risk_level VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    action_data JSONB NOT NULL,
    context_data JSONB,
    requested_by VARCHAR(255),
    approved_by VARCHAR(255),
    approved_at TIMESTAMP,
    rejected_by VARCHAR(255),
    rejected_at TIMESTAMP,
    expires_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Human verification requests
CREATE TABLE IF NOT EXISTS human_verification_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    computer_id VARCHAR(255) NOT NULL,
    run_id VARCHAR(255),
    platform VARCHAR(100) NOT NULL,
    reason VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'waiting_user',
    verification_data JSONB,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Session vault records for browser session persistence
CREATE TABLE IF NOT EXISTS session_vault_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    computer_id VARCHAR(255) NOT NULL,
    browser_profile_id UUID REFERENCES browser_profiles(id),
    platform VARCHAR(100) NOT NULL,
    encrypted_cookie_jar_ref VARCHAR(500) NOT NULL,
    encrypted_local_storage_ref VARCHAR(500),
    encrypted_device_binding_ref VARCHAR(500),
    storage_region VARCHAR(100) NOT NULL,
    key_version VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'valid',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_used_at TIMESTAMP,
    expires_at TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_verified_users_tenant_user ON verified_users(tenant_id, user_id);
CREATE INDEX IF NOT EXISTS idx_trusted_devices_user ON trusted_devices(tenant_id, user_id, computer_id);
CREATE INDEX IF NOT EXISTS idx_browser_profiles_user ON browser_profiles(tenant_id, user_id, computer_id);
CREATE INDEX IF NOT EXISTS idx_connected_accounts_user ON connected_accounts(tenant_id, user_id, computer_id);
CREATE INDEX IF NOT EXISTS idx_vault_items_owner ON vault_items(tenant_id, owner_id, computer_id);
CREATE INDEX IF NOT EXISTS idx_browser_action_records_run ON browser_action_records(run_id);
CREATE INDEX IF NOT EXISTS idx_approval_requests_pending ON approval_requests(status, created_at);
CREATE INDEX IF NOT EXISTS idx_human_verification_requests_pending ON human_verification_requests(status, expires_at);
CREATE INDEX IF NOT EXISTS idx_session_vault_records_profile ON session_vault_records(browser_profile_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_verified_users_updated_at BEFORE UPDATE ON verified_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_trusted_devices_updated_at BEFORE UPDATE ON trusted_devices FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_browser_profiles_updated_at BEFORE UPDATE ON browser_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_connected_accounts_updated_at BEFORE UPDATE ON connected_accounts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_vault_items_updated_at BEFORE UPDATE ON vault_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_browser_action_records_updated_at BEFORE UPDATE ON browser_action_records FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_approval_requests_updated_at BEFORE UPDATE ON approval_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_human_verification_requests_updated_at BEFORE UPDATE ON human_verification_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_session_vault_records_updated_at BEFORE UPDATE ON session_vault_records FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert initial data
INSERT INTO verified_users (tenant_id, user_id, computer_id, email, verification_status) 
VALUES ('default', 'system', 'computer_001', 'system@computer.iai.one', 'verified')
ON CONFLICT (tenant_id, user_id, computer_id) DO NOTHING;
