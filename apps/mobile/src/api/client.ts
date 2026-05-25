declare const process:
  | { env?: { EXPO_PUBLIC_API_URL?: string } }
  | undefined;

const BASE_URL = process?.env?.EXPO_PUBLIC_API_URL || "http://localhost:3001";

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

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (authToken) headers["Authorization"] = `Bearer ${authToken}`;
  const res = await fetch(`${BASE_URL}${path}`, {
    headers,
    ...options,
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "API error");
  return json.data as T;
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
    return result;
  },
  logout: () => {
    authToken = null;
    return request<void>("/api/auth/logout", { method: "POST" });
  },
  me: () => request<User>("/api/me"),
  setToken: (token: string | null) => { authToken = token; },
  getToken: () => authToken,
};
