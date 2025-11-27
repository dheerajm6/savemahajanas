# Setup Google Sheet Auto-Sync

Your Google Sheet ID has been configured: `1b3LRY7zihWif9r33gAlWqnBYl-TOWVaTAJq-Xv6Qtuo`

To enable automatic syncing of petition signatures to your Google Sheet, follow these steps:

## Step 1: Open Your Google Sheet

1. Go to your Google Sheet: https://docs.google.com/spreadsheets/d/1b3LRY7zihWif9r33gAlWqnBYl-TOWVaTAJq-Xv6Qtuo/edit
2. Make sure the first row has headers:
   - A1: `Name`
   - B1: `Email`
   - C1: `Category`
   - D1: `Timestamp`

## Step 2: Create Google Apps Script

1. In your Google Sheet, click **Tools** → **Script editor**
2. Delete any existing code
3. Copy and paste the script from `GOOGLE_APPS_SCRIPT.js` in this project
4. Click **Save** (Ctrl+S / Cmd+S)
5. Name the project: "Petition Signature Handler"

## Step 3: Deploy the Script

1. Click **Deploy** → **New deployment**
2. Select type: **Web app**
3. Configure as follows:
   - Execute as: (your email)
   - Who has access: **Anyone**
4. Click **Deploy**
5. You'll get a **Deployment ID** - copy and save this

## Step 4: Update Your Configuration

Add the Deployment ID to `.env.local`:

```env
GOOGLE_SHEET_ID=1b3LRY7zihWif9r33gAlWqnBYl-TOWVaTAJq-Xv6Qtuo
GOOGLE_APPS_SCRIPT_DEPLOYMENT_ID=your_deployment_id_here
```

Replace `your_deployment_id_here` with the actual Deployment ID from Step 3.

## Step 5: Update the API Endpoint

The application will now:
1. Collect signature data (Name, Email, Category, Timestamp)
2. Send to your Google Apps Script web app
3. Script automatically appends to your Google Sheet
4. Also saves to browser localStorage for offline access

## Testing

1. Go to your website
2. Fill out the petition form with:
   - Name: Test Name
   - Email: test@example.com
   - Category: Student
3. Click "Sign the Petition"
4. Check your Google Sheet - you should see a new row!

## Troubleshooting

### "No new rows appearing in Google Sheet"
- Make sure you deployed the script as a "Web app"
- Check that "Who has access" is set to "Anyone"
- Make sure the Deployment ID in `.env.local` is correct

### "Script errors"
- Open Google Apps Script editor
- Click **Executions** tab to see error logs
- Common issues:
  - Sheet name is not "Sheet1" - update line 17 in script
  - Missing headers in row 1

### "Script still not working"
- As fallback, data is always saved to localStorage
- You can manually copy data from the browser console:
  - Open browser DevTools (F12)
  - Go to **Console** tab
  - Type: `JSON.parse(localStorage.getItem('petitionSignatures'))`
  - Copy the data and manually paste to Google Sheet

## Manual Data Entry (Fallback)

If Google Apps Script doesn't work, you can:
1. Open browser DevTools (F12)
2. Go to Console tab
3. Run: `JSON.parse(localStorage.getItem('petitionSignatures'))`
4. Copy the data
5. Paste into your Google Sheet manually

This way, no data is lost - it's always saved locally!

---

**Questions or Issues?**
Contact Google Support or check the [Apps Script Documentation](https://developers.google.com/apps-script)
