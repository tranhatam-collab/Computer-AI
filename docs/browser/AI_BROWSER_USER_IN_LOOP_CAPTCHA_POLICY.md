# AI BROWSER USER-IN-LOOP CAPTCHA POLICY

## Purpose

Prevent Computer.iai.one from becoming a CAPTCHA bypass, anti-bot bypass or platform abuse tool.

## Correct behavior

```text
AI Browser pauses.
Remote/local browser view is shown to user.
User completes CAPTCHA, MFA, passkey or new-device verification manually.
AI Browser resumes only after verification state is confirmed.
Session is stored only if user consents.
Audit event is written.
```

## Prohibited behavior

```text
No CAPTCHA solving service.
No anti-bot bypass.
No fake human behavior generation.
No IP rotation to bypass limits.
No hidden automation to evade platform controls.
No synthetic identity creation.
No account farming.
```

## Correct module name

```text
Human Verification Hand-off
```
