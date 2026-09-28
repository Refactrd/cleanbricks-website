import type { NextRequest } from "next/server";
import { calculateQuote } from "@/lib/pricing-engine/calculate";
import { parseBookingConfig } from "@/lib/pricing-engine/parse";

/**
 * Authoritative price endpoint. Takes the customer's raw configuration and
 * recomputes the total from src/lib/pricing-engine, ignoring any price the
 * client may already be displaying. This is the number that should be
 * trusted when a booking is actually recorded (see src/app/actions.ts,
 * which re-parses the same way at submission time).
 */
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const config = parseBookingConfig(body);
  if (!config) return Response.json({ error: "invalid_config" }, { status: 400 });

  return Response.json({ quote: calculateQuote(config) });
}
