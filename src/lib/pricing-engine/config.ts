import type { CleaningType, ExtraTaskType, SpaceType, Zone } from "./types";

/**
 * Single source of truth for every number the pricing engine uses.
 *
 * Bump PRICING_VERSION whenever a rate changes. Each quote records the
 * version that produced it, so historical bookings keep the price that was
 * actually agreed even after this file changes later.
 *
 * Source: client-supplied pricing specification (2026-09-28).
 */
export const PRICING_VERSION = "cb-pricing-2026.09.28";

export const cleaningTypeInfo: Record<CleaningType, { name: string; basePrice: number; tagline: string }> = {
  light: {
    name: "Light Cleaning",
    basePrice: 10_000,
    tagline: "A quick refresh for a space that's already reasonably maintained.",
  },
  standard: {
    name: "Standard Cleaning",
    basePrice: 15_000,
    tagline: "A complete routine clean for a fresh, comfortable home. Our most popular service.",
  },
  deep: {
    name: "Deep Cleaning",
    basePrice: 20_000,
    tagline: "A detailed clean that restores a space that needs more than routine maintenance.",
  },
};

/** Included in the base price of every cleaning type: 1 bedroom, 1 bathroom, 1 living room, 1 kitchen. */
export const baselineProperty: Partial<Record<SpaceType, number>> = {
  bedroom: 1,
  bathroom: 1,
  livingRoom: 1,
  kitchen: 1,
};

export const spaceLabels: Record<SpaceType, string> = {
  bedroom: "Bedroom",
  bathroom: "Bathroom",
  guestToilet: "Guest toilet",
  livingRoom: "Living room",
  kitchen: "Kitchen",
  office: "Office space",
  study: "Study",
  laundryRoom: "Laundry room",
  store: "Store",
};

/** Per additional unit, beyond the baseline included in the base price. */
export const propertyRates: Record<SpaceType, Record<CleaningType, number>> = {
  bedroom: { light: 3_000, standard: 3_500, deep: 4_000 },
  bathroom: { light: 2_000, standard: 2_500, deep: 3_000 },
  guestToilet: { light: 1_000, standard: 1_500, deep: 2_000 },
  livingRoom: { light: 1_500, standard: 2_000, deep: 2_500 },
  kitchen: { light: 2_000, standard: 2_500, deep: 3_000 },
  // Kept separate and easy to find: office pricing is expected to be refined later.
  office: { light: 2_500, standard: 3_000, deep: 3_500 },
  study: { light: 1_500, standard: 2_000, deep: 2_500 },
  laundryRoom: { light: 1_000, standard: 1_500, deep: 2_000 },
  store: { light: 500, standard: 750, deep: 1_000 },
};

export const extraTaskLabels: Record<ExtraTaskType, string> = {
  balcony: "Balcony",
  windows: "Windows",
  fridge: "Fridge (interior)",
  fan: "Fan",
  oven: "Oven (interior)",
  kitchenCabinets: "Kitchen cabinets (interior)",
  walls: "Wall washing",
  compound: "Compound cleaning",
};

/** Flat per-unit rates. Not affected by cleaning type. Windows use a tiered formula instead — see priceWindows(). */
export const extraTaskRates: Record<Exclude<ExtraTaskType, "windows">, number> = {
  balcony: 2_000,
  fridge: 5_000,
  fan: 1_000,
  oven: 5_000,
  kitchenCabinets: 4_000,
  walls: 3_000,
  compound: 5_000,
};

/**
 * Windows: ₦5,000 covers the first 5 windows. Every additional block of up to
 * 5 windows costs a further ₦3,000.
 */
export function priceWindows(count: number): number {
  if (count <= 0) return 0;
  if (count <= 5) return 5_000;
  return 5_000 + 3_000 * Math.ceil((count - 5) / 5);
}

/**
 * CleanBricks operational pricing zones (V1). These are CleanBricks's own
 * pricing classifications, not official Lagos administrative boundaries, and
 * are expected to be refined as coverage grows.
 */
