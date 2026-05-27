<!-- FILE: README.md -->

# COMPUTER.IAI.ONE TRUE AI COMPUTER OS FINAL MASTER PLAN 2026

> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026  
> Role: Final technical constitution for Computer.iai.one  
> Status: MASTER PLAN READY FOR DEV HANDOFF · NOT PRODUCTION-READY  
> Rule: Do not build Computer.iai.one as an app, chatbot, dashboard, product catalog, or browser automation tool.

## 1. Final product definition

Computer.iai.one là **AI Computer Operating System**, nơi mỗi user sở hữu một **AI Computer Instance** riêng, có:

```text
Model Mesh
Tool Kernel
Super Apps
Data Vault
Memory
Smart Calendar
AI Browser
Verification Engine
Evidence Center
Error Recovery
Cost Governor
Self-Upgrading Kernel
Production Gates
```

## 2. Forbidden positioning

Team dev không được gọi Computer.iai.one là:

```text
app
chatbot
dashboard
product catalog
browser automation tool
calendar app
workflow automation app
```

## 3. Correct positioning

```text
Computer.iai.one is a resilient AI Computer Operating System where each user owns an AI Computer Instance that can plan, execute, verify, recover, report and improve across many models, tools, runtimes and workspaces.
```

## 4. Package purpose

Bộ này là **hiến pháp kỹ thuật cuối cùng** để team dev dừng hướng sai và build lại đúng chuẩn AI Computer OS.

## 5. Apply status

Sau khi áp dụng bộ tài liệu này, chỉ được báo:

```text
TRUE AI COMPUTER OS MASTER PLAN APPLIED
AI COMPUTER INSTANCE ARCHITECTURE LOCKED
MODEL MESH AND TOOL KERNEL DEFINED
PRODUCTION GATES DEFINED
NOT PRODUCTION-READY
```



<!-- FILE: docs/true-ai-computer-os/00_MASTER_VISION_AND_NON_NEGOTIABLES.md -->

# 00 — MASTER VISION AND NON NEGOTIABLES

> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026  
> Role: Final technical constitution for Computer.iai.one  
> Status: MASTER PLAN READY FOR DEV HANDOFF · NOT PRODUCTION-READY  
> Rule: Do not build Computer.iai.one as an app, chatbot, dashboard, product catalog, or browser automation tool.

## 1. Single sentence definition

```text
Computer.iai.one is an AI Computer Operating System where every user owns a private AI Computer Instance with Model Mesh, Tool Kernel, Super Apps, Vault, Memory, Smart Calendar, AI Browser, Verification Engine, Evidence Center, Error Recovery and Cost Governor.
```

## 2. Non-negotiables

```text
Do not build an app.
Do not build a chatbot.
Do not build a dashboard.
Do not build a product catalog.
Do not build a browser automation tool.
Do not process commands as raw chat.
Do not depend on one model, one API, one provider, one cloud or one workflow.
Do not let AI perform sensitive actions without permission, sandbox, approval and audit.
Do not report done without evidence.
```

## 3. Correct operating philosophy

```text
A model answers.
An agent performs a task.
Computer.iai.one coordinates many models, agents, tools, runtimes, workspaces, permissions, evidence, recovery paths and user-owned data to complete real work safely.
```

## 4. 100 percent operational design

No system can promise zero error. The correct target is controlled resilience:

```text
If one model fails, route to another.
If providers degrade, reduce scope.
If quota is exhausted, switch provider, BYOK, queue, or ask user.
If data is missing, ask user.
If action is risky, request approval.
If output is uncertain, verify.
If job fails, report truthfully with recovery plan.
```



<!-- FILE: docs/true-ai-computer-os/01_NORMAL_COMPUTER_VS_AI_COMPUTER.md -->

# 01 — NORMAL COMPUTER VS AI COMPUTER

> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026  
> Role: Final technical constitution for Computer.iai.one  
> Status: MASTER PLAN READY FOR DEV HANDOFF · NOT PRODUCTION-READY  
> Rule: Do not build Computer.iai.one as an app, chatbot, dashboard, product catalog, or browser automation tool.

## 1. Normal computer

A normal computer executes user operations.

```text
The human thinks.
The human opens apps.
The human clicks.
The human types.
The human checks.
The human saves.
The human sends.
The human remembers.
```

## 2. AI Computer

An AI Computer coordinates outcomes.

```text
The user gives a goal.
The system classifies intent.
The system plans work.
The system selects models.
The system chooses tools.
The system asks for approval when needed.
The system executes safely.
The system verifies.
The system reports with evidence.
The system recovers from failure.
```

## 3. Core difference

```text
Normal computer = operation machine.
AI Computer = outcome coordination machine.
```

## 4. Dev meaning

Do not build UI-only surfaces. Build the operating layer that turns goals into controlled, evidence-backed work.



<!-- FILE: docs/true-ai-computer-os/02_AI_COMPUTER_INSTANCE_OS_ARCHITECTURE.md -->

# 02 — AI COMPUTER INSTANCE OS ARCHITECTURE

> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026  
> Role: Final technical constitution for Computer.iai.one  
> Status: MASTER PLAN READY FOR DEV HANDOFF · NOT PRODUCTION-READY  
> Rule: Do not build Computer.iai.one as an app, chatbot, dashboard, product catalog, or browser automation tool.

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
Model Mesh
↓
Tool Kernel
↓
Runtime Sandbox
↓
Verification Engine
↓
Evidence Center
↓
Report + Next Action
```

## 2. AI Computer Instance object

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
  "agents": ["planner", "executor", "reviewer", "security", "evidence"]
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

## 5. Acceptance criteria

```text
Every user workflow resolves to computer_id.
Every run has computer_id.
Every model call has computer_id.
Every evidence pack has computer_id.
Every compliance rule has region + computer_id.
```



<!-- FILE: docs/true-ai-computer-os/03_COMMAND_KERNEL_AND_WORK_MATRIX.md -->

# 03 — COMMAND KERNEL AND WORK MATRIX

> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026  
> Role: Final technical constitution for Computer.iai.one  
> Status: MASTER PLAN READY FOR DEV HANDOFF · NOT PRODUCTION-READY  
> Rule: Do not build Computer.iai.one as an app, chatbot, dashboard, product catalog, or browser automation tool.

## 1. Command is not chat

Every command becomes a job.

Example:

```text
Kiểm tra repo, tạo checklist cho dev, viết báo cáo cho nhà đầu tư, tạo email draft, nhưng chưa gửi nếu tôi chưa duyệt.
```

Command Kernel output:

```json
{
  "intent": "repo_review_and_investor_reporting",
  "jobType": "multi_step",
  "riskLevel": "medium",
  "toolsRequired": ["github", "file", "report", "email_draft"],
  "approvalRequired": true,
  "outputRequired": ["repo_gap_report", "dev_checklist", "investor_report", "email_draft", "evidence_pack"]
}
```

## 2. Work Matrix dimensions

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

## 4. Action matrix

| Work | Risk | Tool | Agent | Approval |
|---|---|---|---|---|
| Summarize file | Low | File reader | Document agent | No |
| Draft email | Low | Email draft | Writer | No |
| Send email | Medium | Email send | Mail agent | Yes |
| Publish social | Medium | Browser/API | Social agent | Yes |
| Edit code | Medium | Repo/terminal | Code agent | Maybe |
| Deploy | High | CI/CD | DevOps agent | Admin |
| Payment | Critical | Payment | Finance agent | High approval |
| Delete data | Critical | Storage | Security agent | High approval |



<!-- FILE: docs/true-ai-computer-os/04_MODEL_MESH_AND_PROVIDER_RESILIENCE.md -->

# 04 — MODEL MESH AND PROVIDER RESILIENCE

> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026  
> Role: Final technical constitution for Computer.iai.one  
> Status: MASTER PLAN READY FOR DEV HANDOFF · NOT PRODUCTION-READY  
> Rule: Do not build Computer.iai.one as an app, chatbot, dashboard, product catalog, or browser automation tool.

## 1. Decision

Computer.iai.one must use Model Mesh, not a single model.

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

## 4. Router considers

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
Primary provider
Fallback 1: same lane provider
Fallback 2: different strong provider
Fallback 3: cheaper/open model
Fallback 4: local/BYOK
Fallback 5: queue retry
Fallback 6: human handoff with partial report
```

