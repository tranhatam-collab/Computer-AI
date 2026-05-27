import { describe, it } from "node:test";
import assert from "node:assert";
import { getDb } from "../src/index.js";

const ORIGINAL_DB_URL = process.env.DATABASE_URL;

describe("SQLite guard", () => {
  it("throws when DATABASE_URL is set", () => {
    process.env.DATABASE_URL = "postgres://test@localhost/test";
    assert.throws(
      () => getDb(),
      /SQLite blocked/
    );
    process.env.DATABASE_URL = ORIGINAL_DB_URL || "";
  });
});
