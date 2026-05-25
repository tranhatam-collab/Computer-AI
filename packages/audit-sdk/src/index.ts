import { getDb } from "@iai/database";
import crypto from "crypto";

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  details: string;
  timestamp: number;
}

export function writeAuditLog(userId: string, action: string, resource: string, details: string): AuditLog {
  const db = getDb();
  const id = `aud_${crypto.randomUUID().substring(0, 8)}`;
  const timestamp = Date.now();
  db.prepare(
    `INSERT INTO audit_logs (id, user_id, action, resource, details, timestamp) VALUES (?, ?, ?, ?, ?, ?)`
  ).run(id, userId, action, resource, details, timestamp);
  return { id, userId, action, resource, details, timestamp };
}

export function getAuditLogs(userId: string, limit = 50): AuditLog[] {
  const db = getDb();
  return db.prepare(
    `SELECT id, user_id as userId, action, resource, details, timestamp FROM audit_logs WHERE user_id = ? ORDER BY timestamp DESC LIMIT ?`
  ).all(userId, limit) as AuditLog[];
}

export function getAllAuditLogs(limit = 100): AuditLog[] {
  const db = getDb();
  return db.prepare(
    `SELECT id, user_id as userId, action, resource, details, timestamp FROM audit_logs ORDER BY timestamp DESC LIMIT ?`
  ).all(limit) as AuditLog[];
}
