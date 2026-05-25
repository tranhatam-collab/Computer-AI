import { describe, it } from "node:test";
import assert from "node:assert";
import { createUser, login, logout, authenticate } from "../src/index.js";

describe("auth-sdk", () => {
  it("creates a user", () => {
    const user = createUser("test@example.com", "Test User", "en");
    assert.strictEqual(user.email, "test@example.com");
    assert.strictEqual(user.name, "Test User");
    assert.ok(user.id);
  });

  it("logs in and returns a session", () => {
    const user = createUser("login@example.com", "Login User", "vi");
    const result = login(user.email);
    assert.ok(result);
    assert.ok(result!.session.token);
    assert.strictEqual(result!.user.email, user.email);
  });

  it("authenticates with token", () => {
    const user = createUser("auth@example.com", "Auth User", "en");
    const result = login(user.email);
    const authed = authenticate(result!.session.token);
    assert.ok(authed);
    assert.strictEqual(authed!.email, user.email);
  });

  it("logout invalidates token", () => {
    const user = createUser("logout@example.com", "Logout User", "vi");
    const result = login(user.email);
    logout(result!.session.token);
    const authed = authenticate(result!.session.token);
    assert.strictEqual(authed, null);
  });
});
