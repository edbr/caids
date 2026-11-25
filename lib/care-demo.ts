export type CareState = {
  kitStatus: "delivered" | "help_requested";
  firstVisitStatus: "ready_to_book";
};

export function isCareState(value: unknown): value is CareState {
  if (!value || typeof value !== "object") return false;
  const state = value as Partial<CareState>;
  return (state.kitStatus === "delivered" || state.kitStatus === "help_requested")
    && state.firstVisitStatus === "ready_to_book";
}
