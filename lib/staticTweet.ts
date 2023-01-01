import { Link, Paragraph, Root, Text } from "mdast";
import { Plugin } from "unified";
import { visit } from "unist-util-visit";
import fetchTweet from "./fetchTweets";

const getUrlString = (url: string): string | null => {
  const urlString = url.startsWith("http") ? url : `https://${url}`;

  try {
    return new URL(urlString).toString();
  } catch (error: unknown) {
    return null;
  }
};

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

// borrowed from ggoodman/nostalgie
// https://github.com/ggoodman/nostalgie/blob/26a7fad65faefdffe3ea06f0b9892ba3dd5c1efa/src/worker/mdxCompiler.ts
const createJSONParseAST = (value: string) => {
  return {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "CallExpression",
          callee: {
            type: "MemberExpression",
            object: {
              type: "Identifier",
              name: "JSON",
            },
            property: {
              type: "Identifier",
              name: "parse",
            },
            computed: false,
            optional: false,
          },
          arguments: [
            {
              type: "Literal",
              value: value,
              raw: JSON.stringify(value),
            },
          ],
          optional: false,
        },
      },
    ],
    sourceType: "module",
    comments: [],
  };
};

type Options = {};

const staticTweet: Plugin<[Options], Root> = (options) => (tree, file, done) => {
  const tasks: Promise<void>[] = [];

  visit(tree, "paragraph", (paragraphNode) => {
    if (paragraphNode.children.length !== 1) {
      return;
    }

    const { children } = paragraphNode;
    const node = children[0] as Link | Text;
    const isText = node.type === "text";

    // it's a valid link if there's no title, and the value is the same as the URL
    const isValidLink =
      node.type === "link" &&
      !node.title &&
      node.children.length === 1 &&
      node.children[0].type === "text" &&
      node.children[0].value === node.url;
    if (!(isText || isValidLink)) {
      return;
    }

    const value = isText ? node.value : node.url;
    const urlString = getUrlString(value);
    if (!urlString) {
      return;
    }

    const id = getIdFromUrl(urlString);
    if (!id) {
      return;
    }

    tasks.push(fetchAndTransform(paragraphNode, id));
  });

  Promise.all(tasks).then(() => done());
};

export default staticTweet;
