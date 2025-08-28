import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.DOMAIN!,
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      },
    ]
  }
};

export default nextConfig;
