/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    formats: ["image/webp"],
  },
  experimental: {
    serverComponentsExternalPackages: ['undici', 'stream']
  }
};

module.exports = nextConfig;
