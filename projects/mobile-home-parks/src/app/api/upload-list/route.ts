import { siteConfig } from "@/lib/site";

const NOTIFY_EMAIL = process.env.LEAD_NOTIFICATION_EMAIL ?? siteConfig.team.bradley.email;
const GITHUB_REPO = process.env.GITHUB_REPO ?? "turneratom/VitalAI-PWA";
const MAX_CHARS = 400_000; // keep GitHub issue / email payloads reasonable

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let filename = "owner-list.csv";
    let text = "";
    let notes = "";
    let rowCount: number | null = null;

    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      const file = form.get("file");
      notes = String(form.get("notes") || "");
      if (file && typeof file !== "string") {
        filename = file.name || filename;
        text = await file.text();
      } else if (form.get("paste")) {
        filename = "pasted-list.txt";
        text = String(form.get("paste"));
      }
    } else {
      const body = await request.json();
      filename = body.filename || filename;
      text = String(body.content || body.paste || "");
      notes = String(body.notes || "");
    }

    text = text.trim();
    if (!text) {
      return Response.json({ error: "No list content received. Upload a CSV or paste rows." }, { status: 400 });
    }

    const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
    rowCount = Math.max(0, lines.length - (lines[0]?.toLowerCase().includes("name") || lines[0]?.includes(",") ? 1 : 0));

    const truncated = text.length > MAX_CHARS;
    const payload = truncated ? text.slice(0, MAX_CHARS) + "\n\n…[truncated for size]" : text;

    const [emailOk, issueOk] = await Promise.all([
      emailListToBradley({ filename, notes, rowCount, payload, truncated }),
      createGitHubIssue({ filename, notes, rowCount, payload, truncated }),
    ]);

    return Response.json({
      success: true,
      message:
        "List received. Bradley gets an email copy, and it's logged for the Trailer Parks agent to process.",
      filename,
      approximateRows: rowCount,
      emailed: emailOk,
      logged: issueOk,
      nextStep: "You can also drag the same file into this Cursor chat so the agent can merge it immediately.",
    });
  } catch {
    return Response.json({ error: "Upload failed. Try pasting the CSV or drop the file in Cursor chat." }, { status: 500 });
  }
}

async function emailListToBradley(opts: {
  filename: string;
  notes: string;
  rowCount: number | null;
  payload: string;
  truncated: boolean;
}): Promise<boolean> {
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(NOTIFY_EMAIL)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: `Owner list upload: ${opts.filename}`,
        _template: "box",
        _captcha: "false",
        from: "Trailer Parks List Intake",
        filename: opts.filename,
        approximate_rows: opts.rowCount ?? "unknown",
        notes: opts.notes || "None",
        truncated: opts.truncated ? "yes" : "no",
        list_preview: opts.payload.slice(0, 15000),
        full_list: opts.payload,
        reply: siteConfig.team.bradley.email,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function createGitHubIssue(opts: {
  filename: string;
  notes: string;
  rowCount: number | null;
  payload: string;
  truncated: boolean;
}): Promise<boolean> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return false;

  const body = [
    "## Owner list upload",
    "",
    `**File:** \`${opts.filename}\``,
    `**Approx rows:** ${opts.rowCount ?? "unknown"}`,
    `**Notes:** ${opts.notes || "None"}`,
    opts.truncated ? "**Note:** Content truncated for size." : null,
    "",
    "```csv",
    opts.payload.slice(0, 60000),
    "```",
    "",
    "_Uploaded via /upload-list — process & merge into outreach engine._",
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/issues`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({
      title: `Owner list upload: ${opts.filename}`,
      body,
      labels: ["owner-list"],
    }),
  });

  return res.ok;
}

export async function GET() {
  return Response.json({
    status: "ok",
    intake: "upload-list",
    email: NOTIFY_EMAIL,
    tip: "Fastest path for the agent: drag your CSV into the Cursor chat.",
  });
}
