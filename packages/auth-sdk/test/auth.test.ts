import { describe, it } from "node:test";
import assert from "node:assert";
import { createUser, login, logout, authenticate } from "../src/index.js";

const uid = () => `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

describe("auth-sdk", () => {
  it("creates a user", () => {
    const user = createUser(`test_${uid()}@example.com`, "Test User", "en");
    assert.ok(user.email.includes("@example.com"));
    assert.strictEqual(user.name, "Test User");
    assert.ok(user.id);
  });

  it("logs in and returns a session", () => {
    const email = `login_${uid()}@example.com`;
    const user = createUser(email, "Login User", "vi");
    const result = login(user.email);
    assert.ok(result);
    assert.ok(result!.session.token);
    assert.strictEqual(result!.user.email, user.email);
  });

  it("authenticates with token", () => {
    const email = `auth_${uid()}@example.com`;
    const user = createUser(email, "Auth User", "en");
    const result = login(user.email);
    const authed = authenticate(result!.session.token);
    assert.ok(authed);
    assert.strictEqual(authed!.email, user.email);
  });

  it("logout invalidates token", () => {
    const email = `logout_${uid()}@example.com`;
    const user = createUser(email, "Logout User", "vi");
    const result = login(user.email);
    logout(result!.session.token);
    const authed = authenticate(result!.session.token);
    assert.strictEqual(authed, null);
  });
});
