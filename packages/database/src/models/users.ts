import { pgQuery } from '../connection';
import { v4 as uuidv4 } from 'uuid';
import { createHash } from 'node:crypto';

function sha256(input: string): string {
  return createHash('sha256').update(input).digest('hex');
}

function mapLocale(locale: 'vi' | 'en'): string {
  return locale === 'vi' ? 'vi-VN' : 'en-US';
}

export interface User {
  id: string;
  email: string;
  name: string;
  locale: 'vi' | 'en';
  tier: string;
  created_at: Date;
}

export interface Session {
  token: string;
  user_id: string;
  expires_at: Date;
  created_at: Date;
}

export interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  resource: string;
  details?: string;
  timestamp: Date;
}

export interface Invoice {
  id: string;
  user_id: string;
  product_id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'failed' | 'cancelled';
  transaction_id?: string;
  created_at: Date;
  paid_at?: Date;
}

export interface PushToken {
  id: number;
  user_id: string;
  token: string;
  platform: string;
  created_at: Date;
}

function rowToUser(row: any): User {
  return {
    id: row.id,
    email: row.email,
    name: row.display_name || row.name || '',
    locale: row.locale === 'vi-VN' ? 'vi' : 'en',
    tier: row.tier || 'free',
    created_at: row.created_at,
  };
}

// User Management
export async function createUser(email: string, name: string, locale: 'vi' | 'en' = 'vi'): Promise<User> {
  const id = uuidv4();
  const now = new Date();
  const emailHash = sha256(email);
  const mappedLocale = mapLocale(locale);
  const timezone = mappedLocale === 'vi-VN' ? 'Asia/Ho_Chi_Minh' : 'UTC';

  const result = await pgQuery(
    `INSERT INTO users (id, email, email_hash, display_name, locale, timezone, tier, status, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     RETURNING id, email, display_name as name, locale, tier, created_at`,
    [id, email, emailHash, name, mappedLocale, timezone, 'free', 'active', now, now]
  );

  return result.rows[0];
}

