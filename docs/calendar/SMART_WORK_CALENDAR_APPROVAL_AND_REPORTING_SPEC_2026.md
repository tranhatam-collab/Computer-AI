# SMART WORK CALENDAR APPROVAL AND REPORTING SPEC 2026

## 1. Approval principles

AI được phép chuẩn bị, không được tự gửi/đăng/xóa/thanh toán/đổi bảo mật nếu chưa có approval rõ.

## 2. Approval classes

| Class | Examples | Required auth |
|---|---|---|
| low | Create private task | none |
| medium | Prepare email draft | preview |
| high | Send email, invite attendee | user click approval |
| critical | Pay, delete, legal, security | passkey/MFA/admin quorum |

## 3. Report types

```text
Daily Work Report
Weekly Execution Report
Pending Approval Report
Overdue Task Report
AI Work Completed Report
Calendar Conflict Report
Connected Workspace Sync Report
```

## 4. Daily report structure

```text
What was scheduled
What was completed
What AI prepared
What needs approval
What is overdue
What changed from external calendars
Tomorrow priorities
Evidence links
```

## 5. EvidencePack

```ts
export type CalendarEvidencePack = {
  id: string;
  tenantId: string;
  userId: string;
  computerId: string;
  workRunId?: string;
  taskId?: string;
  eventId?: string;
  command: string;
  actionsTaken: string[];
  approvals: string[];
  outputRefs: string[];
  providerRefs: string[];
  finalStatus: "completed" | "partial" | "blocked" | "failed";
  createdAt: string;
};
```
