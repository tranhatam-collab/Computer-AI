<!-- FILE: README.md -->

# COMPUTER.IAI.ONE TRUE AI COMPUTER OS MASTER PACKAGE 2026


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## 1. Purpose

This package upgrades Computer.iai.one from a repo conversion plan into a full **True AI Computer Operating System** specification.

The previous package was necessary but not sufficient. It bridged the repo away from product-catalog architecture. This package defines the full operating architecture required for a real AI Computer:

```text
AI Computer Instance
Command Kernel
Planning Kernel
Model Mesh
Model Router and Governor
Provider Resilience Layer
Tool and Connector Kernel
Permission Kernel
Runtime Sandbox
AI Browser
Smart Calendar and Work OS
Data Vault
Memory Layer
Local Sync Agent
Workflow Engine
Verification Engine
Evidence and Audit Center
Error Recovery Kernel
Cost Governor
Observability Kernel
App and Skill Registry
Self-Upgrading Kernel
Governance and Compliance Layer
```

## 2. Non-negotiable definition

```text
Computer.iai.one is not an AI app.
Computer.iai.one is not a chatbot.
Computer.iai.one is not a product catalog.
Computer.iai.one is not a simple agent.
Computer.iai.one is an AI Computer Operating System.
```

## 3. Core sentence for the team

```text
A model answers.
An agent performs a task.
Computer.iai.one coordinates many models, agents, tools, runtimes, workspaces, permissions, evidence, recovery paths and user-owned data to complete real work safely.
```

## 4. Operational meaning of 100%

No system can promise zero failure. The correct target is:

```text
100% operational design = the system is designed to continue operating in a controlled, transparent and recoverable way when one or many models, APIs, tools, connectors, clouds, emails, browsers, payments or agents fail.
```

If 1 model fails, route to another.  
If 50% providers fail, degrade intelligently.  
If 90% providers fail, enter controlled degraded mode, queue work, use local/BYOK/cached paths, produce partial reports and notify the user honestly.

## 5. Package structure

```text
docs/true-ai-computer-os/
docs/model-mesh/
docs/tool-matrix/
docs/super-apps/
docs/error-recovery/
docs/production-gates/
patches/
scripts/
```

## 6. Apply strategy

Copy this package into the repo root. Start by applying:

```text
00_MASTER_VISION_AND_NON_NEGOTIABLES.md
02_AI_COMPUTER_INSTANCE_OS_ARCHITECTURE.md
03_COMMAND_KERNEL_AND_WORK_MATRIX.md
04_MODEL_MESH_AND_PROVIDER_RESILIENCE.md
10_ERROR_RECOVERY_AND_SELF_HEALING_KERNEL.md
20_PRODUCTION_READINESS_GATE_100.md
TEAM_COMMAND_STOP_BUILDING_APP.md
README_PATCH_TRUE_AI_COMPUTER.md
```

Do not claim production-ready after applying docs. This is a master architecture handoff, not a deployed runtime.

## 7. Completion phrase

```text
TRUE AI COMPUTER OS MASTER PACKAGE APPLIED
ARCHITECTURE READY FOR DEV REVIEW
NOT PRODUCTION-READY
```



<!-- FILE: docs/true-ai-computer-os/00_MASTER_VISION_AND_NON_NEGOTIABLES.md -->

# 00 — MASTER VISION AND NON-NEGOTIABLES


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## 1. New verdict

Computer.iai.one must be built as:

```text
A resilient AI Computer Operating System where every user owns an AI Computer Instance that can plan, execute, verify, recover, report and improve across many models, tools, runtimes and workspaces.
```

## 2. Five principles

```text
1. Do not depend on one model, one API, one provider, one cloud or one workflow.
2. Do not process user commands as chat. Process them as jobs with lifecycle, state, evidence and rollback.
3. Do not let AI act directly. Every action goes through permission, sandbox, approval and audit.
4. Do not only answer. Produce complete outputs: files, reports, links, tasks, email drafts, dashboards, code and tests.
5. Do not only work when everything is healthy. Work honestly under failure, quota exhaustion, missing data, tool conflict and uncertain output.
```

## 3. Forbidden product interpretations

```text
AI chatbot
AI app
Product catalog
Browser automation app
Calendar app
Workflow automation app
Single-agent assistant
Dashboard with OpenAI API
```

## 4. Required product interpretation

```text
AI Computer Operating System
User-owned AI Computer Instance
Model Mesh
Tool Kernel
Runtime Sandbox
Evidence System
Error Recovery
Self-Upgrading Kernel
```

## 5. Correct team sentence

```text
Computer.iai.one is not an AI app. It is a user-owned AI Computer OS with command kernel, model mesh, tool kernel, runtime sandbox, verification, evidence, recovery and governance.
```



<!-- FILE: docs/true-ai-computer-os/01_NORMAL_COMPUTER_VS_AI_COMPUTER.md -->

# 01 — NORMAL COMPUTER VS AI COMPUTER


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## 1. Normal computer

A normal computer is a tool that executes user operations.

```text
Human thinks.
Human opens apps.
Human clicks.
Human types.
Human checks.
Human saves.
Human sends.
Human remembers.
```

A normal computer has:

```text
hardware
operating system
apps
files
browser
storage
network
input devices
```

## 2. AI Computer

An AI Computer is a work coordination system that understands goals, plans steps, uses tools, asks for approval, produces artifacts, verifies results, recovers from failure and reports honestly.

It has:

```text
identity
data
memory
apps
agents
tools
models
permissions
calendar
browser
verification
evidence
self-upgrade
error recovery
```

