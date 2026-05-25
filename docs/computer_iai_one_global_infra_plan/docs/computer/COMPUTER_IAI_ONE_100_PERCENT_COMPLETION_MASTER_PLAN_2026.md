# COMPUTER.IAI.ONE — BÁO CÁO NGHIÊN CỨU VÀ KẾ HOẠCH HOÀN THIỆN 100/100

**Dự án:** Computer.iai.one  
**Định vị khóa:** Hệ Máy Tính AI Cá Nhân Tự Nâng Cấp Có Kiểm Chứng  
**Tên tiếng Anh phụ:** Self-Upgrading Personal AI Computer System  
**Ngôn ngữ gốc:** Tiếng Việt Nam  
**Phiên bản:** FINAL MASTER COMPLETION PLAN 2026  
**Ngày lập:** 25/05/2026  
**Mục tiêu:** Chuyển toàn bộ vision, tài liệu, kiến trúc và lộ trình dev thành hệ tiêu chuẩn hoàn thiện 100/100, để team dev thực hiện theo thứ tự, có kiểm chứng, có bằng chứng, có rollback, không báo cáo mơ hồ.

## 1. Phán quyết tổng thể

Computer.iai.one không được phát triển như một app AI, chatbot, web desktop giả lập, product catalog hay marketplace công cụ. Định vị đúng là một **hệ máy tính AI cá nhân hóa**, trong đó mỗi người dùng sở hữu một **AI Computer Instance riêng**, có dữ liệu riêng, trí nhớ riêng, runtime riêng, Super Apps riêng, đội AI Agents riêng, lớp kiểm chứng riêng và khả năng tự nâng cấp có kiểm soát.

Điểm nâng cấp quan trọng nhất của bản kế hoạch mới là: hệ thống không chỉ chạy việc theo lệnh, mà còn có khả năng **tự nhận biết thiếu chức năng, tự tạo yêu cầu nâng cấp, tự thiết kế module, tự viết code, tự kiểm thử, tự kiểm chứng, tự báo cáo, tự triển khai vào instance cá nhân trong phạm vi an toàn**, đồng thời gửi báo cáo về admin và chỉ promote lên máy chủ trung tâm khi đạt chuẩn.

Tuy nhiên, để đạt 100/100, tuyệt đối không được hiểu “tự động 100%” là “AI muốn làm gì cũng được”. Cách khóa đúng là:

**AI tự động xử lý tối đa. Mọi hành động rủi ro cao phải đi qua policy, sandbox, test, multi-agent verification, audit log, rollback plan và admin approval. Không có bằng chứng thì không được báo hoàn tất.**

## 2. Điểm đang đúng và điểm còn thiếu

### 2.1 Điểm đang đúng

Tài liệu hiện tại đã khóa được các trục quan trọng:

1. Không gọi dự án là app, chatbot hoặc product catalog.
2. Mỗi user có một AI Computer Instance riêng.
3. Mobile chỉ là Remote Control.
4. Web chỉ là Console.
5. Phần lõi là Computer OS.
6. Có Data Vault, Memory, Super Apps, Agent Team, Command Kernel, Security Kernel, Sync Layer và Verification Engine.
7. Có Self-Upgrading Kernel.
8. Có mô hình 3 mức tự nâng cấp.
9. Có yêu cầu báo cáo trung thực để chống AI nói dối.
10. Tiếng Việt là ngôn ngữ gốc, tiếng Anh là ngôn ngữ thứ hai, các ngôn ngữ khác mở rộng sau.

### 2.2 Điểm còn thiếu để đạt 100/100

Hiện kế hoạch đã mạnh về vision, nhưng để dev làm được ngay, cần bổ sung các lớp còn thiếu sau:

1. **Definition of Done 100/100:** Chưa có thang đo rõ thế nào là hoàn thiện thật.
2. **Architecture Contract:** Chưa có contract bắt buộc cho ComputerInstance, CommandRun, UpgradeRequest, EvidencePack, PolicyDecision, ApprovalRequest, AuditEvent, RollbackPlan.
3. **API Surface:** Chưa khóa endpoint bắt buộc cho instance, command, run, file, sync, approval, audit, upgrade, admin report.
4. **Database Schema:** Chưa có schema production cho PostgreSQL hoặc D1/SQLite giai đoạn đầu.
5. **Security Policy Matrix:** Chưa định nghĩa đầy đủ tool nào được gọi, khi nào, bởi agent nào, trong quyền nào.
6. **Self-Upgrade Guardrails:** Cần khóa rõ Level 1, Level 2, Level 3 bằng rule thực thi trong code, không chỉ mô tả trong tài liệu.
7. **Truthful Reporting Engine:** Cần biến nguyên tắc “không có log không báo xong” thành schema và validator.
8. **Evidence Pack:** Cần chuẩn hóa bằng dữ liệu có thể kiểm tra: file diff, test result, security result, artifact link, run trace, approval event.
9. **Observability:** Cần traces, metrics, logs và correlation id cho từng lệnh, từng agent, từng file, từng hành động.
10. **Production Blockers:** AI providers thật, email provider, payment, PostgreSQL, passkeys, CI/CD, DNS final, mobile build và admin console chưa được khóa bằng checklist triển khai.