export const zones: Zone[] = [
  {
    id: "zone-1",
    name: "Central Island",
    fee: 2_000,
    examples: [
      "Victoria Island",
      "Victoria Island Annex",
      "Ikoyi",
      "Obalende",
      "Oniru",
      "Lagos Island",
      "Marina",
      "Broad Street",
      "Idumota",
      "Isale Eko",
      "Onikan",
      "Dolphin Estate",
      "Lafiaji",
      "Eko Atlantic",
    ],
    areaKeywords: [
      "victoria island",
      "vi annex",
      "ikoyi",
      "obalende",
      "oniru",
      "lagos island",
      "marina",
      "broad street",
      "idumota",
      "isale eko",
      "onikan",
      "dolphin estate",
      "lafiaji",
      "eko atlantic",
    ],
  },
  {
    id: "zone-2",
    name: "Inner Lekki",
    fee: 2_000,
    examples: [
      "Lekki Phase 1",
      "Lekki Phase 1 Estate",
      "Ikate",
      "Elegushi",
      "Jakande",
      "Osapa London",
      "Agungi",
      "Ilasan",
      "Igbo-Efon",
      "Idado",
      "Lekki County",
    ],
    areaKeywords: [
      "lekki phase 1",
      "lekki phase i",
      "ikate",
      "elegushi",
      "jakande",
      "osapa london",
      "osapa",
      "agungi",
      "ilasan",
      "igbo-efon",
      "igbo efon",
      "idado",
      "lekki county",
    ],
  },
  {
    id: "zone-3",
    name: "Outer Lekki / Ajah Corridor",
    fee: 2_500,
    examples: [
      "Chevron",
      "Chevron Drive",
      "Ikota",
      "Ikota Estate",
      "VGC",
      "Victoria Garden City",
      "Ajah",
      "Ado",
      "Okun-Ajah",
      "Ilaje",
      "Langbasa",
      "Badore",
      "Thomas Estate",
      "Abraham Adesanya",
      "Lekki Scheme 2",
      "Sangotedo",
    ],
    areaKeywords: [
      "chevron",
      "ikota",
      "vgc",
      "victoria garden city",
      "ajah",
      "okun-ajah",
      "okun ajah",
      "ilaje",
      "langbasa",
      "badore",
      "thomas estate",
      "abraham adesanya",
      "lekki scheme 2",
      "sangotedo",
      "ibeju-lekki",
      "ibeju lekki",
      "awoyaya",
    ],
  },
  {
    id: "zone-4",
    name: "Central Mainland / Ikeja Corridor",
    fee: 2_000,
    examples: [
      "Ikeja",
      "Ikeja GRA",
      "Allen Avenue",
      "Opebi",
      "Alausa",
      "Oregun",
      "Agidingbi",
      "Ogba",
      "Ojodu",
      "Omole",
      "Maryland",
      "Anthony",
      "Mende",
      "Gbagada",
      "Ogudu",
      "Ojota",
      "Ketu",
      "Alapere",
      "Magodo",
      "Shangisha",
      "Isheri",
    ],
    areaKeywords: [
      "ikeja",
      "allen avenue",
      "opebi",
      "alausa",
      "oregun",
      "agidingbi",
      "ogba",
      "ojodu",
      "omole",
      "maryland",
      "anthony",
      "mende",
      "gbagada",
      "ogudu",
      "ojota",
      "ketu",
      "alapere",
      "magodo",
      "shangisha",
      "isheri",
    ],
  },
  {
    id: "zone-5",
    name: "Inner Mainland / West Mainland",
    fee: 1_500,
    examples: [
      "Yaba",
      "Sabo",
      "Alagomeji",
      "Ebute Metta",
      "Oyingbo",
      "Iwaya",
      "Surulere",
      "Aguda",
      "Lawanson",
      "Itire",
      "Ojuelegba",
      "Shitta",
      "Tejuosho",
      "Mushin",
      "Ilupeju",
      "Papa Ajao",
      "Fadeyi",
      "Oshodi",
      "Isolo",
      "Ajao Estate",
      "Okota",
      "Apapa",
      "Apapa GRA",
      "Iganmu",
      "Ijora",
    ],
    areaKeywords: [
      "yaba",
      "sabo",
      "alagomeji",
      "ebute metta",
      "oyingbo",
      "iwaya",
      "surulere",
      "aguda",
      "lawanson",
      "itire",
      "ojuelegba",
      "shitta",
      "tejuosho",
      "mushin",
      "ilupeju",
      "papa ajao",
      "fadeyi",
      "oshodi",
      "isolo",
      "ajao estate",
      "okota",
      "apapa",
      "iganmu",
      "ijora",
    ],
  },
  {
    id: "zone-6",
    name: "Outer Mainland / Extended Service Areas",
    fee: 3_000,
    examples: [
      "Agege",
      "Orile Agege",
      "Dopemu",
      "Ogba-Ijaiye",
      "Fagba",
      "Iju",
      "Ifako",
      "Ojokoro",
      "Abule Egba",
      "Alagbado",
      "Meiran",
      "Alimosho",
      "Egbeda",
      "Akowonjo",
      "Idimu",
      "Isheri Olofin",
      "Igando",
      "Ikotun",
      "Ijegun",
      "Ipaja",
      "Ayobo",
      "Festac",
      "Mile 2",
      "Amuwo-Odofin",
      "Satellite Town",
      "Trade Fair",
      "Ojo",
      "Okokomaiko",
      "Iba",
      "Ajangbadi",
      "Ajeromi",
      "Ajegunle",
    ],
    areaKeywords: [
      "agege",
      "dopemu",
      "ogba-ijaiye",
      "ogba ijaiye",
      "fagba",
      "iju",
      "ifako",
      "ojokoro",
      "abule egba",
      "alagbado",
      "meiran",
      "alimosho",
      "egbeda",
      "akowonjo",
      "idimu",
      "isheri olofin",
      "igando",
      "ikotun",
      "ijegun",
      "ipaja",
      "ayobo",
      "festac",
      "mile 2",
      "amuwo-odofin",
      "amuwo odofin",
      "satellite town",
      "trade fair",
      "ojo",
      "okokomaiko",
      "iba",
      "ajangbadi",
      "ajeromi",
      "ajegunle",
    ],
  },
];

