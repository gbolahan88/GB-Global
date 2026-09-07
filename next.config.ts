import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "ccssbutcajooqzaucmww.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  allowedDevOrigins: ['172.20.10.3'],
  /* config options here */
};

export default nextConfig;
