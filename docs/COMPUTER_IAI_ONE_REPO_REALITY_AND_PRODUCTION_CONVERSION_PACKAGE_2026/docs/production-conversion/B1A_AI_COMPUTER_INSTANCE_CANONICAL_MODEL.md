# B1A — AI COMPUTER INSTANCE CANONICAL MODEL


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## 1. Definition

An AI Computer Instance is the private operational computer owned by a user or organization inside Computer.iai.one.

It is not a product card. It is not just a subscription. It is the core runtime identity of the system.

## 2. Canonical object

```json
{
  "computerId": "comp_001",
  "ownerId": "user_001",
  "tenantId": "tenant_001",
  "computerType": "business",
  "region": "apac",
  "status": "active",
  "vaultId": "vault_001",
  "memoryId": "mem_001",
  "policyId": "policy_001",
  "entitlementId": "ent_001",
  "apps": ["ai_browser", "smart_calendar", "content_studio"],
  "agents": ["planner", "executor", "reviewer", "security", "evidence"],
  "connectedAccounts": [],
  "createdAt": "2026-05-27T00:00:00Z",
  "updatedAt": "2026-05-27T00:00:00Z"
}
```

## 3. Lifecycle states

```text
draft
provisioning
active
restricted
past_due
export_only
suspended
archived
deleted
```

## 4. Mandatory relationships

```text
ComputerInstance -> Owner
ComputerInstance -> Organization/Tenant
ComputerInstance -> Entitlement
ComputerInstance -> Region
ComputerInstance -> Vault
ComputerInstance -> Memory
ComputerInstance -> Policy
ComputerInstance -> Enabled Super Apps
ComputerInstance -> Agent Team
ComputerInstance -> Evidence Packs
ComputerInstance -> Audit Events
```

## 5. Required APIs

```http
POST /computers/provision
GET /computers/me
GET /computers/:computerId
PATCH /computers/:computerId
POST /computers/:computerId/restrict
POST /computers/:computerId/archive
POST /computers/:computerId/export
```

## 6. Definition of Done

```text
Computer.iai.one is not production-ready until every user workflow resolves through a ComputerInstance.
```
