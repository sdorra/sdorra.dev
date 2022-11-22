import { allPosts } from "../.contentlayer/generated/index.mjs";
import { mkdir, writeFile } from "fs/promises";

const createJson = () => {
  return allPosts.map((post) => {
    const { body, ...content } = post;
    return content;
  });
};

(async () => {
  console.log(`create posts json without body for ${allPosts.length} paths`);
  const json = createJson();
  await mkdir("./.scripts/Post", {
    recursive: true
  })
  await writeFile("./.scripts/Post/withoutbody.json", JSON.stringify(json, null, 2), {
    encoding: "utf-8",
  });
})();
