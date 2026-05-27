# C1 — VIETNAM DATA COMPLIANCE AND RESIDENCY PLAN


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## 1. Legal wording correction

Do not reduce Vietnam compliance to Decree 13/2023 only.

Use this wording until Vietnam privacy counsel confirms exact statutory references:

```text
Vietnam personal data, cybersecurity, cross-border transfer, data residency and sector-specific compliance requirements must be reviewed before production. Final statutory references and obligations must be verified by Vietnam privacy counsel before launch.
```

## 2. Why this is a blocker

Computer.iai.one handles:

```text
Data Vault
Memory
Browser Session
Credential Vault
Connected Account Metadata
AI Work History
Evidence Pack
Audit Log
Calendar
Email
Files
Tokens
Billing records
```

## 3. Vietnam region principle

For Vietnamese users, default design should support:

```text
Vietnam-region storage when available
APAC-region storage with legal transfer controls when Vietnam region is not available
No cross-border transfer without classification and legal basis
TIA/DPIA workflow where required
Encryption and access control for sensitive data
```

## 4. Acceptance criteria

```text
[ ] Vietnam data classification exists.
[ ] Region binding exists.
[ ] Cross-border transfer workflow exists.
[ ] Counsel review marked pending or complete.
[ ] No production launch before legal gate is reviewed.
```
