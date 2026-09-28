import { Icon } from "@/components/ui/Icon";
import { cleaningTypeInfo } from "@/lib/pricing-engine/config";
import { naira } from "@/lib/pricing-engine/format";
import type { QuoteBreakdown, ZoneResolution } from "@/lib/pricing-engine/types";

type Props = {
  quote: QuoteBreakdown;
  zoneResolution: ZoneResolution | null;
  pending?: boolean;
};

const unavailableCopy: Record<Exclude<ZoneResolution, { available: true }>["reason"], string> = {
  "outside-lagos": "That address looks like it's outside Lagos. We currently clean homes and offices across Lagos only.",
  "unserviced-area": "We don't currently serve this location. Message us on WhatsApp and we'll let you know if we can make an exception.",
  unresolved: "We couldn't match that address to one of our service areas yet. Message us on WhatsApp and we'll confirm coverage.",
};

export function PriceSummary({ quote, zoneResolution, pending }: Props) {
  const lines = [...quote.propertyLines, ...quote.extraLines];

  return (
    <div className="rounded-3xl bg-ink p-6 text-paper sm:p-7" aria-busy={pending}>
      <p className="text-sm font-medium tracking-[0.1em] text-paper/60 uppercase">Your estimate</p>
      <p className="mt-2 text-lg font-medium">{cleaningTypeInfo[quote.cleaningType].name}</p>

      <p className="mt-4 flex items-baseline gap-2">
        <span aria-live="polite" className="font-display text-4xl font-bold tracking-tight tabular-nums">
          {naira(quote.total)}
        </span>
        {pending && <Icon name="spinner" className="size-4 animate-spin text-paper/50" aria-label="Updating" />}
      </p>

      <dl className="mt-5 space-y-1.5 border-t border-paper/15 pt-4 text-sm">
        <div className="flex justify-between gap-4 text-paper/80">
          <dt>Base (1 bed, 1 bath, 1 living room, 1 kitchen)</dt>
          <dd className="shrink-0 tabular-nums">{naira(quote.base)}</dd>
        </div>
        {lines.map((l) => (
          <div key={l.label} className="flex justify-between gap-4 text-paper/80">
            <dt>{l.label}</dt>
            <dd className="shrink-0 tabular-nums">{naira(l.amount)}</dd>
          </div>
        ))}
        <div className="flex justify-between gap-4 text-paper/80">
          <dt>Location fee{quote.zoneName ? ` (${quote.zoneName})` : ""}</dt>
          <dd className="shrink-0 tabular-nums">{quote.zoneName ? naira(quote.locationFee) : "—"}</dd>
        </div>
      </dl>

      {zoneResolution && !zoneResolution.available && (
        <p role="status" className="mt-5 flex gap-2 rounded-2xl bg-sun/20 p-4 text-sm leading-relaxed text-paper">
          <Icon name="info" className="mt-0.5 size-5 shrink-0" />
          {unavailableCopy[zoneResolution.reason]}
        </p>
      )}
      {!zoneResolution && (
        <p className="mt-5 flex gap-2 text-sm leading-relaxed text-paper/70">
          <Icon name="pin" className="mt-0.5 size-4 shrink-0" />
          Add your address to include the location fee in your total.
        </p>
      )}
    </div>
  );
}
