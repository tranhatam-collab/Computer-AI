export interface AuditEvent { id: string; actorId: string; action: string; target: string; at: string; metadata?: Record<string, unknown>; }
export function createAuditEvent(input: Omit<AuditEvent, "id" | "at">): AuditEvent { return { ...input, id: `audit_${crypto.randomUUID()}`, at: new Date().toISOString() }; }
