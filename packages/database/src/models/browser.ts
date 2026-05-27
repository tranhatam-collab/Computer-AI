import { pgQuery } from '../connection';
import { v4 as uuidv4 } from 'uuid';

export interface SessionVaultRecord {
  id: string;
  tenant_id: string;
  user_id: string;
  computer_id: string;
  browser_profile_id?: string;
  platform: string;
  encrypted_cookie_jar_ref: string;
  encrypted_local_storage_ref?: string;
  encrypted_device_binding_ref?: string;
  storage_region: string;
  key_version: string;
  status: 'valid' | 'expired' | 'revoked';
  created_at: Date;
  updated_at: Date;
  last_used_at?: Date;
  expires_at?: Date;
}

export interface BrowserProfile {
  id: string;
  tenant_id: string;
  user_id: string;
  computer_id: string;
  profile_name: string;
  mode: 'local_personal' | 'cloud_personal' | 'enterprise' | 'incognito';
  status: 'active' | 'inactive' | 'suspended';
  region?: string;
  storage_region?: string;
  encrypted_profile_ref?: string;
  user_agent?: string;
  viewport_width?: number;
  viewport_height?: number;
  created_at: Date;
  updated_at: Date;
  last_used_at?: Date;
}

export interface TrustedDevice {
  id: string;
  tenant_id: string;
  user_id: string;
  computer_id: string;
  device_id: string;
  device_name?: string;
  device_type?: string;
  device_fingerprint?: string;
  trust_level: 'low' | 'medium' | 'high' | 'maximum';
  last_seen_at?: Date;
  expires_at?: Date;
  created_at: Date;
  updated_at: Date;
}

// Session Vault Management
export async function createSessionVault(data: Omit<SessionVaultRecord, 'id' | 'created_at' | 'updated_at'>): Promise<SessionVaultRecord> {
  const id = uuidv4();
  const now = new Date();
  
  const result = await pgQuery(
    `INSERT INTO session_vault_records (
      id, tenant_id, user_id, computer_id, browser_profile_id, platform,
      encrypted_cookie_jar_ref, encrypted_local_storage_ref, encrypted_device_binding_ref,
      storage_region, key_version, status, created_at, updated_at, last_used_at, expires_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
    RETURNING *`,
    [
      id, data.tenant_id, data.user_id, data.computer_id, data.browser_profile_id, data.platform,
      data.encrypted_cookie_jar_ref, data.encrypted_local_storage_ref, data.encrypted_device_binding_ref,
      data.storage_region, data.key_version, data.status, now, now, data.last_used_at, data.expires_at
    ]
  );
  
  return result.rows[0];
}

export async function getSessionVault(id: string): Promise<SessionVaultRecord | null> {
  const result = await pgQuery('SELECT * FROM session_vault_records WHERE id = $1', [id]);
  return result.rows[0] || null;
}

export async function getSessionVaultsByUser(tenantId: string, userId: string, computerId: string): Promise<SessionVaultRecord[]> {
  const result = await pgQuery(
    'SELECT * FROM session_vault_records WHERE tenant_id = $1 AND user_id = $2 AND computer_id = $3 ORDER BY created_at DESC',
    [tenantId, userId, computerId]
  );
  return result.rows;
}

export async function updateSessionVault(id: string, updates: Partial<SessionVaultRecord>): Promise<SessionVaultRecord> {
  const fields = Object.keys(updates).filter(key => key !== 'id' && key !== 'created_at');
  const values = Object.values(updates).filter((_, index) => fields[index] !== 'id' && fields[index] !== 'created_at');
  
  if (fields.length === 0) {
    throw new Error('No fields to update');
  }
  
  const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
  const updatedAt = new Date();
  
  const result = await pgQuery(
    `UPDATE session_vault_records SET ${setClause}, updated_at = $1 WHERE id = $${fields.length + 2} RETURNING *`,
    [updatedAt, ...values, id]
  );
  
  return result.rows[0];
}

export async function deleteSessionVault(id: string): Promise<boolean> {
  const result = await pgQuery('DELETE FROM session_vault_records WHERE id = $1', [id]);
  return (result.rowCount || 0) > 0;
}

// Browser Profile Management
export async function createBrowserProfile(data: Omit<BrowserProfile, 'id' | 'created_at' | 'updated_at'>): Promise<BrowserProfile> {
  const id = uuidv4();
  const now = new Date();
  
  const result = await pgQuery(
    `INSERT INTO browser_profiles (
      id, tenant_id, user_id, computer_id, profile_name, mode, status,
      region, storage_region, encrypted_profile_ref, user_agent,
      viewport_width, viewport_height, created_at, updated_at, last_used_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
    RETURNING *`,
    [
      id, data.tenant_id, data.user_id, data.computer_id, data.profile_name, data.mode, data.status,
      data.region, data.storage_region, data.encrypted_profile_ref, data.user_agent,
      data.viewport_width, data.viewport_height, now, now, data.last_used_at
    ]
  );
  
  return result.rows[0];
}

