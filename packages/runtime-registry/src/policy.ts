import type { ProductId } from "@iai/product-registry";
import { getShell } from "@iai/product-registry";

export interface PolicyResult {
  allowed: boolean;
  reason?: string;
  concurrencyAvailable: number;
}

const activeRuns = new Map<string, { count: number }>();

const CONCURRENCY_LIMITS: Record<string, number> = {
  mass: 1,
  professional: 3,
  enterprise: 5,
  dedicated: 10,
};

export function checkConcurrency(productId: ProductId): PolicyResult {
  const shell = getShell(productId);
  const tier = getTierLevel(shell.id === "enterprise" ? "dedicated" : shell.pricing.monthly !== null ? "mass" : "professional");
  const limit = CONCURRENCY_LIMITS[tier] || 1;

  const current = activeRuns.get(productId)?.count || 0;
  const available = Math.max(0, limit - current);

  return {
    allowed: available > 0,
    concurrencyAvailable: available,
    reason: available > 0 ? undefined : `Concurrency limit reached for ${productId} (max: ${limit})`,
  };
}

export function acquireSlot(productId: ProductId): boolean {
  const result = checkConcurrency(productId);
  if (!result.allowed) return false;
  const entry = activeRuns.get(productId) || { count: 0 };
  entry.count++;
  activeRuns.set(productId, entry);
  return true;
}

export function releaseSlot(productId: ProductId): void {
  const entry = activeRuns.get(productId);
  if (entry) {
    entry.count = Math.max(0, entry.count - 1);
    activeRuns.set(productId, entry);
  }
}

export function getTimeoutMs(productId: ProductId, taskType: string): number {
  const timeouts: Record<string, Record<string, number>> = {
    search: { default: 30000, deep: 120000 },
    code: { default: 60000, deep: 300000 },
    research: { default: 60000, deep: 300000 },
    content: { default: 45000, deep: 120000 },
  };
  return timeouts[taskType]?.default || 30000;
}

function getTierLevel(tier: string): string {
  if (["free", "learn", "personal", "creator"].includes(tier)) return "mass";
  if (["work", "office", "sales", "business"].includes(tier)) return "professional";
  if (["finance", "media", "studio"].includes(tier)) return "enterprise";
  return "dedicated";
}
