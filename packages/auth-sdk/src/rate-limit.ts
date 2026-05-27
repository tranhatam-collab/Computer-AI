interface RateLimitBucket {
  tokens: number;
  lastRefill: number;
}

const buckets = new Map<string, RateLimitBucket>();

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

const DEFAULT_CONFIG: RateLimitConfig = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 60,
};

export function checkRateLimit(key: string, config: Partial<RateLimitConfig> = {}): { allowed: boolean; remaining: number; resetAt: number } {
  const { windowMs, maxRequests } = { ...DEFAULT_CONFIG, ...config };
  const now = Date.now();

  let bucket = buckets.get(key);
  if (!bucket) {
    bucket = { tokens: maxRequests, lastRefill: now };
    buckets.set(key, bucket);
  }

  // Refill tokens based on time elapsed
  const elapsed = now - bucket.lastRefill;
  const tokensToAdd = Math.floor((elapsed / windowMs) * maxRequests);
  if (tokensToAdd > 0) {
    bucket.tokens = Math.min(maxRequests, bucket.tokens + tokensToAdd);
    bucket.lastRefill = now;
  }

  const allowed = bucket.tokens > 0;
  if (allowed) {
    bucket.tokens--;
  }

  // Clean up old buckets occasionally
  if (buckets.size > 10000) {
    const cutoff = now - windowMs * 2;
    for (const [k, v] of buckets) {
      if (v.lastRefill < cutoff) buckets.delete(k);
    }
  }

  const resetAt = bucket.lastRefill + windowMs;
  return { allowed, remaining: bucket.tokens, resetAt };
}

export function rateLimitMiddleware(config?: Partial<RateLimitConfig>) {
  return async (request: any, reply: any) => {
    const key = request.ip || request.headers["x-forwarded-for"] || "anonymous";
    const result = checkRateLimit(key, config);
    reply.header("X-RateLimit-Limit", config?.maxRequests || DEFAULT_CONFIG.maxRequests);
    reply.header("X-RateLimit-Remaining", Math.max(0, result.remaining));
    reply.header("X-RateLimit-Reset", Math.ceil(result.resetAt / 1000));

    if (!result.allowed) {
      reply.status(429).send({
        success: false,
        error: "Too many requests. Please try again later.",
      });
      return;
    }
  };
}
