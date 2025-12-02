// Google Apps Script to handle petition signature submissions and visitor tracking
// Add this script to your Google Sheet

function doGet(e) {
  try {
    const action = e.parameter.action;

    if (action === 'getSignatureCount') {
      return handleGetSignatureCount(e);
    }

    if (action === 'getVisitorCount') {
      return handleGetVisitorCount(e);
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Invalid action'
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    // Check if this is a visitor logging request
    const action = e.parameter.action;

    if (action === 'logVisitor') {
      return handleVisitorLog(e);
    }

    if (action === 'getVisitorCount') {
      return handleGetVisitorCount(e);
    }

    if (action === 'getSignatureCount') {
      return handleGetSignatureCount(e);
    }

    // Otherwise, handle signature submission
    return handleSignature(e);

  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function handleSignature(e) {
  try {
    // Get the parameters from the POST request
    const name = e.parameter.name;
    const email = e.parameter.email;
    const category = e.parameter.category;
    const timestamp = e.parameter.timestamp;

    // Validate required fields
    if (!name || !email || !category || !timestamp) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Missing required fields'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Get the active sheet (signed sheet)
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName('signed') || spreadsheet.getActiveSheet();

    // Append the new row with data
    sheet.appendRow([name, email, category, timestamp]);

    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Signature added successfully'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function handleVisitorLog(e) {
  try {
    const timestamp = e.parameter.timestamp;

    if (!timestamp) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Missing timestamp'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Get or create Visitors sheet
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let visitorsSheet = spreadsheet.getSheetByName('Visitors');

    if (!visitorsSheet) {
      // Create new sheet if it doesn't exist
      visitorsSheet = spreadsheet.insertSheet('Visitors', 0);
      // Add header
      visitorsSheet.appendRow(['Timestamp']);
    }

    // Append visitor record
    visitorsSheet.appendRow([timestamp]);

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Visitor logged successfully'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function handleGetVisitorCount(e) {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let visitorsSheet = spreadsheet.getSheetByName('Visitors');

    let count = 0;
    if (visitorsSheet) {
      // Count all rows minus the header row
      count = Math.max(0, visitorsSheet.getLastRow() - 1);
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      count: count
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      count: 0,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function handleGetSignatureCount(e) {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const signaturesSheet = spreadsheet.getSheetByName('signed');

    let studentCount = 0;
    let alumniCount = 0;
    let publicCount = 0;
    let total = 0;

    if (!signaturesSheet) {
      // Sheet not found, try to get all sheet names for debugging
      const allSheets = spreadsheet.getSheets();
      const sheetNames = allSheets.map(s => s.getName());
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Sheet "signed" not found. Available sheets: ' + sheetNames.join(', ')
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const lastRow = signaturesSheet.getLastRow();

    if (lastRow <= 1) {
      // No data rows
      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        students: 0,
        alumni: 0,
        public: 0,
        total: 0
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Get all data (skip header row)
    const data = signaturesSheet.getRange(2, 1, lastRow - 1, 4).getValues();

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      // Row structure: [Name, Email, Category, Timestamp]
      const category = row[2]; // Category is in column 3 (0-indexed: column 2)

      if (category) {
        const categoryLower = category.toString().toLowerCase().trim();
        if (categoryLower === 'student') {
          studentCount++;
        } else if (categoryLower === 'alumni') {
          alumniCount++;
        } else if (categoryLower === 'public') {
          publicCount++;
        }
        total++;
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      students: studentCount,
      alumni: alumniCount,
      public: publicCount,
      total: total
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      students: 0,
      alumni: 0,
      public: 0,
      total: 0,
      message: 'Error: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
