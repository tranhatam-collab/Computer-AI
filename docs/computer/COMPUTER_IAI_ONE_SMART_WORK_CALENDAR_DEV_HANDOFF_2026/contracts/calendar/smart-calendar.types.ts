export type CalendarProvider =
  | "computer_native"
  | "google_calendar"
  | "microsoft_graph"
  | "caldav"
  | "ics"
  | "notion"
  | "slack"
  | "linear"
  | "github"
  | "jira"
  | "todoist";

export type SyncDirection = "inbound" | "outbound" | "two_way" | "read_only" | "native_only";

export type CalendarProviderConnection = {
  id: string;
  tenantId: string;
  userId: string;
  computerId: string;
  provider: CalendarProvider;
  connectionType: "oauth" | "caldav_credentials" | "api_token" | "ics_feed" | "native";
  status: "connected" | "expired" | "requires_reauth" | "revoked" | "error";
  scopes: string[];
  syncDirection: SyncDirection;
  lastSyncAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type CalendarEvent = {
  id: string;
  tenantId: string;
  userId: string;
  computerId: string;
  provider: CalendarProvider;
  externalId?: string;
  title: string;
  description?: string;
  startAt: string;
  endAt: string;
  timezone: string;
  allDay: boolean;
  location?: string;
  attendees?: string[];
  recurrenceRule?: string;
  visibility: "default" | "private" | "confidential" | "free_busy_only";
  status: "confirmed" | "tentative" | "cancelled";
  sourceVersion?: string;
  createdAt: string;
  updatedAt: string;
};

export type SmartTask = {
  id: string;
  tenantId: string;
  userId: string;
  computerId: string;
  title: string;
  description?: string;
  priority: "low" | "normal" | "high" | "urgent";
  status: "captured" | "clarified" | "planned" | "scheduled" | "ready" | "running" | "waiting_for_user" | "waiting_for_approval" | "blocked" | "completed" | "reported" | "archived" | "cancelled";
  dueAt?: string;
  scheduledStartAt?: string;
  scheduledEndAt?: string;
  sourceProvider?: CalendarProvider;
  sourceRef?: string;
  approvalRequired: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ReminderRule = {
  id: string;
  tenantId: string;
  userId: string;
  computerId: string;
  taskId?: string;
  eventId?: string;
  ruleType: "absolute_time" | "relative_before_due" | "recurring" | "conditional" | "dependency_based" | "calendar_gap_based" | "email_triggered" | "workspace_triggered" | "approval_deadline";
  scheduleExpression?: string;
  conditionExpression?: string;
  timezone: string;
  channels: string[];
  priority: "low" | "normal" | "high" | "urgent";
  status: "active" | "paused" | "completed" | "cancelled";
};
