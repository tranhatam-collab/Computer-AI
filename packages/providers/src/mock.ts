import type {
  AIProvider, AIRequest, AIResponse,
  EmailProvider, EmailRequest,
  PaymentProvider, PaymentChargeRequest, PaymentChargeResponse,
} from "./index.js";

// ── Mock AI Provider (dev fallback) ──

export class MockAIProvider implements AIProvider {
  readonly kind = "mock" as const;
  readonly configured = false;

  async generate(_req: AIRequest): Promise<AIResponse> {
    throw new Error("AI_PROVIDER_NOT_CONFIGURED. Set OPENAI_API_KEY or ANTHROPIC_API_KEY in environment.");
  }
}

// ── Mock Email Provider (console fallback) ──

export class MockEmailProvider implements EmailProvider {
  readonly kind = "console" as const;
  readonly configured = false;

  async send(req: EmailRequest): Promise<{ sent: boolean; messageId?: string }> {
    console.log(`[EMAIL] To: ${req.to} | Subject: ${req.subject} | Body preview: ${req.body.substring(0, 80)}...`);
    return { sent: false, messageId: undefined };
  }
}

// ── Mock Payment Provider (dev fallback) ──

export class MockPaymentProvider implements PaymentProvider {
  readonly kind = "mock" as const;
  readonly configured = false;

  async charge(_req: PaymentChargeRequest): Promise<PaymentChargeResponse> {
    throw new Error("PAYMENT_PROVIDER_NOT_CONFIGURED. Set STRIPE_SECRET_KEY or PAYOS_API_KEY in environment.");
  }
}
