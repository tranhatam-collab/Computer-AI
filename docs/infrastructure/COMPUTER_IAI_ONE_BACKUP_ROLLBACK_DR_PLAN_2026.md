# COMPUTER.IAI.ONE — BACKUP, ROLLBACK & DR PLAN 2026

**Status:** Architecture approved (not production-ready)

## Backup Strategy

| Data Type | Frequency | Retention | Storage |
|-----------|-----------|-----------|---------|
| AI Computer Instance config | Daily | 30 days | R2 + regional |
| Memory (user) | Real-time WAL | 90 days | R2 encrypted |
| Data Vault | Real-time WAL | 90 days | R2 per-tenant key |
| Audit Logs | Append-only | 365 days (legal: 7 years) | Immutable R2 |
| Billing | Daily | 7 years | Separated billing DB |
| Super Apps code | Per upgrade | All versions | Git + R2 |

## Rollback Protocol

1. Admin or self-upgrade detects failure
2. Instance state frozen
3. Rollback to last known good version
4. Audit log entry created with rollback_id
5. User notified of rollback reason
6. Failed version documented in upgrade-history

## Disaster Recovery

| Scenario | RPO | RTO | Action |
|----------|-----|-----|--------|
| Single instance corruption | 5 min | 15 min | Rollback to last snapshot |
| Control plane outage | 1 min | 5 min | Failover to secondary region |
| Region failure | 5 min | 30 min | Route to nearest healthy region |
| Data center loss | 15 min | 2h | Restore from regional backup |

## DR Drill Checklist

- [ ] Cross-region failover tested quarterly
- [ ] Backup restore tested monthly
- [ ] Rollback procedure tested per upgrade type
- [ ] RPO/RTO metrics verified in drill
