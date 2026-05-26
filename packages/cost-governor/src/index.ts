import { query } from "@iai/database/pg";

export interface CostCheck {
  userId: string;
  instanceId?: string;
  estimatedCostCents: number;
  provider: string;
  model: string;
}

export interface CostResult {
  allowed: boolean;
  reason?: string;
  currentDailyCents: number;
  currentMonthlyCents: number;
  limitDailyCents: number;
  limitMonthlyCents: number;
  requireApproval: boolean;
}

export async function checkCostLimit(check: CostCheck): Promise<CostResult> {
  // 1. Get user's cost policy
  const policyRes = await query<{ daily_max_cents: number; monthly_max_cents: number; per_command_max_cents: number; user_confirm_above_cents: number }>(
    `SELECT daily_max_cents, monthly_max_cents, per_command_max_cents, user_confirm_above_cents
     FROM computer_cost_policies
     WHERE instance_id = $1`,
    [check.instanceId]
  );

  // Fallback: default limits if no policy found
  const policy = policyRes.rows[0] || {
    daily_max_cents: 1500,   // $15
    monthly_max_cents: 5000, // $50
    per_command_max_cents: 100, // $1
    user_confirm_above_cents: 100, // $1
  };

  // 2. Per-command hard limit
  if (check.estimatedCostCents > policy.per_command_max_cents) {
    return {
      allowed: false,
      reason: `Per-command limit exceeded: ${check.estimatedCostCents}c > ${policy.per_command_max_cents}c`,
      currentDailyCents: 0,
      currentMonthlyCents: 0,
      limitDailyCents: policy.daily_max_cents,
      limitMonthlyCents: policy.monthly_max_cents,
      requireApproval: true,
    };
  }

  // 3. Get current usage from ai_usage_records
  const today = new Date().toISOString().slice(0, 10);
  const monthStart = today.slice(0, 7) + "-01";

  const dailyRes = await query<{ total: number }>(
    `SELECT COALESCE(SUM(cost_cents), 0) as total
     FROM ai_usage_records
     WHERE user_id = $1 AND created_at >= $2::date`,
    [check.userId, today]
  );

  const monthlyRes = await query<{ total: number }>(
    `SELECT COALESCE(SUM(cost_cents), 0) as total
     FROM ai_usage_records
     WHERE user_id = $1 AND created_at >= $2::date`,
    [check.userId, monthStart]
  );

  const currentDaily = Number(dailyRes.rows[0]?.total || 0);
  const currentMonthly = Number(monthlyRes.rows[0]?.total || 0);
  const projectedDaily = currentDaily + check.estimatedCostCents;
  const projectedMonthly = currentMonthly + check.estimatedCostCents;

  // 4. Daily hard limit
  if (projectedDaily > policy.daily_max_cents) {
    return {
      allowed: false,
      reason: `Daily limit exceeded: ${projectedDaily}c > ${policy.daily_max_cents}c`,
      currentDailyCents: currentDaily,
      currentMonthlyCents: currentMonthly,
      limitDailyCents: policy.daily_max_cents,
      limitMonthlyCents: policy.monthly_max_cents,
      requireApproval: true,
    };
  }

  // 5. Monthly hard limit
  if (projectedMonthly > policy.monthly_max_cents) {
    return {
      allowed: false,
      reason: `Monthly limit exceeded: ${projectedMonthly}c > ${policy.monthly_max_cents}c`,
      currentDailyCents: currentDaily,
      currentMonthlyCents: currentMonthly,
      limitDailyCents: policy.daily_max_cents,
      limitMonthlyCents: policy.monthly_max_cents,
      requireApproval: true,
    };
  }

  // 6. Require approval above threshold
  const requireApproval = check.estimatedCostCents >= policy.user_confirm_above_cents;

  return {
    allowed: true,
    currentDailyCents: currentDaily,
    currentMonthlyCents: currentMonthly,
    limitDailyCents: policy.daily_max_cents,
    limitMonthlyCents: policy.monthly_max_cents,
    requireApproval,
  };
}

export async function recordUsage(params: {
  userId: string;
  instanceId?: string;
  commandId?: string;
  runId?: string;
  provider: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  costCents: number;
  approvedBy?: string;
}): Promise<void> {
  await query(
    `INSERT INTO ai_usage_records
     (user_id, instance_id, command_id, run_id, provider, model, input_tokens, output_tokens, cost_cents, approved_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
    [
      params.userId,
      params.instanceId || null,
      params.commandId || null,
      params.runId || null,
      params.provider,
      params.model,
      params.inputTokens,
      params.outputTokens,
      params.costCents,
      params.approvedBy || null,
    ]
  );
}
