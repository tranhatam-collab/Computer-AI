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
  tier: string;
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
    tier: user.tier || "free",
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
    tier: user.tier || "free",
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
      tier: user.tier || "free",
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

export {
  getOAuthConfig,
  generateOAuthUrl,
  verifyOAuthState,
  exchangeOAuthCode,
  getOAuthStatus,
} from "./oauth.js";
export type { OAuthConfig, OAuthState } from "./oauth.js";

export { assertPermission, getMembership, hasPermission, hasRoleLevel, PERMISSIONS, ROLE_HIERARCHY } from "./rbac.js";
export type { Role, Membership } from "./rbac.js";

export { createAuditEntry, getAuditLogs, getAuditLogsByActor, computeAuditHash } from "./audit.js";
export type { AuditEntry, ActorType } from "./audit.js";

export { checkRateLimit, rateLimitMiddleware } from "./rate-limit.js";
export type { RateLimitConfig } from "./rate-limit.js";
