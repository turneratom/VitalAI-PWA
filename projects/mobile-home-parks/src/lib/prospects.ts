export type ProspectPark = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  county: string;
  website?: string | null;
  size?: string | null;
  units?: number | null;
  source: string;
  status: string;
  notified: boolean;
};

import prospectsJson from "./prospects-data.json";

export const prospectsMeta = {
  source: prospectsJson.source as string,
  count: prospectsJson.count as number,
  totalAvailable: prospectsJson.totalAvailable as number,
};

export const prospects = prospectsJson.parks as ProspectPark[];

export function getProspectsByState(state: string): ProspectPark[] {
  return prospects.filter((p) => p.state === state);
}

export function getUniqueStates(): string[] {
  return [...new Set(prospects.map((p) => p.state))].sort();
}

export function buildCallScript(park: ProspectPark): string {
  return `Hi, this is Bradley with Tread Companies and Trailer Parks. I'm calling about ${park.name} in ${park.city}. We built a free marketplace for mobile home park owners — zero listing fees, zero success fees. Traditional brokers take 6%. We've operated 4,000+ spaces and sold 24 communities. If you're ever thinking about selling, I'd love to get you listed in about 2 minutes. Can I text or email you the link?`;
}

export function buildSmsScript(park: ProspectPark, link: string): string {
  return `Hi, Bradley with Tread Companies / Trailer Parks. Re: ${park.name} in ${park.city}. Free marketplace for park owners — $0 listing fee, $0 success fee (brokers take ~6%). We've operated 4,000+ MH spaces. List in 2 min: ${link}`;
}

export function buildEmailSubject(park: ProspectPark): string {
  return `${park.name} — list free on Trailer Parks (no broker fees)`;
}

export function buildEmailBody(park: ProspectPark, link: string): string {
  return `Hi,

I'm Bradley with Tread Companies. We operate manufactured housing communities (${"4,000+"} spaces; 24 communities sold) and built Trailer Parks — a fee-free marketplace for park owners.

I'm reaching out about ${park.name} at ${park.address}, ${park.city}, ${park.state} ${park.zip}.

Why this matters:
• $0 listing fee
• $0 success fee (traditional brokers often take ~6%)
• Buyers, analysts, and lenders in one place
• Backed by operators who actually own and sell parks

Submit ${park.name} in about 2 minutes:
${link}

No obligation. Happy to answer questions — reply to this email or call me.

Best,
Bradley
Tread Companies
brad@treadcompanies.com
https://www.treadcompanies.com
`;
}

export function phoneDigits(phone: string): string {
  return phone.replace(/\D/g, "");
}
