import { PropertyConfigurator } from "@/components/pricing/PropertyConfigurator";
import type { SpaceType } from "@/lib/pricing-engine/types";
import type { WizardValues } from "../wizard-types";

type Props = { values: WizardValues; update: (patch: Partial<WizardValues>) => void };

export function SpaceStep({ values, update }: Props) {
  return (
    <div className="rounded-2xl bg-mint px-4 pt-2">
      <PropertyConfigurator
        value={values.property}
        onChange={(space: SpaceType, count: number) => update({ property: { ...values.property, [space]: count } })}
      />
    </div>
  );
}
