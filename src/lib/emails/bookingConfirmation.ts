import { naira, summariseExtras, summariseProperty } from "@/lib/pricing-engine/format";
import type { BookingConfig, QuoteBreakdown } from "@/lib/pricing-engine/types";
import { phoneHref, site, whatsappHref } from "@/lib/site";

/**
 * The customer-facing booking confirmation — distinct from the team
 * notification in src/lib/enquiry.ts, which is written for staff, not the
 * person who just booked. Table-based layout so it holds up in Outlook,
 * inline styles throughout since email clients strip <style> blocks.
 */

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const firstName = (name: string) => name.trim().split(/\s+/)[0] || "there";

export function bookingConfirmationSubject(values: Record<string, string>): string {
  return `We've got your booking, ${firstName(values.name)}`;
}

type Row = [label: string, value: string];

function summaryRows(values: Record<string, string>, config: BookingConfig | null): Row[] {
  const rows: Row[] = [["Service", values.service]];
  if (config) {
    // Only present for the three priced tiers — short-let/commercial/etc. don't have room-level detail.
    const space = summariseProperty(config.property);
    const extras = summariseExtras(config.extras);
    if (space) rows.push(["Space", space]);
    if (extras) rows.push(["Extra tasks", extras]);
  }
  rows.push(
    ["Street address", values.area],
    ["Area", values.location],
    ["Preferred date", values.date],
    ["Preferred time", values.timeSlot],
    ["Frequency", values.frequency],
    ["Property type", values.propertyType],
    ["Anything we should know", values.message],
  );
  return rows.filter(([, v]) => v);
}

function htmlRows(rows: Row[]): string {
  return rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:7px 0;color:#6b7280;font-size:14px;vertical-align:top;white-space:nowrap">${esc(label)}</td><td style="padding:7px 0 7px 16px;color:#1F2937;font-size:14px;font-weight:600;text-align:right;white-space:pre-wrap">${esc(value)}</td></tr>`,
    )
    .join("");
}

function priceBlockHtml(quote: QuoteBreakdown | null): string {
  if (!quote) return "";
  const lines = [...quote.propertyLines, ...quote.extraLines];
  const lineRows = lines
    .map(
      (l) =>
        `<tr><td style="padding:5px 0;color:#4b5563;font-size:13px;">${esc(l.label)}</td><td style="padding:5px 0;color:#4b5563;font-size:13px;text-align:right;">${naira(l.amount)}</td></tr>`,
    )
    .join("");
  const locationRow = quote.zoneName
    ? `<tr><td style="padding:5px 0;color:#4b5563;font-size:13px;">Location fee (${esc(quote.zoneName)})</td><td style="padding:5px 0;color:#4b5563;font-size:13px;text-align:right;">${naira(quote.locationFee)}</td></tr>`
    : "";
  return `
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;border-top:1px solid #e5e7eb;padding-top:16px;">
          <tr><td style="padding:5px 0;color:#4b5563;font-size:13px;">Base (1 bed, 1 bath, 1 living room, 1 kitchen)</td><td style="padding:5px 0;color:#4b5563;font-size:13px;text-align:right;">${naira(quote.base)}</td></tr>
          ${lineRows}
          ${locationRow}
        </table>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;border-top:1px solid #e5e7eb;padding-top:12px;">
          <tr>
            <td style="font-family:Georgia,serif;font-size:15px;font-weight:700;color:#1F2937;">Estimated total</td>
            <td style="font-family:Georgia,serif;font-size:22px;font-weight:700;color:#1F2937;text-align:right;">${naira(quote.total)}</td>
          </tr>
        </table>`;
}

export function bookingConfirmationHtml(values: Record<string, string>, config: BookingConfig | null, quote: QuoteBreakdown | null): string {
  const wa = site.contact.whatsapp;
  const waLink = wa ? whatsappHref(wa, `Hello CleanBricks, I just booked ${values.service || "a cleaning"} and wanted to check in.`) : undefined;
  const name = firstName(values.name);
  const rows = summaryRows(values, config);

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#F8FAF7;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAF7;padding:32px 12px;font-family:Arial,Helvetica,sans-serif;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:20px;overflow:hidden;">
            <tr>
              <td style="background:#E3F5E9;padding:28px 32px;text-align:center;">
                <div style="font-size:22px;font-weight:800;color:#1F2937;letter-spacing:-0.02em;">
                  <span style="color:#10B981;">Clean</span>Bricks
                </div>
                <div style="margin-top:6px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#1F2937;opacity:0.55;">
                  Cleaner spaces. Better living.
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 32px 4px;">
                <h1 style="margin:0;font-size:21px;line-height:1.35;color:#1F2937;">Thanks, ${esc(name)} — we&rsquo;ve got your request.</h1>
                <p style="margin:14px 0 0;font-size:15px;line-height:1.65;color:#4b5563;">
                  We&rsquo;re looking over the details below now.${
                    wa ? ` We&rsquo;ll be in touch on <strong>WhatsApp</strong> shortly, on <a href="${waLink}" style="color:#10B981;text-decoration:none;font-weight:600;">${esc(wa)}</a>, to confirm everything before it&rsquo;s final.` : ""
                  }
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAF7;border-radius:16px;">
                  <tr>
                    <td style="padding:22px 24px;">
                      <div style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#6b7280;margin-bottom:10px;">Your booking</div>
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${htmlRows(rows)}</table>
                      ${priceBlockHtml(quote)}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            ${
              waLink
                ? `<tr>
              <td style="padding:20px 32px 32px;text-align:center;">
                <a href="${waLink}" style="display:inline-block;background:#10B981;color:#1F2937;text-decoration:none;font-weight:700;font-size:15px;padding:14px 30px;border-radius:999px;">Chat with us on WhatsApp</a>
              </td>
            </tr>`
                : `<tr><td style="padding:8px 32px 32px;"></td></tr>`
            }
            <tr>
              <td style="background:#1F2937;padding:24px 32px;text-align:center;">
                <div style="color:#F8FAF7;font-size:13px;font-weight:600;">CleanBricks &middot; Lagos, Nigeria</div>
                <div style="margin-top:6px;color:#9CA3AF;font-size:12px;">
                  ${site.contact.phone ? `<a href="${phoneHref(site.contact.phone)}" style="color:#9CA3AF;text-decoration:none;">${esc(site.contact.phone)}</a> &middot; ` : ""}${site.contact.email ? `<a href="mailto:${site.contact.email}" style="color:#9CA3AF;text-decoration:none;">${esc(site.contact.email)}</a>` : ""}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function bookingConfirmationText(values: Record<string, string>, config: BookingConfig | null, quote: QuoteBreakdown | null): string {
  const wa = site.contact.whatsapp;
  const lines = [
    `Thanks, ${firstName(values.name)} — we've got your request.`,
    "",
    "We're looking over the details below now." + (wa ? ` We'll be in touch on WhatsApp shortly, on ${wa}, to confirm everything before it's final.` : ""),
    "",
    "Your booking:",
    ...summaryRows(values, config).map(([label, value]) => `${label}: ${value}`),
  ];
  if (quote) {
    lines.push("", `Estimated total: ${naira(quote.total)}`);
  }
  lines.push("", "CleanBricks · Lagos, Nigeria", [site.contact.phone, site.contact.email].filter(Boolean).join(" · "));
  return lines.join("\n");
}
