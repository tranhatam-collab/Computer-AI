<!-- FILE: README.md -->

# COMPUTER.IAI.ONE REPO REALITY AND PRODUCTION CONVERSION PACKAGE 2026


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## 1. Why this package exists

The current public repository still presents **computer.iai.one** as a catalog of packaged AI computers. The verified public GitHub page shows the README phrase:

```text
computer.iai.one là catalog các AI computers dựng sẵn theo gói.
```

This confirms the gap between the current repo direction and the locked product vision:

```text
Computer.iai.one must become an AI Computer Instance OS.
Each user provisions one private AI Computer Instance.
Catalog becomes only the computer type/template selector.
```

## 2. Non-negotiable decision

```text
Do not continue building Computer.iai.one as a 12-product catalog.
Preserve current repo work.
Bridge the catalog into the AI Computer Instance architecture.
Resolve real production blockers before any production-ready claim.
```

## 3. Files included

This package contains 28 handoff files:

```text
README.md
MANIFEST.json
APPLY_TO_REPO.sh

docs/production-conversion/
  B1_ARCHITECTURE_BRIDGE_CATALOG_TO_AI_COMPUTER_INSTANCE.md
  B1A_AI_COMPUTER_INSTANCE_CANONICAL_MODEL.md
  B1B_CATALOG_REUSE_AND_MIGRATION_MAP.md
  B1C_TRUE_AI_COMPUTER_README_REWRITE.md
  B2_POSTGRESQL_MIGRATION_PLAN.md
  B3_AI_PROVIDER_WIRING_PLAN.md
  B4_AUTH_BACKEND_AND_PASSKEY_PLAN.md
  B5_PAYMENT_GATEWAY_AND_PAY_IAI_ONE_INTEGRATION.md
  B6_EMAIL_NOTIFICATION_DELIVERY_PLAN.md
  B7_DEPLOYMENT_AND_ENVIRONMENT_PLAN.md
  B8_OBSERVABILITY_AND_INCIDENT_RESPONSE_PLAN.md
  C1_VIETNAM_DATA_COMPLIANCE_AND_RESIDENCY_PLAN.md
  C2_PERSONAL_DATA_CLASSIFICATION_MATRIX.md
  C3_CROSS_BORDER_TRANSFER_AND_TIA_WORKFLOW.md
  C4_DATA_VAULT_MEMORY_EVIDENCE_RETENTION_POLICY.md
  C5_SECURITY_AND_PRIVACY_DPIA_READINESS.md
  C6_GDPR_ERASURE_EXPORT_AND_LEGAL_HOLD_MAP.md
  D1_REPO_GAP_ANALYSIS_REALITY_REPORT.md
  D2_100_PERCENT_PRODUCTION_READINESS_SCORECARD.md
  D3_PHASE_0_TO_PHASE_4_RECONCILIATION.md
  D4_NEXT_30_DAY_EXECUTION_BOARD.md
  D5_DEFINITION_OF_DONE_FOR_REAL_PRODUCTION.md
  D6_TEAM_COMMAND_TO_STOP_WRONG_BUILD_DIRECTION.md

docs/computer/
  COMPUTER_IAI_ONE_EXECUTION_BOARD_PATCH.md
  COMPUTER_IAI_ONE_PRODUCTION_READINESS_GATE_PATCH.md
  COMPUTER_IAI_ONE_README_REALIGNMENT_PATCH.md
```

## 4. Apply strategy

This package should be copied into the repository root. It should not overwrite source code.

The included `APPLY_TO_REPO.sh` only creates folders and copies documentation. It does not push, deploy, delete, move source files, or touch secrets.

## 5. Completion phrase

After applying docs only, the team may report:

```text
REPO REALITY CONVERSION PACKAGE APPLIED
ARCHITECTURE BRIDGE READY FOR REVIEW
NOT PRODUCTION-READY
```



<!-- FILE: docs/production-conversion/B1_ARCHITECTURE_BRIDGE_CATALOG_TO_AI_COMPUTER_INSTANCE.md -->

# B1 — ARCHITECTURE BRIDGE: CATALOG TO AI COMPUTER INSTANCE


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## 1. Decision

The current catalog implementation must not be discarded. It must be reinterpreted.

