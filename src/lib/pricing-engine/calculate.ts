import {
  baselineProperty,
  cleaningTypeInfo,
  extraTaskLabels,
  extraTaskRates,
  PRICING_VERSION,
  priceWindows,
  propertyRates,
  spaceLabels,
  zones,
} from "./config";
import { extraTaskTypes, spaceTypes, type BookingConfig, type PriceLine, type QuoteBreakdown } from "./types";

/**
 * The one place the price is actually computed. Pure and synchronous, so it
 * can run instantly on the client for live feedback, and again on the server
 * (from the same raw config) as the authoritative recalculation that is
 * never overridden by whatever the client displayed.
 *
 * Formula: base + property adjustments + extra tasks + location fee − discount + tax.
 * Discounts and tax are 0 until a promotions/tax system is defined.
 */
export function calculateQuote(config: BookingConfig): QuoteBreakdown {
  const { cleaningType, property, extras } = config;
  const base = cleaningTypeInfo[cleaningType].basePrice;

  const propertyLines: PriceLine[] = [];
  for (const space of spaceTypes) {
    const count = Math.max(0, Math.trunc(property[space] ?? 0));
    const included = baselineProperty[space] ?? 0;
    const billable = Math.max(0, count - included);
    if (billable <= 0) continue;
    const rate = propertyRates[space][cleaningType];
    propertyLines.push({ label: `${spaceLabels[space]} × ${billable} extra`, amount: billable * rate });
  }
  const propertySubtotal = propertyLines.reduce((sum, l) => sum + l.amount, 0);

  const extraLines: PriceLine[] = [];
  for (const task of extraTaskTypes) {
    const count = Math.max(0, Math.trunc(extras[task] ?? 0));
    if (count <= 0) continue;
    const amount = task === "windows" ? priceWindows(count) : count * extraTaskRates[task];
    const unit = task === "windows" ? "" : ` × ${count}`;
    extraLines.push({ label: `${extraTaskLabels[task]}${unit}`, amount });
  }
  const extraSubtotal = extraLines.reduce((sum, l) => sum + l.amount, 0);

  const zone = config.zoneId ? zones.find((z) => z.id === config.zoneId) : undefined;
  const locationFee = zone?.fee ?? 0;

  const discount = 0;
  const tax = 0;
  const total = base + propertySubtotal + extraSubtotal + locationFee - discount + tax;

  return {
    pricingVersion: PRICING_VERSION,
    cleaningType,
    base,
    propertyLines,
    propertySubtotal,
    extraLines,
    extraSubtotal,
    locationFee,
    zoneId: zone?.id,
    zoneName: zone?.name,
    discount,
    tax,
    total,
  };
}
