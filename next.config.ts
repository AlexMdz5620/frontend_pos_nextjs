import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'backend-pos-nestjs-qh7z.onrender.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      },
    ]
  }
};

export default nextConfig;
