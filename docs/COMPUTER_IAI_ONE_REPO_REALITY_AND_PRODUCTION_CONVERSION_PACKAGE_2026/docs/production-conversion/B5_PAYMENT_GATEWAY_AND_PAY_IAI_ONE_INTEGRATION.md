# B5 — PAYMENT GATEWAY AND PAY.IAI.ONE INTEGRATION


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## 1. Decision

Payment should route through:

```text
computer.iai.one → pay.iai.one → invoice.iai.one → entitlement
```

## 2. Required env

```env
PAY_IAI_ONE_SITE_KEY=
PAY_IAI_ONE_TENANT=computer-iai
PAY_IAI_ONE_SITE=iai
PAY_IAI_ONE_ENV=production
COMPUTER_API_PUBLIC_URL=
```

Do not hard-code these in repo.

## 3. Payment states

```text
trial
active
past_due
grace_period
restricted
export_only
archived
deleted
```

## 4. Webhook requirements

```text
Verify signature
Validate tenant/site
Idempotency by event ID
Map payment to entitlement
Update computer instance state
Write audit event
Send notification
Do not trust client-only success redirect
```

## 5. Acceptance criteria

```text
[ ] Checkout uses valid PAY_IAI_ONE_SITE_KEY.
[ ] Wrong tenant/site rejected.
[ ] Webhook signature verified.
[ ] Duplicate events ignored.
[ ] Entitlement updated.
[ ] Audit event written.
```