## 3. Difference

```text
Normal computer = tool of operation.
AI Computer = system of outcome coordination.
```

## 4. Example

User asks:

```text
Prepare the investor dossier, check latest repo status, draft the email, create follow-up calendar task and ask before sending.
```

Normal computer requires the user to do every step.

AI Computer should create:

```text
investor_dossier.pdf
repo_gap_report.md
email_draft.md
follow_up_task
approval_request
evidence_pack.json
```

## 5. Dev rule

Do not build another app. Build the operating layer that turns a goal into controlled work.



<!-- FILE: docs/true-ai-computer-os/02_AI_COMPUTER_INSTANCE_OS_ARCHITECTURE.md -->

# 02 — AI COMPUTER INSTANCE OS ARCHITECTURE


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## 1. Canonical architecture

```text
User Identity
↓
AI Computer Instance
↓
Command Kernel
↓
Planning Kernel
↓
Work Matrix
↓
Model Mesh + Tool Kernel
↓
Runtime Sandbox
↓
Verification Engine
↓
Evidence Center
↓
Report + Next Action
```

## 2. Instance object

```json
{
  "computerId": "comp_001",
  "ownerId": "user_001",
  "tenantId": "tenant_001",
  "region": "apac",
  "computerType": "business",
  "plan": "pro",
  "status": "active",
  "vaultId": "vault_001",
  "memoryId": "memory_001",
  "policyId": "policy_001",
  "runtimeProfileId": "runtime_001",
  "billingState": "active",
  "healthState": "healthy",
  "apps": ["ai_browser", "smart_calendar", "mail", "docs", "research"],
  "agents": ["planner", "executor", "reviewer", "security", "evidence"],
  "createdAt": "2026-05-27T00:00:00Z"
}
```

## 3. Instance must own

```text
vault
memory
apps
agents
policy
runtime state
billing state
audit state
health state
cost state
evidence state
region state
```

## 4. Lifecycle

```text
draft
provisioning
active
degraded
restricted
past_due
export_only
suspended
archived
deleted
```

## 5. Health state

```text
healthy
degraded_model
degraded_tool
degraded_connector
quota_limited
approval_blocked
security_locked
incident_mode
```

## 6. Acceptance criteria

```text
[ ] Every user workflow resolves to a computer_id.
[ ] Every run has computer_id.
[ ] Every cost has computer_id.
[ ] Every evidence pack has computer_id.
[ ] Every provider decision has computer_id.
[ ] Every compliance rule has region + computer_id.
```



<!-- FILE: docs/true-ai-computer-os/03_COMMAND_KERNEL_AND_WORK_MATRIX.md -->

# 03 — COMMAND KERNEL AND WORK MATRIX


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## 1. Command is not chat

User command must become a structured job.

Example command:

```text
Check the whole website, fix issues, create a dev report and send it to the team if I approve.
```

Command Kernel output:

```json
{
  "intent": "web_audit_and_fix_plan",
  "jobType": "multi_step",
  "riskLevel": "medium",
  "toolsRequired": ["browser", "repo", "file", "report", "email"],
  "approvalRequired": true,
  "outputRequired": ["report", "checklist", "evidence", "email_draft"]
}
```

## 2. Work Matrix dimensions

Every job must be classified by 9 dimensions:

```text
Intent
Domain
Risk
Required tools
Required data
Required model strength
Approval requirement
Cost estimate
Evidence requirement
```

## 3. Job lifecycle

```text
received
classified
planned
cost_estimated
waiting_for_approval
queued
running
verifying
completed
completed_with_warnings
partial_completed
blocked
failed_recoverable
failed_requires_user
failed_requires_admin
```

## 4. Work matrix examples

| Work | Risk | Tools | Agents | Approval |
|---|---|---|---|---|
| Summarize file | Low | file reader | document agent | No |
| Draft email | Low | mail draft | writer | No |
| Send email | Medium | email send | mail agent | Yes |
| Post social | Medium | browser/social API | social agent | Yes |
| Edit code | Medium | repo/terminal | code agent | Maybe |
| Deploy | High | CI/CD | devops agent | Admin |
| Payment | Critical | payment | finance agent | High approval |
| Delete data | Critical | storage | security agent | High approval |

## 5. Required contracts

```ts
type CommandJob = {
  commandId: string
  computerId: string
  userId: string
  intent: string
  domain: string
  riskLevel: "low" | "medium" | "high" | "critical"
  requiredTools: string[]
  requiredData: string[]
  requiredModelStrength: "fast" | "balanced" | "reasoning" | "specialized"
  approvalRequired: boolean
  costEstimate?: number
  evidenceRequired: boolean
  status: string
}
```

## 6. Acceptance criteria

```text
[ ] No command is processed as raw chat.
[ ] Every command becomes a job.
[ ] Every job has risk and evidence requirement.
[ ] Every high/critical job has approval gate.
```



<!-- FILE: docs/true-ai-computer-os/04_MODEL_MESH_AND_PROVIDER_RESILIENCE.md -->

# 04 — MODEL MESH AND PROVIDER RESILIENCE


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## 1. Decision

Computer.iai.one must not depend on one model or one provider.

It must use a Model Mesh.

## 2. Model lanes

```text
fast model
reasoning model
coding model
vision model
speech model
translation model
embedding model
reranker model
local fallback model
BYOK model
enterprise approved model
```

## 3. Provider categories

```text
OpenAI
Anthropic
Google
Mistral
Meta/Llama via host
DeepSeek
Qwen
Cohere
Perplexity/search models
AWS Bedrock
Azure AI
Cloudflare Workers AI
local Ollama/LM Studio future
BYOK user keys
```