## 3. Định nghĩa 100/100 cho Computer.iai.one

100/100 không có nghĩa là “không còn việc gì để làm”. 100/100 có nghĩa là dự án đã có đủ tiêu chuẩn để dev triển khai nhất quán, kiểm thử được, vận hành được, mở rộng được và không báo cáo sai.

### 3.1 Thang điểm hoàn thiện

| Nhóm | Trọng số | Điều kiện đạt điểm tối đa |
|---|---:|---|
| Vision và ngôn ngữ | 8 | Định vị thống nhất, không gọi là app/chatbot/catalog, Vietnamese-first khóa ở toàn hệ |
| Repo architecture | 8 | Cấu trúc apps, computer-os, super-apps, agents, packages rõ ràng |
| Product matrix | 6 | Các loại AI Computer, quota, apps, agents, pricing lane, entitlement rõ ràng |
| Instance Manager | 8 | Mỗi user có ComputerInstance, owner, type, policy, vault, memory, runtime, quota |
| Command Kernel | 8 | Lifecycle từ created đến archived, có trạng thái, evidence, retry, approval |
| Super Apps Runtime | 7 | Browser, Office, Code, Research, Content, Data, Finance, Sales, Media, Automation có interface chung |
| Agent Orchestrator | 7 | Router, Planner, Executor, Reviewer, Security, Fact Check, Final Synthesizer phối hợp theo role |
| Verification Court | 7 | Confidence score, evidence pack, risk flags, reviewer notes, final status |
| Self-Upgrading Kernel | 10 | Detect missing capability, design, code, test, verify, deploy, rollback, admin notify |
| Security Kernel | 10 | Tenant isolation, least privilege, approval gates, sandbox, secret vault, audit, rollback, prompt injection defense |
| Data Vault & Memory | 6 | File store, memory store, embeddings, retention, export/delete, permissioned retrieval |
| Mobile Remote & Local Sync | 5 | Command, approvals, results, upload, device/session security, desktop sync agent spec |
| Admin & Truthful Reporting | 4 | Admin report không thể báo xong nếu thiếu evidence, email notify, dashboard status |
| CI/CD & production readiness | 4 | Typecheck, tests, security scan, migration, deployment, monitoring, rollback release |
| Legal/terms/safety | 2 | Điều khoản tự nâng cấp, dữ liệu, quyền, giới hạn AI, disclaimer bảo mật |

**Tổng:** 100 điểm.

## 4. Kiến trúc target phải khóa

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
  feature-request-engine/
  auto-design-engine/
  code-generation-engine/
  test-verification-engine/
  admin-report-engine/
  upgrade-review-board/
  safe-deployment-engine/
  learning-feedback-engine/

super-apps/
  browser/
  office/
  code/
  research/
  content/
  media/
  design/
  finance/
  sales/
  business/
  education/
  security/
  automation/
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
  product-registry/
  entitlement/
  audit/
  approval/
  billing/
  usage/
  policy/
  observability/
  language/
