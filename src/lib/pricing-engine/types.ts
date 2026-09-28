/**
 * Shared types for the dynamic pricing engine. This module has no "use client"
 * / "use server" boundary of its own — it is imported by both the client
 * (instant preview) and the server (authoritative recalculation), so it must
 * stay pure data with no side effects.
 */

export const cleaningTypes = ["light", "standard", "deep"] as const;
export type CleaningType = (typeof cleaningTypes)[number];

/** Room/space types priced individually. Bedroom, bathroom, livingRoom and kitchen have a baseline of 1 included in the base price. */
export const spaceTypes = [
  "bedroom",
  "bathroom",
  "guestToilet",
  "livingRoom",
  "kitchen",
  "office",
  "study",
  "laundryRoom",
  "store",
] as const;
export type SpaceType = (typeof spaceTypes)[number];

export type PropertyConfig = Record<SpaceType, number>;

/** Extra tasks that can be added on top of any cleaning type. */
export const extraTaskTypes = [
  "balcony",
  "windows",
  "fridge",
  "fan",
  "oven",
  "kitchenCabinets",
  "walls",
  "compound",
] as const;
export type ExtraTaskType = (typeof extraTaskTypes)[number];

export type ExtraTasksConfig = Record<ExtraTaskType, number>;

export const zoneIds = ["zone-1", "zone-2", "zone-3", "zone-4", "zone-5", "zone-6"] as const;
export type ZoneId = (typeof zoneIds)[number];

export type Zone = {
  id: ZoneId;
  name: string;
  fee: number;
  /** Illustrative places in this zone, for display only — matching is done on `areaKeywords`. */
  examples: string[];
  /** Lowercase keywords matched against resolved address components / formatted address. */
  areaKeywords: string[];
};

/** Address resolved from a maps provider (or the manual LGA fallback). */
export type ResolvedAddress = {
  formattedAddress: string;
  placeId?: string;
  lat?: number;
  lng?: number;
  state?: string;
  city?: string;
  locality?: string;
  street?: string;
  postalCode?: string;
};

/** A single Google Places Autocomplete suggestion, trimmed to what the UI needs. */
export type PlaceSuggestion = { placeId: string; mainText: string; secondaryText: string };

export type ZoneResolution =
  | { available: true; zone: Zone }
  | { available: false; reason: "outside-lagos" | "unserviced-area" | "unresolved" };

/** The raw configuration a customer assembles while booking. Serialisable, so it can travel client → server unchanged. */
export type BookingConfig = {
  cleaningType: CleaningType;
  property: PropertyConfig;
  extras: ExtraTasksConfig;
  /** Present once an address has been chosen and its zone resolved. */
  zoneId?: ZoneId;
  /** True once we've established the zone lookup came back "not serviced" rather than merely "not yet chosen". */
  addressUnavailable?: boolean;
};

export type PriceLine = { label: string; amount: number };

export type QuoteBreakdown = {
  pricingVersion: string;
  cleaningType: CleaningType;
  base: number;
  propertyLines: PriceLine[];
  propertySubtotal: number;
  extraLines: PriceLine[];
  extraSubtotal: number;
  locationFee: number;
  zoneId?: ZoneId;
  zoneName?: string;
  discount: number;
  tax: number;
  total: number;
};

export const emptyProperty: PropertyConfig = {
  bedroom: 1,
  bathroom: 1,
  guestToilet: 0,
  livingRoom: 1,
  kitchen: 1,
  office: 0,
  study: 0,
  laundryRoom: 0,
  store: 0,
};

export const emptyExtras: ExtraTasksConfig = {
  balcony: 0,
  windows: 0,
  fridge: 0,
  fan: 0,
  oven: 0,
  kitchenCabinets: 0,
  walls: 0,
  compound: 0,
};
