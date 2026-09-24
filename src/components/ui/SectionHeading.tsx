import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  align?: "center" | "left";
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({ eyebrow, title, text, align = "center", as: Tag = "h2", className = "" }: Props) {
  const center = align === "center";
  return (
    <div className={`reveal ${center ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      {eyebrow && (
        <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-mint px-3.5 py-1.5 text-xs font-medium tracking-[0.12em] text-ink uppercase">
          <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <Tag className="font-display text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.05] font-bold tracking-[-0.02em] text-balance">
        {title}
      </Tag>
      {text && <p className="mt-5 text-lg leading-relaxed text-ink/75 text-pretty">{text}</p>}
    </div>
  );
}
