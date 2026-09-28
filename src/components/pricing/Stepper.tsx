"use client";

import { Icon } from "@/components/ui/Icon";

type Props = {
  id: string;
  label: string;
  hint?: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
};

/** A labelled +/- counter row. Fully keyboard operable; the count is announced as it changes. */
export function Stepper({ id, label, hint, value, min = 0, max = 50, onChange }: Props) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));
  const labelId = `${id}-label`;

  return (
    <div role="group" aria-labelledby={labelId} className="flex items-center justify-between gap-4 border-b border-ink/10 py-2.5 last:border-b-0">
      <div className="min-w-0">
        <p id={labelId} className="text-sm font-medium">
          {label}
        </p>
        {hint && <p className="mt-0.5 text-xs text-ink/75">{hint}</p>}
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <button
          type="button"
          onClick={dec}
          disabled={value <= min}
          aria-label={`Fewer ${label.toLowerCase()}`}
          className="grid size-9 place-items-center rounded-full bg-mint transition-colors duration-200 hover:bg-brand disabled:pointer-events-none disabled:opacity-40"
        >
          <Icon name="minus" className="size-4" />
        </button>
        <output aria-live="polite" className="w-6 text-center text-base font-medium tabular-nums">
          {value}
        </output>
        <button
          type="button"
          onClick={inc}
          disabled={value >= max}
          aria-label={`More ${label.toLowerCase()}`}
          className="grid size-9 place-items-center rounded-full bg-mint transition-colors duration-200 hover:bg-brand disabled:pointer-events-none disabled:opacity-40"
        >
          <Icon name="plus" className="size-4" />
        </button>
      </div>
    </div>
  );
}
