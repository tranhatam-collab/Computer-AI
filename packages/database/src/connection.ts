import { createClient } from 'redis';
import { getPgPool } from './pg.js';
import { runMigrations as executeMigrations } from './migrate';
import { resolve4 } from 'dns';
import { promisify } from 'util';

const resolve4Async = promisify(resolve4);

async function resolveDatabaseHostToIPv4() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) return;

  try {
    const url = new URL(dbUrl);
    const hostname = url.hostname;

    // Skip if already an IP address
    if (/^\d+\.\d+\.\d+\.\d+$/.test(hostname)) return;

    console.log(`[DB] Resolving ${hostname} to IPv4...`);
    const addresses = await resolve4Async(hostname);
    if (addresses && addresses.length > 0) {
      const ipv4 = addresses[0];
      url.hostname = ipv4;
      process.env.DATABASE_URL = url.toString();
      console.log(`[DB] Resolved to IPv4: ${ipv4}`);
    }
  } catch (err: any) {
    console.warn('[DB] Failed to resolve DB host to IPv4:', err.message || err);
  }
}

// Redis connection for session caching
let redisClient: any = null;

async function initRedis() {
  try {
    redisClient = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379'
    });
    await redisClient.connect();
    console.log('Redis connected successfully');
  } catch (error) {
    console.warn('Redis connection failed, using in-memory fallback:', error);
  }
}

// Initialize Redis on startup
initRedis();

export { redisClient };

// Re-export pool for backward compat
export { getPgPool as pool } from './pg.js';

// Database helper functions
export async function pgQuery(text: string, params?: any[]) {
  const start = Date.now();
  try {
    const pool = getPgPool();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

export async function getClient() {
  return getPgPool().connect();
}

// Redis helper functions
export async function redisSet(key: string, value: string, expireInSeconds?: number) {
  if (!redisClient) return false;
  try {
    await redisClient.set(key, value);
    if (expireInSeconds) {
      await redisClient.expire(key, expireInSeconds);
    }
    return true;
  } catch (error) {
    console.error('Redis set error:', error);
    return false;
  }
}

export async function redisGet(key: string) {
  if (!redisClient) return null;
  try {
    return await redisClient.get(key);
  } catch (error) {
    console.error('Redis get error:', error);
    return null;
  }
}

export async function redisDel(key: string) {
  if (!redisClient) return false;
  try {
    await redisClient.del(key);
    return true;
  } catch (error) {
    console.error('Redis del error:', error);
    return false;
  }
}

// Export for use in API startup before any DB operation
export { resolveDatabaseHostToIPv4 };

// Database initialization
export async function initDatabase() {
  try {
    // Resolve hostname to IPv4 before connecting (Render free tier lacks IPv6)
    await resolveDatabaseHostToIPv4();

    // Test database connection
    await pgQuery('SELECT NOW()');
    console.log('Database connected successfully');
    
    // Run migrations if needed
    await executeMigrations();
    
    return true;
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
}

