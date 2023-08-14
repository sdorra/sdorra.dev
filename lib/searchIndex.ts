import { Document } from "contentlayer/core";
import { Post } from "contentlayer/generated";
import { mkdir, writeFile } from "fs/promises";
import MiniSearch from "minisearch";
import { join } from "path";
import searchOptions from "./search";

function isPost(doc: Document): doc is Post {
  return doc.type === "Post";
}

export default async function searchIndex(documents: Document[], outputPath: string) {
  const posts = documents.filter(isPost);

  if (posts.length === 0) {
    return;
  }

  const miniSearch = new MiniSearch(searchOptions);
  // Index all documents
  miniSearch.addAll(posts.map((post) => ({ ...post, id: post._id, body: post.body.raw })));

  const data = miniSearch.toJSON();

  const directory = join(outputPath, "Post");
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, "search-index.json"), JSON.stringify(data), {
    encoding: "utf-8",
  });
}
