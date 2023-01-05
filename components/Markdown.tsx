"use client";

import clsx from "clsx";
import Notification from "components/Notification";
import { Hash } from "lucide-react";
import { useMDXComponent } from "next-contentlayer/hooks";
import { ReactNode } from "react";
import FileTree from "./FileTree";
import GitHubPullRequest from "./GitHubPullRequest";
import MarkdownImage from "./MarkdownImage";
import StaticTweet from "./StaticTweet";

type Props = {
  code: string;
};

type HeadingProps = {
  id?: string;
  children?: ReactNode;
};

const heading = (As: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") => {
  const Heading = ({ id, children }: HeadingProps) => (
    <a href={`#${id}`} className="group relative no-underline">
      <Hash
        className="absolute -left-5 hidden h-full p-1 text-cyan-500 group-hover:block dark:text-cyan-400 sm:-left-6"
        strokeWidth="3"
      />
      <As id={id}>{children}</As>
    </a>
  );
  Heading.displayName = As;
  return Heading;
};

const Markdown = ({ code }: Props) => {
  const MDXComponent = useMDXComponent(code);
  return (
    <section
      className={clsx(
        "prose prose-zinc dark:prose-invert",
        "prose-code:rounded prose-code:border prose-code:px-0.5 prose-code:font-normal prose-code:before:content-none prose-code:after:content-none",
        "prose-code:border-zinc-300 prose-code:bg-zinc-100 prose-code:text-zinc-700",
        "dark:prose-code:border-zinc-500 dark:prose-code:bg-zinc-700 dark:prose-code:text-zinc-100",
        "hover:prose-a:decoration-cyan-500 hover:prose-a:decoration-2"
      )}
    >
      <MDXComponent
        components={{
          Notification,
          FileTree,
          StaticTweet,
          GitHubPullRequest,
          img: MarkdownImage,
          h1: heading("h1"),
          h2: heading("h2"),
          h3: heading("h3"),
          h4: heading("h4"),
          h5: heading("h5"),
          h6: heading("h6"),
        }}
      />
    </section>
  );
};

export default Markdown;
