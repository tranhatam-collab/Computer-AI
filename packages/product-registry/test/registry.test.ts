import { describe, it } from "node:test";
import assert from "node:assert";
import { products, getPricing, getShell, getAppMap, getProductsByLane } from "../src/index.js";

describe("product-registry", () => {
  it("has 12 products", () => {
    assert.strictEqual(products.length, 12);
  });

  it("getPricing returns monthly and annual", () => {
    const price = getPricing("personal");
    assert.ok(price.monthly !== undefined);
    assert.ok(price.annual !== undefined);
  });

  it("getShell returns quota and lanes", () => {
    const shell = getShell("personal");
    assert.ok(shell.lanes.length > 0);
    assert.ok(shell.quota.runsPerDay > 0);
  });

  it("getAppMap returns all lanes", () => {
    const map = getAppMap();
    assert.ok(map.length > 0);
    const basic = map.find((m) => m.lane === "basic");
    assert.ok(basic);
    assert.ok(basic!.productIds.length > 0);
  });

  it("getProductsByLane returns products", () => {
    const items = getProductsByLane("basic");
    assert.ok(items.length > 0);
  });
});
