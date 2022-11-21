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
    domains: ["images.unsplash.com"],
  },
  experimental: {
    appDir: true,
    fontLoaders: [{ loader: "@next/font/google", options: { subsets: ["latin"] } }],
  },
};

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withContentlayer(withBundleAnalyzer(nextConfig));
