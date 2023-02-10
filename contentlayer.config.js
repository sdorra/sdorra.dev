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

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/*/*.mdx`,
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
      resolve: (post) => `/${post._raw.flattenedPath}`,
    },
    slug: {
      type: "string",
      resolve: (post) => post._raw.flattenedPath.replace("posts/", ""),
    },
    readingTime: {
      type: "string",
      resolve: (post) => readingTime(post.body.raw).text,
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
            `git log -1 --date=iso-strict --pretty="format:%cd" "content/${post._raw.sourceFilePath}"`
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

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the page",
      required: true,
    },
    description: {
      type: "string",
      description: "Description used for SEO meta tag"
    }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (page) => `/${page._raw.flattenedPath}`,
    },
    slug: {
      type: "string",
      resolve: (page) => page._raw.flattenedPath.replace("pages/", ""),
    },
  }
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post, Page],
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [staticImages, { source: path.join(process.cwd(), "content"), target: path.join(process.cwd(), "public") }],
    ],
    remarkPlugins: [remarkGfm, mdxEmbedder, [remarkCodeHike, { theme, showCopyButton: true }]],
  },
});
