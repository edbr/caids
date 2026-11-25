export const kitLabels = {
  delivered: "Delivered",
  help_requested: "Help requested",
  replacement_shipped: "Replacement on the way",
  replacement_received: "Replacement received",
};

export const reviewLabels = {
  open: "Awaiting review",
  in_review: "In review",
  replacement_shipped: "Replacement sent",
  replacement_received: "Resolved",
};

export type ReviewStatus = keyof typeof reviewLabels;

export const visitSlots = {
  tuesday: "Tuesday at 10:00 a.m.",
  thursday: "Thursday at 2:30 p.m.",
};

export type VisitSlot = keyof typeof visitSlots;

export function isVisitSlot(value: unknown): value is VisitSlot {
  return typeof value === "string" && Object.hasOwn(visitSlots, value);
}

export type CareState = {
  kitStatus: keyof typeof kitLabels;
  firstVisitStatus: "ready_to_book" | "booked" | "confirmed";
  visitSlot?: VisitSlot;
  request?: {
    reference: string;
    receivedAt: string;
    reviewStatus: ReviewStatus;
    reviewedAt?: string;
    shippedAt?: string;
    resolvedAt?: string;
  };
};

export function isCareState(value: unknown): value is CareState {
  if (!value || typeof value !== "object") return false;
  const state = value as CareState;
  if (!Object.hasOwn(kitLabels, state.kitStatus)) return false;
  if (state.firstVisitStatus === "ready_to_book") {
    if (state.visitSlot !== undefined) return false;
  } else if (!["booked", "confirmed"].includes(state.firstVisitStatus) || !isVisitSlot(state.visitSlot)) {
    return false;
  }
  if (state.request === undefined) return true;
  const request = state.request;
  return !!request && typeof request.reference === "string"
    && Object.hasOwn(reviewLabels, request.reviewStatus)
    && [request.receivedAt, request.reviewedAt, request.shippedAt, request.resolvedAt]
      .every(time => time === undefined || (typeof time === "string" && Number.isFinite(Date.parse(time))))
    && typeof request.receivedAt === "string";
}

export const scenarioTransitions = {
  open: { label: "Start review", next: "in_review", timestamp: "reviewedAt" },
  in_review: { label: "Mark replacement sent", next: "replacement_shipped", timestamp: "shippedAt" },
  replacement_shipped: { label: "Confirm replacement received", next: "replacement_received", timestamp: "resolvedAt" },
} as const;
