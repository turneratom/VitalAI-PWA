import { validateLead, formatLeadForIssue, type OwnerLead } from "@/lib/leads";
import { notifyLeadReceived } from "@/lib/email";

const GITHUB_REPO = process.env.GITHUB_REPO ?? "turneratom/VitalAI-PWA";

async function createGitHubIssue(lead: OwnerLead): Promise<boolean> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return false;

  const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/issues`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({
      title: `Owner Lead: ${lead.parkName} — ${lead.location}`,
      body: formatLeadForIssue(lead),
      labels: ["owner-lead"],
    }),
  });

  return res.ok;
}

async function sendWebhook(lead: OwnerLead): Promise<boolean> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return false;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `New owner lead: ${lead.name} — ${lead.parkName} (${lead.location}). Email: ${lead.email}`,
      lead,
    }),
  });

  return res.ok;
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const lead = validateLead(data);

    if (!lead) {
      return Response.json({ error: "Invalid submission. Please fill all required fields." }, { status: 400 });
    }

    const [emailSent, issueCreated, webhookSent] = await Promise.all([
      notifyLeadReceived(lead),
      createGitHubIssue(lead),
      sendWebhook(lead),
    ]);

    return Response.json({
      success: true,
      message: "Lead received. A Tread Companies expert will reach out within 24 hours.",
      stored: emailSent || issueCreated || webhookSent,
    });
  } catch {
    return Response.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ status: "ok", endpoint: "owner-leads" });
}
