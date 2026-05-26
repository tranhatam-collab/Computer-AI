import type { FastifyInstance, FastifyRequest } from "fastify";
import crypto from "crypto";
import { query } from "@iai/database/pg";

const JWT_SECRET = process.env.JWT_SIGNING_SECRET || "dev-secret-change-in-prod";
const SESSION_DAYS = 7;

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
  const res = await query<{ id: string; email: string; name: string; locale: string }>(
    `SELECT id, email, name, locale FROM users WHERE id = $1`,
    [payload.userId]
  );
  return res.rows[0] || null;
}

export default async function authRoutes(app: FastifyInstance) {
  app.post("/api/auth/register", async (req: FastifyRequest<{ Body: { email: string; name: string; locale?: string } }>) => {
    const { email, name, locale = "vi" } = req.body;

    // Check if email exists
    const existing = await query(`SELECT id FROM users WHERE email = $1`, [email.trim()]);
    if (existing.rows.length > 0) {
      return { success: false, error: "Email already registered" };
    }

    const id = `usr_${crypto.randomUUID().replace(/-/g, "").substring(0, 12)}`;
    await query(
      `INSERT INTO users (id, email, name, locale) VALUES ($1, $2, $3, $4)`,
      [id, email.trim(), name.trim(), locale]
    );

    return { success: true, data: { id, email, name } };
  });

  app.post("/api/auth/login", async (req: FastifyRequest<{ Body: { email: string } }>) => {
    const { email } = req.body;

    const userRes = await query<{ id: string; email: string; name: string }>(
      `SELECT id, email, name FROM users WHERE email = $1`,
      [email.trim()]
    );
    if (userRes.rows.length === 0) {
      return { success: false, error: "User not found" };
    }
    const user = userRes.rows[0];

    const token = signJWT({ userId: user.id, email: user.email });
    const expiresAt = new Date(Date.now() + SESSION_DAYS * 86400 * 1000);

    await query(
      `INSERT INTO sessions (token, user_id, expires_at) VALUES ($1, $2, $3)`,
      [token, user.id, expiresAt.toISOString()]
    );

    return {
      success: true,
      data: { user, session: { token, expires_at: expiresAt.toISOString() } },
    };
  });

  app.get("/api/auth/me", async (req: FastifyRequest<{ Headers: { authorization?: string } }>) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    const user = await getUserFromToken(token);
    if (!user) return { success: false, error: "Unauthorized" };
    return { success: true, data: user };
  });

  app.post("/api/auth/logout", async (req: FastifyRequest<{ Headers: { authorization?: string } }>) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (token) {
      await query(`DELETE FROM sessions WHERE token = $1`, [token]);
    }
    return { success: true };
  });
}
