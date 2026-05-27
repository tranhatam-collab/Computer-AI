import type { FastifyInstance, FastifyRequest } from "fastify";
import crypto from "crypto";
import { getUserById, getUserByEmail, createUser, createSession, deleteSession } from "@iai/database";

const SESSION_DAYS = 7;

function getJwtSecret(): string {
  const secret = process.env.JWT_SIGNING_SECRET;
  if (process.env.NODE_ENV === "production") {
    if (!secret) {
      throw new Error("JWT_SIGNING_SECRET_NOT_CONFIGURED");
    }
    return secret;
  }
  return secret || "dev-secret-change-in-prod";
}

const JWT_SECRET = getJwtSecret();

interface JWTPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

function base64UrlEncode(input: Buffer): string {
  return input.toString("base64url").replace(/=+$/, "");
}

function signJWT(payload: Omit<JWTPayload, "iat" | "exp">): string {
  const header = base64UrlEncode(Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })));
  const now = Math.floor(Date.now() / 1000);
  const body = base64UrlEncode(
    Buffer.from(JSON.stringify({ ...payload, iat: now, exp: now + SESSION_DAYS * 86400 }))
  );
  const signature = base64UrlEncode(
    crypto.createHmac("sha256", JWT_SECRET).update(`${header}.${body}`).digest()
  );
  return `${header}.${body}.${signature}`;
}

function verifyJWT(token: string): JWTPayload | null {
  try {
    const [header, body, signature] = token.split(".");
    if (!header || !body || !signature) return null;
    const expected = base64UrlEncode(
      crypto.createHmac("sha256", JWT_SECRET).update(`${header}.${body}`).digest()
    );
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
    const payload = JSON.parse(Buffer.from(body, "base64url").toString()) as JWTPayload;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function getUserFromToken(token: string | undefined) {
  if (!token) return null;
  const payload = verifyJWT(token);
  if (!payload) return null;
  return getUserById(payload.userId);
}

export default async function authRoutes(app: FastifyInstance) {
  app.post("/auth/register", async (req: FastifyRequest<{ Body: { email: string; name: string; locale?: 'vi' | 'en' } }>) => {
    const { email, name, locale = "vi" } = req.body;

    const existing = await getUserByEmail(email.trim());
    if (existing) {
      return { success: false, error: "Email already registered" };
    }

    const user = await createUser(email.trim(), name.trim(), locale);
    return { success: true, data: { id: user.id, email: user.email, name: user.name } };
  });

  app.post("/auth/login", async (req: FastifyRequest<{ Body: { email: string } }>) => {
    const { email } = req.body;

    const user = await getUserByEmail(email.trim());
    if (!user) {
      return { success: false, error: "User not found" };
    }

    const token = signJWT({ userId: user.id, email: user.email });
    const session = await createSession(user.id);

    return {
      success: true,
      data: { user, session: { token: session.token, expires_at: session.expires_at } },
    };
  });

  app.get("/auth/me", async (req: FastifyRequest<{ Headers: { authorization?: string } }>) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    const user = await getUserFromToken(token);
    if (!user) return { success: false, error: "Unauthorized" };
    return { success: true, data: user };
  });

  app.post("/auth/logout", async (req: FastifyRequest<{ Headers: { authorization?: string } }>) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (token) {
      await deleteSession(token);
    }
    return { success: true };
  });
}
