# COMPUTER.IAI.ONE — GLOBAL INFRASTRUCTURE & SECURITY MASTER 2026


<!-- FILE: 00_README_MASTER_INDEX.md -->

# COMPUTER.IAI.ONE GLOBAL INFRASTRUCTURE & SECURITY MASTER PACKAGE 2026

**Dự án:** Computer.iai.one  
**Định vị:** Hệ Máy Tính AI Cá Nhân Tự Nâng Cấp Có Kiểm Chứng  
**Tên tiếng Anh phụ:** Self-Upgrading Personal AI Computer System  
**Ngôn ngữ gốc:** Tiếng Việt Nam  
**Mục tiêu bộ file:** Chốt cấu trúc máy chủ toàn cầu và hệ thống an toàn bảo mật để Computer.iai.one có thể chạy ổn định, mở rộng và kiểm chứng trên phạm vi toàn cầu.

## Phán quyết khóa

Computer.iai.one không được xây như một server AI đơn lẻ. Hệ thống phải được thiết kế như một **Global AI Computer Infrastructure** gồm:

1. Global Edge Layer.
2. Regional Control Plane.
3. AI Computer Instance Layer.
4. Secure Runtime Plane.
5. Data Vault, Memory, Evidence và Audit Plane.
6. Self-Upgrading Kernel có kiểm soát.
7. Admin Governance Plane.
8. Backup, Rollback và Disaster Recovery Plane.

Mỗi người dùng phải có một **AI Computer Instance** riêng. Instance đó không chỉ là account, mà là một máy tính AI cá nhân có quyền riêng, dữ liệu riêng, trí nhớ riêng, ứng dụng riêng, agent team riêng, policy riêng, audit riêng và khả năng tự nâng cấp trong phạm vi an toàn.

## Cấu trúc bộ file

```text
00_README_MASTER_INDEX.md

docs/computer/
  COMPUTER_IAI_ONE_100_PERCENT_COMPLETION_MASTER_PLAN_2026.md

docs/infrastructure/
  COMPUTER_IAI_ONE_GLOBAL_INFRASTRUCTURE_MASTER_PLAN_2026.md
  COMPUTER_IAI_ONE_GLOBAL_SERVER_ARCHITECTURE_2026.md
  COMPUTER_IAI_ONE_ZERO_TRUST_SECURITY_ARCHITECTURE_2026.md
  COMPUTER_IAI_ONE_REGIONAL_DATA_RESIDENCY_PLAN_2026.md
  COMPUTER_IAI_ONE_RUNTIME_SANDBOX_SECURITY_SPEC_2026.md
  COMPUTER_IAI_ONE_BACKUP_ROLLBACK_DR_PLAN_2026.md
  COMPUTER_IAI_ONE_OBSERVABILITY_AND_INCIDENT_RESPONSE_2026.md
  COMPUTER_IAI_ONE_ADMIN_GOVERNANCE_AND_APPROVAL_MATRIX_2026.md
  COMPUTER_IAI_ONE_INFRASTRUCTURE_EXECUTION_BOARD_2026.md
  COMPUTER_IAI_ONE_API_GATEWAY_AND_CONTRACTS_2026.md
  COMPUTER_IAI_ONE_SELF_UPGRADING_INFRASTRUCTURE_POLICY_2026.md

patches/
  README_REPLACEMENT.md
  PNPM_WORKSPACE_REPLACEMENT.yaml
  GIT_COMMANDS_TO_APPLY.md

checklists/
  FINAL_100_PERCENT_INFRASTRUCTURE_CHECKLIST.md
```

## Thứ tự đọc cho team dev

1. Đọc `00_README_MASTER_INDEX.md` để hiểu định vị tổng.
2. Đọc `docs/computer/COMPUTER_IAI_ONE_100_PERCENT_COMPLETION_MASTER_PLAN_2026.md` để hiểu vision 100/100.
3. Đọc `COMPUTER_IAI_ONE_GLOBAL_INFRASTRUCTURE_MASTER_PLAN_2026.md` để hiểu toàn bộ hạ tầng.
4. Đọc lần lượt server architecture, zero-trust, regional data, sandbox, backup, observability, admin governance.
5. Áp dụng hai patch README và pnpm workspace.
6. Chạy checklist cuối.