Not all providers are needed on day one. Architecture must support them.

## 4. Model Router

Router considers:

```text
task type
risk level
data sensitivity
language
latency
cost
provider health
quota remaining
user plan
BYOK availability
required accuracy
```

## 5. Fallback cascade

```text
Primary: preferred reasoning/coding/etc. provider
Fallback 1: same lane provider
Fallback 2: different strong provider
Fallback 3: cheaper/open model
Fallback 4: local/BYOK
Fallback 5: queue retry
Fallback 6: human handoff with partial report
```

## 6. Provider resilience states

```text
healthy
degraded_latency
degraded_error_rate
quota_warning
quota_exhausted
credit_exhausted
down
disabled_by_policy
disabled_by_security
```

## 7. Failure modes

### 10% API failure

```text
auto retry
route around provider
log warning
no user disruption
```

### 50% API failure

```text
disable weak providers
use priority queue
reduce agent count
switch to cheaper/faster models
ask approval for heavy jobs
```

### 90% API failure

```text
enter degraded mode
critical tasks only
BYOK if available
local/cache mode
queue long jobs
return partial report
schedule retry
notify user honestly
```

## 8. Quota exhausted

```text
provider marked quota_exhausted
do not retry blindly
switch provider
switch BYOK
switch included model
ask user to add key or upgrade
```

## 9. Acceptance criteria

```text
[ ] Provider registry exists.
[ ] Model registry exists.
[ ] Router exists.
[ ] Health check exists.
[ ] Circuit breaker exists.
[ ] Quota watcher exists.
[ ] Cost governor integration exists.
[ ] Degraded mode exists.
```



<!-- FILE: docs/true-ai-computer-os/05_TOOL_KERNEL_AND_CONNECTOR_REGISTRY.md -->

# 05 — TOOL KERNEL AND CONNECTOR REGISTRY


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## 1. Decision

AI must not call tools directly. All tools go through Tool Kernel, permission, sandbox and audit.

## 2. Tool categories

```text
browser
file manager
email
calendar
docs
sheets
slides
PDF
OCR
image
audio
video
code
terminal
database
API client
webhook
cloud storage
social accounts
CRM
project management
payment
invoice
analytics
security scanner
```

## 3. Connector registry

Each connector must define:

```json
{
  "connectorId": "gmail",
  "name": "Gmail",
  "authType": "oauth",
  "riskClass": "medium",
  "allowedActions": ["read", "draft", "send_with_approval"],
  "dataClasses": ["personal", "sensitive"],
  "requiresApprovalFor": ["send", "delete", "export"],
  "auditRequired": true
}
```

## 4. MCP/A2A position

MCP and A2A may be used, but only behind hardened gateways.

Rules:

```text
No direct model-to-tool for sensitive tools.
No untrusted MCP server without sandbox.
Tool descriptions must be signed or trusted.
Tool outputs are untrusted data until verified.
Agent-to-agent messages require identity, signing, audit and policy.
```

## 5. Tool action classes

```text
read
draft
prepare
write
publish
send
delete
pay
deploy
change_security
export_data
```

## 6. Acceptance criteria

```text
[ ] Tool registry exists.
[ ] Connector registry exists.
[ ] Tool actions have risk class.
[ ] Sensitive actions require approval.
[ ] Every tool call has audit event.
```



<!-- FILE: docs/true-ai-computer-os/06_SUPER_APPS_OPERATING_SYSTEM.md -->

# 06 — SUPER APPS OPERATING SYSTEM


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## 1. Super Apps are not simple apps

Super Apps are coordinated work modules controlled by Command Kernel and Tool Kernel.

## 2. Required Super Apps

```text
AI Browser
AI Calendar
AI Mail
AI Docs
AI Drive
AI Research
AI Code
AI Content Studio
AI CRM
AI Finance
AI Evidence Center
AI Security Center
AI App and Skill Store
```

## 3. Super App contract

```ts
type SuperApp = {
  appId: string
  name: string
  description: string
  requiredTools: string[]
  requiredAgents: string[]
  dataClasses: string[]
  riskProfile: "low" | "medium" | "high" | "critical"
  supportsOfflineMode: boolean
  supportsEvidence: boolean
  approvalActions: string[]
}
```

## 4. Coordination example

Command:

```text
Create a product launch article, publish draft to WordPress, prepare LinkedIn post, schedule follow-up and send me approval.
```

Super Apps involved:

```text
AI Content Studio
AI Browser
AI Docs
AI Calendar
AI Evidence Center
AI Approval Center
```

## 5. Acceptance criteria

```text
[ ] Super Apps register capabilities.
[ ] Super Apps do not bypass permission.
[ ] Super Apps emit evidence.
[ ] Super Apps can be disabled by policy.
```



<!-- FILE: docs/true-ai-computer-os/07_VAULT_MEMORY_AND_LOCAL_SYNC.md -->

# 07 — VAULT, MEMORY AND LOCAL SYNC


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## 1. Data Vault

Stores user-owned work data:

```text
files
documents
images
videos
audio
exports
reports
evidence
browser sessions
tokens metadata
connected account metadata
```

## 2. Memory Layer

Memory is not chat history. It is working intelligence.

```text
user preferences
project memory
people memory
workflow memory
decision memory
style memory
company memory
do-not-store classes
```

## 3. Local Device Sync Agent

A true AI Computer cannot be cloud-only.

Local Sync Agent should support:

