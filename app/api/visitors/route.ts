let visitorCount = 0;

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { isNewVisitor } = body;

    // If this is a new visitor, increment the count
    if (isNewVisitor) {
      visitorCount++;
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
