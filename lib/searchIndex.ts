import { mkdir, writeFile } from "fs/promises";
import MiniSearch from "minisearch";
import { join } from "path";
import searchOptions from "./search";
import { Post } from "content-collections";


export default async function searchIndex(posts: Post[], outputPath: string) {
  if (posts.length === 0) {
    return;
  }

  const miniSearch = new MiniSearch(searchOptions);
  // Index all documents
  miniSearch.addAll(posts.map((post) => ({ ...post, content: post.content.raw })));

  const data = miniSearch.toJSON();

  const directory = join(outputPath, "Post");
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, "search-index.json"), JSON.stringify(data), {
    encoding: "utf-8",
  });
}
