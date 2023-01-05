import clsx from "clsx";
import { LucideProps } from "lucide-react";
import { ComponentType, ReactNode } from "react";

type Props = {
  href: string;
  icon: ComponentType<LucideProps>;
  className?: string;
  children?: ReactNode;
};

const EmbeddedCard = ({ href, className, children, icon: Icon }: Props) => (
  <div className="not-prose">
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={clsx(
        "group relative mb-2 flex rounded-md border-2 p-5 shadow-md hover:border-cyan-600 dark:border-zinc-700 dark:hover:border-cyan-400",
        className
      )}
    >
      {children}
      <Icon className="absolute top-2 right-2 stroke-2 text-zinc-400 group-hover:stroke-[3px] group-hover:text-cyan-600 dark:text-zinc-500 dark:group-hover:text-cyan-400" />
    </a>
  </div>
);

export default EmbeddedCard;
