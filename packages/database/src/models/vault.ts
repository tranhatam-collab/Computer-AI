import { pgQuery } from '../connection';
import { v4 as uuidv4 } from 'uuid';

export interface VaultItem {
  id: string;
  tenant_id: string;
  user_id: string;
  computer_id: string;
  browser_profile_id?: string;
  item_type: 'password' | 'credit_card' | 'note' | 'document' | 'api_key' | 'token' | 'secret';
  encrypted_item_ref: string;
  key_version: string;
  storage_region: string;
  metadata?: any;
  status: 'active' | 'archived' | 'expired';
  created_at: Date;
  updated_at: Date;
  last_accessed_at?: Date;
  expires_at?: Date;
}

export async function createVaultItem(data: Omit<VaultItem, 'id' | 'created_at' | 'updated_at'>): Promise<VaultItem> {
  const id = uuidv4();
  const now = new Date();
  const result = await pgQuery(
    `INSERT INTO vault_items (id, tenant_id, user_id, computer_id, browser_profile_id, item_type, encrypted_item_ref, key_version, storage_region, metadata, status, created_at, updated_at, last_accessed_at, expires_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING *`,
    [id, data.tenant_id, data.user_id, data.computer_id, data.browser_profile_id, data.item_type, data.encrypted_item_ref, data.key_version, data.storage_region, JSON.stringify(data.metadata || {}), data.status, now, now, data.last_accessed_at, data.expires_at]
  );
  return result.rows[0];
}

export async function getVaultItem(id: string): Promise<VaultItem | null> {
  const result = await pgQuery('SELECT * FROM vault_items WHERE id = $1', [id]);
  return result.rows[0] || null;
}

export async function getVaultItemsByUser(tenantId: string, userId: string, computerId: string): Promise<VaultItem[]> {
  const result = await pgQuery('SELECT * FROM vault_items WHERE tenant_id = $1 AND user_id = $2 AND computer_id = $3 ORDER BY created_at DESC', [tenantId, userId, computerId]);
  return result.rows;
}

export async function updateVaultItem(id: string, updates: Partial<VaultItem>): Promise<VaultItem> {
  const fields = Object.keys(updates).filter(k => !['id','created_at'].includes(k));
  if (!fields.length) throw new Error('No fields to update');
  const setClause = fields.map((f, i) => `${f} = $${i+2}`).join(', ');
  const result = await pgQuery(`UPDATE vault_items SET ${setClause}, updated_at = $1 WHERE id = $${fields.length+2} RETURNING *`, [new Date(), ...fields.map(f => (updates as any)[f]), id]);
  return result.rows[0];
}

export async function deleteVaultItem(id: string): Promise<boolean> {
  const result = await pgQuery('DELETE FROM vault_items WHERE id = $1', [id]);
  return (result.rowCount || 0) > 0;
}

export async function getVaultItemsByType(tenantId: string, userId: string, computerId: string, itemType: string): Promise<VaultItem[]> {
  const result = await pgQuery('SELECT * FROM vault_items WHERE tenant_id = $1 AND user_id = $2 AND computer_id = $3 AND item_type = $4 ORDER BY created_at DESC', [tenantId, userId, computerId, itemType]);
  return result.rows;
}

export async function updateVaultLastAccessed(id: string): Promise<void> {
  await pgQuery('UPDATE vault_items SET last_accessed_at = NOW() WHERE id = $1', [id]);
}

export async function archiveExpiredVaultItems(): Promise<number> {
  const result = await pgQuery("UPDATE vault_items SET status = 'archived' WHERE expires_at < NOW() AND status = 'active'");
  return result.rowCount || 0;
}

export async function getVaultItemCount(tenantId: string, userId: string, computerId: string): Promise<number> {
  const result = await pgQuery('SELECT COUNT(*) as count FROM vault_items WHERE tenant_id = $1 AND user_id = $2 AND computer_id = $3 AND status = $4', [tenantId, userId, computerId, 'active']);
  return parseInt(result.rows[0].count);
}
