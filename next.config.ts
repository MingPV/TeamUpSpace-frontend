import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["lh3.googleusercontent.com", "kmwsjloljrglpgtieens.supabase.co"], // allow Google profile images
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
