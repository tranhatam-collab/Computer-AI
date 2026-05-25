# COMPUTER.IAI.ONE — SELF-UPGRADE GOVERNANCE PROTOCOL 2026

**Status:** Architecture approved (not production-ready)

## Upgrade Levels

| Level | Scope | Auto-apply | Review | Approval | Rollback |
|-------|-------|:----------:|:------:|:--------:|:--------:|
| L1 | Prompt, template, workflow, connector config | ✅ Yes (with audit) | Post-audit | — | ✅ Manual |
| L2 | Super App logic, new connector, minor feature | No | Peer review | Admin L2+ | ✅ Auto |
| L3 | Database schema, auth, billing, security, deploy | No | Multi-agent verify | Admin L3+ (2-person) | ✅ Auto + DR |

## Self-Upgrade Flow

```
1. Detect: Missing feature or improvement opportunity identified
2. Request: Upgrade request created with spec + risk level
3. Review: Risk level determines review depth (L1=log, L2=peer, L3=board)
4. Approve: Based on level (L1=auto, L2=admin, L3=2-person)
5. Build: System generates/changes code
6. Test: Sandbox test + verification
7. Deploy: Staged rollout (canary for L3)
8. Verify: Post-deploy health check
9. Report: upgrade_id, evidence_log, rollback_plan, risk_level, admin_approval
```

## Safety Constraints

- L3 upgrades require 2-person admin approval
- All upgrades have rollback plan (required field)
- Rollback must be tested before upgrade is considered complete
- Canary deploy for L3: 1% → 10% → 50% → 100%
- Monitoring must confirm health at each stage

## Prohibited

- Self-upgrade cannot modify: upgrade governance protocol, security kernel, audit system, instance lifecycle, cost governor limits
