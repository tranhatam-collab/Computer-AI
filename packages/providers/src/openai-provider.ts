import OpenAI from "openai";
import type { AIProvider, AIRequest, AIResponse } from "./index.js";

export class OpenAIProvider implements AIProvider {
  readonly kind = "openai" as const;
  readonly configured: boolean;
  private client: OpenAI;

  constructor(apiKey?: string) {
    const key = apiKey || process.env.OPENAI_API_KEY;
    this.configured = !!key;
    this.client = new OpenAI({ apiKey: key || "dummy" });
  }

  async generate(req: AIRequest): Promise<AIResponse> {
    if (!this.configured) {
      throw new Error("OpenAI API key not configured");
    }

    const response = await this.client.chat.completions.create({
      model: req.model,
      messages: req.messages as OpenAI.Chat.ChatCompletionMessageParam[],
      max_tokens: req.maxTokens,
    });

    const choice = response.choices[0];
    const content = choice?.message?.content || "";

    return {
      content,
      model: response.model,
      usage: {
        inputTokens: response.usage?.prompt_tokens || 0,
        outputTokens: response.usage?.completion_tokens || 0,
      },
    };
  }
}
