# COMPUTER.IAI.ONE — TOTAL PROJECT AUDIT & 100% DEV PLAN

**Date:** 2026-05-27  
**Scope:** Full repository, master plans, implementation docs, API/web/mobile/packages, database migrations.  
**Status:** SINGLE SOURCE OF TRUTH FOR NEXT DEV WAVE.  
**Production status:** NOT PRODUCTION-READY.  
**Rule:** Do not continue feature development until this audit is acknowledged by the dev team.

---

## 1. Executive verdict

Computer.iai.one has a strong vision and a working scaffold, but the planning documents are not fully synchronized with the current codebase.

The correct target is:

```text
Computer.iai.one = AI Computer Operating System.
Each user owns one private AI Computer Instance.
Catalog = template selector only.
Web = console.
Mobile = remote control.
API = control plane.
Runtime/sandbox/agents = execution plane.
Evidence/audit/verification = truth layer.
```

Current implementation is not a production AI Computer OS yet. It is a partially functional monorepo with:

- Product/template catalog.
- Fastify API scaffold.
- PostgreSQL + SQLite mixed persistence.
- Browser and calendar API scaffolds.
- Simulated or partially wired AI/provider/runtime layers.
- Starter web and mobile surfaces.
- Incomplete production gates.

**Honest current readiness:** approximately **38/100**.

This score is higher than older audits because PostgreSQL run-store/provider wiring has advanced, but still far below production-ready because core OS, security, runtime, evidence, auth, payments, and observability remain incomplete.

---

## 2. Source-of-truth hierarchy

Team dev must follow this hierarchy from now on.

| Priority | File / Area | Role | Status |
|---:|---|---|---|
| 1 | `README.md` | Public positioning and locked architecture decisions | Keep, update only if governance changes |
| 2 | `Docs/COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026/COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_2026.md` | Final product constitution | Keep as vision/architecture master |
| 3 | `Docs/COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026/COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_MASTER_2026.md` | Bridge from catalog to AI Computer Instance | Keep as architecture bridge |
| 4 | `Docs/infrastructure/*` | Infrastructure, security, residency, production gates | Keep as policy/spec layer |
| 5 | This file | Current reality audit + executable dev sequence | Use as active dev control board |
| 6 | Older root audit/phase files | Historical evidence only | Do not use as current status unless updated |

---

## 3. Planning document audit

### 3.1 Documents that are logically correct

| File | Verdict | Notes |
|---|---|---|
| `README.md` | Mostly correct | Correctly says AI Computer OS, not production-ready, hybrid edge/core architecture. |
| `START_HERE.md` | Directionally correct but stale | Good warning, but production blockers need refresh after recent PostgreSQL/provider work. |
| `Docs/implementation/AI_COMPUTER_OS_UNIFIED_AUDIT_2026_05_27.md` | Best prior audit | Honest and useful, but slightly outdated after API run-store/PostgreSQL fallback fixes. |
| `Docs/COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026/*` | Correct vision | Use for final system design, not current code status. |
| `Docs/infrastructure/COMPUTER_IAI_ONE_INSTANCE_LIFECYCLE_SPEC_2026.md` | Correct target | Needs implementation in DB and API lifecycle guards. |
| `Docs/infrastructure/COMPUTER_IAI_ONE_PRODUCTION_READINESS_GATE_2026.md` | Correct gate concept | Needs status update from 0/7 to partial progress. |

### 3.2 Documents that are outdated or overstate completion

| File | Issue | Required action |
|---|---|---|
| `COMPUTER_AI_EXISTING_FILES_AND_GAPS_2026.md` | Says only 5 products and missing product registry; code now has product registry and more packages. | Mark historical only or rewrite. |
| `COMPUTER_AI_PHASED_REBUILD_EXECUTION_BOARD_2026.md` | Marks many phases DONE while real runtime/auth/payment/enterprise are not production-grade. | Keep as scaffold completion board, not production board. |
| `COMPUTER_IAI_ONE_COMPLETION_REPORT_2026-05-25.md` | Says database in-memory/default persistence; code now has SQLite + PostgreSQL paths. | Supersede with this audit. |
| `Docs/implementation/AUTO_DEVELOPMENT_PLAN_2026_05_27.md` | Too narrow: starts AI Browser/Calendar before DB/auth/instance foundation is fully unified. | Freeze and replace with new Wave 0–8 sequence below. |
| Root ecosystem plans | Good macro vision but not executable for this repo. | Use for context only. |