## 6. API failure policy

### 10 percent failure

```text
auto retry
route around provider
log warning
no user disruption
```

### 50 percent failure

```text
disable weak providers
use priority queue
reduce agent count
switch to cheaper/faster models
ask approval for heavy jobs
```

### 90 percent failure

```text
enter degraded mode
critical tasks only
use BYOK/local/cache if available
queue long jobs
return partial report
schedule retry
notify user honestly
```

## 7. Quota exhausted

```text
mark provider quota_exhausted
do not retry blindly
switch provider
switch BYOK
switch included fallback model
ask user to add key or upgrade
```



<!-- FILE: docs/true-ai-computer-os/05_TOOL_KERNEL_AND_CONNECTOR_REGISTRY.md -->

# 05 — TOOL KERNEL AND CONNECTOR REGISTRY

> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026  
> Role: Final technical constitution for Computer.iai.one  
> Status: MASTER PLAN READY FOR DEV HANDOFF · NOT PRODUCTION-READY  
> Rule: Do not build Computer.iai.one as an app, chatbot, dashboard, product catalog, or browser automation tool.

## 1. Decision

AI must not call tools directly.

Every tool call goes through:

```text
Tool Registry
Permission Kernel
Policy Check
Sandbox
Audit
Evidence
```

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

## 3. Action classes

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

## 4. MCP hardened gateway

MCP can be used only behind a hardened gateway.

```text
No direct model-to-sensitive-tool access.
No untrusted MCP server without sandbox.
Tool descriptions must be trusted/signed.
Tool outputs are untrusted until verified.
Every MCP call has audit.
```

## 5. A2A future bridge

Agent-to-agent coordination must include:

```text
agent identity
message signing
capability registry
policy enforcement
audit trail
tenant isolation
revocation
```



<!-- FILE: docs/true-ai-computer-os/06_SUPER_APPS_OPERATING_SYSTEM.md -->

# 06 — SUPER APPS OPERATING SYSTEM

> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026  
> Role: Final technical constitution for Computer.iai.one  
> Status: MASTER PLAN READY FOR DEV HANDOFF · NOT PRODUCTION-READY  
> Rule: Do not build Computer.iai.one as an app, chatbot, dashboard, product catalog, or browser automation tool.

## 1. Required Super Apps

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

## 2. Super App contract

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

## 3. Rule

Super Apps do not bypass Command Kernel, Tool Kernel, Permission Kernel or Evidence Center.



<!-- FILE: docs/true-ai-computer-os/07_VAULT_MEMORY_AND_LOCAL_SYNC.md -->

# 07 — VAULT, MEMORY AND LOCAL SYNC

> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026  
> Role: Final technical constitution for Computer.iai.one  
> Status: MASTER PLAN READY FOR DEV HANDOFF · NOT PRODUCTION-READY  
> Rule: Do not build Computer.iai.one as an app, chatbot, dashboard, product catalog, or browser automation tool.

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

Memory is not chat history.

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

## 3. Local Sync Agent

A true AI Computer cannot be cloud-only.

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

## 4. Privacy rule

```text
Do not read the whole machine. User selects folders, apps or data scopes.
```



<!-- FILE: docs/true-ai-computer-os/08_RUNTIME_SANDBOX_AND_SECURITY_BOUNDARY.md -->

# 08 — RUNTIME SANDBOX AND SECURITY BOUNDARY

> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026  
> Role: Final technical constitution for Computer.iai.one  
> Status: MASTER PLAN READY FOR DEV HANDOFF · NOT PRODUCTION-READY  
> Rule: Do not build Computer.iai.one as an app, chatbot, dashboard, product catalog, or browser automation tool.

## 1. Sandbox types

```text
code sandbox
browser sandbox
file sandbox
network sandbox
AI tool sandbox
self-upgrade sandbox
```

## 2. Forbidden direct access

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

## 3. Runtime policy

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



<!-- FILE: docs/true-ai-computer-os/09_VERIFICATION_EVIDENCE_AND_REPORTING_ENGINE.md -->

# 09 — VERIFICATION, EVIDENCE AND REPORTING ENGINE

> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026  
> Role: Final technical constitution for Computer.iai.one  
> Status: MASTER PLAN READY FOR DEV HANDOFF · NOT PRODUCTION-READY  
> Rule: Do not build Computer.iai.one as an app, chatbot, dashboard, product catalog, or browser automation tool.

## 1. Verification lanes

```text
reviewer agent
fact-check agent
security agent
policy agent
evidence agent
cost agent
```

## 2. Evidence Pack

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

## 3. Rule

```text
Do not report done unless evidence exists.
```

## 4. Final statuses

```text
completed
completed_with_warnings
partial_completed
blocked
failed_recoverable
failed_requires_user
failed_requires_admin
```



<!-- FILE: docs/true-ai-computer-os/10_ERROR_RECOVERY_AND_SELF_HEALING_KERNEL.md -->

# 10 — ERROR RECOVERY AND SELF HEALING KERNEL

> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026  
> Role: Final technical constitution for Computer.iai.one  
> Status: MASTER PLAN READY FOR DEV HANDOFF · NOT PRODUCTION-READY  
> Rule: Do not build Computer.iai.one as an app, chatbot, dashboard, product catalog, or browser automation tool.

## 1. Error types

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

## 2. Recovery actions

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

## 3. Self-healing flow

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



<!-- FILE: docs/true-ai-computer-os/11_COST_GOVERNOR_AND_QUOTA_SYSTEM.md -->

# 11 — COST GOVERNOR AND QUOTA SYSTEM

> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026  
> Role: Final technical constitution for Computer.iai.one  
> Status: MASTER PLAN READY FOR DEV HANDOFF · NOT PRODUCTION-READY  
> Rule: Do not build Computer.iai.one as an app, chatbot, dashboard, product catalog, or browser automation tool.

## 1. Why required

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



<!-- FILE: docs/true-ai-computer-os/12_MOBILE_REMOTE_AND_APPROVAL_CENTER.md -->

# 12 — MOBILE REMOTE AND APPROVAL CENTER

> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026  
> Role: Final technical constitution for Computer.iai.one  
> Status: MASTER PLAN READY FOR DEV HANDOFF · NOT PRODUCTION-READY  
> Rule: Do not build Computer.iai.one as an app, chatbot, dashboard, product catalog, or browser automation tool.

## 1. Mobile Remote

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

## 3. Approval screen

Must show:

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



<!-- FILE: docs/true-ai-computer-os/13_SMART_CALENDAR_AND_WORK_OS.md -->

# 13 — SMART CALENDAR AND WORK OS

> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026  
> Role: Final technical constitution for Computer.iai.one  
> Status: MASTER PLAN READY FOR DEV HANDOFF · NOT PRODUCTION-READY  
> Rule: Do not build Computer.iai.one as an app, chatbot, dashboard, product catalog, or browser automation tool.

## 1. Smart Calendar is Work OS

It manages:

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

## 2. Work states

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

## 3. Integrations

```text
Google Calendar
Microsoft Outlook
Apple Calendar via CalDAV/ICS
Email
Mobile push
Slack/Teams later
```



<!-- FILE: docs/true-ai-computer-os/14_AI_BROWSER_SECURE_RUNTIME.md -->

