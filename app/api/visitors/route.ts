// Fallback in-memory counter for development
let visitorCount = 0;

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { isNewVisitor } = body;

    // If this is a new visitor, increment the count
    if (isNewVisitor) {
      visitorCount++;
    }

    // Try to log to Google Sheets for production
    const APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_DEPLOYMENT_URL;
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
          // Silently fail - we have in-memory fallback
        });
      } catch (sheetsError) {
        // Silently fail - visitor count still works with in-memory counter
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
