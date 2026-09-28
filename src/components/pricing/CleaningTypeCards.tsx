"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cleaningTypeInfo } from "@/lib/pricing-engine/config";
import { naira } from "@/lib/pricing-engine/format";
import { tierScope } from "@/lib/pricing-engine/scope";
import { cleaningTypes, type CleaningType } from "@/lib/pricing-engine/types";

type Props = { value: CleaningType | null; onChange: (v: CleaningType) => void };

export function CleaningTypeCards({ value, onChange }: Props) {
  const [open, setOpen] = useState<CleaningType | null>(null);

  return (
    // A single column, not a row: opening one card's details makes it taller, and a grid row would
    // have stretched the other two to match, leaving a lot of empty space inside them.
    <div role="radiogroup" aria-label="Cleaning type" className="flex flex-col gap-4">
      {cleaningTypes.map((type) => {
        const info = cleaningTypeInfo[type];
        const scope = tierScope[type];
        const selected = value === type;
        const expanded = open === type;
        const panelId = `scope-${type}`;

        return (
          <div
            key={type}
            className={`overflow-hidden rounded-3xl border-2 transition-colors duration-200 ${
              selected ? "border-brand bg-paper" : "border-transparent bg-mint"
            }`}
          >
            <button
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(type)}
              className="w-full p-6 text-left sm:p-7"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-display text-xl leading-tight font-bold tracking-tight">{info.name}</h2>
                <span
                  aria-hidden="true"
                  className={`mt-1 grid size-6 shrink-0 place-items-center rounded-full border-2 ${
                    selected ? "border-brand bg-brand text-ink" : "border-ink/25"
                  }`}
                >
                  {selected && <Icon name="check" className="size-3.5" />}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">{info.tagline}</p>
              <p className="mt-4 font-display text-2xl font-bold tracking-tight">
                {naira(info.basePrice)}
                <span className="ml-1 text-sm font-normal text-ink/75">starting price</span>
              </p>
            </button>

            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={panelId}
              onClick={() => setOpen(expanded ? null : type)}
              className="flex w-full items-center justify-center gap-1.5 border-t border-ink/10 py-3 text-sm font-medium text-ink/75 transition-colors hover:text-ink"
            >
              {expanded ? "Hide details" : "Show details"}
              <Icon name="arrow" className={`size-4 transition-transform duration-200 ${expanded ? "-rotate-90" : "rotate-90"}`} />
            </button>

            <div id={panelId} hidden={!expanded} className="space-y-5 border-t border-ink/10 bg-paper/60 p-6 sm:p-7">
              {scope.lead && <p className="text-sm font-medium">{scope.lead}</p>}
              {scope.sections.map((section) => (
                <div key={section.title}>
                  <h3 className="text-xs font-medium tracking-[0.1em] text-ink/75 uppercase">{section.title}</h3>
                  <ul className="mt-2 space-y-1.5">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-snug text-ink/80">
                        <Icon name="check" className="mt-0.5 size-4 shrink-0 text-brand" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {scope.excludes && (
                <div className="rounded-2xl bg-sun/15 p-4">
                  <h3 className="text-xs font-medium tracking-[0.1em] text-ink/75 uppercase">Not included in {info.name}</h3>
                  <ul className="mt-2 grid grid-cols-1 gap-x-4 gap-y-1.5 sm:grid-cols-2">
                    {scope.excludes.map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-snug text-ink/80">
                        <Icon name="close" className="mt-0.5 size-4 shrink-0 text-ink/50" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-xs text-ink/75">Need any of these? Choose Deep Cleaning, or add them as extra tasks below.</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
