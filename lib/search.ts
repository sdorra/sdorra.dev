import { type Post } from "contentlayer/generated";
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
  "_id",
  ["title", "summary", "body", "tags"],
  ["url", "title", "summary", "date", "readingTime", "imageURL", "imageBlurDataURL"],
  {
    title: 1.6,
    summary: 1.2,
    body: 1,
    tags: 1.8,
  }
);

export default searchOptions;
