import { FastifyInstance } from "fastify";
import { CalendarProvider, SyncDirection, CalendarProviderConnection, CalendarEvent, SmartTask, ReminderRule } from "@iai/contracts";

function requireFields(body: any, fields: string[]): string | null {
  for (const f of fields) { if (!body[f]) return `Missing required field: ${f}`; }
  return null;
}

export default async function calendarRoutes(fastify: FastifyInstance) {
  // Calendar Events
  fastify.get("/api/calendar/events", async (request, reply) => {
    try {
      const { tenant_id, user_id, computer_id, start_date, end_date } = request.query as any;
      const err = requireFields({ tenant_id, user_id, computer_id }, ['tenant_id','user_id','computer_id']);
      if (err) return reply.status(400).send({ success: false, error: err });
      const { getCalendarEventsByUser } = await import('@iai/database');
      const start = start_date ? new Date(start_date as string) : undefined;
      const end = end_date ? new Date(end_date as string) : undefined;
      const events = await getCalendarEventsByUser(tenant_id, user_id, computer_id, start, end);
      return { success: true, data: events };
    } catch (error) { console.error('List events error:', error); return reply.status(500).send({ success: false, error: 'Failed to list events' }); }
  });

  fastify.post("/api/calendar/events", async (request, reply) => {
    try {
      const { tenant_id, user_id, computer_id, calendar_id, title, description, location, start_time, end_time, timezone, recurrence_rule, visibility, attendees } = request.body as any;
      const err = requireFields({ tenant_id, user_id, computer_id, calendar_id, title, start_time, end_time, timezone }, ['tenant_id','user_id','computer_id','calendar_id','title','start_time','end_time','timezone']);
      if (err) return reply.status(400).send({ success: false, error: err });
      const { createCalendarEvent } = await import('@iai/database');
      const event = await createCalendarEvent({ tenant_id, user_id, computer_id, calendar_id, title, description, location, start_at: new Date(start_time), end_at: new Date(end_time), timezone, recurrence_rule, status: 'confirmed', visibility: visibility || 'default', attendees } as any);
      return { success: true, data: event };
    } catch (error) { console.error('Create event error:', error); return reply.status(500).send({ success: false, error: 'Failed to create event' }); }
  });

  fastify.get("/api/calendar/events/:eventId", async (request, reply) => {
    try {
      const { eventId } = request.params as { eventId: string };
      const { getCalendarEvent } = await import('@iai/database');
      const event = await getCalendarEvent(eventId);
      if (!event) return reply.status(404).send({ success: false, error: 'Event not found' });
      return { success: true, data: event };
    } catch (error) { console.error('Get event error:', error); return reply.status(500).send({ success: false, error: 'Failed to get event' }); }
  });

  fastify.patch("/api/calendar/events/:eventId", async (request, reply) => {
    try {
      const { eventId } = request.params as { eventId: string };
      const updates = request.body as any;
      const { id, created_at, tenant_id, user_id, computer_id, ...validUpdates } = updates;
      const { updateCalendarEvent } = await import('@iai/database');
      const event = await updateCalendarEvent(eventId, validUpdates);
      return { success: true, data: event };
    } catch (error) { console.error('Update event error:', error); return reply.status(500).send({ success: false, error: 'Failed to update event' }); }
  });

  fastify.delete("/api/calendar/events/:eventId", async (request, reply) => {
    try {
      const { eventId } = request.params as { eventId: string };
      const { deleteCalendarEvent } = await import('@iai/database');
      const deleted = await deleteCalendarEvent(eventId);
      if (!deleted) return reply.status(404).send({ success: false, error: 'Event not found' });
      return { success: true, data: { eventId, deleted: true } };
    } catch (error) { console.error('Delete event error:', error); return reply.status(500).send({ success: false, error: 'Failed to delete event' }); }
  });

  fastify.get("/api/calendar/events/upcoming", async (request, reply) => {
    try {
      const { tenant_id, user_id, computer_id, hours } = request.query as any;
      const err = requireFields({ tenant_id, user_id, computer_id }, ['tenant_id','user_id','computer_id']);
      if (err) return reply.status(400).send({ success: false, error: err });
      const { getUpcomingEvents } = await import('@iai/database');
      const events = await getUpcomingEvents(tenant_id, user_id, computer_id, hours ? parseInt(hours) : 24);
      return { success: true, data: events };
    } catch (error) { console.error('Get upcoming events error:', error); return reply.status(500).send({ success: false, error: 'Failed to get upcoming events' }); }
  });

  // Smart Tasks
  fastify.get("/api/tasks", async (request, reply) => {
    try {
      const { tenant_id, user_id, computer_id, state } = request.query as any;
      const err = requireFields({ tenant_id, user_id, computer_id }, ['tenant_id','user_id','computer_id']);
      if (err) return reply.status(400).send({ success: false, error: err });
      const { getSmartTasksByUser } = await import('@iai/database');
      const tasks = await getSmartTasksByUser(tenant_id, user_id, computer_id, state);
      return { success: true, data: tasks };
    } catch (error) { console.error('List tasks error:', error); return reply.status(500).send({ success: false, error: 'Failed to list tasks' }); }
  });

  fastify.post("/api/tasks", async (request, reply) => {
    try {
      const { tenant_id, user_id, computer_id, title, description, priority, due_date, scheduled_date, assigned_to, source, metadata } = request.body as any;
      const err = requireFields({ tenant_id, user_id, computer_id, title, priority }, ['tenant_id','user_id','computer_id','title','priority']);
      if (err) return reply.status(400).send({ success: false, error: err });
      const { createSmartTask } = await import('@iai/database');
      const task = await createSmartTask({ tenant_id, user_id, computer_id, title, description, state: 'draft', priority, due_date: due_date ? new Date(due_date) : undefined, scheduled_date: scheduled_date ? new Date(scheduled_date) : undefined, assigned_to, source: source || 'user', metadata });
      return { success: true, data: task };
    } catch (error) { console.error('Create task error:', error); return reply.status(500).send({ success: false, error: 'Failed to create task' }); }
  });

  fastify.get("/api/tasks/:taskId", async (request, reply) => {
    try {
      const { taskId } = request.params as { taskId: string };
      const { getSmartTask } = await import('@iai/database');
      const task = await getSmartTask(taskId);
      if (!task) return reply.status(404).send({ success: false, error: 'Task not found' });
      return { success: true, data: task };
    } catch (error) { console.error('Get task error:', error); return reply.status(500).send({ success: false, error: 'Failed to get task' }); }
  });

  fastify.patch("/api/tasks/:taskId", async (request, reply) => {
    try {
      const { taskId } = request.params as { taskId: string };
      const updates = request.body as any;
      const { id, created_at, tenant_id, user_id, computer_id, ...validUpdates } = updates;
      const { updateSmartTask } = await import('@iai/database');
      const task = await updateSmartTask(taskId, validUpdates);
      return { success: true, data: task };
    } catch (error) { console.error('Update task error:', error); return reply.status(500).send({ success: false, error: 'Failed to update task' }); }
  });

  fastify.delete("/api/tasks/:taskId", async (request, reply) => {
    try {
      const { taskId } = request.params as { taskId: string };
      const { deleteSmartTask } = await import('@iai/database');
      const deleted = await deleteSmartTask(taskId);
      if (!deleted) return reply.status(404).send({ success: false, error: 'Task not found' });
      return { success: true, data: { taskId, deleted: true } };
    } catch (error) { console.error('Delete task error:', error); return reply.status(500).send({ success: false, error: 'Failed to delete task' }); }
  });

  fastify.post("/api/tasks/:taskId/transition", async (request, reply) => {
    try {
      const { taskId } = request.params as { taskId: string };
      const { new_state } = request.body as any;
      if (!new_state) return reply.status(400).send({ success: false, error: 'new_state is required' });
      const { transitionTaskState } = await import('@iai/database');
      const task = await transitionTaskState(taskId, new_state);
      return { success: true, data: task };
    } catch (error) { console.error('Transition task error:', error); return reply.status(500).send({ success: false, error: 'Failed to transition task' }); }
  });

  fastify.get("/api/tasks/stats", async (request, reply) => {
    try {
      const { tenant_id, user_id, computer_id } = request.query as any;
      const err = requireFields({ tenant_id, user_id, computer_id }, ['tenant_id','user_id','computer_id']);
      if (err) return reply.status(400).send({ success: false, error: err });
      const { getTaskCountsByState } = await import('@iai/database');
      const stats = await getTaskCountsByState(tenant_id, user_id, computer_id);
      return { success: true, data: stats };
    } catch (error) { console.error('Get task stats error:', error); return reply.status(500).send({ success: false, error: 'Failed to get task stats' }); }
  });

  // Reminders
  fastify.get("/api/reminders", async (request, reply) => {
    try {
      const { tenant_id, user_id, computer_id } = request.query as any;
      const err = requireFields({ tenant_id, user_id, computer_id }, ['tenant_id','user_id','computer_id']);
      if (err) return reply.status(400).send({ success: false, error: err });
      const { getReminderRulesByUser } = await import('@iai/database');
      const rules = await getReminderRulesByUser(tenant_id, user_id, computer_id);
      return { success: true, data: rules };
    } catch (error) { console.error('List reminders error:', error); return reply.status(500).send({ success: false, error: 'Failed to list reminders' }); }
  });

  fastify.post("/api/reminders", async (request, reply) => {
    try {
      const body = request.body as any;
      const { tenant_id, user_id, computer_id, task_id, event_id, rule_type, schedule_expression, timezone, channels, priority } = body;
      const err = requireFields({ tenant_id, user_id, computer_id, rule_type }, ['tenant_id','user_id','computer_id','rule_type']);
      if (err) return reply.status(400).send({ success: false, error: err });
      if (!task_id && !event_id) {
        return reply.status(400).send({ success: false, error: 'Either task_id or event_id is required' });
      }
      const { createReminderRule } = await import('@iai/database');
      const rule = await createReminderRule({ tenant_id, user_id, computer_id, task_id, event_id, rule_type, schedule_expression, timezone, channels, priority, status: 'active' } as any);
      return { success: true, data: rule };
    } catch (error) { console.error('Create reminder error:', error); return reply.status(500).send({ success: false, error: 'Failed to create reminder' }); }
  });

  fastify.patch("/api/reminders/:reminderId", async (request, reply) => {
    try {
      const { reminderId } = request.params as { reminderId: string };
      const updates = request.body as any;
      const { id, created_at, tenant_id, user_id, computer_id, ...validUpdates } = updates;
      const { updateReminderRule } = await import('@iai/database');
      const rule = await updateReminderRule(reminderId, validUpdates);
      return { success: true, data: rule };
    } catch (error) { console.error('Update reminder error:', error); return reply.status(500).send({ success: false, error: 'Failed to update reminder' }); }
  });

  fastify.delete("/api/reminders/:reminderId", async (request, reply) => {
    try {
      const { reminderId } = request.params as { reminderId: string };
      const { deleteReminderRule } = await import('@iai/database');
      const deleted = await deleteReminderRule(reminderId);
      if (!deleted) return reply.status(404).send({ success: false, error: 'Reminder not found' });
      return { success: true, data: { reminderId, deleted: true } };
    } catch (error) { console.error('Delete reminder error:', error); return reply.status(500).send({ success: false, error: 'Failed to delete reminder' }); }
  });

  // Calendar Integrations (stubs - OAuth requires external setup)
  fastify.get("/api/calendar/connections", async (request, reply) => {
    return { success: true, data: { message: 'Calendar integration connections - OAuth setup required', connections: [] } };
  });

  fastify.post("/api/calendar/connections/google", async (request, reply) => {
    return { success: true, data: { message: 'Google Calendar OAuth - configure GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env', authUrl: null } };
  });

  fastify.post("/api/calendar/connections/microsoft", async (request, reply) => {
    return { success: true, data: { message: 'Microsoft Graph OAuth - configure MS_CLIENT_ID and MS_CLIENT_SECRET in .env', authUrl: null } };
  });

  fastify.delete("/api/calendar/connections/:connectionId", async (request, reply) => {
    return { success: true, data: { connectionId: (request.params as any).connectionId, deleted: true } };
  });

  fastify.post("/api/calendar/sync/:connectionId", async (request, reply) => {
    return { success: true, data: { connectionId: (request.params as any).connectionId, syncStatus: 'not_implemented' } };
  });

  // Work Queue
  fastify.get("/api/work-queue", async (request, reply) => {
    try {
      const { tenant_id, user_id, computer_id } = request.query as any;
      const err = requireFields({ tenant_id, user_id, computer_id }, ['tenant_id','user_id','computer_id']);
      if (err) return reply.status(400).send({ success: false, error: err });
      const { getSmartTasksByUser, getPendingApprovalCount } = await import('@iai/database');
      const [draft, ready, scheduled, in_progress, waiting_approval, blocked, completed] = await Promise.all([
        getSmartTasksByUser(tenant_id, user_id, computer_id, 'draft'),
        getSmartTasksByUser(tenant_id, user_id, computer_id, 'ready'),
        getSmartTasksByUser(tenant_id, user_id, computer_id, 'scheduled'),
        getSmartTasksByUser(tenant_id, user_id, computer_id, 'in_progress'),
        (async () => { const { getApprovalRequestsByUser } = await import('@iai/database'); return getApprovalRequestsByUser(tenant_id, user_id, computer_id, 'pending'); })(),
        getSmartTasksByUser(tenant_id, user_id, computer_id, 'failed'),
        getSmartTasksByUser(tenant_id, user_id, computer_id, 'completed')
      ]);
      return { success: true, data: { draft, ready, scheduled, in_progress, waiting_approval, blocked, completed } };
    } catch (error) { console.error('Get work queue error:', error); return reply.status(500).send({ success: false, error: 'Failed to get work queue' }); }
  });

  // Calendar Approvals
  fastify.get("/api/approvals", async (request, reply) => {
    try {
      const { tenant_id, user_id, computer_id, status } = request.query as any;
      const err = requireFields({ tenant_id, user_id, computer_id }, ['tenant_id','user_id','computer_id']);
      if (err) return reply.status(400).send({ success: false, error: err });
      const { getApprovalRequestsByUser } = await import('@iai/database');
      const approvals = await getApprovalRequestsByUser(tenant_id, user_id, computer_id, status);
      return { success: true, data: approvals };
    } catch (error) { console.error('List approvals error:', error); return reply.status(500).send({ success: false, error: 'Failed to list approvals' }); }
  });

  fastify.post("/api/approvals/:approvalId/approve", async (request, reply) => {
    try {
      const { approvalId } = request.params as { approvalId: string };
      const { approved_by, justification } = request.body as any;
      if (!approved_by) return reply.status(400).send({ success: false, error: 'approved_by is required' });
      const { approveRequest } = await import('@iai/database');
      const approval = await approveRequest(approvalId, approved_by, justification);
      return { success: true, data: approval };
    } catch (error) { console.error('Approve error:', error); return reply.status(500).send({ success: false, error: 'Failed to approve' }); }
  });

  fastify.post("/api/approvals/:approvalId/reject", async (request, reply) => {
    try {
      const { approvalId } = request.params as { approvalId: string };
      const { rejected_by, justification } = request.body as any;
      if (!rejected_by) return reply.status(400).send({ success: false, error: 'rejected_by is required' });
      const { rejectRequest } = await import('@iai/database');
      const approval = await rejectRequest(approvalId, rejected_by, justification);
      return { success: true, data: approval };
    } catch (error) { console.error('Reject error:', error); return reply.status(500).send({ success: false, error: 'Failed to reject' }); }
  });

  // Reports
  fastify.get("/api/reports/daily", async (request, reply) => {
    try {
      const { tenant_id, user_id, computer_id, date } = request.query as any;
      const err = requireFields({ tenant_id, user_id, computer_id }, ['tenant_id','user_id','computer_id']);
      if (err) return reply.status(400).send({ success: false, error: err });
      const targetDate = date ? new Date(date as string) : new Date();
      const { getSmartTasksByUser, getPendingApprovalCount } = await import('@iai/database');
      const [completed, blocked, pending] = await Promise.all([
        getSmartTasksByUser(tenant_id, user_id, computer_id, 'completed'),
        getSmartTasksByUser(tenant_id, user_id, computer_id, 'failed'),
        getPendingApprovalCount(tenant_id, user_id, computer_id)
      ]);
      return { success: true, data: { date: targetDate.toISOString().split('T')[0], completedItems: completed.length, blockedItems: blocked.length, pendingApprovals: pending, nextActions: [] } };
    } catch (error) { console.error('Daily report error:', error); return reply.status(500).send({ success: false, error: 'Failed to generate daily report' }); }
  });

  fastify.get("/api/reports/weekly", async (request, reply) => {
    try {
      const { tenant_id, user_id, computer_id } = request.query as any;
      const err = requireFields({ tenant_id, user_id, computer_id }, ['tenant_id','user_id','computer_id']);
      if (err) return reply.status(400).send({ success: false, error: err });
      const { getSmartTasksByUser, getPendingApprovalCount } = await import('@iai/database');
      const [completed, blocked, pending] = await Promise.all([
        getSmartTasksByUser(tenant_id, user_id, computer_id, 'completed'),
        getSmartTasksByUser(tenant_id, user_id, computer_id, 'failed'),
        getPendingApprovalCount(tenant_id, user_id, computer_id)
      ]);
      return { success: true, data: { weekStart: new Date().toISOString(), completedItems: completed.length, blockedItems: blocked.length, pendingApprovals: pending, nextActions: [] } };
    } catch (error) { console.error('Weekly report error:', error); return reply.status(500).send({ success: false, error: 'Failed to generate weekly report' }); }
  });

  fastify.post("/api/reports/export", async (request, reply) => {
    return { success: true, data: { message: 'Report export - not yet implemented', downloadUrl: null } };
  });

  // Commands
  fastify.post("/api/commands/schedule", async (request, reply) => {
    return { success: true, data: { message: 'Natural language scheduling - not yet implemented', parsedIntent: null, confidence: 0 } };
  });

  fastify.post("/api/commands/briefing", async (request, reply) => {
    try {
      const { tenant_id, user_id, computer_id } = request.body as any;
      const err = requireFields({ tenant_id, user_id, computer_id }, ['tenant_id','user_id','computer_id']);
      if (err) return reply.status(400).send({ success: false, error: err });
      const { getUpcomingEvents, getSmartTasksByUser } = await import('@iai/database');
      const [events, tasks] = await Promise.all([
        getUpcomingEvents(tenant_id, user_id, computer_id, 24),
        getSmartTasksByUser(tenant_id, user_id, computer_id)
      ]);
      return { success: true, data: { briefing: `You have ${events.length} upcoming events and ${tasks.length} tasks today.`, priorities: tasks.filter((t: any) => t.priority === 'high' || t.priority === 'urgent'), deadlines: events } };
    } catch (error) { console.error('Briefing error:', error); return reply.status(500).send({ success: false, error: 'Failed to generate briefing' }); }
  });

  fastify.post("/api/commands/follow-up", async (request, reply) => {
    return { success: true, data: { message: 'Follow-up generation - not yet implemented', followUps: [], draftEmail: null } };
  });
}
