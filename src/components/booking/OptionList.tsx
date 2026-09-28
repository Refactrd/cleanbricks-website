"use client";

import { Icon } from "@/components/ui/Icon";

type Props = { options: readonly string[]; value: string; onChange: (v: string) => void };

/** A vertical list of choices, each with a checkmark circle — the content of an ExpandableField. */
export function OptionList({ options, value, onChange }: Props) {
  return (
    <div role="radiogroup" className="-my-1">
      {options.map((o) => {
        const selected = o === value;
        return (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(o)}
            className="flex w-full items-center justify-between gap-3 rounded-xl px-2 py-2.5 text-left transition-colors hover:bg-mint"
          >
            <span className={selected ? "font-medium" : ""}>{o}</span>
            <span
              aria-hidden="true"
              className={`grid size-5 shrink-0 place-items-center rounded-full border-2 ${selected ? "border-brand bg-brand text-ink" : "border-ink/25"}`}
            >
              {selected && <Icon name="check" className="size-3" />}
            </span>
          </button>
        );
      })}
    </div>
  );
}
