import clsx from "clsx";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
const ContentSection = ({ children }: Props) => (
  <section
    className={clsx(
      "prose prose-base dark:prose-invert",
      "prose-code:rounded prose-code:border prose-code:px-0.5 prose-code:font-normal prose-code:before:content-none prose-code:after:content-none",
      "prose-code:border-base-300 prose-code:bg-base-100 prose-code:text-base-700",
      "dark:prose-code:border-base-500 dark:prose-code:bg-base-700 dark:prose-code:text-base-100",
      "hover:prose-a:decoration-primary-500 hover:prose-a:decoration-2"
    )}
  >
    {children}
  </section>
);

export default ContentSection;
