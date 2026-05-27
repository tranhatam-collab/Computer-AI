# C4 — DATA VAULT, MEMORY, EVIDENCE RETENTION POLICY


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## 1. Data retention categories

| Data | Default retention | User delete? | Notes |
|---|---:|---:|---|
| Vault files | user-controlled | yes | except legal hold |
| Memory records | user-controlled | yes | must support selective deletion |
| Browser sessions | short-lived | revoke | expire/rotate |
| Credential vault | until revoked | yes | no raw secret export |
| Evidence packs | configurable | partial | may have legal hold |
| Audit logs | longer retention | limited | pseudonymize if needed |
| Billing records | legal/accounting period | limited | tax/accounting rules |
| System metrics | short/medium | no personal detail | aggregate where possible |

## 2. Deletion workflow

```text
User requests deletion
↓
Classify data
↓
Check legal hold
↓
Delete or pseudonymize
↓
Propagate to storage/index/cache
↓
Write deletion audit event
↓
Generate confirmation
```
