<!-- FILE: 00_README_MASTER_INDEX.md -->

# COMPUTER.IAI.ONE SMART WORK CALENDAR DEV HANDOFF 2026

## Purpose

Bộ file này thiết kế hệ lịch thông minh chính thức cho Computer AI.

Tên hệ:

```text
Smart Work Calendar & Task Orchestration OS
```

## Includes

```text
Master spec
Sync architecture
Task orchestration spec
Reminder and notification spec
Connected workspaces spec
Mobile app spec
Approval and reporting spec
Security policy
API spec
TypeScript contracts
PostgreSQL schema
Execution board
Repo tree addition
```

## Core status

```text
SMART WORK CALENDAR SPEC READY FOR DEV
NOT PRODUCTION-READY
POSTGRESQL SOURCE OF TRUTH
REDIS FOR EPHEMERAL QUEUE/CACHE
S3/R2 FOR EVIDENCE AND ATTACHMENTS
CLOUDFLARE EDGE + REGIONAL CORE
```

## Apply

Copy folders into repo root:

```text
docs/calendar/
contracts/calendar/
database/
api/
execution/
patches/
```



<!-- FILE: docs/calendar/SMART_WORK_CALENDAR_MASTER_SPEC_2026.md -->

# COMPUTER.IAI.ONE SMART WORK CALENDAR & TASK ORCHESTRATION OS 2026

## 0. Tên hệ thống

Tên chính thức đề xuất:

```text
Computer.iai.one Smart Work Calendar
AI Work Orchestration Calendar
Intelligent Reminder, Notification and Work Completion OS
```

Tên ngắn trong repo:

```text
Smart Calendar OS
Work Orchestration OS
```

## 1. Định nghĩa

Smart Work Calendar là lớp lịch làm việc thông minh chính thức của mỗi AI Computer Instance. Nó không chỉ là lịch hẹn. Nó là hệ điều phối công việc cho AI và người dùng, kết nối lịch, việc cần làm, email, mobile, workspace, browser, agent, approval và báo cáo kết quả.

Nó cho phép người dùng:

```text
Ra lệnh bằng tiếng Việt hoặc tiếng Anh
Tạo việc cần làm
Tạo lịch làm việc
Nhắc việc đúng lúc
Tự phân rã mục tiêu thành task nhỏ
Đồng bộ Google Calendar, Apple Calendar, Microsoft Outlook, email, mobile và workspace apps
Cho AI tự chuẩn bị, tự xử lý việc được phép
Dừng lại xin phép khi cần
Theo dõi trạng thái công việc từ chưa làm đến hoàn thành
Báo cáo cuối ngày, cuối tuần, cuối tháng
Ghi evidence và audit cho từng hành động quan trọng
```

## 2. Nguyên tắc khóa

```text
Calendar không chỉ lưu event.
Task không chỉ là checklist.
Reminder không chỉ là báo chuông.
Smart Calendar là control layer cho việc AI và con người cùng làm việc.
```

Nguyên tắc kỹ thuật:

```text
PostgreSQL là source of truth
Redis dùng cho reminder queue, locks, cache và live notification state
S3/R2 lưu evidence, report, attachment, exported calendar artifacts
Cloudflare dùng Edge, WAF, public API routing, webhook ingress
Regional Core/AWS xử lý orchestration, schedule engine, notification workers, AI workers
Không dùng D1/KV làm dữ liệu người dùng chính
```

## 3. Vai trò trong Computer.iai.one

```text
User command
↓
Command Kernel
↓
Smart Calendar OS
↓
Task Planner Agent
↓
Priority and Time Intelligence Engine
↓
Work Orchestrator
↓
Calendar Sync Layer
↓
Notification Router
↓
Approval Center nếu cần
↓
Execution Agents / Super Apps
↓
Evidence Pack
↓
Completion Report
```

## 4. Hệ phải làm được gì

### 4.1 Tạo lịch và task từ lệnh tự nhiên

Ví dụ:

```text
Mỗi sáng 7 giờ nhắc tôi kiểm tra dashboard Computer.iai.one, nếu có lỗi production thì tạo báo cáo và gửi tôi duyệt trước khi thông báo team.
```

Hệ thống phải tạo:

```text
Recurring schedule
Reminder rule
Monitoring task
Conditional automation
Approval rule
Notification route
Report template
```

### 4.2 Nhắc việc thông minh

Không chỉ nhắc theo giờ cố định. Phải nhắc theo:

```text
Thời hạn
Độ ưu tiên
Năng lượng làm việc của user
Lịch trống
Múi giờ
Vị trí nếu user cho phép
Tình trạng công việc
Phụ thuộc giữa các task
Email/workspace trigger
```

