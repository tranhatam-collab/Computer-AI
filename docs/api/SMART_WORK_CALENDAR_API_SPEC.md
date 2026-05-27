# SMART WORK CALENDAR API SPEC

## Calendar Accounts

```http
GET /calendar/accounts
POST /calendar/accounts/connect
POST /calendar/accounts/:id/reconnect
DELETE /calendar/accounts/:id
POST /calendar/accounts/:id/sync
```

## Events

```http
GET /calendar/events
POST /calendar/events
GET /calendar/events/:id
PATCH /calendar/events/:id
DELETE /calendar/events/:id
POST /calendar/events/:id/resolve-conflict
```

## Tasks

```http
GET /tasks
POST /tasks
GET /tasks/:id
PATCH /tasks/:id
POST /tasks/:id/complete
POST /tasks/:id/snooze
POST /tasks/:id/delegate
POST /tasks/:id/plan-with-ai
```

## Reminders

```http
GET /reminders
POST /reminders
PATCH /reminders/:id
DELETE /reminders/:id
POST /reminders/:id/snooze
```

## Notifications

```http
GET /notifications
POST /notifications/test
PATCH /notifications/policy
POST /notifications/:id/mark-read
```

## Work Runs

```http
POST /work-runs
GET /work-runs/:id
POST /work-runs/:id/pause
POST /work-runs/:id/resume
POST /work-runs/:id/cancel
```

## Approvals

```http
GET /calendar-approvals/pending
POST /calendar-approvals/:id/approve
POST /calendar-approvals/:id/reject
POST /calendar-approvals/:id/edit
```

## Reports

```http
GET /reports/daily
GET /reports/weekly
POST /reports/generate
GET /reports/:id
```
