import { getPricing, getProduct } from "@iai/product-registry";
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
  const id = `inv_${Date.now()}`;
  const createdAt = Math.floor(Date.now() / 1000);
  const db = getDb();
  db.prepare(
    `INSERT INTO invoices (id, user_id, product_id, amount, currency, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(id, userId, productId, amount, currency, "pending", createdAt);
  const invoice: Invoice = { id, userId, productId, amount, currency, status: "pending", createdAt };
  return invoice;
}

export function getUserInvoices(userId: string): Invoice[] {
  const db = getDb();
  const rows = db.prepare(
    `SELECT id, user_id, product_id, amount, currency, status, created_at, paid_at FROM invoices WHERE user_id = ? ORDER BY created_at DESC`
  ).all(userId) as any[];
  return rows.map((r) => ({
    id: r.id,
    userId: r.user_id,
    productId: r.product_id,
    amount: r.amount,
    currency: r.currency,
    status: r.status,
    createdAt: r.created_at * 1000,
    paidAt: r.paid_at ? r.paid_at * 1000 : undefined,
  }));
}

export function markInvoicePaid(invoiceId: string): void {
  const db = getDb();
  db.prepare(`UPDATE invoices SET status = 'paid', paid_at = ? WHERE id = ?`).run(Math.floor(Date.now() / 1000), invoiceId);
}

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export function buildInvoiceEmail(invoice: Invoice, userEmail: string, userName: string): EmailPayload {
  const product = getProduct(invoice.productId);
  const date = new Date(invoice.createdAt).toLocaleDateString();
  const amountStr = invoice.currency === "VND"
    ? `${(invoice.amount / 1000).toLocaleString("vi-VN")}đ`
    : `$${invoice.amount}`;
  return {
    to: userEmail,
    subject: `[iai.one] Invoice #${invoice.id}`,
    html: `<p>Hi ${userName},</p>
<p>Your invoice for <strong>${product?.name || invoice.productId}</strong> is ready.</p>
<ul>
<li>Invoice #: ${invoice.id}</li>
<li>Amount: ${amountStr}</li>
<li>Currency: ${invoice.currency}</li>
<li>Date: ${date}</li>
<li>Status: ${invoice.status}</li>
</ul>
<p>Thank you for using iai.one.</p>`,
  };
}

export async function sendEmail(payload: EmailPayload): Promise<void> {
  // Provider hook: swap this for SendGrid, Resend, AWS SES, etc.
  console.log(`[email] To: ${payload.to} | Subject: ${payload.subject}`);
  console.log(`[email] HTML preview: ${payload.html.slice(0, 200)}...`);
}
