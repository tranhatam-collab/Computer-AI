# B3 — AI PROVIDER WIRING PLAN


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## 1. Decision

Computer.iai.one must not call AI models directly from UI. All model calls go through an AI Provider Gateway.

## 2. Providers

Phase 1:

```text
OpenAI
Anthropic
```

Future:

```text
Google
AWS Bedrock
Local/open-weight models
BYOK enterprise providers
```

## 3. Required gateway features

```text
Provider routing
Fallback
Circuit breaker
Health check
Rate limiting
Cost governor
Prompt logging policy
PII redaction policy
No secret in prompt
Model capability registry
Per-tenant quota
Per-instance quota
```

## 4. Secrets

```text
OPENAI_API_KEY
ANTHROPIC_API_KEY
GOOGLE_API_KEY
AWS_BEDROCK_ROLE_ARN
AI_GATEWAY_SIGNING_SECRET
```

Secrets must be stored in environment/secret manager, never in repo.

## 5. Acceptance criteria

```text
[ ] AI calls do not originate from frontend.
[ ] Provider health check exists.
[ ] Provider fallback exists.
[ ] Costs are logged.
[ ] Run ID is attached to every model call.
[ ] Secrets never appear in logs or prompts.
```
