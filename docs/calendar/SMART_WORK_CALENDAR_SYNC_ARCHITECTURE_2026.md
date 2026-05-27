# SMART WORK CALENDAR SYNC ARCHITECTURE 2026

## 1. Mục tiêu

Đồng bộ lịch, task, reminder và trạng thái công việc giữa Computer.iai.one và các không gian làm việc người dùng chọn.

## 2. Nguồn dữ liệu

```text
Computer native calendar
Google Calendar
Microsoft Outlook / Microsoft 365 Calendar
Apple Calendar / iCloud via CalDAV where applicable
ICS import/export
Gmail
Outlook Mail
Google Tasks
Microsoft To Do
Notion
Slack
Teams
Linear
Jira
GitHub Issues
Trello
Asana
ClickUp
Todoist
```

## 3. Provider connection model

```ts
export type CalendarProviderConnection = {
  id: string;
  tenantId: string;
  userId: string;
  computerId: string;
  provider: "computer_native" | "google_calendar" | "microsoft_graph" | "caldav" | "ics" | "notion" | "slack" | "linear" | "github" | "jira" | "todoist";
  connectionType: "oauth" | "caldav_credentials" | "api_token" | "ics_feed" | "native";
  status: "connected" | "expired" | "requires_reauth" | "revoked" | "error";
  scopes: string[];
  syncDirection: "inbound" | "outbound" | "two_way" | "read_only" | "native_only";
  lastSyncAt?: string;
  createdAt: string;
  updatedAt: string;
};
```

## 4. Sync strategies

| Strategy | Dùng khi nào |
|---|---|
| Webhook/push | Provider hỗ trợ change notification |
| Delta sync | Provider hỗ trợ delta query/change tokens |
| Polling | Provider không hỗ trợ webhook đáng tin |
| Manual refresh | User yêu cầu cập nhật ngay |
| ICS import/export | Tương thích chuẩn lịch mở |
| CalDAV | Đồng bộ lịch mở với clients hỗ trợ |

## 5. Conflict model

```ts
export type CalendarSyncConflict = {
  id: string;
  provider: string;
  localObjectId: string;
  remoteObjectId: string;
  conflictType: "update_update" | "delete_update" | "recurrence_exception" | "permission_denied";
  localVersion: string;
  remoteVersion: string;
  status: "open" | "resolved" | "ignored";
  resolution?: "keep_local" | "keep_remote" | "merge" | "duplicate";
};
```

## 6. Rules

```text
Không ghi đè lịch ngoài nếu chưa có policy.
Không tự gửi invite cho người khác nếu chưa approval.
Không tự xóa event có attendee nếu chưa approval.
Không tự đổi recurrence series lớn nếu chưa preview.
Không tự reveal private calendar details cho workspace khác.
```

## 7. Data privacy

```text
Private event title có thể được mask.
Free/busy mode phải hỗ trợ.
Không đưa calendar private detail vào prompt nếu task không cần.
Calendar data phải có tenant_id/user_id/computer_id.
```
