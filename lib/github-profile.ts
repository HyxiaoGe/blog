const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
const GITHUB_LOGIN = "HyxiaoGe";
const PINNED_LIMIT = 6;
const RECENTLY_STARRED_LIMIT = 12;
const STARRED_QUERY_LIMIT = 50;

export interface GitHubLanguage {
  name: string;
  color: string | null;
}

export interface GitHubProfileRepository {
  name: string;
  nameWithOwner: string;
  owner: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  stargazerCount: number;
  forkCount: number;
  pushedAt: string;
  primaryLanguage: GitHubLanguage | null;
  topics: string[];
}

export interface RecentlyStarredRepository extends GitHubProfileRepository {
  starredAt: string;
}

export interface GitHubProfileData {
  pinned: GitHubProfileRepository[];
  recentlyStarred: RecentlyStarredRepository[];
}

interface RepositoryNode {
  name: string;
  nameWithOwner: string;
  owner: { login: string };
  description: string | null;
  url: string;
  homepageUrl: string | null;
  stargazerCount: number;
  forkCount: number;
  pushedAt: string;
  primaryLanguage: GitHubLanguage | null;
  repositoryTopics: {
    nodes: Array<{ topic: { name: string } }>;
  };
}

interface GitHubProfileResponse {
  data?: {
    user: {
      pinnedItems: { nodes: RepositoryNode[] };
      starredRepositories: {
        edges: Array<{ starredAt: string; node: RepositoryNode }>;
      };
    } | null;
  };
  errors?: Array<{ message: string }>;
}

const PROFILE_QUERY = `
  # Product-grouped profile query v1
  query ProfileRepositories(
    $login: String!
    $pinnedLimit: Int!
    $starredLimit: Int!
  ) {
    user(login: $login) {
      pinnedItems(first: $pinnedLimit, types: REPOSITORY) {
        nodes {
          ... on Repository {
            ...RepositoryFields
          }
        }
      }
      starredRepositories(
        first: $starredLimit
        orderBy: { field: STARRED_AT, direction: DESC }
      ) {
        edges {
          starredAt
          node {
            ...RepositoryFields
          }
        }
      }
    }
  }

  fragment RepositoryFields on Repository {
    name
    nameWithOwner
    owner { login }
    description
    url
    homepageUrl
    stargazerCount
    forkCount
    pushedAt
    primaryLanguage { name color }
    repositoryTopics(first: 20) {
      nodes { topic { name } }
    }
  }
`;

function normalizeRepository(repository: RepositoryNode): GitHubProfileRepository {
  return {
    name: repository.name,
    nameWithOwner: repository.nameWithOwner,
    owner: repository.owner.login,
    description: repository.description,
    url: repository.url,
    homepageUrl: repository.homepageUrl || null,
    stargazerCount: repository.stargazerCount,
    forkCount: repository.forkCount,
    pushedAt: repository.pushedAt,
    primaryLanguage: repository.primaryLanguage,
    topics: repository.repositoryTopics.nodes.map(({ topic }) => topic.name),
  };
}

export async function getGitHubProfileData(): Promise<GitHubProfileData> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    throw new Error("GITHUB_TOKEN is required to query GitHub profile data");
  }

  const response = await fetch(GITHUB_GRAPHQL_URL, {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({
      query: PROFILE_QUERY,
      variables: {
        login: GITHUB_LOGIN,
        pinnedLimit: PINNED_LIMIT,
        starredLimit: STARRED_QUERY_LIMIT,
      },
    }),
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(5000),
  });

  if (!response.ok) {
    throw new Error(`GitHub GraphQL API returned ${response.status}`);
  }

  const result = (await response.json()) as GitHubProfileResponse;

  if (result.errors?.length) {
    throw new Error(result.errors.map(({ message }) => message).join("; "));
  }

  if (!result.data?.user) {
    throw new Error(`GitHub user ${GITHUB_LOGIN} was not found`);
  }

  const pinned = result.data.user.pinnedItems.nodes.map(normalizeRepository);
  const recentlyStarred = result.data.user.starredRepositories.edges
    .filter(({ node }) => node.owner.login.toLowerCase() !== GITHUB_LOGIN.toLowerCase())
    .slice(0, RECENTLY_STARRED_LIMIT)
    .map(({ node, starredAt }) => ({
      ...normalizeRepository(node),
      starredAt,
    }));

  return { pinned, recentlyStarred };
}
