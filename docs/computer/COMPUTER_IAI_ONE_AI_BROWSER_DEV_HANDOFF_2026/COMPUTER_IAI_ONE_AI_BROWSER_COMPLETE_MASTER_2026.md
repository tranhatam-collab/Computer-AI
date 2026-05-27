<!-- FILE: 00_README_MASTER_INDEX.md -->

# COMPUTER.IAI.ONE AI BROWSER DEV HANDOFF 2026

This package converts the approved AI Browser plan into implementation-ready files for the Computer.iai.one dev team.

## Includes

```text
docs/browser/AI_BROWSER_MASTER_SPEC_2026.md
docs/browser/AI_BROWSER_VERIFY_FIRST_ACCESS_MODEL.md
docs/browser/AI_BROWSER_CONNECTED_ACCOUNTS_AND_OAUTH_SPEC.md
docs/browser/AI_BROWSER_CREDENTIAL_AND_SESSION_VAULT_SPEC.md
docs/browser/AI_BROWSER_PERMISSION_AND_APPROVAL_MATRIX.md
docs/browser/AI_BROWSER_USER_IN_LOOP_CAPTCHA_POLICY.md
docs/browser/AI_BROWSER_RUNTIME_SANDBOX_SPEC.md
docs/browser/AI_BROWSER_SOCIAL_SUPER_APPS_ROADMAP.md
docs/browser/AI_BROWSER_MOBILE_REMOTE_CONTROL_SPEC.md
docs/browser/AI_BROWSER_SECURITY_AND_AUDIT_CHECKLIST.md
api/AI_BROWSER_API_SPEC.md
database/AI_BROWSER_DATABASE_SCHEMA.sql
policies/AI_BROWSER_PLATFORM_COMPLIANCE_POLICY.md
execution/AI_BROWSER_PHASED_EXECUTION_BOARD_2026.md
contracts/browser/*.schema.ts
patches/*
```

## Non-negotiable

```text
NO CAPTCHA BYPASS
NO ANTI-BOT BYPASS
NO UNAUTHORIZED LOGIN
USER VERIFICATION REQUIRED BEFORE BROWSER ACCESS
AI MAY PREPARE, DRAFT AND PREVIEW
AI MUST NOT PUBLISH, SEND, DELETE, PAY OR CHANGE SECURITY WITHOUT APPROVAL
```

## Apply to repo

Copy folders to repository root and update workspace if needed.

## Completion phrase

```text
AI BROWSER SPEC READY FOR DEV
NOT PRODUCTION-READY
```



<!-- FILE: docs/browser/AI_BROWSER_MASTER_SPEC_2026.md -->

# COMPUTER.IAI.ONE AI BROWSER MASTER SPEC 2026

## 0. Status

```text
AI BROWSER PLAN APPROVED FOR SPEC
SECURE CONNECTED ACCOUNT MODEL DEFINED
NOT READY FOR PRODUCTION
NO CAPTCHA BYPASS
USER VERIFICATION REQUIRED BEFORE BROWSER ACCESS
```

## 1. Product definition

Computer.iai.one AI Browser is a required Super App inside each AI Computer Instance. It is not a bot, not an anti-bot bypass, and not a CAPTCHA solver.

Official module names:

```text
Computer.iai.one AI Browser
Secure Social Login and Action Browser
Computer Smart Browser
Verified Login and Session Vault
Human-Supervised Social Automation Layer
```

Standard definition:

```text
Computer Smart Browser is the personal AI browser of Computer.iai.one. It helps verified users open websites, log into their own authorized accounts, navigate, read, write, draft, fill forms, upload files, manage sessions, and execute approved workflows with encrypted vaults, session isolation, human approval, audit logs and evidence packs.
```

## 2. Non-negotiable rules

The system may:

