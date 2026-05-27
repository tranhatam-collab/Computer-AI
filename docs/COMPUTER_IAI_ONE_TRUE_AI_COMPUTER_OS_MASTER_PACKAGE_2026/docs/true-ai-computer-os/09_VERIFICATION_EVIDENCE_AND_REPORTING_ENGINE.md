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
