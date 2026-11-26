import validateCareDemoState from "./care-demo-validator.cjs";

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
  request?: {
    reference: string;
    receivedAt: string;
    reviewStatus: ReviewStatus;
    reviewedAt?: string;
    shippedAt?: string;
    resolvedAt?: string;
  };
} & (
  | { firstVisitStatus: "ready_to_book"; visitSlot?: never }
  | { firstVisitStatus: "booked" | "confirmed"; visitSlot: VisitSlot }
);

export function isCareState(value: unknown): value is CareState {
  return validateCareDemoState(value);
}

export const scenarioTransitions = {
  open: { label: "Start review", next: "in_review", timestamp: "reviewedAt" },
  in_review: { label: "Mark replacement sent", next: "replacement_shipped", timestamp: "shippedAt" },
  replacement_shipped: { label: "Confirm replacement received", next: "replacement_received", timestamp: "resolvedAt" },
} as const;
