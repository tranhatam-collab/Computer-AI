# C2 — PERSONAL DATA CLASSIFICATION MATRIX


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## 1. Data classes

| Class | Examples | Policy |
|---|---|---|
| Public | landing, docs, marketing content | CDN/global cache allowed |
| Personal | profile, tasks, calendar, preferences | consent/export/delete |
| Sensitive | browser session metadata, evidence screenshot, memory | encryption, restricted access |
| Secret | API key, token, password fallback | vault only, no prompt/log |
| Audit | action logs, admin logs | append-only, retention |
| Billing | invoices, usage, payment state | tax/accounting retention |
| Evidence | screenshots, output, links, reports | retention/legal hold/purge |
| Memory | user/project memory | user control, delete/export |
| Browser session | cookies/storage state | encrypted, revoke, expire |
| Credential metadata | provider, scopes, key refs | restricted, audited |

## 2. Required metadata fields

```text
data_class
owner_id
tenant_id
computer_id
region
retention_policy_id
legal_hold
created_at
updated_at
deleted_at
```
