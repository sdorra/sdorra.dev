import { GitHubIssue, GitHubPullRequest } from "./GitHub";

const pullRequestOne = {
  repository: { owner: "vercel", name: "next.js" },
  pullRequest: {
    number: 43717,
    url: "https://github.com/vercel/next.js/pull/43717",
    titleHTML: "Remove additional <code>&lt;div&gt;</code> at each segment level in <code>app</code>",
    createdAt: "2022-12-05T09:54:48Z",
    author: {
      login: "timneutkens",
      avatarUrl: "https://avatars.githubusercontent.com/u/6324199?u=169d4664136cfc36d413184fe30b811ce7a548d5&v=4",
      url: "https://github.com/timneutkens",
    },
  },
};

const pullRequestTwo = {
  repository: { owner: "shikijs", name: "shiki" },
  pullRequest: {
    number: 314,
    url: "https://github.com/shikijs/shiki/pull/314",
    titleHTML: "feat: Dynamic CSS Variables",
    createdAt: "2022-04-24T14:52:20Z",
    author: {
      login: "OskarGroth",
      avatarUrl: "https://avatars.githubusercontent.com/u/1417019?u=5e9bfe116318340aba316207143949eb8e04057d&v=4",
      url: "https://github.com/OskarGroth",
    },
  },
};

const issueOne = {
  repository: { owner: "code-hike", name: "codehike" },
  issue: {
    number: 271,
    url: "https://github.com/code-hike/codehike/issues/271",
    titleHTML: "Ability to switch themes?",
    createdAt: "2022-08-18T19:15:56Z",
    author: {
      login: "stursby",
      avatarUrl: "https://avatars.githubusercontent.com/u/527849?u=4a9468b27a5158ad1867ccd071d6b33b131a2da4&v=4",
      url: "https://github.com/stursby",
    },
  },
};

export const PullRequest = () => (
  <ul className="space-y-4">
    <li>
      <GitHubPullRequest {...pullRequestOne} />
    </li>
    <li>
      <GitHubPullRequest {...pullRequestTwo} />
    </li>
  </ul>
);

export const Issue = () => <GitHubIssue {...issueOne} />;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "GitHub",
};
