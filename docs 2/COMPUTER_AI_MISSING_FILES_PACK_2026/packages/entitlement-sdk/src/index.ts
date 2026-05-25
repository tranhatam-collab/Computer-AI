export interface EntitlementInput { planId: string; requiredPlan: string; }
const order = ["free", "starter", "pro", "builder", "business", "enterprise"];
export function hasEntitlement(input: EntitlementInput): boolean { return order.indexOf(input.planId) >= order.indexOf(input.requiredPlan); }
