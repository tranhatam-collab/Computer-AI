# B1B — CATALOG REUSE AND MIGRATION MAP


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## 1. Goal

Preserve current work. Do not throw away existing catalog code. Reuse it as the template and entitlement selection layer.

## 2. Mapping

| Existing asset | Keep? | New purpose |
|---|---:|---|
| Product registry | Yes | Computer template registry |
| Pricing config | Yes | Entitlement plan config |
| Product grid | Yes | Template selector |
| Product detail | Yes | Template capability overview |
| Compare component | Yes | Template comparison |
| Web app shell | Yes | AI Computer console shell |
| Mobile starter | Yes | Remote control starter |
| Contracts package | Yes | Expand to ComputerInstance, Entitlement, Vault, Run, Evidence |

## 3. Migration phases

### Phase 1 — Documentation bridge

```text
Update README.
Add B1 bridge docs.
Add canonical instance contract.
Add production scorecard.
```

### Phase 2 — Contract bridge

```text
Add ComputerInstance type.
Add ComputerTemplate type.
Add Entitlement type.
Add ProvisioningRequest type.
```

### Phase 3 — API bridge

```text
POST /computers/provision
GET /computers/me
GET /templates
GET /templates/:id
```

### Phase 4 — UI bridge

```text
Product page CTA becomes "Provision this AI Computer".
User dashboard shows "My AI Computer".
Mobile app shows active ComputerInstance.
```

### Phase 5 — Billing bridge

```text
Product price maps to entitlement.
Entitlement maps to instance.
Payment status controls instance state.
```

## 4. Stop condition

```text
The product catalog is not the product. It is the template selector for provisioning a private AI Computer Instance.
```
