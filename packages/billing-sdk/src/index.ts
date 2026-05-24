import { getPricing } from "@iai/product-registry";
import type { ProductId } from "@iai/product-registry";
import { db } from "@iai/database";
import type { ProductSubscription } from "@iai/database";

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

const invoices = new Map<string, Invoice[]>();

export function createSubscription(userId: string, productId: ProductId): ProductSubscription {
  const pricing = getPricing(productId);
  const sub: ProductSubscription = {
    userId, productId,
    status: "active",
    startedAt: Date.now(),
    expiresAt: Date.now() + 86400000 * 30,
  };
  const userSubs = db.subscriptions.get(userId) || [];
  userSubs.push(sub);
  db.subscriptions.set(userId, userSubs);
  return sub;
}

export function cancelSubscription(userId: string, productId: ProductId): void {
  const userSubs = db.subscriptions.get(userId) || [];
  const sub = userSubs.find((s) => s.productId === productId && s.status === "active");
  if (sub) sub.status = "cancelled";
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
  const userInvoices = invoices.get(userId) || [];
  userInvoices.push(invoice);
  invoices.set(userId, userInvoices);
  return invoice;
}

export function getUserInvoices(userId: string): Invoice[] {
  return invoices.get(userId) || [];
}
