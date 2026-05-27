# 05 — TOOL KERNEL AND CONNECTOR REGISTRY

> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026  
> Role: Final technical constitution for Computer.iai.one  
> Status: MASTER PLAN READY FOR DEV HANDOFF · NOT PRODUCTION-READY  
> Rule: Do not build Computer.iai.one as an app, chatbot, dashboard, product catalog, or browser automation tool.

## 1. Decision

AI must not call tools directly.

Every tool call goes through:

```text
Tool Registry
Permission Kernel
Policy Check
Sandbox
Audit
Evidence
```

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

## 3. Action classes

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

## 4. MCP hardened gateway

MCP can be used only behind a hardened gateway.

```text
No direct model-to-sensitive-tool access.
No untrusted MCP server without sandbox.
Tool descriptions must be trusted/signed.
Tool outputs are untrusted until verified.
Every MCP call has audit.
```

## 5. A2A future bridge

Agent-to-agent coordination must include:

```text
agent identity
message signing
capability registry
policy enforcement
audit trail
tenant isolation
revocation
```
