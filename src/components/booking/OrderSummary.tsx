"use client";

import { PriceSummary } from "@/components/pricing/PriceSummary";
import { useAuthoritativeQuote } from "@/lib/pricing-engine/useAuthoritativeQuote";
import { zones } from "@/lib/pricing-engine/config";
import type { ZoneResolution } from "@/lib/pricing-engine/types";
import type { WizardValues } from "./wizard-types";

/** Stays visible throughout the flow: a live, itemised total for the three priced tiers, or a simple note for everything else — never an invented number. */
export function OrderSummary({ values }: { values: WizardValues }) {
  // The hook always runs (rules of hooks) — its result is only rendered when a priced tier is chosen.
  const { quote, pending } = useAuthoritativeQuote({
    cleaningType: values.cleaningType ?? "standard",
    property: values.property,
    extras: values.extras,
    zoneId: values.zoneId,
    addressUnavailable: values.addressUnavailable,
  });

  if (!values.cleaningType) {
    return (
      <div className="rounded-3xl bg-ink p-6 text-paper sm:p-7">
        <p className="text-sm font-medium tracking-[0.1em] text-paper/60 uppercase">Your request</p>
        <p className="mt-2 text-lg font-medium">{values.service || "Choose a service to get started"}</p>
        <p className="mt-4 text-sm leading-relaxed text-paper/75">
          This one doesn&rsquo;t have a fixed price online yet. Tell us a bit about it and we&rsquo;ll send you a quote before anything
          is confirmed.
        </p>
      </div>
    );
  }

  const zoneResolution: ZoneResolution | null = values.zoneId
    ? { available: true, zone: zones.find((z) => z.id === values.zoneId)! }
    : values.addressUnavailable
      ? { available: false, reason: "unserviced-area" }
      : null;

  return <PriceSummary quote={quote} zoneResolution={zoneResolution} pending={pending} />;
}
