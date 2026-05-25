# FINAL 100 PERCENT INFRASTRUCTURE CHECKLIST

## A. Vision and repo

- [ ] README đã đổi định vị thành Hệ Máy Tính AI Cá Nhân Tự Nâng Cấp Có Kiểm Chứng.
- [ ] Không còn mô tả dự án chỉ là app/chatbot/catalog.
- [ ] `pnpm-workspace.yaml` có `computer-os/*`, `super-apps/*`, `agents/*`, `infrastructure/*`.
- [ ] Docs hạ tầng đã nằm trong `docs/infrastructure/`.
- [ ] `pnpm run verify` đã chạy hoặc ghi rõ blocker.

## B. Global edge

- [ ] DNS chuẩn.
- [ ] TLS/HSTS.
- [ ] CDN.
- [ ] WAF.
- [ ] DDoS protection.
- [ ] Rate limiting.
- [ ] Bot protection.
- [ ] Status page.

## C. Regional control

- [ ] Có region map.
- [ ] Có tenant region binding.
- [ ] Có region routing.
- [ ] Có data residency policy.
- [ ] Có cross-region transfer audit.

## D. API gateway

- [ ] Auth middleware.
- [ ] Tenant middleware.
- [ ] Region router.
- [ ] Policy pre-check.
- [ ] Rate limiter.
- [ ] Error normalization.
- [ ] Trace ID.
- [ ] Audit writer.

## E. Data layer

- [ ] PostgreSQL hoặc production DB decision.
- [ ] ComputerInstance schema.
- [ ] CommandRun schema.
- [ ] EvidencePack schema.
- [ ] AuditEvent schema.
- [ ] DataVault storage.
- [ ] Memory store.
- [ ] Vector store.
- [ ] Billing store.

## F. Security kernel

- [ ] Passkeys/MFA plan.
- [ ] Device binding.
- [ ] Secret vault.
- [ ] Tool permission matrix.
- [ ] Prompt injection defense.
- [ ] Approval gates.
- [ ] Admin Zero Trust Access.
- [ ] Security event logs.

## G. Runtime sandbox

- [ ] Runtime classes.
- [ ] File sandbox.
- [ ] Code sandbox.
- [ ] Browser sandbox.
- [ ] Network policy.
- [ ] Resource limits.
- [ ] Runtime evidence.
- [ ] Kill switch.

## H. Self-upgrading

- [ ] UpgradeRequest schema.
- [ ] 3 upgrade levels.
- [ ] Feature request engine.
- [ ] Auto design report.
- [ ] Code generation sandbox.
- [ ] Test verification.
- [ ] Security review.
- [ ] Upgrade approval board.
- [ ] Rollback plan.
- [ ] Admin notification.
- [ ] Central promotion policy.

## I. Observability

- [ ] Central logs.
- [ ] Metrics.
- [ ] Traces.
- [ ] Security dashboard.
- [ ] Evidence dashboard.
- [ ] Command run dashboard.
- [ ] Runtime dashboard.
- [ ] Cost dashboard.
- [ ] Alerts.
- [ ] Incident runbook.

## J. Backup / DR

- [ ] Database backup.
- [ ] PITR.
- [ ] Object versioning.
- [ ] Immutable audit backup.
- [ ] Cross-region backup.
- [ ] Restore drill.
- [ ] Failover plan.
- [ ] Rollback per command.
- [ ] Rollback per deployment.
- [ ] Rollback per self-upgrade.

## K. Production gate

Chỉ được báo production-ready khi tất cả đã có bằng chứng:

- [ ] Real AI provider.
- [ ] Production database.
- [ ] Auth/passkeys.
- [ ] Payment gateway.
- [ ] Email delivery.
- [ ] Admin console.
- [ ] CI/CD.
- [ ] Observability.
- [ ] Backup restore test.
- [ ] Security review.
- [ ] Load test.
- [ ] Incident drill.

## Final allowed status before production verification

```text
GLOBAL INFRASTRUCTURE ARCHITECTURE READY
SECURITY MODEL DEFINED
NOT PRODUCTION-READY UNTIL VERIFIED
```
