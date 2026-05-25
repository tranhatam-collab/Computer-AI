# COMPUTER.IAI.ONE GLOBAL SERVER ARCHITECTURE 2026

## 1. Mục tiêu tài liệu

Tài liệu này khóa cấu trúc máy chủ toàn cầu cho Computer.iai.one. Team dev dùng tài liệu này để phân rã repo, thiết kế API, triển khai hạ tầng, định tuyến vùng, chạy runtime agent, lưu dữ liệu và chuẩn bị production.

## 2. Kiến trúc logical

```text
GLOBAL EDGE
├── DNS
├── CDN
├── WAF
├── DDoS Protection
├── Bot Protection
├── Rate Limiting
├── TLS / HSTS
└── Edge API Gateway

REGIONAL CONTROL PLANE
├── Asia Region
├── US Region
├── EU Region
└── Future Regions

AI COMPUTER INSTANCE PLANE
├── Instance Manager
├── Computer Type Registry
├── Owner / Tenant Binding
├── App Entitlement
├── Agent Entitlement
├── Quota / Billing
└── Policy Binding

COMMAND EXECUTION PLANE
├── Command Kernel
├── Run Lifecycle Manager
├── Queue / Workflow
├── Approval Gate
├── Verification Gate
└── Result Packager

SECURE RUNTIME PLANE
├── Agent Runtime
├── Code Sandbox
├── Browser Sandbox
├── File Processing Sandbox
├── Super App Runtime
└── Self-Upgrade Runtime

DATA PLANE
├── PostgreSQL Regional DB
├── Object Storage Data Vault
├── Memory Store
├── Vector Store
├── Evidence Store
├── Audit Store
└── Backup Store

ADMIN GOVERNANCE PLANE
├── Admin Console
├── Approval Board
├── Rollback Center
├── Incident Center
├── Security Dashboard
└── Compliance Reports
```

## 3. Server group chi tiết

### 3.1 Edge group

| Server/Service | Nhiệm vụ |
|---|---|
| DNS | Quản lý `computer.iai.one` và subdomain |
| CDN | Cache asset, static docs, public pages |
| WAF | Chặn SQLi, XSS, exploit, bot abuse |
| DDoS | Chống layer 3/4/7 attack |
| Rate limiter | Chặn abuse theo IP, user, tenant, API key |
| Edge router | Đưa user về vùng đúng |
| Public web worker | Landing, docs, console shell |

### 3.2 Regional API group

| API group | Endpoint |
|---|---|
| Auth API | `/api/auth/*` |
| Computer API | `/api/computers/*` |
| Command API | `/api/commands/*` |
| Run API | `/api/runs/*` |
| File API | `/api/files/*` |
| Sync API | `/api/sync/*` |
| Agent API | `/api/agents/*` |
| Approval API | `/api/approvals/*` |
| Audit API | `/api/audit/*` |
| Admin API | `/api/admin/*` |
| Billing API | `/api/billing/*` |

### 3.3 Runtime group

| Runtime | Nhiệm vụ | Quyền mặc định |
|---|---|---|
| Router runtime | Phân loại lệnh | Không truy cập dữ liệu nhạy cảm |
| Planner runtime | Lập kế hoạch | Chỉ metadata cần thiết |
| Executor runtime | Gọi tool/super app | Theo policy |
| Reviewer runtime | Kiểm tra kết quả | Read-only evidence |
| Security runtime | Kiểm tra rủi ro | Security context |
| Code sandbox | Chạy code/test | Không production secret |
| Browser sandbox | Duyệt web/capture | Network policy |
| File sandbox | Convert/analyze file | Isolated filesystem |
| Self-upgrade runtime | Tạo module/code | Approval-gated |

## 4. Region routing

```text
VN/SEA → Asia Region
US → US Region
EU → EU Region
Enterprise dedicated → Contract Region
Unknown → Nearest Edge + policy decision
```

Region được bind vào `tenant_id` và `computer_id`. Sau khi bind, dữ liệu nhạy cảm của tenant không được tự động chuyển vùng nếu chưa có policy và audit.

## 5. AI Computer Instance object

```json
{
  "computerId": "comp_asia_vn_001",
  "tenantId": "tenant_001",
  "ownerId": "user_001",
  "region": "asia-southeast",
  "computerType": "business",
  "languagePrimary": "vi",
  "apps": ["office", "research", "browser", "content", "finance"],
  "agents": ["router", "planner", "executor", "reviewer", "security"],
  "vaultId": "vault_001",
  "memoryId": "mem_001",
  "policyId": "policy_business_safe",
  "quotaPlan": "business_pro",
  "runtimeClass": "standard_sandboxed",
  "riskLevel": "normal",
  "createdAt": "2026-05-25T00:00:00Z"
}
```

## 6. Command run lifecycle

```text
created
→ authenticated
→ region_routed
→ tenant_checked
→ classified
→ planned
→ policy_checked
→ approved_if_needed
→ queued
→ executing
→ verifying
→ security_reviewing
→ packaging
→ delivered
→ archived
→ rollback_available
```

## 7. Deployment environments

| Environment | Mục tiêu | Quy tắc |
|---|---|---|
| local | Dev cá nhân | No production secret |
| dev | Tích hợp sớm | Fake/sandbox providers |
| staging | Kiểm thử gần production | Realistic data, no real user sensitive data |
| production | User thật | Approval, backup, monitoring |
| dedicated | Enterprise riêng | Contract-specific controls |

## 8. Required repo structure

```text
apps/
  web-console/
  mobile-remote/
  admin-console/
  api-gateway/
  sync-agent/

computer-os/
  instance-manager/
  command-kernel/
  app-runtime/
  agent-orchestrator/
  verification-engine/
  security-kernel/
  memory-system/
  data-vault/
  sync-engine/
  output-engine/
  self-upgrade-kernel/

super-apps/
  browser/
  office/
  code/
  research/
  content/
  media/
  data/
  finance/
  sales/
  business/
  automation/
  security/
  knowledge-base/
  verification/

agents/
  router-agent/
  planner-agent/
  executor-agent/
  reviewer-agent/
  security-agent/
  fact-check-agent/
  code-agent/
  file-agent/
  browser-agent/
  data-agent/
  release-agent/
  report-agent/

packages/
  contracts/
  entitlement/
  audit/
  approval/
  billing/
  usage/
  policy/
  observability/
  language/
```

## 9. Production readiness gates

Không được deploy production nếu thiếu một trong các điểm sau:

1. Auth thật.
2. Database production.
3. Tenant isolation test.
4. Secret vault.
5. Runtime sandbox.
6. Audit log.
7. Backup restore test.
8. Rate limiting.
9. WAF/rules.
10. Error monitoring.
11. Incident runbook.
12. Admin approval.
13. Rollback mechanism.
14. Evidence pack for command runs.
15. Cost limit.
