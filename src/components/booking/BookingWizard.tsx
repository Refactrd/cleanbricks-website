"use client";

import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { submitEnquiry } from "@/app/actions";
import type { FormState } from "@/lib/forms";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { calculateQuote } from "@/lib/pricing-engine/calculate";
import { formatQuoteText } from "@/lib/pricing-engine/format";
import { OrderSummary } from "./OrderSummary";
import { ProgressBar } from "./ProgressBar";
import { WizardHeader } from "./WizardHeader";
import { ContactStep } from "./steps/ContactStep";
import { DetailsStep } from "./steps/DetailsStep";
import { ExtrasStep } from "./steps/ExtrasStep";
import { LocationStep } from "./steps/LocationStep";
import { ScheduleStep } from "./steps/ScheduleStep";
import { ServiceStep } from "./steps/ServiceStep";
import { SpaceStep } from "./steps/SpaceStep";
import { SummaryStep } from "./steps/SummaryStep";
import { initialWizardValues, stepForField, stepsFor, stepTitles, type StepId, type WizardValues } from "./wizard-types";

const initialState: FormState = { status: "idle" };

const stepHelp: Partial<Record<StepId, string>> = {
  service: "Pick what you need. You can always change your mind.",
  space: "1 bedroom, 1 bathroom, 1 living room and 1 kitchen are included. Add more of any space below.",
  extras: "Optional — leave anything at 0 you don't need.",
  location: "Your exact street address, plus the area, so we can find you and work out coverage.",
  schedule: "Tell us when works best. We'll confirm the exact time with you.",
  contact: "So we can confirm your booking and reach you if anything changes.",
  summary: "Check everything looks right before you send it.",
};

function isValidPhone(v: string) {
  return /^\+?[\d\s\-()]{7,20}$/.test(v);
}

