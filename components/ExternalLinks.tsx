import { Rss } from "lucide-react";
import { GitHubIcon, IconExternalLink, TwitterIcon } from "./icons";

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
    <GitHubIcon />
  </IconExternalLink>
);

export const TwitterLink = ({ className }: Props) => (
  <IconExternalLink title="Twitter" href="https://twitter.com/ssdorra" className={className}>
    <TwitterIcon />
  </IconExternalLink>
);
