import { defineDocumentType, makeSource } from "contentlayer/source-files";

import { remarkCodeHike } from "@code-hike/mdx";
import { createRequire } from "module";
import path from "path";
import readingTime from "reading-time";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import mdxImages from "./lib/mdx-images";

const require = createRequire(import.meta.url);
const theme = require("shiki/themes/nord.json");

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
      resolve: (post) => readingTime(post.body.raw).text,
    },
  },
}));

export default makeSource({
  contentDirPath: "content/posts",
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [mdxImages, { publicDir: path.join(process.cwd(), "public", "posts"), resourcePath: "/posts" }],
    ],
    remarkPlugins: [remarkGfm, [remarkCodeHike, { theme, showCopyButton: true }]],
  },
});