```text
user-selected folder sync
local indexing with consent
watch changes
upload selected files
local encryption
local command bridge
offline queue
local backup
```

## 4. Local privacy rule

```text
Do not read the whole machine.
User selects folders, apps or data scopes.
```

## 5. Export/delete

```text
Vault files export/delete
Memory export/delete
Session revoke
Evidence retention/purge
Audit exception/legal hold
```

## 6. Acceptance criteria

```text
[ ] Vault namespace per ComputerInstance.
[ ] Memory namespace per ComputerInstance.
[ ] Local sync is opt-in.
[ ] Secret data never enters model context.
[ ] Delete/export workflow exists.
```



<!-- FILE: docs/true-ai-computer-os/08_RUNTIME_SANDBOX_AND_SECURITY_BOUNDARY.md -->

# 08 — RUNTIME SANDBOX AND SECURITY BOUNDARY


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## 1. Decision

Dangerous tasks must run in sandbox.

## 2. Sandbox types

```text
code sandbox
browser sandbox
file sandbox
network sandbox
AI tool sandbox
self-upgrade sandbox
```

## 3. Forbidden direct access

Agents must not directly touch:

```text
production database
billing system
security settings
secret vault
admin permissions
deployment keys
user credentials
```

## 4. Runtime policy

```text
per-run isolation
resource limits
network allowlist
file system boundaries
time limits
output capture
audit log
rollback plan
```

## 5. Acceptance criteria

```text
[ ] Browser runtime sandboxed.
[ ] Code runtime sandboxed.
[ ] Tool runtime permissioned.
[ ] No production secret in sandbox.
[ ] Runtime logs tied to run_id.
```



<!-- FILE: docs/true-ai-computer-os/09_VERIFICATION_EVIDENCE_AND_REPORTING_ENGINE.md -->

# 09 — VERIFICATION, EVIDENCE AND REPORTING ENGINE


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## 1. Verification Engine

Results must be checked by multiple lanes:

```text
reviewer agent
fact-check agent
security agent
policy agent
evidence agent
cost agent
```

## 2. Evidence Pack

Every serious job creates evidence:

```json
{
  "evidenceId": "ev_001",
  "computerId": "comp_001",
  "runId": "run_001",
  "input": "...",
  "plan": [],
  "steps": [],
  "tools": [],
  "files": [],
  "screenshots": [],
  "logs": [],
  "approvals": [],
  "diffs": [],
  "testOutput": [],
  "finalResult": "...",
  "riskFlags": [],
  "confidence": 0.82
}
```

## 3. Final report statuses

```text
completed
completed_with_warnings
partial_completed
blocked
failed_recoverable
failed_requires_user
failed_requires_admin
```

## 4. Rule

```text
Do not report "done" unless evidence exists.
```

## 5. Acceptance criteria

```text
[ ] Evidence pack per run.
[ ] Verification report per high-risk run.
[ ] Final status is truthful.
[ ] Partial results are clearly marked.
```



<!-- FILE: docs/true-ai-computer-os/10_ERROR_RECOVERY_AND_SELF_HEALING_KERNEL.md -->

# 10 — ERROR RECOVERY AND SELF-HEALING KERNEL


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## 1. Error Recovery Kernel

This is mandatory for a true AI Computer.

## 2. Error types

```text
model_timeout
model_bad_output
provider_down
quota_exhausted
tool_failed
permission_denied
missing_data
conflicting_data
browser_blocked
auth_expired
captcha_required
rate_limited
file_parse_failed
test_failed
deploy_failed
payment_failed
email_bounced
```

## 3. Recovery actions

| Error | Recovery |
|---|---|
| model_timeout | retry another model |
| quota_exhausted | fallback provider/BYOK |
| tool_failed | try alternative tool |
| auth_expired | request re-auth |
| captcha_required | user-in-loop |
| missing_data | ask user or search source |
| weak_result | reviewer + stronger model |
| test_failed | debug loop |
| deploy_failed | rollback |
| email_bounced | queue retry + notify |
| payment_failed | stop and ask user |

## 4. Self-healing suggestion

The system may propose fixes, but must not silently modify production.

Flow:

```text
detect repeated error
classify root cause
propose fix
generate spec
test in sandbox
request approval
deploy safely
monitor
rollback if needed
```

## 5. Acceptance criteria

```text
[ ] Error classifier exists.
[ ] Retry policy exists.
[ ] Fallback policy exists.
[ ] Partial result policy exists.
[ ] Human handoff exists.
[ ] Incident report exists.
[ ] Root cause analysis template exists.
```



<!-- FILE: docs/true-ai-computer-os/11_COST_GOVERNOR_AND_QUOTA_SYSTEM.md -->

# 11 — COST GOVERNOR AND QUOTA SYSTEM


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## 1. Why this is mandatory

Multi-agent and multi-model systems can become financially dangerous without cost control.

## 2. Cost dimensions

```text
cost per command
cost per model call
cost per tool call
cost per runtime minute
cost per browser session
cost per file processing
cost per instance
daily cap
monthly cap
team cap
```

## 3. Cost gates

```text
estimate before run
warn before expensive run
approval before high-cost run
hard stop at cap
fallback to cheaper model
batch low-priority tasks
defer non-urgent tasks
```

## 4. Contract

```ts
type CostDecision = {
  commandId: string
  computerId: string
  estimatedCost: number
  currentDailySpend: number
  monthlyCap: number
  allowed: boolean
  requiresApproval: boolean
  reason?: string
}
```

## 5. Acceptance criteria

