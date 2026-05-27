import { pgQuery } from '../connection';
import { v4 as uuidv4 } from 'uuid';

export interface VerifiedUser {
  id: string;
  tenant_id: string;
  user_id: string;
  verification_method: 'email' | 'phone' | 'biometric' | 'document' | 'multi_factor';
  verification_data: any; // JSONB
  verified_at: Date;
  expires_at?: Date;
  status: 'active' | 'expired' | 'revoked';
  created_at: Date;
  updated_at: Date;
}

export interface HumanVerificationRequest {
  id: string;
  tenant_id: string;
  user_id: string;
  computer_id: string;
  session_vault_id?: string;
  request_type: 'device_trust' | 'high_risk_action' | 'account_recovery' | 'profile_switch';
  request_data: any; // JSONB
  verification_methods: string[];
  current_method?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'expired';
  attempts: number;
  max_attempts: number;
  expires_at: Date;
  created_at: Date;
  updated_at: Date;
  completed_at?: Date;
}

// Verified User Management
export async function createVerifiedUser(data: Omit<VerifiedUser, 'id' | 'created_at' | 'updated_at'>): Promise<VerifiedUser> {
  const id = uuidv4();
  const now = new Date();
  
  const result = await pgQuery(
    `INSERT INTO verified_users (
      id, tenant_id, user_id, verification_method, verification_data,
      verified_at, expires_at, status, created_at, updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *`,
    [
      id, data.tenant_id, data.user_id, data.verification_method,
      JSON.stringify(data.verification_data), data.verified_at,
      data.expires_at, data.status, now, now
    ]
  );
  
  return result.rows[0];
}

export async function getVerifiedUser(id: string): Promise<VerifiedUser | null> {
  const result = await pgQuery('SELECT * FROM verified_users WHERE id = $1', [id]);
  return result.rows[0] || null;
}

export async function getVerifiedUsersByUser(tenantId: string, userId: string): Promise<VerifiedUser[]> {
  const result = await pgQuery(
    'SELECT * FROM verified_users WHERE tenant_id = $1 AND user_id = $2 ORDER BY created_at DESC',
    [tenantId, userId]
  );
  return result.rows;
}

export async function updateVerifiedUser(id: string, updates: Partial<VerifiedUser>): Promise<VerifiedUser> {
  const fields = Object.keys(updates).filter(key => key !== 'id' && key !== 'created_at');
  const values = Object.values(updates).filter((_, index) => fields[index] !== 'id' && fields[index] !== 'created_at');
  
  if (fields.length === 0) {
    throw new Error('No fields to update');
  }
  
  const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
  const updatedAt = new Date();
  
  const result = await pgQuery(
    `UPDATE verified_users SET ${setClause}, updated_at = $1 WHERE id = $${fields.length + 2} RETURNING *`,
    [updatedAt, ...values, id]
  );
  
  return result.rows[0];
}

export async function deleteVerifiedUser(id: string): Promise<boolean> {
  const result = await pgQuery('DELETE FROM verified_users WHERE id = $1', [id]);
  return (result.rowCount || 0) > 0;
}

// Human Verification Request Management
export async function createVerificationRequest(data: Omit<HumanVerificationRequest, 'id' | 'created_at' | 'updated_at' | 'attempts'>): Promise<HumanVerificationRequest> {
  const id = uuidv4();
  const now = new Date();
  
  const result = await pgQuery(
    `INSERT INTO human_verification_requests (
      id, tenant_id, user_id, computer_id, session_vault_id, request_type,
      request_data, verification_methods, current_method, status,
      attempts, max_attempts, expires_at, created_at, updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    RETURNING *`,
    [
      id, data.tenant_id, data.user_id, data.computer_id, data.session_vault_id,
      data.request_type, JSON.stringify(data.request_data),
      JSON.stringify(data.verification_methods), data.current_method,
      data.status, 0, data.max_attempts, data.expires_at, now, now
    ]
  );
  
  return result.rows[0];
}

export async function getVerificationRequest(id: string): Promise<HumanVerificationRequest | null> {
  const result = await pgQuery('SELECT * FROM human_verification_requests WHERE id = $1', [id]);
  return result.rows[0] || null;
}

