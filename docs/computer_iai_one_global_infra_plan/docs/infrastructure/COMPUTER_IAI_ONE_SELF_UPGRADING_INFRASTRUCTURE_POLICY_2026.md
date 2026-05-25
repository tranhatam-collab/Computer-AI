# COMPUTER.IAI.ONE SELF-UPGRADING INFRASTRUCTURE POLICY 2026

## 1. Mục tiêu

Computer.iai.one có khả năng tự nâng cấp khi người dùng thiếu chức năng. Nhưng self-upgrading chỉ được phép trong khuôn khổ an toàn. AI được tự động xử lý tối đa, nhưng không được tự vượt quyền, tự deploy nguy hiểm hoặc báo cáo sai.

## 2. 3 mức tự nâng cấp

| Level | Phạm vi | Approval |
|---|---|---|
| Level 1 | Prompt, template, workflow, cấu hình nhỏ, UI nhỏ | Auto + log |
| Level 2 | Super App nhỏ, connector, automation, data module | Test + policy approval |
| Level 3 | Billing, permission, security, database, deployment, global promotion | Admin approval bắt buộc |

## 3. Pipeline chuẩn

```text
User Command
→ Detect Missing Capability
→ Create Feature Request
→ Analyze Current Instance
→ Auto Design Module / Super App / Workflow
→ Generate Code / Config / Template
→ Run Tests
→ Security Review
→ Multi-Agent Verification Court
→ Create Upgrade Report
→ Apply To User Instance according to level
→ Notify User
→ Notify Admin
→ Store Learning Pattern
→ Promote To Central Server if approved
```

## 4. Cấm tuyệt đối

```text
AI tự sửa billing production
AI tự đổi quyền admin
AI tự xóa database
AI tự deploy global không approval
AI tự đọc secret thật
AI tự tắt audit log
AI tự tắt rollback
AI tự báo hoàn thành khi chưa có evidence
```

## 5. Upgrade artifacts

Mỗi upgrade phải tạo:

1. Feature request.
2. Design spec.
3. Code diff hoặc config diff.
4. Test result.
5. Security review.
6. Evidence pack.
7. Risk flags.
8. Rollback plan.
9. Admin report.
10. User notification.

## 6. Promotion rule

Một nâng cấp từ user instance chỉ được promote về central server khi:

1. Đã chạy test.
2. Đã qua security review.
3. Không có critical risk.
4. Có evidence pack.
5. Có rollback plan.
6. Có approval nếu Level 2/3.
7. Có version tag.
8. Có changelog tiếng Việt.

## 7. Learning feedback

Self-upgrade được phép học pattern, nhưng phải tránh ghi dữ liệu nhạy cảm. Pattern lưu về central chỉ được chứa:

```text
feature category
module type
anonymous failure/success signals
safe template
test pattern
policy rule improvement
```

Không được lưu:

```text
raw user files
private email
secret
personal data
enterprise confidential content
```

## 8. Upgrade report mẫu

```json
{
  "upgradeId": "upg_001",
  "computerId": "comp_001",
  "requestedFeature": "Tạo công cụ xuất báo cáo PDF tiếng Việt",
  "upgradeLevel": 2,
  "filesCreated": [],
  "filesModified": [],
  "testsRun": [],
  "testResult": "pass",
  "securityResult": "pass",
  "riskLevel": "medium",
  "approvalRequired": true,
  "approvalStatus": "approved",
  "rollbackPlanId": "rb_001",
  "evidencePackId": "ev_001",
  "finalStatus": "applied_to_instance"
}
```

## 9. Checklist hoàn tất

- [ ] UpgradeRequest contract.
- [ ] Upgrade lifecycle states.
- [ ] Upgrade level classifier.
- [ ] Auto design report.
- [ ] Sandbox code generation.
- [ ] Test verification.
- [ ] Security review.
- [ ] Approval board.
- [ ] Rollback plan.
- [ ] Admin email/notification.
- [ ] Promotion policy.
- [ ] Learning feedback redaction.
