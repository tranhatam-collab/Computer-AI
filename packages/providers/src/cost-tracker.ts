export interface CostEstimate {
  provider: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  costCents: number;
}

// Approximate pricing per 1M tokens (subject to change)
const PRICING: Record<string, { input: number; output: number }> = {
  // OpenAI
  "gpt-4o": { input: 5.0, output: 15.0 },
  "gpt-4o-mini": { input: 0.15, output: 0.6 },
  "gpt-4-turbo": { input: 10.0, output: 30.0 },
  "gpt-4": { input: 30.0, output: 60.0 },
  // Anthropic
  "claude-3-5-sonnet-20241022": { input: 3.0, output: 15.0 },
  "claude-3-5-sonnet": { input: 3.0, output: 15.0 },
  "claude-3-sonnet": { input: 3.0, output: 15.0 },
  "claude-3-haiku": { input: 0.25, output: 1.25 },
  "claude-3-opus": { input: 15.0, output: 75.0 },
};

export function estimateCost(
  provider: string,
  model: string,
  inputTokens: number,
  outputTokens: number
): CostEstimate {
  const rates = PRICING[model] || { input: 5.0, output: 15.0 };

  // Cost in USD = (inputTokens / 1M) * inputRate + (outputTokens / 1M) * outputRate
  // Convert to cents: * 100
  const costCents =
    (inputTokens / 1_000_000) * rates.input * 100 +
    (outputTokens / 1_000_000) * rates.output * 100;

  return {
    provider,
    model,
    inputTokens,
    outputTokens,
    costCents: Math.round(costCents * 1000) / 1000, // 3 decimal places
  };
}
