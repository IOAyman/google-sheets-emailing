function SendEmails() {
  var TOTAL_ACCEPTED = 50;
  var GO_ROW = 2;
  var GO_COLUMN = 1;

  var TEMPLATE_ID = "";
  var TAG_NAME = "{{NAME}}";

  var EMAIL_SUBJECT = "";
  var EMAIL_FROM_NAME = "";

  var ADMINS = [
    { name: "Ayman Nedjmeddine", email: "ayman@analygital.com" },
  ];


  // select the sheet to send from
  var sheet = SpreadsheetApp.setActiveSheet(SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]);

  // Locate recipients' names & emails
  var recipients = sheet.getRange(GO_ROW, GO_COLUMN, TOTAL_ACCEPTED, 2).getValues()
                        // of course filter out empty email cells!
                        .filter(function (luckyOne) { return luckyOne[1] || false; });

  Logger.log("Number of rows: %s\n\nLucky Ones:\n: %s\n\n", TOTAL_ACCEPTED, recipients.join("\n"));

  // Open email template, get the body section and load the text in it
  var template = DocumentApp.openById(TEMPLATE_ID).getBody().getText();
  // attatchments
  var attachments = [
    // DriveApp.getFileById("").getAs(MimeType.JPEG), // card
    // DriveApp.getFileById("").getAs(MimeType.ZIP), // zip
  ];


  // Send emails
  recipients.forEach(function (luckyOne) {
    var name = luckyOne[0];
    var email = luckyOne[1];
    var message = template.replace(TAG_NAME, name)

    GmailApp.sendEmail(email, EMAIL_SUBJECT, message, {
      // attachments: attachments,
      name: EMAIL_FROM_NAME
    });
    Logger.log("Confirmation email sent to: %s  < %s >", name, email);
  });
};

function onOpen() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [
    { name: "Send Confirmations", functionName: "SendEmails" }
  ];
  spreadsheet.addMenu("Ready?", entries);
};
