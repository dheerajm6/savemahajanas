export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { isNewVisitor } = body;

    const APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_DEPLOYMENT_URL;
    const SHEET_ID = process.env.GOOGLE_SHEET_ID;

    let visitorCount = 0;

    // Log new visitor to Google Sheets
    if (APPS_SCRIPT_URL && isNewVisitor) {
      try {
        const timestamp = new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        });

        const params = new URLSearchParams({
          action: 'logVisitor',
          timestamp,
        });

        await fetch(`${APPS_SCRIPT_URL}?${params.toString()}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }).catch(() => {
          // Silently fail - we have fallback
        });
      } catch (sheetsError) {
        // Silently fail
      }
    }

    // Get visitor count from Google Sheets
    if (APPS_SCRIPT_URL && SHEET_ID) {
      try {
        const params = new URLSearchParams({
          action: 'getVisitorCount',
          sheetId: SHEET_ID,
        });

        const response = await fetch(`${APPS_SCRIPT_URL}?${params.toString()}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        const data = await response.json();
        visitorCount = data.count || 0;
      } catch (error) {
        console.error('Failed to get visitor count from Sheets:', error);
        visitorCount = 0;
      }
    }

    return Response.json(
      { count: visitorCount, timestamp: new Date().toISOString() },
      { status: 200 }
    );
  } catch (error) {
    console.error('Visitor count error:', error);
    return Response.json(
      { error: 'Failed to fetch visitor count' },
      { status: 500 }
    );
  }
}
