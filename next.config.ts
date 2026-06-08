import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/gh/devicons/devicon@latest/icons/**",
      },
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