### 3.3 Key planning contradiction

The project has two competing “completion” meanings:

```text
Old meaning: catalog + scaffold phases complete.
Correct meaning: AI Computer OS production gates complete.
```

Dev team must stop reporting “phase complete” unless the acceptance criteria include:

- Code implemented.
- Database/migration verified.
- API tested.
- Auth/tenant/instance scope enforced.
- Evidence/audit generated.
- Build/typecheck pass.
- Security and rollback status documented.

---

## 4. Current code reality audit

### 4.1 Apps

| App | Current state | Gap |
|---|---|---|
| `apps/web` | Product/template pages, pricing, login page, thank-you page exist. | Not yet true AI Computer Console with live instance dashboard. |
| `apps/api` | Fastify API with product, command, run, auth, computer, browser, calendar, billing routes. | Route duplication, mixed persistence, incomplete auth enforcement, no full integration tests. |
| `apps/mobile` | Expo remote-control starter with login, command, tasks, approvals, results screens. | No production auth session, no EAS build, no push verification, no offline/sync. |

### 4.2 Packages

| Package | Current state | Gap |
|---|---|---|
| `@iai/product-registry` | Template/product registry exists. | Must be formally renamed/documented as Computer Template Registry. |
| `@iai/routing-matrix` | Intent/lane/model routing scaffold. | Not connected to real model mesh/tool kernel. |
| `@iai/workflow-engine` | Async run store, state machine, output/replay/score. | Lifecycle is too small for full CommandRun contract. |
| `@iai/runtime-registry` | Worker classes/scaffold. | Mostly simulated; no sandbox boundary. |
| `@iai/database` | SQLite fallback, PostgreSQL pool, migrations, models. | Mixed SQLite/Pg semantics; migrations not fully verified in real DB. |
| `@iai/providers` | OpenAI/Anthropic/SendGrid/Stripe/PayOS provider factories exist. | Need live-key smoke tests and runtime integration. |
| `@iai/cost-governor` | PostgreSQL cost checks and usage record function. | Must be enforced in all command/model/provider paths. |
| `@iai/auth-sdk` | Auth scaffold. | No full backend auth + UI session + passkey flow. |
| `@iai/audit-sdk` | Audit scaffold. | Needs persistent audit for all state-changing routes. |
| `@iai/approval-sdk` | Approval scaffold. | Needs unified approval matrix enforcement. |
| `@iai/billing-sdk` | Invoice/subscription scaffold. | Partly Pg-dependent; must integrate `pay.iai.one` or real provider. |
| `@iai/usage-sdk` | Usage scaffold. | Need persistent per-instance usage, quotas, and alerts. |

### 4.3 Database state

Current database state is **partial, not unified**.

Evidence:

- `packages/database/src/index.ts` has SQLite local schema and `createSqliteRunStore()`.
- `packages/database/src/pg.ts` has PostgreSQL pool and `query()`.
- `packages/database/src/pg-run-store.ts` has PostgreSQL run store.
- `packages/database/migrations/002_ai_browser_schema.sql` exists.
- `packages/database/migrations/003_smart_work_calendar_schema.sql` exists.
- `packages/database/migrations/004_core_user_schema.sql` exists.
- `apps/api/src/index.ts` now chooses PostgreSQL when `DATABASE_URL` exists and SQLite fallback otherwise.

Main risks:

- Some API routes import `@iai/database/pg` directly and will fail without `DATABASE_URL`.
- SQLite fallback only covers selected legacy routes, not all new `computers`, `commands`, `browser`, and `calendar` routes.
- Migrations do not yet include one complete canonical schema for ComputerInstance, CommandRun, EvidencePack, ApprovalRequest, AuditEvent, Memory, Vault, Runtime, UpgradeRequest, and RollbackPlan.

---

## 5. Production readiness scorecard

