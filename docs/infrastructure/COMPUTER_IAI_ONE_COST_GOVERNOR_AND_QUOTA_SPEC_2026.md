# COMPUTER.IAI.ONE — COST GOVERNOR & QUOTA SPEC 2026

**Status:** Architecture approved (not production-ready)

## Why

AI Computer Instances with agents, tools, sandboxes, browser, search, vector DB, model APIs can generate significant cost. Without a cost governor, billing is unpredictable.

## Architecture

```
Cost Governor ──── Per-command estimator
                  ├── Hard daily limit (user)
                  ├── Hard monthly limit (user)
                  ├── Enterprise budget policy (org)
                  ├── Auto-downgrade when threshold exceeded
                  └── User confirmation before expensive tasks (>$1)
```

## Cost Factors

| Resource | Unit | Unit Cost ($) | Free Tier | Personal | Business |
|----------|------|:-------------:|:---------:|:--------:|:--------:|
| Command execution | call | 0.001 | 10/day | 100/day | 1000/day |
| Browser session | min | 0.01 | 5 min | 60 min | 600 min |
| Code execution | min | 0.02 | — | 15 min | 150 min |
| LLM token (fast) | 1K | 0.0015 | 10K | 100K | 1M |
| LLM token (deep) | 1K | 0.003 | — | 50K | 500K |
| Storage | MB/month | 0.01 | 50 MB | 500 MB | 5 GB |
| Vector search | query | 0.001 | 10 | 100 | 1000 |
| GPU inference | min | 0.05 | — | — | By plan |

## Hard Limits

| Tier | Daily Hard Limit | Monthly Hard Limit | Action on Exceed |
|------|:----------------:|:------------------:|------------------|
| Free | $0.10 | $3 | Block + upgrade prompt |
| Personal | $1 | $30 | Block + notify |
| Business | $5 | $150 | Block + admin notification |
| Enterprise | $20 | $600 | Configurable per policy |

## User Confirmation Threshold

Tasks estimated >$1 require explicit user confirmation before execution.
