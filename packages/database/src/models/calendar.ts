import { pgQuery } from '../connection';
import { v4 as uuidv4 } from 'uuid';

export interface CalendarEvent {
  id: string;
  tenant_id: string;
  user_id: string;
  computer_id: string;
  calendar_id: string;
  title: string;
  description?: string;
  location?: string;
  start_at: Date;
  end_at: Date;
  timezone: string;
  recurrence_rule?: string;
  status: 'confirmed' | 'tentative' | 'cancelled';
  visibility: 'default' | 'public' | 'private';
  attendees?: any[];
  provider?: string;
  external_id?: string;
  all_day?: boolean;
  source_version?: string;
  created_at: Date;
  updated_at: Date;
}

export interface SmartTask {
  id: string;
  tenant_id: string;
  user_id: string;
  computer_id: string;
  title: string;
  description?: string;
  state: 'draft' | 'ready' | 'scheduled' | 'in_progress' | 'completed' | 'failed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  due_date?: Date;
  scheduled_date?: Date;
  completed_date?: Date;
  assigned_to?: string;
  calendar_event_id?: string;
  source: 'user' | 'ai' | 'integration';
  metadata?: any;
  created_at: Date;
  updated_at: Date;
}

export interface ReminderRule {
  id: string;
  tenant_id: string;
  user_id: string;
  computer_id: string;
  task_id?: string;
  event_id?: string;
  rule_type: string;
  schedule_expression?: string;
  condition_expression?: string;
  timezone: string;
  channels: string[];
  priority: string;
  status: string;
  last_triggered_at?: Date;
  next_trigger_at?: Date;
  trigger_count?: number;
  max_triggers?: number;
  metadata?: any;
  created_at: Date;
  updated_at: Date;
}

export async function createCalendarEvent(data: Omit<CalendarEvent, 'id' | 'created_at' | 'updated_at'>): Promise<CalendarEvent> {
  const id = uuidv4();
  const now = new Date();
  const result = await pgQuery(
    `INSERT INTO calendar_events (id, tenant_id, user_id, computer_id, calendar_id, provider, external_id, title, description, location, start_at, end_at, timezone, all_day, attendees, recurrence_rule, visibility, status, source_version, created_at, updated_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21) RETURNING *`,
    [id, data.tenant_id, data.user_id, data.computer_id, data.calendar_id, data.provider || 'computer_native', data.external_id || null, data.title, data.description || null, data.location || null, data.start_at, data.end_at, data.timezone, data.all_day || false, data.attendees || null, data.recurrence_rule || null, data.visibility, data.status, data.source_version || null, now, now]
  );
  return result.rows[0];
}

export async function getCalendarEvent(id: string): Promise<CalendarEvent | null> {
  const result = await pgQuery('SELECT * FROM calendar_events WHERE id = $1', [id]);
  return result.rows[0] || null;
}

export async function getCalendarEventsByUser(tenantId: string, userId: string, computerId: string, startDate?: Date, endDate?: Date): Promise<CalendarEvent[]> {
  let query = 'SELECT * FROM calendar_events WHERE tenant_id = $1 AND user_id = $2 AND computer_id = $3';
  const params: any[] = [tenantId, userId, computerId];
  if (startDate && endDate) {
    query += ' AND start_at >= $4 AND start_at <= $5';
    params.push(startDate, endDate);
  }
  query += ' ORDER BY start_at ASC';
  const result = await pgQuery(query, params);
  return result.rows;
}

export async function updateCalendarEvent(id: string, updates: Partial<CalendarEvent>): Promise<CalendarEvent> {
  const fields = Object.keys(updates).filter(k => !['id','created_at'].includes(k));
  if (!fields.length) throw new Error('No fields to update');
  const setClause = fields.map((f, i) => `${f} = $${i+2}`).join(', ');
  const result = await pgQuery(`UPDATE calendar_events SET ${setClause}, updated_at = $1 WHERE id = $${fields.length+2} RETURNING *`, [new Date(), ...fields.map(f => (updates as any)[f]), id]);
  return result.rows[0];
}

export async function deleteCalendarEvent(id: string): Promise<boolean> {
  const result = await pgQuery('DELETE FROM calendar_events WHERE id = $1', [id]);
  return (result.rowCount || 0) > 0;
}

export async function createSmartTask(data: Omit<SmartTask, 'id' | 'created_at' | 'updated_at'>): Promise<SmartTask> {
  const id = uuidv4();
  const now = new Date();
  const result = await pgQuery(
    `INSERT INTO smart_tasks (id, tenant_id, user_id, computer_id, title, description, state, priority, due_date, scheduled_date, completed_date, assigned_to, calendar_event_id, source, metadata, created_at, updated_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) RETURNING *`,
    [id, data.tenant_id, data.user_id, data.computer_id, data.title, data.description, data.state, data.priority, data.due_date, data.scheduled_date, data.completed_date, data.assigned_to, data.calendar_event_id, data.source, JSON.stringify(data.metadata || {}), now, now]
  );
  return result.rows[0];
}

export async function getSmartTask(id: string): Promise<SmartTask | null> {
  const result = await pgQuery('SELECT * FROM smart_tasks WHERE id = $1', [id]);
  return result.rows[0] || null;
}

