export interface VerificationResult { ok: boolean; checks: string[]; warnings: string[]; errors: string[]; }
export function verifyOutput(output: unknown): VerificationResult { if (output === null || output === undefined) return { ok: false, checks: [], warnings: [], errors: ["output_missing"] }; return { ok: true, checks: ["output_present"], warnings: [], errors: [] }; }
