/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: ["images.pexels.com", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
