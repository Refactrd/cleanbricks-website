/**
 * CleanBricks: log website enquiries to a Google Sheet.
 *
 * Setup:
 * 1. Create a Google Sheet. Open Extensions > Apps Script and paste this file.
 * 2. Deploy > New deployment > type "Web app". Execute as: Me. Who has access: Anyone.
 * 3. Copy the Web app URL into Vercel as ENQUIRY_WEBHOOK_URL and redeploy.
 *
 * Note: "Location" is either a Lagos LGA name (plain contact/booking form) or a
 * full resolved address (Light/Standard/Deep Cleaning's pricing calculator) —
 * whichever the visitor actually used. "Price estimate" is only filled in for
 * the pricing calculator path, and is the server's own recalculated total,
 * never a number taken as-is from the browser.
 */
const HEADERS = ["Received", "Type", "Name", "Phone", "Email", "Service", "Property type", "Location", "Neighbourhood", "Preferred date", "Frequency", "Message", "Price estimate"];

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
  const d = JSON.parse(e.postData.contents);
  sheet.appendRow([
    d.receivedAt, d.kind, d.name, d.phone, d.email, d.service, d.propertyType,
    d.location, d.area, d.date, d.frequency, d.message, d.pricingSummary,
  ]);
  return ContentService.createTextOutput("ok");
}
