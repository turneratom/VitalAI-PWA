export type OwnerLead = {
  name: string;
  email: string;
  phone?: string;
  parkName: string;
  location: string;
  lotCount: number;
  askingPrice?: number;
  notes?: string;
  source?: string;
  referrer?: string;
};

export function validateLead(data: unknown): OwnerLead | null {
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;

  const name = String(d.name ?? "").trim();
  const email = String(d.email ?? "").trim();
  const parkName = String(d.parkName ?? "").trim();
  const location = String(d.location ?? "").trim();
  const lotCount = Number(d.lotCount);

  if (!name || !email || !parkName || !location || !lotCount || lotCount < 1) {
    return null;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;

  return {
    name,
    email,
    phone: d.phone ? String(d.phone).trim() : undefined,
    parkName,
    location,
    lotCount,
    askingPrice: d.askingPrice ? Number(d.askingPrice) : undefined,
    notes: d.notes ? String(d.notes).trim() : undefined,
    source: d.source ? String(d.source).trim() : undefined,
    referrer: d.referrer ? String(d.referrer).trim() : undefined,
  };
}

export function formatLeadForIssue(lead: OwnerLead): string {
  const lines = [
    "## New Owner Lead",
    "",
    `**Name:** ${lead.name}`,
    `**Email:** ${lead.email}`,
    lead.phone ? `**Phone:** ${lead.phone}` : null,
    `**Park:** ${lead.parkName}`,
    `**Location:** ${lead.location}`,
    `**Lot Count:** ${lead.lotCount}`,
    lead.askingPrice ? `**Asking Price:** $${lead.askingPrice.toLocaleString()}` : null,
    lead.notes ? `\n**Notes:**\n${lead.notes}` : null,
    lead.source ? `\n**Source:** ${lead.source}` : null,
    lead.referrer ? `**Referrer:** ${lead.referrer}` : null,
    "",
    `---`,
    `_Submitted via Mobile Home Parks /list-your-park_`,
  ];
  return lines.filter(Boolean).join("\n");
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
