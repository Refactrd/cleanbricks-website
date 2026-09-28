import { cleaningTypeInfo } from "./config";
import type { QuoteBreakdown } from "./types";

export const naira = (n: number) => `₦${Math.round(n).toLocaleString("en-NG")}`;

/** Plain-text breakdown, embedded into the booking enquiry email / Sheet row / WhatsApp message. */
export function formatQuoteText(q: QuoteBreakdown, addressLabel?: string): string {
  const lines = [
    `${cleaningTypeInfo[q.cleaningType].name} — estimated total ${naira(q.total)}`,
    `Base (1 bedroom, 1 bathroom, 1 living room, 1 kitchen): ${naira(q.base)}`,
    ...q.propertyLines.map((l) => `+ ${l.label}: ${naira(l.amount)}`),
    ...q.extraLines.map((l) => `+ ${l.label}: ${naira(l.amount)}`),
  ];
  if (q.zoneName) lines.push(`+ Location fee (${q.zoneName}${addressLabel ? `, ${addressLabel}` : ""}): ${naira(q.locationFee)}`);
  lines.push(`Pricing version: ${q.pricingVersion}`);
  return lines.join("\n");
}
