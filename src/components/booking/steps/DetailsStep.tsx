import { SelectField, TextAreaField } from "@/components/forms/Field";
import { propertyOptions } from "@/lib/forms";
import type { WizardValues } from "../wizard-types";

type Props = { values: WizardValues; update: (patch: Partial<WizardValues>) => void };

export function DetailsStep({ values, update }: Props) {
  return (
    <div className="space-y-5">
      <SelectField
        id="wizard-propertyType"
        label="Property type"
        optional
        options={propertyOptions}
        value={values.propertyType}
        onChange={(e) => update({ propertyType: e.target.value })}
      />
      <TextAreaField
        id="wizard-message"
        label="Tell us about the job"
        placeholder="Size of the space, what needs doing, any deadlines…"
        value={values.message}
        onChange={(e) => update({ message: e.target.value })}
      />
    </div>
  );
}
