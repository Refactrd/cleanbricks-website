import type { IconName } from "@/components/ui/Icon";
import { cleaningTypeInfo } from "@/lib/pricing-engine/config";
import { cleaningTypes, emptyExtras, emptyProperty, type CleaningType, type ExtraTasksConfig, type PropertyConfig, type ZoneId } from "@/lib/pricing-engine/types";

/** Services that don't have a per-room price yet — the wizard still books them, it just can't total them live. */
export const otherServices: { value: string; title: string; description: string; icon: IconName }[] = [
  { value: "Short-let / Airbnb cleaning", title: "Short-let & Airbnb", description: "Guest turnover cleaning, apartment resets and pre-arrival cleans.", icon: "key" },
  { value: "Office / commercial cleaning", title: "Office & commercial", description: "Offices, retail spaces, studios and small business premises.", icon: "building" },
  { value: "Move-in cleaning", title: "Move-in cleaning", description: "A fresh, ready home before the boxes arrive.", icon: "home" },
  { value: "Move-out cleaning", title: "Move-out cleaning", description: "Leave a property clean and ready for whoever comes next.", icon: "home" },
  { value: "Post-renovation cleaning", title: "Post-renovation cleaning", description: "Clear the dust and leftovers once building work is done.", icon: "sparkle" },
  { value: "Not sure yet", title: "Not sure yet", description: "Tell us what you need and we will point you the right way.", icon: "chat" },
];

export const priceTierServiceNames = cleaningTypes.map((t) => cleaningTypeInfo[t].name);

export type WizardValues = {
  service: string;
  cleaningType: CleaningType | null;
  property: PropertyConfig;
  extras: ExtraTasksConfig;
  zoneId?: ZoneId;
  addressUnavailable?: boolean;
  addressLabel: string;
  /** The exact street/house number — always required, regardless of whether address autocomplete resolved the rest. */
  street: string;
  propertyType: string;
  date: string;
  timeSlot: string;
  frequency: string;
  name: string;
  phone: string;
  email: string;
  message: string;
};

export const initialWizardValues: WizardValues = {
  service: "",
  cleaningType: null,
  property: { ...emptyProperty },
  extras: { ...emptyExtras },
  zoneId: undefined,
  addressUnavailable: undefined,
  addressLabel: "",
  street: "",
  propertyType: "",
  date: "",
  timeSlot: "",
  frequency: "",
  name: "",
  phone: "",
  email: "",
  message: "",
};

export type StepId = "service" | "space" | "extras" | "details" | "location" | "schedule" | "contact" | "summary";

const pricedSteps: StepId[] = ["service", "space", "extras", "location", "schedule", "contact", "summary"];
const otherSteps: StepId[] = ["service", "details", "location", "schedule", "contact", "summary"];

/** Which steps apply depends on whether a priced home-cleaning tier was chosen. Defaults to the longer (priced) list until something is picked, so the progress bar starts full-length rather than jumping around. */
export function stepsFor(values: WizardValues): StepId[] {
  if (!values.service) return pricedSteps;
  return values.cleaningType ? pricedSteps : otherSteps;
}

export const stepTitles: Record<StepId, string> = {
  service: "What would you like us to do?",
  space: "Tell us about your space",
  extras: "Any extra tasks?",
  details: "Tell us about the job",
  location: "Where should we clean?",
  schedule: "When would you like us to clean?",
  contact: "Let us know how to reach you",
  summary: "Review your request",
};

/** Which step a server-side validation error belongs to, so the wizard can jump straight there. */
export const stepForField: Record<string, StepId> = {
  service: "service",
  location: "location",
  area: "location",
  date: "schedule",
  timeSlot: "schedule",
  frequency: "schedule",
  name: "contact",
  phone: "contact",
  email: "contact",
  message: "summary",
};
