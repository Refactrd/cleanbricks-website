import { lgaToZoneFallback, unservicedKeywords, zones } from "./config";
import type { ZoneResolution } from "./types";

/** Minimal shape we need from a Google Places "address component". */
export type AddressComponent = { longText?: string; shortText?: string; types?: string[] };

function haystackFrom(components: AddressComponent[], formattedAddress: string): string {
  const parts = components.flatMap((c) => [c.longText, c.shortText]).filter(Boolean) as string[];
  return [...parts, formattedAddress].join(" | ").toLowerCase();
}

function looksLikeLagos(haystack: string): boolean {
  return haystack.includes("lagos");
}

/**
 * Resolve a CleanBricks pricing zone from a geocoded address. Keyword
 * matching against locality/sublocality names and the formatted address —
 * not a geofence, so treat "unresolved" as "we don't recognise this area
 * yet", distinct from "outside-lagos" (clearly a different state/country).
 */
export function resolveZoneFromAddress(components: AddressComponent[], formattedAddress: string): ZoneResolution {
  const haystack = haystackFrom(components, formattedAddress);

  if (unservicedKeywords.some((k) => haystack.includes(k))) {
    return { available: false, reason: "unserviced-area" };
  }

  for (const zone of zones) {
    if (zone.areaKeywords.some((k) => haystack.includes(k))) {
      return { available: true, zone };
    }
  }

  if (!looksLikeLagos(haystack)) {
    return { available: false, reason: "outside-lagos" };
  }

  return { available: false, reason: "unresolved" };
}

/**
 * Fallback zone lookup by Lagos LGA, used when address autocomplete isn't
 * configured. See config.ts `lgaToZoneFallback` for the caveats.
 */
export function resolveZoneFromLga(lga: string): ZoneResolution {
  const entry = lgaToZoneFallback[lga];
  if (!entry) return { available: false, reason: "unresolved" };
  if (entry.unavailable) return { available: false, reason: "unserviced-area" };
  const zone = zones.find((z) => z.id === entry.zoneId);
  return zone ? { available: true, zone } : { available: false, reason: "unresolved" };
}
