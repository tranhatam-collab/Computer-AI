# AI BROWSER RUNTIME SANDBOX SPEC

## Runtime modes

| Mode | Runtime | Use |
|---|---|---|
| local_personal | Local companion browser | Sensitive login, MFA, CAPTCHA, passkey |
| cloud_sandbox | Isolated server browser | Public research, screenshot, non-sensitive workflow |
| enterprise_dedicated | Dedicated tenant browser | Enterprise, compliance, data residency |

## Components

```text
Browser Profile Manager
Session Container
Cookie Store
Credential Bridge
DOM Reader
Accessibility Tree Reader
Screenshot Engine
Action Executor
File Upload Handler
Clipboard Guard
Download Guard
Network Guard
Approval Gate
Audit Recorder
Policy Enforcement Point
```

## Isolation

```text
Per-user browser profile
Per-run browser context
Per-tenant runtime boundary
No shared cookie jar
No cross-tenant screenshots
No shared downloads
No direct secret access from browser agent
Network egress policy
Allowed domains per task
Blocked domains list
Timeout and resource limits
```

## BrowserAction schema

```ts
export type BrowserAction =
  | { type: "navigate"; url: string }
  | { type: "click"; selectorHint: string; description: string }
  | { type: "fill"; selectorHint: string; valueRef: string; sensitive?: boolean }
  | { type: "upload"; selectorHint: string; fileRef: string }
  | { type: "screenshot"; reason: string }
  | { type: "draft"; target: string; contentRef: string }
  | { type: "submit"; target: string; approvalId: string }
  | { type: "pause_for_user"; reason: string };
```