## Trạng thái được phép báo sau khi áp dụng docs

```text
GLOBAL INFRASTRUCTURE ARCHITECTURE READY
SECURITY MODEL DEFINED
NOT PRODUCTION-READY UNTIL VERIFIED
```

Không được báo production-ready nếu chưa có provider thật, database thật, auth/passkeys, payment, email, admin console, CI/CD, observability, backup restore test và security verification.

## Tài liệu nền tham chiếu

Bản kế hoạch này được khóa theo tài liệu nội bộ đã lập cho Computer.iai.one và đối chiếu với các nguồn kỹ thuật chính thức sau:

1. Cloudflare Workers Documentation: https://developers.cloudflare.com/workers/
2. Cloudflare Agents Documentation: https://developers.cloudflare.com/agents/
3. NIST SP 800-207 Zero Trust Architecture: https://csrc.nist.gov/pubs/sp/800/207/final
4. OWASP GenAI Security Project, LLM01 Prompt Injection: https://genai.owasp.org/llmrisk/llm01-prompt-injection/
5. OWASP Top 10 for LLM Applications: https://genai.owasp.org/llm-top-10/

Nguyên tắc diễn đạt công khai: không hứa “bảo mật tuyệt đối”. Cách nói chuẩn là thiết kế theo zero-trust, least privilege, tenant isolation, sandbox, audit, evidence, approval, backup và rollback.



<!-- FILE: docs/computer/COMPUTER_IAI_ONE_100_PERCENT_COMPLETION_MASTER_PLAN_2026.md -->

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



<!-- FILE: docs/infrastructure/COMPUTER_IAI_ONE_GLOBAL_INFRASTRUCTURE_MASTER_PLAN_2026.md -->

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



<!-- FILE: docs/infrastructure/COMPUTER_IAI_ONE_GLOBAL_SERVER_ARCHITECTURE_2026.md -->

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



<!-- FILE: docs/infrastructure/COMPUTER_IAI_ONE_ZERO_TRUST_SECURITY_ARCHITECTURE_2026.md -->

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



<!-- FILE: docs/infrastructure/COMPUTER_IAI_ONE_REGIONAL_DATA_RESIDENCY_PLAN_2026.md -->

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



<!-- FILE: docs/infrastructure/COMPUTER_IAI_ONE_RUNTIME_SANDBOX_SECURITY_SPEC_2026.md -->

# COMPUTER.IAI.ONE RUNTIME SANDBOX SECURITY SPEC 2026

## 1. Mục tiêu

Agent của Computer.iai.one sẽ đọc file, chạy code, dùng browser, tạo tài liệu, gọi API, xử lý dữ liệu và tự nâng cấp. Đây là khu vực rủi ro cao nhất. Tài liệu này khóa nguyên tắc sandbox để AI làm được việc thật nhưng không phá hệ thống.

## 2. Nguyên tắc runtime

1. Agent không chạy trực tiếp trên server chính.
2. Agent không có production secret mặc định.
3. Mỗi command run có runtime context riêng.
4. Runtime phải có giới hạn CPU, RAM, thời gian, network và filesystem.
5. Tool call phải qua policy.
6. Output phải đi qua verification.
7. Write action rủi ro cao phải có approval.
8. Mọi runtime action phải có audit.

## 3. Runtime classes

| Runtime class | Dùng cho | Quyền |
|---|---|---|
| edge_light | Routing, auth pre-check | Không data nhạy cảm |
| agent_standard | Planning, orchestration | Metadata + scoped access |
| file_sandbox | PDF/DOCX/XLSX/image/code parse | Isolated filesystem |
| code_sandbox | Test/build/code execution | No host access |
| browser_sandbox | Web read/capture | Network policy |
| connector_runtime | Google/GitHub/Slack/Drive sync | OAuth scoped |
| self_upgrade_sandbox | Generate/test module | No production deploy |
| enterprise_dedicated | Tenant riêng | Contract policy |

