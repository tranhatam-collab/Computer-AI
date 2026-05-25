export type ComputerProductId =
  | "free" | "personal" | "creator" | "developer" | "research" | "business"
  | "office" | "sales" | "finance" | "studio" | "team" | "enterprise";
export type ProductFamily = "entry" | "individual" | "creative" | "technical" | "business" | "enterprise";
export interface ComputerProduct {
  id: ComputerProductId;
  name: string;
  family: ProductFamily;
  shortDescription: string;
  targetUser: string;
  primaryAgents: string[];
  defaultToolPacks: string[];
  outputTypes: string[];
  recommendedPlan: string;
  status: "live-shell" | "planned" | "internal-preview" | "locked";
}
export const computerProducts: ComputerProduct[] = [
  { id: "free", name: "Free Computer", family: "entry", shortDescription: "A limited AI computer for simple tasks and demos.", targetUser: "New users testing the system.", primaryAgents: ["router", "writer"], defaultToolPacks: ["basic-chat", "rewrite", "summary"], outputTypes: ["text", "short-report"], recommendedPlan: "free", status: "live-shell" },
  { id: "personal", name: "Personal Computer", family: "individual", shortDescription: "A personal work surface for planning, writing, learning, and everyday execution.", targetUser: "Individuals who need a stable AI work assistant.", primaryAgents: ["planner", "writer", "reviewer"], defaultToolPacks: ["documents", "learning", "planning"], outputTypes: ["plan", "document", "checklist"], recommendedPlan: "starter", status: "planned" },
  { id: "creator", name: "Creator Computer", family: "creative", shortDescription: "A content and media workstation for writing, campaigns, scripts, and publishing.", targetUser: "Creators, media teams, and editorial operators.", primaryAgents: ["writer", "critic", "seo"], defaultToolPacks: ["content", "seo", "social"], outputTypes: ["article", "campaign", "script"], recommendedPlan: "pro", status: "planned" },
  { id: "developer", name: "Developer Computer", family: "technical", shortDescription: "A code and repo work surface for audits, scaffolds, and release support.", targetUser: "Developers and technical operators.", primaryAgents: ["coder", "reviewer", "devops"], defaultToolPacks: ["github", "cloudflare", "code-audit"], outputTypes: ["patch-plan", "technical-report", "test-plan"], recommendedPlan: "builder", status: "planned" },
  { id: "research", name: "Research Computer", family: "individual", shortDescription: "A research workstation for source review, synthesis, and citation-backed reports.", targetUser: "Researchers, founders, analysts, and writers.", primaryAgents: ["researcher", "analyst", "verifier"], defaultToolPacks: ["web-research", "citations", "summary"], outputTypes: ["research-brief", "matrix", "timeline"], recommendedPlan: "pro", status: "planned" },
  { id: "business", name: "Business Computer", family: "business", shortDescription: "A business planning computer for proposals, operations, and decision support.", targetUser: "Founders, operators, consultants, and small teams.", primaryAgents: ["planner", "analyst", "writer"], defaultToolPacks: ["business-plan", "proposal", "ops"], outputTypes: ["proposal", "execution-plan", "decision-memo"], recommendedPlan: "pro", status: "planned" },
  { id: "office", name: "Office Computer", family: "business", shortDescription: "A document, spreadsheet, and presentation work surface.", targetUser: "Office teams and administrative operators.", primaryAgents: ["document", "data", "presentation"], defaultToolPacks: ["docs", "sheets", "slides"], outputTypes: ["doc", "sheet", "deck-outline"], recommendedPlan: "builder", status: "planned" },
  { id: "sales", name: "Sales Computer", family: "business", shortDescription: "A sales and customer pipeline workstation.", targetUser: "Sales teams and business development operators.", primaryAgents: ["researcher", "writer", "crm"], defaultToolPacks: ["lead-research", "email-draft", "crm"], outputTypes: ["lead-list", "email-sequence", "pipeline-summary"], recommendedPlan: "builder", status: "planned" },
  { id: "finance", name: "Finance Computer", family: "business", shortDescription: "A finance and reporting workstation with controlled boundaries.", targetUser: "Finance admins, founders, and operators.", primaryAgents: ["data", "reporter", "reviewer"], defaultToolPacks: ["invoice-draft", "expense-summary", "reporting"], outputTypes: ["finance-summary", "reconciliation-plan", "invoice-draft"], recommendedPlan: "business", status: "planned" },
  { id: "studio", name: "Studio Computer", family: "creative", shortDescription: "A creative studio for brand, campaign, image, and media workflows.", targetUser: "Designers, marketers, and creative teams.", primaryAgents: ["creative-director", "writer", "visual-planner"], defaultToolPacks: ["brand", "image-brief", "campaign"], outputTypes: ["creative-brief", "brand-system", "visual-plan"], recommendedPlan: "pro", status: "live-shell" },
  { id: "team", name: "Team Computer", family: "enterprise", shortDescription: "A shared AI computer for teams with approval and audit.", targetUser: "Teams that need shared memory, roles, and governance.", primaryAgents: ["coordinator", "reviewer", "ops"], defaultToolPacks: ["workspace", "approval", "audit"], outputTypes: ["team-run", "approval-record", "status-report"], recommendedPlan: "business", status: "planned" },
  { id: "enterprise", name: "Enterprise Computer", family: "enterprise", shortDescription: "A controlled AI work operating system for organizations.", targetUser: "Organizations that require private policy, audit, and custom integration.", primaryAgents: ["coordinator", "policy", "security", "admin"], defaultToolPacks: ["sso", "audit", "private-connectors"], outputTypes: ["enterprise-run", "audit-export", "policy-report"], recommendedPlan: "enterprise", status: "locked" }
];
export function getComputerProduct(id: ComputerProductId): ComputerProduct | undefined {
  return computerProducts.find((product) => product.id === id);
}
