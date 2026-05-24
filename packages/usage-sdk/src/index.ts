import type { ProductId } from "@iai/product-registry";
import { getShell } from "@iai/product-registry";

export interface UsageRecord {
  userId: string;
  productId: ProductId;
  runsUsed: number;
  outputCreditsUsed: number;
  storageUsedMb: number;
  periodStart: number;
  periodEnd: number;
}

const usageRecords = new Map<string, UsageRecord[]>();

export function getCurrentUsage(userId: string, productId: ProductId): UsageRecord {
  const records = usageRecords.get(userId) || [];
  const current = records.find((r) => r.productId === productId);
  if (current) return current;

  const shell = getShell(productId);
  const record: UsageRecord = {
    userId, productId,
    runsUsed: 0,
    outputCreditsUsed: 0,
    storageUsedMb: 0,
    periodStart: Date.now(),
    periodEnd: Date.now() + 86400000 * 30,
  };
  records.push(record);
  usageRecords.set(userId, records);
  return record;
}

export function trackRun(userId: string, productId: ProductId): void {
  const usage = getCurrentUsage(userId, productId);
  usage.runsUsed++;
}

export function trackOutput(userId: string, productId: ProductId, credits: number): void {
  const usage = getCurrentUsage(userId, productId);
  usage.outputCreditsUsed += credits;
}

export function getRemainingQuota(userId: string, productId: ProductId): { runsLeft: number; creditsLeft: number } {
  const usage = getCurrentUsage(userId, productId);
  const shell = getShell(productId);
  return {
    runsLeft: Math.max(0, shell.quota.runsPerDay - usage.runsUsed),
    creditsLeft: Math.max(0, shell.quota.outputCredits - usage.outputCreditsUsed),
  };
}
