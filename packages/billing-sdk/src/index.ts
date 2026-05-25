import { getPricing } from "@iai/product-registry";
import type { ProductId } from "@iai/product-registry";
import { getDb } from "@iai/database";

export interface ProductSubscription {
  userId: string;
  productId: ProductId;
  status: string;
  startedAt: number;
  expiresAt: number;
}

export interface Invoice {
  id: string;
  userId: string;
  productId: ProductId;
  amount: number;
  currency: "USD" | "VND";
  status: "pending" | "paid" | "failed";
  createdAt: number;
  paidAt?: number;
}

export function createSubscription(userId: string, productId: ProductId): ProductSubscription {
  const db = getDb();
  const startedAt = Math.floor(Date.now() / 1000);
  const expiresAt = startedAt + 86400 * 30;
  db.prepare(
    `INSERT OR REPLACE INTO subscriptions (user_id, product_id, status, started_at, expires_at) VALUES (?, ?, ?, ?, ?)`
  ).run(userId, productId, "active", startedAt, expiresAt);
  return { userId, productId, status: "active", startedAt, expiresAt };
}

export function cancelSubscription(userId: string, productId: ProductId): void {
  const db = getDb();
  db.prepare(
    `UPDATE subscriptions SET status = 'cancelled' WHERE user_id = ? AND product_id = ?`
  ).run(userId, productId);
}

export function generateInvoice(userId: string, productId: ProductId, currency: "USD" | "VND" = "USD"): Invoice {
  const pricing = getPricing(productId);
  const amount = currency === "VND" ? (pricing.monthlyVnd || 0) : (pricing.monthly || 0);
  const invoice: Invoice = {
    id: `inv_${Date.now()}`,
    userId, productId, amount, currency,
    status: "paid",
    createdAt: Date.now(),
    paidAt: Date.now(),
  };
  return invoice;
}

export function getUserInvoices(_userId: string): Invoice[] {
  return [];
}
