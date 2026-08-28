import { siteConfig } from "@/lib/site";

const TO = process.env.LEAD_NOTIFICATION_EMAIL ?? siteConfig.team.bradley.email;

const PINNED_MESSAGE = `Hi Bradley,

Here are your pinned Mobile Home Parks website links and CSV downloads.

=== BOOKMARK THIS ===
Pinned links page: ${siteConfig.url}/links

=== LIVE WEBSITE ===
Home: ${siteConfig.url}
Share with owners: ${siteConfig.url}/list-your-park?ref=bradley
Outreach HQ: ${siteConfig.url}/outreach
Upload your private list: ${siteConfig.url}/upload-list
Outreach playbook: ${siteConfig.url}/resources/owners
Marketplace: ${siteConfig.url}/marketplace

=== CSV DOWNLOADS ===
Full list (16,973 parks): ${siteConfig.url}/downloads/owner-prospects.csv
Wave 1 Sun Belt (9,112): ${siteConfig.url}/downloads/campaigns/wave1-sunbelt.csv
Wave 2 Southeast (1,441): ${siteConfig.url}/downloads/campaigns/wave2-southeast.csv
Wave 3 Midwest (3,089): ${siteConfig.url}/downloads/campaigns/wave3-midwest.csv
Association emails: ${siteConfig.url}/downloads/campaigns/association-emails.txt

=== GITHUB (never expires) ===
https://github.com/turneratom/VitalAI-PWA/blob/main/trailer-parks/PINNED-LINKS.md
Repo CSV path: trailer-parks/data/owner-prospects.csv

Note: Temporary Vercel URLs can expire. Bookmark /links and the GitHub PINNED-LINKS.md file.

— Mobile Home Parks
brad@treadcompanies.com
`;

export async function POST(request: Request) {
  let base = siteConfig.url;
  try {
    const body = await request.json();
    if (body?.baseUrl && typeof body.baseUrl === "string") {
      base = body.baseUrl.replace(/\/$/, "");
    }
  } catch {
    /* no body */
  }

  const message = PINNED_MESSAGE.replaceAll(siteConfig.url, base);

  const form = new FormData();
  form.append("name", "Mobile Home Parks Agent");
  form.append("email", siteConfig.team.bradley.email);
  form.append("_subject", "Mobile Home Parks — pinned website links & CSV downloads");
  form.append("_template", "box");
  form.append("_captcha", "false");
  form.append("_honey", "");
  form.append("message", message);
  form.append("home", `${base}/`);
  form.append("pinned_page", `${base}/links`);
  form.append("full_csv", `${base}/downloads/owner-prospects.csv`);
  form.append("owner_link", `${base}/list-your-park?ref=bradley`);

  try {
    const res = await fetch(`https://formsubmit.co/${encodeURIComponent(TO)}`, {
      method: "POST",
      body: form,
      headers: {
        Accept: "application/json",
        "User-Agent":
          "Mozilla/5.0 (compatible; MobileHomeParksBot/1.0; +https://turneratom.github.io/VitalAI-PWA)",
      },
      redirect: "follow",
    });

    const text = await res.text();
    let parsed: unknown = text;
    try {
      parsed = JSON.parse(text);
    } catch {
      /* html response */
    }

    return Response.json({
      success: res.ok,
      status: res.status,
      to: TO,
      baseUrl: base,
      response: typeof parsed === "string" ? parsed.slice(0, 500) : parsed,
      hint:
        res.ok
          ? "Check brad@treadcompanies.com (and spam). First FormSubmit send may need one activation click."
          : "If this failed, check spam for a FormSubmit activation email and click Activate.",
    });
  } catch (e) {
    return Response.json(
      { success: false, error: e instanceof Error ? e.message : "send failed", to: TO },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json({
    endpoint: "send-pins",
    to: TO,
    preview: PINNED_MESSAGE.slice(0, 400) + "…",
  });
}
