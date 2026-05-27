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
