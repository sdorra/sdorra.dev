"use client";

import { useMDXComponent } from "next-contentlayer/hooks";

type Props = {
  code: string;
};

const Markdown = ({ code }: Props) => {
  const MDXComponent = useMDXComponent(code);
  return (
    <section className="prose prose-zinc">
      <MDXComponent />
    </section>
  );
};

export default Markdown;
