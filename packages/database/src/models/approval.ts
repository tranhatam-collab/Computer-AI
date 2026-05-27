import { pgQuery } from '../connection';
import { v4 as uuidv4 } from 'uuid';

export interface ApprovalRequest {
  id: string;
  tenant_id: string;
  user_id: string;
  computer_id: string;
  session_vault_id?: string;
  action_type: string;
  action_data: any;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'approved' | 'rejected' | 'expired' | 'cancelled';
  requested_by: string;
  approved_by?: string;
  approved_at?: Date;
  rejected_at?: Date;
  expires_at: Date;
  human_verification_required: boolean;
  human_verification_id?: string;
  justification?: string;
  created_at: Date;
  updated_at: Date;
}

export async function createApprovalRequest(data: Omit<ApprovalRequest, 'id' | 'created_at' | 'updated_at'>): Promise<ApprovalRequest> {
  const id = uuidv4();
  const now = new Date();
  const result = await pgQuery(
    `INSERT INTO approval_requests (id, tenant_id, user_id, computer_id, session_vault_id, action_type, action_data, risk_level, status, requested_by, approved_by, approved_at, rejected_at, expires_at, human_verification_required, human_verification_id, justification, created_at, updated_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19) RETURNING *`,
    [id, data.tenant_id, data.user_id, data.computer_id, data.session_vault_id, data.action_type, JSON.stringify(data.action_data), data.risk_level, data.status, data.requested_by, data.approved_by, data.approved_at, data.rejected_at, data.expires_at, data.human_verification_required, data.human_verification_id, data.justification, now, now]
  );
  return result.rows[0];
}

export async function getApprovalRequest(id: string): Promise<ApprovalRequest | null> {
  const result = await pgQuery('SELECT * FROM approval_requests WHERE id = $1', [id]);
  return result.rows[0] || null;
}

export async function getApprovalRequestsByUser(tenantId: string, userId: string, computerId: string, status?: string): Promise<ApprovalRequest[]> {
  let query = 'SELECT * FROM approval_requests WHERE tenant_id = $1 AND user_id = $2 AND computer_id = $3';
  const params: any[] = [tenantId, userId, computerId];
  if (status) { query += ' AND status = $4'; params.push(status); }
  query += ' ORDER BY created_at DESC';
  const result = await pgQuery(query, params);
  return result.rows;
}

export async function updateApprovalRequest(id: string, updates: Partial<ApprovalRequest>): Promise<ApprovalRequest> {
  const fields = Object.keys(updates).filter(k => !['id','created_at'].includes(k));
  if (!fields.length) throw new Error('No fields to update');
  const setClause = fields.map((f, i) => `${f} = $${i+2}`).join(', ');
  const result = await pgQuery(`UPDATE approval_requests SET ${setClause}, updated_at = $1 WHERE id = $${fields.length+2} RETURNING *`, [new Date(), ...fields.map(f => (updates as any)[f]), id]);
  return result.rows[0];
}

export async function approveRequest(id: string, approvedBy: string, justification?: string): Promise<ApprovalRequest> {
  const result = await pgQuery(
    'UPDATE approval_requests SET status = $1, approved_by = $2, approved_at = $3, justification = $4, updated_at = $3 WHERE id = $5 RETURNING *',
    ['approved', approvedBy, new Date(), justification, id]
  );
  return result.rows[0];
}

export async function rejectRequest(id: string, rejectedBy: string, justification?: string): Promise<ApprovalRequest> {
  const result = await pgQuery(
    'UPDATE approval_requests SET status = $1, approved_by = $2, rejected_at = $3, justification = $4, updated_at = $3 WHERE id = $5 RETURNING *',
    ['rejected', rejectedBy, new Date(), justification, id]
  );
  return result.rows[0];
}

export async function deleteApprovalRequest(id: string): Promise<boolean> {
  const result = await pgQuery('DELETE FROM approval_requests WHERE id = $1', [id]);
  return (result.rowCount || 0) > 0;
}

export async function getPendingApprovalCount(tenantId: string, userId: string, computerId: string): Promise<number> {
  const result = await pgQuery('SELECT COUNT(*) as count FROM approval_requests WHERE tenant_id = $1 AND user_id = $2 AND computer_id = $3 AND status = $4 AND expires_at > NOW()', [tenantId, userId, computerId, 'pending']);
  return parseInt(result.rows[0].count);
}

export async function cleanupExpiredApprovals(): Promise<number> {
  const result = await pgQuery("UPDATE approval_requests SET status = 'expired' WHERE expires_at < NOW() AND status = 'pending'");
  return result.rowCount || 0;
}
