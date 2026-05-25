# COMPUTER.IAI.ONE ADMIN GOVERNANCE & APPROVAL MATRIX 2026

## 1. Mục tiêu

Computer.iai.one cho AI chạy việc thật và tự nâng cấp. Vì vậy phải có cơ chế quản trị admin chặt để AI không vượt quyền, không báo cáo sai, không tự deploy nguy hiểm và không lừa admin bằng câu trả lời đẹp nhưng thiếu bằng chứng.

## 2. Admin principles

1. Không có một admin duy nhất có quyền phá toàn hệ.
2. Hành động critical cần two-person approval.
3. Admin không xem dữ liệu user nếu không có lý do và audit.
4. AI không được tự duyệt hành động rủi ro cao.
5. Mọi quyết định admin phải có log.
6. Mọi rollback phải có owner.
7. Mọi production promotion phải có evidence.

## 3. Role matrix

| Role | Quyền chính | Không được làm |
|---|---|---|
| Owner | Quyết định chiến lược, cấp quyền cấp cao | Tự xóa audit/backup |
| Platform Admin | Vận hành platform | Xem secret raw |
| Security Admin | Security policy, incident, audit | Sửa billing |
| Billing Admin | Plan, invoice, quota | Sửa security policy |
| Support Admin | Hỗ trợ user | Xem file user không approval |
| Developer Admin | Deploy/staging/log kỹ thuật | Production critical without approval |
| Compliance Admin | Export report, retention | Sửa runtime |
| Read-only Auditor | Xem log/report | Không write |

## 4. Approval matrix

| Action | Risk | Approval |
|---|---|---|
| Create prompt/template | Low | Auto + log |
| Update UI text | Low | Auto + log |
| Create workflow | Medium | Policy check |
| Create connector | Medium/High | Security review |
| Run code sandbox | High | Policy + log |
| Send email | High | User/admin approval depending context |
| Delete user file | High | User approval |
| Export tenant data | Critical | Security/admin approval |
| Change billing logic | Critical | Two-person approval |
| Rotate master key | Critical | Security + Owner approval |
| Deploy Security Kernel | Critical | Two-person approval |
| Promote self-upgrade global | Critical | Admin review board |
| Disable audit | Forbidden | Not allowed |
| Disable rollback | Forbidden | Not allowed |

## 5. Upgrade Review Board

Self-upgrade Level 2/3 phải qua board logic:

```text
Feature Request
→ Design Report
→ Code Diff
→ Test Result
→ Security Review
→ Evidence Pack
→ Risk Score
→ Rollback Plan
→ Admin Decision
```

Decision states:

```text
approved_for_instance
approved_for_staging
approved_for_global_promotion
rejected
needs_revision
security_blocked
```

## 6. Truthful reporting protocol

AI hoặc agent không được báo:

```text
done
completed
fixed
deployed
production-ready
```

nếu thiếu evidence.

Báo cáo phải ghi rõ:

1. Đã làm gì.
2. File nào tạo.
3. File nào sửa.
4. Test nào chạy.
5. Kết quả test.
6. Security check.
7. Risk flag.
8. Approval status.
9. Rollback plan.
10. Evidence link/hash.
11. Phần chưa làm.

## 7. Admin notifications

Gửi email/notification cho admin khi:

1. Self-upgrade Level 2/3 được tạo.
2. Security risk high/critical.
3. Prompt injection suspected.
4. Command run failed repeatedly.
5. Evidence missing for completed run.
6. Runtime violates policy.
7. Billing anomaly.
8. Backup failed.
9. Deployment failed.
10. Incident SEV1/SEV2.

## 8. Admin console modules

```text
Dashboard
Users/Tenants
AI Computer Instances
Command Runs
Runtime Sessions
Evidence Packs
Approvals
Self-Upgrades
Security Events
Audit Explorer
Billing/Quota
Backup/Restore
Incident Center
Settings/Policies
```

## 9. Checklist hoàn tất

- [ ] Role model.
- [ ] Approval model.
- [ ] Two-person approval for critical actions.
- [ ] Audit all admin actions.
- [ ] Admin notification engine.
- [ ] Truthful reporting enforcement.
- [ ] Upgrade Review Board.
- [ ] Evidence viewer.
- [ ] Rollback center.
- [ ] Incident center.