### 4.3 Tự xử lý công việc được phép

AI có thể tự xử lý các việc low-risk:

```text
Tóm tắt email
Chuẩn bị agenda
Soạn draft reply
Tạo task từ email
Tạo meeting note
Tạo báo cáo cuối ngày
Tìm slot lịch trống
Chuẩn bị file cho cuộc họp
Nhắc follow-up
```

AI phải xin phép với high-risk:

```text
Gửi email
Gửi tin nhắn
Đặt lịch với người khác
Xóa/sửa lịch quan trọng
Thanh toán
Đăng bài
Nộp form pháp lý
Gửi hợp đồng
```

### 4.4 Đồng bộ mọi nơi

Hệ phải kết nối được:

```text
Google Calendar
Apple Calendar qua CalDAV/iCloud nếu user cấu hình
Microsoft Outlook / Microsoft 365 Calendar
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
Mobile push notification
Email notification
Browser notification
Computer.iai.one Mobile Remote
```

## 5. Các module bắt buộc

```text
super-apps/smart-calendar
super-apps/task-center
super-apps/reminder-center
super-apps/notification-center
super-apps/work-report-center
super-apps/focus-planner
super-apps/approval-center
super-apps/evidence-center

computer-os/calendar-sync-engine
computer-os/task-orchestration-engine
computer-os/reminder-engine
computer-os/notification-router
computer-os/priority-engine
computer-os/time-intelligence-engine
computer-os/workflow-trigger-engine
computer-os/approval-policy-engine
computer-os/report-generation-engine
computer-os/evidence-recorder

agents/calendar-planner-agent
agents/task-breakdown-agent
agents/priority-agent
agents/schedule-negotiation-agent
agents/reminder-agent
agents/work-execution-agent
agents/report-agent
agents/follow-up-agent
agents/approval-agent
agents/security-agent
```

## 6. Core objects

```text
SmartCalendar
CalendarAccount
CalendarEvent
SmartTask
ReminderRule
NotificationRoute
WorkRun
ApprovalRequest
EvidencePack
DailyReport
WeeklyReport
FocusBlock
DependencyGraph
```

## 7. Lớp đồng bộ lịch

### 7.1 Chuẩn cần hỗ trợ

```text
iCalendar / ICS / VEVENT / VTODO
Google Calendar API
Microsoft Graph Calendar API
CalDAV
Webhooks / push notification nếu provider hỗ trợ
Polling fallback nếu không có webhook
```

iCalendar là chuẩn lõi cho dữ liệu lịch và recurrence như VEVENT/RRULE; CalDAV là chuẩn mở để truy cập, quản lý và đồng bộ calendar qua WebDAV. Google Calendar và Microsoft Graph cung cấp API riêng cho calendar events, reminders, recurrence, delta/change tracking hoặc push/change notifications tùy provider.

### 7.2 Conflict resolution

Nếu user sửa lịch ở Google Calendar rồi Computer.iai.one cũng sửa cùng event:

```text
Không ghi đè mù
Dùng provider event id + etag/changeKey/version
So sánh updatedAt
Nếu xung đột: tạo conflict record
Xin user chọn: keep external / keep Computer / merge / duplicate
```

### 7.3 Sync directions

```text
Inbound sync: provider → Computer.iai.one
Outbound sync: Computer.iai.one → provider
Two-way sync: cả hai chiều với conflict policy
Read-only sync: chỉ đọc lịch ngoài
Computer-native: chỉ lưu trong Computer Calendar
```

## 8. Reminder intelligence

ReminderRule phải hỗ trợ:

```text
absolute_time
relative_before_due
recurring
conditional
location_based optional
dependency_based
energy_based optional
calendar_gap_based
workspace_triggered
email_triggered
approval_deadline
```

Ví dụ:

```json
{
  "ruleType": "calendar_gap_based",
  "taskId": "task_001",
  "condition": "next_free_block >= 45 minutes",
  "action": "suggest_focus_block",
  "notificationRoute": ["mobile_push", "web_console"]
}
```

## 9. Notification Router

Kênh thông báo:

```text
Mobile push
Email
Web console
Browser notification
Desktop/local companion
Slack
Teams
Telegram optional
SMS optional
In-app inbox
Calendar invite
```

Notification Router phải có:

```text
priority level
quiet hours
timezone
deduplication
retry policy
escalation policy
digest mode
urgent interrupt mode
approval required mode
```

## 10. Task lifecycle

