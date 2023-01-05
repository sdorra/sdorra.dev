import { PullRequest, Repository } from "lib/mdxEmbedder/github";
import { Github } from "lucide-react";
import Image from "next/image";
import React from "react";
import DateTime from "./DateTime";

type Props = {
  repository: Repository;
  pullRequest: PullRequest;
};

const GitHubPullRequest = ({ repository, pullRequest }: Props) => (
  <div className="gh-pr not-prose">
    <a
      href={pullRequest.url}
      target="_blank"
      rel="noreferrer"
      className="group relative mb-2 flex flex-col gap-2 rounded-md border-2 p-5 shadow-md hover:border-cyan-600 dark:border-zinc-700 dark:hover:border-cyan-400"
    >
      <p className="text-lg font-bold"><span className="text-zinc-500 dark:text-zinc-400">{repository.owner}/{repository.name}</span> <span dangerouslySetInnerHTML={{ __html: pullRequest.titleHTML }} /></p>
      <p className="text-sm">Pull Request #{pullRequest.number} opened on <DateTime value={pullRequest.createdAt} /> by</p>
      <div className="flex items-center gap-2">
        <Image
          className="h-8 w-8 flex-shrink-0 rounded-full shadow-md ring-2 ring-zinc-300 dark:ring-zinc-700"
          src={pullRequest.author.avatarUrl}
          width={32}
          height={32}
          alt={`Profile of ${pullRequest.author.login}`}
        />
        <p>{pullRequest.author.login}</p>
      </div>
      <Github className="absolute top-2 right-2 stroke-2 text-zinc-400 group-hover:stroke-[3px] group-hover:text-cyan-600 dark:text-zinc-500 dark:group-hover:text-cyan-400" />
    </a>
  </div>
);

export default GitHubPullRequest;
