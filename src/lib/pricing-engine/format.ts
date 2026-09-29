import { cleaningTypeInfo, extraTaskLabels, spaceLabels } from "./config";
import { extraTaskTypes, spaceTypes, type ExtraTasksConfig, type PropertyConfig, type QuoteBreakdown } from "./types";

export const naira = (n: number) => `₦${Math.round(n).toLocaleString("en-NG")}`;

/** e.g. "3 Bedrooms, 1 Bathroom, 1 Living room" — every space with a non-zero count. */
export function summariseProperty(property: PropertyConfig): string {
  return spaceTypes
    .filter((s) => property[s] > 0)
    .map((s) => `${property[s]} ${spaceLabels[s]}${property[s] > 1 ? "s" : ""}`)
    .join(", ");
}

/** e.g. "Windows, Oven (interior) × 2" — every extra task with a non-zero count. */
export function summariseExtras(extras: ExtraTasksConfig): string {
  return extraTaskTypes
    .filter((t) => extras[t] > 0)
    .map((t) => `${extraTaskLabels[t]}${t === "windows" ? "" : ` × ${extras[t]}`}`)
    .join(", ");
}

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