```

Nguyên tắc: `apps/` chỉ là bề mặt điều khiển. `computer-os/` là lõi. `super-apps/` là năng lực làm việc. `agents/` là đội chuyên môn. `packages/` là contract dùng chung.

## 5. Các contract bắt buộc phải có

Team dev phải tạo trước các kiểu dữ liệu cốt lõi trong `packages/contracts/` để toàn bộ code không bị lệch.

### 5.1 ComputerInstance

```ts
export type ComputerInstance = {
  computerId: string;
  ownerId: string;
  workspaceId?: string;
  computerType: AIComputerType;
  languagePrimary: "vi";
  languageSecondary?: "en";
  enabledLanguages: string[];
  apps: SuperAppId[];
  agents: AgentId[];
  vaultId: string;
  memoryId: string;
  policyId: string;
  quotaId: string;
  runtimeClass: RuntimeClass;
  syncState: SyncState;
  verificationPolicy: VerificationPolicy;
  upgradePolicy: UpgradePolicy;
  createdAt: string;
  updatedAt: string;
  status: "active" | "paused" | "suspended" | "archived";
};
```

### 5.2 CommandRun

```ts
export type CommandRun = {
  runId: string;
  computerId: string;
  ownerId: string;
  commandText: string;
  commandLanguage: "vi" | "en" | string;
  intent: CommandIntent;
  lifecycle:
    | "created"
    | "classified"
    | "planned"
    | "approval_required"
    | "approved"
    | "executing"
    | "verifying"
    | "packaging"
    | "delivered"
    | "archived"
    | "failed"
    | "rolled_back";
  assignedAgents: AgentId[];
  requiredTools: ToolId[];
  evidencePackId?: string;
  approvalRequestIds: string[];
  riskLevel: "low" | "medium" | "high" | "critical";
  confidenceScore?: number;
  resultId?: string;
  auditEventIds: string[];
  createdAt: string;
  updatedAt: string;
};
```

### 5.3 UpgradeRequest

```ts
export type UpgradeRequest = {
  upgradeId: string;
  computerId: string;
  ownerId: string;
  requestedFeature: string;
  detectedMissingCapability: string;
  upgradeLevel: 1 | 2 | 3;
  upgradeType:
    | "config"
    | "workflow"
    | "prompt_template"
    | "ui_small"
    | "super_app"
    | "connector"
    | "automation"
    | "data_module"
    | "billing"
    | "security"
    | "database"
    | "system_deploy";
  designSpecId: string;
  generatedArtifacts: GeneratedArtifact[];
  filesCreated: string[];
  filesModified: string[];
  testsRun: TestRunSummary[];
  securityResult: SecurityReviewResult;
  verificationResult: VerificationResult;
  adminApprovalRequired: boolean;
  approvalStatus: "not_required" | "pending" | "approved" | "rejected";
  rollbackPlanId: string;
  evidencePackId: string;
  finalStatus: "draft" | "testing" | "verified" | "applied" | "rejected" | "rolled_back";
};
```

### 5.4 EvidencePack

```ts
export type EvidencePack = {
  evidencePackId: string;
  runId?: string;
  upgradeId?: string;
  computerId: string;
  sources: EvidenceSource[];
  logs: EvidenceLog[];
  fileDiffs: FileDiff[];
  testResults: TestRunSummary[];
  securityFindings: SecurityFinding[];
  approvals: ApprovalDecision[];
  generatedArtifacts: GeneratedArtifact[];
  traceIds: string[];
  createdAt: string;
  integrityHash: string;
};
```

### 5.5 TruthfulReport

```ts
export type TruthfulReport = {
  reportId: string;
  subjectType: "command" | "upgrade" | "deployment" | "security" | "sync";
  subjectId: string;
  statusClaim: string;
  evidencePackId: string;
  validatorStatus: "valid" | "invalid" | "incomplete";
  missingEvidence: string[];
  cannotClaimDone: boolean;
  userSummaryVi: string;
  adminSummaryVi: string;
  adminEmailSent: boolean;
  createdAt: string;
};
```

**Luật khóa:** nếu `evidencePackId` trống hoặc `validatorStatus !== "valid"`, hệ thống không được hiển thị “đã xong”, “hoàn tất”, “deployed”, “fixed”, “production-ready”.

## 6. Product Matrix phải khóa

| Loại AI Computer | Người dùng chính | Super Apps mặc định | Mức tự động hóa mặc định |
|---|---|---|---|
| AI Computer Free | Người thử nghiệm | Browser, Content, Knowledge Base | Level 1 |
| AI Learning Computer | Học sinh, sinh viên, người tự học | Research, Office, Knowledge Base | Level 1 |
| AI Personal Computer | Cá nhân | Office, Browser, Content, Data | Level 1 |
| AI Creator Computer | Creator, writer, trainer | Content, Media, Research, Publishing | Level 1-2 |
| AI Office Computer | Nhân sự văn phòng | Office, Email, Reports, Automation | Level 1-2 |
| AI Business Computer | Founder, SME | Business, Sales, Finance, Research, Office | Level 1-2 |
| AI Sales Computer | Sales team | Sales, CRM, Email, Proposal, Automation | Level 1-2 |
| AI Finance Computer | Kế toán, tài chính | Finance, Data, Office, Audit | Level 1-2, hạn chế cao |
| AI Code Computer | Developer | Code, Browser, Security, Release | Level 1-2, Level 3 cần admin |
| AI Media Computer | Media team | Content, Media, Design, Publishing | Level 1-2 |
| AI Studio Computer | Agency, studio | Media, Content, Automation, Data | Level 1-2 |
| AI Security Computer | Security team | Security, Audit, Code, Browser | Level 2, kiểm soát nghiêm |
| AI Operations Computer | Ops team | Automation, Data, Reports, Approval | Level 1-2 |
| AI Enterprise Computer | Doanh nghiệp lớn | Admin, Policy, Audit, Enterprise Apps | Level 2-3, cần approval |
| AI Dedicated Computer | Tổ chức riêng | Custom theo hợp đồng | Theo policy riêng |

## 7. Self-Upgrading Kernel — cơ chế hoàn chỉnh

### 7.1 Pipeline bắt buộc

```text
User Command tiếng Việt
  → Detect Missing Capability
  → Create Feature Request
  → Analyze Current Computer Instance
  → Classify Upgrade Level
  → Auto Design Module / Super App / Workflow
  → Generate Code / Config / Template
  → Run Unit Tests
  → Run Integration Tests
  → Run Security Review
  → Run Multi-Agent Verification Court
  → Create Evidence Pack
  → Create Rollback Plan
  → Create Truthful Upgrade Report
  → Apply To User Instance nếu policy cho phép
  → Notify User
  → Notify Admin By Email nếu cần
  → Store Learning Pattern
  → Promote To Central Server nếu approved
