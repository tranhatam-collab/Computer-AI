# 06 — SUPER APPS OPERATING SYSTEM

> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026  
> Role: Final technical constitution for Computer.iai.one  
> Status: MASTER PLAN READY FOR DEV HANDOFF · NOT PRODUCTION-READY  
> Rule: Do not build Computer.iai.one as an app, chatbot, dashboard, product catalog, or browser automation tool.

## 1. Required Super Apps

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

## 2. Super App contract

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

## 3. Rule

Super Apps do not bypass Command Kernel, Tool Kernel, Permission Kernel or Evidence Center.