## 4. Filesystem policy

```text
/runtime/{run_id}/input      read-only input files
/runtime/{run_id}/work       temporary workdir
/runtime/{run_id}/output     generated artifacts
/runtime/{run_id}/logs       runtime logs
/runtime/{run_id}/evidence   proof pack
```

Cấm:

```text
Access host root filesystem
Access other tenant runtime
Access production env file
Access raw secrets
Write outside runtime workspace
Persist hidden file without audit
```

## 5. Network policy

Default deny, allow by policy.

| Destination | Default |
|---|---|
| Public web | Allow for browser/research runtime |
| Internal API | Scoped service token only |
| Database | Deny direct |
| Secret vault | Deny direct |
| Payment provider | Only billing service |
| Email provider | Approval/policy only |
| GitHub | Scoped OAuth/token only |
| Unknown domain | Risk score + policy |

## 6. Code execution policy

Code sandbox phải có:

1. Ephemeral container/VM.
2. No privileged mode.
3. Resource limits.
4. Network restricted.
5. Dependency install policy.
6. Malware scan for artifacts.
7. Test output capture.
8. Kill switch.
9. Timeout.
10. Evidence log.

## 7. Browser automation policy

Browser sandbox phải:

1. Chạy isolated browser.
2. Không dùng admin session.
3. Không tự nhập password/secret.
4. Không submit form nhạy cảm nếu chưa approval.
5. Không mua hàng/thanh toán nếu chưa approval.
6. Không click destructive action nếu chưa approval.
7. Ghi screenshot/evidence khi cần.
8. Chống prompt injection từ website.

## 8. Self-upgrade runtime policy

Self-upgrade không được deploy trực tiếp lên production. Luồng đúng:

```text
Generate code
→ Static analysis
→ Unit test
→ Security check
→ Integration test
→ Evidence pack
→ Human/admin approval if Level 2/3
→ Staging deploy
→ Verification
→ Controlled promotion
→ Rollback ready
```

## 9. Risk levels

| Risk | Ví dụ | Xử lý |
|---|---|---|
| Low | Tạo template, format document | Auto + log |
| Medium | Gọi connector, tạo automation | Policy + evidence |
| High | Gửi email, sửa file user, chạy code | Approval có thể cần |
| Critical | Billing, permission, DB, deploy, key | Admin approval bắt buộc |

## 10. Evidence bắt buộc

Mỗi runtime run phải có:

```json
{
  "runtimeId": "rt_001",
  "runId": "run_001",
  "tenantId": "tenant_001",
  "computerId": "comp_001",
  "runtimeClass": "code_sandbox",
  "startedAt": "...",
  "endedAt": "...",
  "networkAccess": [],
  "filesRead": [],
  "filesWritten": [],
  "commandsExecuted": [],
  "toolCalls": [],
  "testsRun": [],
  "riskFlags": [],
  "resultHash": "sha256:..."
}
```

## 11. Checklist hoàn tất

- [ ] Runtime class enum.
- [ ] Sandbox filesystem.
- [ ] Sandbox network policy.
- [ ] Timeout/resource limits.
- [ ] Tool permission matrix.
- [ ] Evidence pack generation.
- [ ] Approval gate for risky actions.
- [ ] Prompt injection defense for file/web/tool content.
- [ ] Runtime kill switch.
- [ ] Runtime logs and trace ID.



<!-- FILE: docs/infrastructure/COMPUTER_IAI_ONE_BACKUP_ROLLBACK_DR_PLAN_2026.md -->

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



<!-- FILE: docs/infrastructure/COMPUTER_IAI_ONE_OBSERVABILITY_AND_INCIDENT_RESPONSE_2026.md -->

# COMPUTER.IAI.ONE OBSERVABILITY & INCIDENT RESPONSE 2026

## 1. Mục tiêu