export async function getBrowserProfile(id: string): Promise<BrowserProfile | null> {
  const result = await pgQuery('SELECT * FROM browser_profiles WHERE id = $1', [id]);
  return result.rows[0] || null;
}

export async function getBrowserProfilesByUser(tenantId: string, userId: string, computerId: string): Promise<BrowserProfile[]> {
  const result = await pgQuery(
    'SELECT * FROM browser_profiles WHERE tenant_id = $1 AND user_id = $2 AND computer_id = $3 ORDER BY created_at DESC',
    [tenantId, userId, computerId]
  );
  return result.rows;
}

export async function updateBrowserProfile(id: string, updates: Partial<BrowserProfile>): Promise<BrowserProfile> {
  const fields = Object.keys(updates).filter(key => key !== 'id' && key !== 'created_at');
  const values = Object.values(updates).filter((_, index) => fields[index] !== 'id' && fields[index] !== 'created_at');
  
  if (fields.length === 0) {
    throw new Error('No fields to update');
  }
  
  const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
  const updatedAt = new Date();
  
  const result = await pgQuery(
    `UPDATE browser_profiles SET ${setClause}, updated_at = $1 WHERE id = $${fields.length + 2} RETURNING *`,
    [updatedAt, ...values, id]
  );
  
  return result.rows[0];
}

export async function deleteBrowserProfile(id: string): Promise<boolean> {
  const result = await pgQuery('DELETE FROM browser_profiles WHERE id = $1', [id]);
  return (result.rowCount || 0) > 0;
}

// Trusted Device Management
export async function createTrustedDevice(data: Omit<TrustedDevice, 'id' | 'created_at' | 'updated_at'>): Promise<TrustedDevice> {
  const id = uuidv4();
  const now = new Date();
  
  const result = await pgQuery(
    `INSERT INTO trusted_devices (
      id, tenant_id, user_id, computer_id, device_id, device_name, device_type,
      device_fingerprint, trust_level, last_seen_at, expires_at, created_at, updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    RETURNING *`,
    [id, data.tenant_id, data.user_id, data.computer_id, data.device_id, data.device_name, data.device_type,
     data.device_fingerprint, data.trust_level, data.last_seen_at, data.expires_at, now, now]
  );
  
  return result.rows[0];
}

export async function getTrustedDevice(id: string): Promise<TrustedDevice | null> {
  const result = await pgQuery('SELECT * FROM trusted_devices WHERE id = $1', [id]);
  return result.rows[0] || null;
}

export async function getTrustedDevicesByUser(tenantId: string, userId: string, computerId: string): Promise<TrustedDevice[]> {
  const result = await pgQuery(
    'SELECT * FROM trusted_devices WHERE tenant_id = $1 AND user_id = $2 AND computer_id = $3 ORDER BY created_at DESC',
    [tenantId, userId, computerId]
  );
  return result.rows;
}

export async function getTrustedDeviceByDeviceId(tenantId: string, userId: string, computerId: string, deviceId: string): Promise<TrustedDevice | null> {
  const result = await pgQuery(
    'SELECT * FROM trusted_devices WHERE tenant_id = $1 AND user_id = $2 AND computer_id = $3 AND device_id = $4',
    [tenantId, userId, computerId, deviceId]
  );
  return result.rows[0] || null;
}

export async function updateTrustedDevice(id: string, updates: Partial<TrustedDevice>): Promise<TrustedDevice> {
  const fields = Object.keys(updates).filter(key => key !== 'id' && key !== 'created_at');
  const values = Object.values(updates).filter((_, index) => fields[index] !== 'id' && fields[index] !== 'created_at');
  
  if (fields.length === 0) {
    throw new Error('No fields to update');
  }
  
  const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
  const updatedAt = new Date();
  
  const result = await pgQuery(
    `UPDATE trusted_devices SET ${setClause}, updated_at = $1 WHERE id = $${fields.length + 2} RETURNING *`,
    [updatedAt, ...values, id]
  );
  
  return result.rows[0];
}

export async function deleteTrustedDevice(id: string): Promise<boolean> {
  const result = await pgQuery('DELETE FROM trusted_devices WHERE id = $1', [id]);
  return (result.rowCount || 0) > 0;
}

