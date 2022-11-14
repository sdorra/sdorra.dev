import { Rss } from "lucide-react";

type Props = {
  className?: string;
};

const FeedLink = ({ className }: Props) => (
  <a title="RSS Feed" target="_blank" href="/rss.xml" rel="noreferrer" className={className}>
    <Rss />
  </a>
);

export default FeedLink;