```text
Current meaning: product catalog
New meaning: AI Computer Instance template selector
```

## 2. Why this is critical

The repo currently presents Computer.iai.one as a catalog of packaged AI computers. The target architecture requires:

```text
1 user = 1 AI Computer Instance
```

The catalog is therefore not the final product. It is only the configuration surface used to provision an instance.

## 3. Architecture bridge

| Existing repo concept | New canonical meaning |
|---|---|
| Product catalog | Computer type selector |
| Product card | Instance template card |
| Pricing plan | Entitlement plan |
| Product detail page | Template capability page |
| Compare strip | Template capability comparison |
| Web app shell | AI Computer web console |
| Mobile app | Remote control |
| Static products | Computer templates |
| User buys product | User provisions AI Computer Instance |

## 4. New provisioning flow

```text
User signs up
↓
User verifies identity level
↓
User chooses computer type/template
↓
System creates AI Computer Instance
↓
System attaches entitlement
↓
System creates vault
↓
System creates memory namespace
↓
System enables initial Super Apps
↓
System assigns agent team
↓
System applies policy
↓
System opens web console/mobile remote
```

## 5. Required data model direction

```text
computer_templates are public/static.
computer_instances are private/user-owned.
entitlements determine access.
billing state controls runtime.
vault/memory/evidence belong to an instance.
```

## 6. Developer rule

```text
Do not build more product catalog features until the instance bridge is applied.
Every catalog feature must map to a ComputerInstance lifecycle.
```

## 7. Acceptance criteria

```text
[ ] README no longer says product catalog as final identity.
[ ] Product registry is renamed or documented as computer template registry.
[ ] Provisioning flow creates ComputerInstance.
[ ] Each user has one default ComputerInstance.
[ ] Entitlement is attached to ComputerInstance, not just user account.
[ ] Dashboard shows user's AI Computer, not only product list.
```



<!-- FILE: docs/production-conversion/B1A_AI_COMPUTER_INSTANCE_CANONICAL_MODEL.md -->

# B1A — AI COMPUTER INSTANCE CANONICAL MODEL


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## 1. Definition

An AI Computer Instance is the private operational computer owned by a user or organization inside Computer.iai.one.

It is not a product card. It is not just a subscription. It is the core runtime identity of the system.

## 2. Canonical object

```json
{
  "computerId": "comp_001",
  "ownerId": "user_001",
  "tenantId": "tenant_001",
  "computerType": "business",
  "region": "apac",
  "status": "active",
  "vaultId": "vault_001",
  "memoryId": "mem_001",
  "policyId": "policy_001",
  "entitlementId": "ent_001",
  "apps": ["ai_browser", "smart_calendar", "content_studio"],
  "agents": ["planner", "executor", "reviewer", "security", "evidence"],
  "connectedAccounts": [],
  "createdAt": "2026-05-27T00:00:00Z",
  "updatedAt": "2026-05-27T00:00:00Z"
}
```

## 3. Lifecycle states

```text
draft
provisioning
active
restricted
past_due
export_only
suspended
archived
deleted
```

## 4. Mandatory relationships

```text
ComputerInstance -> Owner
ComputerInstance -> Organization/Tenant
ComputerInstance -> Entitlement
ComputerInstance -> Region
ComputerInstance -> Vault
ComputerInstance -> Memory
ComputerInstance -> Policy
ComputerInstance -> Enabled Super Apps
ComputerInstance -> Agent Team
ComputerInstance -> Evidence Packs
ComputerInstance -> Audit Events
```

## 5. Required APIs

```http
POST /computers/provision
GET /computers/me
GET /computers/:computerId
PATCH /computers/:computerId
POST /computers/:computerId/restrict
POST /computers/:computerId/archive
POST /computers/:computerId/export
```

## 6. Definition of Done

```text
Computer.iai.one is not production-ready until every user workflow resolves through a ComputerInstance.
```



<!-- FILE: docs/production-conversion/B1B_CATALOG_REUSE_AND_MIGRATION_MAP.md -->

# B1B — CATALOG REUSE AND MIGRATION MAP


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## 1. Goal

Preserve current work. Do not throw away existing catalog code. Reuse it as the template and entitlement selection layer.

## 2. Mapping

