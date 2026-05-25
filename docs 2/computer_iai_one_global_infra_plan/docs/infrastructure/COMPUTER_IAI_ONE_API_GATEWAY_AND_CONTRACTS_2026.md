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