| Area | Weight | Score | Reason |
|---|---:|---:|---|
| Vision and positioning | 8 | 8 | Strong and consistent in newer master docs. |
| Product/template catalog | 6 | 5 | Working, but naming still product-centric. |
| Web console | 6 | 2 | Catalog UI exists; true instance console missing. |
| Mobile remote | 5 | 2 | Starter app exists; no production build/session. |
| API control plane | 10 | 5 | Many routes exist; auth/scope/tests incomplete. |
| PostgreSQL persistence | 10 | 4 | Pg exists; not fully unified/verified. |
| Command kernel | 8 | 3 | Basic commands/runs exist; no full OS lifecycle. |
| Model mesh/provider layer | 8 | 3 | Providers exist; not wired end-to-end to workers. |
| Tool/runtime sandbox | 8 | 1 | Simulated runtime; sandbox boundary absent. |
| Data vault/memory | 8 | 2 | Vault tables/models partial; encryption/memory missing. |
| Verification/evidence/audit | 8 | 2 | Concepts/tables partial; not universally enforced. |
| Approval/security policy | 7 | 3 | Policies exist partly; enforcement incomplete. |
| Billing/payment/email | 5 | 2 | Provider code exists; production flow incomplete. |
| Observability/DR/CI | 3 | 1 | Typecheck/build local pass; no full ops evidence. |
| Compliance/data residency | 2 | 0 | Mostly docs only. |
| **Total** | **100** | **38** | Not production-ready. |

---

## 6. Required 100% completion waves

### Wave 0 — Plan consolidation and gate lock

**Goal:** Stop contradictory reporting and make this file the active execution board.

| # | Task | Acceptance criteria |
|---:|---|---|
| 0.1 | Mark old phase reports as historical | `START_HERE.md` points devs to this file. |
| 0.2 | Update production gate status | Gate reflects partial progress, not 0/7 or inflated done. |
| 0.3 | Freeze `AUTO_DEVELOPMENT_PLAN_2026_05_27.md` | AI Browser/Calendar work deferred until DB/auth/instance foundation passes. |
| 0.4 | Create TODO board from this wave plan | Team uses Wave IDs below, not old P1-P10 labels. |

### Wave 1 — Foundation source of truth: DB, auth, instance

**Goal:** One canonical backend foundation.

| # | Task | Files | Acceptance criteria |
|---:|---|---|---|
| 1.1 | Design canonical schema | `packages/database/migrations/005_ai_computer_os_core.sql` | Tables for `computer_instances`, `commands`, `runs`, `audit_events`, `approval_requests`, `evidence_packs`, `vault_items`, `memory_namespaces`, `usage_records`, `upgrade_requests`, `rollback_plans`. |
| 1.2 | Resolve SQLite/Pg boundary | `@iai/database` | Clear rule: SQLite local dev only; Pg source of truth for staging/prod; route behavior documented. |
| 1.3 | Apply migrations to real local Pg | `docker-compose.yml`, migration runner | `pnpm` script applies migrations and verifies table count. |
| 1.4 | Unify route data access | `apps/api/src/routes/*` | No production route bypasses repository layer; no direct SQL in route except health/debug. |
| 1.5 | Complete auth/session backend | `routes/auth.ts`, `@iai/auth-sdk`, DB models | Register/login/session/me/logout tested against DB. |
| 1.6 | Enforce user/tenant/computer scope | API middleware | All state-changing routes require authenticated user and validate `computer_id` ownership. |

### Wave 2 — Computer Instance lifecycle

**Goal:** Make catalog become template selector and create real AI Computer Instance.

| # | Task | Files | Acceptance criteria |
|---:|---|---|---|
| 2.1 | Rename/document product registry as template registry | `@iai/product-registry`, docs | Public code can keep package name short-term, but API semantics say templates. |
| 2.2 | Implement provision flow | `POST /api/computers` | Creates instance, vault namespace, memory namespace, cost policy, approval policy, audit event. |
| 2.3 | Implement lifecycle state machine | `@iai/contracts`, API | Only allowed transitions from lifecycle spec. |
| 2.4 | Build Web Console instance dashboard | `apps/web` | User sees owned computer instance, status, apps, quota, recent runs. |
| 2.5 | Build mobile remote binding | `apps/mobile` | Mobile session binds to one computer instance. |

