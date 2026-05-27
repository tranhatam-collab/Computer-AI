# AI BROWSER CREDENTIAL AND SESSION VAULT SPEC

## Rules

```text
AI model never sees password, cookie, refresh token, API key or recovery code.
Admin never sees raw secret.
Logs never contain secrets.
Screenshots must redact sensitive fields where possible.
Vault access requires policy check.
Sensitive vault use requires passkey/re-auth.
```

## Encryption model

```text
Client-side encryption where possible
Server-side envelope encryption
Per-user encryption key
KMS/key vault
Key versioning
Key rotation
Device-bound unlock
Revocation
Recovery policy
```

## VaultItem

```ts
export type VaultItem = {
  id: string;
  tenantId: string;
  ownerId: string;
  computerId: string;
  provider: string;
  type: "oauth_access_token" | "oauth_refresh_token" | "api_token" | "encrypted_cookie_jar" | "encrypted_storage_state" | "password_fallback" | "recovery_code";
  encryptedPayloadRef: string;
  kmsKeyRef: string;
  keyVersion: string;
  scopes: string[];
  riskLevel: "low" | "medium" | "high" | "critical";
  status: "active" | "expired" | "revoked" | "rotation_required";
  createdAt: string;
  lastUsedAt?: string;
  expiresAt?: string;
};
```

## Correct autofill flow

```text
Model requests fill_login.
Policy Kernel checks permission.
Credential Bridge retrieves secret inside secure process.
Browser Runtime fills field directly.
Model only sees autofill_completed.
Audit records credential_autofill_used without secret.
```
