"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

type Props = { value: string; onChange: (iso: string) => void };

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const monthFormatter = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" });

const toIso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

/** A small month-grid calendar — past dates disabled, today and the selection both marked. */
export function DatePicker({ value, onChange }: Props) {
  const selected = value ? new Date(`${value}T00:00:00`) : null;
  const [view, setView] = useState(() => selected ?? new Date());
  const today = startOfDay(new Date());

  const firstOfMonth = new Date(view.getFullYear(), view.getMonth(), 1);
  // Monday-first grid: shift so Monday = 0 … Sunday = 6.
  const leadingBlanks = (firstOfMonth.getDay() + 6) % 7;
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(view.getFullYear(), view.getMonth(), i + 1)),
  ];

  const changeMonth = (delta: number) => setView(new Date(view.getFullYear(), view.getMonth() + delta, 1));
  const atCurrentMonth = view.getFullYear() === today.getFullYear() && view.getMonth() === today.getMonth();

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => changeMonth(-1)}
          disabled={atCurrentMonth}
          aria-label="Previous month"
          className="grid size-8 place-items-center rounded-full transition-colors hover:bg-mint disabled:pointer-events-none disabled:opacity-30"
        >
          <Icon name="arrow" className="size-4 rotate-180" />
        </button>
        <p className="text-sm font-medium">{monthFormatter.format(view)}</p>
        <button type="button" onClick={() => changeMonth(1)} aria-label="Next month" className="grid size-8 place-items-center rounded-full transition-colors hover:bg-mint">
          <Icon name="arrow" className="size-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-y-1 text-center">
        {weekdays.map((w) => (
          <span key={w} className="py-1 text-xs font-medium text-ink/60">
            {w}
          </span>
        ))}
        {cells.map((d, i) => {
          if (!d) return <span key={`b${i}`} aria-hidden="true" />;
          const iso = toIso(d);
          const isPast = d < today;
          const isSelected = value === iso;
          const isToday = d.getTime() === today.getTime();
          return (
            <button
              key={iso}
              type="button"
              disabled={isPast}
              aria-current={isToday ? "date" : undefined}
              aria-pressed={isSelected}
              onClick={() => onChange(iso)}
              className={`mx-auto grid size-9 place-items-center rounded-full text-sm transition-colors duration-150 disabled:pointer-events-none disabled:text-ink/25 ${
                isSelected ? "bg-brand font-medium text-ink" : isToday ? "font-medium text-brand ring-1 ring-inset ring-brand/50" : "hover:bg-mint"
              }`}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
