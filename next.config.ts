/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  optimizeFonts: false,
  images: {
    unoptimized: true,
    domains: ["images.pexels.com", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
