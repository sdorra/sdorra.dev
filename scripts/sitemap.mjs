import { writeFile } from "fs/promises";
import { globby } from "globby";
import prettier from "prettier";

const PAGE = "https://sdorra.dev";

const createSlugs = async () => {
  const paths = await globby("*.mdx", {
    cwd: "./content/posts",
  });
  return paths.map((p) => p.replace(".mdx", ""));
};

const expandPath = (slugs) => {
  return (p) => {
    if (p === "/posts/[slug]") {
      return slugs.map((s) => `/posts/${s}`);
    }
    return [p];
  };
};

const createPath = (p) => {
  const path = "/" + p.replace("page.tsx", "");

  if (path.endsWith("/") && path.length > 1) {
    return path.substring(0, path.length - 1);
  }
  return path;
};

const createPaths = async () => {
  const slugs = await createSlugs();
  const paths = await globby("./**/page.tsx", {
    cwd: "app",
  });
  return paths.map(createPath).flatMap(expandPath(slugs));
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
