import type { NextRequest } from "next/server";
import { careState } from "../state";

export function GET(request: NextRequest) {
  return careState(request, false);
}
