# SUPER APP REGISTRY SPEC

> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026  
> Role: Final technical constitution for Computer.iai.one  
> Status: MASTER PLAN READY FOR DEV HANDOFF · NOT PRODUCTION-READY  
> Rule: Do not build Computer.iai.one as an app, chatbot, dashboard, product catalog, or browser automation tool.

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
