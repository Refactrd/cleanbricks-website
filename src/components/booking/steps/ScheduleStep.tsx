"use client";

import { useState } from "react";
import { DatePicker } from "../DatePicker";
import { ExpandableField } from "../ExpandableField";
import { OptionList } from "../OptionList";
import { TimeSlotPills } from "../TimeSlotPills";
import { frequencyOptions } from "@/lib/forms";
import type { WizardValues } from "../wizard-types";

type Props = { values: WizardValues; update: (patch: Partial<WizardValues>) => void; errors?: Partial<Record<"date" | "timeSlot", string>> };

const dateFormatter = new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
const formatDate = (iso: string) => (iso ? dateFormatter.format(new Date(`${iso}T00:00:00`)) : "");

export function ScheduleStep({ values, update, errors = {} }: Props) {
  const [open, setOpen] = useState<"date" | "frequency" | null>(null);

  return (
    <div className="space-y-5">
      <ExpandableField
        id="wizard-date"
        label="Preferred date"
        placeholder="Choose a date"
        summary={formatDate(values.date)}
        open={open === "date"}
        onToggle={() => setOpen(open === "date" ? null : "date")}
        error={errors.date}
      >
        <DatePicker
          value={values.date}
          onChange={(iso) => {
            update({ date: iso });
            setOpen(null);
          }}
        />
      </ExpandableField>

      <TimeSlotPills value={values.timeSlot} onChange={(v) => update({ timeSlot: v })} error={errors.timeSlot} />

      <ExpandableField
        id="wizard-frequency"
        label="How often do you want your space cleaned?"
        placeholder="Choose how often"
        summary={values.frequency}
        open={open === "frequency"}
        onToggle={() => setOpen(open === "frequency" ? null : "frequency")}
      >
        <OptionList
          options={frequencyOptions}
          value={values.frequency}
          onChange={(v) => {
            update({ frequency: v });
            setOpen(null);
          }}
        />
      </ExpandableField>
    </div>
  );
}
