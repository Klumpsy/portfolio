import { NextResponse } from 'next/server';

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
}

interface GitHubEvent {
  type: string;
  created_at: string;
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

export async function GET() {
  try {
    const username = process.env.GITHUB_USERNAME || 'Klumpsy';
    
    // Prepare headers
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-App'
    };
    
    // Add authorization token if available
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    // Fetch user profile
    const profileResponse = await fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!profileResponse.ok) {
      throw new Error(`GitHub API error: ${profileResponse.status} ${await profileResponse.text()}`);
    }
    
    const profileData = await profileResponse.json();

    // Fetch user repositories
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers,
      next: { revalidate: 3600 }
    });
    
    if (!reposResponse.ok) {
      throw new Error(`GitHub API error fetching repos: ${reposResponse.status}`);
    }
    
    const repos: GitHubRepo[] = await reposResponse.json();

    // Calculate total stars and language percentages
    const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
    
    // Calculate language percentages
    const languageStats = repos.reduce((acc, repo) => {
      if (repo.language && !repo.fork) {
        acc[repo.language] = (acc[repo.language] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const totalRepos = Object.values(languageStats).reduce((acc, count) => acc + count, 0) || 1; // Avoid division by zero
    const topLanguages = Object.entries(languageStats)
      .map(([name, count]) => ({
        name,
        percentage: Math.round((count / totalRepos) * 100),
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5);

    // Fetch contribution count (events)
    const eventsResponse = await fetch(
      `https://api.github.com/users/${username}/events?per_page=100`,
      { 
        headers,
        next: { revalidate: 3600 }
      }
    );
    
    let contributions = 0;
    
    if (eventsResponse.ok) {
      const events: GitHubEvent[] = await eventsResponse.json();
      contributions = events.filter(event => event.type === 'PushEvent').length;
    } else {
      console.warn('Could not fetch GitHub events, defaulting contributions to 0');
    }

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