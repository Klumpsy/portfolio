import { NextResponse } from 'next/server';

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
}

interface GitHubProfile {
  login: string;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  company: string | null;
  blog: string | null;
  twitter_username: string | null;
  followers: number;
  following: number;
  publicRepos: number;
  totalStars: number;
  contributions: number;
  topLanguages: { name: string; percentage: number }[];
}

async function getContributionCount(username: string, token?: string): Promise<number> {
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection(contributionTypes: [COMMIT, PULL_REQUEST, ISSUE, REPOSITORY], from: "2010-01-01T00:00:00Z", to: "2030-12-31T23:59:59Z") {
          totalCommitContributions
          totalPullRequestContributions
          totalIssueContributions
          totalRepositoryContributions
        }
      }
    }
  `;

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { username },
    }),
  });

  if (!response.ok) {
    throw new Error(`GitHub GraphQL API error: ${response.status}`);
  }

  const data = await response.json();
  const contributions = data.data.user.contributionsCollection;
  
  return (
    contributions.totalCommitContributions +
    contributions.totalPullRequestContributions +
    contributions.totalIssueContributions +
    contributions.totalRepositoryContributions
  );
}

export async function GET() {
  try {
    const username = process.env.GITHUB_USERNAME || 'Klumpsy';
    const token = process.env.GITHUB_TOKEN;
    
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-App'
    };
    
    if (token) {
      headers['Authorization'] = `token ${token}`;
    }

    const profileResponse = await fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: 3600 }
    });
    
    if (!profileResponse.ok) {
      throw new Error(`GitHub API error: ${profileResponse.status} ${await profileResponse.text()}`);
    }
    
    const profileData = await profileResponse.json();

    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers,
      next: { revalidate: 3600 }
    });
    
    if (!reposResponse.ok) {
      throw new Error(`GitHub API error fetching repos: ${reposResponse.status}`);
    }
    
    const repos: GitHubRepo[] = await reposResponse.json();

    const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
   
    const languageStats = repos.reduce((acc, repo) => {
      if (repo.language && !repo.fork) {
        acc[repo.language] = (acc[repo.language] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const totalRepos = Object.values(languageStats).reduce((acc, count) => acc + count, 0) || 1;
    const topLanguages = Object.entries(languageStats)
      .map(([name, count]) => ({
        name,
        percentage: Math.round((count / totalRepos) * 100),
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5);

    const contributions = await getContributionCount(username, token);

    const profile: GitHubProfile = {
      login: profileData.login,
      avatar_url: profileData.avatar_url,
      name: profileData.name,
      bio: profileData.bio,
      location: profileData.location,
      company: profileData.company,
      blog: profileData.blog,
      twitter_username: profileData.twitter_username,
      followers: profileData.followers,
      following: profileData.following,
      publicRepos: profileData.public_repos,
      totalStars,
      contributions,
      topLanguages,
    };

    return NextResponse.json({ profile });
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub profile', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 