```

### 7.2 Ba mức tự nâng cấp

| Level | Phạm vi | AI được tự áp dụng? | Điều kiện |
|---|---|---|---|
| Level 1 | Prompt, template, workflow, UI text, config nhỏ | Có | Log, evidence pack, rollback nhẹ |
| Level 2 | Super App nhỏ, connector, automation, data module | Chỉ sau test và policy pass | Test, security review, verification, approval theo policy |
| Level 3 | Billing, quyền, bảo mật, database, deploy toàn hệ | Không tự áp dụng | Bắt buộc admin approval, rollback, migration plan, release gate |

### 7.3 Không cho AI tự vượt quyền

Self-Upgrading Kernel phải có rule engine riêng:

```ts
if (upgradeLevel === 3) {
  requireAdminApproval();
  requireRollbackPlan();
  requireSecurityReview("strict");
  blockAutoDeploy();
}

if (!evidencePack.valid) {
  blockDoneClaim();
}

if (securityResult.status !== "pass") {
  blockApplyUpgrade();
}
```

## 8. Security Kernel — chuẩn an toàn tối thiểu

Computer.iai.one phải dùng ngôn ngữ bảo mật chính xác: **không hứa bảo mật tuyệt đối**, mà cam kết kiến trúc theo zero-trust, least-privilege, strong authentication, isolated runtime, approval-first, audit-first, rollback-ready và secure-by-default.

### 8.1 Lớp bảo mật bắt buộc

1. Tenant isolation: mỗi user/workspace có vùng dữ liệu riêng.
2. Encryption at rest và in transit.
3. Secret vault: không đưa secret vào prompt, transcript hoặc log công khai.
4. Least privilege: agent chỉ có quyền tối thiểu theo run.
5. Tool permission matrix: tool nào được gọi, bởi agent nào, trong điều kiện nào.
6. Approval gates: thanh toán, xóa file, gửi email, deploy, migration, quyền, billing phải duyệt.
7. Sandbox: code/browser/file action chạy trong vùng cách ly.
8. Audit log: mọi hành động có actor, tool, input hash, output hash, timestamp.
9. Rollback: mọi upgrade phải có plan quay lại.
10. Backup: dữ liệu quan trọng có backup theo policy.
11. Prompt injection defense: tách dữ liệu không tin cậy khỏi chỉ thị hệ thống.
12. Human override: user/admin có thể dừng run.
13. Data retention: user biết dữ liệu giữ bao lâu.
14. Export/delete: user có quyền xuất hoặc xóa dữ liệu theo policy.

### 8.2 Tool Permission Matrix mẫu

| Tool/Hành động | Level rủi ro | Agent được gọi | Cần duyệt? |
|---|---|---|---|
| Đọc file user đã upload | Low | File Agent, Research Agent | Không |
| Tạo tài liệu mới | Low | Office Agent, Content Agent | Không |
| Sửa file trong instance riêng | Medium | File Agent, Code Agent | Theo policy |
| Gửi email ra ngoài | High | Report Agent, Sales Agent | Có |
| Chạy terminal/code | High | Code Agent, Build Agent | Có sandbox + policy |
| Xóa dữ liệu | Critical | Security Agent | Bắt buộc duyệt |
| Migration database | Critical | Release Agent | Admin duyệt |
| Thay đổi billing/quyền | Critical | Admin Agent | Admin duyệt |
| Deploy production | Critical | Release Agent | Admin duyệt + rollback |

## 9. Agent Verification Court

Mỗi kết quả quan trọng không được trả ngay sau một agent. Phải có tòa kiểm chứng nhiều lớp.

### 9.1 Vai trò agent

| Agent | Vai trò |
|---|---|
| Router Agent | Hiểu lệnh, chọn lane, chọn Computer App |
| Planner Agent | Chia việc, lập kế hoạch |
| Executor Agent | Thực hiện tác vụ |
| File Agent | Đọc/ghi/xử lý file |
| Code Agent | Code, test, debug |
| Browser Agent | Tìm, đọc, kiểm tra nguồn web |
| Data Agent | CSV, database, phân tích dữ liệu |
| Security Agent | Kiểm rủi ro, quyền, prompt injection |
| Fact Check Agent | Kiểm chứng dữ kiện |
| Reviewer Agent | Phản biện kết quả |
| Cost Agent | Kiểm chi phí và quota |
| Release Agent | Chuẩn bị deploy, rollback |
| Report Agent | Viết báo cáo cuối |
| Final Synthesizer | Tổng hợp kết quả cuối |

### 9.2 Output bắt buộc

```ts
export type VerificationResult = {
  verificationId: string;
  runId?: string;
  upgradeId?: string;
  reviewers: AgentReview[];
  confidenceScore: number;
  riskFlags: RiskFlag[];
  sourceEvidence: EvidenceSource[];
  contradictionNotes: string[];
  securityStatus: "pass" | "warning" | "fail";
  qualityStatus: "pass" | "warning" | "fail";
  finalStatus: "deliverable" | "needs_revision" | "blocked";
};
```

## 10. Vietnamese-first Language System

### 10.1 Luật ngôn ngữ

1. Tiếng Việt là ngôn ngữ gốc của toàn bộ sản phẩm.
2. Tiếng Anh là ngôn ngữ thứ hai.
3. Các ngôn ngữ mở rộng sau: Trung, Hàn, Khmer, Pháp, Nhật, Tây Ban Nha, Đức và các ngôn ngữ khác.
4. Tất cả command mẫu, báo cáo admin, điều khoản, product thinking, nội dung public, error message, onboarding phải có bản tiếng Việt chuẩn trước.
5. Không hard-code text trực tiếp trong component; toàn bộ text phải đi qua hệ content/i18n.

### 10.2 Cấu trúc gợi ý

```text
content/
  vi.json
  en.json
  zh.json
  ko.json
  km.json
  fr.json

