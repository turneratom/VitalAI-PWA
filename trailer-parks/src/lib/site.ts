export const siteConfig = {
  name: "Trailer Parks",
  tagline: "The Leader in Mobile Home Park Transactions",
  description:
    "List your park. View financials. Underwrite deals. Secure capital. No fees. One stop shop for mobile home park owners, buyers, analysts, and lenders.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://trailer-parks.app",
  ownerRecruitmentPath: "/list-your-park",
  links: {
    ownerRecruitment: "/list-your-park",
    outreachKit: "/resources/owners",
    marketplace: "/marketplace",
  },
};

export function getOwnerRecruitmentUrl(ref?: string): string {
  const base = `${siteConfig.url}${siteConfig.ownerRecruitmentPath}`;
  if (!ref) return base;
  return `${base}?ref=${encodeURIComponent(ref)}`;
}
