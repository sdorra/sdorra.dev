import { baseUrl } from "lib/config";

const content = `User-Agent: *
${process.env.VERCEL_ENV === "production" ? "Allow: /" : "Disallow: /"}

Sitemap: ${baseUrl}/sitemap.xml
`;

export const GET = () => {
  return new Response(content, { status: 200 });
};
