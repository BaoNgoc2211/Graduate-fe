import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/fastapi/:path*',
        destination: 'http://localhost:8001/:path*',
      },
    ];
  },
};

export default nextConfig;
