# MODEL MESH PROVIDER REGISTRY SPEC


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## Provider object

```ts
type Provider = {
  providerId: string
  name: string
  status: "healthy" | "degraded" | "quota_exhausted" | "down" | "disabled"
  supportedLanes: string[]
  regions: string[]
  dataPolicy: "standard" | "sensitive_allowed" | "no_sensitive"
  costPolicy: string
  quotaPolicy: string
}
```

## Model object

```ts
type Model = {
  modelId: string
  providerId: string
  lane: "fast" | "reasoning" | "coding" | "vision" | "speech" | "embedding" | "reranker" | "local" | "byok"
  maxContext?: number
  costClass: "low" | "medium" | "high"
  latencyClass: "low" | "medium" | "high"
  dataSensitivityAllowed: string[]
}
```
