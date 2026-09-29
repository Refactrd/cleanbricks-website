import { Button } from "@/components/ui/Button";
import { TextAreaField } from "@/components/forms/Field";
import { summariseExtras, summariseProperty } from "@/lib/pricing-engine/format";
import type { WizardValues } from "../wizard-types";

type Props = {
  values: WizardValues;
  update: (patch: Partial<WizardValues>) => void;
  pricingConfigJson: string;
  pricingSummary: string;
  formAction: (payload: FormData) => void;
  pending: boolean;
  messageError?: string;
};

const row = (label: string, value: string) =>
  value ? (
    <div className="flex justify-between gap-4 border-b border-ink/10 py-2.5 last:border-b-0">
      <dt className="text-ink/75">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  ) : null;

export function SummaryStep({ values, update, pricingConfigJson, pricingSummary, formAction, pending, messageError }: Props) {
  const spaceSummary = values.cleaningType ? summariseProperty(values.property) : "";
  const extrasSummary = values.cleaningType ? summariseExtras(values.extras) : "";

  return (
    <div className="space-y-6">
      <dl className="rounded-2xl bg-mint px-4">
        {row("Service", values.service)}
        {row("Space", spaceSummary)}
        {row("Extra tasks", extrasSummary)}
        {row("Street address", values.street)}
        {row("Area", values.addressLabel)}
        {row("Preferred date", values.date)}
        {row("Preferred time", values.timeSlot)}
        {row("Frequency", values.frequency)}
        {row("Property type", values.propertyType)}
        {row("Name", values.name)}
        {row("Phone", values.phone)}
        {row("Email", values.email)}
      </dl>

      <TextAreaField
        id="wizard-note"
        label="Anything else we should know?"
        optional
        placeholder="Access, special requests, anything that helps…"
        value={values.message}
        onChange={(e) => update({ message: e.target.value })}
        error={messageError}
      />

      {/* The only actual <form> in the wizard: everything above lives in plain wizard state and
          lands here as hidden fields at submit time, reusing the exact contract src/app/actions.ts
          already validates and delivers (email / Sheet / WhatsApp-ready text). */}
      <form action={formAction} noValidate>
        <input type="hidden" name="kind" value="booking" />
        <input type="hidden" name="name" value={values.name} />
        <input type="hidden" name="phone" value={values.phone} />
        <input type="hidden" name="email" value={values.email} />
        <input type="hidden" name="service" value={values.service} />
        <input type="hidden" name="propertyType" value={values.propertyType} />
        <input type="hidden" name="location" value={values.addressLabel} />
        <input type="hidden" name="area" value={values.street} />
        <input type="hidden" name="date" value={values.date} />
        <input type="hidden" name="timeSlot" value={values.timeSlot} />
        <input type="hidden" name="frequency" value={values.frequency} />
        <input type="hidden" name="message" value={values.message} />
        <input type="hidden" name="pricingConfigJson" value={pricingConfigJson} />
        <input type="hidden" name="pricingSummary" value={pricingSummary} />
        <div className="hidden" aria-hidden="true">
          <label>
            Company
            <input type="text" name="company" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <Button type="submit" arrow disabled={pending} className="w-full sm:w-auto">
          {pending ? "Sending…" : "Request a Booking"}
        </Button>
        <p className="mt-3 text-sm text-ink/75">We only use your details to respond to your request.</p>
      </form>
    </div>
  );
}