```text
captured
clarified
planned
scheduled
ready
running
waiting_for_user
waiting_for_approval
blocked
completed
reported
archived
cancelled
```

## 11. WorkRun lifecycle

```text
created
queued
policy_check
scheduled
running
paused
waiting_approval
executed
verified
reported
failed
cancelled
rolled_back
```

## 12. Approval rules

AI được tự làm:

```text
Tạo nhắc việc
Tạo task riêng tư
Tạo bản nháp
Tóm tắt email
Tìm slot lịch
Đề xuất ưu tiên
Tạo báo cáo nội bộ
```

AI phải xin phép:

```text
Gửi email/tin nhắn
Mời người khác vào event
Đổi lịch với người khác
Xóa event quan trọng
Publish nội dung
Gửi file ra ngoài
Tạo thanh toán
Chạy quảng cáo
Gửi hợp đồng
```

## 13. Mobile-first screens

```text
Today Command Center
Smart Calendar
Tasks
Reminders
Approvals
Notifications
Work Runs
Reports
Focus Plan
Connected Workspaces
Settings
Security
```

## 14. Các báo cáo thông minh

```text
Daily Work Report
Weekly Execution Report
Missed Task Report
Pending Approval Report
Overdue Task Report
Focus Time Report
AI Work Completed Report
Delegated Work Report
Team Coordination Report
Strategic Priorities Report
```

## 15. 30/60/90/180 ngày

### 30 ngày

```text
SmartTask schema
CalendarEvent schema
ReminderRule schema
NotificationRoute schema
Basic mobile/web task center
PostgreSQL tables
Basic reminder worker
Google Calendar read-only sync
Manual task creation
Daily report v1
```

### 60 ngày

```text
Google Calendar two-way sync
Microsoft Calendar read-only sync
Mobile push notifications
Email notifications
Approval Center integration
Task recurrence
Focus blocks
Basic AI task breakdown
```

### 90 ngày

```text
Microsoft two-way sync
CalDAV/iCalendar import/export
Workspace connectors: Notion, Slack, Linear/GitHub Issues
Smart priority engine
Conditional reminders
WorkRun orchestration
Evidence pack
```

### 180 ngày

```text
Cross-workspace automation
Schedule negotiation agent
Delegated team tasks
Advanced reporting
Enterprise admin policy
SSO calendar sync
Audit/export compliance
Personal time intelligence
```

## 16. Kết luận khóa

Smart Work Calendar là lịch chính thức của Computer AI. Nó là nơi tất cả việc cần làm, lịch họp, nhắc việc, approval, execution, notification và report hội tụ. Nếu AI Browser giúp Computer.iai.one mở web và thao tác, thì Smart Work Calendar giúp Computer.iai.one biết việc gì cần làm, khi nào làm, ai duyệt, báo ai, làm xong chứng minh bằng gì.



<!-- FILE: docs/calendar/SMART_WORK_CALENDAR_SYNC_ARCHITECTURE_2026.md -->

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



<!-- FILE: docs/calendar/SMART_WORK_CALENDAR_TASK_ORCHESTRATION_SPEC_2026.md -->

# SMART WORK CALENDAR TASK ORCHESTRATION SPEC 2026

## 1. Vai trò

Task Orchestration Engine biến lệnh của user thành việc cụ thể, lịch cụ thể, nhắc việc cụ thể, workflow cụ thể và báo cáo hoàn thành.

## 2. Command examples

```text
Nhắc tôi gọi lại nhà đầu tư lúc 4 giờ chiều mai, trước đó 30 phút chuẩn bị tóm tắt hồ sơ Computer.iai.one.
Mỗi thứ Hai 8 giờ sáng tạo báo cáo việc tuần trước và đề xuất 5 ưu tiên tuần này.
Nếu email từ khách hàng có chữ invoice thì tạo task kiểm tra và nhắc tôi trước 5 giờ chiều.
Tìm 2 tiếng trống tuần này để viết investor deck và khóa lịch giúp tôi.
```

## 3. Task breakdown

Một command có thể tạo nhiều object:

```text
SmartTask
CalendarEvent
ReminderRule
WorkRun
ApprovalRequest
EvidencePack
Report
```

## 4. Task lifecycle

```text
captured → clarified → planned → scheduled → ready → running → waiting_for_user → waiting_for_approval → blocked → completed → reported → archived
```

## 5. WorkRun lifecycle

```text
created → queued → policy_check → scheduled → running → paused → waiting_approval → executed → verified → reported
```

## 6. Priority engine

Priority score gồm:

```text
urgency
importance
deadline proximity
dependencies
estimated effort
strategic alignment
user energy profile optional
calendar availability
risk level
approval requirement
```

