import { BaseWorker, type WorkerTask, type WorkerResult } from "../base.js";
import { getAIProvider, generateWithFallback } from "@iai/providers";

export class ResearchWorker extends BaseWorker {
  name = "research";
  allowedTypes = ["research", "analyze", "summarize", "fact-check", "translate"];

  async run(task: WorkerTask): Promise<WorkerResult> {
    const start = Date.now();

    if (process.env.ENABLE_RUNTIME_MOCK === "true") {
      return this.result(
        `# Research Result (Simulated)\n\n**Task:** ${task.id}\n**Type:** ${task.type}\n\n## Summary\n${task.input.substring(0, 100)}...\n\n## Sources\n- Simulated source 1\n- Simulated source 2\n\n*ENABLE_RUNTIME_MOCK=true — using mock output*`,
        "markdown",
        { durationMs: Date.now() - start, sourceCount: 2 }
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
        "markdown",
        {
          durationMs: Date.now() - start,
          tokenCount: fallbackResult.cost.inputTokens + fallbackResult.cost.outputTokens,
        }
      );
    } catch (error) {
      return this.error(
        `Research worker error: ${error instanceof Error ? error.message : String(error)}`,
        { durationMs: Date.now() - start }
      );
    }
  }

  private buildSystemPrompt(taskType: string): string {
    const basePrompt = "You are an AI research assistant. Provide accurate, well-sourced responses.";
    const typePrompts: Record<string, string> = {
      research: `${basePrompt} Conduct thorough research on the given topic. Cite sources where possible.`,
      analyze: `${basePrompt} Analyze the given information critically. Provide insights and conclusions.`,
      summarize: `${basePrompt} Summarize the given text concisely while preserving key information.`,
      "fact-check": `${basePrompt} Fact-check the given claims. Indicate confidence levels for each claim.`,
      translate: `${basePrompt} Translate the given text accurately while preserving meaning and tone.`,
    };
    return typePrompts[taskType] || basePrompt;
  }
}
