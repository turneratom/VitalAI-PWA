export function GET() {
  return Response.json({
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
    beehiivEmbedId: process.env.BEEHIIV_EMBED_ID || '',
    adsenseClientId: process.env.ADSENSE_CLIENT_ID || '',
    plausibleDomain: process.env.PLAUSIBLE_DOMAIN || '',
    appUrl: process.env.APP_URL || '',
    proPrice: 9.99,
    elitePrice: 29.99
  });
}
