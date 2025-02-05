const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.shields.io',
        pathname: '/badge/**',
      },
    ],
  },
  reactStrictMode: true,
  trailingSlash: true,
  experimental: {
    optimizeCss: false,
  },
  distDir: '.next',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp3|wav|ogg|mp4|webm|pdf)$/i,
      type: 'asset/resource',
    });
    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);