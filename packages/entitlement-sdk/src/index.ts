import type { ProductId } from "@iai/product-registry";
import { getEntitlements, products } from "@iai/product-registry";

export interface GateResult {
  allowed: boolean;
  reason?: string;
}

const TIER_ORDER = ["mass", "professional", "enterprise", "dedicated"] as const;

function getProductTier(productId: ProductId): string {
  const product = products.find((p) => p.id === productId);
  if (!product) return "mass";
  return product.tier;
}

export function checkEntitlement(productId: ProductId, required: string): GateResult {
  const entitlements = getEntitlements(productId);
  if (entitlements.includes(required as any)) {
    return { allowed: true };
  }
  return { allowed: false, reason: `Missing entitlement: ${required}` };
}

export function checkProductAccess(userProductId: ProductId, targetProductId: ProductId): GateResult {
  const userTier = getProductTier(userProductId);
  const targetTier = getProductTier(targetProductId);
  const userIdx = TIER_ORDER.indexOf(userTier as typeof TIER_ORDER[number]);
  const targetIdx = TIER_ORDER.indexOf(targetTier as typeof TIER_ORDER[number]);
  if (userIdx === -1 || targetIdx === -1) {
    return { allowed: false, reason: "Unknown product tier" };
  }
  if (userIdx >= targetIdx) return { allowed: true };
  return { allowed: false, reason: `Product tier "${userTier}" is below "${targetTier}"` };
}