# 14 — AI BROWSER SECURE RUNTIME

> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026  
> Role: Final technical constitution for Computer.iai.one  
> Status: MASTER PLAN READY FOR DEV HANDOFF · NOT PRODUCTION-READY  
> Rule: Do not build Computer.iai.one as an app, chatbot, dashboard, product catalog, or browser automation tool.

## 1. Rules

```text
No CAPTCHA bypass.
No anti-bot bypass.
No unauthorized login.
User verification required.
Session vault required.
Approval for publish/send/delete/pay/security.
```

## 2. Required components

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



<!-- FILE: docs/true-ai-computer-os/15_SELF_UPGRADING_KERNEL.md -->

# 15 — SELF UPGRADING KERNEL

> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026  
> Role: Final technical constitution for Computer.iai.one  
> Status: MASTER PLAN READY FOR DEV HANDOFF · NOT PRODUCTION-READY  
> Rule: Do not build Computer.iai.one as an app, chatbot, dashboard, product catalog, or browser automation tool.

## 1. Meaning

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



<!-- FILE: docs/true-ai-computer-os/16_COMPLIANCE_DATA_SOVEREIGNTY_AND_EXPORT.md -->

# 16 — COMPLIANCE, DATA SOVEREIGNTY AND EXPORT

> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026  
> Role: Final technical constitution for Computer.iai.one  
> Status: MASTER PLAN READY FOR DEV HANDOFF · NOT PRODUCTION-READY  
> Rule: Do not build Computer.iai.one as an app, chatbot, dashboard, product catalog, or browser automation tool.

## 1. Governance layers

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



<!-- FILE: docs/true-ai-computer-os/17_ENTERPRISE_GOVERNANCE_AND_DEDICATED_RUNTIME.md -->

# 17 — ENTERPRISE GOVERNANCE AND DEDICATED RUNTIME

> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026  
> Role: Final technical constitution for Computer.iai.one  
> Status: MASTER PLAN READY FOR DEV HANDOFF · NOT PRODUCTION-READY  
> Rule: Do not build Computer.iai.one as an app, chatbot, dashboard, product catalog, or browser automation tool.

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

## 2. Dedicated runtime

Enterprise tenants may require:

```text
dedicated browser runtime
dedicated code sandbox
dedicated storage bucket
dedicated database schema
dedicated provider keys
dedicated audit store
```



<!-- FILE: docs/true-ai-computer-os/18_MARKETPLACE_SKILLS_CONNECTORS_AND_WORKFLOWS.md -->

# 18 — MARKETPLACE, SKILLS, CONNECTORS AND WORKFLOWS

> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026  
> Role: Final technical constitution for Computer.iai.one  
> Status: MASTER PLAN READY FOR DEV HANDOFF · NOT PRODUCTION-READY  
> Rule: Do not build Computer.iai.one as an app, chatbot, dashboard, product catalog, or browser automation tool.

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



<!-- FILE: docs/true-ai-computer-os/19_FLOW_AIAGENT_PAY_VERIFY_TRUST_ECOSYSTEM_BRIDGE.md -->

# 19 — FLOW, AIAGENT, PAY, VERIFY, TRUST ECOSYSTEM BRIDGE

> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026  
> Role: Final technical constitution for Computer.iai.one  
> Status: MASTER PLAN READY FOR DEV HANDOFF · NOT PRODUCTION-READY  
> Rule: Do not build Computer.iai.one as an app, chatbot, dashboard, product catalog, or browser automation tool.

## 1. Ecosystem position

Computer.iai.one should bridge to:

```text
flow.iai.one — workflow/orchestration layer
aiagent.iai.one — unified AI API/agent provider layer
pay.iai.one — payment orchestration
invoice.iai.one — billing/invoice
verify.iai.one — user/business verification
trust/proof/vc layers — evidence and verifiable proof
```

## 2. Boundary rules

