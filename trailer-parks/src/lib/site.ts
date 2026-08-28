/** Production site — GitHub Pages project URL (works now). */
export const LIVE_SITE_URL = "https://turneratom.github.io/VitalAI-PWA";

/** Intended custom domain once DNS points at GitHub Pages. */
export const CUSTOM_DOMAIN_URL = "https://www.mhportal.com";

export const siteConfig = {
  name: "Mobile Home Parks",
  tagline: "The Leader in Mobile Home Park Transactions",
  description:
    "List your park. View financials. Underwrite deals. Secure capital. No fees. Built for manufactured housing owners, buyers, analysts, and lenders.",
  /** Prefer NEXT_PUBLIC_SITE_URL; otherwise the live GitHub Pages URL. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? LIVE_SITE_URL,
  /** Next.js basePath for GitHub project pages (empty on root/custom-domain hosts). */
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  ownerRecruitmentPath: "/list-your-park",
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
  },
  intakeEmail: "brad@treadcompanies.com",
};

/** Prefix a path with the Next.js basePath (for raw <a> tags / downloads). */
export function withBasePath(path: string): string {
  const base = (siteConfig.basePath || "").replace(/\/$/, "");
  if (!path.startsWith("/")) return path;
  if (!base) return path;
  if (path === "/") return `${base}/`;
  return `${base}${path}`;
}

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
  return absoluteUrl(getOwnerRecruitmentPath(ref));
}

/**
 * Absolute URL for share/copy.
 * `origin` should already include basePath (from publicOrigin / useSiteOrigin).
 */
export function absoluteUrl(path: string, origin?: string): string {
  const raw = path.startsWith("/") ? path : `/${path}`;
  const [pathname, query = ""] = raw.split("?");
  const q = query ? `?${query}` : "";
  const base = (origin || siteConfig.url || "").replace(/\/$/, "");
  if (!base) return withBasePath(pathname) + q;
  return `${base}${pathname}${q}`;
}

/** Canonical public origin for share links (includes /VitalAI-PWA on GitHub Pages). */
export function publicOrigin(browserOrigin?: string): string {
  if (browserOrigin) {
    const o = browserOrigin.replace(/\/$/, "");
    const bp = siteConfig.basePath || "";
    if (bp && !o.endsWith(bp)) return `${o}${bp}`;
    return o;
  }
  return (siteConfig.url || "").replace(/\/$/, "");
}
