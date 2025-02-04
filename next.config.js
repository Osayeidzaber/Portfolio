const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.shields.io',
        pathname: '/badge/**',
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;