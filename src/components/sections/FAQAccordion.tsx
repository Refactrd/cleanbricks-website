"use client";

import { useId, useState } from "react";
import type { Faq } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";

export function FAQAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${base}-btn-${i}`;
        const panelId = `${base}-panel-${i}`;
        return (
          <div key={item.q} className="rounded-2xl bg-mint transition-shadow duration-300 data-[open=true]:shadow-[0_12px_30px_-18px_rgba(31,41,55,0.3)]" data-open={isOpen}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 rounded-2xl px-6 py-5 text-left text-lg font-medium"
              >
                {item.q}
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-paper">
                  <Icon
                    name="plus"
                    className={`size-4 transition-transform duration-300 ease-out-soft ${isOpen ? "rotate-45" : ""}`}
                  />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={`grid transition-[grid-template-rows] duration-300 ease-out-soft ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 leading-relaxed text-ink/75">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
