import { writeAuditLog } from "@iai/audit-sdk";
import crypto from "crypto";

export type ApprovalState = "pending" | "approved" | "rejected" | "escalated";

export interface ApprovalRequest {
  id: string;
  userId: string;
  assigneeId: string;
  action: string;
  resource: string;
  details: string;
  state: ApprovalState;
  createdAt: number;
  resolvedAt?: number;
  reason?: string;
}

const approvals = new Map<string, ApprovalRequest>();

export async function createApproval(userId: string, assigneeId: string, action: string, resource: string, details: string): Promise<ApprovalRequest> {
  const request: ApprovalRequest = {
    id: `appr_${crypto.randomUUID().substring(0, 8)}`,
    userId, assigneeId, action, resource, details,
    state: "pending",
    createdAt: Date.now(),
  };
  approvals.set(request.id, request);
  await writeAuditLog(userId, "approval.created", request.id, `Created approval for ${action} on ${resource}`);
  return request;
}

export async function approve(id: string, userId: string): Promise<ApprovalRequest | null> {
  const request = approvals.get(id);
  if (!request || request.assigneeId !== userId) return null;
  if (request.state !== "pending") return null;
  request.state = "approved";
  request.resolvedAt = Date.now();
  await writeAuditLog(userId, "approval.approved", id, "Approved");
  return request;
}

export async function reject(id: string, userId: string, reason: string): Promise<ApprovalRequest | null> {
  const request = approvals.get(id);
  if (!request || request.assigneeId !== userId) return null;
  if (request.state !== "pending") return null;
  request.state = "rejected";
  request.resolvedAt = Date.now();
  request.reason = reason;
  await writeAuditLog(userId, "approval.rejected", id, `Rejected: ${reason}`);
  return request;
}

export async function escalate(id: string, newAssigneeId: string): Promise<ApprovalRequest | null> {
  const request = approvals.get(id);
  if (!request || request.state !== "pending") return null;
  request.state = "escalated";
  request.assigneeId = newAssigneeId;
  await writeAuditLog(request.userId, "approval.escalated", id, `Escalated to ${newAssigneeId}`);
  return request;
}

export function getPendingApprovals(userId: string): ApprovalRequest[] {
  return Array.from(approvals.values()).filter((a) => a.assigneeId === userId && a.state === "pending");
}
