# B2 — POSTGRESQL MIGRATION PLAN


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## 1. Decision

PostgreSQL is the source of truth for Computer.iai.one production.

D1/KV may be used for edge cache, feature flags, non-authoritative locks or edge routing only. They must not hold user data as source of truth.

## 2. Required production database domains

```text
Identity
Organizations
Computer Instances
Computer Templates
Entitlements
Billing usage
Connected Accounts
Vault metadata
Memory records
Commands
Runs
Run steps
Approvals
Evidence packs
Audit events
Notifications
Compliance records
```

## 3. Minimum schema groups

```sql
users
organizations
organization_members
computer_templates
computer_instances
computer_instance_apps
computer_instance_agents
entitlements
billing_usage
connected_accounts
vault_objects
memory_records
commands
runs
run_steps
approval_requests
evidence_packs
audit_events
notification_events
compliance_records
data_transfer_assessments
```

## 4. Required environment variables

```env
DATABASE_URL=
DATABASE_READ_REPLICA_URL=
DATABASE_POOL_SIZE=
DATABASE_SSL_MODE=require
```

## 5. Acceptance criteria

```text
[ ] Local migration runs.
[ ] Staging migration runs.
[ ] Rollback tested.
[ ] Tenant isolation tests pass.
[ ] ComputerInstance queries require owner/tenant.
[ ] D1/KV not used for user data source of truth.
```
