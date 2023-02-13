import clsx from "clsx";
import { LucideProps } from "lucide-react";
import { ComponentType, ReactNode } from "react";
import Avatar from "./Avatar";

type Props = {
  href: string;
  className?: string;
  children?: ReactNode;
};

const EmbeddedCard = ({ href, className, children }: Props) => (
  <div className="not-prose">
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={clsx(
        "group mb-2 block space-y-2 rounded-md p-5 shadow-md",
        "border-l-8 border-r border-t border-b",
        "border-base-300 dark:border-base-600",
        "hover:border-primary-600 dark:hover:border-primary-400",
        className
      )}
    >
      {children}
    </a>
  </div>
);

type IconProps = {
  icon: ComponentType<LucideProps>;
  className?: string;
};

const EmbeddedIcon = ({ icon: Icon, className }: IconProps) => (
  <Icon
    className={clsx(
      "flex-shrink-0 stroke-2 group-hover:stroke-[3px]",
      "text-base-400 dark:text-base-500",
      "group-hover:text-primary-600 dark:group-hover:text-primary-400",
      className
    )}
  />
);

type TitleProps = {
  children?: ReactNode;
  icon: ComponentType<LucideProps>;
};

const Title = ({ children, icon }: TitleProps) => (
  <div className="flex justify-between">
    {children}
    <EmbeddedIcon icon={icon} />
  </div>
);

Title.displayName = "EmbeddedCard.Title";

EmbeddedCard.Title = Title;

type AuthorProps = {
  name: string;
  avatar?: {
    src: string;
    alt: string;
  };
};

const Author = ({ name, avatar }: AuthorProps) => (
  <div className="flex items-center gap-2">
    {avatar ? <Avatar src={avatar.src} alt={avatar.alt} size={32} className="h-8 w-8" /> : null}

    <p>{name}</p>
  </div>
);

Author.displayName = "EmbeddedCard.Author";

EmbeddedCard.Author = Author;

export default EmbeddedCard;
