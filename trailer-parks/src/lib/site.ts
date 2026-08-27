export const siteConfig = {
  name: "Trailer Parks",
  tagline: "The Leader in Mobile Home Park Transactions",
  description:
    "List your park. View financials. Underwrite deals. Secure capital. No fees. Built by the manufactured housing experts at Tread Companies.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://temporary-speedy-scarlet-tte37qu.vercel.app",
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
    tread: "https://www.treadcompanies.com",
  },
  intakeEmail: "brad@treadcompanies.com",
};

export function getOwnerRecruitmentUrl(ref?: string): string {
  const base = `${siteConfig.url}${siteConfig.ownerRecruitmentPath}`;
  if (!ref) return base;
  return `${base}?ref=${encodeURIComponent(ref)}`;
}
