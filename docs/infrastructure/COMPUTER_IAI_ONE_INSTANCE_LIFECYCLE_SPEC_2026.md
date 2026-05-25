# COMPUTER.IAI.ONE — INSTANCE LIFECYCLE SPEC 2026

**Status:** Architecture approved (not production-ready)

## States

```
created → provisioning → active → paused → archived → deleted
                                     ↓
                               restricted → under_review → reviewing
                                     ↓
                                 upgrading → rollback_pending
```

## Lifecycle Rules

| State | Can Execute | Can Write Memory | Can Upgrade | Billing | Rollback |
|-------|-------------|------------------|-------------|---------|----------|
| created | No | No | No | Not started | — |
| provisioning | No | No | No | Not started | — |
| active | Yes | Yes | Yes | Charging | — |
| paused | No | No | No | Reduced fee | — |
| restricted | No | Read only | No | Charging | — |
| under_review | No | Read only | No | Frozen | — |
| upgrading | No | No | No | Charging | Rollback available |
| rollback_pending | No | No | No | Charging | Rollback in progress |
| archived | No | No | No | Stopped | Restorable (30 days) |
| deleted | No | No | No | Stopped | Not restorable |

## Transition Permissions

| Transition | Who | Approval |
|------------|-----|----------|
| created → provisioning | System | Auto |
| provisioning → active | System | Auto |
| active → paused | User | — |
| paused → active | User | — |
| active → restricted | Security system | L3+ |
| restricted → under_review | Admin | L3+ |
| active → upgrading | System (self-upgrade) | L1–L3 per level |
| upgrading → rollback_pending | System (failure) | Auto |
| rollback_pending → active | System | After rollback success |
| active → archived | User or admin | L2+ |
| archived → deleted | Admin | L4 (2-person) |