## 7. Dependency graph

```ts
export type TaskDependency = {
  id: string;
  tenantId: string;
  taskId: string;
  dependsOnTaskId: string;
  dependencyType: "finish_to_start" | "start_to_start" | "approval_required" | "external_wait";
  status: "active" | "resolved" | "blocked";
};
```

## 8. AI autonomy levels

| Level | AI được làm | Approval |
|---|---|---|
| A0 | Chỉ nhắc việc | Không |
| A1 | Tạo task, tạo draft, tạo report | Không hoặc preview |
| A2 | Chuẩn bị file/email/post | Preview |
| A3 | Gửi/đăng/mời người khác | User approval |
| A4 | Thanh toán/pháp lý/security | Critical approval |

## 9. Evidence

Mỗi task tự động phải có:

```text
input command
planned actions
actions taken
approvals
outputs
links/files
final status
error if any
```



<!-- FILE: docs/calendar/SMART_WORK_CALENDAR_REMINDER_NOTIFICATION_SPEC_2026.md -->

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



<!-- FILE: docs/calendar/SMART_WORK_CALENDAR_CONNECTED_WORKSPACES_SPEC_2026.md -->

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



<!-- FILE: docs/calendar/SMART_WORK_CALENDAR_MOBILE_APP_SPEC_2026.md -->

# SMART WORK CALENDAR MOBILE APP SPEC 2026

## 1. Mobile is the command and approval surface

Mobile app là nơi user:

```text
Xem hôm nay cần làm gì
Ra lệnh nhanh
Duyệt việc AI muốn làm
Nhận nhắc việc
Xem báo cáo
Snooze / Done / Delegate
Xem lịch thông minh
Điều khiển AI Work Runs
```

## 2. Screens

```text
Today Command Center
Smart Calendar
Task Inbox
Reminder Center
Approvals
Work Runs
Reports
Focus Plan
Connected Workspaces
Notification Settings
Security Settings
```

## 3. Today Command Center

Hiển thị:

```text
Today's priorities
Meetings
Due tasks
AI prepared work
Pending approvals
Missed reminders
Recommended focus block
End-of-day report preview
```

## 4. Approval screen

Phải hiển thị:

```text
AI muốn làm gì
Lý do
Dữ liệu nguồn
Output preview
Người nhận nếu có
Thời gian thực hiện
Rủi ro
Approve / Edit / Reject / Snooze
```

## 5. Smart Calendar view

Có 4 lớp:

```text
Calendar events
Smart tasks
Focus blocks
AI work runs
```

## 6. Notifications

Actions trên notification:

```text
Done
Snooze 15m
Snooze 1h
Open
Ask AI to prepare
Approve
Reject
```



<!-- FILE: docs/calendar/SMART_WORK_CALENDAR_APPROVAL_AND_REPORTING_SPEC_2026.md -->

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



<!-- FILE: docs/calendar/SMART_WORK_CALENDAR_SECURITY_POLICY_2026.md -->

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



<!-- FILE: api/SMART_WORK_CALENDAR_API_SPEC.md -->

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



<!-- FILE: database/SMART_WORK_CALENDAR_DATABASE_SCHEMA.sql -->

