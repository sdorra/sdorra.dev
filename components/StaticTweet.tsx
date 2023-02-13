import { Tweet } from "lib/mdxEmbedder/twitter";
import { Twitter } from "lucide-react";
import Avatar from "./Avatar";
import DateTime from "./DateTime";
import EmbeddedCard from "./EmbeddedCard";

type Props = {
  tweet: Tweet;
};

const StaticTweet = ({ tweet }: Props) => (
  <EmbeddedCard href={tweet.url} className="gap-5">
    <EmbeddedCard.Title icon={Twitter}>
      <p className="text-base-500 dark:text-base-400">Tweet from <DateTime value={tweet.createdAt}/></p>
    </EmbeddedCard.Title>
    <blockquote dangerouslySetInnerHTML={{ __html: tweet.text }} />
    <EmbeddedCard.Author
      name={tweet.author.name}
      avatar={{ src: tweet.author.profileImageUrl, alt: `Profile of ${tweet.author.name}` }}
    />
  </EmbeddedCard>
);

export default StaticTweet;
