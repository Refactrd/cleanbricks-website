import { timeSlotOptions } from "@/lib/forms";

type Props = { value: string; onChange: (v: string) => void; error?: string };

export function TimeSlotPills({ value, onChange, error }: Props) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium">What time should we arrive?</p>
      <div role="radiogroup" aria-label="Preferred time" className="flex flex-wrap gap-2">
        {timeSlotOptions.map((slot) => {
          const selected = value === slot;
          return (
            <button
              key={slot}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(slot)}
              className={`rounded-full border-2 px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
                selected ? "border-brand bg-brand text-ink" : "border-transparent bg-mint/60 hover:bg-mint"
              }`}
            >
              {slot}
            </button>
          );
        })}
      </div>
      {error && (
        <p className="mt-1.5 flex items-center gap-1.5 text-sm font-medium">
          <span aria-hidden="true" className="grid size-4 place-items-center rounded-full bg-ink text-[0.65rem] leading-none text-paper">
            !
          </span>
          {error}
        </p>
      )}
    </div>
  );
}
