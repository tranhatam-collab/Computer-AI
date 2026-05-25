# RELEASE_TRUTHFUL_REPORTING_STANDARD_VI.md
## Chuẩn báo cáo trung thực cho kỹ thuật, build, live và release

### 1. Mục tiêu
Loại bỏ hoàn toàn 4 lỗi thường gặp của AI engineering report:
- báo cáo quá mức
- lẫn scaffold với implementation
- lẫn live với local
- lẫn dự định với kết quả thật

### 2. Nguyên tắc nền
1. Báo cáo phải bám vào bằng chứng.
2. Mọi trạng thái phải có nghĩa kỹ thuật rõ.
3. Không dùng từ mạnh hơn mức thực tế.
4. Blocker phải được liệt kê công khai.
5. Báo cáo phải giúp owner ra quyết định, không phải để làm owner yên tâm giả.

### 3. Năm tầng trạng thái chuẩn
#### Designed
Đã có thiết kế hoặc spec, chưa chắc có code.

#### Scaffolded
Đã có code khung, mock, placeholder, interface hoặc boundary.

#### Partial
Đã có một phần code thật, nhưng chưa đủ để coi là hoàn chỉnh.

#### Verified running
Đã có bằng chứng build, typecheck, API hoặc route chạy đúng.

#### Production-ready
Chỉ dùng khi không còn blocker production trực tiếp và có bằng chứng vận hành thật.

### 4. Mẫu báo cáo chặng
```text
Đã sửa:
- ...

Lý do:
- ...

Verify:
- ...

Còn thiếu:
- ...

Tiếp theo:
- ...
```

### 5. Mẫu báo cáo tổng hợp
```text
Trạng thái:
- Designed:
- Scaffolded:
- Partial:
- Verified running:
- Production blocked:

Build truth:
- ...

Live truth:
- ...

CI truth:
- ...

Blockers:
- ...
```

### 6. Luật dùng từ
#### Được dùng
- scaffold
- partial
- verify pass
- live 200
- route hoạt động
- build pass
- blocked by missing credentials

#### Không được dùng nếu chưa đủ bằng chứng
- hoàn chỉnh toàn bộ
- production-ready
- fully implemented
- all phases complete
- 100 percent done
- ready for enterprise production

### 7. Chuẩn viết blocker
Blocker phải có cấu trúc:

```text
Blocker:
Thiếu gì:
Ảnh hưởng gì:
Muốn gỡ blocker cần gì:
```

Ví dụ:

```text
Blocker: AI provider chưa wired thật
Thiếu gì: OPENAI_API_KEY hoặc ANTHROPIC_API_KEY hợp lệ
Ảnh hưởng gì: production execution vẫn đang simulated hoặc fail-fast
Muốn gỡ blocker cần gì: owner cung cấp key và chạy smoke test thật
```

### 8. Chuẩn báo cáo live
Khi nói live phải chỉ ra:
- URL nào
- HTTP status gì
- đối chiếu gì với code
- điều gì vẫn chưa chắc chắn

Ví dụ đúng:
- Live URL https://example.com trả HTTP 200
- Asset path đúng theo base path /Computer-AI/
- Chưa xác minh backend production bindings

### 9. Chuẩn báo cáo CI
Khi nói CI phải chỉ ra:
- workflow nào
- command nào
- run nào đã thấy
- pass hay fail

Nếu chưa thấy run thật thì phải ghi:
CI configured but not verified

### 10. Chuẩn báo cáo production foundation
Một repo chỉ được gọi là production foundation khi tối thiểu có:
- scripts rõ
- build flow pass
- typecheck pass
- API structure đúng
- storage abstraction đúng
- auth boundary đúng
- provider boundaries đúng
- release docs đúng
- blocker list minh bạch

### 11. Điều kiện cấm ghi production-ready
Nếu còn bất kỳ mục nào sau đây chưa có bằng chứng thật:
- database production thật
- AI worker thật
- auth thật
- payment thật
- email thật
- mobile artifact thật
- verified CI thật
- verified domain binding thật

thì bắt buộc ghi:
Production blocked

### 12. Checklist trước khi gửi báo cáo cuối
- Đã chạy verify mới chưa
- Đã đọc git status mới chưa
- Đã phân biệt local với live chưa
- Đã phân biệt scaffold với wired chưa
- Đã liệt kê blockers chưa
- Có câu nào overclaim không
- Có dùng từ production-ready sai không

### 13. Câu khóa báo cáo trung thực
Không có bằng chứng thì không có trạng thái hoàn thành.
Báo cáo phải phản ánh đúng code, đúng lệnh, đúng live và đúng blockers.
