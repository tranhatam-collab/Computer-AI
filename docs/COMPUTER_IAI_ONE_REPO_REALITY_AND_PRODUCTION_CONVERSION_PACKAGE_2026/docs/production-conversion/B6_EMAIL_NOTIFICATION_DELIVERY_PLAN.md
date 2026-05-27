# B6 — EMAIL NOTIFICATION DELIVERY PLAN


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## 1. Email classes

```text
Account verification
Login alert
Passkey added
Connected account changed
Approval required
Task completed
Daily briefing
Weekly report
Payment receipt
Past due warning
Incident alert
Data export ready
Deletion confirmation
```

## 2. Providers

```text
AWS SES
Resend
Postmark
SendGrid fallback
```

## 3. Required rules

```text
Do not send marketing email without opt-in.
Transactional email must not be unsubscribed globally.
Approval emails must deep-link to secure approval.
Sensitive details should be minimized in email.
```

## 4. Acceptance criteria

```text
[ ] Email provider configured.
[ ] Templates exist.
[ ] Delivery logs exist.
[ ] Bounce handling exists.
[ ] Unsubscribe/preferences exist.
[ ] Approval notification works.
```
