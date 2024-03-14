import { type Post } from "content-collections";

export type PostOverview = Pick<
  Post,
  "url" | "title" | "summary" | "date" | "readingTime" | "image"
>;
