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
