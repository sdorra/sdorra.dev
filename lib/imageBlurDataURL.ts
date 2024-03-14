import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import createPlaceholder from "./placeholder";

const cacheDir = path.join(".content-collections", "cache", "images");

const sha256sum = (value: string) => {
  return createHash("sha256").update(value, "utf-8").digest("hex");
};

const resolveFromFile = async (checksum: string): Promise<string | null> => {
  try {
    const file = path.join(cacheDir, checksum);
    return await readFile(file, { encoding: "utf-8" });
  } catch (e) {}
  return null;
};

const createBlurDataURL = async (buffer: Buffer, checksum: string) => {
  const image = sharp(buffer);
  const blurDataURL = await createPlaceholder(image);

  const file = path.join(cacheDir, checksum);

  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, blurDataURL, { encoding: "utf-8" });

  return blurDataURL;
};

const fetchAndResolve = async (imageUrl: string, checksum: string): Promise<string> => {
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`failed to fetch ${imageUrl}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  return createBlurDataURL(buffer, checksum);
};



const resolveImageBlurDataURL = async (sourceRoot: string, directory: string, image: string) => {
  const checksum = sha256sum(image);
  let blurDataURL = await resolveFromFile(checksum);

  if (!blurDataURL) {
    if (!image.includes("://")) {
      const relativePath = path.join(sourceRoot, directory, image);
      blurDataURL = await createBlurDataURL(await readFile(relativePath), checksum);
    } else {
      blurDataURL = await fetchAndResolve(image, checksum);
    }
  }
  return blurDataURL;
};

export default resolveImageBlurDataURL;
