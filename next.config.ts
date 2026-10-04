import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  experimental: { serverActions: { bodySizeLimit: "12mb" } },
  // The /works listing page was replaced by /books; case studies still live at /works/[slug].
  async redirects() {
    return [
      { source: "/works", destination: "/books", permanent: true },
      { source: "/work", destination: "/books", permanent: true },
    ];
  },
};
export default nextConfig;