| Existing asset | Keep? | New purpose |
|---|---:|---|
| Product registry | Yes | Computer template registry |
| Pricing config | Yes | Entitlement plan config |
| Product grid | Yes | Template selector |
| Product detail | Yes | Template capability overview |
| Compare component | Yes | Template comparison |
| Web app shell | Yes | AI Computer console shell |
| Mobile starter | Yes | Remote control starter |
| Contracts package | Yes | Expand to ComputerInstance, Entitlement, Vault, Run, Evidence |

## 3. Migration phases

### Phase 1 — Documentation bridge

```text
Update README.
Add B1 bridge docs.
Add canonical instance contract.
Add production scorecard.
```

### Phase 2 — Contract bridge

```text
Add ComputerInstance type.
Add ComputerTemplate type.
Add Entitlement type.
Add ProvisioningRequest type.
```

### Phase 3 — API bridge

```text
POST /computers/provision
GET /computers/me
GET /templates
GET /templates/:id
```

### Phase 4 — UI bridge

```text
Product page CTA becomes "Provision this AI Computer".
User dashboard shows "My AI Computer".
Mobile app shows active ComputerInstance.
```

### Phase 5 — Billing bridge

```text
Product price maps to entitlement.
Entitlement maps to instance.
Payment status controls instance state.
```

## 4. Stop condition

```text
The product catalog is not the product. It is the template selector for provisioning a private AI Computer Instance.
```



<!-- FILE: docs/production-conversion/B1C_TRUE_AI_COMPUTER_README_REWRITE.md -->

# B1C — TRUE AI COMPUTER README REWRITE


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## 1. Replace current opening

```md
# computer.iai.one

Computer.iai.one is an AI Computer Instance OS.

Mỗi người dùng sở hữu một AI Computer Instance riêng, có Data Vault, Memory, Smart Calendar, AI Browser, Super Apps, Agent Team, Permission Kernel, Security Kernel, Verification Engine, Evidence Center và Self-Upgrading Kernel.

The current catalog is not the final product. It is the template selector used to provision a user's AI Computer Instance.

## Current status

This repository is not production-ready.

Current implemented layer:
- Web shell and product/template catalog.
- Mobile starter for remote control direction.
- Shared contracts package.

Missing production blockers:
- PostgreSQL source of truth.
- Auth backend and passkeys.
- AI provider wiring.
- Payment gateway through pay.iai.one.
- Email delivery.
- Deployment environments.
- Observability and incident response.
- Compliance and data governance layer.
```

## 2. README acceptance criteria

```text
[ ] First sentence no longer calls the system a final product catalog.
[ ] README says catalog = template selector.
[ ] README says 1 user = 1 AI Computer Instance.
[ ] README lists production blockers.
[ ] README forbids production-ready claim.
```



<!-- FILE: docs/production-conversion/B2_POSTGRESQL_MIGRATION_PLAN.md -->

# B2 — POSTGRESQL MIGRATION PLAN


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## 1. Decision

PostgreSQL is the source of truth for Computer.iai.one production.

D1/KV may be used for edge cache, feature flags, non-authoritative locks or edge routing only. They must not hold user data as source of truth.

## 2. Required production database domains

```text
Identity
Organizations
Computer Instances
Computer Templates
Entitlements
Billing usage
Connected Accounts
Vault metadata
Memory records
Commands
Runs
Run steps
Approvals
Evidence packs
Audit events
Notifications
Compliance records
```

## 3. Minimum schema groups

```sql
users
organizations
organization_members
computer_templates
computer_instances
computer_instance_apps
computer_instance_agents
entitlements
billing_usage
connected_accounts
vault_objects
memory_records
commands
runs
run_steps
approval_requests
evidence_packs
audit_events
notification_events
compliance_records
data_transfer_assessments
```

## 4. Required environment variables

```env
DATABASE_URL=
DATABASE_READ_REPLICA_URL=
DATABASE_POOL_SIZE=
DATABASE_SSL_MODE=require
```

## 5. Acceptance criteria

```text
[ ] Local migration runs.
[ ] Staging migration runs.
[ ] Rollback tested.
[ ] Tenant isolation tests pass.
[ ] ComputerInstance queries require owner/tenant.
[ ] D1/KV not used for user data source of truth.
```



