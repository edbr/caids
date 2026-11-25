import { NextRequest, NextResponse } from "next/server";
import { isCareState, type CareState } from "@/lib/care-demo";

const MEMBER_ID = "demo-member-001";
const MOCK_COOKIE = "care-demo-missing-kit";
const headers = { "Cache-Control": "no-store" };

export async function careState(request: NextRequest, report: boolean) {
  if (process.env.CARE_DEMO_MOCK === "1") {
    const state: CareState = {
      kitStatus: report || request.cookies.get(MOCK_COOKIE)?.value === "1" ? "help_requested" : "delivered",
      firstVisitStatus: "ready_to_book",
    };
    const response = NextResponse.json(state, { headers });
    if (report) {
      response.cookies.set(MOCK_COOKIE, "1", { httpOnly: true, sameSite: "lax", path: "/" });
    }
    return response;
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
    if (!isCareState(state) || (report && state.kitStatus !== "help_requested")) {
      throw new Error("Unexpected care demo webhook response");
    }

    return NextResponse.json({
      kitStatus: state.kitStatus,
      firstVisitStatus: state.firstVisitStatus,
    }, { headers });
  } catch {
    return NextResponse.json({ error: "Care demo service unavailable" }, { status: 503, headers });
  }
}
