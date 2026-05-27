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
