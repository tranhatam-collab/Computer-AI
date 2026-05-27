# TEAM COMMAND — STOP WRONG BUILD DIRECTION

> Date: 2026-05-27
> Authority: AI Computer OS Architecture Audit
> Status: MANDATORY READ BEFORE NEXT COMMIT

---

## THE PROBLEM

The team has been building Computer.iai.one as if it were:
- A product catalog with 12 AI computers
- A web app with API routes
- A chatbot with routing
- A browser automation tool
- A calendar app

**This is wrong.**

Computer.iai.one must be built as:
```text
AI Computer Operating System
  └── AI Computer Instance (per user)
        ├── Command Kernel
        ├── Planning Kernel
        ├── Model Mesh + Router + Governor
        ├── Tool Kernel + Connector Registry
        ├── Permission Kernel
        ├── Runtime Sandbox
        ├── AI Browser (secure runtime)
        ├── Smart Calendar + Work OS
        ├── Data Vault + Memory + Local Sync
        ├── Verification + Evidence Engine
        ├── Error Recovery + Self-Healing
        ├── Cost Governor + Quota System
        ├── Observability Kernel
        ├── App/Skill Registry + Marketplace
        └── Self-Upgrading Kernel
```

---

## WHAT TO STOP DOING IMMEDIATELY

### ❌ STOP
```text
1. STOP adding new UI screens until the backend can do real work
2. STOP claiming phases are "complete" when workers are simulated
3. STOP building mobile features until API is production-grade
4. STOP creating new documentation packages until code catches up
5. STOP treating AI Browser as a standalone app (it is a secure runtime module)
6. STOP treating Smart Calendar as a standalone app (it is a Work OS module)
7. STOP using SQLite for new data (all data must go to PostgreSQL)
8. STOP writing mock providers that ignore real API keys
```

### ❌ FORBIDDEN WORDS
```text
"Production-ready"
"Fully secure"
"Enterprise-ready"
"Compliance-ready"
"Self-upgrading"
"Autonomous"
"100% complete"
```

**Unless** the relevant production gate has passing evidence with test output.

---

## WHAT TO START DOING IMMEDIATELY

### ✅ PRIORITY 0: FIX FOUNDATION (This Week)
```text
1. Merge the two PostgreSQL pools (pg.ts + connection.ts) → ONE pool
2. Migrate ALL legacy SQLite tables to PostgreSQL
3. Remove SQLite dependency from production path
4. Make email provider use real SendGrid/SES when API key exists
5. Make payment provider use real Stripe/PayOS when API key exists
6. Verify migrations 002 + 003 run cleanly on real PostgreSQL
7. Add DB health check on startup
```

### ✅ PRIORITY 1: WIRE REAL AI (Next 2 Weeks)
```text
1. Connect Runtime Workers to real AI providers (not mock)
2. BrowserWorker → real browser automation (Playwright/Puppeteer)
3. CodeWorker → real code execution (sandboxed)
4. ResearchWorker → real search + synthesis
5. ContentWorker → real content generation
6. OfficeWorker → real document processing
```

### ✅ PRIORITY 2: SECURITY + AUTH (Next 2 Weeks)
```text
1. Build login/register pages
2. Implement passkey/WebAuthn support
3. Add JWT middleware to ALL API routes
4. Add rate limiting per user
5. Add audit logging for every action
6. Encrypt vault items at rest
```

### ✅ PRIORITY 3: PRODUCTION GATES (Next 4 Weeks)
```text
1. Payment: Wire Stripe + PayOS
2. Email: Wire SendGrid + SES
3. Mobile: EAS build + push notifications
4. Observability: Metrics + tracing + alerting
5. Testing: Integration tests + load tests
6. Backup/DR: Automated backups
7. Compliance: Data classification + retention + erasure
```

### ✅ PRIORITY 4: AI COMPUTER OS KERNELS (Next 8 Weeks)
```text
1. Command Kernel: Job lifecycle orchestration
2. Planning Kernel: Multi-step decomposition
3. Model Mesh: Intelligent routing across providers
4. Tool Kernel: MCP gateway + connector registry
5. Runtime Sandbox: Secure execution boundary
6. Memory Layer: Context persistence + local sync
7. Error Recovery: Auto-retry + rollback + degradation
8. Self-Upgrading: Version management + auto-update
```

---

## CORRECT TEAM SENTENCE

```text
Computer.iai.one is not an AI app. It is a user-owned AI Computer OS with command kernel, model mesh, tool kernel, runtime sandbox, verification, evidence, recovery and governance.

A model answers. An agent performs a task. Computer.iai.one coordinates many models, agents, tools, runtimes, workspaces, permissions, evidence, recovery paths and user-owned data to complete real work safely.
```

---

## ALLOWED STATUS REPORTS

```text
✅ "Product catalog is live"
✅ "API scaffold is ready for iteration"
✅ "Build passes"
✅ "Database schema written"
✅ "Routes created"
✅ "Not production-ready"

❌ "Production-ready"
❌ "AI workers are functional"
❌ "Database is migrated"
❌ "Payment works"
❌ "Email delivers"
❌ "Any phase is 100% complete"
```

---

## DAILY STANDUP QUESTIONS

Every team member must answer:
```text
1. Did I touch real PostgreSQL today? (not SQLite)
2. Did I wire a real API call today? (not mock)
3. Did I add a test today?
4. Did I add audit logging today?
5. Am I building an OS kernel or an app feature?
```

If the answer to #5 is "app feature", stop and re-read this document.

---

## COMMIT MESSAGE RULES

```text
"feat: scaffold X"        → API routes exist but may have stubs
"feat: implement X"       → Real functionality, tested, wired
"feat: wire X"            → Connected to real provider/service
"fix: X"                  → Bug fix with test
"docs: X"                 → Documentation only

FORBIDDEN:
"feat: complete X"        → Unless gate has evidence
"feat: production X"      → Unless gate has evidence
```

---

## PRODUCTION READINESS GATES

Do NOT claim production-ready until ALL gates pass:

```text
□ Architecture bridge pass
□ AI Computer Instance OS pass
□ PostgreSQL pass (all data, no SQLite)
□ Auth/passkey pass
□ Model Mesh pass (real AI calls)
□ Provider Resilience pass
□ Tool Kernel pass
□ Permission Kernel pass
□ Vault/Memory pass (encrypted at rest)
□ Runtime Sandbox pass
□ AI Browser pass (real automation)
□ Smart Calendar pass (real sync)
□ Verification/Evidence pass
□ Error Recovery pass
□ Cost Governor pass
□ Observability pass
□ Payment pass (real charges)
□ Email/Notification pass (real delivery)
□ Compliance pass
□ Backup/Restore pass
□ Incident Response pass
□ Security Review pass
```

Current status: **0/22 gates passed**

---

## NEXT MILESTONE

```text
"All data on PostgreSQL, real AI calls, real providers, auth pages live"
ETA: 6-8 weeks minimum
```

Until then:
```text
SCAFFOLD_READY_TO_COMMIT=YES
STAGE_CONNECTION_AND_MIGRATE=REQUIRED
BUILD=PASS
MIGRATIONS_APPLIED=NOT_VERIFIED
PRODUCTION_READY=NO
```

---

*End of Team Command*
*Obey or the AI Computer OS will never exist.*
