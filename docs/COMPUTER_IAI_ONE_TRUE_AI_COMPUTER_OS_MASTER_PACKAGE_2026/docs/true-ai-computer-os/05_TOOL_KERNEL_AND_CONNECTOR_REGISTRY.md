# 05 — TOOL KERNEL AND CONNECTOR REGISTRY


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## 1. Decision

AI must not call tools directly. All tools go through Tool Kernel, permission, sandbox and audit.

## 2. Tool categories

```text
browser
file manager
email
calendar
docs
sheets
slides
PDF
OCR
image
audio
video
code
terminal
database
API client
webhook
cloud storage
social accounts
CRM
project management
payment
invoice
analytics
security scanner
```

## 3. Connector registry

Each connector must define:

```json
{
  "connectorId": "gmail",
  "name": "Gmail",
  "authType": "oauth",
  "riskClass": "medium",
  "allowedActions": ["read", "draft", "send_with_approval"],
  "dataClasses": ["personal", "sensitive"],
  "requiresApprovalFor": ["send", "delete", "export"],
  "auditRequired": true
}
```

## 4. MCP/A2A position

MCP and A2A may be used, but only behind hardened gateways.

Rules:

```text
No direct model-to-tool for sensitive tools.
No untrusted MCP server without sandbox.
Tool descriptions must be signed or trusted.
Tool outputs are untrusted data until verified.
Agent-to-agent messages require identity, signing, audit and policy.
```

## 5. Tool action classes

```text
read
draft
prepare
write
publish
send
delete
pay
deploy
change_security
export_data
```

## 6. Acceptance criteria

```text
[ ] Tool registry exists.
[ ] Connector registry exists.
[ ] Tool actions have risk class.
[ ] Sensitive actions require approval.
[ ] Every tool call has audit event.
```
