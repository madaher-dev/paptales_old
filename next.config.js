/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["bcryptjs"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.freeimages.com",
        port: "",
        // pathname: '/account123/**',
      },
    ],
  },
};

module.exports = nextConfig;
