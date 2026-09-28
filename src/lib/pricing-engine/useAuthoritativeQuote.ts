"use client";

import { useEffect, useMemo, useState } from "react";
import { calculateQuote } from "./calculate";
import type { BookingConfig, QuoteBreakdown } from "./types";

/**
 * Two-layer pricing: `previewQuote` is computed locally and updates
 * instantly on every keystroke/click. The same raw config is also sent to
 * /api/pricing/quote (debounced), and once that authoritative response
 * arrives it takes over as the displayed total — so what a customer books
 * always matches a server-side recalculation, never just what the browser
 * happened to compute.
 */
export function useAuthoritativeQuote(config: BookingConfig) {
  // Callers often rebuild `config` as a fresh object literal on every render (e.g. deriving it
  // from a larger state object), so the effect below keys off its serialised content rather than
  // object identity — otherwise a new reference every render would re-fire the fetch forever.
  const key = JSON.stringify(config);
  const previewQuote = useMemo(() => calculateQuote(config), [key]); // eslint-disable-line react-hooks/exhaustive-deps
  const [authoritative, setAuthoritative] = useState<QuoteBreakdown | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setPending(true);
      fetch("/api/pricing/quote", { method: "POST", headers: { "content-type": "application/json" }, body: key })
        .then((r) => r.json())
        .then((data) => {
          if (data.quote) setAuthoritative(data.quote);
        })
        .catch(() => {})
        .finally(() => setPending(false));
    }, 400);
    return () => clearTimeout(t);
  }, [key]);

  return { quote: authoritative ?? previewQuote, pending };
}