### Wave 3 — Command Kernel and Run Engine

**Goal:** Commands become evidence-backed work units, not raw chat.

| # | Task | Files | Acceptance criteria |
|---:|---|---|---|
| 3.1 | Expand `CommandRun` contract | `packages/contracts` | Lifecycle matches master plan: created/classified/planned/approval/executing/verifying/packaging/delivered/failed/rolled_back. |
| 3.2 | Implement command creation pipeline | `routes/commands.ts`, `@iai/workflow-engine` | Command creates run, audit event, cost estimate, policy decision. |
| 3.3 | Add planner step | new package or workflow module | Command produces plan steps before execution. |
| 3.4 | Add retry/backoff and failure recovery | workflow engine | Recoverable failures get bounded retries and truthful failure report. |
| 3.5 | Persist run outputs and artifacts | DB + object storage placeholder | Results are retrievable and linked to evidence. |

### Wave 4 — Model Mesh and Cost Governor

**Goal:** Real providers and cost control.

| # | Task | Files | Acceptance criteria |
|---:|---|---|---|
| 4.1 | Wire providers to runtime workers | `@iai/runtime-registry`, `@iai/providers` | At least one worker calls OpenAI/Anthropic through provider factory. |
| 4.2 | Circuit breaker integration | provider layer | Provider failure falls back or degrades with audit. |
| 4.3 | Usage recording | `@iai/cost-governor` | Every AI call writes usage record. |
| 4.4 | Per-instance quota enforcement | commands + providers | Hard and soft limits tested. |
| 4.5 | BYOK/degraded mode policy | docs + API config | No silent cost overrun. |

### Wave 5 — Tool Kernel, Runtime Sandbox, AI Browser

**Goal:** Safe execution plane.

| # | Task | Files | Acceptance criteria |
|---:|---|---|---|
| 5.1 | Define tool registry | `packages/tool-kernel` or equivalent | Tools have permissions, risk level, required approvals. |
| 5.2 | Define sandbox boundary | `Docs/infrastructure/*`, runtime code | Browser/code execution cannot access control plane secrets. |
| 5.3 | Complete AI Browser sessions/profiles | `routes/browser.ts`, DB models | No duplicate route definitions; CRUD tested. |
| 5.4 | Implement vault encryption envelope | vault models | No plaintext tokens/cookies in DB. |
| 5.5 | Implement high-risk browser approval | browser actions | Email/send/payment/secret/export require approval. |
| 5.6 | Evidence collection for browser actions | evidence tables/API | Screenshots/logs/action results linked to evidence pack. |

### Wave 6 — Smart Calendar and work orchestration

**Goal:** Calendar becomes a Super App inside the AI Computer, not a standalone CRUD app.

| # | Task | Files | Acceptance criteria |
|---:|---|---|---|
| 6.1 | Normalize calendar schema/models | calendar migration/models | API fields match DB columns. |
| 6.2 | Implement conflict detection | calendar service | Overlapping events detected. |
| 6.3 | Implement reminders scheduler | cron/queue | Reminder rules produce due notifications. |
| 6.4 | Implement Google/Microsoft OAuth | provider connections | Real auth URL and callback handling. |
| 6.5 | Link tasks to CommandRun | calendar + workflow | Work queue items can spawn tracked command runs. |

### Wave 7 — Billing, payment, email, admin

**Goal:** Commercial operations work with governance.

| # | Task | Files | Acceptance criteria |
|---:|---|---|---|
| 7.1 | Integrate payment gateway | `pay.iai.one` or provider | Test transaction creates subscription and audit. |
| 7.2 | Email provider live test | SendGrid/SES/Resend | Invoice/magic-link email received in staging. |
| 7.3 | Entitlement enforcement | API middleware | Unpaid/restricted instance cannot execute paid actions. |
| 7.4 | Admin console MVP | web/admin or route group | Admin can view users, instances, approvals, incidents. |
| 7.5 | Truthful reporting dashboard | evidence/audit | Cannot mark done without evidence pack. |

### Wave 8 — Observability, security, production gate

**Goal:** Production readiness evidence.

