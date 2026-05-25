export interface ReplayRequest { runId: string; fromState?: string; reason: string; }
export interface ReplayDecision { allowed: boolean; reason: string; }
export function canReplay(request: ReplayRequest): ReplayDecision { if (!request.reason.trim()) return { allowed: false, reason: "replay_reason_required" }; return { allowed: true, reason: "replay_allowed" }; }
