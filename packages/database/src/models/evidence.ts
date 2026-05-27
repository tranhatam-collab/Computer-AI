import { pgQuery } from '../connection';
import { v4 as uuidv4 } from 'uuid';

export interface EvidencePack {
  id: string;
  tenant_id: string;
  user_id: string;
  computer_id: string;
  run_id: string;
  user_command: string;
  platforms: string[];
  screenshots: string[];
  actions_taken: string[];
  approvals: string[];
  final_urls: string[];
  risk_flags: string[];
  status: 'completed' | 'partial' | 'blocked' | 'failed';
  created_at: Date;
}

export async function createEvidencePack(data: Omit<EvidencePack, 'id' | 'created_at'>): Promise<EvidencePack> {
  const id = uuidv4();
  const now = new Date();
  const result = await pgQuery(
    `INSERT INTO evidence_packs (id, tenant_id, user_id, computer_id, run_id, user_command, platforms, screenshots, actions_taken, approvals, final_urls, risk_flags, status, created_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *`,
    [id, data.tenant_id, data.user_id, data.computer_id, data.run_id, data.user_command, data.platforms || [], data.screenshots || [], data.actions_taken || [], data.approvals || [], data.final_urls || [], data.risk_flags || [], data.status, now]
  );
  return result.rows[0];
}

export async function getEvidencePack(id: string): Promise<EvidencePack | null> {
  const result = await pgQuery('SELECT * FROM evidence_packs WHERE id = $1', [id]);
  return result.rows[0] || null;
}

export async function getEvidencePacksByRun(runId: string): Promise<EvidencePack[]> {
  const result = await pgQuery('SELECT * FROM evidence_packs WHERE run_id = $1 ORDER BY created_at DESC', [runId]);
  return result.rows;
}

export async function getEvidencePacksByUser(tenantId: string, userId: string, computerId: string, limit = 50): Promise<EvidencePack[]> {
  const result = await pgQuery(
    'SELECT * FROM evidence_packs WHERE tenant_id = $1 AND user_id = $2 AND computer_id = $3 ORDER BY created_at DESC LIMIT $4',
    [tenantId, userId, computerId, limit]
  );
  return result.rows;
}

export async function updateEvidencePackStatus(id: string, status: EvidencePack['status']): Promise<EvidencePack> {
  const result = await pgQuery(
    'UPDATE evidence_packs SET status = $1 WHERE id = $2 RETURNING *',
    [status, id]
  );
  return result.rows[0];
}
