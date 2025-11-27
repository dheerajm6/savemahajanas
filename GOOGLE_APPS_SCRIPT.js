// Google Apps Script to handle petition signature submissions
// Add this script to your Google Sheet

function doPost(e) {
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

    // Get the active sheet
    const sheet = SpreadsheetApp.getActiveSheet();

    // Append the new row with data
    sheet.appendRow([name, email, category, timestamp]);

    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Signature added successfully'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
