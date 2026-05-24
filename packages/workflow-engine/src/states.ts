/**
 * Run state machine — defines all states and valid transitions for a run.
 *
 * Every user command creates a Run that progresses through these states.
 */

export type RunState =
  | "created"
  | "queued"
  | "routing"
  | "running"
  | "verifying"
  | "completed"
  | "failed"
  | "rejected"
  | "expired";

export type RunEvent =
  | "queue"
  | "route"
  | "start"
  | "complete"
  | "verify-pass"
  | "verify-fail"
  | "reject"
  | "fail"
  | "expire"
  | "retry";

export type RunPhase = "creation" | "execution" | "verification" | "terminal";

const stateMachine: Record<RunState, { allowedEvents: RunEvent[]; nextState: Partial<Record<RunEvent, RunState>>; phase: RunPhase }> = {
  created: {
    allowedEvents: ["queue", "fail", "expire"],
    nextState: { queue: "queued", fail: "failed", expire: "expired" },
    phase: "creation",
  },
  queued: {
    allowedEvents: ["route", "fail", "expire"],
    nextState: { route: "routing", fail: "failed", expire: "expired" },
    phase: "execution",
  },
  routing: {
    allowedEvents: ["start", "fail"],
    nextState: { start: "running", fail: "failed" },
    phase: "execution",
  },
  running: {
    allowedEvents: ["complete", "fail"],
    nextState: { complete: "verifying", fail: "failed" },
    phase: "execution",
  },
  verifying: {
    allowedEvents: ["verify-pass", "verify-fail", "reject"],
    nextState: { "verify-pass": "completed", "verify-fail": "running", reject: "rejected" },
    phase: "verification",
  },
  completed: {
    allowedEvents: ["retry", "expire"],
    nextState: { retry: "queued", expire: "expired" },
    phase: "terminal",
  },
  failed: {
    allowedEvents: ["retry"],
    nextState: { retry: "queued" },
    phase: "terminal",
  },
  rejected: {
    allowedEvents: [],
    nextState: {},
    phase: "terminal",
  },
  expired: {
    allowedEvents: [],
    nextState: {},
    phase: "terminal",
  },
};

export function getStateMachine(state: RunState): { allowedEvents: RunEvent[]; phase: RunPhase } {
  return {
    allowedEvents: stateMachine[state].allowedEvents,
    phase: stateMachine[state].phase,
  };
}

export function transition(current: RunState, event: RunEvent): RunState {
  const sm = stateMachine[current];
  if (!sm) throw new Error(`Unknown state: ${current}`);
  if (!sm.allowedEvents.includes(event)) {
    throw new Error(`Transition not allowed: ${current} → ${event}`);
  }
  const next = sm.nextState[event];
  if (!next) throw new Error(`No transition defined: ${current} → ${event}`);
  return next;
}

export function canTransition(current: RunState, event: RunEvent): boolean {
  const sm = stateMachine[current];
  return sm?.allowedEvents.includes(event) ?? false;
}

export function isTerminal(state: RunState): boolean {
  return stateMachine[state]?.phase === "terminal";
}
