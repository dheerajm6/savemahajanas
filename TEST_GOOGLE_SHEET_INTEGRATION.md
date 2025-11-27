# Test Google Sheet Integration

Your Google Sheet integration is now fully configured! Follow these steps to test it.

## Configuration Summary

✅ **Google Sheet ID**: `1b3LRY7zihWif9r33gAlWqnBYl-TOWVaTAJq-Xv6Qtuo`
✅ **Apps Script URL**: Configured
✅ **API Endpoint**: Ready

## How to Test

### 1. Start the Development Server

```bash
npm run dev
```

### 2. Open Your Website

Go to: `http://localhost:3000`

### 3. Fill Out the Petition Form

Fill in the form with:
- **Name**: John Doe
- **Email**: john@example.com
- **Category**: Student
- Click **"Sign the Petition"**

### 4. Check Your Google Sheet

Go to: https://docs.google.com/spreadsheets/d/1b3LRY7zihWif9r33gAlWqnBYl-TOWVaTAJq-Xv6Qtuo/edit

You should see:
- **Column A**: John Doe
- **Column B**: john@example.com
- **Column C**: Student
- **Column D**: Timestamp (date and time)

## What Happens

1. **User fills form** on website
2. **Data submitted** to `/api/signatures` endpoint
3. **API sends to Google Apps Script**
4. **Script appends row** to your Google Sheet
5. **Data also saved** to browser localStorage (backup)
6. **User sees confirmation** message

## Data Flow

```
Petition Form
    ↓
API Endpoint (/api/signatures)
    ↓
Google Apps Script
    ↓
Google Sheet (New Row Added)
    ↓
Also saved to Browser localStorage
```

## Verify Integration

### Check Google Sheet
- Open your sheet
- New rows should appear when signatures are submitted

### Check Browser Console (If Issues)
1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Submit a signature
4. Look for messages:
   - ✅ "Google Sheets sync successful" = Working!
   - ⚠️ "Google Sheets sync error" = Check Apps Script

### View Locally Stored Data
1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Run:
   ```javascript
   JSON.parse(localStorage.getItem('petitionSignatures'))
   ```
4. You'll see all locally stored signatures

## Troubleshooting

### "New rows not appearing in Google Sheet"

**Check 1: Verify Apps Script is deployed**
- Go to: https://script.google.com/
- Check if your project "Petition Signature Handler" exists
- Verify it's deployed as "Web app"

**Check 2: Check browser console**
- Open DevTools (F12)
- Go to Console tab
- Submit a signature
- Look for any error messages

**Check 3: Test Apps Script directly**
- Go to Apps Script: https://script.google.com/
- Click on "Petition Signature Handler"
- Click **"Test Deployment"**
- It should show the deployment URL

### "Still not working?"

**Fallback Method** - Copy from Browser:
1. Open DevTools (F12)
2. Go to Console
3. Run: `JSON.parse(localStorage.getItem('petitionSignatures'))`
4. Copy all the data
5. Manually paste into Google Sheet

## Expected Result

After testing, your Google Sheet should look like:

```
Name          | Email                | Category | Timestamp
-----------------------------------------------------------
John Doe      | john@example.com     | Student  | Nov 27, 2024 at 10:30:45 AM
Jane Smith    | jane@example.com     | Alumni   | Nov 27, 2024 at 10:31:20 AM
Test User     | test@example.com     | Public   | Nov 27, 2024 at 10:32:15 AM
```

## Monitoring Signatures

You can now:
- ✅ See all petition signatures in one place
- ✅ Export to CSV/Excel
- ✅ Share access with team members
- ✅ Analyze signature data
- ✅ Create reports/dashboards

## Important Notes

⚠️ **Email Privacy**
- Emails are stored in Google Sheet but NOT displayed on website
- Only visible to people with Sheet access

⚠️ **Data Safety**
- Data is saved to both Google Sheet AND browser localStorage
- No data loss, even if sync fails

⚠️ **Google Sheet Sharing**
- Only you can see email addresses
- Consider limiting sheet access to team members only

---

**Everything is set up!** 🎉 Test it out and let me know if you see data appearing in your Google Sheet!