```text
[ ] Every model call logged with cost.
[ ] Every tool call classed by cost.
[ ] User plan has cap.
[ ] Team plan has cap.
[ ] Expensive run approval exists.
```



<!-- FILE: docs/true-ai-computer-os/12_MOBILE_REMOTE_AND_APPROVAL_CENTER.md -->

# 12 — MOBILE REMOTE AND APPROVAL CENTER


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## 1. Mobile Remote purpose

The phone is the control remote for the user's AI Computer.

## 2. Required screens

```text
My AI Computer
Command Bar
Today
Work Queue
Running Jobs
Pending Approvals
Results
Connected Apps
Vault
Memory
Health
Cost
Security
Settings
```

## 3. Approval Center

Approval must show:

```text
what AI wants to do
which account/app
risk level
cost estimate
data used
preview
evidence so far
approve/edit/reject
```

## 4. Push notifications

```text
approval required
job completed
job blocked
quota warning
provider degraded
security alert
calendar reminder
human verification required
```

## 5. Acceptance criteria

```text
[ ] High-risk actions can be approved from phone.
[ ] User can stop a running job.
[ ] User can lock the computer.
[ ] User can revoke connector/session.
```



<!-- FILE: docs/true-ai-computer-os/13_SMART_CALENDAR_AND_WORK_OS.md -->

# 13 — SMART CALENDAR AND WORK OS


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## 1. Not just a calendar

Smart Calendar is the Work OS scheduler.

## 2. It manages

```text
task state
deadline
dependency
priority
calendar sync
daily briefing
weekly report
approval reminder
follow-up automation
running job schedule
retry schedule
```

## 3. Work states

```text
waiting
planning
running
waiting_approval
verifying
completed
blocked
failed
retrying
deferred
```

## 4. Integrations

```text
Google Calendar
Microsoft Outlook
Apple Calendar via CalDAV/ICS
Email
Mobile push
Slack/Teams later
```

## 5. Acceptance criteria

```text
[ ] Commands can create tasks.
[ ] Tasks can schedule AI work.
[ ] Approval reminders exist.
[ ] Daily briefing exists.
[ ] Follow-up tasks generated after work.
```



<!-- FILE: docs/true-ai-computer-os/14_AI_BROWSER_SECURE_RUNTIME.md -->

# 14 — AI BROWSER SECURE RUNTIME


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## 1. AI Browser position

AI Browser is a core Super App and runtime, not a bot.

## 2. Rules

```text
No CAPTCHA bypass.
No anti-bot bypass.
No unauthorized login.
User verification required.
Session vault required.
Approval for publish/send/delete/pay/security.
```

## 3. Required components

```text
user-owned browser profile
session vault
cookie encryption
OAuth tokens
remote user-in-loop CAPTCHA/MFA
screenshot evidence
step replay
domain allowlist
action approval
```

## 4. Browser action classes

```text
read
draft
prepare
publish
send
delete
pay
change_security
```

## 5. Acceptance criteria

```text
[ ] Browser actions are permissioned.
[ ] Session is encrypted.
[ ] CAPTCHA/MFA is user-in-loop.
[ ] Screenshots/evidence stored.
[ ] Sensitive submit requires approval.
```



<!-- FILE: docs/true-ai-computer-os/15_SELF_UPGRADING_KERNEL.md -->

# 15 — SELF-UPGRADING KERNEL


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## 1. Self-upgrade meaning

The AI Computer may propose and prepare upgrades. It must not silently change production.

## 2. Flow

```text
detect repeated workflow
detect missing connector
detect weak agent
propose improvement
generate spec
generate code draft
test in sandbox
security review
ask approval
deploy safely
monitor
rollback
```

## 3. Upgrade levels

| Level | Scope | Approval |
|---|---|---|
| 1 | prompt/template/workflow | log + notify |
| 2 | connector/super app/automation | test + approval |
| 3 | billing/security/database/deploy | admin approval + rollback |

## 4. Acceptance criteria

```text
[ ] Upgrade proposal created.
[ ] Sandbox test exists.
[ ] Rollback exists.
[ ] Admin approval for high-risk upgrades.
```



<!-- FILE: docs/true-ai-computer-os/16_COMPLIANCE_DATA_SOVEREIGNTY_AND_EXPORT.md -->

# 16 — COMPLIANCE, DATA SOVEREIGNTY AND EXPORT


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## 1. Data governance layers

```text
data classification
data residency
cross-border transfer review
export/delete
retention
legal hold
DPIA/TIA workflow
admin approval
incident response
```

## 2. Data classes

```text
public
personal
sensitive
secret
memory
evidence
audit
billing
browser session
credential metadata
```

## 3. Region policy

Each ComputerInstance must know:

```text
home region
allowed processing regions
blocked regions
provider transfer rules
data export rules
legal hold rules
```

## 4. Acceptance criteria

```text
[ ] Every instance has region policy.
[ ] Sensitive data has classification.
[ ] Cross-border transfer workflow exists.
[ ] Export/delete workflow exists.
[ ] Legal hold exists.
```



<!-- FILE: docs/true-ai-computer-os/17_ENTERPRISE_GOVERNANCE_AND_DEDICATED_RUNTIME.md -->

# 17 — ENTERPRISE GOVERNANCE AND DEDICATED RUNTIME


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## 1. Enterprise requirements

```text
SSO
SCIM
role-based policy
admin approval
audit export
dedicated runtime
data residency
BYOK
compliance reports
provider allowlist
connector allowlist
```

## 2. Admin roles

```text
owner
platform_admin
security_admin
billing_admin
developer_admin
support_admin
auditor
```