// Session Management Utilities
export async function cleanupExpiredSessions(): Promise<number> {
  const result = await pgQuery(
    'DELETE FROM session_vault_records WHERE expires_at < NOW() OR status = $1',
    ['expired']
  );
  return result.rowCount || 0;
}

export async function updateSessionLastUsed(sessionId: string): Promise<void> {
  await pgQuery(
    'UPDATE session_vault_records SET last_used_at = NOW() WHERE id = $1',
    [sessionId]
  );
}

export async function getActiveSessionCount(tenantId: string, userId: string, computerId: string): Promise<number> {
  const result = await pgQuery(
    'SELECT COUNT(*) as count FROM session_vault_records WHERE tenant_id = $1 AND user_id = $2 AND computer_id = $3 AND status = $4 AND (expires_at IS NULL OR expires_at > NOW())',
    [tenantId, userId, computerId, 'valid']
  );
  return parseInt(result.rows[0].count);
}

// Browser Session (lightweight table for tests)
export interface BrowserSession {
  id: string;
  user_id: string;
  session_type: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export async function createBrowserSession(data: { user_id: string; session_type?: string; status?: string }): Promise<BrowserSession> {
  const id = uuidv4();
  const now = new Date();
  const result = await pgQuery(
    `INSERT INTO browser_sessions (id, user_id, session_type, status, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [id, data.user_id, data.session_type || 'manual', data.status || 'active', now, now]
  );
  return result.rows[0];
}

export async function getBrowserSession(id: string): Promise<BrowserSession | null> {
  const result = await pgQuery('SELECT * FROM browser_sessions WHERE id = $1', [id]);
  return result.rows[0] || null;
}

// Connected Accounts
export interface ConnectedAccount {
  id: string;
  tenant_id: string;
  user_id: string;
  computer_id: string;
  provider: string;
  account_label: string;
  account_url?: string;
  connection_type: string;
  status: string;
  scopes?: string[];
  permission_policy_id?: string;
  session_id?: string;
  vault_item_ids?: string[];
  last_checked_at?: Date;
  external_account_id?: string;
  access_token_encrypted?: string;
  refresh_token_encrypted?: string;
  token_expires_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export async function createConnectedAccount(data: Omit<ConnectedAccount, 'id' | 'created_at' | 'updated_at'>): Promise<ConnectedAccount> {
  const id = uuidv4();
  const now = new Date();
  const result = await pgQuery(
    `INSERT INTO connected_accounts (id, tenant_id, user_id, computer_id, provider, account_label, account_url, connection_type, status, scopes, permission_policy_id, session_id, vault_item_ids, last_checked_at, external_account_id, access_token_encrypted, refresh_token_encrypted, token_expires_at, created_at, updated_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *`,
    [id, data.tenant_id, data.user_id, data.computer_id, data.provider, data.account_label, data.account_url || null, data.connection_type, data.status, data.scopes || [], data.permission_policy_id || null, data.session_id || null, data.vault_item_ids || [], data.last_checked_at || null, data.external_account_id || null, data.access_token_encrypted || null, data.refresh_token_encrypted || null, data.token_expires_at || null, now, now]
  );
  return result.rows[0];
}

export async function getConnectedAccount(id: string): Promise<ConnectedAccount | null> {
  const result = await pgQuery('SELECT * FROM connected_accounts WHERE id = $1', [id]);
  return result.rows[0] || null;
}

export async function getConnectedAccountsByUser(tenantId: string, userId: string, computerId: string): Promise<ConnectedAccount[]> {
  const result = await pgQuery(
    'SELECT * FROM connected_accounts WHERE tenant_id = $1 AND user_id = $2 AND computer_id = $3 ORDER BY created_at DESC',
    [tenantId, userId, computerId]
  );
  return result.rows;
}

export async function updateConnectedAccount(id: string, updates: Partial<ConnectedAccount>): Promise<ConnectedAccount> {
  const fields = Object.keys(updates).filter(k => !['id', 'created_at'].includes(k));
  if (!fields.length) throw new Error('No fields to update');
  const setClause = fields.map((f, i) => `${f} = $${i + 2}`).join(', ');
  const result = await pgQuery(
    `UPDATE connected_accounts SET ${setClause}, updated_at = $1 WHERE id = $${fields.length + 2} RETURNING *`,
    [new Date(), ...fields.map(f => (updates as any)[f]), id]
  );
  return result.rows[0];
}

export async function deleteConnectedAccount(id: string): Promise<boolean> {
  const result = await pgQuery('DELETE FROM connected_accounts WHERE id = $1', [id]);
  return (result.rowCount || 0) > 0;
}
