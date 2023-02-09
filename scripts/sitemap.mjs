import { writeFile } from "fs/promises";
import { globby } from "globby";
import prettier from "prettier";
import { allPosts } from "../.contentlayer/generated/index.mjs";

const PAGE = "https://sdorra.dev";

const createUrl = (p) => PAGE + p;

const mapPathToEntries = (p) => {
  if (p === "/posts/[slug]") {
    return allPosts.map((p) => {
      const url = {
        loc: createUrl(p.url),
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

const createPath = (p) => {
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

const createSitemap = async (routes) => {
  const sitemap = `
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 https://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      ${routes
        .map((route) => {
          let url = "<url>\n";
          for (const [key, value] of Object.entries(route)) {
            url += `<${key}>${value}</${key}>\n`;
          }
          url += "</url>\n";
          return url;
        })
        .join("")}
  </urlset>
  `;

  const prettierConfig = await prettier.resolveConfig("./.prettierrc.js");
  return prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });
};

(async () => {
  const entries = await createEntries();
  console.log(`create sitemap for ${entries.length} entries`);
  const sitemap = await createSitemap(entries);

  await writeFile("./public/sitemap.xml", sitemap, { encoding: "utf-8" });
})();
