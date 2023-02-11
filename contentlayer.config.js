import { defineDocumentType, makeSource } from "contentlayer/source-files";

import { remarkCodeHike } from "@code-hike/mdx";
import { exec as syncExec } from "child_process";
import path from "path";
import readingTime from "reading-time";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { promisify } from "util";
import resolveImageBlurDataURL from "./lib/imageBlurDataURL";
import mdxEmbedder from "./lib/mdxEmbedder";
import staticImages from "./lib/static-images";

const exec = promisify(syncExec);

import theme from "./lib/ch-theme.json" assert { type: "json" };

const calculateReadingTime = (content) => {
  const contentWithoutSvg = content.replace(/<svg+.+?(?=<\/svg>)<\/svg>/sg, "");
  return readingTime(contentWithoutSvg).text;
};

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },
    summary: {
      type: "string",
      description: "A short summary of the post",
      required: true,
    },
    date: {
      type: "date",
      description: "The date of the post",
      required: true,
    },
    image: {
      type: "string",
      description: "Featured image for the post",
      required: true,
    },
    tags: {
      type: "list",
      of: { type: "string" },
      description: "List of post tags",
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/posts/${post._raw.flattenedPath}`,
    },
    readingTime: {
      type: "string",
      resolve: (post) => calculateReadingTime(post.body.raw),
    },
    imageBlurDataURL: {
      type: "string",
      resolve: resolveImageBlurDataURL,
    },
    lastModification: {
      type: "string",
      required: false,
      resolve: async (post) => {
        try {
          const { stdout } = await exec(
            `git log -1 --date=iso-strict --pretty="format:%cd" "content/posts/${post._raw.sourceFilePath}"`
          );
          return stdout.trim();
        } catch (e) {
          console.error(`Failed to get last modification date for ${post._raw.sourceFilePath}: ${e}`);
          return;
        }
      },
    },
  },
}));

export default makeSource({
  contentDirPath: "content/posts",
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [staticImages, { publicDir: path.join(process.cwd(), "public", "posts"), resourcePath: "/posts" }],
    ],
    remarkPlugins: [remarkGfm, mdxEmbedder, [remarkCodeHike, { theme, showCopyButton: true }]],
  },
});