export async function getSmartTasksByUser(tenantId: string, userId: string, computerId: string, state?: string): Promise<SmartTask[]> {
  let query = 'SELECT * FROM smart_tasks WHERE tenant_id = $1 AND user_id = $2 AND computer_id = $3';
  const params: any[] = [tenantId, userId, computerId];
  if (state) { query += ' AND state = $4'; params.push(state); }
  query += ' ORDER BY created_at DESC';
  const result = await pgQuery(query, params);
  return result.rows;
}

export async function updateSmartTask(id: string, updates: Partial<SmartTask>): Promise<SmartTask> {
  const fields = Object.keys(updates).filter(k => !['id','created_at'].includes(k));
  if (!fields.length) throw new Error('No fields to update');
  const setClause = fields.map((f, i) => `${f} = $${i+2}`).join(', ');
  const result = await pgQuery(`UPDATE smart_tasks SET ${setClause}, updated_at = $1 WHERE id = $${fields.length+2} RETURNING *`, [new Date(), ...fields.map(f => (updates as any)[f]), id]);
  return result.rows[0];
}

export async function deleteSmartTask(id: string): Promise<boolean> {
  const result = await pgQuery('DELETE FROM smart_tasks WHERE id = $1', [id]);
  return (result.rowCount || 0) > 0;
}

export async function createReminderRule(data: Omit<ReminderRule, 'id' | 'created_at' | 'updated_at'>): Promise<ReminderRule> {
  const id = uuidv4();
  const now = new Date();
  const result = await pgQuery(
    `INSERT INTO reminder_rules (id, tenant_id, user_id, computer_id, task_id, event_id, rule_type, schedule_expression, condition_expression, timezone, channels, priority, status, last_triggered_at, next_trigger_at, trigger_count, max_triggers, metadata, created_at, updated_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *`,
    [id, data.tenant_id, data.user_id, data.computer_id, data.task_id || null, data.event_id || null, data.rule_type, data.schedule_expression || null, data.condition_expression || null, data.timezone || 'UTC', data.channels || ['mobile_push'], data.priority || 'normal', data.status || 'active', data.last_triggered_at || null, data.next_trigger_at || null, data.trigger_count || 0, data.max_triggers || null, JSON.stringify(data.metadata || {}), now, now]
  );
  return result.rows[0];
}

export async function getReminderRulesByUser(tenantId: string, userId: string, computerId: string): Promise<ReminderRule[]> {
  const result = await pgQuery('SELECT * FROM reminder_rules WHERE tenant_id = $1 AND user_id = $2 AND computer_id = $3 ORDER BY created_at DESC', [tenantId, userId, computerId]);
  return result.rows;
}

export async function updateReminderRule(id: string, updates: Partial<ReminderRule>): Promise<ReminderRule> {
  const fields = Object.keys(updates).filter(k => !['id','created_at'].includes(k));
  if (!fields.length) throw new Error('No fields to update');
  const setClause = fields.map((f, i) => `${f} = $${i+2}`).join(', ');
  const result = await pgQuery(`UPDATE reminder_rules SET ${setClause}, updated_at = $1 WHERE id = $${fields.length+2} RETURNING *`, [new Date(), ...fields.map(f => (updates as any)[f]), id]);
  return result.rows[0];
}

export async function deleteReminderRule(id: string): Promise<boolean> {
  const result = await pgQuery('DELETE FROM reminder_rules WHERE id = $1', [id]);
  return (result.rowCount || 0) > 0;
}

export async function getUpcomingEvents(tenantId: string, userId: string, computerId: string, hours: number = 24): Promise<CalendarEvent[]> {
  const now = new Date();
  const future = new Date(now.getTime() + hours * 60 * 60 * 1000);
  const result = await pgQuery(
    'SELECT * FROM calendar_events WHERE tenant_id = $1 AND user_id = $2 AND computer_id = $3 AND start_at >= $4 AND start_at <= $5 AND status != $6 ORDER BY start_at ASC',
    [tenantId, userId, computerId, now, future, 'cancelled']
  );
  return result.rows;
}

export async function getTasksByState(tenantId: string, userId: string, computerId: string, state: string): Promise<SmartTask[]> {
  const result = await pgQuery(
    'SELECT * FROM smart_tasks WHERE tenant_id = $1 AND user_id = $2 AND computer_id = $3 AND state = $4 ORDER BY priority DESC, created_at DESC',
    [tenantId, userId, computerId, state]
  );
  return result.rows;
}

export async function transitionTaskState(id: string, newState: string): Promise<SmartTask> {
  const now = new Date();
  const completedDate = newState === 'completed' ? now : undefined;
  const result = await pgQuery(
    'UPDATE smart_tasks SET state = $1, completed_date = $2, updated_at = $3 WHERE id = $4 RETURNING *',
    [newState, completedDate, now, id]
  );
  return result.rows[0];
}

export async function getTaskCountsByState(tenantId: string, userId: string, computerId: string): Promise<Record<string, number>> {
  const result = await pgQuery(
    'SELECT state, COUNT(*) as count FROM smart_tasks WHERE tenant_id = $1 AND user_id = $2 AND computer_id = $3 GROUP BY state',
    [tenantId, userId, computerId]
  );
  const counts: Record<string, number> = {};
  result.rows.forEach((row: any) => { counts[row.state] = parseInt(row.count); });
  return counts;
}
