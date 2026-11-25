import { NextRequest, NextResponse } from "next/server";
import { isCareState, scenarioTransitions, type CareState, type VisitSlot } from "@/lib/care-demo";

const COOKIE = "care-demo-scenario";
const headers = { "Cache-Control": "no-store" };
const initial: CareState = { kitStatus: "delivered", firstVisitStatus: "ready_to_book" };

export function scenarioState(request: NextRequest, action?: string, slot?: VisitSlot) {
  let state = initial;
  try {
    const saved: unknown = JSON.parse(request.cookies.get(COOKIE)?.value ?? "null");
    if (isCareState(saved)) state = saved;
  } catch {
    // A stale or malformed cookie starts a fresh scenario.
  }

  const requestState = state.request;
  const now = new Date().toISOString();
  if (action === "report" && !requestState) {
    state = {
      ...state,
      kitStatus: "help_requested",
      request: { reference: `KIT-${crypto.randomUUID().slice(0, 8).toUpperCase()}`, receivedAt: now, reviewStatus: "open" },
    };
  } else if (action === "reset") {
    state = initial;
  } else if (action === "book" && slot) {
    if (state.firstVisitStatus === "ready_to_book") {
      state = { ...state, firstVisitStatus: "booked", visitSlot: slot };
    } else if (state.visitSlot !== slot) {
      return NextResponse.json({ error: "A demo visit is already booked" }, { status: 409, headers });
    }
  } else if (action === "confirm_visit" && state.visitSlot) {
    state = { ...state, firstVisitStatus: "confirmed" };
  } else if (action && action !== "report") {
    const transition = requestState && requestState.reviewStatus !== "replacement_received"
      ? scenarioTransitions[requestState.reviewStatus] : undefined;
    if (!requestState || transition?.next !== action) {
      return NextResponse.json({ error: "Scenario already changed" }, { status: 409, headers });
    }
    state = {
      ...state,
      kitStatus: transition.next === "in_review" ? "help_requested" : transition.next,
      request: { ...requestState, reviewStatus: transition.next, [transition.timestamp]: now },
    };
  }

  const response = NextResponse.json(state, { headers });
  if (action === "reset") response.cookies.delete(COOKIE);
  else if (action) response.cookies.set(COOKIE, JSON.stringify(state), { httpOnly: true, sameSite: "lax", path: "/" });
  return response;
}
