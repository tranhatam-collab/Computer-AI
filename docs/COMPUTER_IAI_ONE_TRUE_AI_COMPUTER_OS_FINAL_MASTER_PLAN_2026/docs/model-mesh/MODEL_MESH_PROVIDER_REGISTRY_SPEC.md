# MODEL MESH PROVIDER REGISTRY SPEC

> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026  
> Role: Final technical constitution for Computer.iai.one  
> Status: MASTER PLAN READY FOR DEV HANDOFF · NOT PRODUCTION-READY  
> Rule: Do not build Computer.iai.one as an app, chatbot, dashboard, product catalog, or browser automation tool.

```ts
type Provider = {
  providerId: string
  name: string
  status: "healthy" | "degraded" | "quota_exhausted" | "credit_exhausted" | "down" | "disabled"
  supportedLanes: string[]
  regions: string[]
  dataPolicy: "standard" | "sensitive_allowed" | "no_sensitive"
  costPolicy: string
  quotaPolicy: string
}

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
