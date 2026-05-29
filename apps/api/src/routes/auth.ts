import type { FastifyInstance, FastifyRequest } from "fastify";
import crypto from "crypto";
import { getUserById, getUserByEmail, createUser, createSession, deleteSession } from "@iai/database";
import { getEmailProvider } from "@iai/providers";
import {
  getOAuthStatus,
  generateOAuthUrl,
  verifyOAuthState,
  exchangeOAuthCode,
} from "@iai/auth-sdk";

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

let _jwtSecret: string | undefined;
function getLazyJwtSecret(): string {
  if (!_jwtSecret) {
    _jwtSecret = getJwtSecret();
  }
  return _jwtSecret;
}

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
    crypto.createHmac("sha256", getLazyJwtSecret()).update(`${header}.${body}`).digest()
  );
  return `${header}.${body}.${signature}`;
}

function verifyJWT(token: string): JWTPayload | null {
  try {
    const [header, body, signature] = token.split(".");
    if (!header || !body || !signature) return null;
    const expected = base64UrlEncode(
      crypto.createHmac("sha256", getLazyJwtSecret()).update(`${header}.${body}`).digest()
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

const otpStore = new Map<string, { code: string; expiresAt: number }>();

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export default async function authRoutes(app: FastifyInstance) {
  app.post("/auth/register", { config: { noAuth: true } }, async (req: FastifyRequest<{ Body: { email: string; name: string; locale?: 'vi' | 'en' } }>) => {
    const { email, name, locale = "vi" } = req.body;

    const existing = await getUserByEmail(email.trim());
    if (existing) {
      return { success: false, error: "Email already registered" };
    }

    const user = await createUser(email.trim(), name.trim(), locale);
    return { success: true, data: { id: user.id, email: user.email, name: user.name } };
  });

  app.post("/auth/login", { config: { noAuth: true } }, async (req: FastifyRequest<{ Body: { email: string } }>) => {
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

  app.post("/auth/magic-link", { config: { noAuth: true } }, async (req: FastifyRequest<{ Body: { email: string; locale?: 'vi' | 'en' } }>) => {
    const { email, locale = "vi" } = req.body;
    const user = await getUserByEmail(email.trim());
    if (!user) {
      return { success: false, error: "User not found" };
    }

    const code = generateOTP();
    otpStore.set(email.trim(), { code, expiresAt: Date.now() + 5 * 60 * 1000 });

    const provider = getEmailProvider();
    await provider.send({
      to: email.trim(),
      subject: locale === "vi" ? "Mã đăng nhập IAI" : "IAI Login Code",
      body: `Your login code: ${code}`,
      html: `<p>${locale === "vi" ? "Mã đăng nhập của bạn" : "Your login code"}: <strong>${code}</strong></p>`,
    });

    return { success: true, message: locale === "vi" ? "Đã gửi mã OTP" : "OTP sent" };
  });

  app.post("/auth/verify-otp", { config: { noAuth: true } }, async (req: FastifyRequest<{ Body: { email: string; code: string } }>) => {
    const { email, code } = req.body;
    const stored = otpStore.get(email.trim());
    if (!stored || stored.code !== code || Date.now() > stored.expiresAt) {
      return { success: false, error: "Invalid or expired code" };
    }
    otpStore.delete(email.trim());

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

  // ── OAuth routes ──

  app.get("/auth/oauth/status/:provider", { config: { noAuth: true } }, async (req: FastifyRequest<{ Params: { provider: string } }>) => {
    const provider = req.params.provider as "google" | "microsoft";
    const status = getOAuthStatus(provider);
    return { success: true, data: status };
  });

  app.get("/auth/oauth/:provider", { config: { noAuth: true } }, async (req: FastifyRequest<{ Params: { provider: string }; Querystring: { tenantId?: string; userId?: string; computerId?: string } }>) => {
    const provider = req.params.provider as "google" | "microsoft";
    const { tenantId = "iai", userId = "", computerId = "default" } = req.query;
    const result = generateOAuthUrl(provider, tenantId, userId, computerId);
    if (!result) {
      return { success: false, error: `OAuth not configured for ${provider}` };
    }
    return { success: true, data: { url: result.url, state: result.state } };
  });

  app.get("/auth/oauth/callback/:provider", { config: { noAuth: true } }, async (req: FastifyRequest<{ Params: { provider: string }; Querystring: { code?: string; state?: string; error?: string } }>) => {
    const provider = req.params.provider as "google" | "microsoft";
    const { code, state, error } = req.query;

    if (error) {
      return { success: false, error };
    }
    if (!code || !state) {
      return { success: false, error: "Missing code or state" };
    }

    const stateData = verifyOAuthState(state);
    if (!stateData) {
      return { success: false, error: "Invalid or expired state" };
    }

    const tokens = await exchangeOAuthCode(provider, code, state);
    if (!tokens) {
      return { success: false, error: "Failed to exchange code for token" };
    }

    return {
      success: true,
      data: {
        provider,
        userId: stateData.userId,
        accessToken: tokens.accessToken,
        expiresIn: tokens.expiresIn,
      },
    };
  });
}
