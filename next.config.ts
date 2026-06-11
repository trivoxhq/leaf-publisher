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
      {
        source: "/free",
        destination: "/free-titles",
        permanent: true,
      },
      {
        source: "/free-books",
        destination: "/free-titles",
        permanent: true,
      },
      {
        source: "/best-sellers",
        destination: "/bestsellers",
        permanent: true,
      },
      {
        source: "/new-books",
        destination: "/new-releases",
        permanent: true,
      },
      {
        source: "/author-royalties",
        destination: "/royalties",
        permanent: true,
      },
      {
        source: "/dashboard",
        destination: "/author-dashboard",
        permanent: true,
      },
      {
        source: "/case-studies",
        destination: "/success-stories",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
