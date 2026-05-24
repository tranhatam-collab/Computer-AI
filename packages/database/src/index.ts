export interface User {
  id: string;
  email: string;
  name: string;
  locale: "vi" | "en";
}

export interface ProductSubscription {
  userId: string;
  productId: string;
  status: "active" | "cancelled" | "expired";
  startedAt: number;
  expiresAt: number;
}

export interface RunRecord {
  id: string;
  userId: string;
  productId: string;
  state: string;
  outputId?: string;
  createdAt: number;
  completedAt?: number;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  details: string;
  timestamp: number;
}

// In-memory store (replace with SQLite/Postgres in production)
export const db = {
  users: new Map<string, User>(),
  subscriptions: new Map<string, ProductSubscription[]>(),
  runs: new Map<string, RunRecord[]>(),
  auditLogs: new Map<string, AuditLog[]>(),
};

export function seedDatabase(): void {
  // Minimal seed data for development
}
