import type { ProductCard } from "@iai/contracts";

export const products: ProductCard[] = [
  { id: "free", name: "IAI Computer Free", highlights: ["Command lite", "Task lite", "Content lite", "Research lite"], tier: "mass" },
  { id: "personal", name: "IAI Computer Personal", highlights: ["Content", "Research", "Report", "Personal task system"], tier: "mass" },
  { id: "creator", name: "IAI Creator Computer", highlights: ["Content Studio", "Calendar", "Landing", "Script", "Brand Voice"], tier: "mass" },
  { id: "business", name: "IAI Business Computer", highlights: ["Proposal", "Memo", "Report", "SOP", "Planning", "Meeting summary"], tier: "professional" },
  { id: "studio", name: "IAI Studio Computer", highlights: ["Content", "Media", "Design", "Publishing", "Batch outputs"], tier: "professional" }
];
