import Anthropic from "@anthropic-ai/sdk";
import type { AIProvider, AIRequest, AIResponse } from "./index.js";

export class AnthropicProvider implements AIProvider {
  readonly kind = "anthropic" as const;
  readonly configured: boolean;
  private client: Anthropic;

  constructor(apiKey?: string) {
    const key = apiKey || process.env.ANTHROPIC_API_KEY;
    this.configured = !!key;
    this.client = new Anthropic({ apiKey: key || "dummy" });
  }

  async generate(req: AIRequest): Promise<AIResponse> {
    if (!this.configured) {
      throw new Error("Anthropic API key not configured");
    }

    // Map OpenAI-style messages to Anthropic format
    const systemMessage = req.messages.find((m) => m.role === "system")?.content || "";
    const conversationMessages = req.messages
      .filter((m) => m.role !== "system")
      .map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      }));

    const response = await this.client.messages.create({
      model: req.model,
      max_tokens: req.maxTokens || 1024,
      system: systemMessage || undefined,
      messages: conversationMessages,
    });

    const content = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("");

    return {
      content,
      model: response.model,
      usage: {
        inputTokens: response.usage?.input_tokens || 0,
        outputTokens: response.usage?.output_tokens || 0,
      },
    };
  }
}
