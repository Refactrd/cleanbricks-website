"use client";

import { Stepper } from "./Stepper";
import { baselineProperty, spaceLabels } from "@/lib/pricing-engine/config";
import { spaceTypes, type PropertyConfig, type SpaceType } from "@/lib/pricing-engine/types";

type Props = { value: PropertyConfig; onChange: (space: SpaceType, count: number) => void };

/** Room/space counters. Bedroom, bathroom, living room and kitchen start at 1 — that's what the base price already covers. */
export function PropertyConfigurator({ value, onChange }: Props) {
  return (
    <div>
      <p className="mb-2 text-sm text-ink/75">
        1 bedroom, 1 bathroom, 1 living room and 1 kitchen are included in the starting price. Add more of any space below.
      </p>
      <div>
        {spaceTypes.map((space) => (
          <Stepper
            key={space}
            id={`space-${space}`}
            label={spaceLabels[space]}
            hint={baselineProperty[space] ? `${baselineProperty[space]} included` : undefined}
            value={value[space]}
            onChange={(v) => onChange(space, v)}
          />
        ))}
      </div>
    </div>
  );
}