Không thể vận hành AI Computer toàn cầu nếu không biết lệnh nào đang chạy, agent nào đang gọi tool, runtime nào lỗi, vùng nào chậm, chi phí nào tăng, output nào thiếu evidence và hành động nào có rủi ro.

Tài liệu này khóa observability và incident response cho Computer.iai.one.

## 2. Trace ID bắt buộc

Mỗi request/run phải có chuỗi định danh:

```text
request_id
trace_id
user_id
tenant_id
computer_id
command_id
run_id
region_id
runtime_id
agent_id
tool_call_id
evidence_id
```

## 3. Log categories

| Log | Nội dung |
|---|---|
| Access log | Request, IP, user, device |
| Auth log | Login, MFA, passkey, token |
| Command log | Lifecycle command run |
| Agent log | Agent decision, handoff, error |
| Tool log | Tool called, params redacted, result |
| Runtime log | CPU, RAM, timeout, sandbox events |
| Security log | Risk, injection, denied action |
| Audit log | Admin/user/system action |
| Billing log | Usage, quota, invoice, webhook |
| Evidence log | Output proof, tests, hashes |

## 4. Metrics cần đo

| Metric | Mục tiêu |
|---|---|
| API latency p50/p95/p99 | Hiệu năng gateway |
| Error rate | Độ ổn định |
| Command completion time | Trải nghiệm user |
| Agent failure rate | Chất lượng agent |
| Tool denial rate | Policy health |
| Sandbox timeout rate | Runtime sizing |
| Prompt injection flags | Security health |
| Evidence missing rate | Truthful reporting health |
| Approval pending time | Admin bottleneck |
| Cost per command | Unit economics |
| Token/provider spend | Cost control |

## 5. Dashboards bắt buộc

1. Global Traffic Dashboard.
2. API Health Dashboard.
3. Region Health Dashboard.
4. Command Runs Dashboard.
5. Agent Runs Dashboard.
6. Runtime Sandbox Dashboard.
7. Security Events Dashboard.
8. Prompt Injection Dashboard.
9. Evidence Dashboard.
10. Admin Approval Dashboard.
11. Billing & Quota Dashboard.
12. Cost Dashboard.
13. Incident Dashboard.
14. Backup/Restore Dashboard.

## 6. Alerts

| Alert | Ngưỡng gợi ý |
|---|---|
| API error spike | 5xx > 2% trong 5 phút |
| Region latency | p95 tăng > 2x baseline |
| Command stuck | Run quá SLA |
| Sandbox timeout | > 5% run timeout |
| Evidence missing | Bất kỳ completed run thiếu evidence |
| Security denied spike | Tăng bất thường |
| Prompt injection spike | Tăng bất thường |
| Cost spike | Chi phí tăng > 30% ngày |
| Backup failed | Bất kỳ job backup critical fail |
| Admin action critical | Real-time notification |

## 7. Incident severity

| Severity | Ví dụ | Response |
|---|---|---|
| SEV1 | Data leak, production outage, billing/security compromised | Immediate war room |
| SEV2 | Region degraded, command runs failing broadly | Same-day fix |
| SEV3 | Module bug, limited tenant impact | Planned fix |
| SEV4 | Minor UI/docs issue | Backlog |

## 8. Incident workflow

```text
Detect
→ Triage
→ Assign severity
→ Freeze risky automation if needed
→ Contain
→ Preserve evidence
→ Fix or rollback
→ Verify
→ Communicate
→ Postmortem
→ Prevent recurrence
```

## 9. Postmortem template

```md
# Incident Postmortem

## Summary
## Timeline
## Impact
## Root Cause
## Detection
## Response
## What Worked
## What Failed
## Data/Security Assessment
## User Communication
## Corrective Actions
## Owner
## Due Dates
## Evidence Links
```

## 10. Checklist hoàn tất

