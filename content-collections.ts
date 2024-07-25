import { remarkCodeHike } from "@code-hike/mdx";
import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import resolveImageBlurDataURL from "./lib/imageBlurDataURL";
import searchIndex from "./lib/searchIndex";
import withoutBody from "./lib/withoutBody";
import { exec as syncExec } from "node:child_process";
import path from "node:path";
import { promisify } from "node:util";
import readingTime from "reading-time";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import theme from "./lib/ch-theme.json" assert { type: "json" };
import mdxEmbedder from "./lib/mdxEmbedder";
import staticImages, { staticCoverImage } from "./lib/static-images";

const exec = promisify(syncExec);

const postDirectory = "content/posts";

function calculateReadingTime(content: string) {
  const contentWithoutSvg = content.replace(/<svg+.+?(?=<\/svg>)<\/svg>/gs, "");
  return readingTime(contentWithoutSvg).text;
}

async function lastModificationDate(filePath: string) {
  const { stdout } = await exec(`git log -1 --format=%ai -- ${path.join(postDirectory, filePath)}`);
  if (stdout) {
    return new Date(stdout.trim()).toISOString();
  }
  return new Date().toISOString();
}

type ImageParams = { image: string; directory: string };

async function collectImageInformation({ image, directory }: ImageParams) {
  const url = await staticCoverImage(postDirectory, "public/posts", "/posts", directory, image);
  const blurDataURL = await resolveImageBlurDataURL(postDirectory, directory, image);
  return { url, blurDataURL };
}

const posts = defineCollection({
  name: "posts",
  directory: postDirectory,
  include: "*/index.mdx",
  schema: (z) => ({
    title: z.string(),
    summary: z.string(),
    date: z.string(),
    image: z.string(),
    tags: z.array(z.string()),
  }),
  transform: async (post, ctx) => {
    const mdx = await compileMDX(ctx, post, {
      files: (appender) => {
        const directory = path.join(postDirectory, post._meta.directory, "components");
        appender.directory("./components", directory);
      },
      rehypePlugins: [
        rehypeSlug,
        [
          staticImages,
          {
            publicDir: path.join("public", "posts"),
            resourcePath: "/posts",
            sourceRoot: postDirectory,
          },
        ],
      ],
      remarkPlugins: [remarkGfm, mdxEmbedder, [remarkCodeHike, { theme, showCopyButton: true, autoImport: true }]],
    });

    const lastModification = await ctx.cache(post._meta.filePath, lastModificationDate);
    const image = await ctx.cache({ image: post.image, directory: post._meta.directory }, collectImageInformation);

    return {
      ...post,
      content: {
        mdx,
        raw: post.content,
      },
      readingTime: calculateReadingTime(post.content),
      lastModification,
      image,
      url: `/posts/${post._meta.path}`,
    };
  },
  onSuccess: async (documents) => {
    await Promise.all([withoutBody(documents, ".generated"), searchIndex(documents, ".generated")]);
  },
});

export default defineConfig({
  collections: [posts],
});
