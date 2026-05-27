# AI BROWSER VERIFY-FIRST ACCESS MODEL

## Principle

AI Browser access requires user verification first. Unverified users cannot connect social accounts, store sessions or run publish-capable automation.

## Verification levels

| Level | Use | Requirements | Browser access |
|---|---|---|---|
| V0 | Public trial | Email | Public browsing only |
| V1 | Personal connected accounts | Email, phone, trusted device | Connect and draft |
| V2 | Publish workflows | Passkey, device binding | Publish after approval |
| V3 | Business/agency | Business verification, owner approval | Team workflows |
| V4 | Enterprise | SSO, SCIM, admin policy | Dedicated runtime and audit |

## Access decision contract

```ts
export type BrowserAccessDecision = {
  userId: string;
  computerId: string;
  verificationLevel: "V0" | "V1" | "V2" | "V3" | "V4";
  requestedAction: string;
  allowed: boolean;
  requiredUpgrade?: string;
  reason?: string;
};
```

## Rules

```text
V0 cannot connect social accounts.
V1 can connect accounts and draft.
V2 can publish only after approval.
V3 can manage business/agency accounts with owner approval.
V4 can use enterprise policies, SSO and dedicated audit.
```
