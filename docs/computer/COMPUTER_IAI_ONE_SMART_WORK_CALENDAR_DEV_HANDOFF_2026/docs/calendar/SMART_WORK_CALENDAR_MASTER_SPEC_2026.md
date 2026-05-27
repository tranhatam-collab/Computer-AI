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
