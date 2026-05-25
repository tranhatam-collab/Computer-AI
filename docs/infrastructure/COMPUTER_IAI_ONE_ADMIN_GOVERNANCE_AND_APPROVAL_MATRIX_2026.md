# COMPUTER.IAI.ONE — ADMIN GOVERNANCE & APPROVAL MATRIX 2026

**Status:** Architecture approved (not production-ready)

## Approval Levels

| Level | Actions | Approver | Escalation |
|-------|---------|----------|------------|
| L0 | Prompt, template, workflow | None (self-serve) | — |
| L1 | Super App install, connector config | Instance owner | 24h |
| L2 | Agent permission change, data export | Admin | 4h |
| L3 | Billing change, policy override, region change | Senior Admin | 1h |
| L4 | Security policy, data access grant, deployment | 2-person approval | 30min |

## Governance Board

- Admin Console at `/admin` (future)
- Approval dashboard with pending/approved/rejected/escalated
- Every approval creates audit log entry
- Escalation chain configurable per enterprise tenant

## Admin Roles

| Role | Can Approve | Can Escalate |
|------|-------------|--------------|
| User | L0 | — |
| Instance Admin | L0, L1 | L2 |
| Organization Admin | L0-L2 | L3 |
| Security Admin | L0-L3 | L4 |
| Super Admin | L0-L4 | — |
