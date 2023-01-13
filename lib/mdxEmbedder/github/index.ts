import { Provider } from "../provider";
import { Author, Repository } from "./core";
import fetchAndTransformIssue, { Issue } from "./issue";
import fetchAndTransformPullRequest, { PullRequest } from "./pull";

export type { Repository, PullRequest, Issue, Author };

const GitHubProvider: Provider = {
  baseUrl: "https://github.com",
  transform(node, url) {
    const parts = url.split("/").slice(3, 7);
    if (parts.length !== 4) {
      return null;
    }

    const [slug, repo, type, id] = parts;
    if (type === "pull") {
      return fetchAndTransformPullRequest(node, slug, repo, id);
    } else if (type === "issues") {
      return fetchAndTransformIssue(node, slug, repo, id);
    } else {
      console.log(`Unsupported github type: ${type}`);
    }

    return null;
  },
};

export default GitHubProvider;
