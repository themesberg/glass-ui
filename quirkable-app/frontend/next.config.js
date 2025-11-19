/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  transpilePackages: ['@quirkable/shared'],
  images: {
    domains: [],
  },
};

module.exports = nextConfig;
