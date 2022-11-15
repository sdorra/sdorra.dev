import { Github, Rss, Twitter } from "lucide-react";
import { IconExternalLink } from "./icons";

type Props = {
  className?: string;
};

export const FeedLink = ({ className }: Props) => (
  <IconExternalLink title="RSS Feed" href="/rss.xml" className={className}>
    <Rss />
  </IconExternalLink>
);

export const GitHubLink = ({ className }: Props) => (
  <IconExternalLink title="GitHub" href="https://github.com/sdorra/sdorra.dev" className={className}>
    <Github />
  </IconExternalLink>
);

export const TwitterLink = ({ className }: Props) => (
  <IconExternalLink title="Twitter" href="https://twitter.com/ssdorra" className={className}>
    <Twitter />
  </IconExternalLink>
);