```text
Computer owns user instance and work state.
Pay owns payment routing.
Invoice owns invoices.
Verify owns verification status.
AIAgent can provide approved AI provider APIs.
Flow can provide workflow templates/runtime later.
Trust/Proof/VC can verify selected outputs.
```



<!-- FILE: docs/true-ai-computer-os/20_PRODUCTION_READINESS_GATE_100.md -->

# 20 — PRODUCTION READINESS GATE 100

> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026  
> Role: Final technical constitution for Computer.iai.one  
> Status: MASTER PLAN READY FOR DEV HANDOFF · NOT PRODUCTION-READY  
> Rule: Do not build Computer.iai.one as an app, chatbot, dashboard, product catalog, or browser automation tool.

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



<!-- FILE: docs/true-ai-computer-os/21_MARKET_COMPARISON_AND_USER_SEGMENT_ANALYSIS.md -->

# 21 — MARKET COMPARISON AND USER SEGMENT ANALYSIS

> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026  
> Role: Final technical constitution for Computer.iai.one  
> Status: MASTER PLAN READY FOR DEV HANDOFF · NOT PRODUCTION-READY  
> Rule: Do not build Computer.iai.one as an app, chatbot, dashboard, product catalog, or browser automation tool.

## 1. Category position

Computer.iai.one should not compete as a chatbot, browser, agent builder, or productivity app.

Correct category:

```text
Personal AI Computer Operating System
```

## 2. Competitor groups

| Group | Examples | Computer.iai.one differentiation |
|---|---|---|
| AI chat platforms | ChatGPT, Claude, Gemini | Full AI Computer Instance, not chat |
| Coding agents | Cursor, Claude Code, Copilot | Code is one Super App, not whole product |
| Autonomous agents | Manus, OpenClaw-like tools | Stronger governance, evidence, recovery, user-owned instance |
| Enterprise agents | Salesforce Agentforce, ServiceNow agents | Broader personal-to-enterprise AI Computer OS |
| Automation tools | Zapier, Make | Goal-driven Work Matrix + Model Mesh + Evidence |
| AI browsers | Comet/Atlas-like direction | Browser is one runtime, not full OS |

## 3. User segments

```text
Founders and CEOs
Creators and writers
SMEs
Developers
Consultants
Educators
Agencies
Enterprise teams
Vietnamese-first global users
```

## 4. Wedge

Start with:

```text
AI Business Computer
AI Creator Computer
AI Research Computer
```



<!-- FILE: docs/true-ai-computer-os/22_GO_TO_MARKET_AND_PRICING_STRATEGY.md -->

# 22 — GO TO MARKET AND PRICING STRATEGY

> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026  
> Role: Final technical constitution for Computer.iai.one  
> Status: MASTER PLAN READY FOR DEV HANDOFF · NOT PRODUCTION-READY  
> Rule: Do not build Computer.iai.one as an app, chatbot, dashboard, product catalog, or browser automation tool.

## 1. Sell computer instances, not tokens

Do not sell:

```text
AI token package
chat subscription
tool bundle
```

Sell:

```text
AI Computer Instance
```

## 2. Pricing lanes

| Plan | Target | Suggested price |
|---|---|---:|
| Free Computer | trial | 0 |
| Personal Computer | individual | 9–19 USD/month |
| Creator Computer | creator/writer | 19–39 USD/month |
| Business Computer | founder/SME | 39–99 USD/month |
| Code Computer | developer | 29–99 USD/month |
| Team Computer | small team | 299–999 USD/month |
| Enterprise Dedicated | enterprise | custom |

## 3. Add-ons

```text
extra model runtime
extra storage
extra verified reports
enterprise data residency
dedicated sandbox
custom connector
BYOK
workflow packs
training/onboarding
```



<!-- FILE: docs/true-ai-computer-os/23_TEAM_COMMAND_STOP_BUILDING_APP.md -->

# 23 — TEAM COMMAND: STOP BUILDING APP

> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026  
> Role: Final technical constitution for Computer.iai.one  
> Status: MASTER PLAN READY FOR DEV HANDOFF · NOT PRODUCTION-READY  
> Rule: Do not build Computer.iai.one as an app, chatbot, dashboard, product catalog, or browser automation tool.

## Command

```text
Stop building Computer.iai.one as an app.

Do not continue product-catalog-only architecture.

Do not call it production-ready.

Do not add new surface features before Command Kernel, AI Computer Instance, Model Mesh, Tool Kernel, Runtime Sandbox, Evidence, Error Recovery, Cost Governor and Production Gates are specified.

Current catalog work becomes template selector.

Next sprint must implement True AI Computer OS architecture.
```



<!-- FILE: docs/true-ai-computer-os/24_REPO_REALIGNMENT_EXECUTION_BOARD.md -->

# 24 — REPO REALIGNMENT EXECUTION BOARD

> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026  
> Role: Final technical constitution for Computer.iai.one  
> Status: MASTER PLAN READY FOR DEV HANDOFF · NOT PRODUCTION-READY  
> Rule: Do not build Computer.iai.one as an app, chatbot, dashboard, product catalog, or browser automation tool.

## Phase 0 — Stop wrong architecture

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



<!-- FILE: docs/model-mesh/MODEL_MESH_PROVIDER_REGISTRY_SPEC.md -->

# MODEL MESH PROVIDER REGISTRY SPEC

> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026  
> Role: Final technical constitution for Computer.iai.one  
> Status: MASTER PLAN READY FOR DEV HANDOFF · NOT PRODUCTION-READY  
> Rule: Do not build Computer.iai.one as an app, chatbot, dashboard, product catalog, or browser automation tool.

```ts
type Provider = {
  providerId: string
  name: string
  status: "healthy" | "degraded" | "quota_exhausted" | "credit_exhausted" | "down" | "disabled"
  supportedLanes: string[]
  regions: string[]
  dataPolicy: "standard" | "sensitive_allowed" | "no_sensitive"
  costPolicy: string
  quotaPolicy: string
}

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



<!-- FILE: docs/tool-kernel/TOOL_KERNEL_PERMISSION_MATRIX.md -->

# TOOL KERNEL PERMISSION MATRIX

> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026  
> Role: Final technical constitution for Computer.iai.one  
> Status: MASTER PLAN READY FOR DEV HANDOFF · NOT PRODUCTION-READY  
> Rule: Do not build Computer.iai.one as an app, chatbot, dashboard, product catalog, or browser automation tool.

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



<!-- FILE: docs/super-apps/SUPER_APP_REGISTRY_SPEC.md -->

# SUPER APP REGISTRY SPEC

> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026  
> Role: Final technical constitution for Computer.iai.one  
> Status: MASTER PLAN READY FOR DEV HANDOFF · NOT PRODUCTION-READY  
> Rule: Do not build Computer.iai.one as an app, chatbot, dashboard, product catalog, or browser automation tool.

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



<!-- FILE: docs/error-recovery/ERROR_TAXONOMY_AND_RECOVERY_ACTIONS.md -->

# 10 — ERROR RECOVERY AND SELF HEALING KERNEL

> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026  
> Role: Final technical constitution for Computer.iai.one  
> Status: MASTER PLAN READY FOR DEV HANDOFF · NOT PRODUCTION-READY  
> Rule: Do not build Computer.iai.one as an app, chatbot, dashboard, product catalog, or browser automation tool.

## 1. Error types

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

## 2. Recovery actions

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

## 3. Self-healing flow

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



<!-- FILE: docs/market-analysis/MARKET_SEGMENTS_AND_POSITIONING_SUMMARY.md -->

# 21 — MARKET COMPARISON AND USER SEGMENT ANALYSIS

> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026  
> Role: Final technical constitution for Computer.iai.one  
> Status: MASTER PLAN READY FOR DEV HANDOFF · NOT PRODUCTION-READY  
> Rule: Do not build Computer.iai.one as an app, chatbot, dashboard, product catalog, or browser automation tool.

## 1. Category position

Computer.iai.one should not compete as a chatbot, browser, agent builder, or productivity app.

Correct category:

```text
Personal AI Computer Operating System
```

## 2. Competitor groups

| Group | Examples | Computer.iai.one differentiation |
|---|---|---|
| AI chat platforms | ChatGPT, Claude, Gemini | Full AI Computer Instance, not chat |
| Coding agents | Cursor, Claude Code, Copilot | Code is one Super App, not whole product |
| Autonomous agents | Manus, OpenClaw-like tools | Stronger governance, evidence, recovery, user-owned instance |
| Enterprise agents | Salesforce Agentforce, ServiceNow agents | Broader personal-to-enterprise AI Computer OS |
| Automation tools | Zapier, Make | Goal-driven Work Matrix + Model Mesh + Evidence |
| AI browsers | Comet/Atlas-like direction | Browser is one runtime, not full OS |

## 3. User segments

```text
Founders and CEOs
Creators and writers
SMEs
Developers
Consultants
Educators
Agencies
Enterprise teams
Vietnamese-first global users
```

## 4. Wedge

Start with:

```text
AI Business Computer
AI Creator Computer
AI Research Computer
```



<!-- FILE: docs/production-gates/PRODUCTION_GATE_SCORECARD.md -->

# 20 — PRODUCTION READINESS GATE 100

> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026  
> Role: Final technical constitution for Computer.iai.one  
> Status: MASTER PLAN READY FOR DEV HANDOFF · NOT PRODUCTION-READY  
> Rule: Do not build Computer.iai.one as an app, chatbot, dashboard, product catalog, or browser automation tool.

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



<!-- FILE: README_PATCH_TRUE_AI_COMPUTER.md -->

# README PATCH TRUE AI COMPUTER

> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026  
> Role: Final technical constitution for Computer.iai.one  
> Status: MASTER PLAN READY FOR DEV HANDOFF · NOT PRODUCTION-READY  
> Rule: Do not build Computer.iai.one as an app, chatbot, dashboard, product catalog, or browser automation tool.

Replace repo opening with:

```md
# computer.iai.one

