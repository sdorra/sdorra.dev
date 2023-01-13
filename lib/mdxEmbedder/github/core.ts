
export type Author = {
  login: string;
  avatarUrl: string;
  url: string;
};

export type Repository = {
  owner: string;
  name: string;
}

export const queryGitHub = async <T>(query: string, variables: object): Promise<T> => {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  return await response.json();
};
