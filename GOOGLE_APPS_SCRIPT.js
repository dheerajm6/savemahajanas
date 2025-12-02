// Google Apps Script to handle petition signature submissions and visitor tracking
// Add this script to your Google Sheet

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

    // Get the active sheet (Signatures sheet)
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName('Signatures') || spreadsheet.getActiveSheet();

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
