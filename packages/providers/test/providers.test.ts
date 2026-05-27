import { describe, it } from "node:test";
import assert from "node:assert";
import {
  getAIProvider,
  getEmailProvider,
  getPaymentProvider,
  resetProviders,
} from "../src/factory.js";

describe("Provider Factory", () => {
  it("returns mock AI provider when no keys set", () => {
    resetProviders();
    const provider = getAIProvider();
    assert.equal(provider.kind, "mock");
    assert.equal(provider.configured, false);
  });

  it("returns mock email provider when no SENDGRID_API_KEY", () => {
    resetProviders();
    const provider = getEmailProvider();
    assert.equal(provider.kind, "console");
    assert.equal(provider.configured, false);
  });

  it("returns mock payment provider when no keys", () => {
    resetProviders();
    const provider = getPaymentProvider();
    assert.equal(provider.kind, "mock");
    assert.equal(provider.configured, false);
  });
});
