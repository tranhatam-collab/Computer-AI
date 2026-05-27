import { describe, it, before, after } from "node:test";
import assert from "node:assert";
import { ResearchWorker, ContentWorker, CodeWorker, BrowserWorker } from "../src/index.js";

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

    it("BrowserWorker returns deterministic mock output", async () => {
      const worker = new BrowserWorker();
      const result = await worker.execute({
        id: "test-4",
        type: "fetch",
        input: "https://example.com",
      });
      assert.ok(result.success);
      assert.ok(result.output.includes("ENABLE_RUNTIME_MOCK=true"));
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
  });
});
