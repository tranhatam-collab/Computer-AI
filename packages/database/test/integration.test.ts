import { describe, it, before, after } from "node:test";
import assert from "node:assert";
import { getPgPool, query, closePgPool } from "../src/pg.js";
import { runMigrations } from "../src/migrate.js";
import * as browserModel from "../src/models/browser.js";
import * as calendarModel from "../src/models/calendar.js";

const TEST_DB_URL = process.env.TEST_DATABASE_URL || process.env.DATABASE_URL;

describe("Database Integration", { skip: !TEST_DB_URL }, () => {
  before(async () => {
    process.env.DATABASE_URL = TEST_DB_URL;
    await runMigrations();
  });

  after(async () => {
    await closePgPool();
  });

  it("connects to PostgreSQL", async () => {
    const res = await query("SELECT NOW() as now");
    assert.ok(res.rows[0].now);
  });

  it("runs migrations without error", async () => {
    // runMigrations called in before; if it threw, test would fail
    const res = await query("SELECT COUNT(*) as count FROM pg_tables WHERE schemaname = 'public'");
    assert.ok(Number(res.rows[0].count) > 0);
  });

  it("creates and retrieves browser session", async () => {
    const session = await browserModel.createBrowserSession({
      user_id: "user_test_1",
      session_type: "manual",
      status: "active",
    });
    assert.ok(session.id);
    assert.equal(session.user_id, "user_test_1");

    const retrieved = await browserModel.getBrowserSession(session.id);
    assert.ok(retrieved);
    assert.equal(retrieved!.id, session.id);
  });

  it("creates and retrieves calendar event", async () => {
    const start = new Date();
    const end = new Date(start.getTime() + 3600000);
    const event = await calendarModel.createCalendarEvent({
      user_id: "user_test_1",
      title: "Test Meeting",
      event_type: "meeting",
      start_time: start.toISOString(),
      end_time: end.toISOString(),
      timezone: "Asia/Ho_Chi_Minh",
      status: "confirmed",
    });
    assert.ok(event.id);
    assert.equal(event.title, "Test Meeting");

    const retrieved = await calendarModel.getCalendarEvent(event.id);
    assert.ok(retrieved);
    assert.equal(retrieved!.title, "Test Meeting");
  });
});
