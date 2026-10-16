/**
 * Contact form receiver for the portfolio site — paste into the Google Sheet's
 * Extensions → Apps Script editor (setup steps in the README, "Contact form").
 *
 * For every message it:
 *   1. adds a row to the "Messages" sheet (Received, Name, Email, Message, Page)
 *   2. emails it to NOTIFY_EMAIL, with Reply-To set to the sender
 *
 * Script properties (Project Settings → Script properties):
 *   SECRET        same value as CONTACT_WEBHOOK_SECRET in Vercel
 *   NOTIFY_EMAIL  where messages are emailed, e.g. cdstudios111@gmail.com
 */

const SHEET_NAME = "Messages";

function doPost(e) {
  const props = PropertiesService.getScriptProperties();
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return reply({ ok: false, error: "bad-json" });
  }
  if (!data.secret || data.secret !== props.getProperty("SECRET")) {
    return reply({ ok: false, error: "unauthorized" });
  }

  const name = String(data.name || "").slice(0, 200);
  const email = String(data.email || "").slice(0, 320);
  const message = String(data.message || "").slice(0, 5000);
  const page = String(data.page || "").slice(0, 300);

  const sheet = getSheet();
  // Leading apostrophes stop Sheets from treating text like "=SUM(...)" as a formula.
  sheet.appendRow([new Date(), safe(name), safe(email), safe(message), safe(page)]);

  const to = props.getProperty("NOTIFY_EMAIL");
  if (to) {
    MailApp.sendEmail({
      to: to,
      replyTo: email,
      subject: "Website inquiry from " + name,
      body: message + "\n\n— " + name + " <" + email + ">\nSent from " + page,
    });
  }
  return reply({ ok: true });
}

function getSheet() {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = book.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = book.insertSheet(SHEET_NAME);
    sheet.appendRow(["Received", "Name", "Email", "Message", "Page"]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function safe(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function reply(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
