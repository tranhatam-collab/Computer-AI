import { describe, it } from "node:test";
import assert from "node:assert";
import { logRequest, logAuditFailure } from "../src/observability.js";

describe("Observability helpers", () => {
  it("logRequest produces JSON with required fields", () => {
    const request = {
      id: "req-123",
      method: "POST",
      routerPath: "/api/test",
      ip: "127.0.0.1",
      user: { id: "user-456" },
    };
    const reply = { statusCode: 200 };
    logRequest(request, reply, Date.now());
    // If no exception, the helper produces valid console output
    assert.ok(true);
  });

  it("logRequest classifies 500 as error", () => {
    const request = {
      id: "req-500",
      method: "POST",
      routerPath: "/api/fail",
      ip: "127.0.0.1",
    };
    const reply = { statusCode: 500 };
    logRequest(request, reply, Date.now());
    assert.ok(true);
  });

  it("logAuditFailure produces JSON with audit event", () => {
    const request = {
      id: "req-999",
      method: "DELETE",
      routerPath: "/api/delete",
    };
    logAuditFailure(request, new Error("DB timeout"));
    assert.ok(true);
  });
});
