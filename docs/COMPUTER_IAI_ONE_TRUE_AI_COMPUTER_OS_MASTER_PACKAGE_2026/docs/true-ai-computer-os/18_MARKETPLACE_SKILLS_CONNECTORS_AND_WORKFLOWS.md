# 18 — MARKETPLACE, SKILLS, CONNECTORS AND WORKFLOWS


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## 1. Registry types

```text
super apps
skills
connectors
agents
workflow templates
tool packs
enterprise packs
```

## 2. Marketplace safety

Every item must define:

```text
publisher
version
permissions
data access
risk class
review status
signature
rollback
audit behavior
```

## 3. Skill contract

```ts
type Skill = {
  skillId: string
  name: string
  version: string
  publisher: string
  permissions: string[]
  requiredTools: string[]
  dataClasses: string[]
  riskClass: "low" | "medium" | "high" | "critical"
  verified: boolean
}
```

## 4. Acceptance criteria

```text
[ ] Registry exists.
[ ] Permissions declared.
[ ] Review state exists.
[ ] High-risk skills blocked by default.
```