<!-- FILE: docs/production-conversion/B3_AI_PROVIDER_WIRING_PLAN.md -->

# B3 — AI PROVIDER WIRING PLAN


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## 1. Decision

Computer.iai.one must not call AI models directly from UI. All model calls go through an AI Provider Gateway.

## 2. Providers

Phase 1:

```text
OpenAI
Anthropic
```

Future:

```text
Google
AWS Bedrock
Local/open-weight models
BYOK enterprise providers
```

## 3. Required gateway features

```text
Provider routing
Fallback
Circuit breaker
Health check
Rate limiting
Cost governor
Prompt logging policy
PII redaction policy
No secret in prompt
Model capability registry
Per-tenant quota
Per-instance quota
```

## 4. Secrets

```text
OPENAI_API_KEY
ANTHROPIC_API_KEY
GOOGLE_API_KEY
AWS_BEDROCK_ROLE_ARN
AI_GATEWAY_SIGNING_SECRET
```

Secrets must be stored in environment/secret manager, never in repo.

## 5. Acceptance criteria

```text
[ ] AI calls do not originate from frontend.
[ ] Provider health check exists.
[ ] Provider fallback exists.
[ ] Costs are logged.
[ ] Run ID is attached to every model call.
[ ] Secrets never appear in logs or prompts.
```



<!-- FILE: docs/production-conversion/B4_AUTH_BACKEND_AND_PASSKEY_PLAN.md -->

# B4 — AUTH BACKEND AND PASSKEY PLAN


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## 1. Required auth capabilities

```text
Email login
Passkeys/WebAuthn
MFA fallback
Trusted devices
Session rotation
Organization membership
Role-based access control
Admin role separation
Sensitive action re-auth
Device revoke
Emergency lock
```

## 2. Roles

```text
owner
admin
security_admin
billing_admin
developer_admin
support_admin
member
viewer
auditor
```

## 3. Sensitive actions requiring passkey/MFA

```text
Publish through connected social account
Send email/message
Delete file/evidence
Export large data set
Connect or revoke provider
Use credential vault
Change billing
Change security settings
Grant admin
Deploy production
```

## 4. Auth tables

```text
users
auth_identities
sessions
trusted_devices
passkey_credentials
mfa_factors
organizations
organization_members
role_assignments
admin_actions
```

## 5. Acceptance criteria

```text
[ ] Auth is server-validated.
[ ] Passkey registration works.
[ ] Passkey authentication works.
[ ] Trusted device revoke works.
[ ] Admin roles are separated.
[ ] Sensitive action re-auth works.
[ ] Session rotation works.
```



<!-- FILE: docs/production-conversion/B5_PAYMENT_GATEWAY_AND_PAY_IAI_ONE_INTEGRATION.md -->

# B5 — PAYMENT GATEWAY AND PAY.IAI.ONE INTEGRATION


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## 1. Decision

Payment should route through:

```text
computer.iai.one → pay.iai.one → invoice.iai.one → entitlement
```

## 2. Required env

```env
PAY_IAI_ONE_SITE_KEY=
PAY_IAI_ONE_TENANT=computer-iai
PAY_IAI_ONE_SITE=iai
PAY_IAI_ONE_ENV=production
COMPUTER_API_PUBLIC_URL=
```

Do not hard-code these in repo.

## 3. Payment states

```text
trial
active
past_due
grace_period
restricted
export_only
archived
deleted
```

## 4. Webhook requirements

```text
Verify signature
Validate tenant/site
Idempotency by event ID
Map payment to entitlement
Update computer instance state
Write audit event
Send notification
Do not trust client-only success redirect
```

## 5. Acceptance criteria

```text
[ ] Checkout uses valid PAY_IAI_ONE_SITE_KEY.
[ ] Wrong tenant/site rejected.
[ ] Webhook signature verified.
[ ] Duplicate events ignored.
[ ] Entitlement updated.
[ ] Audit event written.
```



<!-- FILE: docs/production-conversion/B6_EMAIL_NOTIFICATION_DELIVERY_PLAN.md -->

# B6 — EMAIL NOTIFICATION DELIVERY PLAN


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## 1. Email classes

```text
Account verification
Login alert
Passkey added
Connected account changed
Approval required
Task completed
Daily briefing
Weekly report
Payment receipt
Past due warning
Incident alert
Data export ready
Deletion confirmation
```

