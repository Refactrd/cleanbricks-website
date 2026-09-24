"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitEnquiry } from "@/app/actions";
import { frequencyOptions, propertyOptions, serviceOptions, type EnquiryKind, type FormState } from "@/lib/forms";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SelectField, TextAreaField, TextField } from "./Field";

const initial: FormState = { status: "idle" };

export function EnquiryForm({ kind }: { kind: EnquiryKind }) {
  const [state, action, pending] = useActionState(submitEnquiry, initial);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const booking = kind === "booking";
  const e = state.errors ?? {};
  const v = state.values ?? {};

  // Move focus to the first invalid field, or to the confirmation message.
  useEffect(() => {
    if (state.status === "error") {
      formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    } else if (state.status === "success") {
      successRef.current?.focus();
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="rounded-3xl bg-mint p-8 text-center sm:p-12">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-brand text-ink">
          <Icon name="check" className="size-8" />
        </span>
        <h2 className="mt-6 font-display text-3xl font-bold tracking-tight">
          {booking ? "Thanks, your request is in." : "Thanks, we have your message."}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-lg leading-relaxed text-ink/75">
          {booking
            ? "We will get back to you to confirm your date and the details of your clean."
            : "We will get back to you as soon as we can."}
        </p>
      </div>
    );
  }

  return (
    // key resets uncontrolled inputs to the values the server sent back after an error
    <form ref={formRef} action={action} noValidate key={state.status === "error" ? "err" : "new"} className="grid gap-5 sm:grid-cols-2">
      <input type="hidden" name="kind" value={kind} />
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-2xl bg-sun/20 px-4 py-3 text-sm font-medium sm:col-span-2">
          {state.message}
        </p>
      )}

      <TextField id="name" label="Full name" autoComplete="name" required defaultValue={v.name} error={e.name} />
      <TextField id="phone" label="Phone number" type="tel" autoComplete="tel" inputMode="tel" required defaultValue={v.phone} error={e.phone} />
      <TextField id="email" label="Email" type="email" autoComplete="email" optional defaultValue={v.email} error={e.email} className={booking ? "" : "sm:col-span-2"} />

      {booking ? (
        <>
          <SelectField id="service" label="Service" required options={serviceOptions} defaultValue={v.service} error={e.service} />
          <SelectField id="propertyType" label="Property type" optional options={propertyOptions} defaultValue={v.propertyType} />
          <TextField id="location" label="Location in Lagos" autoComplete="address-level2" placeholder="Area or neighbourhood" required defaultValue={v.location} error={e.location} />
          <TextField id="date" label="Preferred date" type="date" required defaultValue={v.date} error={e.date} />
          <SelectField id="frequency" label="How often?" optional options={frequencyOptions} defaultValue={v.frequency} className="sm:col-span-2" />
          <TextAreaField id="message" label="Anything we should know?" optional placeholder="Size of the space, access, special requests…" defaultValue={v.message} className="sm:col-span-2" />
        </>
      ) : (
        <>
          <SelectField id="service" label="Service" optional options={serviceOptions} defaultValue={v.service} />
          <TextField id="location" label="Location" optional autoComplete="address-level2" defaultValue={v.location} />
          <TextField id="date" label="Preferred date" type="date" optional defaultValue={v.date} className="sm:col-span-2" />
          <TextAreaField id="message" label="Message" required placeholder="Tell us how we can help" defaultValue={v.message} error={e.message} className="sm:col-span-2" />
        </>
      )}

      <div className="sm:col-span-2">
        <Button type="submit" arrow disabled={pending} className="w-full sm:w-auto">
          {pending ? "Sending…" : booking ? "Request a Booking" : "Send Message"}
        </Button>
        <p className="mt-3 text-sm text-ink/75">We only use your details to respond to your request.</p>
      </div>
    </form>
  );
}
