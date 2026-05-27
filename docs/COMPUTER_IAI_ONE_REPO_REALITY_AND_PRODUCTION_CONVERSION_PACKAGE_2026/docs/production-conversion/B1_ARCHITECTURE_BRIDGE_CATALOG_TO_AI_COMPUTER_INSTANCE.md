# B1 — ARCHITECTURE BRIDGE: CATALOG TO AI COMPUTER INSTANCE


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## 1. Decision

The current catalog implementation must not be discarded. It must be reinterpreted.

```text
Current meaning: product catalog
New meaning: AI Computer Instance template selector
```

## 2. Why this is critical

The repo currently presents Computer.iai.one as a catalog of packaged AI computers. The target architecture requires:

```text
1 user = 1 AI Computer Instance
```

The catalog is therefore not the final product. It is only the configuration surface used to provision an instance.

## 3. Architecture bridge

| Existing repo concept | New canonical meaning |
|---|---|
| Product catalog | Computer type selector |
| Product card | Instance template card |
| Pricing plan | Entitlement plan |
| Product detail page | Template capability page |
| Compare strip | Template capability comparison |
| Web app shell | AI Computer web console |
| Mobile app | Remote control |
| Static products | Computer templates |
| User buys product | User provisions AI Computer Instance |

## 4. New provisioning flow

```text
User signs up
↓
User verifies identity level
↓
User chooses computer type/template
↓
System creates AI Computer Instance
↓
System attaches entitlement
↓
System creates vault
↓
System creates memory namespace
↓
System enables initial Super Apps
↓
System assigns agent team
↓
System applies policy
↓
System opens web console/mobile remote
```

## 5. Required data model direction

```text
computer_templates are public/static.
computer_instances are private/user-owned.
entitlements determine access.
billing state controls runtime.
vault/memory/evidence belong to an instance.
```

## 6. Developer rule

```text
Do not build more product catalog features until the instance bridge is applied.
Every catalog feature must map to a ComputerInstance lifecycle.
```

## 7. Acceptance criteria

```text
[ ] README no longer says product catalog as final identity.
[ ] Product registry is renamed or documented as computer template registry.
[ ] Provisioning flow creates ComputerInstance.
[ ] Each user has one default ComputerInstance.
[ ] Entitlement is attached to ComputerInstance, not just user account.
[ ] Dashboard shows user's AI Computer, not only product list.
```