```text
Allow the user to verify identity.
Allow the user to connect accounts they own or are authorized to use.
Use OAuth, OIDC, passkeys, WebAuthn and scoped API tokens first.
Store sessions/tokens only in encrypted vaults.
Prepare drafts, fill forms, upload user-selected files, create previews.
Pause for CAPTCHA, MFA, passkey prompts and suspicious-login checks.
Require approval before publish, send, delete, pay, legal submission or security change.
Write audit events and evidence packs.
```

The system must not:

```text
Bypass CAPTCHA.
Bypass not-a-robot.
Bypass bot detection.
Break MFA.
Use CAPTCHA solving services.
Rotate IPs to evade limits.
Create accounts in bulk.
Spam DM, follow, comment, like or post.
Use another person's cookie/session.
Log into unauthorized accounts.
Scrape data beyond user permission or platform terms.
Reveal passwords, cookies, refresh tokens or API keys to the model.
```

Product/legal sentence:

```text
AI Browser supports compliant user-authorized browser automation. It does not bypass CAPTCHA, anti-bot systems, access controls, or platform terms.
```

## 3. Infrastructure alignment

This plan must follow the approved hybrid architecture:

```text
Cloudflare = Edge, DNS, CDN, WAF, API edge routing.
AWS/Regional Core = control plane, browser runtime, queue, workers, sandbox.
PostgreSQL = source of truth.
Redis = session cache, ephemeral locks, runtime state.
S3/R2 = evidence, screenshots, encrypted browser state, objects.
Multi-provider AI = model gateway, fallback, routing, cost control.
D1/KV must not be used for primary user data.
```

## 4. System flow

```text
Mobile/Web Command
→ Command Kernel
→ Intent and Risk Classifier
→ Permission Kernel
→ Browser Planner Agent
→ Session Vault / Credential Vault
→ Secure Browser Runtime
→ Website / Social Platform
→ Action Draft
→ Security Agent Review
→ User Approval if required
→ Execute Action
→ Evidence Pack
→ Final Report
```

## 5. Security planes

| Plane | Function | Rule |
|---|---|---|
| Control Plane | Commands, policy, orchestration | No raw password storage |
| Vault Plane | Token, session, cookie, key | Encrypted, never sent to prompt |
| Browser Runtime Plane | Web UI operation | Sandbox, audit, policy enforcement |

## 6. Required repo modules

```text
apps/mobile-remote
apps/web-console
apps/browser-console
computer-os/browser-profile-manager
computer-os/credential-vault
computer-os/session-vault
computer-os/permission-kernel
computer-os/command-kernel
computer-os/action-risk-engine
computer-os/human-verification-handoff
computer-os/evidence-recorder
runtimes/browser-runtime
runtimes/browser-sandbox
agents/browser-agent
agents/browser-planner-agent
agents/page-understanding-agent
agents/social-agent
agents/content-agent
agents/security-agent
agents/reviewer-agent
agents/evidence-agent
agents/action-alignment-critic
super-apps/ai-browser
super-apps/ai-vault
super-apps/ai-connected-accounts
super-apps/ai-social-manager
super-apps/ai-content-studio
super-apps/ai-inbox-assistant
super-apps/ai-crm-lite
super-apps/ai-security-center
super-apps/ai-evidence-center
```

## 7. Browser modes

| Mode | Runtime | Use |
|---|---|---|
| local_personal | Local companion browser | Sensitive login, MFA, CAPTCHA, passkey |
| cloud_sandbox | Isolated server browser | Research, public pages, screenshots, non-sensitive workflow |
| enterprise_dedicated | Dedicated tenant runtime | Enterprise, compliance, data residency |

## 8. Verify-first model

| Level | Use | Requirement | Browser permission |
|---|---|---|---|
| V0 | Trial, no social login | Email verification | Public browsing, research |
| V1 | Personal social connection | Email, phone, trusted device | Login session, draft |
| V2 | Publish-enabled social automation | Passkey, device binding | Publish only after approval |
| V3 | Business/agency | Business verification, owner approval | Team account, scheduled publishing |
| V4 | Enterprise | SSO, SCIM, admin policy, audit | Dedicated runtime, compliance export |

