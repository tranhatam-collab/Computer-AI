import type { ComputerProductId } from "./products";
export type PlanId = "free" | "starter" | "pro" | "builder" | "business" | "enterprise";
export interface ProductEntitlement { productId: ComputerProductId; minimumPlan: PlanId; maxRunsPerDay: number; maxAgentsPerRun: number; memoryEnabled: boolean; externalActionsAllowed: boolean; approvalRequiredForExternalActions: boolean; }
export const productEntitlements: ProductEntitlement[] = [
  { productId: "free", minimumPlan: "free", maxRunsPerDay: 20, maxAgentsPerRun: 1, memoryEnabled: false, externalActionsAllowed: false, approvalRequiredForExternalActions: true },
  { productId: "personal", minimumPlan: "starter", maxRunsPerDay: 100, maxAgentsPerRun: 2, memoryEnabled: true, externalActionsAllowed: false, approvalRequiredForExternalActions: true },
  { productId: "creator", minimumPlan: "pro", maxRunsPerDay: 250, maxAgentsPerRun: 3, memoryEnabled: true, externalActionsAllowed: false, approvalRequiredForExternalActions: true },
  { productId: "developer", minimumPlan: "builder", maxRunsPerDay: 300, maxAgentsPerRun: 4, memoryEnabled: true, externalActionsAllowed: true, approvalRequiredForExternalActions: true },
  { productId: "business", minimumPlan: "pro", maxRunsPerDay: 250, maxAgentsPerRun: 3, memoryEnabled: true, externalActionsAllowed: false, approvalRequiredForExternalActions: true },
  { productId: "enterprise", minimumPlan: "enterprise", maxRunsPerDay: 2000, maxAgentsPerRun: 8, memoryEnabled: true, externalActionsAllowed: true, approvalRequiredForExternalActions: true }
];
