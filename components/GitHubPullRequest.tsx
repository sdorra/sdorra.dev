import { PullRequest, Repository } from "lib/mdxEmbedder/github";
import { Github } from "lucide-react";
import Avatar from "./Avatar";
import DateTime from "./DateTime";
import EmbeddedCard from "./EmbeddedCard";

type Props = {
  repository: Repository;
  pullRequest: PullRequest;
};

const GitHubPullRequest = ({ repository, pullRequest }: Props) => (
  <EmbeddedCard href={pullRequest.url} icon={Github} className="flex-col gap-2">
    <p className="text-lg font-bold">
      <span className="text-zinc-500 dark:text-zinc-400">
        {repository.owner}/{repository.name}
      </span>{" "}
      <span dangerouslySetInnerHTML={{ __html: pullRequest.titleHTML }} />
    </p>
    <p className="text-sm">
      Pull Request #{pullRequest.number} opened on <DateTime value={pullRequest.createdAt} /> by
    </p>
    <div className="flex items-center gap-2">
      <Avatar
        src={pullRequest.author.avatarUrl}
        alt={`Profile of ${pullRequest.author.login}`}
        size={32}
        className="h-8 w-8"
      />
      <p>{pullRequest.author.login}</p>
    </div>
  </EmbeddedCard>
);

export default GitHubPullRequest;
