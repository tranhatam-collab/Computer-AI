import { BaseWorker, type WorkerTask, type WorkerResult } from "../base.js";
import { getBrowserProvider } from "@iai/providers";

export class BrowserWorker extends BaseWorker {
  name = "browser";
  allowedTypes = ["search", "browse", "fetch", "scrape"];

  async run(task: WorkerTask): Promise<WorkerResult> {
    const start = Date.now();

    if (process.env.ENABLE_RUNTIME_MOCK === "true") {
      return this.result(
        `[Browser Worker (Simulated)] Task: ${task.id}\nType: ${task.type}\nInput: ${task.input.substring(0, 200)}\n\nENABLE_RUNTIME_MOCK=true — using mock output`,
        "markdown",
        { durationMs: Date.now() - start }
      );
    }

    const provider = getBrowserProvider();

    try {
      switch (task.type) {
        case "fetch": {
          const res = await provider.fetch({ url: task.input, timeoutMs: 15000, maxRedirects: 5, maxBytes: 500_000 });
          return this.result(
            `# Fetch Result\n\n**URL:** ${res.url}\n**Status:** ${res.status}\n**Content-Type:** ${res.headers["content-type"] || "unknown"}\n\n## Content Preview\n\n${res.text.substring(0, 2000)}...`,
            "markdown",
            { durationMs: Date.now() - start }
          );
        }
        case "search": {
          const res = await provider.search({ query: task.input, limit: 10 });
          const results = res.results.map((r, i) => `${i + 1}. [${r.title}](${r.url})\n   ${r.snippet}`).join("\n\n");
          return this.result(
            `# Search Results: "${task.input}"\n\n${results}`,
            "markdown",
            { durationMs: Date.now() - start, sourceCount: res.results.length }
          );
        }
        case "browse": {
          const res = await provider.browse({ url: task.input, timeoutMs: 15000 });
          const links = res.links.slice(0, 20).map((l) => `- [${l.text || "link"}](${l.href})`).join("\n");
          return this.result(
            `# Browse: ${res.url}\n\n**Title:** ${res.title}\n**Status:** ${res.status}\n\n## Description\n${res.description || "N/A"}\n\n## Body Preview\n${res.bodyText.substring(0, 2000)}...\n\n## Links (${res.links.length})\n${links}`,
            "markdown",
            { durationMs: Date.now() - start, sourceCount: res.links.length }
          );
        }
        case "scrape": {
          const { selector, url } = task.options as { selector: string; url: string };
          if (!selector || !url) {
            return this.error("scrape requires options.selector and options.url", { durationMs: Date.now() - start });
          }
          const res = await provider.scrape({ url, selector, timeoutMs: 15000 });
          const matches = res.matches.map((m) => `- ${m}`).join("\n");
          return this.result(
            `# Scrape: ${res.url}\n\n**Selector:** ${res.selector}\n**Matches:** ${res.matches.length}\n\n${matches}`,
            "markdown",
            { durationMs: Date.now() - start }
          );
        }
        default:
          return this.error(`Unsupported browser task type: ${task.type}`, { durationMs: Date.now() - start });
      }
    } catch (error) {
      return this.error(
        `Browser worker error (${task.type}): ${error instanceof Error ? error.message : String(error)}`,
        { durationMs: Date.now() - start }
      );
    }
  }
}
