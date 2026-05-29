import type { AIProvider, EmailProvider, PaymentProvider, BrowserAutomationProvider } from "./index.js";
import { MockAIProvider, MockEmailProvider, MockPaymentProvider } from "./mock.js";
import { OpenAIProvider } from "./openai-provider.js";
import { AnthropicProvider } from "./anthropic-provider.js";
import { SendGridProvider } from "./sendgrid-provider.js";
import { PayOSProvider } from "./payos-provider.js";
import { StripeProvider } from "./stripe-provider.js";
import { AIFallbackProvider } from "./circuit-breaker.js";
import type { FallbackResult } from "./circuit-breaker.js";
import { estimateCost } from "./cost-tracker.js";
import { MockBrowserProvider, RealBrowserProvider } from "./browser-provider.js";

let aiProvider: AIProvider | AIFallbackProvider | null = null;
let emailProvider: EmailProvider | null = null;
let paymentProvider: PaymentProvider | null = null;
let browserProvider: BrowserAutomationProvider | null = null;

export function getAIProvider(): AIProvider {
  if (!aiProvider) {
    const openaiKey = process.env.OPENAI_API_KEY;
    const anthropicKey = process.env.ANTHROPIC_API_KEY;

    if (!openaiKey && !anthropicKey) {
      console.warn("⚠️ AI_PROVIDER_FALLBACK: No OPENAI_API_KEY or ANTHROPIC_API_KEY set. Reverting to MockAIProvider.");
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
  // Single provider path: track cost via cost-tracker
  const provider = getAIProvider();
  return provider.generate(req).then((response) => ({
    response,
    cost: estimateCost(
      provider.kind,
      req.model,
      response.usage.inputTokens,
      response.usage.outputTokens
    ),
    provider: provider.kind,
    attempts: [],
  }));
}

export function getEmailProvider(): EmailProvider {
  if (!emailProvider) {
    const sendgridKey = process.env.SENDGRID_API_KEY;
    if (sendgridKey) {
      emailProvider = new SendGridProvider(sendgridKey, process.env.FROM_EMAIL);
    } else {
      emailProvider = new MockEmailProvider();
    }
  }
  return emailProvider;
}

export function getPaymentProvider(): PaymentProvider {
  if (!paymentProvider) {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    const payosClientId = process.env.PAYOS_CLIENT_ID;
    const payosApiKey = process.env.PAYOS_API_KEY;
    const payosChecksumKey = process.env.PAYOS_CHECKSUM_KEY;

    if (stripeKey) {
      paymentProvider = new StripeProvider(stripeKey);
    } else if (payosClientId && payosApiKey && payosChecksumKey) {
      paymentProvider = new PayOSProvider({
        clientId: payosClientId,
        apiKey: payosApiKey,
        checksumKey: payosChecksumKey,
      });
    } else {
      paymentProvider = new MockPaymentProvider();
    }
  }
  return paymentProvider;
}

export function getBrowserProvider(): BrowserAutomationProvider {
  if (!browserProvider) {
    const searchApiKey = process.env.BRAVE_SEARCH_API_KEY || process.env.SERP_API_KEY;
    if (searchApiKey) {
      browserProvider = new RealBrowserProvider(searchApiKey);
    } else {
      browserProvider = new MockBrowserProvider();
    }
  }
  return browserProvider;
}

export function resetProviders(): void {
  aiProvider = null;
  emailProvider = null;
  paymentProvider = null;
  browserProvider = null;
}

