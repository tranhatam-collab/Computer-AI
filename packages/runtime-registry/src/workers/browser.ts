import { BaseWorker, type WorkerTask, type WorkerResult } from "../base.js";

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

    if (task.type === "fetch") {
      try {
        const url = new URL(task.input);
        const res = await fetch(url.toString());
        const text = await res.text();
        return this.result(
          `# Fetch Result\n\n**URL:** ${url.toString()}\n**Status:** ${res.status}\n**Content-Type:** ${res.headers.get("content-type")}\n\n## Content Preview\n\n${text.substring(0, 2000)}...`,
          "markdown",
          { durationMs: Date.now() - start }
        );
      } catch (error) {
        return this.error(
          `Fetch failed: ${error instanceof Error ? error.message : String(error)}`,
          { durationMs: Date.now() - start }
        );
      }
    }

    // search, browse, scrape require additional infrastructure (SerpApi, Puppeteer, etc.)
    return this.result(
      `[Browser Worker] Task: ${task.id}\nType: ${task.type}\nInput: ${task.input.substring(0, 200)}\n\nStatus: ${task.type === "fetch" ? "Use fetch type for HTTP requests" : "Requires additional infrastructure (SerpApi/Puppeteer) for production"}`,
      "markdown",
      { durationMs: Date.now() - start }
    );
  }
}
