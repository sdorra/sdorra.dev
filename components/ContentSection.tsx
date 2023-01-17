import clsx from "clsx";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
const ContentSection = ({ children }: Props) => (
  <section
    className={clsx(
      "prose prose-zinc dark:prose-invert",
      "prose-code:rounded prose-code:border prose-code:px-0.5 prose-code:font-normal prose-code:before:content-none prose-code:after:content-none",
      "prose-code:border-zinc-300 prose-code:bg-zinc-100 prose-code:text-zinc-700",
      "dark:prose-code:border-zinc-500 dark:prose-code:bg-zinc-700 dark:prose-code:text-zinc-100",
      "hover:prose-a:decoration-cyan-500 hover:prose-a:decoration-2"
    )}
  >
    {children}
  </section>
);

export default ContentSection;
