export type EnquiryKind = "contact" | "booking";

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<string, string>>;
  values?: Record<string, string>;
};

export const serviceOptions = [
  "Regular home cleaning",
  "Deep cleaning",
  "Move-in cleaning",
  "Move-out cleaning",
  "Post-renovation cleaning",
  "Short-let / Airbnb cleaning",
  "Office / commercial cleaning",
  "Not sure yet",
] as const;

export const propertyOptions = ["Apartment", "House", "Short-let apartment", "Office", "Retail or studio", "Other"] as const;

export const frequencyOptions = ["One-off", "Weekly", "Fortnightly", "Monthly", "Not sure yet"] as const;

export const fieldNames = [
  "name",
  "phone",
  "email",
  "service",
  "propertyType",
  "location",
  "date",
  "frequency",
  "message",
] as const;
