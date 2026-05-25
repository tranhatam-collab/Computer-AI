# COMPUTER.IAI.ONE GLOBAL INFRASTRUCTURE MASTER PLAN 2026

## 1. Mục tiêu

Thiết kế hạ tầng máy chủ toàn cầu cho Computer.iai.one để hệ thống có thể phục vụ người dùng ở Việt Nam, Đông Nam Á, Mỹ, Châu Âu và các thị trường mở rộng mà vẫn giữ được tốc độ, bảo mật, phân vùng dữ liệu, kiểm chứng và khả năng phục hồi.

Computer.iai.one là **Hệ Máy Tính AI Cá Nhân Tự Nâng Cấp Có Kiểm Chứng**. Vì vậy hạ tầng không chỉ phục vụ web và API. Hạ tầng phải vận hành được AI Computer Instance, Agent Runtime, Super Apps, Data Vault, Memory, Evidence, Audit, Self-Upgrading Kernel và Admin Governance.

## 2. Nguyên tắc kiến trúc khóa

### Không dùng mô hình server đơn

```text
User → One central server → Database → AI provider
```

Mô hình này không đạt yêu cầu vì chậm ở xa, dễ thành single point of failure, khó đáp ứng data residency, khó chạy agent dài, khó sandbox runtime và không đủ nền cho self-upgrading.

### Dùng mô hình global multi-plane

```text
Global Users
↓
Global Edge Layer
↓
Regional Control Plane
↓
AI Computer Instance Layer
↓
Secure Runtime Plane
↓
Data Vault / Memory / Evidence / Audit Plane
↓
Admin Governance + Backup / DR Plane
```

## 3. Các plane bắt buộc

| Plane | Chức năng | Bắt buộc giai đoạn đầu |
|---|---|---|
| Global Edge | DNS, CDN, WAF, TLS, DDoS, routing | Có |
| API Gateway | Auth, rate limit, tenant route, policy pre-check | Có |
| Regional Control | Điều phối theo vùng dữ liệu | Có |
| AI Computer Instance | Tạo và quản lý máy tính AI riêng từng user | Có |
| Command Kernel | Nhận lệnh, phân loại, chạy lifecycle | Có |
| Secure Runtime | Agent, code, browser, file sandbox | Có theo mức MVP |
| Data Vault | Lưu file, artifact, evidence, backup | Có |
| Memory Store | User memory, project memory, vector search | Có theo mức MVP |
| Audit & Evidence | Log bất biến, chứng cứ output | Có |
| Self-Upgrade | Tạo feature request, code, test, verify, rollback | Có theo phase |
| Admin Governance | Approval, rollback, incident, policy | Có |
| Backup / DR | Backup, PITR, restore drill | Có |

## 4. Vùng triển khai đề xuất

| Giai đoạn | Vùng | Mục tiêu |
|---|---|---|
| Phase 1 | Asia primary: Singapore hoặc Tokyo | Việt Nam, Đông Nam Á, Hàn, Nhật |
| Phase 1 | US secondary: US West hoặc Central | Mỹ, API provider, developer ecosystem |
| Phase 2 | EU: Frankfurt hoặc Amsterdam | EU, data residency, enterprise |
| Phase 3 | Sydney | Úc, New Zealand |
| Phase 3 | Mumbai | Nam Á |
| Phase 4 | São Paulo | Nam Mỹ |

## 5. Cloudflare-first, không Cloudflare-only

Cloudflare nên làm lớp edge, API nhẹ, routing, WAF, DDoS, rate limiting, Workers, Durable Objects, Queues, R2, Vectorize, Workflows, AI Gateway, logs và Zero Trust Access. Tuy nhiên runtime nặng như GPU, browser automation lớn, code sandbox dài, enterprise dedicated deployment có thể cần AWS, GCP, Azure hoặc provider GPU chuyên dụng.

## 6. Stack khuyến nghị