- [ ] Trace ID end-to-end.
- [ ] Centralized logging.
- [ ] Redaction of secrets/PII.
- [ ] Metrics dashboard.
- [ ] Security dashboard.
- [ ] Cost dashboard.
- [ ] Evidence dashboard.
- [ ] Alerts.
- [ ] Incident runbook.
- [ ] Postmortem template.



<!-- FILE: docs/infrastructure/COMPUTER_IAI_ONE_ADMIN_GOVERNANCE_AND_APPROVAL_MATRIX_2026.md -->

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



<!-- FILE: docs/infrastructure/COMPUTER_IAI_ONE_INFRASTRUCTURE_EXECUTION_BOARD_2026.md -->

# COMPUTER.IAI.ONE INFRASTRUCTURE EXECUTION BOARD 2026

## 1. Mục tiêu

Execution board này chuyển kế hoạch hạ tầng thành danh sách việc dev/infra/security có thể triển khai theo thứ tự.

## 2. Phase 0 — Repo realignment

| ID | Task | DoD | Priority |
|---|---|---|---|
| P0-01 | Update README định vị đúng | README không còn gọi là catalog đơn thuần | High |
| P0-02 | Update pnpm-workspace | Có computer-os, super-apps, agents | High |
| P0-03 | Add infrastructure docs | 7+ docs trong docs/infrastructure | High |
| P0-04 | Add contracts package plan | Contracts list rõ | High |
| P0-05 | Verify build hiện tại | `pnpm run verify` chạy được hoặc ghi blocker | High |

## 3. Phase 1 — Global edge foundation

| ID | Task | DoD | Priority |
|---|---|---|---|
| P1-01 | Cloudflare DNS setup | Domain/subdomain mapped | High |
| P1-02 | TLS/HSTS | HTTPS enforced | High |
| P1-03 | WAF baseline | Managed rules enabled | High |
| P1-04 | Rate limiting | API protected | High |
| P1-05 | Bot protection | Basic bot control | Medium |
| P1-06 | Status page | Public/internal status | Medium |

## 4. Phase 2 — API gateway and region routing

| ID | Task | DoD | Priority |
|---|---|---|---|
| P2-01 | API gateway shell | `/api/*` unified | High |
| P2-02 | Trace ID middleware | Every request has trace | High |
| P2-03 | Auth middleware | User identity available | High |
| P2-04 | Tenant middleware | tenant_id required | High |
| P2-05 | Region router | region selected by policy | High |
| P2-06 | Error normalization | Standard error schema | Medium |

## 5. Phase 3 — Data and instance layer

| ID | Task | DoD | Priority |
|---|---|---|---|
| P3-01 | ComputerInstance schema | Contract + DB migration | High |
| P3-02 | CommandRun schema | Contract + DB migration | High |
| P3-03 | DataVault schema | Contract + storage binding | High |
| P3-04 | Memory schema | Basic memory store | Medium |
| P3-05 | EvidencePack schema | Evidence generated per run | High |
| P3-06 | AuditEvent schema | Append-only events | High |

## 6. Phase 4 — Security kernel

| ID | Task | DoD | Priority |
|---|---|---|---|
| P4-01 | PolicyDecision contract | Every risky action checked | High |
| P4-02 | Tool permission matrix | Tool rights defined | High |
| P4-03 | Secret vault abstraction | No raw secret to agent | High |
| P4-04 | ApprovalRequest flow | Approval states | High |
| P4-05 | Prompt injection flags | Risk detection events | Medium |
| P4-06 | Admin access protection | Zero Trust/SSO policy | High |

## 7. Phase 5 — Runtime sandbox

| ID | Task | DoD | Priority |
|---|---|---|---|
| P5-01 | RuntimeClass enum | Classes defined | High |
| P5-02 | File sandbox | Isolated file workspace | High |
| P5-03 | Code sandbox | Safe test execution | High |
| P5-04 | Browser sandbox | Isolated browser use | Medium |
| P5-05 | Runtime evidence logs | Runtime action captured | High |
| P5-06 | Runtime kill switch | Stop run safely | High |

## 8. Phase 6 — Self-upgrading kernel

