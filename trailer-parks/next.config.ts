import type { NextConfig } from "next";

/** Static export for GitHub Pages / www.mhportal.com (no /VitalAI-PWA basePath — custom domain is root). */
const isStaticExport =
  process.env.GITHUB_PAGES === "true" ||
  process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : undefined,
  images: {
    unoptimized: isStaticExport,
  },
  trailingSlash: isStaticExport,
};

export default nextConfig;
