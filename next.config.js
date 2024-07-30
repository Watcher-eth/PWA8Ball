/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: require.resolve("browserify-fs"), // Polyfill for 'fs'
    };
    return config;
  },
  transpilePackages: ["@uniswap/widgets", "@uniswap/conedison"],
};

module.exports = nextConfig;
