import { Document } from "contentlayer/core";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";

export default async function withoutBody(documents: Document[], outputPath: string) {
  const postsWithoutContent = documents.map((doc) => {
    const { body, ...postWithoutContent } = doc;
    return postWithoutContent;
  });
  const directory = join(outputPath, "Post");
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, "withoutbody.json"), JSON.stringify(postsWithoutContent, null, 2), {
    encoding: "utf-8",
  });
}
