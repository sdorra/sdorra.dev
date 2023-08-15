import fs from "fs/promises";
import path from "path";

interface Tweet {
  __typename: string;
  lang: string;
  favorite_count: number;
  created_at: string;
  display_text_range: number[];
  entities: Entities;
  id_str: string;
  text: string;
  user: User;
  edit_control: Edit_control;
  conversation_count: number;
  news_action_type: string;
  isEdited: boolean;
  isStaleEdit: boolean;
}

interface Entities {
  hashtags: any[];
  urls: any[];
  user_mentions: any[];
  symbols: any[];
}

interface User {
  id_str: string;
  name: string;
  profile_image_url_https: string;
  screen_name: string;
  verified: boolean;
  is_blue_verified: boolean;
}

interface Edit_control {
  edit_tweet_ids: string[];
  editable_until_msecs: string;
  is_edit_eligible: boolean;
  edits_remaining: string;
}

// https://github.com/vercel/react-tweet/pull/128/files
const getToken = (id: string) => ((Number(id) / 1e15) * Math.PI).toString(6 ** 2).replace(/(0+|\.)/g, "");

const fetchTweetFromTwitter = async (id: string): Promise<Tweet> => {
  const response = await fetch(`https://cdn.syndication.twimg.com/tweet-result?id=${id}&token=${getToken(id)}`);
  if (!response.ok) {
    throw new Error("Twitter response is not ok");
  }

  return await response.json();
};

const createFilePath = (id: string) => path.join(process.cwd(), "content", "tweets", `${id}.json`);

const readTweetFromLocalStorage = async (id: string): Promise<Tweet | null> => {
  const file = createFilePath(id);
  try {
    const tweet = await fs.readFile(file, "utf8");
    return JSON.parse(tweet);
  } catch (e) {
    return null;
  }
};

const writeFileToLocalStorage = async (id: string, tweet: Tweet) => {
  const file = createFilePath(id);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(createFilePath(id), JSON.stringify(tweet, null, 2));
};

const fetchTweet = async (id: string) => {
  let tweet = await readTweetFromLocalStorage(id);
  if (!tweet) {
    tweet = await fetchTweetFromTwitter(id);
    await writeFileToLocalStorage(id, tweet);
  }

  return {
    id: tweet.id_str,
    text: tweet.text,
    createdAt: tweet.created_at,
    author: {
      name: tweet.user.name,
      username: tweet.user.screen_name,
      profileImageUrl: tweet.user.profile_image_url_https,
    },
    url: `https://twitter.com/${tweet.user.name}/status/${tweet.id_str}`,
  };
};

export default fetchTweet;
