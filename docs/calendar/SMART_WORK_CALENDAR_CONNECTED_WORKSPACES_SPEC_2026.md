# SMART WORK CALENDAR CONNECTED WORKSPACES SPEC 2026

## 1. Mục tiêu

Kết nối các không gian làm việc người dùng đang dùng, sắp dùng hoặc muốn dùng trong tương lai.

## 2. Workspaces

Phase 1:

```text
Google Calendar
Gmail
Google Drive
Microsoft Outlook Calendar
Outlook Mail
Computer.iai.one native tasks
Mobile push
Web console
```

Phase 2:

```text
Notion
Slack
Teams
Linear
GitHub Issues
Trello
Todoist
```

Phase 3:

```text
Jira
Asana
ClickUp
HubSpot
Salesforce
Figma
Dropbox
Box
```

## 3. Workspace event mapping

| Source | Object | Computer object |
|---|---|---|
| Gmail | Email needing reply | SmartTask / WorkRun |
| Google Calendar | Event | CalendarEvent |
| Outlook | Event | CalendarEvent |
| Notion | Database item | SmartTask |
| Slack | Message mention | SmartTask / Reminder |
| Linear | Issue | SmartTask |
| GitHub | Issue/PR | SmartTask / WorkRun |
| Trello | Card | SmartTask |

## 4. Permission rules

```text
Read-only by default for new workspace.
Write requires explicit scope.
External send/publish requires approval.
Delete requires approval.
Admin/security changes are blocked by default.
```

## 5. Sync object

```ts
export type WorkspaceSyncObject = {
  id: string;
  provider: string;
  externalId: string;
  localObjectType: "task" | "event" | "message" | "issue" | "document";
  localObjectId: string;
  syncDirection: "inbound" | "outbound" | "two_way" | "read_only";
  lastSyncedAt: string;
  status: "synced" | "pending" | "conflict" | "failed";
};
```