| ID | Task | DoD | Priority |
|---|---|---|---|
| P6-01 | UpgradeRequest schema | Request lifecycle | High |
| P6-02 | Feature detection | Missing capability recorded | Medium |
| P6-03 | Auto design report | Spec generated | Medium |
| P6-04 | Code generation sandbox | Code created in sandbox | High |
| P6-05 | Test verification | Test run evidence | High |
| P6-06 | Upgrade approval board | Level 2/3 approval | High |
| P6-07 | Rollback plan | Required for every upgrade | High |

## 9. Phase 7 — Observability and incident

| ID | Task | DoD | Priority |
|---|---|---|---|
| P7-01 | Logs centralized | Queryable logs | High |
| P7-02 | Metrics dashboard | API/runtime/security | High |
| P7-03 | Alerts | Critical alerts | High |
| P7-04 | Incident runbook | SEV process | High |
| P7-05 | Postmortem template | Standard template | Medium |
| P7-06 | Cost dashboard | AI/runtime cost tracked | Medium |

## 10. Phase 8 — Backup and production gates

| ID | Task | DoD | Priority |
|---|---|---|---|
| P8-01 | DB backup | PITR or snapshot | High |
| P8-02 | Object versioning | File rollback | High |
| P8-03 | Audit immutable backup | Audit protected | High |
| P8-04 | Restore drill | Evidence of restore | High |
| P8-05 | Production readiness gate | Checklist enforced | High |
| P8-06 | DR simulation | Failover tested | Medium |

## 11. Final status allowed

```text
GLOBAL INFRASTRUCTURE ARCHITECTURE READY
SECURITY MODEL DEFINED
NOT PRODUCTION-READY UNTIL VERIFIED
```



<!-- FILE: docs/infrastructure/COMPUTER_IAI_ONE_API_GATEWAY_AND_CONTRACTS_2026.md -->

# COMPUTER.IAI.ONE API GATEWAY & CONTRACTS 2026

## 1. Mục tiêu

Khóa API gateway và data contracts để team dev triển khai nhất quán giữa web console, mobile remote, admin console, sync agent, computer-os, super-apps và agent runtime.

## 2. API route groups

```text
/api/auth/*
/api/computers/*
/api/commands/*
/api/runs/*
/api/files/*
/api/sync/*
/api/apps/*
/api/agents/*
/api/approvals/*
/api/evidence/*
/api/audit/*
/api/upgrades/*
/api/admin/*
/api/billing/*
/api/health/*
```

## 3. Standard request context

Every request must resolve:

```ts
export type RequestContext = {
  requestId: string;
  traceId: string;
  userId?: string;
  tenantId?: string;
  computerId?: string;
  regionId: string;
  deviceId?: string;
  sessionId?: string;
  roles: string[];
  policyVersion: string;
};
```

## 4. Core contracts

### 4.1 ComputerInstance

```ts
export type ComputerInstance = {
  computerId: string;
  tenantId: string;
  ownerId: string;
  regionId: string;
  computerType: string;
  languagePrimary: "vi" | "en" | "zh" | "ko" | "km" | "fr" | string;
  apps: string[];
  agents: string[];
  vaultId: string;
  memoryId: string;
  policyId: string;
  quotaPlan: string;
  runtimeClass: string;
  status: "active" | "suspended" | "archived";
  createdAt: string;
  updatedAt: string;
};
```

### 4.2 CommandRun

```ts
export type CommandRun = {
  runId: string;
  commandId: string;
  tenantId: string;
  computerId: string;
  ownerId: string;
  regionId: string;
  inputType: "text" | "voice" | "file" | "template" | "workflow";
  commandText: string;
  lifecycleState:
    | "created"
    | "authenticated"
    | "region_routed"
    | "tenant_checked"
    | "classified"
    | "planned"
    | "policy_checked"
    | "approved_if_needed"
    | "queued"
    | "executing"
    | "verifying"
    | "security_reviewing"
    | "packaging"
    | "delivered"
    | "archived"
    | "failed";
  riskLevel: "low" | "medium" | "high" | "critical";
  evidencePackId?: string;
  approvalRequestId?: string;
  rollbackPlanId?: string;
  createdAt: string;
  updatedAt: string;
};
```

