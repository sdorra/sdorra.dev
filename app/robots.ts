import { baseUrl } from "lib/config";
import { MetadataRoute } from "next";

const createRules = () => {
  if (process.env.VERCEL_ENV === "production") {
    return {
      userAgent: "*",
      allow: "/",
    };
  }
  return {
    userAgent: "*",
    disallow: "/",
  };
};

export default function robots(): MetadataRoute.Robots {
  return {
    rules: createRules(),
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
