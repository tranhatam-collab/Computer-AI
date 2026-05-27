# B8 — OBSERVABILITY AND INCIDENT RESPONSE PLAN


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## 1. Required trace fields

```text
trace_id
request_id
tenant_id
user_id
computer_id
command_id
run_id
run_step_id
agent_id
tool_call_id
model_call_id
provider_id
evidence_id
cost_id
incident_id
```

## 2. Dashboards

```text
API health
Command runs
AI provider health
Cost dashboard
Payment/webhook dashboard
Email delivery
Database health
Queue health
Browser runtime health
Security events
Compliance events
Incident center
```

## 3. Incident levels

```text
SEV0: security breach/data exposure
SEV1: payment/auth outage
SEV2: core command/runtime outage
SEV3: degraded provider/email
SEV4: minor UI/API issue
```

## 4. Acceptance criteria

```text
[ ] Trace ID everywhere.
[ ] Error logs structured.
[ ] Metrics visible.
[ ] Alerts configured.
[ ] Incident runbook exists.
[ ] Postmortem template exists.
```
