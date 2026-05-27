import {
  createUser as pgCreateUser,
  getUserById as pgGetUserById,
  getUserByEmail as pgGetUserByEmail,
  createSession as pgCreateSession,
  getActiveSession as pgGetActiveSession,
  deleteSession as pgDeleteSession
} from "@iai/database";
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

export async function createUser(email: string, name: string, locale: "vi" | "en" = "vi"): Promise<User> {
  const user = await pgCreateUser(email, name, locale);
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    locale: user.locale as "vi" | "en",
  };
}

export async function authenticate(token: string): Promise<User | null> {
  const session = await pgGetActiveSession(token);
  if (!session) {
    return null;
  }

  const user = await pgGetUserById(session.user_id);
  return user ? {
    id: user.id,
    email: user.email,
    name: user.name,
    locale: user.locale as "vi" | "en",
  } : null;
}

export async function login(email: string): Promise<{ user: User; session: Session } | null> {
  const user = await pgGetUserByEmail(email);
  if (!user) return null;

  const session = await pgCreateSession(user.id, 7);
  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      locale: user.locale as "vi" | "en",
    },
    session: {
      token: session.token,
      userId: session.user_id,
      expiresAt: Math.floor(new Date(session.expires_at).getTime() / 1000),
    },
  };
}

export async function logout(token: string): Promise<void> {
  await pgDeleteSession(token);
}