## 3. Dedicated runtime

Enterprise tenants may require:

```text
dedicated browser runtime
dedicated code sandbox
dedicated storage bucket
dedicated database schema
dedicated provider keys
dedicated audit store
```

## 4. Acceptance criteria

```text
[ ] Enterprise policy object exists.
[ ] Admin roles separated.
[ ] Audit export planned.
[ ] Dedicated runtime plan exists.
```



<!-- FILE: docs/true-ai-computer-os/18_MARKETPLACE_SKILLS_CONNECTORS_AND_WORKFLOWS.md -->

# 18 — MARKETPLACE, SKILLS, CONNECTORS AND WORKFLOWS


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## 1. Registry types

```text
super apps
skills
connectors
agents
workflow templates
tool packs
enterprise packs
```

## 2. Marketplace safety

Every item must define:

```text
publisher
version
permissions
data access
risk class
review status
signature
rollback
audit behavior
```

## 3. Skill contract

```ts
type Skill = {
  skillId: string
  name: string
  version: string
  publisher: string
  permissions: string[]
  requiredTools: string[]
  dataClasses: string[]
  riskClass: "low" | "medium" | "high" | "critical"
  verified: boolean
}
```

## 4. Acceptance criteria

```text
[ ] Registry exists.
[ ] Permissions declared.
[ ] Review state exists.
[ ] High-risk skills blocked by default.
```



<!-- FILE: docs/true-ai-computer-os/19_FLOW_AIAGENT_PAY_VERIFY_TRUST_ECOSYSTEM_BRIDGE.md -->

# 19 — FLOW, AIAGENT, PAY, VERIFY, TRUST ECOSYSTEM BRIDGE


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## 1. Ecosystem position

Computer.iai.one must not duplicate every ecosystem component. It should bridge to:

```text
flow.iai.one — workflow/orchestration layer
aiagent.iai.one — unified AI API/agent provider layer
pay.iai.one — payment orchestration
invoice.iai.one — billing/invoice
verify.iai.one — user/business verification
trust/proof/vc layers — evidence and verifiable proof
```

## 2. Integration rules

```text
Computer owns user instance and work state.
Pay owns payment routing.
Invoice owns invoices.
Verify owns verification status.
AIAgent can provide approved AI provider APIs.
Flow can provide workflow templates/runtime later.
Trust/Proof/VC can verify selected outputs.
```

## 3. Acceptance criteria

```text
[ ] Boundaries documented.
[ ] No duplicated payment logic.
[ ] Verification status is imported, not reinvented.
[ ] AI provider usage can route through approved gateway.
```



<!-- FILE: docs/true-ai-computer-os/20_PRODUCTION_READINESS_GATE_100.md -->

# 20 — PRODUCTION READINESS GATE 100


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## 1. Production-ready gates

```text
Architecture bridge pass
AI Computer Instance OS pass
PostgreSQL pass
Auth/passkey pass
Model Mesh pass
Provider Resilience pass
Tool Kernel pass
Permission Kernel pass
Vault/Memory pass
Runtime Sandbox pass
AI Browser pass
Smart Calendar pass
Verification/Evidence pass
Error Recovery pass
Cost Governor pass
Observability pass
Payment pass
Email/Notification pass
Compliance pass
Backup/Restore pass
Incident Response pass
Security Review pass
```

## 2. Production claim rule

Do not claim:

```text
production-ready
fully secure
enterprise-ready
compliance-ready
self-upgrading
autonomous
```

unless the relevant gate has evidence.

## 3. Required final report

```text
PRODUCTION_READINESS_GATE_100_REPORT.md
```

Must include:

```text
gate status
evidence links
test output
known blockers
risk owner
rollback path
next action
```

## 4. Completion phrase

Only after all gates pass:

```text
PRODUCTION-CANDIDATE READY FOR FINAL SECURITY AND LEGAL REVIEW
```

Not before.



<!-- FILE: docs/model-mesh/MODEL_MESH_PROVIDER_REGISTRY_SPEC.md -->

# MODEL MESH PROVIDER REGISTRY SPEC


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## Provider object

```ts
type Provider = {
  providerId: string
  name: string
  status: "healthy" | "degraded" | "quota_exhausted" | "down" | "disabled"
  supportedLanes: string[]
  regions: string[]
  dataPolicy: "standard" | "sensitive_allowed" | "no_sensitive"
  costPolicy: string
  quotaPolicy: string
}
```

## Model object

```ts
type Model = {
  modelId: string
  providerId: string
  lane: "fast" | "reasoning" | "coding" | "vision" | "speech" | "embedding" | "reranker" | "local" | "byok"
  maxContext?: number
  costClass: "low" | "medium" | "high"
  latencyClass: "low" | "medium" | "high"
  dataSensitivityAllowed: string[]
}
```



<!-- FILE: docs/model-mesh/MODEL_ROUTER_GOVERNOR_SPEC.md -->

# MODEL ROUTER GOVERNOR SPEC


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## Routing inputs

```text
task type
risk level
data sensitivity
language
latency target
cost cap
provider health
quota remaining
user plan
BYOK availability
accuracy requirement
```

## Routing output

```ts
type RoutingDecision = {
  modelId: string
  providerId: string
  fallbackChain: string[]
  costEstimate: number
  riskNotes: string[]
  approvalRequired: boolean
}
```



<!-- FILE: docs/model-mesh/PROVIDER_FAILURE_AND_DEGRADED_MODE_POLICY.md -->

