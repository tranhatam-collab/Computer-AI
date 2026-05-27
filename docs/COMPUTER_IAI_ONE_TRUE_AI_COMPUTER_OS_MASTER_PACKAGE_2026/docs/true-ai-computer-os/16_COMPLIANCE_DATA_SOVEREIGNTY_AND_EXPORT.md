# 16 — COMPLIANCE, DATA SOVEREIGNTY AND EXPORT


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## 1. Data governance layers

```text
data classification
data residency
cross-border transfer review
export/delete
retention
legal hold
DPIA/TIA workflow
admin approval
incident response
```

## 2. Data classes

```text
public
personal
sensitive
secret
memory
evidence
audit
billing
browser session
credential metadata
```

## 3. Region policy

Each ComputerInstance must know:

```text
home region
allowed processing regions
blocked regions
provider transfer rules
data export rules
legal hold rules
```

## 4. Acceptance criteria

```text
[ ] Every instance has region policy.
[ ] Sensitive data has classification.
[ ] Cross-border transfer workflow exists.
[ ] Export/delete workflow exists.
[ ] Legal hold exists.
```
