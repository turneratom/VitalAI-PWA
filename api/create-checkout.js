import Stripe from 'stripe';

const PRICE_MAP = {
  pro: process.env.STRIPE_PRICE_PRO,
  elite: process.env.STRIPE_PRICE_ELITE
};

export async function POST(request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return Response.json(
      { error: 'Stripe not configured. Set STRIPE_SECRET_KEY and price IDs in Vercel env.' },
      { status: 503 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const tier = body.tier === 'elite' ? 'elite' : 'pro';
  const priceId = PRICE_MAP[tier];
  if (!priceId) {
    return Response.json(
      { error: `Missing STRIPE_PRICE_${tier.toUpperCase()} env var` },
      { status: 503 }
    );
  }

  const appUrl = (process.env.APP_URL || request.headers.get('origin') || 'https://vitalai.app').replace(/\/$/, '');
  const stripe = new Stripe(secret);

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${appUrl}/success.html?tier=${tier}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/cancel.html`,
    metadata: { tier }
  });

  return Response.json({ url: session.url, sessionId: session.id });
}