export function BookingWizard() {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);
  const [values, setValues] = useState<WizardValues>(initialWizardValues);
  const [stepIndex, setStepIndex] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const steps = useMemo(() => stepsFor(values), [values]);
  const stepId = steps[Math.min(stepIndex, steps.length - 1)];

  const update = (patch: Partial<WizardValues>) => setValues((v) => ({ ...v, ...patch }));

  const quote = values.cleaningType
    ? calculateQuote({
        cleaningType: values.cleaningType,
        property: values.property,
        extras: values.extras,
        zoneId: values.zoneId,
        addressUnavailable: values.addressUnavailable,
      })
    : null;
  const pricingConfigJson = values.cleaningType
    ? JSON.stringify({
        config: {
          cleaningType: values.cleaningType,
          property: values.property,
          extras: values.extras,
          zoneId: values.zoneId,
          addressUnavailable: values.addressUnavailable,
        },
        addressLabel: values.addressLabel,
      })
    : "";
  const pricingSummary = quote ? formatQuoteText(quote, values.addressLabel || undefined) : "";

  // On a validation error, jump back to whichever step the bad field lives on.
  useEffect(() => {
    if (state.status !== "error" || !state.errors) return;
    const t = setTimeout(() => {
      const firstField = Object.keys(state.errors ?? {}).find((f) => stepForField[f]);
      if (!firstField) return;
      const idx = steps.indexOf(stepForField[firstField]);
      if (idx >= 0) setStepIndex(idx);
    }, 0);
    return () => clearTimeout(t);
    // steps/stepIndex deliberately excluded: this should only react to a fresh error, not step navigation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
    else headingRef.current?.focus();
  }, [stepIndex, state.status]);

  if (state.status === "success") {
    return (
      <div className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center px-4 py-16 text-center">
        <div ref={successRef} tabIndex={-1} role="status">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-brand text-ink">
            <Icon name="check" className="size-8" />
          </span>
          <h1 className="mt-6 font-display text-3xl font-bold tracking-tight">Thanks, your request is in.</h1>
          <p className="mx-auto mt-3 max-w-md text-lg leading-relaxed text-ink/75">
            We will get back to you to confirm your date and the details of your clean.
          </p>
          <Button href="/" arrow className="mt-8">
            Back to CleanBricks
          </Button>
        </div>
      </div>
    );
  }

  const canAdvance = (() => {
    switch (stepId) {
      case "service":
        return values.service !== "";
      case "location": {
        const hasStreet = values.street.trim() !== "";
        const hasArea = values.cleaningType ? !!values.zoneId : values.addressLabel.trim() !== "";
        return hasStreet && hasArea;
      }
      case "schedule":
        return values.date !== "" && values.timeSlot !== "";
      case "contact":
        return values.name.trim().length >= 2 && isValidPhone(values.phone);
      default:
        return true;
    }
  })();

  const goBack = () => setStepIndex((i) => Math.max(0, i - 1));
  const goNext = () => setStepIndex((i) => Math.min(steps.length - 1, i + 1));

  const errors = state.errors ?? {};
  const isLastStep = stepIndex === steps.length - 1;

  // Step 1 has nothing to price yet, so it runs full width — the order summary only
  // joins from step 2 once there is something to show, matching the reference flow.
  const showSummary = stepId !== "service";

  const stepContent = (
    <>
      {state.status === "error" && state.message && (
        <p role="alert" className="mb-5 rounded-2xl bg-sun/20 px-4 py-3 text-sm font-medium">
          {state.message}
        </p>
      )}
      <h1 ref={headingRef} tabIndex={-1} className="font-display text-2xl leading-tight font-bold tracking-tight sm:text-3xl">
        {stepTitles[stepId]}
      </h1>
      {stepHelp[stepId] && <p className="mt-2 text-sm text-ink/75">{stepHelp[stepId]}</p>}

      <div className="mt-6">
        {stepId === "service" && <ServiceStep values={values} update={update} />}
        {stepId === "space" && <SpaceStep values={values} update={update} />}
        {stepId === "extras" && <ExtrasStep values={values} update={update} />}
        {stepId === "details" && <DetailsStep values={values} update={update} />}
        {stepId === "location" && <LocationStep values={values} update={update} streetError={errors.area} />}
        {stepId === "schedule" && <ScheduleStep values={values} update={update} errors={{ date: errors.date, timeSlot: errors.timeSlot }} />}
        {stepId === "contact" && <ContactStep values={values} update={update} errors={{ name: errors.name, phone: errors.phone, email: errors.email }} />}
        {stepId === "summary" && (
          <SummaryStep
            values={values}
            update={update}
            pricingConfigJson={pricingConfigJson}
            pricingSummary={pricingSummary}
            formAction={formAction}
            pending={pending}
            messageError={errors.message}
          />
        )}
      </div>
    </>
  );

  return (
    <div className="min-h-dvh pt-[var(--nav-h)]">
      <WizardHeader onBack={stepIndex > 0 ? goBack : undefined} />

      <div aria-hidden="true" className="relative mx-4 mt-4 h-16 overflow-hidden rounded-3xl bg-mint sm:mx-6 sm:h-20">
        <span className="absolute top-4 left-8 size-3 rounded-full bg-sun sm:top-5 sm:left-16" />
        <span className="absolute -right-6 -bottom-8 size-24 rounded-[2rem] bg-lime/50 sm:size-28" />
        <span className="absolute top-1/2 left-1/3 size-2 -translate-y-1/2 rounded-full bg-brand/60" />
      </div>

      <div className="mx-auto max-w-3xl px-4 pt-6 sm:px-6">
        <ProgressBar total={steps.length} current={stepIndex} />
      </div>

      {showSummary ? (
        <div className="mx-auto grid max-w-6xl gap-8 px-4 pt-8 pb-32 sm:px-6 xl:grid-cols-[1fr_22rem] xl:items-start xl:gap-12">
          <div className="xl:order-2 xl:sticky xl:top-8">
            <OrderSummary values={values} />
          </div>
          <div className="xl:order-1">{stepContent}</div>
        </div>
      ) : (
        <div className="mx-auto max-w-3xl px-4 pt-8 pb-32 sm:px-6">{stepContent}</div>
      )}

      {!isLastStep && (
        <div className="fixed inset-x-0 bottom-0 border-t border-ink/10 bg-paper/95 backdrop-blur-sm">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <Button type="button" variant="outline" onClick={goBack} disabled={stepIndex === 0} className={stepIndex === 0 ? "invisible" : ""}>
              Back
            </Button>
            <Button type="button" onClick={goNext} disabled={!canAdvance} arrow>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