/**
 * Areas we know about but do not currently serve — checked before the zone
 * list so these never get matched into the nearest zone by mistake.
 * Not an exhaustive boundary, just the areas the business has explicitly
 * called out as out of range for V1.
 */
export const unservicedKeywords = ["badagry", "epe", "ikorodu"];

/**
 * Fallback zone lookup by Local Government Area, used when the address
 * autocomplete provider isn't configured (see src/lib/forms.ts `lagosLgas`).
 * This is an approximation — LGA boundaries are coarser than the zones
 * above — kept only as a graceful degradation, not a replacement for
 * proper address-based zone resolution.
 */
export const lgaToZoneFallback: Record<string, ZoneFallback> = {
  Agege: { zoneId: "zone-6" },
  "Ajeromi-Ifelodun": { zoneId: "zone-6" },
  Alimosho: { zoneId: "zone-6" },
  "Amuwo-Odofin": { zoneId: "zone-6" },
  Apapa: { zoneId: "zone-5" },
  Badagry: { unavailable: true },
  Epe: { unavailable: true },
  "Eti-Osa": { zoneId: "zone-2" },
  "Ibeju-Lekki": { zoneId: "zone-3" },
  "Ifako-Ijaiye": { zoneId: "zone-6" },
  Ikeja: { zoneId: "zone-4" },
  Ikorodu: { unavailable: true },
  Kosofe: { zoneId: "zone-4" },
  "Lagos Island": { zoneId: "zone-1" },
  "Lagos Mainland": { zoneId: "zone-5" },
  Mushin: { zoneId: "zone-5" },
  Ojo: { zoneId: "zone-6" },
  "Oshodi-Isolo": { zoneId: "zone-5" },
  Shomolu: { zoneId: "zone-5" },
  Surulere: { zoneId: "zone-5" },
};

type ZoneFallback = { zoneId: Zone["id"]; unavailable?: false } | { zoneId?: undefined; unavailable: true };
