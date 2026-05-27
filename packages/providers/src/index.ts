// ── AI Provider ──

export type AIProviderKind = "openai" | "anthropic" | "mock";

export interface AIRequest {
  model: string;
  messages: { role: "system" | "user" | "assistant"; content: string }[];
  maxTokens?: number;
}

export interface AIResponse {
  content: string;
  model: string;
  usage: { inputTokens: number; outputTokens: number };
}

export interface AIProvider {
  readonly kind: AIProviderKind;
  readonly configured: boolean;
  generate(req: AIRequest): Promise<AIResponse>;
}

// ── Email Provider ──

export type EmailProviderKind = "sendgrid" | "ses" | "console";

export interface EmailRequest {
  to: string;
  subject: string;
  body: string;
  html?: string;
}

export interface EmailProvider {
  readonly kind: EmailProviderKind;
  readonly configured: boolean;
  send(req: EmailRequest): Promise<{ sent: boolean; messageId?: string }>;
}

// ── Payment Provider ──

export type PaymentProviderKind = "stripe" | "payos" | "mock";

export interface PaymentChargeRequest {
  amount: number;
  currency: "USD" | "VND";
  description: string;
  sourceId?: string;
}

export interface PaymentChargeResponse {
  success: boolean;
  transactionId?: string;
  error?: string;
}

export interface PaymentProvider {
  readonly kind: PaymentProviderKind;
  readonly configured: boolean;
  charge(req: PaymentChargeRequest): Promise<PaymentChargeResponse>;
}

// Re-export new modules
export { OpenAIProvider } from "./openai-provider.js";
export { AnthropicProvider } from "./anthropic-provider.js";
export { SendGridProvider } from "./sendgrid-provider.js";
export { StripeProvider } from "./stripe-provider.js";
export { PayOSProvider } from "./payos-provider.js";
export { AIFallbackProvider, type FallbackResult, type CircuitState } from "./circuit-breaker.js";
export { estimateCost, type CostEstimate } from "./cost-tracker.js";
export { generateWithFallback, getAIFallbackProvider, getEmailProvider, getPaymentProvider } from "./factory.js";