## 9. Connection methods

Priority order:

```text
1. OAuth/OIDC official integration.
2. User-authenticated secure browser session.
3. User-provided scoped API token.
4. Password fallback only when unavoidable and strongly encrypted.
```

OAuth must use:

```text
Authorization Code + PKCE
state/nonce
redirect allowlist
minimum scopes
encrypted token storage
refresh-token rotation where supported
revoke support
audit every token use
```

## 10. CAPTCHA and not-a-robot handling

Correct flow:

```text
AI pauses.
Remote/local browser is shown to the user.
User manually completes CAPTCHA, MFA, passkey or new device verification.
Browser resumes only after verification state is confirmed.
Session is stored only if user consents.
Audit event is written.
```

Forbidden:

```text
captcha_solver
anti_robot_bypass
stealth_bot
IP rotation for bypass
synthetic human behavior to evade platform controls
```

Correct module name:

```text
Human Verification Hand-off
```

## 11. Action classes and approval

| Class | Examples | Rule |
|---|---|---|
| Read | Read page, inbox, analytics | Optional/light approval |
| Draft | Draft post, reply, email | Usually allowed |
| Prepare | Fill forms, upload files | Preview |
| Publish | Post, send email, DM, comment | User approval |
| Delete | Delete post, message, file | Always approval |
| Pay | Subscription, ads spend, purchase | Critical approval |
| Security | Change password, 2FA, admin | Forbidden or admin quorum |
| Legal | Sign, submit legal form | Approval required |

Core rule:

```text
AI may prepare, draft and preview. AI must not publish, send, delete, pay or change security without explicit approval.
```

## 12. Platform roadmap

Phase 1:

```text
Google Account, Gmail, Google Drive, YouTube, Facebook Page, Instagram Business, LinkedIn, X, GitHub, Notion, WordPress
```

Phase 2:

```text
TikTok, Threads, Pinterest, Shopify, WooCommerce, Canva, CapCut, Buffer, Hootsuite, Mailchimp
```

Phase 3:

```text
Microsoft 365, Teams, Slack, Salesforce, HubSpot, Zendesk, Intercom, Jira, Linear, Figma, Dropbox, Box
```

Phase 4:

```text
Stripe, PayPal, PayOS, QuickBooks, Xero, Wise, Airtable, Zapier, Make
```

Critical group to avoid early automation:

```text
Banking, Ads Manager, payment dashboards, crypto wallets, government portals, healthcare portals, tax portals
```

For critical group, default is read/prepare/guidance only. No submit, payment or transaction without explicit critical approval and legal review.

## 13. Mobile Remote screens

```text
My AI Computer
Connected Accounts
Secure Browser
Command
Tasks
Approvals
Results
Vault
Security
Activity Log
Memory
Settings
```

Approval screen must show:

```text
What AI wants to do.
Which account.
Exact content.
Attached files.
Risk level.
Preview screenshot.
Approve / Edit / Reject.
```

## 14. Production gates

Before beta:

```text
Passkey login
Device binding
Session encryption
Vault encryption
No secret in logs
No secret in prompt
Per-user browser profile
CAPTCHA user-in-loop
Approval gate
Audit log
Screenshot evidence
Rate limit
Abuse detection
Connected account revoke
Export/delete data
```

Before paid:

```text
KMS key rotation
Security review
SOC 2 readiness plan
Incident response
Admin role separation
Two-person approval for risky admin actions
Backup/restore test
Policy test suite
Provider terms review
```

## 15. 30/60/90/180-day build plan

30 days:

```text
Browser contracts
Session vault design
Approval center design
Browser runtime MVP
One first platform: LinkedIn or Facebook Page
Draft → Preview → Approval → Publish → Audit
```

