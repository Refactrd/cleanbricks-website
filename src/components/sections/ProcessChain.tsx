"use client";

import { useEffect, useRef, useState } from "react";
import { processSteps } from "@/lib/content";

type Phase = "idle" | "armed" | "play";

/**
 * Four steps joined by a chain: each step appears, then its connector fills to the next.
 * Content is fully visible until hydration, and stays that way for reduced-motion users.
 */
export function ProcessChain() {
  const ref = useRef<HTMLOListElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPhase("armed");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase("play");
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <ol ref={ref} data-chain={phase} className="grid gap-0 md:grid-cols-4 md:gap-5">
      {processSteps.map((step, i) => {
        const last = i === processSteps.length - 1;
        return (
          <li key={step.title} style={{ "--i": i } as React.CSSProperties} className="flex gap-5 md:flex-col md:gap-0">
            {/* Node + connector: vertical on mobile, horizontal from md */}
            <div className="flex flex-col items-center md:mb-5 md:flex-row">
              <span
                aria-hidden="true"
                className="chain-node grid size-14 shrink-0 place-items-center rounded-full bg-brand font-display text-xl font-bold text-ink shadow-[0_10px_24px_-10px_rgba(16,185,129,0.8)]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {!last && (
                <span aria-hidden="true" className="my-2 min-h-16 w-1 flex-1 overflow-hidden rounded-full bg-ink/15 md:mx-3 md:my-0 md:h-1 md:min-h-0 md:w-auto">
                  <span className="chain-fill block size-full rounded-full bg-brand" />
                </span>
              )}
            </div>
            <div className={`chain-body flex-1 rounded-3xl bg-paper p-6 sm:p-7 ${last ? "" : "mb-5 md:mb-0"}`}>
              <h3 className="font-display text-2xl leading-tight font-bold tracking-tight">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed text-ink/75">{step.text}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
