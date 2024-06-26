/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: require.resolve("browserify-fs"), // Polyfill for 'fs'
    };
    return config;
  },
  transpilePackages: ["@uniswap/widgets", "@uniswap/conedison"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },

      {
        protocol: "https",
        hostname: "pyxis.nymag.com",
      },
      {
        protocol: "https",
        hostname: "images.mirror-media.xyz",
      },
      { protocol: "https", hostname: "thumbs.dreamstime.com" },
      {
        protocol: "https",
        hostname: "t2.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "www.meisterdrucke.ie",
      },
      {
        protocol: "https",
        hostname: "core.colorsxstudios.com",
      },
      {
        protocol: "https",
        hostname: "media.wired.com",
      },
      {
        protocol: "https",
        hostname: "cdn.vox-cdn.com",
      },
      {
        protocol: "https",
        hostname: "imgix.bustle.com",
      },
      { protocol: "https", hostname: "image-cdn.hypb.st" },
      {
        protocol: "https",
        hostname: "dnm.nflximg.net",
      },
      {
        protocol: "https",
        hostname: "www.joblo.com",
      },
      {
        protocol: "https",
        hostname: "rockstarintel.com",
      },
      {
        protocol: "https",
        hostname: "media.vanityfair.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "qcdmlllkzdjajrdtmthk.supabase.co",
      },
      {
        protocol: "https",
        hostname: "www.colorsxstudio.com",
      },
      {
        protocol: "https",
        hostname: "variety.com",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
      { protocol: "https", hostname: "www.brides.com" },
      { protocol: "https", hostname: "cloudflare-ipfs.com" },
      {
        protocol: "https",
        hostname: "b5a7b992f2eba0465fc15efb724b92c4.ipfscdn.io",
      },
      { protocol: "https", hostname: "oembed.hey.xyz" },
      { protocol: "https", hostname: "images.lens.phaver" },
      { protocol: "https", hostname: "images.lens.phaver.com" },
      { protocol: "https", hostname: "testnet.zora.co" },
      { protocol: "https", hostname: "tryblitz.infura-ipfs.io" },
      { protocol: "https", hostname: "ipfs.io" },
      { protocol: "https", hostname: "gw.ipfs-lens.dev" },
      {
        protocol: "https",
        hostname: "media3.giphy.com",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
      },
      {
        protocol: "https",
        hostname: "media2.giphy.com",
      },
      {
        protocol: "https",
        hostname: "media4.giphy.com",
      },
      {
        protocol: "https",
        hostname: "media5.giphy.com",
      },
      {
        protocol: "https",
        hostname: "zora.co",
      },
      {
        protocol: "https",
        hostname: "media6.giphy.com",
      },
      {
        protocol: "https",
        hostname: "media0.giphy.com",
      },
      {
        protocol: "https",
        hostname: "nftstorage.link",
      },
      {
        protocol: "https",
        hostname: "spinamp.mypinata.cloud",
      },
      {
        protocol: "https",
        hostname: "media1.giphy.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "lens.infura-ipfs.io",
      },
      {
        protocol: "https",
        hostname: "1000logos.net",
      },
      {
        protocol: "https",
        hostname: "www.androidauthority.com",
      },
      {
        protocol: "https",
        hostname: "cdn.grove.wgbh.org",
      },
      {
        protocol: "https",
        hostname: "bostonglobe-prod.cdn.arcpublishing.com",
      },
      {
        protocol: "https",
        hostname: "bdc2020.o0bc.com",
      },
    ],
  },
};

module.exports = nextConfig;
