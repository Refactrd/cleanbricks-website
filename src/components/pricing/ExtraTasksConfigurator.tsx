"use client";

import { Stepper } from "./Stepper";
import { extraTaskLabels } from "@/lib/pricing-engine/config";
import { extraTaskTypes, type ExtraTasksConfig, type ExtraTaskType } from "@/lib/pricing-engine/types";

type Props = { value: ExtraTasksConfig; onChange: (task: ExtraTaskType, count: number) => void };

const hints: Partial<Record<ExtraTaskType, string>> = {
  windows: "First 5 windows are ₦5,000, then ₦3,000 per extra 5",
};

export function ExtraTasksConfigurator({ value, onChange }: Props) {
  return (
    <div>
      {extraTaskTypes.map((task) => (
        <Stepper
          key={task}
          id={`extra-${task}`}
          label={extraTaskLabels[task]}
          hint={hints[task]}
          value={value[task]}
          onChange={(v) => onChange(task, v)}
        />
      ))}
    </div>
  );
}
