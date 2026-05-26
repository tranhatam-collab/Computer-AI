# SQL Schema Directory

**Status:** SCHEMA LOCKED — APPLY ONLY AFTER FOUNDER SIGNOFF

## Files

| File | Purpose |
|------|---------|
| `001_computer_core_schema.sql` | Core schema: identity, computer instances, commands, runs, audit, billing |

## Migration Order

1. `001_computer_core_schema.sql` — Foundation tables, triggers, seed data
2. Future: `002_indexes_and_optimizations.sql`
3. Future: `003_rls_policies.sql` — Row Level Security (after auth setup)
4. Future: `004_partitioning.sql` — Audit log partitioning by month
5. Future: `005_pgvector.sql` — Vector extension for embeddings

## Apply Instructions (DO NOT RUN UNTIL SIGNOFF)

```bash
# 1. Create database
psql -h <rds-endpoint> -U admin -c "CREATE DATABASE iai_core_prod;"

# 2. Apply schema
psql -h <rds-endpoint> -U admin -d iai_core_prod -f 001_computer_core_schema.sql

# 3. Verify
psql -h <rds-endpoint> -U admin -d iai_core_prod -c "\dt"
```

## Key Constraints

- **Soft delete only:** All tables have `deleted_at`. Không `DELETE CASCADE` cho user data.
- **Audit immutable:** `audit_logs` append-only. Không update, không delete.
- **Cost tracking:** Every AI call recorded in `ai_usage_records`.
- **Tenant isolation:** RLS policies to be applied in migration `003`.

## Notes

- pgvector extension (`embedding_vector`) requires `CREATE EXTENSION vector;` — optional for now.
- If pgvector unavailable, use `embedding_fallback` JSONB column.
- All timestamps are `TIMESTAMPTZ` (UTC with timezone).
