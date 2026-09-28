type Props = { total: number; current: number };

/** A row of thin segments — filled up to the current step. */
export function ProgressBar({ total, current }: Props) {
  return (
    <ol aria-label={`Step ${current + 1} of ${total}`} className="flex gap-1.5">
      {Array.from({ length: total }, (_, i) => (
        <li key={i} className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/10">
          <span
            className={`block h-full rounded-full bg-brand transition-transform duration-500 ease-out-soft ${i <= current ? "scale-x-100" : "scale-x-0"}`}
            style={{ transformOrigin: "left" }}
          />
        </li>
      ))}
    </ol>
  );
}
