export interface SessionIdentity { userId: string; workspaceId?: string; roles: string[]; }
export function hasRole(identity: SessionIdentity, role: string): boolean { return identity.roles.includes(role); }
