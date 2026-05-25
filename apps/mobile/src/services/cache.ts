const memoryCache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export async function getCached<T>(key: string): Promise<T | null> {
  const entry = memoryCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    memoryCache.delete(key);
    return null;
  }
  return entry.data as T;
}

export async function setCache(key: string, data: unknown): Promise<void> {
  memoryCache.set(key, { data, timestamp: Date.now() });
}

export async function clearCache(): Promise<void> {
  memoryCache.clear();
}
