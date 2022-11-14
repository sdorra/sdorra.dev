import clsx from "clsx";
import { Rss, Github, Twitter } from "lucide-react";
import { FC, PropsWithChildren } from "react";

type Props = {
  className?: string;
};

type ExternalLinkProps = Props & {
  title: string;
  href: string;
};

const ExternalLink: FC<PropsWithChildren<ExternalLinkProps>> = ({ title, href, className, children}) => (
  <a title={title} target="_blank" href={href} rel="noreferrer" className={clsx("hover:[&>*]:stroke-[3px]", className)}>
    {children}
  </a>
);

export const FeedLink = ({ className }: Props) => (
  <ExternalLink title="RSS Feed" href="/rss.xml" className={className}>
    <Rss />
  </ExternalLink>
);

export const GitHubLink = ({ className }: Props) => (
  <ExternalLink title="GitHub" href="https://github.com/sdorra/sdorra.dev" className={className}>
    <Github />
  </ExternalLink>
);

export const TwitterLink = ({ className }: Props) => (
  <ExternalLink title="Twitter"  href="https://twitter.com/ssdorra" className={className}>
    <Twitter />
  </ExternalLink>
);


