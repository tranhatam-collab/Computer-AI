# COMPUTER.IAI.ONE OBSERVABILITY & INCIDENT RESPONSE 2026

## 1. Mục tiêu

Không thể vận hành AI Computer toàn cầu nếu không biết lệnh nào đang chạy, agent nào đang gọi tool, runtime nào lỗi, vùng nào chậm, chi phí nào tăng, output nào thiếu evidence và hành động nào có rủi ro.

Tài liệu này khóa observability và incident response cho Computer.iai.one.

## 2. Trace ID bắt buộc

Mỗi request/run phải có chuỗi định danh:

```text
request_id
trace_id
user_id
tenant_id
computer_id
command_id
run_id
region_id
runtime_id
agent_id
tool_call_id
evidence_id
```

## 3. Log categories

| Log | Nội dung |
|---|---|
| Access log | Request, IP, user, device |
| Auth log | Login, MFA, passkey, token |
| Command log | Lifecycle command run |
| Agent log | Agent decision, handoff, error |
| Tool log | Tool called, params redacted, result |
| Runtime log | CPU, RAM, timeout, sandbox events |
| Security log | Risk, injection, denied action |
| Audit log | Admin/user/system action |
| Billing log | Usage, quota, invoice, webhook |
| Evidence log | Output proof, tests, hashes |

## 4. Metrics cần đo

| Metric | Mục tiêu |
|---|---|
| API latency p50/p95/p99 | Hiệu năng gateway |
| Error rate | Độ ổn định |
| Command completion time | Trải nghiệm user |
| Agent failure rate | Chất lượng agent |
| Tool denial rate | Policy health |
| Sandbox timeout rate | Runtime sizing |
| Prompt injection flags | Security health |
| Evidence missing rate | Truthful reporting health |
| Approval pending time | Admin bottleneck |
| Cost per command | Unit economics |
| Token/provider spend | Cost control |

## 5. Dashboards bắt buộc

1. Global Traffic Dashboard.
2. API Health Dashboard.
3. Region Health Dashboard.
4. Command Runs Dashboard.
5. Agent Runs Dashboard.
6. Runtime Sandbox Dashboard.
7. Security Events Dashboard.
8. Prompt Injection Dashboard.
9. Evidence Dashboard.
10. Admin Approval Dashboard.
11. Billing & Quota Dashboard.
12. Cost Dashboard.
13. Incident Dashboard.
14. Backup/Restore Dashboard.

## 6. Alerts

| Alert | Ngưỡng gợi ý |
|---|---|
| API error spike | 5xx > 2% trong 5 phút |
| Region latency | p95 tăng > 2x baseline |
| Command stuck | Run quá SLA |
| Sandbox timeout | > 5% run timeout |
| Evidence missing | Bất kỳ completed run thiếu evidence |
| Security denied spike | Tăng bất thường |
| Prompt injection spike | Tăng bất thường |
| Cost spike | Chi phí tăng > 30% ngày |
| Backup failed | Bất kỳ job backup critical fail |
| Admin action critical | Real-time notification |

## 7. Incident severity

| Severity | Ví dụ | Response |
|---|---|---|
| SEV1 | Data leak, production outage, billing/security compromised | Immediate war room |
| SEV2 | Region degraded, command runs failing broadly | Same-day fix |
| SEV3 | Module bug, limited tenant impact | Planned fix |
| SEV4 | Minor UI/docs issue | Backlog |

## 8. Incident workflow

```text
Detect
→ Triage
→ Assign severity
→ Freeze risky automation if needed
→ Contain
→ Preserve evidence
→ Fix or rollback
→ Verify
→ Communicate
→ Postmortem
→ Prevent recurrence
```

## 9. Postmortem template

```md
# Incident Postmortem

## Summary
## Timeline
## Impact
## Root Cause
## Detection
## Response
## What Worked
## What Failed
## Data/Security Assessment
## User Communication
## Corrective Actions
## Owner
## Due Dates
## Evidence Links
```

## 10. Checklist hoàn tất

- [ ] Trace ID end-to-end.
- [ ] Centralized logging.
- [ ] Redaction of secrets/PII.
- [ ] Metrics dashboard.
- [ ] Security dashboard.
- [ ] Cost dashboard.
- [ ] Evidence dashboard.
- [ ] Alerts.
- [ ] Incident runbook.
- [ ] Postmortem template.
