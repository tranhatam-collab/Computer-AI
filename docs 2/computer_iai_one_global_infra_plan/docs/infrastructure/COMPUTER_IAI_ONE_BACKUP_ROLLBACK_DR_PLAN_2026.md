# COMPUTER.IAI.ONE BACKUP, ROLLBACK & DISASTER RECOVERY PLAN 2026

## 1. Mục tiêu

Computer.iai.one là hệ máy tính AI cá nhân hóa. Nếu mất dữ liệu, chạy sai lệnh, agent tự nâng cấp lỗi hoặc production hỏng, hệ thống phải phục hồi được. Backup và rollback không phải phần phụ, mà là điều kiện để cho phép AI chạy việc thật.

## 2. RPO/RTO đề xuất

| Data/System | RPO | RTO |
|---|---:|---:|
| Identity | 5 phút | 30 phút |
| Billing | 5 phút | 30 phút |
| AI Computer Instance | 15 phút | 1 giờ |
| Command logs | 15 phút | 1 giờ |
| User files | 1 giờ | 4 giờ |
| Memory | 1 giờ | 4 giờ |
| Evidence | 15 phút | 1 giờ |
| Audit logs | Gần real-time | 1 giờ |
| Public web | 0 | 15 phút |
| Admin console | 30 phút | 2 giờ |

## 3. Backup classes

| Class | Nội dung | Cách backup |
|---|---|---|
| Database backup | Identity, instance, command, billing | PITR + daily snapshot |
| Object backup | Files, artifacts, evidence | Versioning + lifecycle |
| Audit backup | Security/audit events | Immutable append-only |
| Config backup | Policy, routing, env config | Git + encrypted backup |
| Secret backup | KMS/secret metadata | Provider-managed, rotation plan |
| Deployment backup | Release versions | Tagged release + rollback |

## 4. Rollback theo cấp

### 4.1 Command rollback

Khi một command tạo hoặc sửa artifact:

```text
Before snapshot
Action log
After snapshot
Diff summary
Rollback action
Rollback verification
```

### 4.2 Self-upgrade rollback

Mỗi upgrade phải có:

```text
upgrade_id
previous_version
new_version
files_changed
migration_plan
rollback_plan
test_before
test_after
admin_approval
```

### 4.3 Deployment rollback

Production deploy phải có:

1. Version tag.
2. Migration plan.
3. Backward compatibility check.
4. Health check.
5. Canary/gradual rollout nếu có.
6. Automatic rollback trigger.
7. Manual rollback command.

## 5. Disaster scenarios

| Sự cố | Phản ứng |
|---|---|
| Region outage | Failover đọc/khôi phục sang DR region |
| Database corruption | PITR restore |
| Agent xóa nhầm file | File version rollback |
| Self-upgrade lỗi | Rollback upgrade version |
| Secret leak | Rotate key, revoke token, audit blast radius |
| Prompt injection incident | Freeze run, revoke tool, review evidence |
| Payment webhook lỗi | Replay webhook + reconcile ledger |
| Audit store lỗi | Restore immutable backup |

## 6. DR runbook tối thiểu

```text
1. Declare incident.
2. Assign incident commander.
3. Freeze risky automations if needed.
4. Identify affected tenant/region/service.
5. Stop further damage.
6. Preserve evidence.
7. Restore from backup or rollback.
8. Verify integrity.
9. Notify internal admin.
10. Notify affected users if required.
11. Write postmortem.
12. Update prevention controls.
```

## 7. Backup verification

Backup chưa được xem là đạt nếu chưa restore test. Lịch đề xuất:

| Test | Tần suất |
|---|---|
| Database restore drill | Hàng tháng |
| Object restore sample | Hàng tháng |
| Audit restore | Hàng quý |
| Region failover simulation | Hàng quý |
| Self-upgrade rollback test | Mỗi release lớn |
| Incident tabletop | Hàng quý |

## 8. Checklist hoàn tất

- [ ] PITR cho database.
- [ ] Object storage versioning.
- [ ] Immutable audit backup.
- [ ] Cross-region backup policy.
- [ ] Rollback per command.
- [ ] Rollback per deployment.
- [ ] Rollback per self-upgrade.
- [ ] Restore drill evidence.
- [ ] DR runbook.
- [ ] Incident postmortem template.
