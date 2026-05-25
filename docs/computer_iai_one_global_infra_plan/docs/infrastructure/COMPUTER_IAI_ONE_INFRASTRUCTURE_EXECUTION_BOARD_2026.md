# COMPUTER.IAI.ONE INFRASTRUCTURE EXECUTION BOARD 2026

## 1. Mục tiêu

Execution board này chuyển kế hoạch hạ tầng thành danh sách việc dev/infra/security có thể triển khai theo thứ tự.

## 2. Phase 0 — Repo realignment

| ID | Task | DoD | Priority |
|---|---|---|---|
| P0-01 | Update README định vị đúng | README không còn gọi là catalog đơn thuần | High |
| P0-02 | Update pnpm-workspace | Có computer-os, super-apps, agents | High |
| P0-03 | Add infrastructure docs | 7+ docs trong docs/infrastructure | High |
| P0-04 | Add contracts package plan | Contracts list rõ | High |
| P0-05 | Verify build hiện tại | `pnpm run verify` chạy được hoặc ghi blocker | High |

## 3. Phase 1 — Global edge foundation

| ID | Task | DoD | Priority |
|---|---|---|---|
| P1-01 | Cloudflare DNS setup | Domain/subdomain mapped | High |
| P1-02 | TLS/HSTS | HTTPS enforced | High |
| P1-03 | WAF baseline | Managed rules enabled | High |
| P1-04 | Rate limiting | API protected | High |
| P1-05 | Bot protection | Basic bot control | Medium |
| P1-06 | Status page | Public/internal status | Medium |

## 4. Phase 2 — API gateway and region routing

| ID | Task | DoD | Priority |
|---|---|---|---|
| P2-01 | API gateway shell | `/api/*` unified | High |
| P2-02 | Trace ID middleware | Every request has trace | High |
| P2-03 | Auth middleware | User identity available | High |
| P2-04 | Tenant middleware | tenant_id required | High |
| P2-05 | Region router | region selected by policy | High |
| P2-06 | Error normalization | Standard error schema | Medium |

## 5. Phase 3 — Data and instance layer

| ID | Task | DoD | Priority |
|---|---|---|---|
| P3-01 | ComputerInstance schema | Contract + DB migration | High |
| P3-02 | CommandRun schema | Contract + DB migration | High |
| P3-03 | DataVault schema | Contract + storage binding | High |
| P3-04 | Memory schema | Basic memory store | Medium |
| P3-05 | EvidencePack schema | Evidence generated per run | High |
| P3-06 | AuditEvent schema | Append-only events | High |

## 6. Phase 4 — Security kernel

| ID | Task | DoD | Priority |
|---|---|---|---|
| P4-01 | PolicyDecision contract | Every risky action checked | High |
| P4-02 | Tool permission matrix | Tool rights defined | High |
| P4-03 | Secret vault abstraction | No raw secret to agent | High |
| P4-04 | ApprovalRequest flow | Approval states | High |
| P4-05 | Prompt injection flags | Risk detection events | Medium |
| P4-06 | Admin access protection | Zero Trust/SSO policy | High |

## 7. Phase 5 — Runtime sandbox

| ID | Task | DoD | Priority |
|---|---|---|---|
| P5-01 | RuntimeClass enum | Classes defined | High |
| P5-02 | File sandbox | Isolated file workspace | High |
| P5-03 | Code sandbox | Safe test execution | High |
| P5-04 | Browser sandbox | Isolated browser use | Medium |
| P5-05 | Runtime evidence logs | Runtime action captured | High |
| P5-06 | Runtime kill switch | Stop run safely | High |

## 8. Phase 6 — Self-upgrading kernel

| ID | Task | DoD | Priority |
|---|---|---|---|
| P6-01 | UpgradeRequest schema | Request lifecycle | High |
| P6-02 | Feature detection | Missing capability recorded | Medium |
| P6-03 | Auto design report | Spec generated | Medium |
| P6-04 | Code generation sandbox | Code created in sandbox | High |
| P6-05 | Test verification | Test run evidence | High |
| P6-06 | Upgrade approval board | Level 2/3 approval | High |
| P6-07 | Rollback plan | Required for every upgrade | High |

## 9. Phase 7 — Observability and incident

| ID | Task | DoD | Priority |
|---|---|---|---|
| P7-01 | Logs centralized | Queryable logs | High |
| P7-02 | Metrics dashboard | API/runtime/security | High |
| P7-03 | Alerts | Critical alerts | High |
| P7-04 | Incident runbook | SEV process | High |
| P7-05 | Postmortem template | Standard template | Medium |
| P7-06 | Cost dashboard | AI/runtime cost tracked | Medium |

## 10. Phase 8 — Backup and production gates

| ID | Task | DoD | Priority |
|---|---|---|---|
| P8-01 | DB backup | PITR or snapshot | High |
| P8-02 | Object versioning | File rollback | High |
| P8-03 | Audit immutable backup | Audit protected | High |
| P8-04 | Restore drill | Evidence of restore | High |
| P8-05 | Production readiness gate | Checklist enforced | High |
| P8-06 | DR simulation | Failover tested | Medium |

## 11. Final status allowed

```text
GLOBAL INFRASTRUCTURE ARCHITECTURE READY
SECURITY MODEL DEFINED
NOT PRODUCTION-READY UNTIL VERIFIED
```