packages/language/
  command-grammar/
  intent-dictionary/
  error-messages/
  admin-report-templates/
  legal-terms/
```

### 10.3 Command tiếng Việt mẫu

| Nhóm | Lệnh mẫu |
|---|---|
| Nghiên cứu | “Nghiên cứu toàn bộ tài liệu này và xuất báo cáo có nguồn kiểm chứng.” |
| Code | “Kiểm tra repo này, sửa lỗi build, chạy test và viết báo cáo.” |
| Nâng cấp | “Máy tính này còn thiếu chức năng quản lý hợp đồng, hãy tự thiết kế và đề xuất nâng cấp.” |
| Văn phòng | “Tạo báo cáo tuần từ các file này và gửi bản nháp cho tôi duyệt.” |
| Bảo mật | “Kiểm tra quyền truy cập và báo cáo rủi ro trong workspace này.” |
| Data | “Phân tích file CSV này, tìm lỗi dữ liệu và tạo dashboard tóm tắt.” |

## 11. API Surface bắt buộc

### 11.1 Instance API

```text
POST   /api/computers
GET    /api/computers/:computerId
PATCH  /api/computers/:computerId
GET    /api/computers/:computerId/status
GET    /api/computers/:computerId/apps
GET    /api/computers/:computerId/policy
```

### 11.2 Command API

```text
POST   /api/computers/:computerId/commands
GET    /api/runs/:runId
POST   /api/runs/:runId/cancel
POST   /api/runs/:runId/resume
GET    /api/runs/:runId/evidence
GET    /api/runs/:runId/report
```

### 11.3 Approval API

```text
GET    /api/approvals/pending
POST   /api/approvals/:approvalId/approve
POST   /api/approvals/:approvalId/reject
GET    /api/approvals/:approvalId/audit
```

### 11.4 Self-Upgrade API

```text
POST   /api/computers/:computerId/upgrades/request
GET    /api/upgrades/:upgradeId
POST   /api/upgrades/:upgradeId/test
POST   /api/upgrades/:upgradeId/apply
POST   /api/upgrades/:upgradeId/rollback
POST   /api/upgrades/:upgradeId/promote
GET    /api/upgrades/:upgradeId/evidence
GET    /api/upgrades/:upgradeId/report
```

### 11.5 Admin API

```text
GET    /api/admin/reports
GET    /api/admin/reports/:reportId
GET    /api/admin/security/events
GET    /api/admin/upgrades/pending
POST   /api/admin/upgrades/:upgradeId/approve
POST   /api/admin/upgrades/:upgradeId/reject
```

## 12. Database Schema tối thiểu

Các bảng bắt buộc:

```text
users
workspaces
computer_instances
computer_types
super_apps
computer_app_assignments
agents
computer_agent_assignments
command_runs
command_steps
approval_requests
approval_decisions
upgrade_requests
upgrade_artifacts
evidence_packs
evidence_logs
audit_events
rollback_plans
memory_items
vault_items
sync_sources
sync_events
truthful_reports
admin_notifications
usage_events
billing_entitlements
policy_rules
security_findings
```

## 13. Roadmap hoàn thiện theo thứ tự thực thi

### Phase 0 — Vision Lock & Documentation Foundation

**Mục tiêu:** Khóa toàn bộ định vị, ngôn ngữ, kiến trúc và tiêu chuẩn 100/100.

**Việc phải làm:**

1. Tạo hoặc cập nhật `docs/computer/COMPUTER_IAI_ONE_TRUE_VISION_MASTER_2026.md`.
2. Tạo hoặc cập nhật `docs/computer/COMPUTER_IAI_ONE_100_PERCENT_COMPLETION_MASTER_PLAN_2026.md`.
3. Cập nhật README.md, không gọi dự án là app.
4. Cập nhật execution board theo 8 phase mới.
5. Thêm glossaries: AI Computer Instance, Super Apps, Command Kernel, Verification Court, Self-Upgrading Kernel.

**Definition of Done:**

- README định vị đúng.
- Có danh sách docs bắt buộc.
- Có scoring 100/100.
- Có checklist blocker.
- Không có câu “production-ready” nếu chưa qua gate thật.

### Phase 1 — Contracts + Instance Manager

**Mục tiêu:** Mỗi user có một AI Computer Instance riêng.

**Việc phải làm:**

1. Tạo `packages/contracts`.
2. Tạo type cho ComputerInstance, ComputerType, SuperApp, Agent, Policy, Quota.
3. Tạo `computer-os/instance-manager`.
4. Tạo API tạo/xem/sửa ComputerInstance.
5. Tạo seed data cho các loại AI Computer.
6. Tạo test tạo instance theo computer type.

**Definition of Done:**

- Tạo được instance mới.
- Instance có owner, type, apps, agents, vault, memory, policy, quota.
- Có unit test và integration test.
- Không có dữ liệu user lẫn nhau.

### Phase 2 — Command Kernel tiếng Việt

**Mục tiêu:** Biến lệnh tiếng Việt thành lifecycle có thể kiểm soát.

**Việc phải làm:**

1. Tạo CommandRun contract.
2. Tạo command intake API.
3. Tạo intent classification tiếng Việt.
4. Tạo lifecycle state machine.
5. Tạo audit event cho mỗi bước.
6. Tạo result placeholder và evidence pack placeholder.

**Definition of Done:**

- User gửi được lệnh tiếng Việt.
- Hệ phân loại intent.
- Hệ tạo runId, lifecycle và audit events.
- Có trạng thái rõ: created, classified, planned, executing, verifying, delivered.

### Phase 3 — Super Apps Runtime + AI Builder

**Mục tiêu:** Super Apps trở thành module thật, không chỉ là danh sách tên.

**Việc phải làm:**

1. Tạo SuperApp interface.
2. Tạo runtime adapter cho Browser, Office, Code, Research, Content, Data.
3. Tạo AI Builder để đề xuất module/workflow mới.
4. Tạo registry cho Super Apps.
5. Tạo permission theo từng app.

**Definition of Done:**

- Mỗi Super App có id, capability, required tools, risk level, allowed computer types.
- Command Kernel gọi được Super App mock/runtime.
- Có test cho app invocation.

### Phase 4 — Agent Orchestrator + Verification Court

**Mục tiêu:** Một lệnh không trả lời bằng một model đơn lẻ, mà qua nhiều agent có vai trò rõ.

**Việc phải làm:**

1. Tạo agent contracts.
2. Tạo Router Agent, Planner Agent, Executor Agent, Reviewer Agent, Security Agent.
3. Tạo handoff workflow.
4. Tạo verification result.
5. Tạo confidence score.
6. Tạo risk flags.

**Definition of Done:**

- Mỗi run có danh sách agent tham gia.
- Có reviewer notes và security result.
- Không deliver nếu verification blocked.
- Có evidence pack.

### Phase 5 — Data Vault + Memory + Sync

**Mục tiêu:** Máy tính AI có dữ liệu riêng và trí nhớ riêng.

**Việc phải làm:**

1. Tạo vault_items, memory_items, sync_sources, sync_events.
2. Upload file thủ công.
3. Index file cơ bản.
4. Memory candidate review.
5. Cloud sync spec.
6. Local Sync Agent spec cho Mac/Windows/Linux.

**Definition of Done:**

- File upload vào vault theo computerId.
- Memory không tự lưu dữ liệu nhạy cảm nếu chưa được phép.
- Sync source có permission rõ.
- Có export/delete policy.

### Phase 6 — Self-Upgrading Kernel + Security Kernel

**Mục tiêu:** AI tự nâng cấp có kiểm chứng, không vượt quyền.

**Việc phải làm:**

1. Tạo `computer-os/self-upgrade-kernel`.
2. Tạo UpgradeRequest contract.
3. Tạo detect missing capability.
4. Tạo auto design spec.
5. Tạo code/config generation sandbox.
6. Tạo test-verification-engine.
7. Tạo safe-deployment-engine.
8. Tạo rollback plan.
9. Tạo truthful report validator.
10. Tạo admin email notify.

**Definition of Done:**

- AI tạo được đề xuất nâng cấp Level 1.
- Level 2 không apply nếu chưa pass test/policy.
- Level 3 luôn bị chặn chờ admin.
- Không có evidence thì không báo xong.

### Phase 7 — Mobile Remote + Admin Console

**Mục tiêu:** Điện thoại là remote control; admin có nơi kiểm soát.

**Việc phải làm:**

1. Mobile: My AI Computer.
2. Mobile: Command.
3. Mobile: Tasks.
4. Mobile: Approvals.
5. Mobile: Results.
6. Mobile: Security.
7. Admin: pending approvals.
8. Admin: truthful reports.
9. Admin: security events.
10. Admin: upgrade review board.

**Definition of Done:**

- User gửi lệnh từ mobile.
- User duyệt hành động nhạy cảm.
- Admin xem được run, evidence, approval, upgrade, report.
- Có email notify cho sự kiện quan trọng.

### Phase 8 — Production Integration + Global Expansion

**Mục tiêu:** Đủ nền để chạy production có kiểm soát và mở rộng ngôn ngữ.

**Việc phải làm:**

1. PostgreSQL production hoặc D1 production strategy.
2. Real AI providers qua gateway thống nhất.
3. Email provider.
4. Payment/entitlement.
5. Passkeys/MFA.
6. CI/CD.
7. Security scan.
8. Observability.
9. Backup/restore.
10. DNS final.
11. English language pack.
12. Future language packs.

**Definition of Done:**

- Build pass.
- Test pass.
- Migration pass.
- Security baseline pass.
- Deployment pass.
- Monitoring active.
- Rollback documented.
- Không claim production-ready trước khi tất cả gate pass.

## 14. Bộ file team dev phải tạo hoặc cập nhật

```text
docs/computer/
  COMPUTER_IAI_ONE_TRUE_VISION_MASTER_2026.md
  COMPUTER_IAI_ONE_100_PERCENT_COMPLETION_MASTER_PLAN_2026.md
  COMPUTER_IAI_ONE_AI_COMPUTER_INSTANCE_ARCHITECTURE.md
  COMPUTER_IAI_ONE_SELF_UPGRADING_AI_COMPUTER_SPEC_2026.md
  COMPUTER_IAI_ONE_AUTO_FEATURE_BUILD_AND_DEPLOY_POLICY_2026.md
  COMPUTER_IAI_ONE_ADMIN_TRUTHFUL_REPORTING_PROTOCOL_2026.md
  COMPUTER_IAI_ONE_VIETNAMESE_FIRST_LANGUAGE_SYSTEM_2026.md
  COMPUTER_IAI_ONE_AUTO_UPGRADE_TERMS_AND_SAFETY_POLICY_2026.md
  COMPUTER_IAI_ONE_SUPER_APPS_REGISTRY.md
  COMPUTER_IAI_ONE_AGENT_VERIFICATION_SYSTEM.md
  COMPUTER_IAI_ONE_SECURITY_KERNEL_SPEC.md
  COMPUTER_IAI_ONE_MOBILE_CONTROL_AND_SYNC_SPEC_2026.md
  COMPUTER_IAI_ONE_AI_COMPUTER_PRODUCT_MATRIX_2026.md
  COMPUTER_IAI_ONE_API_SURFACE_AND_CONTRACTS_2026.md
  COMPUTER_IAI_ONE_DATABASE_SCHEMA_MASTER_2026.md
  COMPUTER_IAI_ONE_OBSERVABILITY_AND_AUDIT_SPEC_2026.md
