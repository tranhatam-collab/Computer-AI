import { describe, it } from "node:test";
import assert from "node:assert";
import { RealBrowserProvider } from "../src/browser-provider.js";

describe("BrowserProvider security", () => {
  const provider = new RealBrowserProvider("dummy-key");

  it("blocks localhost", async () => {
    await assert.rejects(
      provider.fetch({ url: "http://localhost:3000/admin" }),
      /Host not allowed/
    );
  });

  it("blocks 127.0.0.1", async () => {
    await assert.rejects(
      provider.fetch({ url: "http://127.0.0.1/secret" }),
      /private\/reserved/
    );
  });

  it("blocks file:// protocol", async () => {
    await assert.rejects(
      provider.fetch({ url: "file:///etc/passwd" }),
      /Protocol not allowed/
    );
  });

  it("blocks private IP 10.x.x.x", async () => {
    await assert.rejects(
      provider.fetch({ url: "http://10.0.0.1/internal" }),
      /private\/reserved/
    );
  });

  it("blocks private IP 192.168.x.x", async () => {
    await assert.rejects(
      provider.fetch({ url: "http://192.168.1.1/router" }),
      /private\/reserved/
    );
  });

  it("allows public URL", async () => {
    // This should not throw on validation; actual fetch may fail (no network), but we verify guard passes
    try {
      await provider.fetch({ url: "https://example.com", timeoutMs: 3000 });
    } catch (err: any) {
      // Fetch errors are acceptable; we only care that SSRF guard didn't block it
      assert.ok(!/not allowed|private|reserved/.test(err.message), `Unexpected SSRF block for example.com: ${err.message}`);
    }
  });
});
