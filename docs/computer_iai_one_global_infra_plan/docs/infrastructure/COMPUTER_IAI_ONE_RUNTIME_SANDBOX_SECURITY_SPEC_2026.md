# COMPUTER.IAI.ONE RUNTIME SANDBOX SECURITY SPEC 2026

## 1. Mục tiêu

Agent của Computer.iai.one sẽ đọc file, chạy code, dùng browser, tạo tài liệu, gọi API, xử lý dữ liệu và tự nâng cấp. Đây là khu vực rủi ro cao nhất. Tài liệu này khóa nguyên tắc sandbox để AI làm được việc thật nhưng không phá hệ thống.

## 2. Nguyên tắc runtime

1. Agent không chạy trực tiếp trên server chính.
2. Agent không có production secret mặc định.
3. Mỗi command run có runtime context riêng.
4. Runtime phải có giới hạn CPU, RAM, thời gian, network và filesystem.
5. Tool call phải qua policy.
6. Output phải đi qua verification.
7. Write action rủi ro cao phải có approval.
8. Mọi runtime action phải có audit.

## 3. Runtime classes

| Runtime class | Dùng cho | Quyền |
|---|---|---|
| edge_light | Routing, auth pre-check | Không data nhạy cảm |
| agent_standard | Planning, orchestration | Metadata + scoped access |
| file_sandbox | PDF/DOCX/XLSX/image/code parse | Isolated filesystem |
| code_sandbox | Test/build/code execution | No host access |
| browser_sandbox | Web read/capture | Network policy |
| connector_runtime | Google/GitHub/Slack/Drive sync | OAuth scoped |
| self_upgrade_sandbox | Generate/test module | No production deploy |
| enterprise_dedicated | Tenant riêng | Contract policy |

## 4. Filesystem policy

```text
/runtime/{run_id}/input      read-only input files
/runtime/{run_id}/work       temporary workdir
/runtime/{run_id}/output     generated artifacts
/runtime/{run_id}/logs       runtime logs
/runtime/{run_id}/evidence   proof pack
```

Cấm:

```text
Access host root filesystem
Access other tenant runtime
Access production env file
Access raw secrets
Write outside runtime workspace
Persist hidden file without audit
```

## 5. Network policy

Default deny, allow by policy.

| Destination | Default |
|---|---|
| Public web | Allow for browser/research runtime |
| Internal API | Scoped service token only |
| Database | Deny direct |
| Secret vault | Deny direct |
| Payment provider | Only billing service |
| Email provider | Approval/policy only |
| GitHub | Scoped OAuth/token only |
| Unknown domain | Risk score + policy |

## 6. Code execution policy

Code sandbox phải có:

1. Ephemeral container/VM.
2. No privileged mode.
3. Resource limits.
4. Network restricted.
5. Dependency install policy.
6. Malware scan for artifacts.
7. Test output capture.
8. Kill switch.
9. Timeout.
10. Evidence log.

## 7. Browser automation policy

Browser sandbox phải:

1. Chạy isolated browser.
2. Không dùng admin session.
3. Không tự nhập password/secret.
4. Không submit form nhạy cảm nếu chưa approval.
5. Không mua hàng/thanh toán nếu chưa approval.
6. Không click destructive action nếu chưa approval.
7. Ghi screenshot/evidence khi cần.
8. Chống prompt injection từ website.

## 8. Self-upgrade runtime policy

Self-upgrade không được deploy trực tiếp lên production. Luồng đúng:

```text
Generate code
→ Static analysis
→ Unit test
→ Security check
→ Integration test
→ Evidence pack
→ Human/admin approval if Level 2/3
→ Staging deploy
→ Verification
→ Controlled promotion
→ Rollback ready
```

## 9. Risk levels

| Risk | Ví dụ | Xử lý |
|---|---|---|
| Low | Tạo template, format document | Auto + log |
| Medium | Gọi connector, tạo automation | Policy + evidence |
| High | Gửi email, sửa file user, chạy code | Approval có thể cần |
| Critical | Billing, permission, DB, deploy, key | Admin approval bắt buộc |

## 10. Evidence bắt buộc

Mỗi runtime run phải có:

```json
{
  "runtimeId": "rt_001",
  "runId": "run_001",
  "tenantId": "tenant_001",
  "computerId": "comp_001",
  "runtimeClass": "code_sandbox",
  "startedAt": "...",
  "endedAt": "...",
  "networkAccess": [],
  "filesRead": [],
  "filesWritten": [],
  "commandsExecuted": [],
  "toolCalls": [],
  "testsRun": [],
  "riskFlags": [],
  "resultHash": "sha256:..."
}
```

## 11. Checklist hoàn tất

- [ ] Runtime class enum.
- [ ] Sandbox filesystem.
- [ ] Sandbox network policy.
- [ ] Timeout/resource limits.
- [ ] Tool permission matrix.
- [ ] Evidence pack generation.
- [ ] Approval gate for risky actions.
- [ ] Prompt injection defense for file/web/tool content.
- [ ] Runtime kill switch.
- [ ] Runtime logs and trace ID.
