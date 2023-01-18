import { Tweet } from "lib/mdxEmbedder/twitter";
import StaticTweet from "./StaticTweet";

const TweetOne: Tweet = {
  id: "1601349358255214592",
  text: "With the latest Next.js canary the `app` directory no longer adds additional `&lt;div&gt;`s\n\nThese were used to scroll layouts into view when navigating, this behavior is preserved without needing the extra element.\n\nAvailable through npm install next@canary",
  createdAt: "2022-12-09T22:53:33.000Z",
  author: {
    name: "Tim",
    username: "timneutkens",
    profileImageUrl: "https://pbs.twimg.com/profile_images/1590767370515222547/0IvrAKEJ_normal.jpg",
  },
  url: "https://twitter.com/timneutkens/status/1601349358255214592",
};

export const Default = () => <StaticTweet tweet={TweetOne} />;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Twitter",
};
