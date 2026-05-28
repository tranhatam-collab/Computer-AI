import { FastifyInstance } from "fastify";
import { 
  BrowserAction, 
  BrowserActionRecord, 
  BrowserActionRiskLevel,
  ApprovalRequest,
  BrowserProfile,
  ConnectedAccount,
  EvidencePack,
  HumanVerificationRequest,
  SessionVaultRecord,
  VaultItem
} from "@iai/contracts";

export default async function browserRoutes(fastify: FastifyInstance) {
  // Browser Session Management
  fastify.get("/browser/sessions", async (request, reply) => {
    try {
      const { tenant_id, user_id, computer_id } = request.query as any;
      if (!tenant_id || !user_id || !computer_id) {
        return reply.status(400).send({ success: false, error: 'Missing tenant_id, user_id, or computer_id' });
      }
      const { getSessionVaultsByUser } = await import('@iai/database');
      const sessions = await getSessionVaultsByUser(tenant_id, user_id, computer_id);
      return { success: true, data: sessions };
    } catch (error) {
      console.error('List sessions error:', error);
      return reply.status(500).send({ success: false, error: 'Failed to list sessions' });
    }
  });

  fastify.post("/browser/sessions", async (request, reply) => {
    try {
      const { 
        tenant_id, user_id, computer_id, browser_profile_id, platform,
        encrypted_cookie_jar_ref, encrypted_local_storage_ref, encrypted_device_binding_ref,
        storage_region, key_version, expires_at 
      } = request.body as any;
      
      // Validate required fields
      if (!tenant_id || !user_id || !computer_id || !platform || !encrypted_cookie_jar_ref || !storage_region || !key_version) {
        return reply.status(400).send({
          success: false,
          error: 'Missing required fields: tenant_id, user_id, computer_id, platform, encrypted_cookie_jar_ref, storage_region, key_version'
        });
      }
      
      const { createSessionVault } = await import('@iai/database');
      const session = await createSessionVault({
        tenant_id,
        user_id,
        computer_id,
        browser_profile_id,
        platform,
        encrypted_cookie_jar_ref,
        encrypted_local_storage_ref,
        encrypted_device_binding_ref,
        storage_region,
        key_version,
        status: 'valid',
        expires_at: expires_at ? new Date(expires_at) : undefined
      });
      
      return { success: true, data: session };
    } catch (error) {
      console.error('Create session error:', error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to create session'
      });
    }
  });

  fastify.get("/browser/sessions/:sessionId", async (request, reply) => {
    try {
      const { sessionId } = request.params as { sessionId: string };
      
      const { getSessionVault } = await import('@iai/database');
      const session = await getSessionVault(sessionId);
      
      if (!session) {
        return reply.status(404).send({
          success: false,
          error: 'Session not found'
        });
      }
      
      return { success: true, data: session };
    } catch (error) {
      console.error('Get session error:', error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to get session'
      });
    }
  });

  fastify.put("/browser/sessions/:sessionId", async (request, reply) => {
    try {
      const { sessionId } = request.params as { sessionId: string };
      const updates = request.body as any;
      
      // Remove fields that shouldn't be updated directly
      const { id, created_at, tenant_id, user_id, computer_id, ...validUpdates } = updates;
      
      const { updateSessionVault } = await import('@iai/database');
      const session = await updateSessionVault(sessionId, validUpdates);
      
      return { success: true, data: session };
    } catch (error) {
      console.error('Update session error:', error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to update session'
      });
    }
  });

  fastify.delete("/browser/sessions/:sessionId", async (request, reply) => {
    try {
      const { sessionId } = request.params as { sessionId: string };
      
      const { deleteSessionVault } = await import('@iai/database');
      const deleted = await deleteSessionVault(sessionId);
      
      if (!deleted) {
        return reply.status(404).send({
          success: false,
          error: 'Session not found'
        });
      }
      
      return {
        success: true,
        data: {
          sessionId,
          deleted: true,
          deletedAt: new Date().toISOString()
        }
      };
    } catch (error) {
      console.error('Delete session error:', error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to delete session'
      });
    }
  });

  fastify.post("/browser/sessions/:sessionId/heartbeat", async (request, reply) => {
    try {
      const { sessionId } = request.params as { sessionId: string };
      
      const { updateSessionLastUsed } = await import('@iai/database');
      await updateSessionLastUsed(sessionId);
      
      return {
        success: true,
        data: {
          sessionId,
          lastUsed: new Date().toISOString()
        }
      };
    } catch (error) {
      console.error('Session heartbeat error:', error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to update session heartbeat'
      });
    }
  });

  // Browser Profiles
  fastify.get("/browser/profiles", async (request, reply) => {
    try {
      const { tenant_id, user_id, computer_id } = request.query as any;
      
      if (!tenant_id || !user_id || !computer_id) {
        return reply.status(400).send({
          success: false,
          error: 'Missing required query parameters: tenant_id, user_id, computer_id'
        });
      }
      
      const { getBrowserProfilesByUser } = await import('@iai/database');
      const profiles = await getBrowserProfilesByUser(tenant_id, user_id, computer_id);
      
      return { success: true, data: profiles };
    } catch (error) {
      console.error('List profiles error:', error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to list browser profiles'
      });
    }
  });

  fastify.post("/browser/profiles", async (request, reply) => {
    try {
      const { 
        tenant_id, user_id, computer_id, profile_name, mode, status,
        region, storage_region, encrypted_profile_ref, user_agent,
        viewport_width, viewport_height
      } = request.body as any;
      
      // Validate required fields
      if (!tenant_id || !user_id || !computer_id || !profile_name || !mode || !status) {
        return reply.status(400).send({
          success: false,
          error: 'Missing required fields: tenant_id, user_id, computer_id, profile_name, mode, status'
        });
      }
      
      const { createBrowserProfile } = await import('@iai/database');
      const profile = await createBrowserProfile({
        tenant_id,
        user_id,
        computer_id,
        profile_name,
        mode,
        status,
        region,
        storage_region,
        encrypted_profile_ref,
        user_agent,
        viewport_width,
        viewport_height,
        last_used_at: new Date()
      });
      
      return { success: true, data: profile };
    } catch (error) {
      console.error('Create profile error:', error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to create browser profile'
      });
    }
  });

  fastify.get("/browser/profiles/:profileId", async (request, reply) => {
    try {
      const { profileId } = request.params as { profileId: string };
      
      const { getBrowserProfile } = await import('@iai/database');
      const profile = await getBrowserProfile(profileId);
      
      if (!profile) {
        return reply.status(404).send({
          success: false,
          error: 'Profile not found'
        });
      }
      
      return { success: true, data: profile };
    } catch (error) {
      console.error('Get profile error:', error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to get browser profile'
      });
    }
  });

  fastify.put("/browser/profiles/:profileId", async (request, reply) => {
    try {
      const { profileId } = request.params as { profileId: string };
      const updates = request.body as any;
      
      // Remove fields that shouldn't be updated directly
      const { id, created_at, tenant_id, user_id, computer_id, ...validUpdates } = updates;
      
      const { updateBrowserProfile } = await import('@iai/database');
      const profile = await updateBrowserProfile(profileId, validUpdates);
      
      return { success: true, data: profile };
    } catch (error) {
      console.error('Update profile error:', error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to update browser profile'
      });
    }
  });

  fastify.delete("/browser/profiles/:profileId", async (request, reply) => {
    try {
      const { profileId } = request.params as { profileId: string };
      
      const { deleteBrowserProfile } = await import('@iai/database');
      const deleted = await deleteBrowserProfile(profileId);
      
      if (!deleted) {
        return reply.status(404).send({
          success: false,
          error: 'Profile not found'
        });
      }
      
      return {
        success: true,
        data: {
          profileId,
          deleted: true,
          deletedAt: new Date().toISOString()
        }
      };
    } catch (error) {
      console.error('Delete profile error:', error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to delete browser profile'
      });
    }
  });

  fastify.post("/browser/profiles/:profileId/switch", async (request, reply) => {
    try {
      const { profileId } = request.params as { profileId: string };
      
      // Update last_used_at for the profile
      const { updateBrowserProfile } = await import('@iai/database');
      const profile = await updateBrowserProfile(profileId, {
        last_used_at: new Date()
      });
      
      return {
        success: true,
        data: {
          profileId,
          switchedAt: new Date().toISOString(),
          profile
        }
      };
    } catch (error) {
      console.error('Switch profile error:', error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to switch browser profile'
      });
    }
  });

  // Connected Accounts (OAuth via auth-sdk)
  fastify.get("/browser/accounts", async (request, reply) => {
    try {
      const { tenant_id, user_id, computer_id } = request.query as any;
      if (!tenant_id || !user_id || !computer_id) {
        return reply.status(400).send({ success: false, error: 'Missing tenant_id, user_id, or computer_id' });
      }
      const { getConnectedAccountsByUser } = await import('@iai/database');
      const accounts = await getConnectedAccountsByUser(tenant_id, user_id, computer_id);
      return { success: true, data: accounts };
    } catch (error) {
      console.error('List accounts error:', error);
      return reply.status(500).send({ success: false, error: 'Failed to list accounts' });
    }
  });

  fastify.post("/browser/accounts/:provider/connect", async (request, reply) => {
    try {
      const { provider } = request.params as any;
      const { tenant_id, user_id, computer_id } = request.query as any;
      if (!tenant_id || !user_id || !computer_id) {
        return reply.status(400).send({ success: false, error: 'Missing tenant_id, user_id, or computer_id' });
      }
      const { generateOAuthUrl } = await import('@iai/auth-sdk');
      const result = generateOAuthUrl(provider, tenant_id, user_id, computer_id);
      if (!result) {
        return reply.status(400).send({ success: false, error: `OAuth not configured for provider: ${provider}` });
      }
      return { success: true, data: { authUrl: result.url, state: result.state } };
    } catch (error) {
      console.error('Connect account error:', error);
      return reply.status(500).send({ success: false, error: 'Failed to initiate OAuth' });
    }
  });

  fastify.post("/browser/accounts/:provider/callback", async (request, reply) => {
    try {
      const { provider } = request.params as any;
      const { code, state } = request.query as any;
      if (!code || !state) {
        return reply.status(400).send({ success: false, error: 'Missing code or state' });
      }
      const { exchangeOAuthCode, verifyOAuthState } = await import('@iai/auth-sdk');
      const stateData = verifyOAuthState(state);
      if (!stateData) {
        return reply.status(400).send({ success: false, error: 'Invalid or expired state' });
      }
      const tokenResult = await exchangeOAuthCode(provider, code, state);
      if (!tokenResult) {
        return reply.status(400).send({ success: false, error: 'Failed to exchange OAuth code' });
      }
      return {
        success: true,
        data: {
          provider,
          userId: stateData.userId,
          tenantId: stateData.tenantId,
          accessToken: tokenResult.accessToken,
          refreshToken: tokenResult.refreshToken,
          expiresIn: tokenResult.expiresIn,
        },
      };
    } catch (error) {
      console.error('OAuth callback error:', error);
      return reply.status(500).send({ success: false, error: 'Failed to complete OAuth' });
    }
  });

  // Vault Management
  fastify.get("/browser/vault/items", async (request, reply) => {
    try {
      const { tenant_id, user_id, computer_id, item_type } = request.query as any;
      if (!tenant_id || !user_id || !computer_id) {
        return reply.status(400).send({ success: false, error: 'Missing required query parameters: tenant_id, user_id, computer_id' });
      }
      const { getVaultItemsByUser, getVaultItemsByType } = await import('@iai/database');
      const items = item_type ? await getVaultItemsByType(tenant_id, user_id, computer_id, item_type) : await getVaultItemsByUser(tenant_id, user_id, computer_id);
      return { success: true, data: items };
    } catch (error) {
      console.error('List vault items error:', error);
      return reply.status(500).send({ success: false, error: 'Failed to list vault items' });
    }
  });

  fastify.post("/browser/vault/items", async (request, reply) => {
    try {
      const { tenant_id, user_id, computer_id, browser_profile_id, item_type, encrypted_item_ref, key_version, storage_region, metadata, expires_in_hours } = request.body as any;
      if (!tenant_id || !user_id || !computer_id || !item_type || !encrypted_item_ref || !key_version || !storage_region) {
        return reply.status(400).send({ success: false, error: 'Missing required fields' });
      }
      const { createVaultItem } = await import('@iai/database');
      const expires_at = expires_in_hours ? new Date(Date.now() + expires_in_hours * 60 * 60 * 1000) : undefined;
      const item = await createVaultItem({ tenant_id, user_id, computer_id, browser_profile_id, item_type, encrypted_item_ref, key_version, storage_region, metadata, status: 'active', expires_at });
      return { success: true, data: item };
    } catch (error) {
      console.error('Create vault item error:', error);
      return reply.status(500).send({ success: false, error: 'Failed to create vault item' });
    }
  });

  fastify.get("/browser/vault/items/:itemId", async (request, reply) => {
    try {
      const { itemId } = request.params as { itemId: string };
      const { getVaultItem, updateVaultLastAccessed } = await import('@iai/database');
      const item = await getVaultItem(itemId);
      if (!item) return reply.status(404).send({ success: false, error: 'Vault item not found' });
      await updateVaultLastAccessed(itemId);
      return { success: true, data: item };
    } catch (error) {
      console.error('Get vault item error:', error);
      return reply.status(500).send({ success: false, error: 'Failed to get vault item' });
    }
  });

  fastify.put("/browser/vault/items/:itemId", async (request, reply) => {
    try {
      const { itemId } = request.params as { itemId: string };
      const updates = request.body as any;
      const { id, created_at, tenant_id, user_id, computer_id, ...validUpdates } = updates;
      const { updateVaultItem } = await import('@iai/database');
      const item = await updateVaultItem(itemId, validUpdates);
      return { success: true, data: item };
    } catch (error) {
      console.error('Update vault item error:', error);
      return reply.status(500).send({ success: false, error: 'Failed to update vault item' });
    }
  });

  fastify.delete("/browser/vault/items/:itemId", async (request, reply) => {
    try {
      const { itemId } = request.params as { itemId: string };
      const { deleteVaultItem } = await import('@iai/database');
      const deleted = await deleteVaultItem(itemId);
      if (!deleted) return reply.status(404).send({ success: false, error: 'Vault item not found' });
      return { success: true, data: { itemId, deleted: true } };
    } catch (error) {
      console.error('Delete vault item error:', error);
      return reply.status(500).send({ success: false, error: 'Failed to delete vault item' });
    }
  });

  // Browser Actions
  fastify.post("/browser/actions", async (request, reply) => {
    try {
      const { tenant_id, user_id, computer_id, action_type, action_data, risk_level, session_vault_id, requested_by } = request.body as any;
      if (!tenant_id || !user_id || !computer_id || !action_type || !risk_level || !requested_by) {
        return reply.status(400).send({ success: false, error: 'Missing required fields' });
      }
      const requiresApproval = risk_level === 'high' || risk_level === 'critical';
      if (requiresApproval) {
        const { createApprovalRequest } = await import('@iai/database');
        const expires_at = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const approval = await createApprovalRequest({ tenant_id, user_id, computer_id, session_vault_id, action_type, action_data, risk_level, status: 'pending', requested_by, expires_at, human_verification_required: risk_level === 'critical' });
        return { success: true, data: { actionId: approval.id, status: 'waiting_for_approval', approvalRequired: true, approval } };
      }
      return { success: true, data: { status: 'executed', approvalRequired: false, executedAt: new Date().toISOString() } };
    } catch (error) {
      console.error('Browser action error:', error);
      return reply.status(500).send({ success: false, error: 'Failed to process browser action' });
    }
  });

  // Approvals
  fastify.get("/browser/approvals", async (request, reply) => {
    try {
      const { tenant_id, user_id, computer_id, status } = request.query as any;
      if (!tenant_id || !user_id || !computer_id) {
        return reply.status(400).send({ success: false, error: 'Missing required query parameters' });
      }
      const { getApprovalRequestsByUser } = await import('@iai/database');
      const approvals = await getApprovalRequestsByUser(tenant_id, user_id, computer_id, status);
      return { success: true, data: approvals };
    } catch (error) {
      console.error('List approvals error:', error);
      return reply.status(500).send({ success: false, error: 'Failed to list approvals' });
    }
  });

  fastify.get("/browser/approvals/:approvalId", async (request, reply) => {
    try {
      const { approvalId } = request.params as { approvalId: string };
      const { getApprovalRequest } = await import('@iai/database');
      const approval = await getApprovalRequest(approvalId);
      if (!approval) return reply.status(404).send({ success: false, error: 'Approval request not found' });
      return { success: true, data: approval };
    } catch (error) {
      console.error('Get approval error:', error);
      return reply.status(500).send({ success: false, error: 'Failed to get approval' });
    }
  });

  fastify.post("/browser/approvals/:approvalId/approve", async (request, reply) => {
    try {
      const { approvalId } = request.params as { approvalId: string };
      const { approved_by, justification } = request.body as any;
      if (!approved_by) return reply.status(400).send({ success: false, error: 'approved_by is required' });
      const { approveRequest } = await import('@iai/database');
      const approval = await approveRequest(approvalId, approved_by, justification);
      return { success: true, data: approval };
    } catch (error) {
      console.error('Approve request error:', error);
      return reply.status(500).send({ success: false, error: 'Failed to approve request' });
    }
  });

  fastify.post("/browser/approvals/:approvalId/reject", async (request, reply) => {
    try {
      const { approvalId } = request.params as { approvalId: string };
      const { rejected_by, justification } = request.body as any;
      if (!rejected_by) return reply.status(400).send({ success: false, error: 'rejected_by is required' });
      const { rejectRequest } = await import('@iai/database');
      const approval = await rejectRequest(approvalId, rejected_by, justification);
      return { success: true, data: approval };
    } catch (error) {
      console.error('Reject request error:', error);
      return reply.status(500).send({ success: false, error: 'Failed to reject request' });
    }
  });

  // Evidence & Reports
  fastify.get("/browser/evidence/:runId", async (request, reply) => {
    try {
      const { runId } = request.params as { runId: string };
      const { getEvidencePacksByRun } = await import('@iai/database');
      const packs = await getEvidencePacksByRun(runId);
      return { success: true, data: packs };
    } catch (error) {
      console.error('Get evidence error:', error);
      return reply.status(500).send({ success: false, error: 'Failed to get evidence' });
    }
  });

  fastify.post("/browser/evidence", async (request, reply) => {
    try {
      const { tenant_id, user_id, computer_id, run_id, user_command, platforms, screenshots, actions_taken, approvals, final_urls, risk_flags } = request.body as any;
      if (!tenant_id || !user_id || !computer_id || !run_id) {
        return reply.status(400).send({ success: false, error: 'Missing required fields' });
      }
      const { createEvidencePack } = await import('@iai/database');
      const pack = await createEvidencePack({
        tenant_id, user_id, computer_id, run_id, user_command,
        platforms: platforms || [], screenshots: screenshots || [], actions_taken: actions_taken || [],
        approvals: approvals || [], final_urls: final_urls || [], risk_flags: risk_flags || [], status: 'completed',
      });
      return { success: true, data: pack };
    } catch (error) {
      console.error('Create evidence error:', error);
      return reply.status(500).send({ success: false, error: 'Failed to create evidence' });
    }
  });

  // Human Verification
  fastify.get("/browser/verification/requests", async (request, reply) => {
    try {
      const { tenant_id, user_id, computer_id } = request.query as any;
      
      if (!tenant_id || !user_id || !computer_id) {
        return reply.status(400).send({
          success: false,
          error: 'Missing required query parameters: tenant_id, user_id, computer_id'
        });
      }
      
      const { getVerificationRequestsByUser } = await import('@iai/database');
      const requests = await getVerificationRequestsByUser(tenant_id, user_id, computer_id);
      
      return { success: true, data: requests };
    } catch (error) {
      console.error('List verification requests error:', error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to list verification requests'
      });
    }
  });

  fastify.post("/browser/verification/requests", async (request, reply) => {
    try {
      const { 
        tenant_id, user_id, computer_id, session_vault_id, request_type,
        request_data, verification_methods, max_attempts, expires_in_hours
      } = request.body as any;
      
      // Validate required fields
      if (!tenant_id || !user_id || !computer_id || !request_type || !verification_methods || !Array.isArray(verification_methods)) {
        return reply.status(400).send({
          success: false,
          error: 'Missing required fields: tenant_id, user_id, computer_id, request_type, verification_methods (array)'
        });
      }
      
      const expires_at = new Date();
      expires_at.setHours(expires_at.getHours() + (expires_in_hours || 24));
      
      const { createVerificationRequest } = await import('@iai/database');
      const verificationRequest = await createVerificationRequest({
        tenant_id,
        user_id,
        computer_id,
        session_vault_id,
        request_type,
        request_data: request_data || {},
        verification_methods,
        max_attempts: max_attempts || 3,
        expires_at,
        status: 'pending'
      });
      
      return { success: true, data: verificationRequest };
    } catch (error) {
      console.error('Create verification request error:', error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to create verification request'
      });
    }
  });

  fastify.get("/browser/verification/requests/:requestId", async (request, reply) => {
    try {
      const { requestId } = request.params as { requestId: string };
      
      const { getVerificationRequest } = await import('@iai/database');
      const verificationRequest = await getVerificationRequest(requestId);
      
      if (!verificationRequest) {
        return reply.status(404).send({
          success: false,
          error: 'Verification request not found'
        });
      }
      
      return { success: true, data: verificationRequest };
    } catch (error) {
      console.error('Get verification request error:', error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to get verification request'
      });
    }
  });

  fastify.post("/browser/verification/requests/:requestId/complete", async (request, reply) => {
    try {
      const { requestId } = request.params as { requestId: string };
      const { verification_data } = request.body as any;
      
      const { completeVerificationRequest } = await import('@iai/database');
      const verificationRequest = await completeVerificationRequest(requestId, verification_data || {});
      
      return { success: true, data: verificationRequest };
    } catch (error) {
      console.error('Complete verification request error:', error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to complete verification request'
      });
    }
  });

  fastify.post("/browser/verification/requests/:requestId/fail", async (request, reply) => {
    try {
      const { requestId } = request.params as { requestId: string };
      const { reason } = request.body as any;
      
      const { failVerificationRequest } = await import('@iai/database');
      const verificationRequest = await failVerificationRequest(requestId, reason);
      
      return { success: true, data: verificationRequest };
    } catch (error) {
      console.error('Fail verification request error:', error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to fail verification request'
      });
    }
  });

  // Verified User Management
  fastify.get("/browser/verified-users", async (request, reply) => {
    try {
      const { tenant_id, user_id } = request.query as any;
      
      if (!tenant_id || !user_id) {
        return reply.status(400).send({
          success: false,
          error: 'Missing required query parameters: tenant_id, user_id'
        });
      }
      
      const { getVerifiedUsersByUser } = await import('@iai/database');
      const verifiedUsers = await getVerifiedUsersByUser(tenant_id, user_id);
      
      return { success: true, data: verifiedUsers };
    } catch (error) {
      console.error('List verified users error:', error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to list verified users'
      });
    }
  });

  fastify.post("/browser/verified-users", async (request, reply) => {
    try {
      const { 
        tenant_id, user_id, verification_method, verification_data,
        expires_in_hours
      } = request.body as any;
      
      // Validate required fields
      if (!tenant_id || !user_id || !verification_method || !verification_data) {
        return reply.status(400).send({
          success: false,
          error: 'Missing required fields: tenant_id, user_id, verification_method, verification_data'
        });
      }
      
      const verified_at = new Date();
      const expires_at = expires_in_hours ? new Date(verified_at.getTime() + expires_in_hours * 60 * 60 * 1000) : undefined;
      
      const { createVerifiedUser } = await import('@iai/database');
      const verifiedUser = await createVerifiedUser({
        tenant_id,
        user_id,
        verification_method,
        verification_data,
        verified_at,
        expires_at,
        status: 'active'
      });
      
      return { success: true, data: verifiedUser };
    } catch (error) {
      console.error('Create verified user error:', error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to create verified user'
      });
    }
  });

  fastify.get("/browser/verified-users/check", async (request, reply) => {
    try {
      const { tenant_id, user_id, verification_method } = request.query as any;
      
      if (!tenant_id || !user_id) {
        return reply.status(400).send({
          success: false,
          error: 'Missing required query parameters: tenant_id, user_id'
        });
      }
      
      const { isUserVerified, getLatestVerification } = await import('@iai/database');
      const isVerified = await isUserVerified(tenant_id, user_id, verification_method);
      const latestVerification = await getLatestVerification(tenant_id, user_id, verification_method);
      
      return { 
        success: true, 
        data: {
          is_verified: isVerified,
          latest_verification: latestVerification
        }
      };
    } catch (error) {
      console.error('Check verification status error:', error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to check verification status'
      });
    }
  });

  // Trusted Device Management
  fastify.get("/browser/trusted-devices", async (request, reply) => {
    try {
      const { tenant_id, user_id, computer_id } = request.query as any;
      
      if (!tenant_id || !user_id || !computer_id) {
        return reply.status(400).send({
          success: false,
          error: 'Missing required query parameters: tenant_id, user_id, computer_id'
        });
      }
      
      const { getTrustedDevicesByUser } = await import('@iai/database');
      const trustedDevices = await getTrustedDevicesByUser(tenant_id, user_id, computer_id);
      
      return { success: true, data: trustedDevices };
    } catch (error) {
      console.error('List trusted devices error:', error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to list trusted devices'
      });
    }
  });

  fastify.post("/browser/trusted-devices", async (request, reply) => {
    try {
      const { 
        tenant_id, user_id, computer_id, device_id, device_name, device_type,
        device_fingerprint, trust_level, expires_in_hours
      } = request.body as any;
      
      // Validate required fields
      if (!tenant_id || !user_id || !computer_id || !device_id || !trust_level) {
        return reply.status(400).send({
          success: false,
          error: 'Missing required fields: tenant_id, user_id, computer_id, device_id, trust_level'
        });
      }
      
      const last_seen_at = new Date();
      const expires_at = expires_in_hours ? new Date(last_seen_at.getTime() + expires_in_hours * 60 * 60 * 1000) : undefined;
      
      const { createTrustedDevice } = await import('@iai/database');
      const trustedDevice = await createTrustedDevice({
        tenant_id,
        user_id,
        computer_id,
        device_id,
        device_name,
        device_type,
        device_fingerprint,
        trust_level,
        last_seen_at,
        expires_at
      });
      
      return { success: true, data: trustedDevice };
    } catch (error) {
      console.error('Create trusted device error:', error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to create trusted device'
      });
    }
  });

  fastify.get("/browser/trusted-devices/check", async (request, reply) => {
    try {
      const { tenant_id, user_id, computer_id, device_id } = request.query as any;
      
      if (!tenant_id || !user_id || !computer_id || !device_id) {
        return reply.status(400).send({
          success: false,
          error: 'Missing required query parameters: tenant_id, user_id, computer_id, device_id'
        });
      }
      
      const { getTrustedDeviceByDeviceId } = await import('@iai/database');
      const trustedDevice = await getTrustedDeviceByDeviceId(tenant_id, user_id, computer_id, device_id);
      
      const isTrusted = !!trustedDevice && 
                       trustedDevice.trust_level !== 'low' &&
                       (!trustedDevice.expires_at || trustedDevice.expires_at > new Date());
      
      return { 
        success: true, 
        data: {
          is_trusted: isTrusted,
          trusted_device: trustedDevice
        }
      };
    } catch (error) {
      console.error('Check trusted device error:', error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to check trusted device'
      });
    }
  });
}