## 2. Providers

```text
AWS SES
Resend
Postmark
SendGrid fallback
```

## 3. Required rules

```text
Do not send marketing email without opt-in.
Transactional email must not be unsubscribed globally.
Approval emails must deep-link to secure approval.
Sensitive details should be minimized in email.
```

## 4. Acceptance criteria

```text
[ ] Email provider configured.
[ ] Templates exist.
[ ] Delivery logs exist.
[ ] Bounce handling exists.
[ ] Unsubscribe/preferences exist.
[ ] Approval notification works.
```



<!-- FILE: docs/production-conversion/B7_DEPLOYMENT_AND_ENVIRONMENT_PLAN.md -->

# B7 — DEPLOYMENT AND ENVIRONMENT PLAN


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## 1. Environments

```text
local
preview
staging
production
```

## 2. Rules

```text
No production secret in local.
No production deploy without migration pass.
No production deploy without health check.
No production deploy without rollback plan.
No payment live mode in preview.
No provider live keys in test env.
```

## 3. Suggested hybrid deployment

```text
Cloudflare = edge routing, CDN, WAF, public web/API entry
Regional Core = API backend, jobs, browser runtime, AI provider gateway
PostgreSQL = source of truth
Redis = ephemeral cache/queues/locks
S3/R2 = files, evidence, exports, artifacts
```

## 4. Required checks

```text
pnpm install
pnpm typecheck
pnpm build
migration dry run
security lint
secret scan
env validation
health check
rollback test
```



<!-- FILE: docs/production-conversion/B8_OBSERVABILITY_AND_INCIDENT_RESPONSE_PLAN.md -->

# B8 — OBSERVABILITY AND INCIDENT RESPONSE PLAN


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## 1. Required trace fields

```text
trace_id
request_id
tenant_id
user_id
computer_id
command_id
run_id
run_step_id
agent_id
tool_call_id
model_call_id
provider_id
evidence_id
cost_id
incident_id
```

## 2. Dashboards

```text
API health
Command runs
AI provider health
Cost dashboard
Payment/webhook dashboard
Email delivery
Database health
Queue health
Browser runtime health
Security events
Compliance events
Incident center
```

## 3. Incident levels

```text
SEV0: security breach/data exposure
SEV1: payment/auth outage
SEV2: core command/runtime outage
SEV3: degraded provider/email
SEV4: minor UI/API issue
```

## 4. Acceptance criteria

```text
[ ] Trace ID everywhere.
[ ] Error logs structured.
[ ] Metrics visible.
[ ] Alerts configured.
[ ] Incident runbook exists.
[ ] Postmortem template exists.
```



<!-- FILE: docs/production-conversion/C1_VIETNAM_DATA_COMPLIANCE_AND_RESIDENCY_PLAN.md -->

# C1 — VIETNAM DATA COMPLIANCE AND RESIDENCY PLAN


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## 1. Legal wording correction

Do not reduce Vietnam compliance to Decree 13/2023 only.

Use this wording until Vietnam privacy counsel confirms exact statutory references:

```text
Vietnam personal data, cybersecurity, cross-border transfer, data residency and sector-specific compliance requirements must be reviewed before production. Final statutory references and obligations must be verified by Vietnam privacy counsel before launch.
```

## 2. Why this is a blocker

Computer.iai.one handles:

```text
Data Vault
Memory
Browser Session
Credential Vault
Connected Account Metadata
AI Work History
Evidence Pack
Audit Log
Calendar
Email
Files
Tokens
Billing records
```

## 3. Vietnam region principle

For Vietnamese users, default design should support:

```text
Vietnam-region storage when available
APAC-region storage with legal transfer controls when Vietnam region is not available
No cross-border transfer without classification and legal basis
TIA/DPIA workflow where required
Encryption and access control for sensitive data
```

## 4. Acceptance criteria

```text
[ ] Vietnam data classification exists.
[ ] Region binding exists.
[ ] Cross-border transfer workflow exists.
[ ] Counsel review marked pending or complete.
[ ] No production launch before legal gate is reviewed.
```



<!-- FILE: docs/production-conversion/C2_PERSONAL_DATA_CLASSIFICATION_MATRIX.md -->

