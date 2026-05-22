import { Paragraph } from "mdast";
import { createJSONParseAST } from "../utils";
import { Author, queryGitHub, Repository } from "./core";

const query = `query issue($owner: String!, $repo: String!, $id: Int!) {
  repository(owner: $owner, name: $repo) {
    issue(number: $id) {
      number
      url
      titleHTML
      createdAt
      author {
        login
        avatarUrl
        url
      }
    }
  }
}`;


export type Issue = {
  number: number;
  url: string;
  titleHTML: string;
  createdAt: string;
  author: Author;
};

type Result = {
  data: {
    repository: {
      issue: Issue;
    } | null;
  };
};

const fetchIssue = async (owner: string, repo: string, id: string) => {
  const variables = {
    owner,
    repo,
    id: Number(id),
  };

  const result = await queryGitHub<Result>(query, variables);
  return result?.data.repository?.issue ?? null;
};

const fetchAndTransformIssue = async (node: Paragraph, owner: string, repo: string, id: string) => {
  const issue = await fetchIssue(owner, repo, id);
  if (!issue) {
    return;
  }

  const repository: Repository = {
    owner,
    name: repo,
  };

  Object.assign(node, {
    type: "mdxJsxFlowElement",
    name: "GitHubIssue",
    attributes: [
      {
        type: "mdxJsxAttribute",
        name: "issue",
        value: {
          type: "mdxJsxAttributeValueExpression",
          data: {
            estree: createJSONParseAST(JSON.stringify(issue)),
          },
        },
      },
      {
        type: "mdxJsxAttribute",
        name: "repository",
        value: {
          type: "mdxJsxAttributeValueExpression",
          data: {
            estree: createJSONParseAST(JSON.stringify(repository)),
          },
        },
      },
    ],
    children: [],
    position: {},
  });
};

export default fetchAndTransformIssue;