### 4.3 EvidencePack

```ts
export type EvidencePack = {
  evidencePackId: string;
  runId: string;
  tenantId: string;
  computerId: string;
  filesCreated: string[];
  filesModified: string[];
  testsRun: string[];
  testResult: "pass" | "fail" | "not_run";
  securityResult: "pass" | "fail" | "warning" | "not_run";
  riskFlags: string[];
  toolCalls: string[];
  runtimeLogs: string[];
  outputHash?: string;
  rollbackPlanId?: string;
  createdAt: string;
};
```

### 4.4 PolicyDecision

```ts
export type PolicyDecision = {
  decisionId: string;
  tenantId: string;
  computerId: string;
  action: string;
  resource: string;
  result: "allow" | "deny" | "approval_required";
  reason: string;
  riskLevel: "low" | "medium" | "high" | "critical";
  policyVersion: string;
  createdAt: string;
};
```

### 4.5 ApprovalRequest

```ts
export type ApprovalRequest = {
  approvalRequestId: string;
  tenantId: string;
  computerId: string;
  runId?: string;
  upgradeId?: string;
  requestedBy: "user" | "agent" | "system" | "admin";
  action: string;
  riskLevel: "medium" | "high" | "critical";
  status: "pending" | "approved" | "rejected" | "expired" | "cancelled";
  approversRequired: number;
  approvers: string[];
  evidencePackId?: string;
  rollbackPlanId?: string;
  createdAt: string;
  decidedAt?: string;
};
```

### 4.6 UpgradeRequest

```ts
export type UpgradeRequest = {
  upgradeId: string;
  tenantId: string;
  computerId: string;
  requestedFeature: string;
  upgradeLevel: 1 | 2 | 3;
  status:
    | "created"
    | "designing"
    | "coding"
    | "testing"
    | "security_review"
    | "awaiting_approval"
    | "approved"
    | "applied_to_instance"
    | "promoted_to_central"
    | "rejected"
    | "rolled_back";
  filesCreated: string[];
  filesModified: string[];
  testsRun: string[];
  evidencePackId?: string;
  approvalRequestId?: string;
  rollbackPlanId?: string;
  createdAt: string;
  updatedAt: string;
};
```

### 4.7 TruthfulReport

```ts
export type TruthfulReport = {
  reportId: string;
  runId?: string;
  upgradeId?: string;
  finalStatus: "not_started" | "in_progress" | "blocked" | "failed" | "verified_completed";
  summaryVi: string;
  actionsTaken: string[];
  filesCreated: string[];
  filesModified: string[];
  testsRun: string[];
  testResult: "pass" | "fail" | "not_run";
  securityResult: "pass" | "fail" | "warning" | "not_run";
  evidencePackId?: string;
  rollbackAvailable: boolean;
  knownLimitations: string[];
  nextRequiredActions: string[];
  createdAt: string;
};
```

## 5. Standard error schema

```ts
export type ApiError = {
  error: true;
  code: string;
  messageVi: string;
  messageEn?: string;
  requestId: string;
  traceId: string;
  retryable: boolean;
  evidencePackId?: string;
};
```

## 6. API gateway checklist

- [ ] RequestContext middleware.
- [ ] Auth middleware.
- [ ] Tenant middleware.
- [ ] Region router.
- [ ] Rate limiter.
- [ ] Policy pre-check.
- [ ] Audit event writer.
- [ ] Error normalization.
- [ ] Trace ID propagation.
- [ ] Secrets redaction.



<!-- FILE: docs/infrastructure/COMPUTER_IAI_ONE_SELF_UPGRADING_INFRASTRUCTURE_POLICY_2026.md -->

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



<!-- FILE: checklists/FINAL_100_PERCENT_INFRASTRUCTURE_CHECKLIST.md -->

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
