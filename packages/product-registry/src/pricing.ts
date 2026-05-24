import type { ProductId } from "./types.js";
import { getShell } from "./shell.js";

export interface PriceEntry {
  monthly: number | null;
  annual: number | null;
  monthlyVnd: number | null;
  annualVnd: number | null;
  currency: "USD" | "VND";
}

const EXCHANGE_RATE = 25000;

export function getPricing(productId: ProductId): PriceEntry {
  const shell = getShell(productId);
  const monthlyVnd = shell.pricing.monthly !== null ? shell.pricing.monthly * EXCHANGE_RATE : null;
  const annualVnd = shell.pricing.annual !== null ? shell.pricing.annual * EXCHANGE_RATE : null;
  return {
    monthly: shell.pricing.monthly,
    annual: shell.pricing.annual,
    monthlyVnd,
    annualVnd,
    currency: shell.pricing.currency,
  };
}

export function getVndPrice(productId: ProductId): string {
  const p = getPricing(productId);
  if (p.monthlyVnd === null) return "Liên hệ";
  return `${(p.monthlyVnd / 1000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ`;
}

export function getUsdPrice(productId: ProductId): string {
  const p = getPricing(productId);
  if (p.monthly === null) return "Contact";
  return `$${p.monthly}`;
}