60 days:

```text
Facebook Page, X, Gmail
Workflow recorder
Media upload
Evidence screenshot
Session health check
Local browser companion v0
```

90 days:

```text
Multi-platform publishing
Inbox read/draft
Human verification handoff
Action risk engine
Platform policy rules
Admin dashboard
```

180 days:

```text
Enterprise browser container
Team accounts
Role-based platform permission
Compliance export
Dedicated audit
Advanced prompt-injection defense
```



<!-- FILE: docs/browser/AI_BROWSER_VERIFY_FIRST_ACCESS_MODEL.md -->

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



<!-- FILE: docs/browser/AI_BROWSER_CONNECTED_ACCOUNTS_AND_OAUTH_SPEC.md -->

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



<!-- FILE: docs/browser/AI_BROWSER_CREDENTIAL_AND_SESSION_VAULT_SPEC.md -->

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



<!-- FILE: docs/browser/AI_BROWSER_PERMISSION_AND_APPROVAL_MATRIX.md -->

# AI BROWSER PERMISSION AND APPROVAL MATRIX

| Class | Examples | Approval |
|---|---|---|
| Read | Read page, inbox, analytics | Optional/light |
| Draft | Draft post, reply | Not required |
| Prepare | Fill form, upload | Preview |
| Publish | Post, email, DM | Required |
| Delete | Delete content | Always required |
| Pay | Ads, purchase | Critical approval |
| Security | Password, 2FA, admin | Forbidden/admin quorum |
| Legal | Contract, legal form | Required |

## Default LinkedIn policy

```json
{
  "platform": "linkedin",
  "allowedActions": {
    "read_feed": true,
    "draft_post": true,
    "upload_media": true,
    "publish_post": "approval_required",
    "send_message": "approval_required",
    "connect_people": false,
    "mass_message": false,
    "change_security_settings": "critical_approval"
  }
}
```

## Default Facebook policy

```json
{
  "platform": "facebook",
  "allowedActions": {
    "draft_profile_post": true,
    "publish_profile_post": "approval_required",
    "publish_page_post": "approval_required",
    "reply_comment": "approval_required",
    "send_dm": "approval_required",
    "join_group": false,
    "mass_comment": false,
    "ads_spend": "critical_approval"
  }
}
```



<!-- FILE: docs/browser/AI_BROWSER_USER_IN_LOOP_CAPTCHA_POLICY.md -->

# AI BROWSER USER-IN-LOOP CAPTCHA POLICY

## Purpose

Prevent Computer.iai.one from becoming a CAPTCHA bypass, anti-bot bypass or platform abuse tool.

## Correct behavior

```text
AI Browser pauses.
Remote/local browser view is shown to user.
User completes CAPTCHA, MFA, passkey or new-device verification manually.
AI Browser resumes only after verification state is confirmed.
Session is stored only if user consents.
Audit event is written.
```

## Prohibited behavior

```text
No CAPTCHA solving service.
No anti-bot bypass.
No fake human behavior generation.
No IP rotation to bypass limits.
No hidden automation to evade platform controls.
No synthetic identity creation.
No account farming.
```

## Correct module name

```text
Human Verification Hand-off
```



<!-- FILE: docs/browser/AI_BROWSER_RUNTIME_SANDBOX_SPEC.md -->

# AI BROWSER RUNTIME SANDBOX SPEC

## Runtime modes

| Mode | Runtime | Use |
|---|---|---|
| local_personal | Local companion browser | Sensitive login, MFA, CAPTCHA, passkey |
| cloud_sandbox | Isolated server browser | Public research, screenshot, non-sensitive workflow |
| enterprise_dedicated | Dedicated tenant browser | Enterprise, compliance, data residency |

## Components

