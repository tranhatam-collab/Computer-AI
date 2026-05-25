# COMPUTER.IAI.ONE ZERO TRUST SECURITY ARCHITECTURE 2026

## 1. Mục tiêu

Tài liệu này khóa hệ thống bảo mật cho Computer.iai.one theo nguyên tắc zero-trust, least privilege, tenant isolation, secure-by-default, audit-first và rollback-ready.

Không dùng câu “bảo mật tuyệt đối”. Không có hệ thống nào bất khả xâm phạm. Cách nói đúng là: hệ thống được thiết kế để giảm rủi ro, cô lập vùng ảnh hưởng, phát hiện sớm, ghi bằng chứng, phục hồi nhanh và ngăn AI vượt quyền.

## 2. Zero-trust principles

1. Không tin mặc định bất kỳ user, device, service, agent hoặc network nào.
2. Mọi request phải được xác thực và ủy quyền.
3. Mọi quyền phải tối thiểu theo nhu cầu.
4. Mọi hành động nhạy cảm phải có approval hoặc step-up auth.
5. Mọi tool call phải có policy decision.
6. Mọi runtime phải bị giới hạn tài nguyên và quyền.
7. Mọi output quan trọng phải có evidence.
8. Mọi sự kiện bảo mật phải có audit.

## 3. 12 lớp bảo mật bắt buộc

### Lớp 1: Edge protection

```text
DNSSEC
TLS 1.3
HSTS
WAF managed rules
Custom firewall rules
DDoS protection
Bot score
Rate limiting
Geo controls
IP reputation
```

### Lớp 2: Zero Trust Access

```text
Admin console → Zero Trust Access
Internal tools → Identity-aware access
Database → private network only
SSH → no public IP
Sensitive API → service token / mTLS / signed request
```

### Lớp 3: Identity security

```text
Passkeys-first
MFA fallback
Device binding
Session rotation
Sensitive action re-auth
Admin step-up authentication
Organization SSO
SCIM for enterprise
```

### Lớp 4: Tenant isolation

Mọi bản ghi phải có:

```text
tenant_id
computer_id
owner_id
region_id
policy_id
```

Không có `tenant_id` thì không được query dữ liệu user.

### Lớp 5: Data encryption

```text
Encryption in transit
Encryption at rest
Envelope encryption
Per-tenant key strategy
Key rotation
Secret redaction
No secrets in logs
No secrets in prompt transcript
```

### Lớp 6: Secret vault

Agent không được thấy secret thật. Agent chỉ được gọi tool thông qua scoped permission.

Ví dụ secret:

```text
OPENAI_API_KEY
ANTHROPIC_API_KEY
STRIPE_SECRET_KEY
GITHUB_TOKEN
GOOGLE_CLIENT_SECRET
DATABASE_URL
CLOUDFLARE_API_TOKEN
```

### Lớp 7: Runtime sandbox

```text
Filesystem isolation
Network allowlist
CPU limit
Memory limit
Time limit
No production credential
No host filesystem
No privileged container
```

### Lớp 8: Tool permission matrix

| Tool action | Default | Approval |
|---|---|---|
| Read own file | Allow | No |
| Write own artifact | Allow | No |
| Delete file | Restricted | Yes |
| Send email | Restricted | Yes |
| Run code | Sandbox only | Sometimes |
| Deploy | Deny by default | Yes |
| Modify billing | Deny | Admin only |
| Modify security | Deny | Admin quorum |
| Export tenant data | Restricted | Security approval |

### Lớp 9: Prompt injection defense

Prompt injection có thể đến từ user, website, email, PDF, repo, file hoặc tool result. Vì vậy:

```text
External content = untrusted
Tool result = untrusted until validated
Model text cannot directly execute tools
System policy > user command > file content
No hidden instruction from file can override policy
Risky action requires explicit approval
```

### Lớp 10: Multi-agent verification

Không cho một agent tự quyết định kết quả cuối.

```text
Executor Agent
↓
Reviewer Agent
↓
Security Agent
↓
Fact Check Agent
↓
Evidence Agent
↓
Final Synthesizer
```

### Lớp 11: Truthful reporting

Không có evidence thì không được báo đã xong.

Báo cáo bắt buộc:

```json
{
  "runId": "run_001",
  "status": "verified_completed",
  "filesCreated": [],
  "filesModified": [],
  "testsRun": [],
  "testResult": "pass",
  "securityResult": "pass",
  "riskFlags": [],
  "approvalRequired": false,
  "rollbackAvailable": true,
  "evidencePackId": "ev_001"
}
```

### Lớp 12: Backup and rollback

```text
Daily full backup
Hourly critical backup
Immutable audit backup
Point-in-time recovery
Cross-region backup
Rollback per command
Rollback per deployment
Rollback per self-upgrade
Monthly restore drill
```

## 4. Security roles

| Role | Quyền |
|---|---|
| Owner | Quyền tổ chức cao nhất |
| Platform Admin | Vận hành hệ thống |
| Security Admin | Incident, audit, keys, security policy |
| Billing Admin | Payment, plan, invoice |
| Support Admin | Hỗ trợ user, không xem secret/data nhạy cảm |
| Developer Admin | Deploy, logs kỹ thuật, staging |
| Compliance Admin | Báo cáo pháp lý/compliance |
| Read-only Auditor | Chỉ xem log |

## 5. Hành động cần two-person approval

```text
Delete production database
Rotate master keys
Change billing logic
Disable audit logs
Deploy Security Kernel
Grant super admin
Export enterprise data
Disable rollback
Promote self-upgrade to global
```

## 6. Security events phải log

1. Login success/failure.
2. MFA/passkey challenge.
3. Device registration.
4. Token issuance/revocation.
5. Secret access request.
6. Tool permission denied.
7. Prompt injection suspected.
8. High-risk command.
9. Admin approval.
10. File export.
11. Deployment.
12. Rollback.
13. Billing change.
14. Policy change.
15. Region transfer.

## 7. Security Definition of Done

Một module chỉ đạt chuẩn bảo mật khi có:

1. Threat model.
2. Permission matrix.
3. Input validation.
4. Output validation.
5. Audit events.
6. Error handling.
7. Test cases.
8. Rollback plan nếu có write action.
9. Evidence pack nếu có AI action.
10. No secret leakage test.


## Tài liệu nền tham chiếu

Bản kế hoạch này được khóa theo tài liệu nội bộ đã lập cho Computer.iai.one và đối chiếu với các nguồn kỹ thuật chính thức sau:

1. Cloudflare Workers Documentation: https://developers.cloudflare.com/workers/
2. Cloudflare Agents Documentation: https://developers.cloudflare.com/agents/
3. NIST SP 800-207 Zero Trust Architecture: https://csrc.nist.gov/pubs/sp/800/207/final
4. OWASP GenAI Security Project, LLM01 Prompt Injection: https://genai.owasp.org/llmrisk/llm01-prompt-injection/
5. OWASP Top 10 for LLM Applications: https://genai.owasp.org/llm-top-10/

Nguyên tắc diễn đạt công khai: không hứa “bảo mật tuyệt đối”. Cách nói chuẩn là thiết kế theo zero-trust, least privilege, tenant isolation, sandbox, audit, evidence, approval, backup và rollback.
