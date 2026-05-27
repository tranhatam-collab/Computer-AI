# SUPER APP REGISTRY SPEC


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## Registry fields

```ts
type SuperAppRegistryItem = {
  appId: string
  name: string
  version: string
  requiredTools: string[]
  requiredAgents: string[]
  permissions: string[]
  riskProfile: string
  evidenceSupport: boolean
  offlineSupport: boolean
}
```
