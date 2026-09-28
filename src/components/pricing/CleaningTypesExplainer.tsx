"use client";

import { useState } from "react";
import { CleaningTypeCards } from "./CleaningTypeCards";
import type { CleaningType } from "@/lib/pricing-engine/types";

/** Standalone, informational version of the tier cards — for browsing what's included, not for booking. */
export function CleaningTypesExplainer() {
  const [value, setValue] = useState<CleaningType>("standard");
  return <CleaningTypeCards value={value} onChange={setValue} />;
}
