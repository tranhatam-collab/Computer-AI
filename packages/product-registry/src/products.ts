import type { ProductId, Tier } from "./types.js";

export interface ProductDef {
  id: ProductId;
  name: string;
  tier: Tier;
  tagline: { vi: string; en: string };
  description: { vi: string; en: string };
  audience: { vi: string[]; en: string[] };
  highlights: string[];
  capabilities: string[];
  cta: { vi: string; en: string };
  shellRoute: string;
  order: number;
}

export const products: ProductDef[] = [
  {
    id: "free",
    name: "IAI Computer Free",
    tier: "mass",
    tagline: { vi: "Làm quen với command-first AI work", en: "Get started with command-first AI work" },
    description: { vi: "Gói miễn phí để làm quen với cách làm việc cùng AI qua command.", en: "Free package to get familiar with command-first AI work." },
    audience: { vi: ["Người mới", "Sinh viên", "Người muốn thử"], en: ["Beginners", "Students", "Curious users"] },
    highlights: ["Command lite", "Task lite", "Content lite", "Research lite"],
    capabilities: ["run:create", "lane:basic"],
    cta: { vi: "Bắt đầu miễn phí", en: "Start free" },
    shellRoute: "/free",
    order: 1
  },
  {
    id: "learn",
    name: "IAI Learn Computer",
    tier: "mass",
    tagline: { vi: "Máy tính AI cho học tập và tự học", en: "AI computer for learning and self-study" },
    description: { vi: "Hỗ trợ học tập, nghiên cứu tài liệu và ôn luyện kiến thức.", en: "Supports learning, research, and knowledge review." },
    audience: { vi: ["Học sinh", "Sinh viên", "Người tự học"], en: ["Students", "Self-learners", "Researchers"] },
    highlights: ["Study assistant", "Research aid", "Quiz prep", "Note taking"],
    capabilities: ["run:create", "lane:research", "lane:content"],
    cta: { vi: "Xem Learn", en: "View Learn" },
    shellRoute: "/learn",
    order: 2
  },
  {
    id: "personal",
    name: "IAI Computer Personal",
    tier: "mass",
    tagline: { vi: "Máy tính AI cho cá nhân làm việc độc lập", en: "AI computer for independent individual work" },
    description: { vi: "Gói cá nhân cho freelancer, knowledge worker và founder đơn lẻ.", en: "Personal package for freelancers, knowledge workers, and solo founders." },
    audience: { vi: ["Freelancer", "Knowledge worker", "Founder đơn lẻ"], en: ["Freelancer", "Knowledge worker", "Solo founder"] },
    highlights: ["Content", "Research", "Report", "Personal task system"],
    capabilities: ["run:create", "run:parallel", "lane:research", "lane:content", "lane:business"],
    cta: { vi: "Xem Personal", en: "View Personal" },
    shellRoute: "/personal",
    order: 3
  },
  {
    id: "creator",
    name: "IAI Creator Computer",
    tier: "mass",
    tagline: { vi: "Hệ nội dung và sáng tạo có nhịp vận hành", en: "Content and creative system with operational rhythm" },
    description: { vi: "Dành cho creator, trainer, writer và marketer cá nhân.", en: "For creators, trainers, writers, and individual marketers." },
    audience: { vi: ["Creator", "Trainer", "Writer", "Marketer cá nhân"], en: ["Creator", "Trainer", "Writer", "Marketer"] },
    highlights: ["Content Studio", "Calendar", "Landing", "Script", "Brand Voice"],
    capabilities: ["run:create", "run:parallel", "run:schedule", "lane:content", "lane:media", "output:export"],
    cta: { vi: "Xem Creator", en: "View Creator" },
    shellRoute: "/creator",
    order: 4
  },
  {
    id: "work",
    name: "IAI Work Computer",
    tier: "professional",
    tagline: { vi: "Máy tính AI cho công việc văn phòng", en: "AI computer for office work" },
    description: { vi: "Hỗ trợ soạn thảo, báo cáo, lập kế hoạch và quản lý công việc.", en: "Supports drafting, reporting, planning, and task management." },
    audience: { vi: ["Nhân viên văn phòng", "Quản lý", "Điều hành"], en: ["Office staff", "Manager", "Operations"] },
    highlights: ["Document", "Spreadsheet", "Presentation", "Email", "Calendar"],
    capabilities: ["run:create", "run:parallel", "lane:business", "lane:content", "output:export", "storage:files"],
    cta: { vi: "Xem Work", en: "View Work" },
    shellRoute: "/work",
    order: 5
  },
  {
    id: "office",
    name: "IAI Office Computer",
    tier: "professional",
    tagline: { vi: "Bộ công cụ văn phòng AI cho đội nhóm", en: "AI office toolset for teams" },
    description: { vi: "Tích hợp sâu với quy trình văn phòng, approval và team collaboration.", en: "Deep integration with office workflows, approvals, and team collaboration." },
    audience: { vi: ["Nhóm văn phòng", "Phòng ban", "Doanh nghiệp nhỏ"], en: ["Office teams", "Departments", "Small business"] },
    highlights: ["Team docs", "Approval flow", "Meeting notes", "Policy compliance"],
    capabilities: ["run:create", "run:parallel", "run:schedule", "lane:business", "output:export", "storage:files", "governance:auto-approve"],
    cta: { vi: "Xem Office", en: "View Office" },
    shellRoute: "/office",
    order: 6
  },
  {
    id: "sales",
    name: "IAI Sales Computer",
    tier: "professional",
    tagline: { vi: "Hệ thống bán hàng AI có pipeline", en: "AI sales system with pipeline" },
    description: { vi: "Hỗ trợ lead gen, outreach, pipeline management và demo briefs.", en: "Supports lead generation, outreach, pipeline management, and demo briefs." },
    audience: { vi: ["Sales", "BD", "Account manager"], en: ["Sales", "BD", "Account manager"] },
    highlights: ["Leads", "Outreach", "Pipeline", "Demo Briefs", "Follow-up"],
    capabilities: ["run:create", "run:parallel", "lane:business", "lane:research", "output:export", "storage:files"],
    cta: { vi: "Xem Sales", en: "View Sales" },
    shellRoute: "/sales",
    order: 7
  },
  {
    id: "business",
    name: "IAI Business Computer",
    tier: "professional",
    tagline: { vi: "Bộ não vận hành cho founder và SME", en: "Operating brain for founders and SMEs" },
    description: { vi: "Proposal, memo, report, SOP, planning và meeting summary.", en: "Proposals, memos, reports, SOPs, planning, and meeting summaries." },
    audience: { vi: ["Founder", "SME", "Consultant", "Ops lead"], en: ["Founder", "SME", "Consultant", "Ops lead"] },
    highlights: ["Proposal", "Memo", "Report", "SOP", "Planning", "Meeting summary"],
    capabilities: ["run:create", "run:parallel", "run:schedule", "lane:business", "lane:research", "output:export", "storage:files", "governance:auto-approve"],
    cta: { vi: "Xem Business", en: "View Business" },
    shellRoute: "/business",
    order: 8
  },
  {
    id: "finance",
    name: "IAI Finance Computer",
    tier: "enterprise",
    tagline: { vi: "Hệ thống tài chính và kế toán AI", en: "AI finance and accounting system" },
    description: { vi: "Xử lý receipts, reconciliation, month-end và CFO memo.", en: "Processes receipts, reconciliation, month-end, and CFO memos." },
    audience: { vi: ["Kế toán", "Tài chính", "CFO"], en: ["Accountant", "Finance", "CFO"] },
    highlights: ["Receipts", "Reconciliation", "Month-End", "Evidence Packs", "CFO Memo"],
    capabilities: ["run:create", "run:parallel", "run:schedule", "lane:business", "lane:finance", "output:export", "output:packaging", "storage:files", "storage:backup"],
    cta: { vi: "Xem Finance", en: "View Finance" },
    shellRoute: "/finance",
    order: 9
  },
  {
    id: "media",
    name: "IAI Media Computer",
    tier: "enterprise",
    tagline: { vi: "Hệ thống xuất bản và truyền thông AI", en: "AI media publishing system" },
    description: { vi: "Quản lý nội dung, media, design và publishing hàng loạt.", en: "Manages content, media, design, and batch publishing." },
    audience: { vi: ["Media team", "Publisher", "Content lead"], en: ["Media team", "Publisher", "Content lead"] },
    highlights: ["Content", "Media", "Design", "Publishing", "Batch outputs"],
    capabilities: ["run:create", "run:parallel", "run:schedule", "lane:content", "lane:media", "output:export", "output:packaging", "storage:media", "storage:backup"],
    cta: { vi: "Xem Media", en: "View Media" },
    shellRoute: "/media",
    order: 10
  },
  {
    id: "studio",
    name: "IAI Studio Computer",
    tier: "enterprise",
    tagline: { vi: "Môi trường xuất output hàng loạt cho studio và agency", en: "Batch output environment for studios and agencies" },
    description: { vi: "Nội dung, media, design, publishing và batch outputs.", en: "Content, media, design, publishing, and batch outputs." },
    audience: { vi: ["Agency", "Studio", "Publisher", "Media team"], en: ["Agency", "Studio", "Publisher", "Media team"] },
    highlights: ["Content", "Media", "Design", "Publishing", "Batch outputs"],
    capabilities: ["run:create", "run:parallel", "run:schedule", "lane:content", "lane:media", "lane:code", "output:export", "output:packaging", "storage:media", "storage:backup", "governance:audit"],
    cta: { vi: "Xem Studio", en: "View Studio" },
    shellRoute: "/studio",
    order: 11
  },
  {
    id: "enterprise",
    name: "IAI Enterprise Computer",
    tier: "dedicated",
    tagline: { vi: "Hệ thống AI toàn diện cho doanh nghiệp lớn", en: "Comprehensive AI system for large enterprises" },
    description: { vi: "Approval, governance, team runs, audit alerts và workspace controls.", en: "Approvals, governance, team runs, audit alerts, and workspace controls." },
    audience: { vi: ["Doanh nghiệp lớn", "Tổ chức", "Cơ quan"], en: ["Enterprise", "Organization", "Government"] },
    highlights: ["Approvals", "Governance", "Team Runs", "Audit Alerts", "Workspace Controls"],
    capabilities: ["run:create", "run:parallel", "run:schedule", "lane:business", "lane:content", "lane:research", "lane:code", "lane:media", "lane:finance", "output:export", "output:packaging", "output:replay", "storage:files", "storage:media", "storage:backup", "governance:auto-approve", "governance:audit", "governance:custom-policy"],
    cta: { vi: "Liên hệ", en: "Contact sales" },
    shellRoute: "/enterprise",
    order: 12
  }
];
