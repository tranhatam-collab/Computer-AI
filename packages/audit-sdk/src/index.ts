import {
  createAuditLog as pgCreateAuditLog,
  getAuditLogsByUser as pgGetAuditLogsByUser,
  getAuditLogsByResource as pgGetAuditLogsByResource
} from "@iai/database";

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  details: string;
  timestamp: number;
}

export async function writeAuditLog(userId: string, action: string, resource: string, details: string): Promise<AuditLog> {
  const log = await pgCreateAuditLog(userId, action, resource, details);
  return {
    id: log.id,
    userId: log.user_id,
    action: log.action,
    resource: log.resource,
    details: log.details || "",
    timestamp: Math.floor(new Date(log.timestamp).getTime() / 1000),
  };
}

export async function getAuditLogs(userId: string, limit = 50): Promise<AuditLog[]> {
  const logs = await pgGetAuditLogsByUser(userId, limit);
  return logs.map(log => ({
    id: log.id,
    userId: log.user_id,
    action: log.action,
    resource: log.resource,
    details: log.details || "",
    timestamp: Math.floor(new Date(log.timestamp).getTime() / 1000),
  }));
}

export async function getAllAuditLogs(limit = 100): Promise<AuditLog[]> {
  const logs = await pgGetAuditLogsByResource("*", limit);
  return logs.map(log => ({
    id: log.id,
    userId: log.user_id,
    action: log.action,
    resource: log.resource,
    details: log.details || "",
    timestamp: Math.floor(new Date(log.timestamp).getTime() / 1000),
  }));
}
