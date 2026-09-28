export type EnquiryKind = "contact" | "booking";

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<string, string>>;
  values?: Record<string, string>;
};

export const serviceOptions = [
  "Light Cleaning",
  "Standard Cleaning",
  "Deep Cleaning",
  "Move-in cleaning",
  "Move-out cleaning",
  "Post-renovation cleaning",
  "Short-let / Airbnb cleaning",
  "Office / commercial cleaning",
  "Not sure yet",
] as const;

/** The three home-cleaning tiers that open the live pricing calculator on the booking form. */
const homeCleaningServiceMap: Partial<Record<(typeof serviceOptions)[number], import("./pricing-engine/types").CleaningType>> = {
  "Light Cleaning": "light",
  "Standard Cleaning": "standard",
  "Deep Cleaning": "deep",
};

export function serviceToCleaningType(service?: string) {
  return service ? (homeCleaningServiceMap[service as (typeof serviceOptions)[number]] ?? null) : null;
}

export const propertyOptions = ["Apartment", "House", "Short-let apartment", "Office", "Retail or studio", "Other"] as const;

export const frequencyOptions = ["One-off", "Weekly", "Fortnightly", "Monthly", "Not sure yet"] as const;

export const timeSlotOptions = ["8am – 10am", "10am – 12pm", "12pm – 2pm", "2pm – 4pm"] as const;

/** The 20 Local Government Areas of Lagos State. */
export const lagosLgas = [
  "Agege",
  "Ajeromi-Ifelodun",
  "Alimosho",
  "Amuwo-Odofin",
  "Apapa",
  "Badagry",
  "Epe",
  "Eti-Osa",
  "Ibeju-Lekki",
  "Ifako-Ijaiye",
  "Ikeja",
  "Ikorodu",
  "Kosofe",
  "Lagos Island",
  "Lagos Mainland",
  "Mushin",
  "Ojo",
  "Oshodi-Isolo",
  "Shomolu",
  "Surulere",
] as const;

export const fieldNames = [
  "name",
  "phone",
  "email",
  "service",
  "propertyType",
  "location",
  "area",
  "date",
  "timeSlot",
  "frequency",
  "message",
  "pricingConfigJson",
  "pricingSummary",
] as const;
