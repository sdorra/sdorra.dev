import { Tweet } from "lib/mdxEmbedder/twitter";
import { Twitter } from "lucide-react";
import Image from "next/image";
import DateTime from "./DateTime";

type Props = {
  tweet: Tweet;
};

const StaticTweet = ({ tweet }: Props) => (
  <div className="tweet not-prose">
    <a
      href={tweet.url}
      target="_blank"
      rel="noreferrer"
      className="group relative mb-2 flex gap-5 rounded-md border-2 p-5 shadow-md hover:border-cyan-600 dark:border-zinc-700 dark:hover:border-cyan-400"
    >
      <Image
        className="h-16 w-16 flex-shrink-0 rounded-full shadow-md ring-2 ring-zinc-300 dark:ring-zinc-700"
        src={tweet.author.profileImageUrl}
        width={64}
        height={64}
        alt={`Profile of ${tweet.author.name}`}
      />
      <div className="flex flex-col gap-2">
        <p className="text-lg font-bold">{tweet.author.name}</p>
        <blockquote dangerouslySetInnerHTML={{__html: tweet.text}} />
        <DateTime value={tweet.createdAt} className="text-xs text-zinc-500 dark:text-zinc-400" />
      </div>
      <Twitter className="absolute top-2 right-2 stroke-2 text-zinc-400 group-hover:stroke-[3px] group-hover:text-cyan-600 dark:text-zinc-500 dark:group-hover:text-cyan-400" />
    </a>
  </div>
);

export default StaticTweet;
