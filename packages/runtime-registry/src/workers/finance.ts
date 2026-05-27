import { BaseWorker, type WorkerTask, type WorkerResult } from "../base.js";
import { generateWithFallback } from "@iai/providers";

export class FinanceWorker extends BaseWorker {
  name = "finance";
  allowedTypes = ["report", "forecast", "ledger", "budget", "invoice", "tax"];

  async run(task: WorkerTask): Promise<WorkerResult> {
    const start = Date.now();

    if (process.env.ENABLE_RUNTIME_MOCK === "true") {
      return this.result(
        `# Finance Output (Simulated)\n\n**Task:** ${task.id}\n**Type:** ${task.type}\n\n## Generated Content\n\n${task.input.substring(0, 100)}...\n\n---\n*ENABLE_RUNTIME_MOCK=true — using mock output*`,
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
        `Finance worker error: ${error instanceof Error ? error.message : String(error)}`,
        { durationMs: Date.now() - start }
      );
    }
  }

  private buildSystemPrompt(taskType: string): string {
    const basePrompt = "You are an AI finance assistant. Provide accurate, compliant financial outputs. Always include disclaimers that this is not professional financial advice.";
    const typePrompts: Record<string, string> = {
      report: `${basePrompt} Generate a financial report with summary metrics, period comparisons, and key takeaways.`,
      forecast: `${basePrompt} Produce a financial forecast with assumptions, projections, and sensitivity scenarios.`,
      ledger: `${basePrompt} Format a ledger-style entry list with debits, credits, accounts, and running balances.`,
      budget: `${basePrompt} Create a budget plan with categories, allocations, variances, and savings recommendations.`,
      invoice: `${basePrompt} Draft an invoice with line items, quantities, rates, taxes, due date, and payment terms.`,
      tax: `${basePrompt} Summarize tax considerations, applicable rules, and filing checklist items.`,
    };
    return typePrompts[taskType] || basePrompt;
  }
}
