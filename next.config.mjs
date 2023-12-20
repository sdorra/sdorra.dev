import NextBundleAnalyzer from "@next/bundle-analyzer";
import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // suppress warnings of webpack
    // https://github.com/contentlayerdev/contentlayer/issues/313
    config.infrastructureLogging = {
      level: "error",
    };
    return config;
  },
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
    }]
  },
};

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withContentlayer(withBundleAnalyzer(nextConfig));
