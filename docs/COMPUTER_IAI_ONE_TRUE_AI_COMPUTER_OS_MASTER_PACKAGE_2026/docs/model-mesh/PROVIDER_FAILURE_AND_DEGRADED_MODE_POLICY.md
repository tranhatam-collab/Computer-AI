# PROVIDER FAILURE AND DEGRADED MODE POLICY


> Package: COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_MASTER_PACKAGE_2026  
> Product Direction: TRUE AI COMPUTER OPERATING SYSTEM  
> Status: MASTER SPEC READY FOR DEV REVIEW · NOT PRODUCTION-READY  
> Rule: Computer.iai.one is not an app, chatbot, catalog, browser, calendar, or automation tool. It is a resilient AI Computer Operating System where every user owns an AI Computer Instance.


## Degraded mode levels

```text
D0 healthy
D1 minor provider errors
D2 provider class degraded
D3 majority provider outage
D4 critical outage / 90% API unavailable
```

## D4 behavior

```text
critical tasks only
queue long jobs
use BYOK/local/cache if available
return partial report
notify honestly
create incident report
```
