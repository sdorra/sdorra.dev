import { writeFile } from "fs/promises";
import { globby } from "globby";
import prettier from "prettier";
import { allPosts } from "../.contentlayer/generated/index.mjs";

const PAGE = "https://sdorra.dev";

const expandPath = (p) => {
  if (p === "/posts/[slug]") {
    return allPosts.map((p) => `/posts/${p._raw.flattenedPath}`);
  }
  return [p];
};

const createPath = (p) => {
  const path = "/" + p.replace("page.tsx", "");

  if (path.endsWith("/") && path.length > 1) {
    return path.substring(0, path.length - 1);
  }
  return path;
};

const createPaths = async () => {
  const paths = await globby("./**/page.tsx", {
    cwd: "app",
  });
  return paths.map(createPath).flatMap(expandPath);
};

const createSitemap = async (routes) => {
  const sitemap = `
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${routes
        .map((route) => {
          return `
            <url>
                <loc>${`${PAGE}${route}`}</loc>
            </url>
          `;
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
  const paths = await createPaths();
  console.log(`create sitemap for ${paths.length} paths`);
  const sitemap = await createSitemap(paths);

  await writeFile("./public/sitemap.xml", sitemap, { encoding: "utf-8" });
})();
