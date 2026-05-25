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
