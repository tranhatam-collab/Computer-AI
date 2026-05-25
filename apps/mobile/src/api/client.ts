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
  action: string;
  resource: string;
  state: string;
  createdAt: number;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
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
};
