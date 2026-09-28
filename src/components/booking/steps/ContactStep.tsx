import { TextField } from "@/components/forms/Field";
import type { WizardValues } from "../wizard-types";

type Props = { values: WizardValues; update: (patch: Partial<WizardValues>) => void; errors?: Partial<Record<"name" | "phone" | "email", string>> };

export function ContactStep({ values, update, errors = {} }: Props) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <TextField
        id="wizard-name"
        label="Full name"
        autoComplete="name"
        required
        value={values.name}
        error={errors.name}
        onChange={(e) => update({ name: e.target.value })}
        className="sm:col-span-2"
      />
      <TextField
        id="wizard-phone"
        label="Phone number"
        type="tel"
        autoComplete="tel"
        inputMode="tel"
        required
        value={values.phone}
        error={errors.phone}
        onChange={(e) => update({ phone: e.target.value })}
      />
      <TextField
        id="wizard-email"
        label="Email"
        type="email"
        autoComplete="email"
        optional
        value={values.email}
        error={errors.email}
        onChange={(e) => update({ email: e.target.value })}
      />
    </div>
  );
}
