import clsx from "clsx";
import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
  className?: string;
};

type IconExternalLinkProps = Props & {
  href: string;
};

const createClassName = (className?: string) =>
  clsx(
    "hover:[&>*]:stroke-[3px] border-b-2 pb-0.5 border-b-transparent hover:border-b-cyan-500 dark:hover:border-b-cyan-400",
    className
  );

export const IconExternalLink = ({ title, href, className, children }: IconExternalLinkProps) => (
  <a title={title} target="_blank" href={href} rel="noopener noreferrer" className={createClassName(className)}>
    {children}
  </a>
);

type IconButtonProps = Props & {
  onClick: () => void;
};

export const IconButton = ({ title, onClick, className, children }: IconButtonProps) => (
  <button title={title} onClick={onClick} className={createClassName(className)}>
    {children}
  </button>
);
