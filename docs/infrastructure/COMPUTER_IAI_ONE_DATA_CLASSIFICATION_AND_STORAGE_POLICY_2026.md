# COMPUTER.IAI.ONE — DATA CLASSIFICATION & STORAGE POLICY 2026

**Status:** POLICY LOCKED
**Date:** 2026-05-26
**Scope:** All data within computer.iai.one ecosystem

---

## 1. Mục đích

Trước khi tạo bất kỳ database, bucket, hoặc cache nào, phải phân loại dữ liệu. Không được lưu dữ liệu nhạy cảm ở vị trí không phù hợp.

---

## 2. Phân loại dữ liệu

### Class 1: Public

| Thuộc tính | Mô tả |
|-----------|-------|
| Ví dụ | Landing page content, docs, pricing, product catalog, public API schema |
| Nơi lưu | Cloudflare Pages, S3/R2 public bucket, CDN |
| Quy tắc | Global cache, không chứa PII, có thể public read |
| Encryption | Không bắt buộc |
| Retention | Theo version control |

### Class 2: User Private

| Thuộc tính | Mô tả |
|-----------|-------|
| Ví dụ | User files, prompts, command results, computer instance config, memory preferences |
| Nơi lưu | PostgreSQL RDS (primary), S3 private bucket (artifacts) |
| Quy tắc | Region-bound (Singapore cho VN/APAC), per-tenant isolation, encrypted at rest |
| Encryption | AES-256 (RDS), SSE-S3 (S3) |
| Retention | Theo user subscription, xóa sau 30 ngày khi account deleted |

### Class 3: Sensitive

| Thuộc tính | Mô tả |
|-----------|-------|
| Ví dụ | Financial data, legal documents, identity verification, biometrics, health data |
| Nơi lưu | PostgreSQL RDS restricted schema, S3 vault bucket with extra encryption |
| Quy tắc | Encrypted, audit log mandatory, access restricted, legal retention |
| Encryption | AES-256 + per-tenant KMS key |
| Retention | 7 năm cho financial/legal, 1 năm cho operational |
| Access | Admin only, approval required |

### Class 4: Secret

| Thuộc tính | Mô tả |
|-----------|-------|
| Ví dụ | API keys, tokens, JWT signing keys, encryption keys, credentials |
| Nơi lưu | AWS Secrets Manager, HashiCorp Vault (future) |
| Quy tắc | Không log, không prompt, không đưa vào transcript, rotation mandatory |
| Encryption | AWS KMS / Cloudflare Secrets |
| Retention | Theo rotation policy (90 ngày tối đa) |
| Access | Service-only, không human read except emergency break-glass |

### Class 5: Audit

| Thuộc tính | Mô tả |
|-----------|-------|
| Ví dụ | Action logs, evidence packs, command history, approval records, system events |
| Nơi lưu | PostgreSQL (hot) + S3 append-only (cold) |
| Quy tắc | Immutable, append-only, hash chain, region-locked |
| Encryption | AES-256 |
| Retention | 7 năm (legal), 1 năm hot queryable |
| Access | Audit service only, admin read-only |

### Class 6: Billing

| Thuộc tính | Mô tả |
|-----------|-------|
| Ví dụ | Invoices, payment state, usage records, cost ledger |
| Nơi lưu | PostgreSQL billing schema (separated) |
| Quy tắc | Legal retention, không xóa, reconciliation monthly |
| Encryption | AES-256 |
| Retention | 7 năm |
| Access | Billing service + admin only |

### Class 7: Evidence

| Thuộc tính | Mô tả |
|-----------|-------|
| Ví dụ | Proof bundles, verification results, confidence scores, critic agent outputs |
| Nơi lưu | S3 append-only + PostgreSQL metadata |
| Quy tắc | Immutable, hash verified, time-stamped |
| Encryption | SSE-S3 |
| Retention | Theo case/ticket, tối thiểu 2 năm |

### Class 8: Memory

| Thuộc tính | Mô tả |
|-----------|-------|
| Ví dụ | User preferences, conversation history, learned patterns, agent memory |
| Nơi lưu | PostgreSQL (structured) + S3 (embeddings, vectors) |
| Quy tắc | Per-user isolated, có thể export, có thể xóa |
| Encryption | AES-256 |
| Retention | Theo user subscription |

---

## 3. Ma trận lưu trữ

| Data Class | PostgreSQL | Redis | S3 | R2 | KV/D1 | Secrets Manager |
|-----------|:----------:|:-----:|:--:|:--:|:-----:|:---------------:|
| Public | — | cache | ✅ | ✅ | config | — |
| User Private | ✅ | session | ✅ | backup | — | — |
| Sensitive | ✅ restricted | — | ✅ vault | backup | — | — |
| Secret | — | — | — | — | — | ✅ |
| Audit | ✅ hot | — | ✅ cold | — | — | — |
| Billing | ✅ separated | — | backup | — | — | — |
| Evidence | metadata | — | ✅ | — | — | — |
| Memory | ✅ | cache | ✅ | — | — | — |

---

## 4. Quy tắc bắt buộc

1. **Không lưu Secret trong env vars** — dùng Secrets Manager
2. **Không lưu Sensitive trong KV/D1** — dùng PostgreSQL + encryption
3. **Không log Secret hoặc Sensitive** — log chỉ chứa reference ID
4. **Audit log cho mọi truy cập Sensitive** — ai, khi nào, tại sao
5. **Backup encrypted trước khi rời region** — không plaintext cross-region
6. **User có quyền export và xóa data của mình** — GDPR/VN PDP readiness
7. **Data deletion phải soft delete + hard delete sau 30 ngày** — recovery window

---

## 5. Kiểm tra tuân thủ

Trước mỗi deploy:

- [ ] Kiểm tra không có PII trong logs
- [ ] Kiểm tra không có secret trong code
- [ ] Kiểm tra encryption at rest cho mọi data class >= User Private
- [ ] Kiểm tra audit log capture đầy đủ
- [ ] Kiểm tra backup policy đúng retention

---

*Policy locked. Violation = stop deploy.*
