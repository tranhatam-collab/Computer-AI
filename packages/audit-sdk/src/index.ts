import { db } from "@iai/database";
import type { AuditLog } from "@iai/database";
import crypto from "crypto";

export function writeAuditLog(userId: string, action: string, resource: string, details: string): AuditLog {
  const log: AuditLog = {
    id: `aud_${crypto.randomUUID().substring(0, 8)}`,
    userId,
    action,
    resource,
    details,
    timestamp: Date.now(),
  };

  const userLogs = db.auditLogs.get(userId) || [];
  userLogs.unshift(log);
  db.auditLogs.set(userId, userLogs);
  return log;
}

export function getAuditLogs(userId: string, limit = 50): AuditLog[] {
  return (db.auditLogs.get(userId) || []).slice(0, limit);
}

export function getAllAuditLogs(limit = 100): AuditLog[] {
  const all: AuditLog[] = [];
  for (const logs of db.auditLogs.values()) {
    all.push(...logs);
  }
  return all.sort((a, b) => b.timestamp - a.timestamp).slice(0, limit);
}
