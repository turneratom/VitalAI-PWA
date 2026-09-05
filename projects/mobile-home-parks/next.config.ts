import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const isStaticExport =
  isGithubPages || process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : undefined,
  basePath: isGithubPages ? "/VitalAI-PWA" : "",
  assetPrefix: isGithubPages ? "/VitalAI-PWA" : undefined,
  images: {
    unoptimized: isStaticExport,
  },
  trailingSlash: isStaticExport,
};

export default nextConfig;
