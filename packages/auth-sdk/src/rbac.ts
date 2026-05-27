import { pgQuery } from "@iai/database";

export type Role = "owner" | "admin" | "member" | "viewer";

export const ROLE_HIERARCHY: Record<Role, number> = {
  owner: 4,
  admin: 3,
  member: 2,
  viewer: 1,
};

export const PERMISSIONS: Record<string, Role[]> = {
  "computer:create": ["owner", "admin", "member"],
  "computer:delete": ["owner", "admin"],
  "computer:manage": ["owner", "admin"],
  "user:invite": ["owner", "admin"],
  "user:remove": ["owner", "admin"],
  "billing:manage": ["owner", "admin"],
  "policy:write": ["owner", "admin"],
  "policy:read": ["owner", "admin", "member", "viewer"],
  "audit:read": ["owner", "admin"],
  "run:execute": ["owner", "admin", "member"],
  "run:read": ["owner", "admin", "member", "viewer"],
  "browser:automation": ["owner", "admin", "member"],
};

export interface Membership {
  org_id: string;
  user_id: string;
  role: Role;
}

export async function getMembership(orgId: string, userId: string): Promise<Membership | null> {
  const result = await pgQuery(
    'SELECT org_id, user_id, role FROM organization_members WHERE org_id = $1 AND user_id = $2',
    [orgId, userId]
  );
  return result.rows[0] || null;
}

export function hasPermission(role: Role, permission: string): boolean {
  const allowed = PERMISSIONS[permission];
  if (!allowed) return false;
  return allowed.includes(role);
}

export function hasRoleLevel(role: Role, minRole: Role): boolean {
  return ROLE_HIERARCHY[role] >= ROLE_HIERARCHY[minRole];
}

export async function assertPermission(orgId: string, userId: string, permission: string): Promise<{ allowed: boolean; role?: Role; error?: string }> {
  const membership = await getMembership(orgId, userId);
  if (!membership) {
    return { allowed: false, error: "User is not a member of this organization" };
  }
  if (!hasPermission(membership.role, permission)) {
    return { allowed: false, role: membership.role, error: `Permission denied: ${permission} requires ${PERMISSIONS[permission]?.join(" or ")}` };
  }
  return { allowed: true, role: membership.role };
}
