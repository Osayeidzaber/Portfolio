import { reportErrorToDiscord } from '@/utils/webhook';

const GITHUB_USERNAME = 'Osayeedjaber';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const API_BASE_URL = 'https://api.github.com';

// Rate limiting protection
let remainingRequests = 60;
let resetTime = Date.now();

interface RateLimitResponse {
  resources: {
    core: {
      limit: number;
      remaining: number;
      reset: number;
    };
  };
}

// Check rate limits before making requests
const checkRateLimit = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/rate_limit`, {
      headers: {
        ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
      },
    });
    
    const data = await response.json() as RateLimitResponse;
    remainingRequests = data.resources.core.remaining;
    resetTime = data.resources.core.reset * 1000;
    
    if (remainingRequests < 5) {
      const waitTime = resetTime - Date.now();
      if (waitTime > 0) {
        throw new Error(`Rate limit approaching. Reset in ${Math.ceil(waitTime / 1000)} seconds`);
      }
    }
  } catch (error) {
    await reportErrorToDiscord(error as Error, { 
      component: 'GitHubAPI',
      endpoint: 'checkRateLimit'
    });
    throw error;
  }
};

// Enhanced API request handler
const githubRequest = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  await checkRateLimit();

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        Accept: 'application/vnd.github.v3+json',
        ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} - ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    await reportErrorToDiscord(error as Error, {
      component: 'GitHubAPI',
      endpoint,
      statusCode: error instanceof Response ? error.status : 'unknown'
    });
    throw error;
  }
};

// Get user profile information
export const fetchGitHubProfile = async () => {
  return githubRequest<any>(`/users/${GITHUB_USERNAME}`);
};

// Get repository languages with percentage
export const fetchRepoLanguages = async (repo: string) => {
  const data = await githubRequest<Record<string, number>>(`/repos/${GITHUB_USERNAME}/${repo}/languages`);
  
  const total = Object.values(data).reduce((a, b) => a + b, 0);
  return Object.entries(data).map(([name, bytes]) => ({
    name,
    percentage: Math.round((bytes / total) * 100)
  }));
};

// Get contribution statistics
export const fetchContributionStats = async () => {
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          totalCommitContributions
          totalPullRequestContributions
          totalIssueContributions
          totalRepositoryContributions
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  return githubRequest<any>('/graphql', {
    method: 'POST',
    body: JSON.stringify({ query, variables: { username: GITHUB_USERNAME } }),
  });
};

// Enhanced repository fetching
export const fetchGitHubRepos = async () => {
  try {
    const repos = await githubRequest<any[]>(`/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc&per_page=6`);
    
    if (!Array.isArray(repos) || repos.length === 0) {
      return [];
    }

    const detailedRepos = await Promise.all(
      repos.map(async (repo) => {
        try {
          const [languages, readme] = await Promise.all([
            fetchRepoLanguages(repo.name),
            githubRequest<any>(`/repos/${GITHUB_USERNAME}/${repo.name}/readme`).catch(() => null)
          ]);

          return {
            ...repo,
            languages,
            readme: readme ? atob(readme.content) : null,
            preview_image: `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repo.name}/main/preview.png`,
            stats: {
              stars: repo.stargazers_count,
              forks: repo.forks_count,
              watchers: repo.watchers_count,
              size: repo.size,
              updated_at: repo.updated_at
            }
          };
        } catch (error) {
          console.error(`Error processing repo ${repo.name}:`, error);
          return null;
        }
      })
    );

    return detailedRepos.filter((repo): repo is NonNullable<typeof repo> => repo !== null);
  } catch (error) {
    await reportErrorToDiscord(error as Error, {
      component: 'GitHubAPI',
      endpoint: 'fetchGitHubRepos',
      username: GITHUB_USERNAME
    });
    return [];
  }
}; 