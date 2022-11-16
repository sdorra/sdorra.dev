"use client";

import clsx from "clsx";
import Notification from "components/Notification";
import { useMDXComponent } from "next-contentlayer/hooks";

type Props = {
  code: string;
};

const Markdown = ({ code }: Props) => {
  const MDXComponent = useMDXComponent(code);
  return (
    <section
      className={clsx(
        "prose prose-zinc dark:prose-invert",
        "prose-code:px-0.5 prose-code:font-normal prose-code:border prose-code:rounded prose-code:before:content-none prose-code:after:content-none",
        "prose-code:border-zinc-300 prose-code:bg-zinc-100 prose-code:text-zinc-700",
        "dark:prose-code:border-zinc-500 dark:prose-code:bg-zinc-700 dark:prose-code:text-zinc-100",
        "hover:prose-a:decoration-cyan-500 hover:prose-a:decoration-2"
      )}
    >
      <MDXComponent components={{ Notification }} />
    </section>
  );
};

export default Markdown;
