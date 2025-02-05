import { logErrorToDiscord } from './errorLogging';

export interface GithubRepo {
  name: string;
  description: string | null;
  stargazers_count: number;
  html_url: string;
  language: string;
}

export async function fetchGitHubData(username: string): Promise<GithubRepo[]> {
  // Only run on client side
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!response.ok) {
      throw new Error(`Failed to fetch GitHub data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    await logErrorToDiscord(error as Error, 'GitHub Data Fetch');
    return [];
  }
} 