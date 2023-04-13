/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['ui'],
  },
};

module.exports = nextConfig;
