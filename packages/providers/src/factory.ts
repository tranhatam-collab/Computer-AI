import type { AIProvider, EmailProvider, PaymentProvider } from "./index.js";
import { MockAIProvider, MockEmailProvider, MockPaymentProvider } from "./mock.js";
import { OpenAIProvider } from "./openai-provider.js";
import { AnthropicProvider } from "./anthropic-provider.js";
import { AIFallbackProvider } from "./circuit-breaker.js";
import type { FallbackResult } from "./circuit-breaker.js";

let aiProvider: AIProvider | AIFallbackProvider | null = null;
let emailProvider: EmailProvider | null = null;
let paymentProvider: PaymentProvider | null = null;

export function getAIProvider(): AIProvider {
  if (!aiProvider) {
    const openaiKey = process.env.OPENAI_API_KEY;
    const anthropicKey = process.env.ANTHROPIC_API_KEY;

    if (!openaiKey && !anthropicKey) {
      aiProvider = new MockAIProvider();
    } else if (openaiKey && anthropicKey) {
      // Primary: OpenAI, Fallback: Anthropic
      aiProvider = new AIFallbackProvider(
        new OpenAIProvider(openaiKey),
        new AnthropicProvider(anthropicKey)
      );
    } else if (openaiKey) {
      aiProvider = new OpenAIProvider(openaiKey);
    } else {
      aiProvider = new AnthropicProvider(anthropicKey!);
    }
  }
  return aiProvider as AIProvider;
}

export function getAIFallbackProvider(): AIFallbackProvider | null {
  if (aiProvider instanceof AIFallbackProvider) {
    return aiProvider;
  }
  return null;
}

export function generateWithFallback(req: Parameters<AIProvider["generate"]>[0]): Promise<FallbackResult> {
  const fallback = getAIFallbackProvider();
  if (fallback) {
    return fallback.generate(req);
  }
  // Single provider path: no fallback tracking
  const provider = getAIProvider();
  return provider.generate(req).then((response) => ({
    response,
    cost: {
      provider: provider.kind,
      model: req.model,
      inputTokens: response.usage.inputTokens,
      outputTokens: response.usage.outputTokens,
      costCents: 0, // Single provider path doesn't track cost here
    },
    provider: provider.kind,
    attempts: [],
  }));
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

