import Image from "next/image";
import { processSteps } from "@/lib/content";
import { logos } from "@/lib/images";
import { ProcessStep } from "./ProcessStep";

// Placement for the "logo" layout: two steps either side of the CleanBricks symbol.
const logoPlacement = [
  "md:col-start-1 md:row-start-1",
  "md:col-start-1 md:row-start-2",
  "md:col-start-3 md:row-start-1",
  "md:col-start-3 md:row-start-2",
];

/** "cards": four numbered cards. "logo": two-and-two around the CleanBricks symbol. */
export function ProcessSteps({ variant = "cards" }: { variant?: "cards" | "logo" }) {
  const logo = variant === "logo";
  return (
    <ol className={logo ? "grid gap-4 md:grid-cols-[1fr_minmax(10rem,14rem)_1fr] md:grid-rows-2" : "grid gap-5 sm:grid-cols-2 lg:grid-cols-4"}>
      {processSteps.map((s, i) => (
        <ProcessStep key={s.title} number={i + 1} title={s.title} text={s.text} className={logo ? logoPlacement[i] : ""} />
      ))}
      {logo && (
        <li aria-hidden="true" className="hidden place-items-center rounded-3xl bg-paper p-6 md:col-start-2 md:row-span-2 md:row-start-1 md:grid">
          <Image src={logos.icon.src} width={160} height={160} alt="" className="size-32 rounded-3xl" />
        </li>
      )}
    </ol>
  );
}
