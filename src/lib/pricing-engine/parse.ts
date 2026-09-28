import { zones } from "./config";
import {
  cleaningTypes,
  emptyExtras,
  emptyProperty,
  extraTaskTypes,
  spaceTypes,
  type BookingConfig,
} from "./types";

const MAX_UNITS = 50;

/** Clamp to a non-negative integer, capped, so a bad request can't produce an absurd price. */
export function clampCount(value: unknown): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.min(MAX_UNITS, Math.trunc(n));
}

/**
 * Turns an untrusted, JSON-decoded value into a valid BookingConfig, or null
 * if it can't be made into one. Used by both the pricing API route (the
 * live preview's authoritative check) and the booking form submission (the
 * final authoritative recalculation) — one parser, one set of rules.
 */
export function parseBookingConfig(raw: unknown): BookingConfig | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;

  const cleaningType = cleaningTypes.includes(r.cleaningType as never) ? (r.cleaningType as BookingConfig["cleaningType"]) : null;
  if (!cleaningType) return null;

  const property = { ...emptyProperty };
  const rawProperty = (r.property ?? {}) as Record<string, unknown>;
  for (const space of spaceTypes) property[space] = clampCount(rawProperty[space] ?? emptyProperty[space]);

  const extras = { ...emptyExtras };
  const rawExtras = (r.extras ?? {}) as Record<string, unknown>;
  for (const task of extraTaskTypes) extras[task] = clampCount(rawExtras[task]);

  const zoneId = zones.some((z) => z.id === r.zoneId) ? (r.zoneId as BookingConfig["zoneId"]) : undefined;
  const addressUnavailable = r.addressUnavailable === true;

  return { cleaningType, property, extras, zoneId, addressUnavailable };
}
