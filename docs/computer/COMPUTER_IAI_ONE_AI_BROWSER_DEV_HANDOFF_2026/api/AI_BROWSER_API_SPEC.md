# AI BROWSER API SPEC

## Browser Session Service

```http
POST /browser/sessions
GET /browser/sessions/:id
POST /browser/sessions/:id/reauth
DELETE /browser/sessions/:id
POST /browser/sessions/:id/lock
```

## Vault Service

```http
POST /vault/oauth/connect
POST /vault/token
GET /vault/items
GET /vault/items/:id
DELETE /vault/items/:id
POST /vault/items/:id/rotate
POST /vault/items/:id/revoke
```

## Connected Accounts Service

```http
GET /connected-accounts
POST /connected-accounts/:provider/connect
POST /connected-accounts/:id/reconnect
POST /connected-accounts/:id/test
DELETE /connected-accounts/:id
POST /connected-accounts/:id/emergency-lock
```

## Browser Runtime Service

```http
POST /browser/run
GET /browser/run/:runId
POST /browser/run/:runId/pause
POST /browser/run/:runId/resume
POST /browser/run/:runId/cancel
POST /browser/run/:runId/approve
```

## Approval Service

```http
POST /approvals
GET /approvals/pending
GET /approvals/:id
POST /approvals/:id/approve
POST /approvals/:id/reject
POST /approvals/:id/edit
```

## Evidence Service

```http
GET /evidence/:runId
GET /evidence/:runId/screenshots
GET /evidence/:runId/logs
GET /evidence/:runId/report
```

## Error codes

```text
BROWSER_VERIFY_REQUIRED
BROWSER_SESSION_EXPIRED
BROWSER_PROVIDER_RATE_LIMITED
BROWSER_POLICY_BLOCKED
BROWSER_APPROVAL_REQUIRED
BROWSER_HUMAN_VERIFICATION_REQUIRED
BROWSER_SECRET_ACCESS_DENIED
BROWSER_ORIGIN_BLOCKED
BROWSER_RUNTIME_FAILED
```
