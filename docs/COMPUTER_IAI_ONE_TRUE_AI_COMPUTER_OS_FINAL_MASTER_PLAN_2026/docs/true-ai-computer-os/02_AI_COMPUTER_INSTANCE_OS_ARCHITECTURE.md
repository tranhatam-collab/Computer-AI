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