| # | Task | Files | Acceptance criteria |
|---:|---|---|---|
| 8.1 | Structured logs and correlation IDs | API + packages | Every command/run/action has trace ID. |
| 8.2 | Metrics and health checks | API + deployment | DB, Redis, provider, queue health visible. |
| 8.3 | Backup/restore drill | infra scripts/docs | Restore tested from backup. |
| 8.4 | Integration test suite | tests | Auth, instance, command, provider, billing, browser, calendar covered. |
| 8.5 | Security review | checklist + fixes | Secrets, authz, injection, sandbox, encryption reviewed. |
| 8.6 | CI/CD gate | GitHub Actions | Typecheck, build, tests, migrations run green. |
| 8.7 | Staging deploy | infra | Staging only until production gate signed. |
| 8.8 | Production gate sign-off | production gate doc | All hard requirements passed with evidence. |

---

## 7. Immediate next dev order

Do not continue AI Browser/Calendar feature expansion yet. The correct immediate order is:

1. **Wave 0.1–0.4:** consolidate docs and active board.
2. **Wave 1.1:** create canonical core schema migration.
3. **Wave 1.2–1.4:** unify database access and route persistence.
4. **Wave 1.5–1.6:** complete auth/session/scope enforcement.
5. **Wave 2.1–2.3:** implement real ComputerInstance provisioning and lifecycle.
6. Only then resume AI Browser/Calendar deep feature work.

Reason: Browser and Calendar currently depend on `tenant_id`, `user_id`, and `computer_id`, but ownership/auth/lifecycle are not yet enforced consistently. Building more features before that will increase rework and security risk.

---

## 8. Updated production blockers

| Blocker | Current state | Required evidence |
|---|---|---|
| Real PostgreSQL source of truth | Partial | Migration applied to real local/staging Pg, all core routes use it. |
| Auth and session | Partial | End-to-end login/session/me/logout tests. |
| ComputerInstance lifecycle | Partial | Provision/activate/restrict/archive tested. |
| AI provider execution | Partial | Real model smoke test through runtime worker. |
| Cost governor | Partial | Every AI call checked and recorded. |
| Evidence pack | Partial | Every command can produce evidence pack. |
| Audit log | Partial | All state-changing actions audited. |
| Approval matrix | Partial | High-risk commands blocked until approval. |
| Payment/email | Partial | Staging payment and email success evidence. |
| Mobile build | Not done | EAS iOS/Android artifacts. |
| Observability | Not done | Structured logs, metrics, incident path. |
| Backup/DR | Not done | Restore drill evidence. |
| Security review | Not done | Checklist and remediation evidence. |
| CI/CD | Partial | Latest green run with tests and build. |

---

## 9. Team command

```text
TEAM DEV COMMAND — COMPUTER.IAI.ONE

Stop reporting legacy phase completion as production completion.
Use this file as the active execution plan.
Do not build more catalog-only features.
Do not expand AI Browser/Calendar before Wave 1 foundation is complete.
Every new route must enforce auth, computer ownership, audit, and structured errors.
Every high-risk action must pass policy and approval.
Every completion report must include code evidence, migration evidence, test evidence, and known blockers.
Status remains: NOT PRODUCTION-READY.
```

---

## 10. Required reporting format after each task

Each dev update must use this format:

```text
Task ID:
Files changed:
Database changes:
API changes:
Tests run:
Evidence produced:
Security impact:
Rollback plan:
Known blockers:
Status: DONE / PARTIAL / BLOCKED
```

A task cannot be marked `DONE` if tests or evidence are missing.

---

## 11. Final audit conclusion

The total project logic is now clear only if the team treats older documents as historical and follows the newer AI Computer OS hierarchy plus this active execution board.

The current codebase is a useful foundation, but not yet the final product. The next correct move is not more UI or feature breadth. The next correct move is **foundation unification**:

```text
Canonical DB → Auth/session → ComputerInstance lifecycle → Command Kernel → Model Mesh → Runtime Sandbox → Evidence/Audit → Billing/Admin → Production Gate
```

Until those gates pass, all public and internal reports must say:

```text
AI COMPUTER OS ARCHITECTURE LOCKED
FOUNDATION IMPLEMENTATION IN PROGRESS
NOT PRODUCTION-READY
```
