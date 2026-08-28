import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
  },
  async rewrites() {
    return [
      { source: "/turner-capital", destination: "/turner-capital/index.html" },
      { source: "/turner-capital/", destination: "/turner-capital/index.html" },
    ];
  },
};

export default nextConfig;
