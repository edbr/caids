import { NextRequest, NextResponse } from "next/server";
import { isVisitSlot } from "@/lib/care-demo";
import { scenarioState } from "../scenario-state";

export async function POST(request: NextRequest) {
  if (process.env.CARE_DEMO_MOCK !== "1") {
    return NextResponse.json({ error: "Scenario controls are unavailable" }, { status: 404 });
  }
  const body = await request.json().catch(() => null) as { action?: unknown; slot?: unknown } | null;
  const action = body?.action;
  if (action === "book" && isVisitSlot(body?.slot)) {
    return scenarioState(request, action, body.slot);
  }
  if (typeof action !== "string" || !["in_review", "replacement_shipped", "replacement_received", "reset", "confirm_visit"].includes(action)) {
    return NextResponse.json({ error: "Invalid scenario action" }, { status: 400 });
  }
  return scenarioState(request, action);
}
