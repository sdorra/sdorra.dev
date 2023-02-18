import { globby } from "globby";
import { allPosts } from "contentlayer/generated";
import { baseUrl } from "lib/config";

type SitemapEntry = {
  loc: string;
  lastmod?: string;
  priority?: string;
};

const createUrl = (p: string) => baseUrl + p;

const mapPathToEntries = (p: string) => {
  if (p === "/posts/[slug]") {
    return allPosts.map((p) => {
      const url: SitemapEntry = {
        loc: createUrl(`/posts/${p._raw.flattenedPath}`),
      };
      if (p.lastModification) {
        url.lastmod = p.lastModification;
      }
      url.priority = "0.64";
      return url;
    });
  } else if (p === "/") {
    return [
      {
        loc: createUrl(p),
        lastmod: new Date().toISOString(),
        priority: "1.00",
      },
    ];
  }
  return [
    {
      loc: createUrl(p),
      priority: "0.80",
    },
  ];
};

const createPath = (p: string) => {
  const path = "/" + p.replace("page.tsx", "");

  if (path.endsWith("/") && path.length > 1) {
    return path.substring(0, path.length - 1);
  }
  return path;
};

const createEntries = async () => {
  const paths = await globby("./**/page.tsx", {
    cwd: "app",
  });
  return paths.map(createPath).flatMap(mapPathToEntries);
};

const createSitemap = async (entries: SitemapEntry[]) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 https://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${entries
      .map((entry) => {
        let url = "<url>\n";
        for (const [key, value] of Object.entries(entry)) {
          url += `<${key}>${value}</${key}>\n`;
        }
        url += "</url>\n";
        return url;
      })
      .join("")}
</urlset>
  `;

};

export const GET = async () => {
  const entries = await createEntries();
  const sitemap = await createSitemap(entries);
  return new Response(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
