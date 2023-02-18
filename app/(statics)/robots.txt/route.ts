import { baseUrl } from "lib/config";

const content = `User-Agent: *
Sitemap: ${baseUrl}/sitemap.xml
`;

export const GET = () => {
  return new Response(content, { status: 200 });
};
