# Google Sheets Integration Setup Guide

This guide explains how to set up Google Sheets to automatically store all petition signatures (Name, Email, Category, Timestamp).

## Prerequisites

You need:
- A Google Account
- Google Cloud Console access
- The ability to create and share Google Sheets

## Step-by-Step Setup

### 1. Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click "Create a new spreadsheet"
3. Name it something like "SBRR Mahajans Petition Signatures"
4. Add column headers in the first row:
   - A1: `Name`
   - B1: `Email`
   - C1: `Category`
   - D1: `Timestamp`
5. Save the sheet and note the **Sheet ID** from the URL
   - URL format: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`

### 2. Enable Google Sheets API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select an existing one)
3. Search for "Google Sheets API" in the search bar
4. Click "Enable"
5. On the credentials page, click "Create Credentials"
6. Choose "API Key"
7. Copy the API Key and save it securely

### 3. Set Environment Variables

Add these to your `.env.local` file in the project root:

```env
GOOGLE_SHEET_ID=your_sheet_id_here
GOOGLE_API_KEY=your_api_key_here
```

Replace:
- `your_sheet_id_here` with the Sheet ID from Step 1
- `your_api_key_here` with the API Key from Step 2

### 4. Make the Google Sheet Public (or Configure Sharing)

1. Open your Google Sheet
2. Click "Share" in the top right
3. Change sharing settings to allow the API key to write data
   - Set to "Anyone with the link can edit" OR
   - Share with a specific service account email

### 5. Test the Integration

1. Restart your development server: `npm run dev`
2. Fill out the petition form with:
   - Name: Test User
   - Email: test@example.com
   - Category: Student
3. Submit the form
4. Check your Google Sheet - you should see a new row with the data!

## Troubleshooting

### "Google Sheets not configured" Error
- Check that `.env.local` file has both `GOOGLE_SHEET_ID` and `GOOGLE_API_KEY`
- Make sure the API Key is correct
- Verify the Sheet ID is correct (from the URL)

### "Failed to sync with Google Sheets" Warning
- This is normal if Google Sheets API is not configured
- Data is still saved locally in browser storage
- The data will sync once API credentials are properly configured

### API Not Writing to Sheet
- Verify the Google Sheets API is enabled in Google Cloud Console
- Check that your API Key has permission to write to the sheet
- Ensure the sheet name in the API call matches your actual sheet

### Sheet ID Not Working
- Make sure you're using the ID from the URL, not the name
- The ID is the long string between `/d/` and `/edit`

## Data Flow

1. User fills out petition form
2. Data is submitted to `/api/signatures` endpoint
3. API endpoint receives: Name, Email, Category, Timestamp
4. API validates the data
5. If Google Sheets is configured:
   - Data is appended to Google Sheet
   - New row is created with all information
6. Data is saved to browser localStorage
7. User confirmation message is shown
8. Wall of Support updates (shows name only, not email)

## Important Security Notes

⚠️ **Email Security:**
- Emails are stored in Google Sheets but NEVER displayed publicly on the website
- Email IDs are kept private and only visible to sheet admins
- Email addresses are used for internal records only

⚠️ **API Key Security:**
- Keep your `GOOGLE_API_KEY` secret and never commit it to Git
- The `.env.local` file is in `.gitignore` to protect it
- If you accidentally expose your API key, regenerate it immediately in Google Cloud Console

⚠️ **Data Privacy:**
- Google Sheets data is only accessible to people with sheet access
- Consider restricting sheet access to authorized team members only
- Make regular backups of the Google Sheet

## Monitoring Signatures

1. Open your Google Sheet
2. You'll see all submissions in chronological order
3. Column breakdown:
   - **A (Name):** Signer's full name (displayed on website)
   - **B (Email):** Signer's email (private, not displayed)
   - **C (Category):** Student / Alumni / Public
   - **D (Timestamp):** Date and time of signature

## Export Data

To download the signature data:
1. Open your Google Sheet
2. Click "File" → "Download" → "CSV" or "Excel"
3. Save to your computer
4. Use for reporting or analysis

---

**Questions?** Refer to the [Google Sheets API Documentation](https://developers.google.com/sheets/api)
