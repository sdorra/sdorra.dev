import { RawDocumentData } from "contentlayer/source-files";
import fs from "fs/promises";
import { Element, Root } from "hast";
import crypto from "node:crypto";
import path from "node:path";
import sharp from "sharp";
import { Plugin, VFileWithOutput } from "unified";
import { visit } from "unist-util-visit";
import createPlaceholder from "./placeholder";

type FileData = {
  rawDocumentData: RawDocumentData;
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

const findRoot = (file: VFileWithOutput<unknown>) => {
  return file.dirname || process.cwd();
};

const findPath = (file: VFileWithOutput<unknown>, image: Element) => {
  const data = file.data as FileData;

  const directory = data.rawDocumentData.sourceFileDir;
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

const processImage = async (options: Options, file: VFileWithOutput<unknown>, node: Element): Promise<void> => {
  const root = findRoot(file);

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

export default staticImages;
