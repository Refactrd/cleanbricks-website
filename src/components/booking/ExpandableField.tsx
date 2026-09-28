"use client";

import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";

type Props = {
  id: string;
  label: string;
  summary?: string;
  placeholder: string;
  open: boolean;
  onToggle: () => void;
  error?: string;
  children: ReactNode;
};

/** A closed field that shows the current choice and expands in place to reveal it — used for date and frequency, matching how a picker should feel rather than a plain native input. */
export function ExpandableField({ id, label, summary, placeholder, open, onToggle, error, children }: Props) {
  const panelId = `${id}-panel`;
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <div
        className={`overflow-hidden rounded-2xl border-2 bg-mint/60 transition-colors duration-200 ${
          error ? "border-ink bg-sun/15" : open ? "border-brand bg-paper" : "border-transparent"
        }`}
      >
        <button
          id={id}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
        >
          <span className={summary ? "text-base" : "text-base text-ink/45"}>{summary || placeholder}</span>
          <Icon name="arrow" className={`size-4 shrink-0 rotate-90 transition-transform duration-200 ${open ? "-rotate-90" : ""}`} />
        </button>
        <div id={panelId} hidden={!open} className="border-t border-ink/10 p-4">
          {children}
        </div>
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
