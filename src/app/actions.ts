"use server";

import type { EnquiryKind, FormState } from "@/lib/forms";
import { fieldNames } from "@/lib/forms";

const PHONE = /^\+?[\d\s\-()]{7,20}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitEnquiry(_prev: FormState, formData: FormData): Promise<FormState> {
  // Honeypot: real visitors never fill this in.
  if (String(formData.get("company") ?? "").trim() !== "") return { status: "success" };

  const kind: EnquiryKind = formData.get("kind") === "booking" ? "booking" : "contact";
  const values: Record<string, string> = {};
  for (const f of fieldNames) values[f] = String(formData.get(f) ?? "").trim().slice(0, 2000);

  const errors: Record<string, string> = {};
  if (values.name.length < 2) errors.name = "Please tell us your name.";
  if (!PHONE.test(values.phone)) errors.phone = "Enter a phone number we can reach you on.";
  if (values.email && !EMAIL.test(values.email)) errors.email = "That email address does not look right.";
  if (kind === "booking") {
    if (!values.service) errors.service = "Choose the service you need.";
    if (!values.location) errors.location = "Tell us where the clean is.";
    if (!values.date) errors.date = "Pick a preferred date.";
  } else if (values.message.length < 5) {
    errors.message = "Add a short message so we know how to help.";
  }

  if (Object.keys(errors).length) {
    return { status: "error", errors, values, message: "Please check the highlighted fields." };
  }

  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (!webhook) {
    if (process.env.NODE_ENV === "production") {
      console.error("ENQUIRY_WEBHOOK_URL is not set: enquiry was not delivered.");
      return {
        status: "error",
        values,
        message: "Online requests are not switched on yet. Please contact us directly and we will help.",
      };
    }
    console.info("[enquiry:dev]", kind, values);
    return { status: "success" };
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ kind, ...values, receivedAt: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return { status: "success" };
  } catch (err) {
    console.error("Enquiry delivery failed", err);
    return { status: "error", values, message: "Something went wrong sending that. Please try again in a moment." };
  }
}
