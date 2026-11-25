import { NextRequest, NextResponse } from "next/server";
import { isCareState } from "@/lib/care-demo";
import { scenarioState } from "./scenario-state";

const MEMBER_ID = "demo-member-001";
const headers = { "Cache-Control": "no-store" };

export async function careState(request: NextRequest, report: boolean) {
  if (process.env.CARE_DEMO_MOCK === "1") {
    return scenarioState(request, report ? "report" : undefined);
  }

  try {
    const webhook = report ? process.env.N8N_REPORT_MISSING_KIT_URL : process.env.N8N_CARE_STATUS_URL;
    if (!webhook) throw new Error("Missing care demo webhook configuration");

    const url = new URL(webhook);
    if (!report) url.searchParams.set("memberId", MEMBER_ID);

    const clientId = process.env.CF_ACCESS_CLIENT_ID;
    const clientSecret = process.env.CF_ACCESS_CLIENT_SECRET;
    const webhookHeaders = new Headers();
    if (clientId || clientSecret) {
      if (!clientId || !clientSecret || url.protocol !== "https:") {
        throw new Error("Cloudflare Access requires both credentials and an HTTPS webhook");
      }
      webhookHeaders.set("CF-Access-Client-Id", clientId);
      webhookHeaders.set("CF-Access-Client-Secret", clientSecret);
    }
    if (report) webhookHeaders.set("Content-Type", "application/json");

    const response = await fetch(url, {
      method: report ? "POST" : "GET",
      headers: webhookHeaders,
      body: report ? JSON.stringify({}) : undefined,
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(8000),
    });
    if (response.status !== 200) throw new Error("Care demo webhook failed");
    const state: unknown = await response.json();
    if (!isCareState(state) || (report && state.kitStatus === "delivered")) {
      throw new Error("Unexpected care demo webhook response");
    }

    return NextResponse.json({
      kitStatus: state.kitStatus,
      firstVisitStatus: state.firstVisitStatus,
      request: state.request,
      visitSlot: state.visitSlot,
    }, { headers });
  } catch {
    return NextResponse.json({ error: "Care demo service unavailable" }, { status: 503, headers });
  }
}
