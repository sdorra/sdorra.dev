
export type Author = {
  login: string;
  avatarUrl: string;
  url: string;
};

export type Repository = {
  owner: string;
  name: string;
}

export const queryGitHub = async <T>(query: string, variables: object): Promise<T | null> => {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return null;
  }

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    return null;
  }

  return await response.json();
};
