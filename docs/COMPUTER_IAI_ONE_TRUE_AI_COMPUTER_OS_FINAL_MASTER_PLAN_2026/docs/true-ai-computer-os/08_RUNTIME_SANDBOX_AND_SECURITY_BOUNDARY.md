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