export async function getVerificationRequestsByUser(tenantId: string, userId: string, computerId: string): Promise<HumanVerificationRequest[]> {
  const result = await pgQuery(
    'SELECT * FROM human_verification_requests WHERE tenant_id = $1 AND user_id = $2 AND computer_id = $3 ORDER BY created_at DESC',
    [tenantId, userId, computerId]
  );
  return result.rows;
}

export async function updateVerificationRequest(id: string, updates: Partial<HumanVerificationRequest>): Promise<HumanVerificationRequest> {
  const fields = Object.keys(updates).filter(key => key !== 'id' && key !== 'created_at');
  const values = Object.values(updates).filter((_, index) => fields[index] !== 'id' && fields[index] !== 'created_at');
  
  if (fields.length === 0) {
    throw new Error('No fields to update');
  }
  
  const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
  const updatedAt = new Date();
  
  const result = await pgQuery(
    `UPDATE human_verification_requests SET ${setClause}, updated_at = $1 WHERE id = $${fields.length + 2} RETURNING *`,
    [updatedAt, ...values, id]
  );
  
  return result.rows[0];
}

export async function incrementVerificationAttempts(id: string): Promise<HumanVerificationRequest> {
  const result = await pgQuery(
    'UPDATE human_verification_requests SET attempts = attempts + 1, updated_at = NOW() WHERE id = $1 RETURNING *',
    [id]
  );
  
  return result.rows[0];
}

export async function completeVerificationRequest(id: string, verificationData: any): Promise<HumanVerificationRequest> {
  const now = new Date();
  const result = await pgQuery(
    `UPDATE human_verification_requests 
     SET status = 'completed', completed_at = $1, updated_at = $1, request_data = $2 
     WHERE id = $3 RETURNING *`,
    [now, JSON.stringify(verificationData), id]
  );
  
  return result.rows[0];
}

export async function failVerificationRequest(id: string, reason?: string): Promise<HumanVerificationRequest> {
  const result = await pgQuery(
    `UPDATE human_verification_requests 
     SET status = 'failed', updated_at = NOW(), request_data = jsonb_set(request_data, '{failure_reason}', $2::jsonb)
     WHERE id = $1 RETURNING *`,
    [id, JSON.stringify(reason || 'Verification failed')]
  );
  
  return result.rows[0];
}

export async function deleteVerificationRequest(id: string): Promise<boolean> {
  const result = await pgQuery('DELETE FROM human_verification_requests WHERE id = $1', [id]);
  return (result.rowCount || 0) > 0;
}

// Verification Utilities
export async function cleanupExpiredVerificationRequests(): Promise<number> {
  const result = await pgQuery(
    'DELETE FROM human_verification_requests WHERE expires_at < NOW() OR status IN ($1, $2)',
    ['expired', 'failed']
  );
  return result.rowCount || 0;
}

export async function getPendingVerificationCount(tenantId: string, userId: string, computerId: string): Promise<number> {
  const result = await pgQuery(
    'SELECT COUNT(*) as count FROM human_verification_requests WHERE tenant_id = $1 AND user_id = $2 AND computer_id = $3 AND status = $4 AND expires_at > NOW()',
    [tenantId, userId, computerId, 'pending']
  );
  return parseInt(result.rows[0].count);
}

export async function isUserVerified(tenantId: string, userId: string, method?: string): Promise<boolean> {
  let query = 'SELECT COUNT(*) as count FROM verified_users WHERE tenant_id = $1 AND user_id = $2 AND status = $3 AND (expires_at IS NULL OR expires_at > NOW())';
  let params: any[] = [tenantId, userId, 'active'];
  
  if (method) {
    query += ' AND verification_method = $4';
    params.push(method);
  }
  
  const result = await pgQuery(query, params);
  return parseInt(result.rows[0].count) > 0;
}

export async function getLatestVerification(tenantId: string, userId: string, method?: string): Promise<VerifiedUser | null> {
  let query = 'SELECT * FROM verified_users WHERE tenant_id = $1 AND user_id = $2 AND status = $3 AND (expires_at IS NULL OR expires_at > NOW())';
  let params: any[] = [tenantId, userId, 'active'];
  
  if (method) {
    query += ' AND verification_method = $4';
    params.push(method);
  }
  
  query += ' ORDER BY verified_at DESC LIMIT 1';
  
  const result = await pgQuery(query, params);
  return result.rows[0] || null;
}
