import { reportErrorToDiscord } from '@/utils/webhook';

const GITHUB_USERNAME = 'Osayeedjaber';
const API_BASE_URL = 'https://api.github.com';
const CACHE_DURATION = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds

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
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
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
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
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

interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  topics: string[];
  visibility: string;
}

interface ProcessedRepo {
  title: string;
  description: string;
  repoUrl: string;
  demoUrl?: string;
  languages: string[];
  topics: string[];
}

interface CachedData<T> {
  data: T;
  timestamp: number;
}

const getCachedData = <T>(key: string): T | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const { data, timestamp }: CachedData<T> = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(key);
      return null;
    }

    return data;
  } catch {
    return null;
  }
};

const setCachedData = <T>(key: string, data: T) => {
  if (typeof window === 'undefined') return;
  
  try {
    const cacheData: CachedData<T> = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Cache storage error:', error);
  }
};

const fetchRepoLanguages = async (repoName: string): Promise<string[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/repos/${GITHUB_USERNAME}/${repoName}/languages`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
        }
      }
    );

    if (!response.ok) return [];
    const languages = await response.json();
    return Object.keys(languages);
  } catch {
    return [];
  }
};

export const fetchGitHubRepos = async () => {
  try {
    const cachedRepos = getCachedData<ProcessedRepo[]>('github_repos');
    if (cachedRepos) {
      return cachedRepos;
    }

    const response = await fetch(`${API_BASE_URL}/users/${GITHUB_USERNAME}/repos`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch repos');
    }

    const repos: GitHubRepo[] = await response.json();
    
    const publicRepos = repos
      .filter(repo => repo.visibility === 'public')
      .slice(0, 5);

    const reposWithLanguages = await Promise.all(
      publicRepos.map(async (repo) => {
        const languages = await fetchRepoLanguages(repo.name);

        return {
          title: repo.name.replace(/-/g, ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase()),
          description: repo.description || 'No description available',
          repoUrl: repo.html_url,
          demoUrl: repo.homepage || undefined,
          languages,
          topics: repo.topics || []
        };
      })
    );

    setCachedData('github_repos', reposWithLanguages);
    return reposWithLanguages;

  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    throw error;
  }
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