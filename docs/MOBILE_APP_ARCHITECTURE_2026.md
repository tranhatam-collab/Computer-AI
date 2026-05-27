# Cấu trúc App Mobile Computer.iai.one

> **Định vị:** Mobile App = AI Computer Remote Control  
> **Câu định vị:** Computer.iai.one Mobile is the secure remote control for your private AI Computer Instance.  
> **Tiếng Việt:** Computer.iai.one Mobile là bộ điều khiển an toàn cho máy tính AI riêng của bạn.

---

## 1. Cấu trúc Navigation chính

Bottom Tabs (5 mục):

| Tab | Tiếng Việt | Vai trò |
|-----|-----------|---------|
| Today | Hôm Nay | Tổng quan ngày |
| Command | Ra Lệnh | Ra lệnh bằng text, voice, file |
| Work | Công Việc | Theo dõi job, task, approval, report |
| Apps | Ứng Dụng | Super Apps và connected apps |
| Control | Điều Khiển | Vault, Memory, Security, Cost, Settings |

---

## 2. Tab 1: Today

Màn hình mở app đầu tiên. Hiển thị:

```
Good morning, Ông Tâm.
Your AI Computer has:
- 3 pending approvals
- 2 running jobs
- 5 tasks today
- 1 blocked task
- $2.40 estimated AI cost today
```

**Các card chính:**
- AI Computer Health
- Pending Approvals
- Running Work
- Today Schedule
- Important Follow-ups
- Cost Today
- Security Alerts

---

## 3. Tab 2: Command

Trái tim của app. Có **Command Composer** thay vì chỉ ô chat:

```
Command Composer
├── Text command
├── Voice command
├── File attachment
├── Target workspace
├── Target app
├── Deadline
├── Approval rule
├── Output format
└── Cost limit
```

**Ví dụ người dùng nhập:**
> "Kiểm tra repo Computer-AI, tạo báo cáo gap, viết checklist cho dev và soạn email gửi team, nhưng chưa gửi nếu tôi chưa duyệt."

**App biến thành job:**
```
Intent: repo_review
Tools: GitHub, Docs, Email Draft
Risk: Medium
Approval: Required before sending
Outputs: report, checklist, email draft, evidence pack
```

---

## 4. Tab 3: Work

Theo dõi toàn bộ việc AI đang làm:

```
Work
├── Work Queue
├── Running Jobs
├── Pending Approvals
├── Blocked Jobs
├── Completed Reports
├── Failed / Retry
├── Scheduled Work
└── Evidence Packs
```

**Work Queue status:**
`waiting`, `planning`, `running`, `waiting_approval`, `verifying`, `completed`, `completed_with_warnings`, `partial_completed`, `blocked`, `failed_recoverable`, `failed_requires_user`, `failed_requires_admin`, `retrying`

---

## 5. Pending Approvals

Cực kỳ quan trọng. Approval card phải hiển thị rõ:

- AI muốn làm gì?
- Tài khoản nào?
- Dữ liệu nào được dùng?
- Rủi ro gì?
- Chi phí bao nhiêu?
- Bằng chứng nào?
- Preview ở đâu?

**Quy tắc:**
> AI may draft. AI may prepare. AI may preview. AI must not send, publish, delete, pay, deploy or change security without approval.

---

## 6. Tab 4: Apps

Quản lý Super Apps và connected workspaces:

**Super Apps:**
AI Browser, Smart Calendar, AI Mail, AI Docs, AI Drive, AI Research, AI Code, AI Content Studio, AI CRM, AI Evidence Center, AI Security Center

**Connected Accounts:**
Google, Gmail, Google Drive, Google Calendar, Microsoft 365, LinkedIn, Facebook Page, Instagram Business, X, GitHub, Notion, Webflow, WordPress, Slack, Teams, Stripe, PayPal

**Trạng thái tài khoản:**
Connected, Needs re-auth, Expired, Limited, Revoked, Blocked by policy

---

## 7. Tab 5: Control

Trung tâm điều khiển hệ thống:

```
Control
├── My AI Computer
├── Vault
├── Memory
├── Security
├── Cost
├── Health
├── Settings
├── Data Export
├── Emergency Lock
└── Support
```

---

## 8. Vault

**Quy tắc bảo mật:**
- Không hiển thị raw secret nếu không re-auth
- Không đưa secret vào AI context
- Không ghi secret vào log
- Không screenshot secret

**Actions:**
View metadata, Rotate key, Revoke token, Delete vault item, Export safe metadata, Emergency lock

---

## 9. Memory

Người dùng kiểm soát:
- AI nhớ gì?
- AI dùng memory nào?
- Memory nào cần xóa?
- Memory nào không được lưu?
- Memory nào chỉ dùng cho project nào?