```text
Browser Profile Manager
Session Container
Cookie Store
Credential Bridge
DOM Reader
Accessibility Tree Reader
Screenshot Engine
Action Executor
File Upload Handler
Clipboard Guard
Download Guard
Network Guard
Approval Gate
Audit Recorder
Policy Enforcement Point
```

## Isolation

```text
Per-user browser profile
Per-run browser context
Per-tenant runtime boundary
No shared cookie jar
No cross-tenant screenshots
No shared downloads
No direct secret access from browser agent
Network egress policy
Allowed domains per task
Blocked domains list
Timeout and resource limits
```

## BrowserAction schema

```ts
export type BrowserAction =
  | { type: "navigate"; url: string }
  | { type: "click"; selectorHint: string; description: string }
  | { type: "fill"; selectorHint: string; valueRef: string; sensitive?: boolean }
  | { type: "upload"; selectorHint: string; fileRef: string }
  | { type: "screenshot"; reason: string }
  | { type: "draft"; target: string; contentRef: string }
  | { type: "submit"; target: string; approvalId: string }
  | { type: "pause_for_user"; reason: string };
```



<!-- FILE: docs/browser/AI_BROWSER_SOCIAL_SUPER_APPS_ROADMAP.md -->

# AI BROWSER SOCIAL SUPER APPS ROADMAP

## Super Apps

```text
AI Browser
AI Vault
AI Connected Accounts
AI Social Manager
AI Content Studio
AI Inbox Assistant
AI Calendar Publisher
AI CRM Lite
AI Analytics Reporter
AI Security Center
AI Evidence Center
```

## Core workflows

### Multi-platform post

```text
Command → format per platform → open connected accounts → draft → upload media → preview → approval → publish/schedule → evidence pack
```

### Inbox triage

```text
Read inbox within permission → classify → draft reply → approval → send only after approval
```

### Profile update

```text
Generate copy → open profile editor → fill draft → preview → approval → save → evidence
```



<!-- FILE: docs/browser/AI_BROWSER_MOBILE_REMOTE_CONTROL_SPEC.md -->

# AI BROWSER MOBILE REMOTE CONTROL SPEC

## Required screens

```text
My AI Computer
Connected Accounts
Secure Browser
Command
Tasks
Approvals
Results
Vault
Security
Activity Log
Memory
Settings
```

## Approval screen must show

```text
What AI wants to do
Which account
Exact content
Attached files
Risk level
Preview screenshot
Approve / Edit / Reject
```

## Human verification screen

```text
Remote/local browser view
Pause reason: CAPTCHA/MFA/passkey/new login
Instruction: user must verify manually
Resume after completion
Cancel run
```

## Security actions

```text
Lock all browser sessions
Revoke connected account
Revoke device
Rotate vault key
Export audit
Delete browser profile
```



<!-- FILE: docs/browser/AI_BROWSER_SECURITY_AND_AUDIT_CHECKLIST.md -->

# AI BROWSER SECURITY AND AUDIT CHECKLIST

## Before beta

```text
[ ] Passkey for main login
[ ] Device binding
[ ] Session encryption
[ ] Vault encryption
[ ] No secret in logs
[ ] No secret in prompt
[ ] Per-user browser profile
[ ] CAPTCHA user-in-loop
[ ] Approval gate
[ ] Audit log
[ ] Screenshot evidence
[ ] Rate limit
[ ] Abuse detection
[ ] Connected account revoke
[ ] Export/delete data
```

## Before paid

```text
[ ] KMS key rotation
[ ] Security review
[ ] SOC 2 readiness plan
[ ] Incident response
[ ] Admin role separation
[ ] Two-person approval for risky admin actions
[ ] Backup/restore test
[ ] Policy test suite
[ ] Provider terms review
[ ] DPA/privacy review
```



<!-- FILE: api/AI_BROWSER_API_SPEC.md -->

# AI BROWSER API SPEC

## Browser Session Service

```http
POST /browser/sessions
GET /browser/sessions/:id
POST /browser/sessions/:id/reauth
DELETE /browser/sessions/:id
POST /browser/sessions/:id/lock
```

