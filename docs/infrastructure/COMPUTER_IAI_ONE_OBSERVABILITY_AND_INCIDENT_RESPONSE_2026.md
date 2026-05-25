# COMPUTER.IAI.ONE — OBSERVABILITY & INCIDENT RESPONSE 2026

**Status:** Architecture approved (not production-ready)

## Observability Stack

- **Metrics**: Cloudflare Analytics + OpenTelemetry
- **Logs**: Structured JSON logging, all services
- **Traces**: OpenTelemetry distributed tracing (trace_id throughout)
- **Alerts**: PagerDuty / Slack webhook per severity

## Key Metrics

| Metric | Source | Target |
|--------|--------|--------|
| API latency p95 | Edge | <200ms |
| Command execution p95 | Runtime | <30s |
| Instance provisioning | Control | <5s |
| Uptime (control plane) | Monitoring | 99.9% |
| Uptime (user instance) | Monitoring | 99.5% |

## Incident Severity

| Sev | Definition | Response Time | Notify |
|-----|-----------|---------------|--------|
| P1 | Data breach or total outage | 5 min | All-hands |
| P2 | Feature outage, degraded performance | 15 min | Dev team |
| P3 | Single-user issue, non-critical | 2h | On-call |
| P4 | Cosmetic, documentation, minor | Next business day | Report |

## Incident Response

1. Detect (alert or user report)
2. Triage (severity, affected scope)
3. Contain (freeze instance, route traffic, rollback)
4. Investigate (trace_id + audit logs)
5. Resolve (fix + deploy)
6. Post-mortem (within 48h for P1/P2)
7. Update runbook
