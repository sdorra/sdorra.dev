import { type Post } from "content-collections";
import { Options } from "minisearch";
import { PostOverview } from "./types";

const createSearchOptions = <T extends Array<keyof Post>>(
  idField: keyof Post,
  fields: T,
  storeFields: Array<keyof PostOverview>,
  boost: Record<T[number], number>
): Options<PostOverview> => ({
  idField,
  fields,
  storeFields,
  searchOptions: {
    boost,
  },
});

const searchOptions = createSearchOptions(
  "url",
  ["title", "summary", "content", "tags"],
  ["url", "title", "summary", "date", "readingTime", "image"],
  {
    title: 1.6,
    summary: 1.2,
    content: 1,
    tags: 1.8,
  }
);

export default searchOptions;
