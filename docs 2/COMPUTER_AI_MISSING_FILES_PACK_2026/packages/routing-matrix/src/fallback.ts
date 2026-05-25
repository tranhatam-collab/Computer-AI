export interface FallbackRule { provider: string; fallbackProviders: string[]; }
export const fallbackRules: FallbackRule[] = [
  { provider: "openai", fallbackProviders: ["anthropic", "gemini", "openrouter"] },
  { provider: "anthropic", fallbackProviders: ["openai", "gemini", "openrouter"] },
  { provider: "groq", fallbackProviders: ["gemini", "openrouter"] },
  { provider: "gemini", fallbackProviders: ["openrouter", "mistral"] },
  { provider: "deepseek", fallbackProviders: ["mistral", "openrouter"] }
];
