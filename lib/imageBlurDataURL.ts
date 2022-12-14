import { Post } from "contentlayer/generated";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import createPlaceholder from "./placeholder";

const sha256sum = (value: string) => {
  return createHash("sha256").update(value, "utf-8").digest("hex");
};

const resolveFromFile = async (checksum: string): Promise<string | null> => {
  try {
    const file = path.join(".contentlayer", ".cache", "image", checksum);
    return await readFile(file, { encoding: "utf-8" });
  } catch (e) {}
  return null;
};

const fetchAndResolve = async (imageUrl: string, checksum: string): Promise<string> => {
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`failed to fetch ${imageUrl}`);
  }

  const image = sharp(Buffer.from(await response.arrayBuffer()));
  const blurDataURL = await createPlaceholder(image);

  const file = path.join(".contentlayer", ".cache", "image", checksum);

  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, blurDataURL, { encoding: "utf-8" });

  return blurDataURL;
};

const resolveImageBlurDataURL = async (post: Post) => {
  const image = post.image;

  const checksum = sha256sum(image);
  let blurDataURL = await resolveFromFile(checksum);

  if (!blurDataURL) {
    blurDataURL = await fetchAndResolve(image, checksum);
  }
  return blurDataURL;
};

export default resolveImageBlurDataURL;
