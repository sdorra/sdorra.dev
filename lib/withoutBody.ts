import { Post } from "content-collections";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";

export default async function withoutBody(posts: Post[], outputPath: string) {
  const postsWithoutContent = posts.map((post) => {
    return {
      ...post,
      content: undefined,
    };
  });
  const directory = join(outputPath, "Post");
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, "withoutbody.json"), JSON.stringify(postsWithoutContent, null, 2), {
    encoding: "utf-8",
  });
}
