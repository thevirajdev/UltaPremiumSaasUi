import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['10.150.243.15'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xubohuah.github.io',
      }
    ]
  }
};

export default nextConfig;
