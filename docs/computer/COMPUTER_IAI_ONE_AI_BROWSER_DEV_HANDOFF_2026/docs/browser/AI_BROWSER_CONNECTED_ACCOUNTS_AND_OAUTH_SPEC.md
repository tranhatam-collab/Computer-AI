# AI BROWSER CONNECTED ACCOUNTS AND OAUTH SPEC

## Goal

Manage all user-authorized connected accounts with clear scopes, status, revoke ability and audit.

## Connection methods

| Method | Priority | Use |
|---|---:|---|
| OAuth/OIDC official | 1 | Google, YouTube, Meta Business, LinkedIn, GitHub, Notion, Slack, Microsoft, Shopify |
| Secure browser session | 2 | Platform has no suitable API |
| User-provided API token | 3 | Advanced users |
| Password fallback | 4 | Last resort only |

## OAuth requirements

```text
Authorization Code + PKCE
state and nonce
redirect allowlist
minimal scopes
encrypted token storage
token revoke
refresh-token rotation where supported
audit token usage
```

## ConnectedAccount contract

```ts
export type ConnectedAccount = {
  id: string;
  tenantId: string;
  userId: string;
  computerId: string;
  provider: string;
  accountLabel: string;
  accountUrl?: string;
  connectionType: "oauth" | "browser_session" | "api_token" | "password_fallback";
  status: "connected" | "expired" | "requires_reauth" | "revoked" | "suspended";
  scopes: string[];
  permissionPolicyId: string;
  sessionId?: string;
  vaultItemIds: string[];
  lastCheckedAt?: string;
  createdAt: string;
  updatedAt: string;
};
```
