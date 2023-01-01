interface Response {
  data: Data;
  includes: Includes;
}

interface Data {
  created_at: string;
  text: string;
  id: string;
  edit_history_tweet_ids: string[];
  author_id: string;
}

interface Includes {
  users: UsersItem[];
}

interface UsersItem {
  profile_image_url: string;
  name: string;
  id: string;
  username: string;
}

const fetchTweet = async (id: string) => {
  const options = "?expansions=author_id&tweet.fields=created_at&user.fields=profile_image_url";

  const response = await fetch(`https://api.twitter.com/2/tweets/${id}${options}`, {
    headers: { Authorization: `Bearer ${process.env.TWITTER_TOKEN}` },
  });

  if (!response.ok) {
    throw new Error("Twitter response is not ok");
  }

  const body: Response = await response.json();
  const tweet: Data = body.data;
  const author = body.includes.users.find((a) => a.id === tweet.author_id);
  if (!author) {
    throw new Error(`Could not find author with id ${tweet.author_id}`);
  }

  return {
    id: tweet.id,
    text: tweet.text,
    createdAt: tweet.created_at,
    author: {
      name: author.name,
      username: author.username,
      profileImageUrl: author.profile_image_url,
    },
    url: `https://twitter.com/${author.username}/status/${tweet.id}`,
  };
};

export default fetchTweet;
