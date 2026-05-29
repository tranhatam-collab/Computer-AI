import type { ProductId } from "@iai/product-registry";
import { getShell } from "@iai/product-registry";
import { pgQuery } from "@iai/database";

export interface UsageRecord {
  userId: string;
  productId: ProductId;
  runsUsed: number;
  outputCreditsUsed: number;
  storageUsedMb: number;
  date: string;
}

function today(): string {
  return new Date().toISOString().split("T")[0];
}

async function getOrCreateUsage(userId: string, productId: ProductId): Promise<UsageRecord> {
  const date = today();
  const result = await pgQuery(
    `SELECT runs_used, output_credits_used, storage_used_mb
     FROM daily_usage
     WHERE user_id = $1 AND product_id = $2 AND date = $3`,
    [userId, productId, date]
  );

  if (result.rows.length > 0) {
    const row = result.rows[0];
    return {
      userId, productId,
      runsUsed: row.runs_used,
      outputCreditsUsed: row.output_credits_used,
      storageUsedMb: row.storage_used_mb,
      date,
    };
  }

  await pgQuery(
    `INSERT INTO daily_usage (user_id, product_id, date, runs_used, output_credits_used, storage_used_mb)
     VALUES ($1, $2, $3, 0, 0, 0)
     ON CONFLICT (user_id, product_id, date) DO NOTHING`,
    [userId, productId, date]
  );

  return { userId, productId, runsUsed: 0, outputCreditsUsed: 0, storageUsedMb: 0, date };
}

export async function getCurrentUsage(userId: string, productId: ProductId): Promise<UsageRecord> {
  return getOrCreateUsage(userId, productId);
}

export async function trackRun(userId: string, productId: ProductId): Promise<void> {
  const date = today();
  await pgQuery(
    `INSERT INTO daily_usage (user_id, product_id, date, runs_used, output_credits_used, storage_used_mb)
     VALUES ($1, $2, $3, 1, 0, 0)
     ON CONFLICT (user_id, product_id, date)
     DO UPDATE SET runs_used = daily_usage.runs_used + 1, updated_at = CURRENT_TIMESTAMP`,
    [userId, productId, date]
  );
}

export async function trackOutput(userId: string, productId: ProductId, credits: number): Promise<void> {
  const date = today();
  await pgQuery(
    `INSERT INTO daily_usage (user_id, product_id, date, runs_used, output_credits_used, storage_used_mb)
     VALUES ($1, $2, $3, 0, $4, 0)
     ON CONFLICT (user_id, product_id, date)
     DO UPDATE SET output_credits_used = daily_usage.output_credits_used + $4, updated_at = CURRENT_TIMESTAMP`,
    [userId, productId, date, credits]
  );
}

export async function getRemainingQuota(userId: string, productId: ProductId): Promise<{ runsLeft: number; creditsLeft: number }> {
  const usage = await getOrCreateUsage(userId, productId);
  const shell = getShell(productId);
  return {
    runsLeft: Math.max(0, shell.quota.runsPerDay - usage.runsUsed),
    creditsLeft: Math.max(0, shell.quota.outputCredits - usage.outputCreditsUsed),
  };
}
