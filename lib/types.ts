import { type Post } from "contentlayer/generated";

export type PostOverview = Pick<
  Post,
  "url" | "title" | "summary" | "date" | "readingTime" | "imageURL" | "imageBlurDataURL"
>;
