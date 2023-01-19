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
  <EmbeddedCard href={entity.url}>
    <EmbeddedCard.Title icon={Github}>
      <p className="text-lg font-bold">
        <span className="text-zinc-500 dark:text-zinc-400">
          {repository.owner}/{repository.name}
        </span>{" "}
        <span dangerouslySetInnerHTML={{ __html: entity.titleHTML }} />
      </p>
    </EmbeddedCard.Title>
    <p className="text-sm">
      {type} #{entity.number} opened on <DateTime value={entity.createdAt} /> by
    </p>
    <EmbeddedCard.Author
      name={entity.author.login}
      avatar={{ src: entity.author.avatarUrl, alt: `Profile of ${entity.author.login}` }}
    />
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
