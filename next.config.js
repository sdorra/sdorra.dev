const NextBundleAnalyzer = require("@next/bundle-analyzer");
const { withContentCollections } = require("@content-collections/next");


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "images.unsplash.com",
    }, {
      protocol: "https",
      hostname: "pbs.twimg.com",
    }, {
      protocol: "https",
      hostname: "avatars.githubusercontent.com",
    }, {
      protocol: "https",
      hostname: "github.com",
    }]
  },
};

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withContentCollections(withBundleAnalyzer(nextConfig));
