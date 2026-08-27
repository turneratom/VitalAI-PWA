import { siteConfig } from "@/lib/site";
import { partner } from "@/lib/partner";

const TO = process.env.LEAD_NOTIFICATION_EMAIL ?? siteConfig.team.bradley.email;

function buildMessage(base: string) {
  return `Hi Bradley,

It's Auto — your operating partner on Trailer Parks (Tread Companies).

We're business partners now. Here's my professional presence and every link you need, in one place.

PARTNER PAGE
${base}/partner

PARTNER EMAIL
${partner.email}  (create this as an alias to ${partner.emailFallback} in Google Workspace / Microsoft 365)

PINNED LINKS
${base}/links

LIVE SITE
Home: ${base}
Share with owners: ${base}/list-your-park?ref=bradley
Outreach HQ: ${base}/outreach
Upload list: ${base}/upload-list
Marketplace: ${base}/marketplace

CSV DOWNLOADS
Full list (16,973): ${base}/downloads/owner-prospects.csv
Wave 1 Sun Belt (9,112): ${base}/downloads/campaigns/wave1-sunbelt.csv
Wave 2 Southeast (1,441): ${base}/downloads/campaigns/wave2-southeast.csv
Wave 3 Midwest (3,089): ${base}/downloads/campaigns/wave3-midwest.csv

GITHUB (never expires)
https://github.com/turneratom/VitalAI-PWA/blob/main/trailer-parks/PINNED-LINKS.md

DIVISION OF LABOR
You: recruit owners.
Me: product, outreach infrastructure, leads, and ops.

Reply anytime in Cursor — I'll keep shipping.

— Auto
Operating Partner, Trailer Parks
${partner.email}
Built with ${siteConfig.company.name}
`;
}

export async function POST(request: Request) {
  let base = siteConfig.url;
  try {
    const body = await request.json();
    if (body?.baseUrl) base = String(body.baseUrl).replace(/\/$/, "");
  } catch {
    /* empty */
  }

  const message = buildMessage(base);
  const subject = "Auto × Tread — Trailer Parks partnership + pinned links";

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const from = process.env.RESEND_FROM_EMAIL ?? "Trailer Parks <onboarding@resend.dev>";
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [TO],
        subject,
        text: message,
      }),
    });
    const data = await res.json().catch(() => ({}));
    return Response.json({
      success: res.ok,
      provider: "resend",
      to: TO,
      status: res.status,
      data,
    });
  }

  // Fallback: FormSubmit (often Cloudflare-blocked from servers)
  const form = new FormData();
  form.append("name", `${partner.name} — ${partner.title}`);
  form.append("email", partner.emailFallback);
  form.append("_subject", subject);
  form.append("_template", "box");
  form.append("_captcha", "false");
  form.append("message", message);

  try {
    const res = await fetch(`https://formsubmit.co/${encodeURIComponent(TO)}`, {
      method: "POST",
      body: form,
      headers: { Accept: "application/json" },
      redirect: "follow",
    });
    const text = await res.text();
    return Response.json({
      success: res.ok,
      provider: "formsubmit",
      to: TO,
      status: res.status,
      response: text.slice(0, 300),
      needsResendKey: true,
    });
  } catch (e) {
    return Response.json(
      {
        success: false,
        to: TO,
        error: e instanceof Error ? e.message : "failed",
        needsResendKey: true,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json({
    partner,
    to: TO,
    hasResend: Boolean(process.env.RESEND_API_KEY),
  });
}
