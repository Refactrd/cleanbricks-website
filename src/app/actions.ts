"use server";

import type { EnquiryKind, FormState } from "@/lib/forms";
import { enquiryHtml, enquirySubject, enquiryText } from "@/lib/enquiry";
import { fieldNames, lagosLgas } from "@/lib/forms";
import { calculateQuote } from "@/lib/pricing-engine/calculate";
import { formatQuoteText } from "@/lib/pricing-engine/format";
import { parseBookingConfig } from "@/lib/pricing-engine/parse";
import { site } from "@/lib/site";

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
    if (!values.area) errors.area = "Tell us your exact street address.";
    if (!values.date) errors.date = "Pick a preferred date.";
    if (!values.timeSlot) errors.timeSlot = "Pick a preferred time.";
  } else if (values.message.length < 5) {
    errors.message = "Add a short message so we know how to help.";
  }

  // The home-cleaning calculator (Light/Standard/Deep) submits a structured
  // pricingConfigJson instead of a plain LGA. Recompute the price here —
  // authoritatively, never trusting whatever total the browser displayed —
  // and use that same recalculation to check the address is serviceable.
  if (values.pricingConfigJson) {
    const config = (() => {
      try {
        const envelope = JSON.parse(values.pricingConfigJson);
        return parseBookingConfig(envelope?.config ?? envelope);
      } catch {
        return null;
      }
    })();
    if (!config) {
      errors.location = "Something went wrong with your price configuration. Please reselect your rooms and try again.";
    } else if (!config.zoneId) {
      errors.location = config.addressUnavailable
        ? "We don't currently serve this location. Please message us on WhatsApp and we'll confirm what's possible."
        : "Choose your address so we can confirm coverage and the location fee.";
    } else {
      values.pricingSummary = formatQuoteText(calculateQuote(config), values.location || undefined);
    }
  } else if (!values.location) {
    if (kind === "booking") errors.location = "Choose the local government area.";
  } else if (!(lagosLgas as readonly string[]).includes(values.location)) {
    errors.location = "Choose a local government area from the list.";
  }

  if (Object.keys(errors).length) {
    return { status: "error", errors, values, message: "Please check the highlighted fields." };
  }

  const resendKey = process.env.RESEND_API_KEY;
  const webhook = process.env.ENQUIRY_WEBHOOK_URL;

  if (!resendKey && !webhook) {
    if (process.env.NODE_ENV === "production") {
      console.error("Neither RESEND_API_KEY nor ENQUIRY_WEBHOOK_URL is set: enquiry was not delivered.");
      return {
        status: "error",
        values,
        message: "Online requests are not switched on yet. Please message us on WhatsApp and we will help.",
      };
    }
    console.info("[enquiry:dev]", kind, values);
    return { status: "success" };
  }

  // Google Sheet log (Apps Script webhook). Best-effort: never blocks the customer.
  const logToSheet = webhook
    ? fetch(webhook, {
        method: "POST",
        headers: { "content-type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ kind, ...values, receivedAt: new Date().toISOString() }),
      })
        .then((r) => {
          if (!r.ok) throw new Error(`Sheet webhook responded ${r.status}`);
          return true;
        })
        .catch((err) => {
          console.error("Enquiry sheet log failed", err);
          return false;
        })
    : Promise.resolve(false);

  // Email via Resend: the team notification.
  const sendEmail = resendKey
    ? fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${resendKey}` },
        body: JSON.stringify({
          from: process.env.ENQUIRY_FROM_EMAIL ?? "CleanBricks <onboarding@resend.dev>",
          to: [process.env.ENQUIRY_TO_EMAIL ?? site.contact.email],
          ...(values.email && { reply_to: values.email }),
          subject: enquirySubject(kind, values),
          html: enquiryHtml(kind, values),
          text: enquiryText(kind, values),
        }),
      })
        .then((r) => {
          if (!r.ok) throw new Error(`Resend responded ${r.status}`);
          return true;
        })
        .catch((err) => {
          console.error("Enquiry email failed", err);
          return false;
        })
    : Promise.resolve(false);

  const [sheetOk, emailOk] = await Promise.all([logToSheet, sendEmail]);
  // The request counts as received if at least one channel captured it.
  if (emailOk || sheetOk) return { status: "success" };

  return { status: "error", values, message: "Something went wrong sending that. Please try again, or message us on WhatsApp." };
}
