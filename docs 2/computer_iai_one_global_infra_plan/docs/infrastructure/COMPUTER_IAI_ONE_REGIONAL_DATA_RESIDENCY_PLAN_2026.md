# COMPUTER.IAI.ONE REGIONAL DATA RESIDENCY PLAN 2026

## 1. Mục tiêu

Tài liệu này quy định cách phân vùng dữ liệu để Computer.iai.one chạy toàn cầu mà vẫn kiểm soát dữ liệu cá nhân, dữ liệu doanh nghiệp, dữ liệu nhạy cảm và compliance.

## 2. Nguyên tắc dữ liệu

1. Dữ liệu nhạy cảm phải nằm trong region được gán cho tenant.
2. Không tự động replicate xuyên vùng nếu chưa có policy.
3. Audit và evidence có thể replicate nhưng phải hash, redact và kiểm soát quyền.
4. Enterprise có quyền chọn vùng theo hợp đồng.
5. User có quyền export/delete theo chính sách retention.
6. Secret không được copy sang runtime nếu không cần.

## 3. Region map

| Region ID | Địa lý | Dùng cho |
|---|---|---|
| asia-southeast | Singapore/Tokyo | Việt Nam, Đông Nam Á, Hàn, Nhật |
| us-primary | US West/Central | Mỹ, API provider, developer ecosystem |
| eu-primary | Frankfurt/Amsterdam | EU, GDPR-ready |
| au-primary | Sydney | Úc, New Zealand |
| india-primary | Mumbai | Ấn Độ/Nam Á |
| latam-primary | São Paulo | Nam Mỹ |

## 4. Tenant region binding

Mỗi tenant cần có bản ghi:

```json
{
  "tenantId": "tenant_001",
  "primaryRegion": "asia-southeast",
  "dataResidencyMode": "regional_locked",
  "allowedReplicaRegions": ["asia-southeast-dr"],
  "enterpriseContractRegion": null,
  "crossRegionTransferAllowed": false,
  "retentionPolicyId": "retention_standard_v1"
}
```

## 5. Dữ liệu theo class

| Data class | Lưu ở đâu | Replication |
|---|---|---|
| Public content | Global edge/R2 | Global OK |
| Product catalog | Global + DB | Global OK |
| User profile | Regional DB | Controlled |
| AI Computer Instance | Regional DB | Controlled backup |
| User files | Regional Data Vault | No global copy |
| Memory | Regional DB/vector | No global copy by default |
| Evidence | Regional object + immutable hash | DR copy allowed |
| Audit | Append-only regional + immutable backup | DR copy required |
| Billing metadata | Billing DB/provider | Compliance dependent |
| Secret | KMS/secret vault | Strictly scoped |

## 6. Cross-region transfer policy

Cross-region transfer chỉ được phép khi:

1. User hoặc enterprise policy cho phép.
2. Có lý do kỹ thuật rõ.
3. Có audit event.
4. Có data class xác định.
5. Có encryption.
6. Có TTL hoặc retention rõ.
7. Có admin/security approval nếu dữ liệu nhạy cảm.

## 7. Data retention

| Loại dữ liệu | Retention đề xuất |
|---|---|
| Command metadata | 180 ngày mặc định |
| Command result | Theo plan, 90 ngày đến vĩnh viễn |
| User files | Theo user/plan |
| Evidence | 1 năm mặc định, enterprise tùy hợp đồng |
| Audit security | 1 đến 7 năm tùy compliance |
| Billing records | Theo quy định kế toán/thuế |
| Deleted user data | Grace period 7 đến 30 ngày |

## 8. Delete/export controls

User cần có quyền:

```text
Export profile
Export files
Export memory summary
Export command history
Delete files
Delete memory candidates
Delete account
Request full data deletion
```

Admin không được tự ý xem dữ liệu user nếu không có support workflow và audit.

## 9. Enterprise mode

Enterprise cần thêm:

1. Dedicated region.
2. Dedicated database hoặc schema.
3. Dedicated object bucket.
4. BYOK trong tương lai.
5. SSO/SAML/OIDC.
6. SCIM.
7. Audit export.
8. Contract retention.
9. Legal hold.
10. Data processing agreement.

## 10. Checklist hoàn tất

- [ ] Có `tenant_region_bindings` table.
- [ ] Có data class enum.
- [ ] Có cross-region transfer audit.
- [ ] Có retention policy.
- [ ] Có delete/export API.
- [ ] Có enterprise override policy.
- [ ] Có DR replica policy.
- [ ] Có region routing test.
- [ ] Có privacy/security review.
