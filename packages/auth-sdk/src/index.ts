import { db } from "@iai/database";
import type { User } from "@iai/database";
import crypto from "crypto";

export interface Session {
  token: string;
  userId: string;
  expiresAt: number;
}

const sessions = new Map<string, Session>();

export function createUser(email: string, name: string, locale: "vi" | "en" = "vi"): User {
  const id = `user_${crypto.randomUUID().substring(0, 8)}`;
  const user: User = { id, email, name, locale };
  db.users.set(id, user);
  return user;
}

export function authenticate(token: string): User | null {
  const session = sessions.get(token);
  if (!session || session.expiresAt < Date.now()) {
    sessions.delete(token);
    return null;
  }
  return db.users.get(session.userId) || null;
}

export function login(email: string): { user: User; session: Session } | null {
  const user = Array.from(db.users.values()).find((u) => u.email === email);
  if (!user) return null;

  const token = `sess_${crypto.randomUUID()}`;
  const session: Session = { token, userId: user.id, expiresAt: Date.now() + 86400000 * 7 };
  sessions.set(token, session);
  return { user, session };
}

export function logout(token: string): void {
  sessions.delete(token);
}
