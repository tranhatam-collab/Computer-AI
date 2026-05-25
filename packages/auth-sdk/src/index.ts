import { getDb } from "@iai/database";
import crypto from "crypto";

export interface User {
  id: string;
  email: string;
  name: string;
  locale: "vi" | "en";
}

export interface Session {
  token: string;
  userId: string;
  expiresAt: number;
}

export function createUser(email: string, name: string, locale: "vi" | "en" = "vi"): User {
  const db = getDb();
  const id = `user_${crypto.randomUUID().substring(0, 8)}`;
  db.prepare(
    `INSERT INTO users (id, email, name, locale) VALUES (?, ?, ?, ?)`
  ).run(id, email, name, locale);
  return { id, email, name, locale };
}

export function authenticate(token: string): User | null {
  const db = getDb();
  const sessionRow = db.prepare(
    `SELECT user_id, expires_at FROM sessions WHERE token = ?`
  ).get(token) as { user_id: string; expires_at: number } | undefined;
  if (!sessionRow || sessionRow.expires_at < Date.now() / 1000) {
    if (sessionRow) db.prepare(`DELETE FROM sessions WHERE token = ?`).run(token);
    return null;
  }
  const userRow = db.prepare(
    `SELECT id, email, name, locale FROM users WHERE id = ?`
  ).get(sessionRow.user_id) as User | undefined;
  return userRow || null;
}

export function login(email: string): { user: User; session: Session } | null {
  const db = getDb();
  const userRow = db.prepare(
    `SELECT id, email, name, locale FROM users WHERE email = ?`
  ).get(email) as User | undefined;
  if (!userRow) return null;

  const token = `sess_${crypto.randomUUID()}`;
  const expiresAt = Math.floor(Date.now() / 1000) + 86400 * 7;
  db.prepare(
    `INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)`
  ).run(token, userRow.id, expiresAt);
  return { user: userRow, session: { token, userId: userRow.id, expiresAt } };
}

export function logout(token: string): void {
  const db = getDb();
  db.prepare(`DELETE FROM sessions WHERE token = ?`).run(token);
}
