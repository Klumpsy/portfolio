import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
      },
      {
        hostname: "github.com",
      },
      {
        hostname: "raw.githubusercontent.com",
      },
      {
        hostname: "user-images.githubusercontent.com",
      },
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
