export type ToolPermissionLevel = "read_only" | "generate_only" | "draft_action" | "external_write" | "destructive" | "financial" | "identity_or_access" | "admin";
export interface ToolPermissionPolicy { level: ToolPermissionLevel; minimumPlan: string; approvalRequired: boolean; enabled: boolean; }
export const toolPermissionPolicies: ToolPermissionPolicy[] = [
  { level: "read_only", minimumPlan: "free", approvalRequired: false, enabled: true },
  { level: "generate_only", minimumPlan: "free", approvalRequired: false, enabled: true },
  { level: "draft_action", minimumPlan: "pro", approvalRequired: true, enabled: true },
  { level: "external_write", minimumPlan: "builder", approvalRequired: true, enabled: true },
  { level: "destructive", minimumPlan: "business", approvalRequired: true, enabled: false },
  { level: "financial", minimumPlan: "business", approvalRequired: true, enabled: false },
  { level: "identity_or_access", minimumPlan: "enterprise", approvalRequired: true, enabled: false },
  { level: "admin", minimumPlan: "enterprise", approvalRequired: true, enabled: false }
];
