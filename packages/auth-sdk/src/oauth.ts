import { createHash, randomBytes } from "node:crypto";

export interface OAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
  authEndpoint: string;
  tokenEndpoint: string;
}

export interface OAuthState {
  provider: string;
  userId: string;
  computerId: string;
  tenantId: string;
  nonce: string;
  createdAt: number;
}

const stateStore = new Map<string, OAuthState>();
const STATE_TTL_MS = 10 * 60 * 1000; // 10 minutes

export function getOAuthConfig(provider: "google" | "microsoft"): OAuthConfig | null {
  if (provider === "google") {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    if (!clientId || !clientSecret) return null;
    return {
      clientId,
      clientSecret,
      redirectUri: process.env.GOOGLE_REDIRECT_URI || "http://localhost:3000/api/oauth/callback/google",
      scopes: ["https://www.googleapis.com/auth/calendar.readonly", "https://www.googleapis.com/auth/calendar.events"],
      authEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
      tokenEndpoint: "https://oauth2.googleapis.com/token",
    };
  }
  if (provider === "microsoft") {
    const clientId = process.env.MS_CLIENT_ID;
    const clientSecret = process.env.MS_CLIENT_SECRET;
    if (!clientId || !clientSecret) return null;
    return {
      clientId,
      clientSecret,
      redirectUri: process.env.MS_REDIRECT_URI || "http://localhost:3000/api/oauth/callback/microsoft",
      scopes: ["Calendars.Read", "Calendars.ReadWrite"],
      authEndpoint: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
      tokenEndpoint: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    };
  }
  return null;
}

export function generateOAuthUrl(provider: "google" | "microsoft", tenantId: string, userId: string, computerId: string): { url: string; state: string } | null {
  const config = getOAuthConfig(provider);
  if (!config) return null;

  const nonce = randomBytes(16).toString("hex");
  const stateValue = createHash("sha256").update(`${provider}:${tenantId}:${userId}:${computerId}:${nonce}:${Date.now()}`).digest("hex");

  stateStore.set(stateValue, {
    provider,
    userId,
    computerId,
    tenantId,
    nonce,
    createdAt: Date.now(),
  });

  // Clean expired states
  const now = Date.now();
  for (const [key, val] of stateStore) {
    if (now - val.createdAt > STATE_TTL_MS) stateStore.delete(key);
  }

  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: "code",
    scope: config.scopes.join(" "),
    state: stateValue,
    access_type: "offline",
    prompt: "consent",
  });

  return { url: `${config.authEndpoint}?${params.toString()}`, state: stateValue };
}

export function verifyOAuthState(state: string): OAuthState | null {
  const data = stateStore.get(state);
  if (!data) return null;
  if (Date.now() - data.createdAt > STATE_TTL_MS) {
    stateStore.delete(state);
    return null;
  }
  return data;
}

export async function exchangeOAuthCode(provider: "google" | "microsoft", code: string, state: string): Promise<{ accessToken: string; refreshToken?: string; expiresIn?: number } | null> {
  const stateData = verifyOAuthState(state);
  if (!stateData) return null;

  const config = getOAuthConfig(provider);
  if (!config) return null;

  const params = new URLSearchParams({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code,
    redirect_uri: config.redirectUri,
    grant_type: "authorization_code",
  });

  const res = await fetch(config.tokenEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  if (!res.ok) return null;

  const data = await res.json() as any;
  stateStore.delete(state);

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
  };
}

export function getOAuthStatus(provider: "google" | "microsoft"): { configured: boolean; missing: string[] } {
  const missing: string[] = [];
  if (provider === "google") {
    if (!process.env.GOOGLE_CLIENT_ID) missing.push("GOOGLE_CLIENT_ID");
    if (!process.env.GOOGLE_CLIENT_SECRET) missing.push("GOOGLE_CLIENT_SECRET");
    return { configured: missing.length === 0, missing };
  }
  if (provider === "microsoft") {
    if (!process.env.MS_CLIENT_ID) missing.push("MS_CLIENT_ID");
    if (!process.env.MS_CLIENT_SECRET) missing.push("MS_CLIENT_SECRET");
    return { configured: missing.length === 0, missing };
  }
  return { configured: false, missing: ["unknown provider"] };
}
