import { BaseWorker, type WorkerTask, type WorkerResult } from "../base.js";
import { generateWithFallback } from "@iai/providers";

export class SalesWorker extends BaseWorker {
  name = "sales";
  allowedTypes = ["lead", "proposal", "contract", "crm", "pipeline", "quote"];

  async run(task: WorkerTask): Promise<WorkerResult> {
    const start = Date.now();

    if (process.env.ENABLE_RUNTIME_MOCK === "true") {
      return this.result(
        `# Sales Output (Simulated)\n\n**Task:** ${task.id}\n**Type:** ${task.type}\n\n## Generated Content\n\n${task.input.substring(0, 100)}...\n\n---\n*ENABLE_RUNTIME_MOCK=true — using mock output*`,
        "markdown",
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
        "markdown",
        {
          durationMs: Date.now() - start,
          tokenCount: fallbackResult.cost.inputTokens + fallbackResult.cost.outputTokens,
        }
      );
    } catch (error) {
      return this.error(
        `Sales worker error: ${error instanceof Error ? error.message : String(error)}`,
        { durationMs: Date.now() - start }
      );
    }
  }

  private buildSystemPrompt(taskType: string): string {
    const basePrompt = "You are an AI sales assistant. Generate persuasive, compliant sales materials.";
    const typePrompts: Record<string, string> = {
      lead: `${basePrompt} Draft a lead qualification script with discovery questions and qualification criteria.`,
      proposal: `${basePrompt} Write a structured sales proposal with value proposition, scope, pricing, and terms.`,
      contract: `${basePrompt} Draft a sales contract outline with key clauses, deliverables, and payment terms.`,
      crm: `${basePrompt} Generate CRM-ready contact/company notes, follow-up tasks, and deal health summaries.`,
      pipeline: `${basePrompt} Analyze a sales pipeline and suggest next-step actions with probability estimates.`,
      quote: `${basePrompt} Produce a detailed line-item quote with quantities, unit prices, discounts, and total.`,
    };
    return typePrompts[taskType] || basePrompt;
  }
}