# PROVIDER FAILURE AND DEGRADED MODE POLICY


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## Degraded mode levels

```text
D0 healthy
D1 minor provider errors
D2 provider class degraded
D3 majority provider outage
D4 critical outage / 90% API unavailable
```

## D4 behavior

```text
critical tasks only
queue long jobs
use BYOK/local/cache if available
return partial report
notify honestly
create incident report
```



<!-- FILE: docs/tool-matrix/TOOL_KERNEL_ACTION_PERMISSION_MATRIX.md -->

# TOOL KERNEL ACTION PERMISSION MATRIX


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


| Action | Risk | Approval |
|---|---|---|
| read | low | no |
| draft | low | no |
| prepare | medium | preview |
| write | medium | maybe |
| publish | high | yes |
| send | high | yes |
| delete | critical | yes + passkey |
| pay | critical | yes + passkey |
| deploy | critical | admin |
| change_security | critical | admin/quorum |
| export_data | high/critical | approval |



<!-- FILE: docs/tool-matrix/CONNECTOR_REGISTRY_AND_MCP_GATEWAY_SPEC.md -->

# CONNECTOR REGISTRY AND MCP GATEWAY SPEC


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## Rule

MCP connectors may be used only through a hardened gateway.

## Gateway requirements

```text
connector identity
tool signature
permission policy
sandbox
audit
rate limit
output sanitization
prompt injection defense
```



<!-- FILE: docs/tool-matrix/A2A_AGENT_NETWORK_FUTURE_BRIDGE.md -->

# A2A AGENT NETWORK FUTURE BRIDGE


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## Purpose

Future agent-to-agent coordination must use identity, signing, audit and policy.

## Requirements

```text
agent identity
message signing
capability registry
policy enforcement
audit trail
revocation
tenant isolation
```



<!-- FILE: docs/super-apps/SUPER_APP_REGISTRY_SPEC.md -->

# SUPER APP REGISTRY SPEC


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## Registry fields

```ts
type SuperAppRegistryItem = {
  appId: string
  name: string
  version: string
  requiredTools: string[]
  requiredAgents: string[]
  permissions: string[]
  riskProfile: string
  evidenceSupport: boolean
  offlineSupport: boolean
}
```



<!-- FILE: docs/super-apps/REQUIRED_SUPER_APPS_MVP_TO_ENTERPRISE.md -->

# REQUIRED SUPER APPS MVP TO ENTERPRISE


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## MVP

```text
AI Browser
Smart Calendar
AI Mail
AI Docs
AI Drive
AI Research
AI Evidence Center
AI Security Center
```

## Growth

```text
AI Code
AI Content Studio
AI CRM
AI Finance
AI App Store
```

## Enterprise

```text
Admin Policy Center
Audit Explorer
Compliance Reports
Dedicated Runtime Manager
```



<!-- FILE: docs/super-apps/APP_STORE_SKILL_WORKFLOW_TEMPLATE_POLICY.md -->

# APP STORE SKILL WORKFLOW TEMPLATE POLICY


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## Rules

```text
No unverified high-risk skill.
No secret access without vault permission.
No publish/send/pay/delete without approval.
Every skill declares permissions.
Every workflow has rollback or stop condition.
```



<!-- FILE: docs/error-recovery/ERROR_TAXONOMY_AND_RECOVERY_ACTIONS.md -->

# 10 — ERROR RECOVERY AND SELF-HEALING KERNEL


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## 1. Error Recovery Kernel

This is mandatory for a true AI Computer.

## 2. Error types

```text
model_timeout
model_bad_output
provider_down
quota_exhausted
tool_failed
permission_denied
missing_data
conflicting_data
browser_blocked
auth_expired
captcha_required
rate_limited
file_parse_failed
test_failed
deploy_failed
payment_failed
email_bounced
```

## 3. Recovery actions

| Error | Recovery |
|---|---|
| model_timeout | retry another model |
| quota_exhausted | fallback provider/BYOK |
| tool_failed | try alternative tool |
| auth_expired | request re-auth |
| captcha_required | user-in-loop |
| missing_data | ask user or search source |
| weak_result | reviewer + stronger model |
| test_failed | debug loop |
| deploy_failed | rollback |
| email_bounced | queue retry + notify |
| payment_failed | stop and ask user |

## 4. Self-healing suggestion

The system may propose fixes, but must not silently modify production.

Flow:

```text
detect repeated error
classify root cause
propose fix
generate spec
test in sandbox
request approval
deploy safely
monitor
rollback if needed
```

## 5. Acceptance criteria

```text
[ ] Error classifier exists.
[ ] Retry policy exists.
[ ] Fallback policy exists.
[ ] Partial result policy exists.
[ ] Human handoff exists.
[ ] Incident report exists.
[ ] Root cause analysis template exists.
```



<!-- FILE: docs/error-recovery/SELF_HEALING_INCIDENT_RCA_TEMPLATE.md -->

# SELF-HEALING INCIDENT RCA TEMPLATE


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## Incident

```text
incident_id:
severity:
started_at:
detected_by:
affected_instances:
affected_providers:
```

## Root cause

```text
what failed:
why failed:
was fallback available:
was user impacted:
```

## Recovery

```text
action taken:
rollback:
partial results:
user notification:
```

## Prevention

```text
fix proposal:
test plan:
approval required:
owner:
deadline:
```



<!-- FILE: docs/error-recovery/PARTIAL_RESULT_AND_HUMAN_HANDOFF_POLICY.md -->

# PARTIAL RESULT AND HUMAN HANDOFF POLICY


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## Rule

Never pretend partial success is complete success.

