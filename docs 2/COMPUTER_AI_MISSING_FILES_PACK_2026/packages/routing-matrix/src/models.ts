export type ModelClass = "fast-chat" | "reasoning" | "code" | "research" | "long-context" | "vision" | "policy-bound";
export interface ModelClassPolicy { modelClass: ModelClass; preferredProviders: string[]; fallbackProviders: string[]; }
export const modelClassPolicies: ModelClassPolicy[] = [
  { modelClass: "fast-chat", preferredProviders: ["groq", "gemini", "cloudflare"], fallbackProviders: ["openrouter"] },
  { modelClass: "reasoning", preferredProviders: ["openai", "anthropic", "gemini"], fallbackProviders: ["openrouter", "deepseek"] },
  { modelClass: "code", preferredProviders: ["anthropic", "openai", "deepseek"], fallbackProviders: ["mistral", "openrouter"] },
  { modelClass: "research", preferredProviders: ["perplexity", "openai", "gemini"], fallbackProviders: ["openrouter"] }
];
