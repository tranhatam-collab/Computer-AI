# SMART WORK CALENDAR REMINDER AND NOTIFICATION SPEC 2026

## 1. Reminder types

```text
absolute_time
relative_before_due
recurring
conditional
dependency_based
calendar_gap_based
email_triggered
workspace_triggered
approval_deadline
quiet_hour_deferred
urgent_interrupt
```

## 2. Notification channels

```text
mobile_push
email
web_console
browser_notification
desktop_companion
slack
teams
telegram_optional
sms_optional
calendar_invite
in_app_inbox
```

## 3. Notification policy

```ts
export type NotificationPolicy = {
  id: string;
  userId: string;
  quietHours: { start: string; end: string; timezone: string };
  urgentBypassAllowed: boolean;
  digestMode: "off" | "hourly" | "daily";
  preferredChannels: string[];
  escalationChannels: string[];
};
```

## 4. Reminder rule schema

```ts
export type ReminderRule = {
  id: string;
  tenantId: string;
  userId: string;
  computerId: string;
  taskId?: string;
  eventId?: string;
  ruleType: "absolute_time" | "relative_before_due" | "recurring" | "conditional" | "dependency_based" | "calendar_gap_based" | "email_triggered" | "workspace_triggered" | "approval_deadline";
  scheduleExpression?: string;
  conditionExpression?: string;
  timezone: string;
  channels: string[];
  priority: "low" | "normal" | "high" | "urgent";
  status: "active" | "paused" | "completed" | "cancelled";
};
```

## 5. Deduplication

Không gửi 5 thông báo trùng nhau cho cùng một việc.

Dedup key:

```text
user_id + object_id + reminder_type + due_window
```

## 6. Escalation

Ví dụ:

```text
T-60 phút: mobile push
T-30 phút: web console + mobile push
T-10 phút: urgent push
Quá hạn 15 phút: email digest hoặc escalation nếu high priority
```

## 7. User control

User phải có quyền:

```text
Snooze
Mark done
Delegate
Cancel
Convert to focus block
Ask AI to prepare
Ask AI to report
```
