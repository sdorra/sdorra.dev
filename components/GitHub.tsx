import { Issue, PullRequest, Repository } from "lib/mdxEmbedder/github";
import { Github } from "lucide-react";
import Avatar from "./Avatar";
import DateTime from "./DateTime";
import EmbeddedCard from "./EmbeddedCard";

type Props =
  | {
      type: "Pull Request";
      entity: PullRequest;
      repository: Repository;
    }
  | {
      type: "Issue";
      entity: Issue;
      repository: Repository;
    };

const EmbeddedEntity = ({ repository, entity, type }: Props) => (
  <EmbeddedCard href={entity.url} icon={Github} className="flex-col gap-2">
    <p className="text-lg font-bold">
      <span className="text-zinc-500 dark:text-zinc-400">
        {repository.owner}/{repository.name}
      </span>{" "}
      <span dangerouslySetInnerHTML={{ __html: entity.titleHTML }} />
    </p>
    <p className="text-sm">
      {type} #{entity.number} opened on <DateTime value={entity.createdAt} /> by
    </p>
    <div className="flex items-center gap-2">
      <Avatar src={entity.author.avatarUrl} alt={`Profile of ${entity.author.login}`} size={32} className="h-8 w-8" />
      <p>{entity.author.login}</p>
    </div>
  </EmbeddedCard>
);

type PullRequestProps = {
  repository: Repository;
  pullRequest: PullRequest;
};

export const GitHubPullRequest = ({ pullRequest, repository }: PullRequestProps) => (
  <EmbeddedEntity type="Pull Request" repository={repository} entity={pullRequest} />
);

type IssueProps = {
  repository: Repository;
  issue: Issue;
};

export const GitHubIssue = ({ repository, issue }: IssueProps) => (
  <EmbeddedEntity type="Issue" repository={repository} entity={issue} />
);
