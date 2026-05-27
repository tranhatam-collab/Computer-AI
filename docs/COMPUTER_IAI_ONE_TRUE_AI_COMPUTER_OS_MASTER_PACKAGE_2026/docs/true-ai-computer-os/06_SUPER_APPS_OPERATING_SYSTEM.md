# 06 — SUPER APPS OPERATING SYSTEM


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## 1. Super Apps are not simple apps

Super Apps are coordinated work modules controlled by Command Kernel and Tool Kernel.

## 2. Required Super Apps

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

## 3. Super App contract

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

## 4. Coordination example

Command:

```text
Create a product launch article, publish draft to WordPress, prepare LinkedIn post, schedule follow-up and send me approval.
```

Super Apps involved:

```text
AI Content Studio
AI Browser
AI Docs
AI Calendar
AI Evidence Center
AI Approval Center
```

## 5. Acceptance criteria

```text
[ ] Super Apps register capabilities.
[ ] Super Apps do not bypass permission.
[ ] Super Apps emit evidence.
[ ] Super Apps can be disabled by policy.
```
