export const siteConfig = {
  name: "Trailer Parks",
  tagline: "The Leader in Mobile Home Park Transactions",
  description:
    "List your park. View financials. Underwrite deals. Secure capital. No fees. Built by the manufactured housing experts at Tread Companies.",
  /** Prefer NEXT_PUBLIC_SITE_URL in production. Empty = use current browser origin for share links. */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.GITHUB_PAGES === "true"
      ? "https://turneratom.github.io/VitalAI-PWA"
      : ""),
  ownerRecruitmentPath: "/list-your-park",
  company: {
    name: "Tread Companies",
    tagline: "Quality Homes, Smarter Investments",
    website: "https://www.treadcompanies.com",
    email: "info@treadcompanies.com",
    linkedin: "https://www.linkedin.com/company/tread-companies/",
  },
  team: {
    bradley: {
      name: "Bradley",
      email: "brad@treadcompanies.com",
      role: "Owner Recruitment",
    },
  },
  credentials: {
    spacesOperated: "4,000+",
    communitiesSold: 24,
    dealsClosed: 847,
    activeLenders: 24,
  },
  links: {
    ownerRecruitment: "/list-your-park",
    outreachKit: "/resources/owners",
    marketplace: "/marketplace",
    outreach: "/outreach",
    uploadList: "/upload-list",
    partner: "/partner",
    links: "/links",
    tread: "https://www.treadcompanies.com",
  },
  intakeEmail: "brad@treadcompanies.com",
};

/** Path-only recruitment link — always works on whatever host is serving the site. */
export function getOwnerRecruitmentPath(ref?: string): string {
  const path = siteConfig.ownerRecruitmentPath;
  if (!ref) return path;
  return `${path}?ref=${encodeURIComponent(ref)}`;
}

/**
 * Absolute recruitment URL when a public site URL is configured;
 * otherwise returns a same-origin path (safe for copy/paste on the live host).
 */
export function getOwnerRecruitmentUrl(ref?: string): string {
  const path = getOwnerRecruitmentPath(ref);
  if (siteConfig.url) return `${siteConfig.url.replace(/\/$/, "")}${path}`;
  return path;
}

export function absoluteUrl(path: string, origin?: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  const base = (origin || siteConfig.url || "").replace(/\/$/, "");
  return base ? `${base}${p}` : p;
}