| Layer | Stack chính | Stack mở rộng |
|---|---|---|
| DNS/CDN/WAF/DDoS | Cloudflare | AWS Route 53 fallback nếu cần |
| Public Web | Cloudflare Workers/Pages | Vercel/Netlify chỉ phụ |
| API Gateway | Workers + Hono | Fastify behind gateway |
| Stateful session | Durable Objects / Cloudflare Agents | Redis/Temporal nếu cần |
| Queue | Cloudflare Queues | SQS/PubSub |
| Object storage | R2 | S3/GCS |
| Vector | Vectorize / pgvector | Pinecone/Weaviate/Qdrant |
| Database | Regional PostgreSQL | Neon/Supabase/Aurora |
| AI Gateway | Cloudflare AI Gateway | Internal provider router |
| Runtime sandbox | Containers / Firecracker / gVisor | Dedicated VMs |
| Observability | Cloudflare logs + OpenTelemetry | Grafana, Sentry, Datadog |
| Admin access | Cloudflare Zero Trust | Enterprise SSO |

## 7. Network topology tổng

```text
Internet
  ↓
Cloudflare DNS / CDN / WAF / DDoS / Rate Limit
  ↓
Edge API Gateway
  ↓
Region Router
  ↓
Asia / US / EU Regional API
  ↓
Command Kernel + Instance Manager
  ↓
Queues / Workflows / Durable State
  ↓
Agent Runtime / Sandbox Runtime / Super App Runtime
  ↓
PostgreSQL / R2 / Vector / Audit / Evidence
  ↓
Admin Governance / Backup / DR
```

## 8. Data classification

| Class | Ví dụ | Storage | Cross-region |
|---|---|---|---|
| Public | Marketing page, docs public | Edge cache/R2 | Được replicate |
| User Basic | Profile, settings | Regional DB | Theo policy |
| User Sensitive | Files, email, Drive data | Data Vault | Không tự replicate |
| Secret | API keys, OAuth tokens | Secret vault/KMS | Không đưa vào prompt |
| Audit | Security/event logs | Append-only store | Replicate immutable |
| Evidence | Output proof, tests, logs | R2/S3 + hash | Có kiểm soát |
| Billing | Subscription, invoice | Billing DB + provider | Theo compliance |

## 9. Security model cấp cao

Hệ thống phải assume breach. Mọi request phải qua identity, device, tenant, region, policy, tool permission và audit. Agent không được trực tiếp nhìn thấy secret. Agent không được thao tác production nếu không có policy và approval. Runtime có quyền càng thấp càng tốt.

## 10. Điều kiện đạt 100/100 về hạ tầng

1. Có edge protection.
2. Có region routing.
3. Có tenant isolation.
4. Có identity và passkey/MFA.
5. Có secret vault.
6. Có sandbox runtime.
7. Có permission matrix.
8. Có audit log bất biến.
9. Có evidence pack.
10. Có approval gates.
11. Có backup và rollback.
12. Có DR runbook.
13. Có observability end-to-end.
14. Có incident response.
15. Có cost dashboard.
16. Có admin governance.
17. Có data residency policy.
18. Có production readiness gate.

## Tài liệu nền tham chiếu

Bản kế hoạch này được khóa theo tài liệu nội bộ đã lập cho Computer.iai.one và đối chiếu với các nguồn kỹ thuật chính thức sau:

1. Cloudflare Workers Documentation: https://developers.cloudflare.com/workers/
2. Cloudflare Agents Documentation: https://developers.cloudflare.com/agents/
3. NIST SP 800-207 Zero Trust Architecture: https://csrc.nist.gov/pubs/sp/800/207/final
4. OWASP GenAI Security Project, LLM01 Prompt Injection: https://genai.owasp.org/llmrisk/llm01-prompt-injection/
5. OWASP Top 10 for LLM Applications: https://genai.owasp.org/llm-top-10/

Nguyên tắc diễn đạt công khai: không hứa “bảo mật tuyệt đối”. Cách nói chuẩn là thiết kế theo zero-trust, least privilege, tenant isolation, sandbox, audit, evidence, approval, backup và rollback.
