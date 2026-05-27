# B4 — AUTH BACKEND AND PASSKEY PLAN


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## 1. Required auth capabilities

```text
Email login
Passkeys/WebAuthn
MFA fallback
Trusted devices
Session rotation
Organization membership
Role-based access control
Admin role separation
Sensitive action re-auth
Device revoke
Emergency lock
```

## 2. Roles

```text
owner
admin
security_admin
billing_admin
developer_admin
support_admin
member
viewer
auditor
```

## 3. Sensitive actions requiring passkey/MFA

```text
Publish through connected social account
Send email/message
Delete file/evidence
Export large data set
Connect or revoke provider
Use credential vault
Change billing
Change security settings
Grant admin
Deploy production
```

## 4. Auth tables

```text
users
auth_identities
sessions
trusted_devices
passkey_credentials
mfa_factors
organizations
organization_members
role_assignments
admin_actions
```

## 5. Acceptance criteria

```text
[ ] Auth is server-validated.
[ ] Passkey registration works.
[ ] Passkey authentication works.
[ ] Trusted device revoke works.
[ ] Admin roles are separated.
[ ] Sensitive action re-auth works.
[ ] Session rotation works.
```
