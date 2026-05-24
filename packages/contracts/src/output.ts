export type VerificationState = "unverified" | "verified_basic" | "reviewed_human" | "partial";
export interface OutputArtifact { id: string; type: string; verificationState: VerificationState; title: string; }
