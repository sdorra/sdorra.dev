import { defineDocumentType, makeSource } from "contentlayer/source-files";

import { remarkCodeHike } from "@code-hike/mdx";
import remarkGfm from "remark-gfm";
import { createRequire } from "module";
import readingTime from "reading-time";

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
    remarkPlugins: [remarkGfm, [remarkCodeHike, { theme }]],
  },
});