# C2 — PERSONAL DATA CLASSIFICATION MATRIX


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## 1. Data classes

| Class | Examples | Policy |
|---|---|---|
| Public | landing, docs, marketing content | CDN/global cache allowed |
| Personal | profile, tasks, calendar, preferences | consent/export/delete |
| Sensitive | browser session metadata, evidence screenshot, memory | encryption, restricted access |
| Secret | API key, token, password fallback | vault only, no prompt/log |
| Audit | action logs, admin logs | append-only, retention |
| Billing | invoices, usage, payment state | tax/accounting retention |
| Evidence | screenshots, output, links, reports | retention/legal hold/purge |
| Memory | user/project memory | user control, delete/export |
| Browser session | cookies/storage state | encrypted, revoke, expire |
| Credential metadata | provider, scopes, key refs | restricted, audited |

## 2. Required metadata fields

```text
data_class
owner_id
tenant_id
computer_id
region
retention_policy_id
legal_hold
created_at
updated_at
deleted_at
```



<!-- FILE: docs/production-conversion/C3_CROSS_BORDER_TRANSFER_AND_TIA_WORKFLOW.md -->

# C3 — CROSS-BORDER TRANSFER AND TIA WORKFLOW


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## 1. Workflow

```text
1. Identify data category.
2. Identify source region.
3. Identify destination region.
4. Identify processor/subprocessor.
5. Check legal basis.
6. Check consent/contract basis if required.
7. Run Transfer Impact Assessment if required.
8. Record approval.
9. Log transfer.
10. Review periodically.
```

## 2. Blocking rules

```text
Secret data cannot be transferred to model providers.
Browser sessions cannot be transferred without explicit policy.
Evidence screenshots require classification before transfer.
Memory data requires user/tenant policy.
```



<!-- FILE: docs/production-conversion/C4_DATA_VAULT_MEMORY_EVIDENCE_RETENTION_POLICY.md -->

# C4 — DATA VAULT, MEMORY, EVIDENCE RETENTION POLICY


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## 1. Data retention categories

| Data | Default retention | User delete? | Notes |
|---|---:|---:|---|
| Vault files | user-controlled | yes | except legal hold |
| Memory records | user-controlled | yes | must support selective deletion |
| Browser sessions | short-lived | revoke | expire/rotate |
| Credential vault | until revoked | yes | no raw secret export |
| Evidence packs | configurable | partial | may have legal hold |
| Audit logs | longer retention | limited | pseudonymize if needed |
| Billing records | legal/accounting period | limited | tax/accounting rules |
| System metrics | short/medium | no personal detail | aggregate where possible |

## 2. Deletion workflow

```text
User requests deletion
↓
Classify data
↓
Check legal hold
↓
Delete or pseudonymize
↓
Propagate to storage/index/cache
↓
Write deletion audit event
↓
Generate confirmation
```



<!-- FILE: docs/production-conversion/C5_SECURITY_AND_PRIVACY_DPIA_READINESS.md -->

# C5 — SECURITY AND PRIVACY DPIA READINESS


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## 1. DPIA-triggering areas

```text
AI profiling
Memory
Browser automation
Credential/session vault
Sensitive data processing
Cross-border transfer
Automated actions
Evidence screenshots
Email/calendar/social connectors
```

## 2. Risk controls

```text
Data minimization
Purpose limitation
Encryption
Access control
Audit
Human approval
Pseudonymization where possible
Retention limits
User export/delete
Provider register
Incident response
```



<!-- FILE: docs/production-conversion/C6_GDPR_ERASURE_EXPORT_AND_LEGAL_HOLD_MAP.md -->

# C6 — GDPR ERASURE, EXPORT AND LEGAL HOLD MAP


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## 1. Scope

Computer.iai.one may serve EU users. GDPR erasure/export readiness must be built into Data Vault, Memory, Evidence, Audit and Browser Session design.

## 2. Erasure map

| Data | Erasure behavior |
|---|---|
| Profile | delete or anonymize |
| Files | delete unless legal hold |
| Memory | delete selected/all records |
| Browser session | revoke/delete encrypted state |
| Credential vault | revoke/delete vault item |
| Evidence | delete/pseudonymize unless legal hold |
| Audit | retain if legal/security basis, pseudonymize where possible |
| Billing | retain as legally required |

