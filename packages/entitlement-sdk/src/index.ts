import type { ProductId } from "@iai/product-registry";
import { getEntitlements, getShell } from "@iai/product-registry";

export interface GateResult {
  allowed: boolean;
  reason?: string;
}

export function checkEntitlement(productId: ProductId, required: string): GateResult {
  const entitlements = getEntitlements(productId);
  if (entitlements.includes(required as any)) {
    return { allowed: true };
  }
  return { allowed: false, reason: `Missing entitlement: ${required}` };
}

export function checkProductAccess(userProductId: ProductId, targetProductId: ProductId): GateResult {
  const userShell = getShell(userProductId);
  const targetShell = getShell(targetProductId);
  const tierOrder = ["mass", "professional", "enterprise", "dedicated"];
  const userTierIndex = tierOrder.indexOf(userShell.id === "enterprise" ? "dedicated" : "mass");
  const targetTierIndex = tierOrder.indexOf(targetShell.id === "enterprise" ? "dedicated" : "mass");
  if (userTierIndex >= targetTierIndex) return { allowed: true };
  return { allowed: false, reason: "Product tier too low for access" };
}
