import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export so Vercel can deploy from a monorepo subdirectory
  // when project Root Directory is unset (output goes to greatest-humans/out).
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
