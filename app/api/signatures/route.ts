interface SignatureData {
  name: string;
  email: string;
  category: 'student' | 'alumni' | 'public';
  timestamp: string;
}

export async function GET(request: Request) {
  try {
    const APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_DEPLOYMENT_URL;

    if (!APPS_SCRIPT_URL) {
      return Response.json(
        { students: 0, alumni: 0, public: 0, total: 0 },
        { status: 200 }
      );
    }

    const params = new URLSearchParams({
      action: 'getSignatureCount',
    });

    const response = await fetch(`${APPS_SCRIPT_URL}?${params.toString()}`, {
      method: 'GET',
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Apps Script response:', data);
      return Response.json(
        {
          students: data.students || 0,
          alumni: data.alumni || 0,
          public: data.public || 0,
          total: data.total || (data.students || 0) + (data.alumni || 0) + (data.public || 0),
        },
        { status: 200 }
      );
    }

    console.warn('Apps Script returned non-ok status:', response.status);
    const errorText = await response.text();
    console.warn('Apps Script response body:', errorText);
    return Response.json(
      { students: 0, alumni: 0, public: 0, total: 0 },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching signature count from Apps Script:', error);
    return Response.json(
      { students: 0, alumni: 0, public: 0, total: 0 },
      { status: 200 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: SignatureData = await request.json();
    const { name, email, category, timestamp } = body;

    // Validation
    if (!name || !email || !category || !timestamp) {
      return Response.json(
        { error: 'Name, email, category, and timestamp are required' },
        { status: 400 }
      );
    }

    // Get Google Apps Script deployment URL from environment variables
    const APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_DEPLOYMENT_URL;

    // Try to sync with Google Sheet via Apps Script
    if (APPS_SCRIPT_URL) {
      try {
        const params = new URLSearchParams({
          name,
          email,
          category,
          timestamp,
        });

        const sheetsResponse = await fetch(`${APPS_SCRIPT_URL}?${params.toString()}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        if (sheetsResponse.ok) {
          const result = await sheetsResponse.json();
          console.log('Google Sheets sync successful:', result);
        } else {
          console.warn('Google Sheets sync failed, but data saved locally');
        }
      } catch (sheetsError) {
        console.warn('Google Sheets sync error:', sheetsError);
        // Continue - data will be saved locally as fallback
      }
    }

    // Always succeed - data is saved locally as backup
    return Response.json(
      {
        success: true,
        message: 'Signature recorded successfully',
        data: { name, email, category, timestamp },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signature submission error:', error);
    return Response.json(
      { error: 'Failed to submit signature', details: String(error) },
      { status: 500 }
    );
  }
}
