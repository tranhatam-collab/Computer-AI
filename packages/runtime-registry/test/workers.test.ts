import { describe, it, before, after } from "node:test";
import assert from "node:assert";
import { ResearchWorker, ContentWorker, CodeWorker, BrowserWorker, OfficeWorker, SalesWorker, FinanceWorker, EnterpriseWorker } from "../src/index.js";

describe("Runtime Workers", () => {
  const originalMock = process.env.ENABLE_RUNTIME_MOCK;

  after(() => {
    if (originalMock !== undefined) {
      process.env.ENABLE_RUNTIME_MOCK = originalMock;
    } else {
      delete process.env.ENABLE_RUNTIME_MOCK;
    }
  });

  describe("with ENABLE_RUNTIME_MOCK=true", () => {
    before(() => {
      process.env.ENABLE_RUNTIME_MOCK = "true";
    });

    it("ResearchWorker returns deterministic mock output", async () => {
      const worker = new ResearchWorker();
      const result = await worker.execute({
        id: "test-1",
        type: "research",
        input: "Test research query",
      });
      assert.ok(result.success);
      assert.ok(result.output.includes("ENABLE_RUNTIME_MOCK=true"));
      assert.ok(result.output.includes("Simulated"));
    });

    it("ContentWorker returns deterministic mock output", async () => {
      const worker = new ContentWorker();
      const result = await worker.execute({
        id: "test-2",
        type: "write",
        input: "Write a blog post",
      });
      assert.ok(result.success);
      assert.ok(result.output.includes("ENABLE_RUNTIME_MOCK=true"));
      assert.ok(result.output.includes("Simulated"));
    });

    it("CodeWorker returns deterministic mock output", async () => {
      const worker = new CodeWorker();
      const result = await worker.execute({
        id: "test-3",
        type: "generate",
        input: "Write a function",
      });
      assert.ok(result.success);
      assert.ok(result.output.includes("ENABLE_RUNTIME_MOCK=true"));
      assert.ok(result.output.includes("Simulated"));
    });

    it("BrowserWorker fetch returns deterministic mock output", async () => {
      const worker = new BrowserWorker();
      const result = await worker.execute({
        id: "test-4",
        type: "fetch",
        input: "https://example.com",
      });
      assert.ok(result.success);
      assert.ok(result.output.includes("ENABLE_RUNTIME_MOCK=true"));
    });

    it("BrowserWorker search returns deterministic mock output", async () => {
      const worker = new BrowserWorker();
      const result = await worker.execute({
        id: "test-s4",
        type: "search",
        input: "AI automation",
      });
      assert.ok(result.success);
      assert.ok(result.output.includes("ENABLE_RUNTIME_MOCK=true"));
    });

    it("BrowserWorker browse returns deterministic mock output", async () => {
      const worker = new BrowserWorker();
      const result = await worker.execute({
        id: "test-b4",
        type: "browse",
        input: "https://example.com",
      });
      assert.ok(result.success);
      assert.ok(result.output.includes("ENABLE_RUNTIME_MOCK=true"));
    });

    it("BrowserWorker scrape returns deterministic mock output", async () => {
      const worker = new BrowserWorker();
      const result = await worker.execute({
        id: "test-sc4",
        type: "scrape",
        input: "",
        options: { selector: "h1", url: "https://example.com" },
      });
      assert.ok(result.success);
      assert.ok(result.output.includes("ENABLE_RUNTIME_MOCK=true"));
    });

    it("OfficeWorker returns deterministic mock output", async () => {
      const worker = new OfficeWorker();
      const result = await worker.execute({
        id: "test-o1",
        type: "document",
        input: "Draft a memo",
      });
      assert.ok(result.success);
      assert.ok(result.output.includes("ENABLE_RUNTIME_MOCK=true"));
      assert.ok(result.output.includes("Simulated"));
    });

    it("SalesWorker returns deterministic mock output", async () => {
      const worker = new SalesWorker();
      const result = await worker.execute({
        id: "test-s1",
        type: "proposal",
        input: "Create a proposal",
      });
      assert.ok(result.success);
      assert.ok(result.output.includes("ENABLE_RUNTIME_MOCK=true"));
      assert.ok(result.output.includes("Simulated"));
    });

    it("FinanceWorker returns deterministic mock output", async () => {
      const worker = new FinanceWorker();
      const result = await worker.execute({
        id: "test-f1",
        type: "report",
        input: "Q1 financial report",
      });
      assert.ok(result.success);
      assert.ok(result.output.includes("ENABLE_RUNTIME_MOCK=true"));
      assert.ok(result.output.includes("Simulated"));
    });

    it("EnterpriseWorker returns deterministic mock output", async () => {
      const worker = new EnterpriseWorker();
      const result = await worker.execute({
        id: "test-e1",
        type: "strategy",
        input: "Digital transformation strategy",
      });
      assert.ok(result.success);
      assert.ok(result.output.includes("ENABLE_RUNTIME_MOCK=true"));
      assert.ok(result.output.includes("Simulated"));
    });
  });

  describe("with ENABLE_RUNTIME_MOCK=false", () => {
    before(() => {
      process.env.ENABLE_RUNTIME_MOCK = "false";
    });

    it("ResearchWorker does not include mock marker when provider available", async () => {
      const worker = new ResearchWorker();
      const result = await worker.execute({
        id: "test-4",
        type: "research",
        input: "Test query",
      });
      // If provider keys absent, should error (mock throws)
      // If provider keys present, should return AI output
      // Either way, should NOT include ENABLE_RUNTIME_MOCK marker
      assert.ok(!result.output.includes("ENABLE_RUNTIME_MOCK=true"));
    });

    it("ContentWorker does not include mock marker when provider available", async () => {
      const worker = new ContentWorker();
      const result = await worker.execute({
        id: "test-5",
        type: "write",
        input: "Write content",
      });
      assert.ok(!result.output.includes("ENABLE_RUNTIME_MOCK=true"));
    });

    it("CodeWorker does not include mock marker when provider available", async () => {
      const worker = new CodeWorker();
      const result = await worker.execute({
        id: "test-6",
        type: "generate",
        input: "Generate code",
      });
      assert.ok(!result.output.includes("ENABLE_RUNTIME_MOCK=true"));
    });

    it("BrowserWorker does not include mock marker when fetch available", async () => {
      const worker = new BrowserWorker();
      const result = await worker.execute({
        id: "test-7",
        type: "fetch",
        input: "https://example.com",
      });
      assert.ok(!result.output.includes("ENABLE_RUNTIME_MOCK=true"));
    });

    it("BrowserWorker search does not include mock marker", async () => {
      const worker = new BrowserWorker();
      const result = await worker.execute({
        id: "test-s7",
        type: "search",
        input: "test query",
      });
      assert.ok(!result.output.includes("ENABLE_RUNTIME_MOCK=true"));
      assert.ok(result.output.includes("Search Results"));
    });

    it("BrowserWorker browse does not include mock marker", async () => {
      const worker = new BrowserWorker();
      const result = await worker.execute({
        id: "test-b7",
        type: "browse",
        input: "https://example.com",
      });
      assert.ok(!result.output.includes("ENABLE_RUNTIME_MOCK=true"));
      assert.ok(result.output.includes("Browse:"));
    });

    it("BrowserWorker scrape does not include mock marker", async () => {
      const worker = new BrowserWorker();
      const result = await worker.execute({
        id: "test-sc7",
        type: "scrape",
        input: "",
        options: { selector: "h1", url: "https://example.com" },
      });
      assert.ok(!result.output.includes("ENABLE_RUNTIME_MOCK=true"));
      assert.ok(result.output.includes("Scrape:"));
    });

    it("OfficeWorker does not include mock marker when provider available", async () => {
      const worker = new OfficeWorker();
      const result = await worker.execute({
        id: "test-o2",
        type: "document",
        input: "Draft a memo",
      });
      assert.ok(!result.output.includes("ENABLE_RUNTIME_MOCK=true"));
    });

    it("SalesWorker does not include mock marker when provider available", async () => {
      const worker = new SalesWorker();
      const result = await worker.execute({
        id: "test-s2",
        type: "proposal",
        input: "Create a proposal",
      });
      assert.ok(!result.output.includes("ENABLE_RUNTIME_MOCK=true"));
    });

    it("FinanceWorker does not include mock marker when provider available", async () => {
      const worker = new FinanceWorker();
      const result = await worker.execute({
        id: "test-f2",
        type: "report",
        input: "Q1 financial report",
      });
      assert.ok(!result.output.includes("ENABLE_RUNTIME_MOCK=true"));
    });

    it("EnterpriseWorker does not include mock marker when provider available", async () => {
      const worker = new EnterpriseWorker();
      const result = await worker.execute({
        id: "test-e2",
        type: "strategy",
        input: "Digital transformation strategy",
      });
      assert.ok(!result.output.includes("ENABLE_RUNTIME_MOCK=true"));
    });
  });
});
