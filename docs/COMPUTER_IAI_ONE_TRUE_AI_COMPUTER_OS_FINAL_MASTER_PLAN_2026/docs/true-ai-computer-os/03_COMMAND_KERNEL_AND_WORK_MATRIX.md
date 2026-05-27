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
