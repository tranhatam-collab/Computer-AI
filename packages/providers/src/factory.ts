import type { AIProvider, EmailProvider, PaymentProvider } from "./index.js";
import { MockAIProvider, MockEmailProvider, MockPaymentProvider } from "./mock.js";

let aiProvider: AIProvider | null = null;
let emailProvider: EmailProvider | null = null;
let paymentProvider: PaymentProvider | null = null;

export function getAIProvider(): AIProvider {
  if (!aiProvider) {
    const key = process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY;
    if (!key) {
      aiProvider = new MockAIProvider();
    } else {
      // Real provider wiring pending: env key detected but adapter not yet wired
      aiProvider = new MockAIProvider();
    }
  }
  return aiProvider;
}

export function getEmailProvider(): EmailProvider {
  if (!emailProvider) {
    const key = process.env.SENDGRID_API_KEY || process.env.SES_ACCESS_KEY;
    if (!key) {
      emailProvider = new MockEmailProvider();
    } else {
      emailProvider = new MockEmailProvider();
    }
  }
  return emailProvider;
}

export function getPaymentProvider(): PaymentProvider {
  if (!paymentProvider) {
    const key = process.env.STRIPE_SECRET_KEY || process.env.PAYOS_API_KEY;
    if (!key) {
      paymentProvider = new MockPaymentProvider();
    } else {
      paymentProvider = new MockPaymentProvider();
    }
  }
  return paymentProvider;
}

export function resetProviders(): void {
  aiProvider = null;
  emailProvider = null;
  paymentProvider = null;
}