## Vault Service

```http
POST /vault/oauth/connect
POST /vault/token
GET /vault/items
GET /vault/items/:id
DELETE /vault/items/:id
POST /vault/items/:id/rotate
POST /vault/items/:id/revoke
```

## Connected Accounts Service

```http
GET /connected-accounts
POST /connected-accounts/:provider/connect
POST /connected-accounts/:id/reconnect
POST /connected-accounts/:id/test
DELETE /connected-accounts/:id
POST /connected-accounts/:id/emergency-lock
```

## Browser Runtime Service

```http
POST /browser/run
GET /browser/run/:runId
POST /browser/run/:runId/pause
POST /browser/run/:runId/resume
POST /browser/run/:runId/cancel
POST /browser/run/:runId/approve
```

## Approval Service

```http
POST /approvals
GET /approvals/pending
GET /approvals/:id
POST /approvals/:id/approve
POST /approvals/:id/reject
POST /approvals/:id/edit
```

## Evidence Service

```http
GET /evidence/:runId
GET /evidence/:runId/screenshots
GET /evidence/:runId/logs
GET /evidence/:runId/report
```

## Error codes

```text
BROWSER_VERIFY_REQUIRED
BROWSER_SESSION_EXPIRED
BROWSER_PROVIDER_RATE_LIMITED
BROWSER_POLICY_BLOCKED
BROWSER_APPROVAL_REQUIRED
BROWSER_HUMAN_VERIFICATION_REQUIRED
BROWSER_SECRET_ACCESS_DENIED
BROWSER_ORIGIN_BLOCKED
BROWSER_RUNTIME_FAILED
```



<!-- FILE: database/AI_BROWSER_DATABASE_SCHEMA.sql -->

-- AI Browser database schema for PostgreSQL
-- PostgreSQL is source of truth. D1/KV must not be primary user data store.

