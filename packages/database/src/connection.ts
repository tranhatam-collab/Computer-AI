import { createClient } from 'redis';
import { getPgPool } from './pg.js';
import { runMigrations as executeMigrations } from './migrate';

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
    const pool = await getPgPool();
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
  return (await getPgPool()).connect();
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

// Database initialization
export async function initDatabase() {
  try {
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