```

## 15. Lệnh giao dev chuẩn

```text
Chỉ làm trong repo:
/Users/tranhatam/Documents/Devnewproject/Computer.iai.one

Mục tiêu:
Realign Computer.iai.one thành Hệ Máy Tính AI Cá Nhân Tự Nâng Cấp Có Kiểm Chứng.
Không gọi dự án là app, chatbot, product catalog hoặc web desktop.

Việc phải làm trước:
1. Tạo hoặc cập nhật docs/computer/COMPUTER_IAI_ONE_100_PERCENT_COMPLETION_MASTER_PLAN_2026.md.
2. Cập nhật README.md theo định vị mới.
3. Tạo packages/contracts với các contract cốt lõi:
   - ComputerInstance
   - CommandRun
   - UpgradeRequest
   - EvidencePack
   - ApprovalRequest
   - PolicyDecision
   - AuditEvent
   - RollbackPlan
   - TruthfulReport
4. Tạo computer-os/instance-manager skeleton.
5. Tạo computer-os/command-kernel skeleton.
6. Tạo computer-os/self-upgrade-kernel skeleton.
7. Tạo computer-os/security-kernel skeleton.
8. Tạo docs về API Surface và Database Schema.
9. Cập nhật execution board theo Phase 0 → Phase 8.