Computer.iai.one is a True AI Computer Operating System.

It is not an AI app, chatbot, dashboard, product catalog, browser, calendar or automation tool.

Every user owns a private AI Computer Instance with Model Mesh, Tool Kernel, Super Apps, Data Vault, Memory, Smart Calendar, AI Browser, Verification Engine, Evidence Center, Error Recovery, Cost Governor and Self-Upgrading Kernel.

The current catalog layer is only the computer type/template selector used to provision a user's AI Computer Instance.

Status: NOT PRODUCTION-READY.
```



<!-- FILE: TEAM_COMMAND.md -->

# TEAM COMMAND

> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026  
> Role: Final technical constitution for Computer.iai.one  
> Status: MASTER PLAN READY FOR DEV HANDOFF · NOT PRODUCTION-READY  
> Rule: Do not build Computer.iai.one as an app, chatbot, dashboard, product catalog, or browser automation tool.

```text
Stop building Computer.iai.one as an app, chatbot, dashboard, product catalog or browser automation tool.

Computer.iai.one must become a True AI Computer Operating System.

Current repo catalog work becomes template selector only.

Next sprint must implement AI Computer Instance architecture, Command Kernel, Model Mesh, Tool Kernel, Super Apps, Runtime Sandbox, Evidence, Error Recovery, Cost Governor and Production Gates.

Do not claim production-ready.
Do not touch secrets.
Do not deploy from this package.
Do not modify payment logic from this package.
```

Allowed final status:

```text
TRUE AI COMPUTER OS MASTER PLAN APPLIED
AI COMPUTER INSTANCE ARCHITECTURE LOCKED
MODEL MESH AND TOOL KERNEL DEFINED
PRODUCTION GATES DEFINED
NOT PRODUCTION-READY
```
