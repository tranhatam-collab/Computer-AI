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