CREATE TABLE verified_users (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  verification_level TEXT NOT NULL CHECK (verification_level IN ('V0','V1','V2','V3','V4')),
  status TEXT NOT NULL CHECK (status IN ('active','suspended','revoked')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE trusted_devices (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  device_name TEXT NOT NULL,
  device_public_key TEXT,
  status TEXT NOT NULL CHECK (status IN ('trusted','revoked','suspicious')),
  first_seen_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE computer_instances (
  id TEXT PRIMARY KEY,
  owner_id TEXT NOT NULL,
  tenant_id TEXT NOT NULL,
  region TEXT NOT NULL,
  verification_level TEXT NOT NULL DEFAULT 'V0',
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE browser_profiles (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  computer_id TEXT NOT NULL REFERENCES computer_instances(id),
  mode TEXT NOT NULL CHECK (mode IN ('local_personal','cloud_sandbox','enterprise_dedicated')),
  status TEXT NOT NULL CHECK (status IN ('active','locked','revoked')),
  storage_region TEXT NOT NULL,
  encrypted_profile_ref TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_used_at TIMESTAMPTZ
);

CREATE TABLE connected_accounts (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  computer_id TEXT NOT NULL REFERENCES computer_instances(id),
  provider TEXT NOT NULL,
  account_label TEXT NOT NULL,
  account_url TEXT,
  connection_type TEXT NOT NULL CHECK (connection_type IN ('oauth','browser_session','api_token','password_fallback')),
  status TEXT NOT NULL CHECK (status IN ('connected','expired','requires_reauth','revoked','suspended')),
  scopes JSONB NOT NULL DEFAULT '[]'::jsonb,
  permission_policy_id TEXT NOT NULL,
  session_id TEXT,
  vault_item_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  last_checked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE vault_items (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  owner_id TEXT NOT NULL,
  computer_id TEXT NOT NULL REFERENCES computer_instances(id),
  provider TEXT NOT NULL,
  type TEXT NOT NULL,
  encrypted_payload_ref TEXT NOT NULL,
  kms_key_ref TEXT NOT NULL,
  key_version TEXT NOT NULL,
  scopes JSONB NOT NULL DEFAULT '[]'::jsonb,
  risk_level TEXT NOT NULL CHECK (risk_level IN ('low','medium','high','critical')),
  status TEXT NOT NULL CHECK (status IN ('active','expired','revoked','rotation_required')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_used_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ
);

CREATE TABLE session_states (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  computer_id TEXT NOT NULL REFERENCES computer_instances(id),
  browser_profile_id TEXT NOT NULL REFERENCES browser_profiles(id),
  platform TEXT NOT NULL,
  encrypted_cookie_jar_ref TEXT NOT NULL,
  encrypted_local_storage_ref TEXT,
  encrypted_device_binding_ref TEXT,
  storage_region TEXT NOT NULL,
  key_version TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('valid','expired','requires_user_verification','revoked')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_used_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ
);

CREATE TABLE browser_runs (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  computer_id TEXT NOT NULL REFERENCES computer_instances(id),
  command_id TEXT NOT NULL,
  browser_profile_id TEXT REFERENCES browser_profiles(id),
  provider TEXT,
  mode TEXT NOT NULL CHECK (mode IN ('local_personal','cloud_sandbox','enterprise_dedicated')),
  action_class TEXT NOT NULL,
  risk_level TEXT NOT NULL CHECK (risk_level IN ('low','medium','high','critical')),
  status TEXT NOT NULL CHECK (status IN ('queued','running','paused','waiting_for_approval','waiting_for_user_verification','completed','failed','cancelled')),
  approval_required BOOLEAN NOT NULL DEFAULT false,
  evidence_pack_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE browser_steps (
  id TEXT PRIMARY KEY,
  run_id TEXT NOT NULL REFERENCES browser_runs(id),
  step_index INTEGER NOT NULL,
  action_type TEXT NOT NULL,
  target_origin TEXT,
  action_summary TEXT NOT NULL,
  risk_level TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('planned','approved','executed','blocked','failed')),
  screenshot_ref TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE approval_requests (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  computer_id TEXT NOT NULL REFERENCES computer_instances(id),
  run_id TEXT NOT NULL REFERENCES browser_runs(id),
  action_class TEXT NOT NULL,
  risk_level TEXT NOT NULL,
  platform TEXT,
  account_label TEXT,
  action_summary TEXT NOT NULL,
  preview_ref TEXT,
  required_auth TEXT NOT NULL CHECK (required_auth IN ('none','click','passkey','mfa','admin_quorum')),
  status TEXT NOT NULL CHECK (status IN ('pending','approved','rejected','expired')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE evidence_packs (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  computer_id TEXT NOT NULL REFERENCES computer_instances(id),
  run_id TEXT NOT NULL REFERENCES browser_runs(id),
  user_command TEXT NOT NULL,
  platforms JSONB NOT NULL DEFAULT '[]'::jsonb,
  screenshots JSONB NOT NULL DEFAULT '[]'::jsonb,
  actions_taken JSONB NOT NULL DEFAULT '[]'::jsonb,
  approvals JSONB NOT NULL DEFAULT '[]'::jsonb,
  final_urls JSONB NOT NULL DEFAULT '[]'::jsonb,
  risk_flags JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL CHECK (status IN ('completed','partial','blocked','failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE audit_events (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  user_id TEXT,
  computer_id TEXT,
  run_id TEXT,
  event_type TEXT NOT NULL,
  event_summary TEXT NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_connected_accounts_user ON connected_accounts(user_id);
CREATE INDEX idx_browser_runs_computer ON browser_runs(computer_id);
CREATE INDEX idx_browser_runs_status ON browser_runs(status);
CREATE INDEX idx_audit_events_run ON audit_events(run_id);
CREATE INDEX idx_vault_items_owner ON vault_items(owner_id);



<!-- FILE: execution/AI_BROWSER_PHASED_EXECUTION_BOARD_2026.md -->

# AI BROWSER PHASED EXECUTION BOARD 2026

## Phase 0: Policy and Spec

| ID | Task | Owner | Status |
|---|---|---|---|
| B0.1 | Approve no-CAPTCHA-bypass policy | Product/Security | Planned |
| B0.2 | Approve connected account model | Product/Security | Planned |
| B0.3 | Approve permission matrix | Product/Security | Planned |
| B0.4 | Approve database schema | Backend | Planned |
| B0.5 | Approve API spec | Backend | Planned |

## Phase 1: Verify-first Access

| ID | Task | Owner | Status |
|---|---|---|---|
| B1.1 | Implement verification level checks | Backend | Planned |
| B1.2 | Implement trusted device table | Backend | Planned |
| B1.3 | Implement passkey requirement for high risk | Auth | Planned |
| B1.4 | Gate browser access by verification level | Backend | Planned |
| B1.5 | Add mobile verification prompts | Mobile | Planned |

## Phase 2: Connected Accounts

| ID | Task | Owner | Status |
|---|---|---|---|
| B2.1 | Connected accounts database | Backend | Planned |
| B2.2 | OAuth Google | Backend | Planned |
| B2.3 | OAuth GitHub | Backend | Planned |
| B2.4 | OAuth LinkedIn/Meta pending app approval | Backend | Planned |
| B2.5 | Account status dashboard | Web/Mobile | Planned |
| B2.6 | Revoke connection | Backend | Planned |

## Phase 3: Vault and Session

| ID | Task | Owner | Status |
|---|---|---|---|
| B3.1 | Vault item schema | Backend | Planned |
| B3.2 | Envelope encryption integration | Security | Planned |
| B3.3 | Session state encryption | Backend | Planned |
| B3.4 | Re-auth flow | Backend/Mobile | Planned |
| B3.5 | Emergency revoke all sessions | Security | Planned |

## Phase 4: Browser Runtime

| ID | Task | Owner | Status |
|---|---|---|---|
| B4.1 | Browser runtime service | Runtime | Planned |
| B4.2 | Playwright isolated context | Runtime | Planned |
| B4.3 | Screenshot capture | Runtime | Planned |
| B4.4 | Step logs | Runtime | Planned |
| B4.5 | Pause/resume | Runtime | Planned |
| B4.6 | User approval gate | Runtime/Backend | Planned |

## Phase 5: Social Actions

| ID | Task | Owner | Status |
|---|---|---|---|
| B5.1 | Draft post | Social App | Planned |
| B5.2 | Format per platform | Social App | Planned |
| B5.3 | Upload media | Runtime | Planned |
| B5.4 | Preview | Web/Mobile | Planned |
| B5.5 | Publish with approval | Runtime | Planned |
| B5.6 | Evidence pack | Backend | Planned |



<!-- FILE: policies/AI_BROWSER_PLATFORM_COMPLIANCE_POLICY.md -->

# AI BROWSER PLATFORM COMPLIANCE POLICY

## Core rule

Computer.iai.one AI Browser supports compliant user-authorized automation only. It does not bypass CAPTCHA, anti-bot systems, access controls, or platform terms.

## Prohibited

```text
CAPTCHA bypass
Anti-bot bypass
Fake user behavior to evade detection
IP rotation to avoid limits
Account farming
Mass DM
Mass follow
Mass comment
Spam posting
Credential phishing
Unauthorized scraping
Using another person's session
Changing security settings without explicit approval
```

## Required

```text
User owns or is authorized to use account
User verified before browser access
Official APIs preferred
Scopes minimized
Session encrypted
Approval before publish/send/delete/pay/security/legal
Audit log
Evidence pack
Revoke access
Respect provider limits
```
