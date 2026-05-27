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
