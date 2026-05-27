export type BrowserRuntimeMode = "local_personal" | "cloud_sandbox" | "enterprise_dedicated";
export type BrowserProfile = { id:string; tenantId:string; userId:string; computerId:string; region:string; mode:BrowserRuntimeMode; status:"active"|"locked"|"revoked"; storageRegion:string; encryptedProfileRef?:string; createdAt:string; lastUsedAt?:string; };
