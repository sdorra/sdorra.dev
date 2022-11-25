import clsx from "clsx";
import { CornerDownRight, File, FolderOpen } from "lucide-react";

type TreeNode = FileNode | DirectoryNode;

type DirectoryNode = {
  name: string;
  type: "directory";
  children: TreeNode[];
};

type FileNode = {
  name: string;
  type: "file";
  size: number;
};

type Props = {
  nodes: TreeNode[];
  className?: string;
};

const isDirectory = (node: TreeNode): node is DirectoryNode => {
  return node.type === "directory";
};

const isFile = (node: TreeNode): node is FileNode => {
  return node.type === "file";
};

const humanFileSize = (size: number) => {
  const i: number = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  return (size / Math.pow(1024, i)).toFixed(2) + " " + ["B", "kB", "MB", "GB", "TB"][i];
};

type FileSizeProps = {
  size: number;
};

const FileSize = ({ size }: FileSizeProps) => <span className="mr-2">({humanFileSize(size)})</span>;

type LeafNodeProps = {
  node: TreeNode;
  depth: number;
};

const LeafNode = ({ node, depth }: LeafNodeProps) => {
  const Icon = isDirectory(node) ? FolderOpen : File;
  return (
    <li className="flex gap-1">
      {depth > 0 ? (
        <div className="flex items-center justify-end" style={{ width: depth * 24 }}>
          <CornerDownRight className="w-4 text-zinc-300 dark:text-zinc-600" />
        </div>
      ) : null}
      <Icon className="w-6" />
      <div className="flex w-full justify-between">
        <div>{node.name}</div>
        <div>{isFile(node) ? <FileSize size={node.size} /> : null}</div>
      </div>
    </li>
  );
};

const renderNode = (node: TreeNode, depth: number) => {
  return (
    <>
      <LeafNode node={node} depth={depth} />
      {isDirectory(node)
        ? (node.children || []).map((c) => <ul key={depth + "_" + c.name}>{renderNode(c, depth + 1)}</ul>)
        : null}
    </>
  );
};

const FileTree = ({ nodes, className }: Props) => (
  <ul
    className={clsx(
      "not-prose flex flex-col gap-2 rounded-md border-2 border-zinc-300 p-5 shadow-md dark:border-zinc-700",
      className
    )}
  >
    {nodes.map((n) => renderNode(n, 0))}
  </ul>
);

export default FileTree;