## 3. AI memory rule

Memory must be deletable from:

```text
PostgreSQL records
Vector index
Search index
Caches
Evidence summaries
Derived user profile
```



<!-- FILE: docs/production-conversion/D1_REPO_GAP_ANALYSIS_REALITY_REPORT.md -->

# D1 — REPO GAP ANALYSIS REALITY REPORT


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## 1. Verified repo reality

The public repo currently shows:

```text
Repository: tranhatam-collab/Computer-AI
Visibility: public
Default branch: main
History: 2 commits
Top-level folders/files: apps, packages/contracts, README.md, package.json, pnpm-lock.yaml, pnpm-workspace.yaml
README identity: catalog of packaged AI computers
```

## 2. Reality conclusion

The current repo is an early shell/catalog scaffold.

It is not yet:

```text
AI Computer Instance OS
Production backend
Real provider runtime
Real authentication system
Real payment system
Real notification system
Compliance-ready data platform
```

## 3. Critical gaps

```text
Architecture alignment gap
Database gap
Auth gap
AI provider gap
Payment gap
Email gap
Observability gap
Compliance gap
Deployment gap
```



<!-- FILE: docs/production-conversion/D2_100_PERCENT_PRODUCTION_READINESS_SCORECARD.md -->

# D2 — 100 PERCENT PRODUCTION READINESS SCORECARD


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## Scorecard

| Gate | Current status | Required to pass |
|---|---|---|
| Architecture alignment | FAIL | B1 bridge applied |
| AI Computer Instance model | MISSING | Canonical model + DB |
| PostgreSQL | MISSING | migrations + tenant isolation |
| Auth/passkeys | MISSING | backend auth + WebAuthn |
| AI providers | MISSING | provider gateway |
| Payment | MISSING | pay.iai.one integration |
| Email | MISSING | transactional provider |
| Observability | MISSING | trace/log/metrics/alerts |
| Compliance | MISSING | classification/residency/TIA |
| Deployment | PARTIAL/UNKNOWN | environments + rollback |
| Frontend shell | PARTIAL PASS | reuse as console/template selector |
| Mobile shell | PARTIAL PASS | reuse as remote control |

## Current production readiness

```text
0% production-ready for real user data and paid launch.
Partial implementation progress only.
```



<!-- FILE: docs/production-conversion/D3_PHASE_0_TO_PHASE_4_RECONCILIATION.md -->

# D3 — PHASE 0 TO PHASE 4 RECONCILIATION


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## 1. Rule

```text
Phase DONE = code/spec progress.
Production DONE = verified runtime with real providers, database, auth, payment, logs, compliance and rollback.
```

## 2. Reconciliation matrix

| Area | Phase DONE may mean | Production DONE requires |
|---|---|---|
| Web | pages render | auth, API, data, observability |
| Mobile | screens exist | real API, push, approvals |
| Products | catalog exists | templates provision instances |
| API | local scaffold | deployed backend, DB, auth |
| Runtime | simulated worker | real provider and sandbox |
| Payment | UI/plan exists | pay.iai.one webhook verified |
| Email | copy exists | provider delivery logs |
| Compliance | not mentioned | legal/data gates |



<!-- FILE: docs/production-conversion/D4_NEXT_30_DAY_EXECUTION_BOARD.md -->

# D4 — NEXT 30 DAY EXECUTION BOARD


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## Week 1 — Architecture bridge

```text
[ ] Apply B1 bridge docs.
[ ] Rewrite README.
[ ] Add ComputerInstance canonical contract.
[ ] Rename/document product registry as template registry.
[ ] Add production readiness scorecard.
```

## Week 2 — Database, auth, provider

```text
[ ] Create PostgreSQL migration plan.
[ ] Add database package plan.
[ ] Add auth/passkey plan.
[ ] Add AI Provider Gateway plan.
[ ] Define env/secrets matrix.
```

## Week 3 — Payment, email, observability

```text
[ ] Add pay.iai.one integration plan.
[ ] Add webhook idempotency design.
[ ] Add transactional email plan.
[ ] Add observability trace model.
[ ] Add incident runbook.
```

## Week 4 — Compliance and beta gate