Không được báo production-ready.
Chỉ được báo:
VISION REALIGNED + 100% COMPLETION PLAN LOCKED + CONTRACT SKELETON READY
khi các file, contracts và skeleton đã có thật.

Sau đó chạy:
pnpm typecheck
pnpm test
pnpm build

git status --short
git add docs/computer README.md packages/contracts computer-os
git commit -m "docs: lock 100 percent completion plan for computer iai one"
git push origin main

Báo cáo cuối phải có:
1. File đã tạo.
2. File đã sửa.
3. Test đã chạy.
4. Commit hash.
5. Phần còn thiếu để bắt đầu Phase 1 code production.
```

## 16. Nguyên tắc báo cáo cuối bắt buộc

Mỗi báo cáo của agent dev phải theo mẫu:

```text
STATUS: VISION REALIGNED / CONTRACT READY / CODE READY / BLOCKED

1. Tóm tắt việc đã làm
2. File đã tạo
3. File đã sửa
4. Lệnh đã chạy
5. Kết quả test/build/typecheck
6. Evidence Pack
7. Rủi ro còn lại
8. Hành động cần admin duyệt
9. Rollback plan nếu có
10. Commit hash
```

Cấm báo cáo:

```text
Đã xong
Hoàn tất 100%
Production-ready
Đã deploy
Đã fix
```

nếu không có evidence cụ thể.

## 17. Kết luận khóa

Computer.iai.one chỉ đạt 100/100 khi toàn bộ hệ chuyển từ “ý tưởng AI Computer” sang “hệ điều hành công việc có contract, lifecycle, policy, evidence, approval, rollback, observability và truthful reporting”.

Bản chất cần giữ vững:

1. Không xây app.
2. Không xây chatbot.
3. Không xây catalog.
4. Xây AI Computer Instance cho từng người.
5. Mobile là Remote Control.
6. Web là Console.
7. Computer OS là lõi.
8. Super Apps là năng lực.
9. Agents là đội xử lý.
10. Verification Court là lớp kiểm chứng.
11. Self-Upgrading Kernel là khả năng tự hoàn thiện.
12. Security Kernel là ranh giới sống còn.
13. Evidence Pack là chống báo cáo sai.
14. Vietnamese-first là nền văn hóa sản phẩm.

**Phán quyết cuối:** hướng hiện tại đúng, nhưng 100/100 chỉ đạt khi kế hoạch được biến thành các contract, API, schema, policy, test và evidence gate có thể chạy thật. Đây là bước cần làm ngay trước khi team dev viết sâu Phase 1.

## 18. Nguồn chuẩn nên đối chiếu khi triển khai

Các nguồn kỹ thuật nên dùng làm chuẩn đối chiếu trong quá trình dev:

1. OpenAI Agents SDK: agents, tools, handoffs, tracing, human-in-the-loop, MCP integration.
2. Model Context Protocol specification: tools/resources/prompts, authorization, consent, access control.
3. Agent2Agent protocol: giao tiếp và phối hợp giữa agent khác framework/vendor.
4. OWASP Top 10 for LLM Applications 2025: prompt injection, excessive agency, supply chain, data/model poisoning, sensitive information disclosure.
5. NIST SP 800-207 Zero Trust Architecture: least privilege, policy decision/enforcement, continuous verification.
6. FIDO Alliance Passkeys: phishing-resistant passwordless authentication.
7. Cloudflare Durable Objects and Cloudflare Agents: stateful coordination, long-running agents, WebSocket, scheduling, human approval flows.
8. OpenTelemetry: traces, metrics, logs, unified observability.
