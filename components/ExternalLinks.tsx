import { Rss, Github, Twitter } from "lucide-react";

type Props = {
  className?: string;
};

export const FeedLink = ({ className }: Props) => (
  <a title="RSS Feed" target="_blank" href="/rss.xml" rel="noreferrer" className={className}>
    <Rss />
  </a>
);

export const GitHubLink = ({ className }: Props) => (
  <a title="GitHub" target="_blank" href="https://github.com/sdorra/sdorra.dev" rel="noreferrer" className={className}>
    <Github />
  </a>
);

export const TwitterLink = ({ className }: Props) => (
  <a title="Twitter" target="_blank" href="https://twitter.com/ssdorra" rel="noreferrer" className={className}>
    <Twitter />
  </a>
);