```text
[ ] Add Vietnam compliance/residency plan.
[ ] Add data classification matrix.
[ ] Add TIA workflow.
[ ] Add retention/export/delete plan.
[ ] Produce beta readiness review.
```



<!-- FILE: docs/production-conversion/D5_DEFINITION_OF_DONE_FOR_REAL_PRODUCTION.md -->

# D5 — DEFINITION OF DONE FOR REAL PRODUCTION


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## 1. Production-ready cannot be claimed unless all gates pass

```text
Architecture bridge pass
PostgreSQL migration pass
Auth/passkey pass
AI provider pass
Payment webhook pass
Email delivery pass
Observability pass
Compliance pass
Backup/restore pass
Incident runbook pass
Security review pass
```

## 2. Forbidden claims without evidence

```text
production-ready
secure
fully automated
compliance-ready
enterprise-ready
```

## 3. Approved status phrase

```text
NOT PRODUCTION-READY UNTIL VERIFIED
```



<!-- FILE: docs/production-conversion/D6_TEAM_COMMAND_TO_STOP_WRONG_BUILD_DIRECTION.md -->

# D6 — TEAM COMMAND TO STOP WRONG BUILD DIRECTION


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## TEAM COMMAND

```text
Stop building Computer.iai.one as a product catalog.

Current repo work is not wasted. It becomes the selection and template layer for AI Computer Instances.

Continue only after B1 Architecture Bridge is applied.

Do not claim production-ready.

Do not create payment/live provider wiring before B1-B8 are reviewed.

Do not store user data in D1/KV as source of truth.

Do not implement cross-border user data transfer without compliance review.

Do not paste secrets into repo.
```

## Stop condition

```text
If dev cannot explain how product catalog becomes AI Computer Instance template, stop build.
```



<!-- FILE: docs/computer/COMPUTER_IAI_ONE_EXECUTION_BOARD_PATCH.md -->

# COMPUTER.IAI.ONE EXECUTION BOARD PATCH


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## Add mandatory phase

```text
Phase X — Repo Reality and Production Conversion
```

## Required tasks

```text
[X1] Apply B1 Architecture Bridge
[X2] Rewrite README
[X3] Add ComputerInstance canonical model
[X4] Add PostgreSQL migration plan
[X5] Add AI Provider Gateway plan
[X6] Add Auth/passkey plan
[X7] Add pay.iai.one integration plan
[X8] Add email delivery plan
[X9] Add deployment/env plan
[X10] Add observability/incident plan
[X11] Add Vietnam compliance/data governance plan
[X12] Add production readiness scorecard
```



<!-- FILE: docs/computer/COMPUTER_IAI_ONE_PRODUCTION_READINESS_GATE_PATCH.md -->

# COMPUTER.IAI.ONE PRODUCTION READINESS GATE PATCH


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## Add this gate to every future release

```text
No release can be called production-ready unless:
- database gate passes
- auth gate passes
- provider gate passes
- payment gate passes
- email gate passes
- observability gate passes
- compliance gate passes
- rollback gate passes
```

## Status terms

Allowed:

```text
spec-ready
dev-ready
staging-ready
beta-candidate
production-candidate
```

Forbidden without evidence:

```text
production-ready
fully secure
compliance-ready
enterprise-ready
```



<!-- FILE: docs/computer/COMPUTER_IAI_ONE_README_REALIGNMENT_PATCH.md -->

# COMPUTER.IAI.ONE README REALIGNMENT PATCH


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## README replacement opening

```md
# computer.iai.one

Computer.iai.one is an AI Computer Instance OS.

Mỗi người dùng sở hữu một AI Computer Instance riêng, có Data Vault, Memory, Smart Calendar, AI Browser, Super Apps, Agent Team, Permission Kernel, Security Kernel, Verification Engine, Evidence Center và Self-Upgrading Kernel.

The current catalog is a computer type/template selector, not the final product identity.

## Current status

This repository is not production-ready.

It currently contains early web/mobile/catalog/contract scaffolding. The next required step is the architecture bridge from product catalog to AI Computer Instance.
```

## Required README badges/text

```text
NOT PRODUCTION-READY
ARCHITECTURE BRIDGE REQUIRED
POSTGRESQL REQUIRED FOR USER DATA
NO SECRETS IN REPO
```
