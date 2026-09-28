import { ExtraTasksConfigurator } from "@/components/pricing/ExtraTasksConfigurator";
import type { ExtraTaskType } from "@/lib/pricing-engine/types";
import type { WizardValues } from "../wizard-types";

type Props = { values: WizardValues; update: (patch: Partial<WizardValues>) => void };

export function ExtrasStep({ values, update }: Props) {
  return (
    <div className="rounded-2xl bg-mint px-4 pt-2">
      <ExtraTasksConfigurator
        value={values.extras}
        onChange={(task: ExtraTaskType, count: number) => update({ extras: { ...values.extras, [task]: count } })}
      />
    </div>
  );
}
