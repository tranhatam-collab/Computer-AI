# COMPUTER.IAI.ONE — AWS FOUNDATION SETUP CHECKLIST 2026

**Status:** CHECKLIST — NOT EXECUTED UNTIL FOUNDER SIGNOFF
**Region:** ap-southeast-1 (Singapore)
**Date:** 2026-05-26

---

## Phase 0: Account & Identity

- [ ] Tạo hoặc xác nhận AWS account chính
- [ ] Kích hoạt MFA trên root account
- [ ] Tạo IAM admin user (không dùng root)
- [ ] Cấu hình AWS Organizations nếu cần multi-account sau này
- [ ] Kích hoạt AWS Cost Explorer + billing alerts
- [ ] Kiểm tra điều kiện free tier thực tế của account (không giả định 12 tháng RDS free tier)

## Phase 1: Network

- [ ] Tạo VPC (10.0.0.0/16)
- [ ] Tạo 2 public subnets (10.0.1.0/24, 10.0.2.0/24)
- [ ] Tạo 2 private subnets (10.0.3.0/24, 10.0.4.0/24)
- [ ] Tạo Internet Gateway
- [ ] Tạo NAT Gateway (hoặc dùng NAT instance để tiết kiệm phase đầu)
- [ ] Tạo Route Tables
- [ ] Tạo Security Groups:
  - [ ] ALB: allow 80/443 từ internet
  - [ ] ECS tasks: allow từ ALB only
  - [ ] RDS: allow từ ECS tasks only
  - [ ] Redis: allow từ ECS tasks only

## Phase 2: Database

- [ ] Tạo RDS PostgreSQL instance (t3.micro hoặc db.t3.micro)
- [ ] Bật encryption at rest (AES-256)
- [ ] Bật automated backups (7 ngày)
- [ ] Bật Multi-AZ (nếu budget cho phép, hoặc phase 2)
- [ ] Tạo database: `iai_core_prod`
- [ ] Tạo schema từ file migration
- [ ] Tạo read-only user cho app
- [ ] Tạo admin user (không dùng trong app)
- [ ] Kiểm tra kết nối từ bastion host hoặc local qua VPN

## Phase 3: Cache

- [ ] Tạo ElastiCache Redis cluster (cache.t3.micro)
- [ ] Bật encryption in transit
- [ ] Đặt trong private subnet
- [ ] Security group: chỉ allow từ ECS tasks
- [ ] Test kết nối từ ECS task

## Phase 4: Storage

- [ ] Tạo S3 bucket: `iai-core-artifacts-sg-2026`
- [ ] Bật versioning
- [ ] Bật encryption SSE-S3
- [ ] Bật lifecycle policy (archive sau 90 ngày)
- [ ] Tạo S3 bucket: `iai-core-backups-sg-2026`
- [ ] Cấu hình CORS nếu cần upload trực tiếp từ client
- [ ] Tạo IAM policy cho app read/write S3

## Phase 5: Secrets

- [ ] Tạo AWS Secrets Manager entry cho PostgreSQL credentials
- [ ] Tạo Secrets Manager entry cho Redis credentials
- [ ] Tạo Secrets Manager entry cho OpenAI API key
- [ ] Tạo Secrets Manager entry cho Anthropic API key
- [ ] Tạo Secrets Manager entry cho email service (SES/Resend)
- [ ] Tạo Secrets Manager entry cho JWT signing key
- [ ] Tạo Secrets Manager entry cho Cloudflare API token (nếu cần)
- [ ] Cấu hình automatic rotation (nếu support)

## Phase 6: Compute

- [ ] Tạo ECS Cluster (Fargate)
- [ ] Tạo ECR repository: `iai/api-gateway`
- [ ] Tạo ECR repository: `iai/flow-runtime`
- [ ] Tạo ECR repository: `iai/ai-orchestrator`
- [ ] Tạo Task Definition cho API Gateway (Fastify/Node)
- [ ] Tạo Task Definition cho Flow Runtime
- [ ] Tạo Task Definition cho AI Orchestrator
- [ ] Tạo Application Load Balancer (ALB)
- [ ] Cấu hình health check trên ALB (/health)
- [ ] Tạo Target Group cho ECS tasks
- [ ] Cấu hình Auto Scaling (min 1, max 3 tasks)

## Phase 7: Email

- [ ] Xác minh domain trong AWS SES (hoặc Resend)
- [ ] Tạo SES SMTP credentials (nếu dùng SES)
- [ ] Test send email từ ECS task
- [ ] Cấu hình DKIM, SPF, DMARC

## Phase 8: Logging & Monitoring

- [ ] Tạo CloudWatch Log Group: `/iai/api-gateway`
- [ ] Tạo CloudWatch Log Group: `/iai/flow-runtime`
- [ ] Tạo CloudWatch Log Group: `/iai/ai-orchestrator`
- [ ] Cấu hình structured logging (JSON format)
- [ ] Tạo CloudWatch Alarms:
  - [ ] API 5xx errors > 1%
  - [ ] API latency > 2s p95
  - [ ] RDS connections > 80%
  - [ ] Redis memory > 80%

## Phase 9: Cloudflare Integration

- [ ] Tạo Cloudflare Worker route: `api.iai.one/*`
- [ ] Worker proxy requests tới AWS ALB
- [ ] Tạo Cloudflare Worker route: `api.flow.iai.one/*`
- [ ] Worker proxy requests tới ALB với path prefix
- [ ] Cấu hình Cloudflare Access cho admin endpoints (nếu cần)
- [ ] Verify SSL/TLS end-to-end (Cloudflare → ALB → ECS)

## Phase 10: Backup & DR

- [ ] Tạo RDS snapshot schedule (daily)
- [ ] Tạo S3 cross-region replication tới R2 hoặc S3 US
- [ ] Document restore procedure
- [ ] Test restore từ snapshot (smoke test)

## Phase 11: Security Hardening

- [ ] Kiểm tra không có resource nào public IP không cần thiết
- [ ] Kiểm tra Security Groups không có 0.0.0.0/0 except ALB
- [ ] Bật AWS Config (nếu free tier cho phép)
- [ ] Bật AWS GuardDuty (nếu budget cho phép)
- [ ] Review IAM policies: least privilege
- [ ] Không có secret trong code, env vars, hoặc ECS task definition

---

## Exit Criteria (không được deploy app nếu chưa xong)

- [ ] RDS PostgreSQL connectable từ ECS
- [ ] Redis connectable từ ECS
- [ ] S3 upload/download hoạt động từ ECS
- [ ] Secrets Manager readable từ ECS
- [ ] ALB health check pass
- [ ] Cloudflare Worker route tới ALB thành công
- [ ] Email gửi được từ ECS
- [ ] CloudWatch logs xuất hiện
- [ ] Không có resource public IP không cần thiết

---

## Notes

- Không tạo AWS resource thật nếu chưa có Founder signoff riêng.
- Phase đầu chỉ dùng 1 region (Singapore).
- Multi-region là phase sau (6+ tháng).
- Không dùng D1/KV làm source of truth cho user data.

---

*Checklist locked. Execute only after Founder signoff.*
