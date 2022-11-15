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
        "hover:prose-a:decoration-cyan-500 hover:prose-a:decoration-2",
        // colors are taken from the shiki theme, which is configure in the contentlayer.config.js
        "prose-code:rounded prose-code:bg-[rgb(46,52,64)] prose-code:px-1 prose-code:font-normal prose-code:text-[rgb(216,222,233)] prose-code:before:content-none prose-code:after:content-none dark:prose-code:text-[rgb(143,188,187)]"
      )}
    >
      <MDXComponent components={{ Notification }} />
    </section>
  );
};

export default Markdown;
