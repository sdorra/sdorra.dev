import { Meta } from "@content-collections/core";
import fs from "fs/promises";
import { Element, Root } from "hast";
import crypto from "node:crypto";
import path from "node:path";
import sharp from "sharp";
import { Plugin } from "unified";
import { visit } from "unist-util-visit";
import { VFile } from "vfile";
import createPlaceholder from "./placeholder";

type FileData = {
  _meta: Meta & {
    relativeDirectoryPath: string;
    relativeFilePath: string;
  };
};

const fileChecksum = async (file: string) => {
  try {
    return checksum(await fs.readFile(file));
  } catch (_) {
    return "";
  }
};

const checksum = (content: Buffer) => {
  return crypto.createHash("sha256").update(content).digest("hex");
};

const findPath = (file: VFile, image: Element) => {
  const data = file.data as FileData;

  const directory = data._meta.directory;
  if (directory && directory !== ".") {
    return path.join(directory, (image.properties?.src as string) || "");
  }

  return (image.properties?.src as string) || "";
};

const copy = async (source: string, sha256sum: string, target: string) => {
  if (sha256sum !== (await fileChecksum(target))) {
    const targetDir = path.dirname(target);

    await fs.mkdir(targetDir, { recursive: true });
    await fs.copyFile(source, target);
  }
};

const metadata = async (resourcePath: string, source: string, pathname: string) => {
  const content = await fs.readFile(source);
  const image = await sharp(content);

  const { width, height } = await image.metadata();

  if (!width || !height) {
    return null;
  }

  const src = resourcePath + "/" + pathname;

  const sha256 = checksum(content);

  const blurDataURL = await createPlaceholder(image);
  return {
    sha256,
    props: {
      width,
      height,
      src,
      blurDataURL,
    },
  };
};

const processImage = async (options: Options, file: VFile, node: Element): Promise<void> => {
  const root = options.sourceRoot;

  const pathname = findPath(file, node);
  const source = path.join(root, pathname);

  const meta = await metadata(options.resourcePath, source, pathname);
  if (!meta) {
    return;
  }

  const target = path.join(options.publicDir, pathname);
  await copy(source, meta.sha256, target);

  if (!node.properties) {
    node.properties = {};
  }
  node.properties = {
    ...node.properties,
    ...meta.props,
  };
};

type Options = {
  sourceRoot: string;
  publicDir: string;
  resourcePath: string;
};

const staticImages: Plugin<[Options], Root> = (options) => (tree, file, done) => {
  const tasks: Promise<void>[] = [];

  visit(tree, "element", (node) => {
    if (node.tagName === "img") {
      tasks.push(processImage(options, file, node));
    }
  });

  Promise.all(tasks).then(() => done());
};

export const staticCoverImage = async (
  sourceRoot: string,
  targetRoot: string,
  resourcePath: string,
  directory: string,
  image: string,
) => {
  if (image.includes("://")) {
    return image;
  }

  const source = path.join(sourceRoot, directory, image);
  const content = await fs.readFile(source);
  const sha256sum = checksum(content);
  const target = path.join(targetRoot, directory, image);

  await copy(source, sha256sum, target);

  return `${resourcePath}/${directory}/${image}`;
};

export default staticImages;
