/**
 * Overload protection — rate limits, quota enforcement, cost control.
 */

export interface QuotaState {
  runsUsed: number;
  outputCreditsUsed: number;
  storageUsedMb: number;
  resetAt: number; // timestamp
}

export interface QuotaLimits {
  runsPerDay: number;
  outputCredits: number;
  storageMb: number;
}

export interface OverloadResult {
  allowed: boolean;
  reason?: string;
  retryAfterMs?: number;
}

const tokenBuckets = new Map<string, { tokens: number; lastRefill: number }>();

export function checkQuota(productId: string, state: QuotaState, limits: QuotaLimits): OverloadResult {
  if (state.runsUsed >= limits.runsPerDay) {
    return { allowed: false, reason: "Daily run limit exceeded", retryAfterMs: 86400000 - (Date.now() - state.resetAt) };
  }
  if (state.outputCreditsUsed >= limits.outputCredits) {
    return { allowed: false, reason: "Output credit limit exceeded", retryAfterMs: 86400000 - (Date.now() - state.resetAt) };
  }
  if (state.storageUsedMb >= limits.storageMb) {
    return { allowed: false, reason: "Storage limit exceeded" };
  }
  return { allowed: true };
}

export function checkRateLimit(key: string, maxRPM: number = 10): OverloadResult {
  const now = Date.now();
  const bucket = tokenBuckets.get(key) || { tokens: maxRPM, lastRefill: now };
  const elapsed = now - bucket.lastRefill;
  const refill = Math.floor(elapsed / 60000) * maxRPM;
  bucket.tokens = Math.min(maxRPM, bucket.tokens + refill);
  bucket.lastRefill = now;
  tokenBuckets.set(key, bucket);

  if (bucket.tokens <= 0) {
    return { allowed: false, reason: "Rate limit exceeded", retryAfterMs: 60000 };
  }
  bucket.tokens -= 1;
  return { allowed: true };
}

export function estimateCost(modelClass: string, inputTokens: number, outputTokens: number): number {
  const rates: Record<string, { input: number; output: number }> = {
    fast:     { input: 0.15, output: 0.60 },
    balanced: { input: 0.30, output: 1.20 },
    deep:     { input: 0.60, output: 2.40 },
    code:     { input: 0.30, output: 1.20 },
    creative: { input: 0.30, output: 1.20 },
    analytic: { input: 0.45, output: 1.80 },
  };
  const rate = rates[modelClass] || rates.fast;
  return (inputTokens / 1000) * rate.input + (outputTokens / 1000) * rate.output;
}
