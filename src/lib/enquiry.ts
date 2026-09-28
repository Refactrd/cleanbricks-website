import type { EnquiryKind } from "./forms";

const labels: Record<string, string> = {
  name: "Name",
  phone: "Phone",
  email: "Email",
  service: "Service",
  propertyType: "Property type",
  location: "Location",
  area: "Street address",
  date: "Preferred date",
  timeSlot: "Preferred time",
  frequency: "Frequency",
  message: "Message",
};

export type EnquiryValues = Record<string, string>;

// pricingConfigJson is machine-readable only (used to recompute the authoritative
// price) and never shown to a human, so it's deliberately excluded from `labels`.
const filled = (v: EnquiryValues) => Object.keys(labels).filter((k) => v[k]);

/** Plain-text summary, used for the email body and the WhatsApp message. */
export function enquiryText(kind: EnquiryKind, v: EnquiryValues) {
  const head = kind === "booking" ? "Hello CleanBricks, I'd like to book a cleaning." : "Hello CleanBricks, I have an enquiry.";
  const rows = filled(v).map((k) => `${labels[k]}: ${v[k]}`);
  const lines = [head, "", ...rows];
  if (v.pricingSummary) lines.push("", "Price estimate:", v.pricingSummary);
  return lines.join("\n");
}

export function enquirySubject(kind: EnquiryKind, v: EnquiryValues) {
  return kind === "booking"
    ? `New booking request: ${v.service || "cleaning"} (${v.name})`
    : `New enquiry from ${v.name}`;
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function enquiryHtml(kind: EnquiryKind, v: EnquiryValues) {
  const rows = filled(v)
    .map(
      (k) =>
        `<tr><td style="padding:8px 16px 8px 0;color:#6b7280;vertical-align:top;white-space:nowrap">${labels[k]}</td><td style="padding:8px 0;color:#1F2937;white-space:pre-wrap">${esc(v[k])}</td></tr>`,
    )
    .join("");
  const pricing = v.pricingSummary
    ? `<h3 style="color:#1F2937;margin:20px 0 8px;font-size:15px">Price estimate</h3>
<pre style="font-family:Arial,sans-serif;font-size:14px;color:#1F2937;white-space:pre-wrap;margin:0;background:#E3F5E9;border-radius:12px;padding:12px 16px">${esc(v.pricingSummary)}</pre>`
    : "";
  return `<div style="font-family:Arial,sans-serif;max-width:560px">
<h2 style="color:#1F2937;margin:0 0 4px">${kind === "booking" ? "New booking request" : "New enquiry"}</h2>
<p style="color:#6b7280;margin:0 0 16px">Submitted on the CleanBricks website.</p>
<table style="border-collapse:collapse;font-size:15px">${rows}</table>${pricing}</div>`;
}