## Partial statuses

```text
partial_completed
blocked
failed_recoverable
failed_requires_user
failed_requires_admin
```

## Human handoff triggers

```text
missing data
auth expired
captcha required
permission conflict
high uncertainty
provider outage
legal/compliance risk
```



<!-- FILE: docs/production-gates/PRODUCTION_GATE_SCORECARD.md -->

# 20 — PRODUCTION READINESS GATE 100


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## 1. Production-ready gates

```text
Architecture bridge pass
AI Computer Instance OS pass
PostgreSQL pass
Auth/passkey pass
Model Mesh pass
Provider Resilience pass
Tool Kernel pass
Permission Kernel pass
Vault/Memory pass
Runtime Sandbox pass
AI Browser pass
Smart Calendar pass
Verification/Evidence pass
Error Recovery pass
Cost Governor pass
Observability pass
Payment pass
Email/Notification pass
Compliance pass
Backup/Restore pass
Incident Response pass
Security Review pass
```

## 2. Production claim rule

Do not claim:

```text
production-ready
fully secure
enterprise-ready
compliance-ready
self-upgrading
autonomous
```

unless the relevant gate has evidence.

## 3. Required final report

```text
PRODUCTION_READINESS_GATE_100_REPORT.md
```

Must include:

```text
gate status
evidence links
test output
known blockers
risk owner
rollback path
next action
```

## 4. Completion phrase

Only after all gates pass:

```text
PRODUCTION-CANDIDATE READY FOR FINAL SECURITY AND LEGAL REVIEW
```

Not before.



<!-- FILE: docs/production-gates/TRUE_AI_COMPUTER_PHASED_EXECUTION_BOARD_2026.md -->

# TRUE AI COMPUTER PHASED EXECUTION BOARD 2026


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## Phase 0 — Stop Wrong Architecture

```text
catalog -> template selector
README realignment
architecture bridge
```

## Phase 1 — Instance OS Core

```text
computer_instances
instance lifecycle
instance health
policy
entitlement
```

## Phase 2 — Command Kernel and Work Matrix

```text
command parser
intent classifier
risk classifier
task planner
work matrix
state machine
```

## Phase 3 — Model Mesh and Provider Resilience

```text
provider registry
model registry
routing
fallback
quota watcher
credit watcher
circuit breaker
BYOK
degraded mode
```

## Phase 4 — Tool Kernel and Connector Registry

```text
tool registry
connector registry
MCP hardened gateway
A2A future bridge
permissioned tools
tool sandbox
```

## Phase 5 — Vault, Memory and Sync

```text
data vault
credential vault
session vault
memory
local sync agent
export/delete
```

## Phase 6 — Super Apps

```text
AI Browser
AI Calendar
AI Mail
AI Docs
AI Drive
AI Research
AI Code
AI Content Studio
AI CRM
AI Evidence Center
AI Security Center
```

## Phase 7 — Runtime Sandbox

```text
browser runtime
code runtime
file runtime
workflow runtime
network policy
resource limit
```

## Phase 8 — Verification, Evidence and Reports

```text
multi-agent verification
evidence pack
final report
confidence score
risk flags
```

## Phase 9 — Error Recovery and Self-Healing

```text
error classifier
retry
fallback
debug loop
rollback
incident report
self-healing proposal
```

## Phase 10 — Mobile Remote and Human Approval

```text
phone command
quick approval
live task monitor
push notification
voice control
security center
```

## Phase 11 — Marketplace and Ecosystem

```text
skill store
connector store
workflow templates
computer-to-computer
flow.iai.one bridge
```

## Phase 12 — Enterprise Production

```text
SSO
SCIM
region policy
BYOK
audit export
admin approval
compliance reports
dedicated runtime
```



<!-- FILE: docs/production-gates/TRUE_AI_COMPUTER_DEFINITION_OF_DONE.md -->

# TRUE AI COMPUTER DEFINITION OF DONE


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## Done means

```text
not just docs
not just UI
not just local build
not just provider call
```

## Done requires

```text
real database
real auth
real instance
real command lifecycle
real provider routing
real fallback
real tool permission
real evidence
real recovery path
real cost tracking
real logs
real approval
real compliance gate
```



<!-- FILE: patches/README_PATCH_TRUE_AI_COMPUTER.md -->

# README PATCH — TRUE AI COMPUTER


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


Replace opening with:

```md
# computer.iai.one

Computer.iai.one is a True AI Computer Operating System.

It is not an AI app, chatbot, product catalog, browser, calendar or automation tool.

Every user owns a private AI Computer Instance with Command Kernel, Planning Kernel, Model Mesh, Tool Kernel, Runtime Sandbox, Data Vault, Memory, Smart Calendar, AI Browser, Super Apps, Permission Kernel, Verification Engine, Evidence Center, Error Recovery, Cost Governor and Self-Upgrading Kernel.

The current catalog layer is only the computer type/template selector used to provision a user's AI Computer Instance.

Status: NOT PRODUCTION-READY.
```



<!-- FILE: patches/TEAM_COMMAND_STOP_BUILDING_APP.md -->

# TEAM COMMAND — STOP BUILDING APP


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


```text
Stop building Computer.iai.one as an app.

Do not continue product-catalog-only architecture.

Do not call it production-ready.

Do not add new surface features before Command Kernel, AI Computer Instance, Model Mesh, Tool Kernel, Runtime Sandbox, Evidence, Error Recovery and Production Gates are specified.

Current catalog work becomes template selector.

Next sprint must implement True AI Computer OS architecture.
```
