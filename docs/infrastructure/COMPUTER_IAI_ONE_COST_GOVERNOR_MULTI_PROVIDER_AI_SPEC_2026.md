# COMPUTER.IAI.ONE — COST GOVERNOR & MULTI-PROVIDER AI SPEC 2026

**Status:** SPEC LOCKED
**Date:** 2026-05-26
**Scope:** AI provider management and cost control for computer.iai.one

---

## 1. Mục đích

Multi-agent + multi-provider = rủi ro sốc chi phí cao. Cost Governor là module bắt buộc, không phải tùy chọn.

---

## 2. AI Provider Registry

### Phase 1 (Tháng 1-3)

| Provider | Model | Role | Priority |
|----------|-------|------|----------|
| OpenAI | GPT-4o | Primary reasoning, general tasks | 1 |
| OpenAI | GPT-4o-mini | Fast tasks, classification | 2 |
| Anthropic | Claude 3.5 Sonnet | Fallback, long context, safety | 3 |
| Anthropic | Claude 3 Haiku | Fast fallback | 4 |

### Phase 2 (Tháng 4-6)

| Provider | Model | Role | Priority |
|----------|-------|------|----------|
| AWS Bedrock | Claude 3 (via AWS) | Enterprise, compliance | 5 |
| AWS Bedrock | Llama 3 | Cost-sensitive batch | 6 |

### Phase 3 (Tháng 6+)

| Provider | Model | Role | Priority |
|----------|-------|------|----------|
| Self-hosted | Ollama/LM Studio | Sensitive data, offline | 7 |
| Self-hosted | vLLM | High-volume internal | 8 |

---

## 3. Circuit Breaker & Fallback

### Logic

```
Request ──> OpenAI (primary)
    │
    ├─ Timeout (>10s) ──> Anthropic (fallback)
    ├─ Rate limit ──> Anthropic (fallback)
    ├─ Error (>3 retries) ──> Anthropic (fallback)
    ├─ Cost exceed ──> cheaper model (4o-mini / Haiku)
    └─ All fail ──> Queue for retry + notify user
```

### Health Check

| Metric | Threshold | Action |
|--------|-----------|--------|
| Latency p95 | >5s | Switch provider |
| Error rate | >5% | Switch provider |
| Cost/command | >$1 | Require approval |
| Daily cost/user | >$5 | Hard stop |
| Monthly cost/user | >$30 | Hard stop + notify |

---

## 4. Cost Governor Architecture

### Per-layer limits

| Layer | Metric | Limit | Action on exceed |
|-------|--------|-------|------------------|
| Per command | Max cost | $1 | Require approval |
| Per agent | Daily cost | $5 | Stop + notify |
| Per computer instance | Daily cost | $10 | Stop + notify |
| Per user | Daily cost | $15 | Hard stop |
| Per user | Monthly cost | $50 | Hard stop + upgrade prompt |
| Per provider | Daily cost | $200 (global) | Switch provider |
| Global | Daily cost | $1000 | Emergency stop |

### Cost tracking

| Thành phần | Input tokens | Output tokens | Duration | Model | Provider | Cost |
|-----------|:----------:|:-------------:|:--------:|:-----:|:--------:|:----:|
| Command | 1500 | 800 | — | GPT-4o | OpenAI | $0.045 |
| Agent run | 5000 | 2000 | — | Claude 3.5 | Anthropic | $0.12 |
| Browser session | — | — | 5 min | — | OpenAI | $0.05 |
| Code execution | — | — | 2 min | — | Anthropic | $0.04 |

### Cost per computer instance economics

| Instance type | Mô tả | Chi phí/tháng ước tính |
|--------------|-------|------------------------|
| Inactive | Không chạy, chỉ storage | ~$0 |
| Warm | Ready, ít tác vụ | ~$5-10 |
| Active (Personal) | Check-in, flow, agent | ~$15-30 |
| Creator/Business | Nhiều agent, browser, code | ~$50-100 |
| Enterprise | Isolated, compliance, GPU | ~$200-500 |

---

## 5. User Confirmation Threshold

| Task type | Estimated cost | Yêu cầu |
|-----------|---------------|--------|
| < $0.10 | Low | Auto-run |
| $0.10 - $1.00 | Medium | Log only |
| $1.00 - $5.00 | High | Mobile push approval |
| > $5.00 | Critical | Mobile push + biometric + time-delay (5 min) |

---

## 6. Multi-provider AI integration

### OpenAI Agents SDK (Primary)

```typescript
// Primary agent setup
const agent = new Agent({
  model: 'gpt-4o',
  instructions: '...',
  tools: [tool1, tool2],
  tracing: true,
  guardrails: ['no_pii', 'no_secret'],
});
```

### Fallback wrapper

```typescript
async function runWithFallback(request: AgentRequest): Promise<AgentResult> {
  // Try primary
  try {
    return await openAIAgent.run(request);
  } catch (e) {
    logProviderFailure('openai', e);
  }

  // Try fallback
  try {
    return await anthropicAgent.run(request);
  } catch (e) {
    logProviderFailure('anthropic', e);
  }

  // Queue for retry
  await queueForRetry(request);
  throw new Error('All providers failed. Request queued.');
}
```

### Model selection by task

| Task | Primary | Fallback | Reason |
|------|---------|----------|--------|
| General reasoning | GPT-4o | Claude 3.5 | Speed vs depth |
| Long context (>100K) | Claude 3.5 | GPT-4o | Claude context window |
| Code generation | GPT-4o | Claude 3.5 | GPT-4o coding strong |
| Safety-critical | Claude 3.5 | GPT-4o | Anthropic safety |
| Fast classification | GPT-4o-mini | Claude 3 Haiku | Cost + speed |
| Vietnamese content | GPT-4o | Claude 3.5 | OpenAI Vietnamese tốt hơn |

---

## 7. Monitoring & Alerting

| Metric | Threshold | Alert channel |
|--------|-----------|---------------|
| Cost/user/day > $10 | Warning | Email |
| Cost/user/day > $15 | Critical | Mobile push + email |
| Provider latency > 5s | Warning | Slack/Discord |
| Provider error rate > 5% | Critical | Mobile push |
| Global daily > $500 | Warning | Admin email |
| Global daily > $1000 | Critical | Mobile push + emergency |

---

## 8. Cost optimization tactics

| Tactic | Mô tả | Tiết kiệm ước tính |
|--------|-------|-------------------|
| Model tiering | Simple task → cheaper model | 60-80% |
| Caching | Cache frequent prompts | 20-30% |
| Batch processing | Gom nhiều request | 15-25% |
| Streaming | Không đợi full response nếu không cần | 10-20% |
| Self-hosted lane | Sensitive data chạy local | 50-70% (sau setup) |
| Prompt compression | Rút gọn prompt | 10-15% |

---

## 9. Billing integration

```
AI Usage ──> Cost Governor ──> Usage Ledger ──> Billing Service
                │
                ├─ Daily cap check
                ├─ Monthly cap check
                ├─ Provider health check
                └─ User approval gate
```

**Usage Ledger fields:**
- userId, computerInstanceId, commandId, runId
- provider, model, inputTokens, outputTokens
- duration, cost, timestamp
- approvedBy (nếu vượt ngưỡng)

---

*Spec locked. Cost Governor is non-negotiable.*
