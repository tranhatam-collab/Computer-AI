import { getCached, setCache } from "../services/cache";
import * as SecureStore from "expo-secure-store";

declare const process:
  | { env?: { EXPO_PUBLIC_API_URL?: string } }
  | undefined;

const BASE_URL = process?.env?.EXPO_PUBLIC_API_URL || "http://localhost:3001";

const TOKEN_KEY = "authToken";

async function getStoredToken(): Promise<string | null> {
  try {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    if (token) return token;
  } catch {
    // SecureStore may not be available
  }
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

async function setStoredToken(token: string | null) {
  try {
    if (token) {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    } else {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    }
  } catch {
    // SecureStore may not be available
  }
  try {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  } catch {
    // localStorage may not be available
  }
}

export interface Product {
  id: string;
  name: string;
  tagline: { vi: string; en: string };
  tier: string;
  highlights: string[];
}

export interface Run {
  id: string;
  state: string;
  productId: string;
  text: string;
  createdAt: number;
}

export interface Approval {
  id: string;
  userId: string;
  assigneeId: string;
  action: string;
  resource: string;
  details: string;
  state: "pending" | "approved" | "rejected" | "escalated";
  createdAt: number;
  resolvedAt?: number;
  reason?: string;
}

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

let authToken: string | null = null;

getStoredToken().then((token) => {
  authToken = token;
}).catch(() => {
  // ignore
});

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const cacheKey = `${path}::${JSON.stringify(options?.body || "")}`;
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (authToken) headers["Authorization"] = `Bearer ${authToken}`;
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers,
      ...options,
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || "API error");
    await setCache(cacheKey, json.data);
    return json.data as T;
  } catch (err) {
    const cached = await getCached<T>(cacheKey);
    if (cached) return cached;
    throw err;
  }
}

export const api = {
  getProducts: () => request<Product[]>("/api/products"),
  getProduct: (id: string) => request<Product>(`/api/products/${id}`),
  command: (text: string, productId: string) =>
    request<Run>("/api/command", {
      method: "POST",
      body: JSON.stringify({ text, productId }),
    }),
  getRuns: () => request<Run[]>("/api/runs"),
  getRun: (id: string) => request<Run>(`/api/runs/${id}`),
  getApprovals: () => request<Approval[]>("/api/approvals"),
  approve: (id: string) =>
    request<Approval>(`/api/approvals/${id}/approve`, { method: "POST" }),
  reject: (id: string, reason?: string) =>
    request<Approval>(`/api/approvals/${id}/reject`, {
      method: "POST",
      body: JSON.stringify({ reason }),
    }),
  register: (email: string, name: string, locale?: "vi" | "en") =>
    request<User>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, name, locale }),
    }),
  login: async (email: string) => {
    const result = await request<{ user: User; session: Session }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    authToken = result.session.token;
    await setStoredToken(authToken);
    return result;
  },
  logout: async () => {
    authToken = null;
    await setStoredToken(null);
    return request<void>("/api/auth/logout", { method: "POST" });
  },
  me: () => request<User>("/api/me"),
  registerPushToken: (token: string) =>
    request<void>("/api/push-token", {
      method: "POST",
      body: JSON.stringify({ token }),
    }),
  setToken: async (token: string | null) => {
    authToken = token;
    await setStoredToken(token);
  },
  getToken: () => authToken,
};
