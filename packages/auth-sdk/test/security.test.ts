import { describe, it } from "node:test";
import assert from "node:assert";
import { hasPermission, hasRoleLevel, checkRateLimit, computeAuditHash } from "../src/index.js";

describe("RBAC", () => {
  it("owner has all permissions", () => {
    assert.ok(hasPermission("owner", "computer:delete"));
    assert.ok(hasPermission("owner", "audit:read"));
    assert.ok(hasPermission("owner", "run:execute"));
  });

  it("viewer cannot delete computer", () => {
    assert.ok(!hasPermission("viewer", "computer:delete"));
  });

  it("member can execute run", () => {
    assert.ok(hasPermission("member", "run:execute"));
  });

  it("admin outranks member", () => {
    assert.ok(hasRoleLevel("admin", "member"));
    assert.ok(!hasRoleLevel("member", "admin"));
  });
});

describe("Rate Limit", () => {
  it("allows requests within limit", () => {
    const result = checkRateLimit("test-key-1", { maxRequests: 3, windowMs: 60000 });
    assert.ok(result.allowed);
    assert.ok(result.remaining >= 0);
  });

  it("blocks after limit exceeded", () => {
    const key = "test-key-2";
    // Exhaust limit
    for (let i = 0; i < 3; i++) {
      checkRateLimit(key, { maxRequests: 2, windowMs: 60000 });
    }
    const result = checkRateLimit(key, { maxRequests: 2, windowMs: 60000 });
    assert.ok(!result.allowed);
  });
});

describe("Audit Hash", () => {
  it("produces deterministic hash", () => {
    const entry = {
      entityType: "user",
      entityId: "123",
      action: "login",
      actorId: "456",
      actorType: "user" as const,
    };
    const h1 = computeAuditHash(entry);
    const h2 = computeAuditHash(entry);
    assert.strictEqual(h1, h2);
    assert.ok(h1.length === 64); // sha256 hex = 64 chars
  });

  it("changes with different data", () => {
    const h1 = computeAuditHash({ entityType: "user", entityId: "1", action: "login" });
    const h2 = computeAuditHash({ entityType: "user", entityId: "1", action: "logout" });
    assert.notStrictEqual(h1, h2);
  });
});