export async function getUserById(id: string): Promise<User | null> {
  const result = await pgQuery(
    'SELECT id, email, display_name as name, locale, tier, created_at FROM users WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const result = await pgQuery(
    'SELECT id, email, display_name as name, locale, tier, created_at FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0] || null;
}

export async function updateUser(id: string, updates: Partial<Pick<User, 'name' | 'locale'>>): Promise<User> {
  const fields: string[] = [];
  const values: any[] = [];

  if (updates.name !== undefined) {
    fields.push('display_name');
    values.push(updates.name);
  }
  if (updates.locale !== undefined) {
    fields.push('locale');
    values.push(mapLocale(updates.locale));
  }

  if (fields.length === 0) {
    throw new Error('No fields to update');
  }

  fields.push('updated_at');
  values.push(new Date());

  const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');

  const result = await pgQuery(
    `UPDATE users SET ${setClause} WHERE id = $${fields.length + 1} RETURNING id, email, display_name as name, locale, created_at`,
    [...values, id]
  );

  return result.rows[0];
}

export async function deleteUser(id: string): Promise<boolean> {
  const result = await pgQuery('DELETE FROM users WHERE id = $1', [id]);
  return (result.rowCount || 0) > 0;
}

// Session Management
export async function createSession(userId: string, expiresInDays: number = 7): Promise<Session> {
  const token = `sess_${uuidv4()}`;
  const now = new Date();
  const expiresAt = new Date(now.getTime() + expiresInDays * 24 * 60 * 60 * 1000);
  
  const result = await pgQuery(
    `INSERT INTO sessions (token, user_id, expires_at, created_at) VALUES ($1, $2, $3, $4) RETURNING *`,
    [token, userId, expiresAt, now]
  );
  
  return result.rows[0];
}

export async function getSession(token: string): Promise<Session | null> {
  const result = await pgQuery('SELECT * FROM sessions WHERE token = $1', [token]);
  return result.rows[0] || null;
}

export async function getActiveSession(token: string): Promise<Session | null> {
  const result = await pgQuery(
    'SELECT * FROM sessions WHERE token = $1 AND expires_at > NOW()',
    [token]
  );
  return result.rows[0] || null;
}

export async function deleteSession(token: string): Promise<boolean> {
  const result = await pgQuery('DELETE FROM sessions WHERE token = $1', [token]);
  return (result.rowCount || 0) > 0;
}

export async function deleteExpiredSessions(): Promise<number> {
  const result = await pgQuery('DELETE FROM sessions WHERE expires_at < NOW()');
  return result.rowCount || 0;
}

export async function deleteAllSessions(userId: string): Promise<number> {
  const result = await pgQuery('DELETE FROM sessions WHERE user_id = $1', [userId]);
  return result.rowCount || 0;
}

// Audit Log Management
export async function createAuditLog(userId: string, action: string, resource: string, details?: string): Promise<AuditLog> {
  const id = uuidv4();
  const now = new Date();
  
  const result = await pgQuery(
    `INSERT INTO audit_logs (id, user_id, action, resource, details, timestamp) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [id, userId, action, resource, details, now]
  );
  
  return result.rows[0];
}

export async function getAuditLogsByUser(userId: string, limit: number = 100): Promise<AuditLog[]> {
  const result = await pgQuery(
    'SELECT * FROM audit_logs WHERE user_id = $1 ORDER BY timestamp DESC LIMIT $2',
    [userId, limit]
  );
  return result.rows;
}

export async function getAuditLogsByResource(resource: string, limit: number = 100): Promise<AuditLog[]> {
  const result = await pgQuery(
    'SELECT * FROM audit_logs WHERE resource = $1 ORDER BY timestamp DESC LIMIT $2',
    [resource, limit]
  );
  return result.rows;
}

// Invoice Management
export async function createInvoice(userId: string, productId: string, amount: number, currency: string = 'USD', transactionId?: string): Promise<Invoice> {
  const id = uuidv4();
  const now = new Date();
  
  const result = await pgQuery(
    `INSERT INTO invoices (id, user_id, product_id, amount, currency, status, transaction_id, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [id, userId, productId, amount, currency, 'pending', transactionId || null, now]
  );
  
  return result.rows[0];
}

export async function getInvoiceById(id: string): Promise<Invoice | null> {
  const result = await pgQuery('SELECT * FROM invoices WHERE id = $1', [id]);
  return result.rows[0] || null;
}

export async function getInvoiceByTransactionId(transactionId: string): Promise<Invoice | null> {
  const result = await pgQuery('SELECT * FROM invoices WHERE transaction_id = $1', [transactionId]);
  return result.rows[0] || null;
}

export async function getInvoicesByUser(userId: string): Promise<Invoice[]> {
  const result = await pgQuery(
    'SELECT * FROM invoices WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  return result.rows;
}

export async function updateInvoiceStatus(id: string, status: Invoice['status'], paidAt?: Date): Promise<Invoice> {
  const result = await pgQuery(
    `UPDATE invoices SET status = $1, paid_at = $2 WHERE id = $3 RETURNING *`,
    [status, paidAt || null, id]
  );
  return result.rows[0];
}

export async function markInvoicePaid(id: string): Promise<Invoice> {
  const now = new Date();
  return updateInvoiceStatus(id, 'paid', now);
}

export async function deleteInvoice(id: string): Promise<boolean> {
  const result = await pgQuery('DELETE FROM invoices WHERE id = $1', [id]);
  return (result.rowCount || 0) > 0;
}

// Push Token Management
export async function createPushToken(userId: string, token: string, platform: string = 'expo'): Promise<PushToken> {
  const now = new Date();
  
  const result = await pgQuery(
    `INSERT INTO push_tokens (user_id, token, platform, created_at) VALUES ($1, $2, $3, $4) RETURNING *`,
    [userId, token, platform, now]
  );
  
  return result.rows[0];
}

export async function getPushTokenById(id: number): Promise<PushToken | null> {
  const result = await pgQuery('SELECT * FROM push_tokens WHERE id = $1', [id]);
  return result.rows[0] || null;
}

export async function getPushTokensByUser(userId: string): Promise<PushToken[]> {
  const result = await pgQuery(
    'SELECT * FROM push_tokens WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  return result.rows;
}

export async function getPushTokenByToken(token: string): Promise<PushToken | null> {
  const result = await pgQuery('SELECT * FROM push_tokens WHERE token = $1', [token]);
  return result.rows[0] || null;
}

export async function deletePushToken(id: number): Promise<boolean> {
  const result = await pgQuery('DELETE FROM push_tokens WHERE id = $1', [id]);
  return (result.rowCount || 0) > 0;
}

export async function deletePushTokenByToken(token: string): Promise<boolean> {
  const result = await pgQuery('DELETE FROM push_tokens WHERE token = $1', [token]);
  return (result.rowCount || 0) > 0;
}
