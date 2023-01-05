import { Tweet } from "lib/mdxEmbedder/twitter";
import { Twitter } from "lucide-react";
import Avatar from "./Avatar";
import DateTime from "./DateTime";
import EmbeddedCard from "./EmbeddedCard";

type Props = {
  tweet: Tweet;
};

const StaticTweet = ({ tweet }: Props) => (
  <EmbeddedCard href={tweet.url} icon={Twitter} className="gap-5">
    <Avatar
      src={tweet.author.profileImageUrl}
      alt={`Profile of ${tweet.author.name}`}
      size={64}
      className="w-8 md:h-16 h-8 md:w-16"
    />
    <div className="flex flex-col gap-2">
      <p className="text-lg font-bold">{tweet.author.name}</p>
      <blockquote dangerouslySetInnerHTML={{ __html: tweet.text }} />
      <DateTime value={tweet.createdAt} className="text-xs text-zinc-500 dark:text-zinc-400" />
    </div>
  </EmbeddedCard>
);

export default StaticTweet;
