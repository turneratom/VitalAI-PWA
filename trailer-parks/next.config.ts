import type { NextConfig } from "next";

/**
 * GitHub project Pages live at /VitalAI-PWA until www.mhportal.com DNS points here.
 * Do NOT add a CNAME until DNS is ready — a CNAME redirects github.io to a dead lander.
 */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const isStaticExport =
  isGithubPages || process.env.STATIC_EXPORT === "true";
const basePath = isGithubPages ? "/VitalAI-PWA" : "";

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : undefined,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: isStaticExport,
  },
  trailingSlash: isStaticExport,
};

export default nextConfig;
