type Props = { number: number; title: string; text: string; className?: string };

export function ProcessStep({ number, title, text, className = "" }: Props) {
  return (
    <li className={`reveal relative rounded-3xl bg-paper p-7 sm:p-8 ${className}`}>
      <span className="font-display text-6xl leading-none font-bold tracking-tight text-brand" aria-hidden="true">
        {String(number).padStart(2, "0")}
      </span>
      <h3 className="mt-8 font-display text-2xl leading-tight font-bold tracking-tight">
        <span className="sr-only">Step {number}: </span>
        {title}
      </h3>
      <p className="mt-3 leading-relaxed text-ink/75">{text}</p>
    </li>
  );
}