CREATE TABLE calendar_provider_connections (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  computer_id TEXT NOT NULL,
  provider TEXT NOT NULL,
  connection_type TEXT NOT NULL,
  status TEXT NOT NULL,
  scopes JSONB NOT NULL DEFAULT '[]'::jsonb,
  sync_direction TEXT NOT NULL,
  last_sync_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE calendar_events (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  computer_id TEXT NOT NULL,
  provider TEXT NOT NULL,
  external_id TEXT,
  title TEXT NOT NULL,
  description TEXT,
  start_at TIMESTAMPTZ NOT NULL,
  end_at TIMESTAMPTZ NOT NULL,
  timezone TEXT NOT NULL,
  all_day BOOLEAN NOT NULL DEFAULT false,
  location TEXT,
  attendees JSONB NOT NULL DEFAULT '[]'::jsonb,
  recurrence_rule TEXT,
  visibility TEXT NOT NULL DEFAULT 'default',
  status TEXT NOT NULL DEFAULT 'confirmed',
  source_version TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE smart_tasks (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  computer_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT NOT NULL DEFAULT 'normal',
  status TEXT NOT NULL DEFAULT 'captured',
  due_at TIMESTAMPTZ,
  scheduled_start_at TIMESTAMPTZ,
  scheduled_end_at TIMESTAMPTZ,
  source_provider TEXT,
  source_ref TEXT,
  approval_required BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE reminder_rules (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  computer_id TEXT NOT NULL,
  task_id TEXT,
  event_id TEXT,
  rule_type TEXT NOT NULL,
  schedule_expression TEXT,
  condition_expression TEXT,
  timezone TEXT NOT NULL,
  channels JSONB NOT NULL DEFAULT '[]'::jsonb,
  priority TEXT NOT NULL DEFAULT 'normal',
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE notification_routes (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  computer_id TEXT NOT NULL,
  channel TEXT NOT NULL,
  endpoint_ref TEXT,
  priority TEXT NOT NULL DEFAULT 'normal',
  quiet_hours JSONB,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE work_runs (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  computer_id TEXT NOT NULL,
  task_id TEXT,
  event_id TEXT,
  command_id TEXT,
  status TEXT NOT NULL,
  risk_level TEXT NOT NULL DEFAULT 'low',
  approval_required BOOLEAN NOT NULL DEFAULT false,
  evidence_pack_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE calendar_approval_requests (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  computer_id TEXT NOT NULL,
  work_run_id TEXT,
  action_summary TEXT NOT NULL,
  risk_level TEXT NOT NULL,
  required_auth TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  preview_ref TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE calendar_evidence_packs (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  computer_id TEXT NOT NULL,
  work_run_id TEXT,
  task_id TEXT,
  event_id TEXT,
  command TEXT NOT NULL,
  actions_taken JSONB NOT NULL DEFAULT '[]'::jsonb,
  approvals JSONB NOT NULL DEFAULT '[]'::jsonb,
  output_refs JSONB NOT NULL DEFAULT '[]'::jsonb,
  provider_refs JSONB NOT NULL DEFAULT '[]'::jsonb,
  final_status TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_calendar_events_user_start ON calendar_events(user_id, start_at);
CREATE INDEX idx_smart_tasks_user_status ON smart_tasks(user_id, status);
CREATE INDEX idx_reminder_rules_status ON reminder_rules(status);
CREATE INDEX idx_work_runs_status ON work_runs(status);



<!-- FILE: execution/SMART_WORK_CALENDAR_EXECUTION_BOARD_2026.md -->

# SMART WORK CALENDAR EXECUTION BOARD 2026

## Phase 0: Spec and Architecture

| ID | Task | Status |
|---|---|---|
| C0.1 | Approve Smart Calendar OS concept | Planned |
| C0.2 | Approve PostgreSQL schema | Planned |
| C0.3 | Approve API spec | Planned |
| C0.4 | Approve notification policy | Planned |
| C0.5 | Approve calendar sync policy | Planned |

## Phase 1: 30 days

| ID | Task | Status |
|---|---|---|
| C1.1 | SmartTask schema | Planned |
| C1.2 | CalendarEvent schema | Planned |
| C1.3 | ReminderRule schema | Planned |
| C1.4 | NotificationRoute schema | Planned |
| C1.5 | Basic task center | Planned |
| C1.6 | Basic reminder worker | Planned |
| C1.7 | Google Calendar read-only sync | Planned |
| C1.8 | Daily report v1 | Planned |

## Phase 2: 60 days

| ID | Task | Status |
|---|---|---|
| C2.1 | Google Calendar two-way sync | Planned |
| C2.2 | Microsoft Calendar read-only sync | Planned |
| C2.3 | Mobile push notifications | Planned |
| C2.4 | Email notifications | Planned |
| C2.5 | Approval Center integration | Planned |
| C2.6 | Task recurrence | Planned |
| C2.7 | Focus blocks | Planned |
| C2.8 | AI task breakdown | Planned |

## Phase 3: 90 days

| ID | Task | Status |
|---|---|---|
| C3.1 | Microsoft two-way sync | Planned |
| C3.2 | CalDAV / ICS import-export | Planned |
| C3.3 | Notion connector | Planned |
| C3.4 | Slack/Teams connector | Planned |
| C3.5 | Linear/GitHub Issues connector | Planned |
| C3.6 | Priority engine | Planned |
| C3.7 | Conditional reminders | Planned |
| C3.8 | Evidence pack | Planned |

## Phase 4: 180 days

| ID | Task | Status |
|---|---|---|
| C4.1 | Schedule negotiation agent | Planned |
| C4.2 | Delegated team tasks | Planned |
| C4.3 | Advanced reporting | Planned |
| C4.4 | Enterprise admin policy | Planned |
| C4.5 | SSO calendar sync | Planned |
| C4.6 | Audit/export compliance | Planned |
| C4.7 | Personal time intelligence | Planned |
