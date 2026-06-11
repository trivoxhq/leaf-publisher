import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/help-center",
        destination: "/help-centre",
        permanent: true,
      },
      {
        source: "/help",
        destination: "/help-centre",
        permanent: true,
      },
      {
        source: "/authors",
        destination: "/for-authors",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
