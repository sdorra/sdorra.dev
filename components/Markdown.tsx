"use client";

/* eslint-disable react-hooks/static-components */

import { getMDXComponent } from "mdx-bundler/client";
import Notification from "components/Notification";
import { Hash } from "lucide-react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ReactNode, useMemo } from "react";
import ContentSection from "./ContentSection";
import FileTree from "./FileTree";
import { GitHubIssue, GitHubPullRequest } from "./GitHub";
import MarkdownImage from "./MarkdownImage";
import StaticTweet from "./StaticTweet";

type Props = {
  code: string;
};

type HeadingProps = {
  id?: string;
  children?: ReactNode;
};

const mdxGlobals = {
  React: { ...React, default: React },
  ReactDOM: { ...ReactDOM, default: ReactDOM },
};

const createMDXComponent = (code: string) => getMDXComponent(code, mdxGlobals);

const heading = (As: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") => {
  const Heading = ({ id, children }: HeadingProps) => (
    <a href={`#${id}`} className="group relative no-underline focus-visible:ring-0">
      <Hash
        className="absolute -left-5 hidden h-full p-1 text-primary-500 group-hover:block group-focus-visible:block sm:-left-6 dark:text-primary-400"
        strokeWidth="3"
      />
      <As
        id={id}
        className="group-focus-visible:underline group-focus-visible:decoration-primary-500 group-focus-visible:decoration-2"
      >
        {children}
      </As>
    </a>
  );
  Heading.displayName = As;
  return Heading;
};

const Markdown = ({ code }: Props) => {
  const Component = useMemo(() => createMDXComponent(code), [code]);

  return (
    <ContentSection>
      <Component
        components={{
          Notification,
          FileTree,
          StaticTweet,
          GitHubPullRequest,
          GitHubIssue,
          img: MarkdownImage,
          h1: heading("h1"),
          h2: heading("h2"),
          h3: heading("h3"),
          h4: heading("h4"),
          h5: heading("h5"),
          h6: heading("h6"),
        }}
      />
    </ContentSection>
  );
};

export default Markdown;
