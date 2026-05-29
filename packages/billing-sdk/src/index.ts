import { getPricing, getProduct } from "@iai/product-registry";
import type { ProductId } from "@iai/product-registry";
import { getEmailProvider } from "@iai/providers";
import {
  createInvoice as pgCreateInvoice,
  getInvoicesByUser as pgGetInvoicesByUser,
  markInvoicePaid as pgMarkInvoicePaid,
  createSubscription as pgCreateSubscription,
  cancelSubscription as pgCancelSubscription,
} from "@iai/database";

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

export async function createSubscription(userId: string, productId: ProductId): Promise<ProductSubscription> {
  const expiresAt = new Date(Date.now() + 86400 * 30 * 1000);
  const row = await pgCreateSubscription(userId, productId, expiresAt);
  return {
    userId: row.user_id,
    productId: row.product_id as ProductId,
    status: row.status,
    startedAt: Math.floor(new Date(row.started_at).getTime() / 1000),
    expiresAt: Math.floor(new Date(row.expires_at).getTime() / 1000),
  };
}

export async function cancelSubscription(userId: string, productId: ProductId): Promise<void> {
  await pgCancelSubscription(userId, productId);
}

export async function generateInvoice(userId: string, productId: ProductId, currency: "USD" | "VND" = "USD"): Promise<Invoice> {
  const pricing = getPricing(productId);
  const amount = currency === "VND" ? (pricing.monthlyVnd || 0) : (pricing.monthly || 0);
  const invoice = await pgCreateInvoice(userId, productId, amount, currency);
  return {
    id: invoice.id,
    userId: invoice.user_id,
    productId: invoice.product_id as ProductId,
    amount: invoice.amount,
    currency: invoice.currency as "USD" | "VND",
    status: invoice.status as "pending" | "paid" | "failed",
    createdAt: Math.floor(new Date(invoice.created_at).getTime() / 1000),
    paidAt: invoice.paid_at ? Math.floor(new Date(invoice.paid_at).getTime() / 1000) : undefined,
  };
}

export async function getUserInvoices(userId: string): Promise<Invoice[]> {
  const invoices = await pgGetInvoicesByUser(userId);
  return invoices.map(inv => ({
    id: inv.id,
    userId: inv.user_id,
    productId: inv.product_id as ProductId,
    amount: inv.amount,
    currency: inv.currency as "USD" | "VND",
    status: inv.status as "pending" | "paid" | "failed",
    createdAt: Math.floor(new Date(inv.created_at).getTime() / 1000),
    paidAt: inv.paid_at ? Math.floor(new Date(inv.paid_at).getTime() / 1000) : undefined,
  }));
}

export async function markInvoicePaid(invoiceId: string): Promise<void> {
  await pgMarkInvoicePaid(invoiceId);
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
  const provider = getEmailProvider();
  const result = await provider.send({
    to: payload.to,
    subject: payload.subject,
    body: payload.html,
    html: payload.html,
  });
  if (!result.sent) {
    throw new Error(`Email failed: ${payload.to}`);
  }
}
