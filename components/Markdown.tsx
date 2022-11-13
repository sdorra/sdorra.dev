"use client";

import { useMDXComponent } from "next-contentlayer/hooks";

type Props = {
  code: string;
};

const Markdown = ({ code }: Props) => {
  const MDXComponent = useMDXComponent(code);
  return (
    <div className="prose prose-zinc">
      <MDXComponent />
    </div>
  );
};

export default Markdown;
