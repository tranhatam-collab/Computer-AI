export type ApprovalState = "not_required" | "pending" | "approved" | "rejected" | "expired";
export interface ApprovalRequest { id: string; runId: string; requesterId: string; state: ApprovalState; reason: string; createdAt: string; }
export function createApprovalRequest(runId: string, requesterId: string, reason: string): ApprovalRequest { return { id: `approval_${crypto.randomUUID()}`, runId, requesterId, state: "pending", reason, createdAt: new Date().toISOString() }; }
