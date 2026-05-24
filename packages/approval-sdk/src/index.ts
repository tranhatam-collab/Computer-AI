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

export function createApproval(userId: string, assigneeId: string, action: string, resource: string, details: string): ApprovalRequest {
  const request: ApprovalRequest = {
    id: `appr_${crypto.randomUUID().substring(0, 8)}`,
    userId, assigneeId, action, resource, details,
    state: "pending",
    createdAt: Date.now(),
  };
  approvals.set(request.id, request);
  writeAuditLog(userId, "approval.created", request.id, `Created approval for ${action} on ${resource}`);
  return request;
}

export function approve(id: string, userId: string): ApprovalRequest | null {
  const request = approvals.get(id);
  if (!request || request.assigneeId !== userId) return null;
  if (request.state !== "pending") return null;
  request.state = "approved";
  request.resolvedAt = Date.now();
  writeAuditLog(userId, "approval.approved", id, "Approved");
  return request;
}

export function reject(id: string, userId: string, reason: string): ApprovalRequest | null {
  const request = approvals.get(id);
  if (!request || request.assigneeId !== userId) return null;
  if (request.state !== "pending") return null;
  request.state = "rejected";
  request.resolvedAt = Date.now();
  request.reason = reason;
  writeAuditLog(userId, "approval.rejected", id, `Rejected: ${reason}`);
  return request;
}

export function escalate(id: string, newAssigneeId: string): ApprovalRequest | null {
  const request = approvals.get(id);
  if (!request || request.state !== "pending") return null;
  request.state = "escalated";
  request.assigneeId = newAssigneeId;
  writeAuditLog(request.userId, "approval.escalated", id, `Escalated to ${newAssigneeId}`);
  return request;
}

export function getPendingApprovals(userId: string): ApprovalRequest[] {
  return Array.from(approvals.values()).filter((a) => a.assigneeId === userId && a.state === "pending");
}
