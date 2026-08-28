export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const email = (body.email || '').trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'Valid email required' }, { status: 400 });
  }

  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

  if (apiKey && publicationId) {
    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
          utm_source: 'vitalai',
          utm_medium: body.source || 'website'
        })
      }
    );

    if (!res.ok) {
      const detail = await res.text();
      console.error('Beehiiv error:', detail);
      return Response.json({ error: 'Subscription failed' }, { status: 502 });
    }

    return Response.json({ ok: true, provider: 'beehiiv' });
  }

  console.log('[newsletter] subscribed (no beehiiv key):', email, body.source || 'website');
  return Response.json({
    ok: true,
    provider: 'local',
    message: 'Saved. Configure BEEHIIV_API_KEY to sync to Beehiiv.'
  });
}