---

## 10. Security

```
Security
├── Passkey
├── MFA
├── Trusted Devices
├── Active Sessions
├── Connected Accounts
├── Permission Matrix
├── Approval Rules
├── Login Alerts
├── Risk Events
└── Emergency Lock
```

**Emergency Lock:**
- Dừng tất cả jobs đang chạy
- Khóa browser sessions
- Tạm dừng connected accounts
- Dừng gửi/publish/delete/payment
- Yêu cầu passkey để mở lại
- Ghi audit event

---

## 11. Cost

```
Cost
├── Today Cost
├── Monthly Cost
├── Cost by Model
├── Cost by Tool
├── Cost by Job
├── Budget Cap
├── Expensive Run Approval
├── BYOK
└── Usage Report
```

**Quy tắc:**
- Tác vụ đắt phải xin duyệt
- Vượt cap phải dừng hoặc hỏi user
- Hết quota phải fallback hoặc báo rõ

---

## 12. Health

```
Health
├── Model Providers
├── Tool Connectors
├── Browser Runtime
├── Calendar Sync
├── Email Sync
├── Vault Status
├── Memory Status
├── Queue Status
├── Error Recovery
└── Incident Log
```

**Trạng thái:** Healthy, Degraded, Quota Limited, Provider Down, Re-auth Required, Security Locked, Incident Mode

---

## 13. Onboarding

```
Onboarding
├── Welcome
├── Verify Identity
├── Create AI Computer Instance
├── Choose Computer Type
├── Set Passkey
├── Connect First Workspace
├── Set Approval Rules
├── Set Cost Limit
├── Enable Notifications
└── First Command
```

**Step 1: Welcome**
> "This is not a chatbot. This is your AI Computer."

**Step 3: Choose computer type:**
Business Computer, Creator Computer, Research Computer, Code Computer, Personal Computer

---

## 14. Sitemap đầy đủ

```
Mobile App
├── Onboarding
├── Today
│   ├── Daily Briefing
│   ├── Priority Tasks
│   ├── Pending Approvals
│   ├── Running Jobs
│   ├── Calendar
│   ├── Notifications
│   └── Quick Commands
├── Command
│   ├── Text Command
│   ├── Voice Command
│   ├── Attach File
│   ├── Select Context
│   ├── Approval Mode
│   ├── Cost Estimate
│   └── Start Job
├── Work
│   ├── Work Queue
│   ├── Running Jobs
│   ├── Pending Approvals
│   ├── Blocked Jobs
│   ├── Completed Reports
│   ├── Failed / Retry
│   ├── Scheduled Work
│   └── Evidence Packs
├── Apps
│   ├── Super Apps
│   ├── Connected Accounts
│   ├── Workspaces
│   ├── Connectors
│   ├── Skills
│   └── Workflow Templates
└── Control
    ├── My AI Computer
    ├── Vault
    ├── Memory
    ├── Security
    ├── Cost
    ├── Health
    ├── Settings
    ├── Data Export
    ├── Emergency Lock
    └── Support
```

---

## 15. MVP Mobile 1.0 (build trước)

1. Onboarding
2. Today
3. Command
4. Work Queue
5. Pending Approvals
6. Connected Accounts
7. My AI Computer
8. Cost
9. Security
10. Notifications

---

## 16. Notification System

**Push notification types:**
Approval required, Job completed, Job blocked, Human verification required, Calendar reminder, Follow-up reminder, Provider degraded, Quota warning, Security alert, Payment/billing alert, Daily briefing ready, Weekly report ready

---

## 17. Vai trò của Voice

"Hey Computer, hôm nay tôi cần xử lý gì?"  
"Kiểm tra email quan trọng và soạn phản hồi, nhưng chưa gửi."  
"Dừng tất cả việc đang chạy."  
"Tạo báo cáo cuối ngày."

**Voice command cần confirm nếu action rủi ro:**
> "You are asking AI to send an email. Please review and approve before sending."

---

## 18. Mobile khác Web ở đâu?

| Web Dashboard | Mobile App |
|--------------|------------|
| Làm việc sâu | Điều khiển nhanh |
| Quản lý nhiều màn hình | Duyệt, nhắc, ra lệnh nhanh |
| Xem báo cáo dài | Xem tóm tắt, mở file |
| Cấu hình sâu | Bật/tắt nhanh |
| Dev/admin workspace | Remote control cá nhân |
| Full evidence explorer | Evidence summary |
| Super App full UI | Super App launcher |

**Mobile = Command + Approval + Notification + Monitoring + Emergency Control**

---

## Câu khóa cho team dev

> Build the mobile app as the secure remote control for a user-owned AI Computer Instance: command, approval, work monitoring, notifications, connected accounts, cost, security and emergency lock first.
