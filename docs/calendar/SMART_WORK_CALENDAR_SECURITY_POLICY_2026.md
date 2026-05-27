# SMART WORK CALENDAR SECURITY POLICY 2026

## 1. Core security rules

```text
No secret in prompt
No OAuth token in logs
No calendar private data shared across workspaces without permission
No invite sent without approval if external attendee exists
No deletion of important event without approval
No legal/payment/security task executed without critical approval
```

## 2. Data isolation

Every row must include:

```text
tenant_id
user_id
computer_id
region
```

## 3. Sensitive calendar data

Support:

```text
free/busy only mode
private event masking
confidential event category
workspace-specific visibility
```

## 4. Audit events

Audit:

```text
calendar connected
calendar sync started
calendar sync conflict
event created
event updated
event deleted
external invite sent
approval requested
approval approved/rejected
notification sent
report generated
```

## 5. Abuse prevention

```text
Rate limit external invites
Rate limit notification channels
Prevent calendar spam
Detect repeated reschedule loops
Detect unauthorized workspace write attempts
```
