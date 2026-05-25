# COMPUTER.IAI.ONE — RUNTIME SANDBOX & CONTROL PLANE BOUNDARY 2026

**Status:** SPEC LOCKED
**Date:** 2026-05-26
**Scope:** computer.iai.one execution architecture

---

## 1. Nguyên tắc tách biệt

**Control Plane không được trực tiếp chạy code, browser, file, hoặc agent nguy hiểm.**

Mọi tác vụ risky phải đi qua Sandbox Runtime. Agent không được đụng production DB trực tiếp.

---

## 2. Control Plane (An toàn, ổn định)

### Trách nhiệm

| Chức năng | Mô tả |
|-----------|-------|
| User identity | Auth, session, passkeys, device trust |
| Entitlement | Quyền hạn, plans, limits, quota |
| Command routing | Nhận lệnh, validate, route tới sandbox |
| Approval gate | Quyết định cho phép chạy hay không |
| State sync | Đồng bộ trạng thái giữa user và computer instance |
| Audit | Ghi log mọi hành động |
| Billing | Tính phí, giới hạn, cảnh báo |
| Orchestration | Tạo/hủy sandbox instance |

### Không được làm

- Không chạy user code
- Không mở browser
- Không xử lý file untrusted
- Không gọi AI provider trực tiếp (qua sandbox)
- Không đọc/ghi DB trực tiếp từ agent (qua API)

### Công nghệ

- Fastify/Node trên ECS Fargate hoặc Hetzner
- PostgreSQL (không direct access từ sandbox)
- Redis (session, quota)
- Durable Objects (coordination, không data)

---

## 3. Sandbox Runtime (Cô lập, có giám sát)

### Trách nhiệm

| Loại sandbox | Chức năng | Ví dụ |
|-------------|-----------|-------|
| Code Sandbox | Chạy code user/agent | Python, JS, shell scripts |
| Browser Sandbox | Truy cập web | Scraping, automation, testing |
| File Sandbox | Xử lý file | Convert, scan, extract, preview |
| Agent Runtime | Chạy agent workflow | Multi-step, tool calling, planning |
| Workflow Runtime | Thực thi flow | Node-based execution |
| Self-Upgrade Runtime | Nâng cấp system | Patch, config change, rollback |

### Yêu cầu bắt buộc

| Yêu cầu | Implementation |
|---------|---------------|
| Network isolation | Không ra internet trực tiếp, qua proxy |
| Resource quota | CPU, memory, disk, time limit |
| No persistent storage | Kết quả trả về control plane, sandbox xóa sau chạy |
| Read-only base image | Không thay đổi system files |
| No secret access | Sandbox không biết API keys, chỉ nhận leased token |
| Audit output | Mọi output được log và verify |
| Kill switch | Control plane có thể terminate sandbox bất cứ lúc nào |

### Công nghệ

| Sandbox type | Công nghệ gợi ý |
|-------------|----------------|
| Code | Firecracker microVM, gVisor, hoặc Docker với seccomp |
| Browser | Puppeteer/Playwright trong container cô lập |
| File | ClamAV scanning + quarantine trước xử lý |
| Agent | OpenAI Agents SDK trong container giới hạn |
| Workflow | Temporal / self-hosted worker với state machine |

---

## 4. Boundary (API giữa Control Plane và Sandbox)

```
Control Plane ──POST /sandbox/run────> Sandbox Runtime
              <───result + logs────────
              ───terminate (if needed)──>
```

### API Contract

```typescript
interface SandboxRequest {
  runId: string;
  userId: string;
  computerInstanceId: string;
  type: 'code' | 'browser' | 'file' | 'agent' | 'workflow';
  payload: unknown;
  maxDurationMs: number;
  maxMemoryMb: number;
  approvedBy?: string; // approval ID nếu required
}

interface SandboxResponse {
  runId: string;
  status: 'success' | 'failed' | 'timeout' | 'killed';
  output: unknown;
  logs: string[];
  artifacts: string[]; // S3 references
  cost: number; // estimated cost
  confidence?: number; // nếu có verification
}
```

### Ràng buộc

- Sandbox không có quyền gọi Control Plane API trừ `report_result`
- Sandbox không access PostgreSQL trực tiếp
- Sandbox không biết secret keys (chỉ nhận temporary token với scope giới hạn)
- Sandbox không persistent (kết quả phải upload S3 hoặc trả về trong vòng 60 giây)

---

## 5. Approval Required Actions

Các hành động sau bắt buộc phải qua approval gate trước khi sandbox chạy:

| Action | Approval | Channel |
|--------|----------|---------|
| Email send | Yes | Mobile push |
| DNS change | Yes | Mobile push + admin |
| Public deploy | Yes | Mobile push |
| Payment | Yes | Mobile push + biometric |
| Secret access | Yes | Mobile push + passkey |
| External data export | Yes | Mobile push |
| Model escalation (>$1) | Yes | Mobile push |
| Self-upgrade | Yes | Mobile push + admin |
| Code execution (untrusted) | Yes | Mobile push |
| Browser automation (external) | Yes | Mobile push |

---

## 6. Per-computer secret scope

Không chỉ "tenant secrets", mà phải có:

- **Per-computer secret policy:** Mỗi computer instance có scope secret riêng
- **Per-run secret lease:** Secret chỉ valid trong 1 run, auto-expire
- **Secret never enters transcript:** Không log, không hiển thị trong output
- **Secret expiration window:** Tối đa 1 giờ cho leased token

---

## 7. Result verification lane

Với vision "nhiều agent kiểm tra chéo", phải có:

| Agent | Nhiệm vụ |
|-------|----------|
| Source Agent | Tạo kết quả ban đầu |
| Critic Agent | Review logic, tìm lỗi |
| Verifier Agent | Kiểm tra facts, citations |
| Policy Agent | Kiểm tra compliance, approval |
| Summary Agent | Tổng hợp, confidence score |

**Output:** Proof bundle với confidence score, không chỉ là text response.

---

## 8. Diagram

```
┌─────────────────────────────────────┐
│         Control Plane               │
│  (Fastify/Node — ECS/Hetzner)       │
│                                     │
│  Auth → Entitlement → Approval      │
│  → Route → Orchestrate → Audit      │
│  → Billing → State Sync             │
└─────────────┬───────────────────────┘
              │ API boundary
              ▼
┌─────────────────────────────────────┐
│      Sandbox Runtime Pool           │
│  ┌─────────┐ ┌─────────┐ ┌───────┐  │
│  │ Code    │ │ Browser │ │ Agent │  │
│  │ Sandbox │ │ Sandbox │ │ Run   │  │
│  └─────────┘ └─────────┘ └───────┘  │
│                                     │
│  Isolated | No persistent | Audited │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│         Result + Artifacts            │
│         (S3 + PostgreSQL)             │
└─────────────────────────────────────┘
```

---

*Spec locked. Sandbox isolation is non-negotiable.*
