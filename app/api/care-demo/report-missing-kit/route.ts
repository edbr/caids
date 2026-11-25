import type { NextRequest } from "next/server";
import { careState } from "../state";

export function POST(request: NextRequest) {
  return careState(request, true);
}
