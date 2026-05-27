import { BaseWorker, type WorkerTask, type WorkerResult } from "../base.js";
import { getAIProvider, generateWithFallback } from "@iai/providers";

export class CodeWorker extends BaseWorker {
  name = "code";
  allowedTypes = ["generate", "review", "debug", "refactor", "explain"];

  async run(task: WorkerTask): Promise<WorkerResult> {
    const start = Date.now();

    if (process.env.ENABLE_RUNTIME_MOCK === "true") {
      return this.result(
        `[Code Worker (Simulated)] Task: ${task.id}\nType: ${task.type}\nInput: ${task.input.substring(0, 200)}\n\n// Simulated code output\nconsole.log("ENABLE_RUNTIME_MOCK=true — using mock output");`,
        "code",
        { durationMs: Date.now() - start }
      );
    }

    try {
      const systemPrompt = this.buildSystemPrompt(task.type);
      const fallbackResult = await generateWithFallback({
        model: "claude-sonnet-4",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: task.input },
        ],
        maxTokens: 4096,
      });

      return this.result(
        fallbackResult.response.content,
        "code",
        {
          durationMs: Date.now() - start,
          tokenCount: fallbackResult.cost.inputTokens + fallbackResult.cost.outputTokens,
        }
      );
    } catch (error) {
      return this.error(
        `Code worker error: ${error instanceof Error ? error.message : String(error)}`,
        { durationMs: Date.now() - start }
      );
    }
  }

  private buildSystemPrompt(taskType: string): string {
    const basePrompt = "You are an AI coding assistant. Provide clean, well-documented code.";
    const typePrompts: Record<string, string> = {
      generate: `${basePrompt} Generate code based on the given requirements. Include comments and documentation.`,
      review: `${basePrompt} Review the given code. Identify bugs, style issues, and suggest improvements.`,
      debug: `${basePrompt} Debug the given code. Identify the issue and provide a fix with explanation.`,
      refactor: `${basePrompt} Refactor the given code to improve readability, maintainability, or performance.`,
      explain: `${basePrompt} Explain the given code clearly. Describe what it does and how it works.`,
    };
    return typePrompts[taskType] || basePrompt;
  }
}
