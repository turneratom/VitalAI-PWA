import { formatLeadForIssue, type OwnerLead } from "@/lib/leads";
import { siteConfig } from "@/lib/site";

const NOTIFY_EMAIL = process.env.LEAD_NOTIFICATION_EMAIL ?? siteConfig.team.bradley.email;

export async function sendLeadEmail(lead: OwnerLead): Promise<boolean> {
  const subject = `New Owner Lead: ${lead.parkName} — ${lead.location}`;

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(NOTIFY_EMAIL)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: subject,
        _template: "table",
        _captcha: "false",
        name: lead.name,
        email: lead.email,
        phone: lead.phone ?? "Not provided",
        park_name: lead.parkName,
        location: lead.location,
        lot_count: lead.lotCount,
        asking_price: lead.askingPrice ? `$${lead.askingPrice.toLocaleString()}` : "Not provided",
        notes: lead.notes ?? "None",
        source: lead.source ?? "direct",
        referrer: lead.referrer ?? "None",
        platform: "Trailer Parks by Tread Companies",
      }),
    });

    return res.ok;
  } catch {
    return false;
  }
}

export async function sendLeadViaResend(lead: OwnerLead): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Trailer Parks <onboarding@resend.dev>",
        to: [NOTIFY_EMAIL],
        subject: `New Owner Lead: ${lead.parkName} — ${lead.location}`,
        text: formatLeadForIssue(lead),
      }),
    });

    return res.ok;
  } catch {
    return false;
  }
}

export async function notifyLeadReceived(lead: OwnerLead): Promise<boolean> {
  const [formSubmit, resend] = await Promise.all([
    sendLeadEmail(lead),
    sendLeadViaResend(lead),
  ]);
  return formSubmit || resend;
}
