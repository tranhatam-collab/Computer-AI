import { query } from "../pg.js";

export interface SubscriptionRow {
  user_id: string;
  product_id: string;
  status: string;
  started_at: string;
  expires_at: string;
}

export async function createSubscription(
  userId: string,
  productId: string,
  expiresAt: Date
): Promise<SubscriptionRow> {
  const startedAt = new Date();
  const res = await query<SubscriptionRow>(
    `INSERT INTO subscriptions (user_id, product_id, status, started_at, expires_at)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (user_id, product_id) DO UPDATE SET
       status = EXCLUDED.status,
       started_at = EXCLUDED.started_at,
       expires_at = EXCLUDED.expires_at
     RETURNING user_id, product_id, status, started_at, expires_at`,
    [userId, productId, "active", startedAt.toISOString(), expiresAt.toISOString()]
  );
  return res.rows[0];
}

export async function cancelSubscription(userId: string, productId: string): Promise<void> {
  await query(
    `UPDATE subscriptions SET status = $1 WHERE user_id = $2 AND product_id = $3`,
    ["cancelled", userId, productId]
  );
}

export async function getSubscription(userId: string, productId: string): Promise<SubscriptionRow | null> {
  const res = await query<SubscriptionRow>(
    `SELECT user_id, product_id, status, started_at, expires_at FROM subscriptions WHERE user_id = $1 AND product_id = $2`,
    [userId, productId]
  );
  return res.rows[0] || null;
}

export async function getUserSubscriptions(userId: string): Promise<SubscriptionRow[]> {
  const res = await query<SubscriptionRow>(
    `SELECT user_id, product_id, status, started_at, expires_at FROM subscriptions WHERE user_id = $1`,
    [userId]
  );
  return res.rows;
}
