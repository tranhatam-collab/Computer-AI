import { writeAuditLog } from "@iai/audit-sdk";
import {
  createApprovalRequest as pgCreateApproval,
  approveRequest as pgApproveRequest,
  rejectRequest as pgRejectRequest,
  updateApprovalRequest as pgUpdateApproval,
  getApprovalRequest as pgGetApproval,
  getApprovalRequestsByUser as pgGetApprovalsByUser,
} from "@iai/database";

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

function mapToSdk(row: any): ApprovalRequest {
  return {
    id: row.id,
    userId: row.user_id,
    assigneeId: row.assignee_id || row.requested_by,
    action: row.action_type,
    resource: row.action_data?.resource || "",
    details: row.action_data?.details || "",
    state: row.status === "pending" && row.assignee_id ? "escalated" : row.status,
    createdAt: new Date(row.created_at).getTime(),
    resolvedAt: row.approved_at
      ? new Date(row.approved_at).getTime()
      : row.rejected_at
        ? new Date(row.rejected_at).getTime()
        : undefined,
    reason: row.justification || undefined,
  };
}

export async function createApproval(
  userId: string,
  assigneeId: string,
  action: string,
  resource: string,
  details: string
): Promise<ApprovalRequest> {
  const row = await pgCreateApproval({
    tenant_id: "iai",
    user_id: userId,
    computer_id: "default",
    action_type: action,
    action_data: { resource, details },
    risk_level: "low",
    status: "pending",
    requested_by: userId,
    assignee_id: assigneeId,
    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    human_verification_required: false,
  });
  await writeAuditLog(userId, "approval.created", row.id, `Created approval for ${action} on ${resource}`);
  return mapToSdk(row);
}

export async function approve(id: string, userId: string): Promise<ApprovalRequest | null> {
  const existing = await pgGetApproval(id);
  if (!existing || existing.assignee_id !== userId) return null;
  if (existing.status !== "pending") return null;
  const row = await pgApproveRequest(id, userId);
  await writeAuditLog(userId, "approval.approved", id, "Approved");
  return mapToSdk(row);
}

export async function reject(id: string, userId: string, reason: string): Promise<ApprovalRequest | null> {
  const existing = await pgGetApproval(id);
  if (!existing || existing.assignee_id !== userId) return null;
  if (existing.status !== "pending") return null;
  const row = await pgRejectRequest(id, userId, reason);
  await writeAuditLog(userId, "approval.rejected", id, `Rejected: ${reason}`);
  return mapToSdk(row);
}

export async function escalate(id: string, newAssigneeId: string): Promise<ApprovalRequest | null> {
  const existing = await pgGetApproval(id);
  if (!existing || existing.status !== "pending") return null;
  const row = await pgUpdateApproval(id, { assignee_id: newAssigneeId });
  await writeAuditLog(existing.user_id, "approval.escalated", id, `Escalated to ${newAssigneeId}`);
  return mapToSdk(row);
}

export async function getPendingApprovals(userId: string): Promise<ApprovalRequest[]> {
  const rows = await pgGetApprovalsByUser("iai", userId, "default", "pending");
  return rows.map(mapToSdk);
}
