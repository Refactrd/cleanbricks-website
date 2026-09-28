"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import type { PlaceSuggestion, ResolvedAddress, ZoneResolution } from "@/lib/pricing-engine/types";

type Props = {
  label: string;
  initialLabel?: string;
  onResolved: (address: ResolvedAddress, zoneResolution: ZoneResolution) => void;
  /** Fires once, if Google Places isn't configured server-side — the parent should fall back to the LGA picker. */
  onNotConfigured: () => void;
};

/**
 * Google Places Autocomplete, proxied through our own API routes so the key
 * stays server-side. A standard combobox: type-ahead suggestions, arrow keys
 * to move, Enter to choose, Escape to close.
 */
export function AddressAutocomplete({ label, initialLabel, onResolved, onNotConfigured }: Props) {
  const [text, setText] = useState(initialLabel ?? "");
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [resolving, setResolving] = useState(false);
  const listId = useId();
  const inputId = useId();
  const notConfiguredRef = useRef(onNotConfigured);
  useEffect(() => {
    notConfiguredRef.current = onNotConfigured;
  });

  // Detect once, on mount, whether the server has an API key at all.
  useEffect(() => {
    let cancelled = false;
    fetch("/api/places/status")
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled && !d.configured) notConfiguredRef.current();
      })
      .catch(() => {
        if (!cancelled) notConfiguredRef.current();
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (text.trim().length < 3) {
        setSuggestions([]);
        setOpen(false);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`/api/places/autocomplete?input=${encodeURIComponent(text)}`);
        const data = await res.json();
        if (data.configured === false) {
          notConfiguredRef.current();
          return;
        }
        const found: PlaceSuggestion[] = data.suggestions ?? [];
        setSuggestions(found);
        setOpen(found.length > 0);
        setActiveIndex(-1);
      } catch {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 350);
    return () => clearTimeout(timer);
  }, [text]);

  const select = async (s: PlaceSuggestion) => {
    setText([s.mainText, s.secondaryText].filter(Boolean).join(", "));
    setOpen(false);
    setSuggestions([]);
    setResolving(true);
    try {
      const res = await fetch(`/api/places/details?placeId=${encodeURIComponent(s.placeId)}`);
      const data = await res.json();
      if (data.configured === false) {
        notConfiguredRef.current();
        return;
      }
      if (data.address && data.zoneResolution) onResolved(data.address, data.zoneResolution);
    } catch {
      // Leave the typed text as-is; the price summary will show "location not yet confirmed".
    } finally {
      setResolving(false);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(suggestions.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      select(suggestions[activeIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className="relative">
      <label htmlFor={inputId} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <Icon name="search" className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink/45" />
        <input
          id={inputId}
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={activeIndex >= 0 ? `${listId}-opt-${activeIndex}` : undefined}
          autoComplete="off"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          placeholder="Start typing a street, estate or area in Lagos…"
          className="w-full rounded-2xl border-2 border-transparent bg-mint/60 py-3.5 pr-11 pl-11 text-base text-ink placeholder:text-ink/45 transition-colors duration-200 focus:border-brand focus:bg-paper focus:outline-none"
        />
        {(loading || resolving) && (
          <Icon name="spinner" className="absolute top-1/2 right-4 size-5 -translate-y-1/2 animate-spin text-ink/40" />
        )}
      </div>
      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Address suggestions"
          className="absolute z-10 mt-2 max-h-72 w-full overflow-auto rounded-2xl bg-paper py-2 shadow-[0_20px_40px_-16px_rgba(31,41,55,0.35)]"
        >
          {suggestions.map((s, i) => (
            <li key={s.placeId} id={`${listId}-opt-${i}`} role="option" aria-selected={i === activeIndex}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => select(s)}
                className={`block w-full px-4 py-2.5 text-left transition-colors ${i === activeIndex ? "bg-mint" : "hover:bg-mint/60"}`}
              >
                <span className="block text-sm font-medium">{s.mainText}</span>
                {s.secondaryText && <span className="block text-xs text-ink/75">{s.secondaryText}</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
