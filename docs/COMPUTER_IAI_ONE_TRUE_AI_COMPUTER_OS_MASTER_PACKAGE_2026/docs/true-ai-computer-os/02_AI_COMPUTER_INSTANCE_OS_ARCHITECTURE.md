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
