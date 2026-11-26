import { NextRequest, NextResponse } from "next/server";
import { isVisitSlot } from "@/lib/care-demo";
import { careState } from "../state";
import { scenarioState } from "../scenario-state";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null) as { action?: unknown; slot?: unknown } | null;
  const action = body?.action;
  const mock = process.env.CARE_DEMO_MOCK === "1";
  if (action === "book" && isVisitSlot(body?.slot)) {
    return mock ? scenarioState(request, action, body.slot) : careState(request, false, { action, slot: body.slot });
  }
  if (typeof action !== "string" || !["in_review", "replacement_shipped", "replacement_received", "reset", "confirm_visit"].includes(action)) {
    return NextResponse.json({ error: "Invalid scenario action" }, { status: 400 });
  }
  return mock ? scenarioState(request, action) : careState(request, false, { action });
}
