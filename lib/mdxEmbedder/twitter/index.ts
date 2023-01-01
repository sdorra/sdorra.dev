import { Paragraph } from "mdast";
import fetchTweet from "./fetchTweets";
import { Provider } from "../provider";
import { createJSONParseAST } from "../utils";

export type Tweet = Awaited<ReturnType<typeof fetchTweet>>;

const getIdFromUrl = (url: string) => {
  const parts = url.split("/");
  const lastPart = parts[parts.length - 1];
  const index = lastPart.indexOf("?");
  if (index > 0) {
    return lastPart.substring(0, index);
  }
  return lastPart;
};

const fetchAndTransform = async (node: Paragraph, id: string) => {
  const tweet = await fetchTweet(id);

  Object.assign(node, {
    type: "mdxJsxFlowElement",
    name: "StaticTweet",
    attributes: [
      {
        type: "mdxJsxAttribute",
        name: "tweet",
        value: {
          type: "mdxJsxAttributeValueExpression",
          data: {
            estree: createJSONParseAST(JSON.stringify(tweet)),
          },
        },
      },
    ],
    children: [],
    position: {},
  });
};

const TwitterProvider: Provider = {
  baseUrl: "https://twitter.com",
  transform(node, url) {
    const id = getIdFromUrl(url);
    if (!id) {
      return null;
    }

    return fetchAndTransform(node, id);
  },
};

export default TwitterProvider;
