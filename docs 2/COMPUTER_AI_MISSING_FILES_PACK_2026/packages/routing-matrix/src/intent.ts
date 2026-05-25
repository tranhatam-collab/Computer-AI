export type IntentClass = "chat" | "writing" | "research" | "coding" | "document" | "data" | "business" | "creative" | "operations" | "approval";
export interface IntentInput { text: string; userPlan: string; productId?: string; requestedTools?: string[]; }
export interface ClassifiedIntent { intent: IntentClass; risk: "low" | "medium" | "high"; requiresCitations: boolean; requiresApproval: boolean; }
