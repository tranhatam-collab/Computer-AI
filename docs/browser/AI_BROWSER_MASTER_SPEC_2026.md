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
