import { describe, it } from "node:test";
import assert from "node:assert";
import { createUser, login, logout, authenticate } from "../src/index.js";

const uid = () => `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
const hasDb = !!process.env.TEST_DATABASE_URL || !!process.env.DATABASE_URL;
const skip = !hasDb;

describe("auth-sdk", () => {
  it("creates a user", { skip }, async () => {
    const user = await createUser(`test_${uid()}@example.com`, "Test User", "en");
    assert.ok(user.email.includes("@example.com"));
    assert.strictEqual(user.name, "Test User");
    assert.ok(user.id);
  });

  it("logs in and returns a session", { skip }, async () => {
    const email = `login_${uid()}@example.com`;
    const user = await createUser(email, "Login User", "vi");
    const result = await login(user.email);
    assert.ok(result);
    assert.ok(result!.session.token);
    assert.strictEqual(result!.user.email, user.email);
  });

  it("authenticates with token", { skip }, async () => {
    const email = `auth_${uid()}@example.com`;
    const user = await createUser(email, "Auth User", "en");
    const result = await login(user.email);
    const authed = await authenticate(result!.session.token);
    assert.ok(authed);
    assert.strictEqual(authed!.email, user.email);
  });

  it("logout invalidates token", { skip }, async () => {
    const email = `logout_${uid()}@example.com`;
    const user = await createUser(email, "Logout User", "vi");
    const result = await login(user.email);
    await logout(result!.session.token);
    const authed = await authenticate(result!.session.token);
    assert.strictEqual(authed, null);
  });
});
