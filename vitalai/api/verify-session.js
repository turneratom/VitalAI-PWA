import Stripe from 'stripe';

export async function GET(request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return Response.json({ error: 'session_id required' }, { status: 400 });
  }
  if (!secret) {
    return Response.json({ verified: false, tier: 'free', reason: 'stripe_not_configured' });
  }

  const stripe = new Stripe(secret);
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== 'paid' && session.status !== 'complete') {
    return Response.json({ verified: false, tier: 'free' });
  }

  const tier = session.metadata?.tier || 'pro';
  return Response.json({
    verified: true,
    tier,
    customerEmail: session.customer_details?.email || null
  });
}
