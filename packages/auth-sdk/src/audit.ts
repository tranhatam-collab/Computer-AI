import { pgQuery } from "@iai/database";
import { createHash } from "node:crypto";

export type ActorType = "user" | "system" | "agent" | "admin";

export interface AuditEntry {
  entityType: string;
  entityId: string;
  action: string;
  actorId?: string;
  actorType?: ActorType;
  beforeState?: Record<string, unknown>;
  afterState?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

export async function createAuditEntry(entry: AuditEntry): Promise<void> {
  await pgQuery(
    `INSERT INTO audit_logs (entity_type, entity_id, action, actor_id, actor_type, before_state, after_state, metadata, ip_address, user_agent, created_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,NOW())`,
    [
      entry.entityType,
      entry.entityId,
      entry.action,
      entry.actorId || null,
      entry.actorType || "system",
      entry.beforeState ? JSON.stringify(entry.beforeState) : null,
      entry.afterState ? JSON.stringify(entry.afterState) : null,
      entry.metadata ? JSON.stringify(entry.metadata) : null,
      entry.ipAddress || null,
      entry.userAgent || null,
    ]
  );
}

export async function getAuditLogs(entityType: string, entityId: string, limit = 50): Promise<any[]> {
  const result = await pgQuery(
    'SELECT * FROM audit_logs WHERE entity_type = $1 AND entity_id = $2 ORDER BY created_at DESC LIMIT $3',
    [entityType, entityId, limit]
  );
  return result.rows;
}

export async function getAuditLogsByActor(actorId: string, limit = 50): Promise<any[]> {
  const result = await pgQuery(
    'SELECT * FROM audit_logs WHERE actor_id = $1 ORDER BY created_at DESC LIMIT $2',
    [actorId, limit]
  );
  return result.rows;
}

// Hash chain for tamper evidence (simplified — production would fetch previous hash)
export function computeAuditHash(entry: AuditEntry, previousHash?: string): string {
  const data = JSON.stringify({
    entityType: entry.entityType,
    entityId: entry.entityId,
    action: entry.action,
    actorId: entry.actorId,
    actorType: entry.actorType,
    beforeState: entry.beforeState,
    afterState: entry.afterState,
    metadata: entry.metadata,
    previousHash,
  });
  return createHash("sha256").update(data).digest("hex");
}
