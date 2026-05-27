# C6 — GDPR ERASURE, EXPORT AND LEGAL HOLD MAP


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## 1. Scope

Computer.iai.one may serve EU users. GDPR erasure/export readiness must be built into Data Vault, Memory, Evidence, Audit and Browser Session design.

## 2. Erasure map

| Data | Erasure behavior |
|---|---|
| Profile | delete or anonymize |
| Files | delete unless legal hold |
| Memory | delete selected/all records |
| Browser session | revoke/delete encrypted state |
| Credential vault | revoke/delete vault item |
| Evidence | delete/pseudonymize unless legal hold |
| Audit | retain if legal/security basis, pseudonymize where possible |
| Billing | retain as legally required |

## 3. AI memory rule

Memory must be deletable from:

```text
PostgreSQL records
Vector index
Search index
Caches
Evidence summaries
Derived user profile
```
