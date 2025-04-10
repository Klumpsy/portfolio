import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

let profileCache: {
  data: GitHubProfile | null;
  timestamp: number;
} = {
  data: null,
  timestamp: 0
};

// Cache expiration time (1 hour)
const CACHE_EXPIRATION = 3600000;

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
  console.log(`Getting contribution count for username: ${username}`);
  console.log(`Token available: ${token ? 'Yes' : 'No'}`);
  
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  console.log('Sending GraphQL request to GitHub API');
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

  console.log(`GraphQL response status: ${response.status}`);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`GitHub GraphQL API error: ${response.status}`);
    console.error(`Error response: ${errorText}`);
    throw new Error(`GitHub GraphQL API error: ${response.status} - ${errorText}`);
  }

  const responseText = await response.text();
  console.log('GraphQL response received');
  
  try {
    const data = JSON.parse(responseText);
    console.log('GraphQL response parsed successfully');
    
    if (!data.data) {
      console.error('GraphQL response missing data property');
      console.log('Response:', responseText);
      throw new Error('GraphQL response missing data property');
    }
    
    if (!data.data.user) {
      console.error('GraphQL response missing user property');
      console.log('Response data:', JSON.stringify(data));
      throw new Error('GraphQL response missing user property');
    }
    
    if (!data.data.user.contributionsCollection) {
      console.error('GraphQL response missing contributionsCollection property');
      console.log('User data:', JSON.stringify(data.data.user));
      throw new Error('GraphQL response missing contributionsCollection property');
    }
    
    if (!data.data.user.contributionsCollection.contributionCalendar) {
      console.error('GraphQL response missing contributionCalendar property');
      console.log('Contributions data:', JSON.stringify(data.data.user.contributionsCollection));
      throw new Error('GraphQL response missing contributionCalendar property');
    }
    
    const contributionCalendar = data.data.user.contributionsCollection.contributionCalendar;
    console.log('Contribution calendar data retrieved successfully');
    
    const totalContributions = contributionCalendar.totalContributions;
    console.log(`Total contributions from calendar: ${totalContributions}`);
    
    let calculatedTotal = 0;
    contributionCalendar.weeks.forEach((week: { contributionDays: { contributionCount: number }[] }) => {
      week.contributionDays.forEach((day: { contributionCount: number }) => {
        calculatedTotal += day.contributionCount;
      });
    });
    console.log(`Calculated total from days: ${calculatedTotal}`);
    
    return totalContributions;
  } catch (error) {
    console.error('Error parsing GraphQL response:', error);
    console.log('Raw response:', responseText);
    throw error;
  }
}

export async function GET() {
  try {
    console.log('GitHub profile API route called');
    console.log('Environment variables:');
    console.log(`GITHUB_USERNAME: ${process.env.GITHUB_USERNAME || 'not set'}`);
    console.log(`GITHUB_TOKEN: ${process.env.GITHUB_TOKEN ? 'set' : 'not set'}`);
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
    
    const now = Date.now();
    if (profileCache.data && (now - profileCache.timestamp) < CACHE_EXPIRATION) {
      console.log('Returning cached profile data');
      return NextResponse.json({ profile: profileCache.data });
    }
    
    console.log('Cache expired or empty, fetching fresh data');
    
    const username = process.env.GITHUB_USERNAME || 'Klumpsy';
    const token = process.env.GITHUB_TOKEN;
    
    console.log(`Username: ${username}`);
    console.log(`Token available: ${token ? 'Yes' : 'No'}`);
    
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-App'
    };
    
    if (token) {
      headers['Authorization'] = `token ${token}`;
      console.log('Authorization header set with token');
    } else {
      console.log('No token available, using unauthenticated request');
    }

    console.log('Fetching user profile from GitHub REST API');
    const profileResponse = await fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    console.log(`Profile response status: ${profileResponse.status}`);
    
    if (!profileResponse.ok) {
      const errorText = await profileResponse.text();
      console.error(`GitHub API error: ${profileResponse.status} ${errorText}`);
      throw new Error(`GitHub API error: ${profileResponse.status} ${errorText}`);
    }
    
    const profileData = await profileResponse.json();
    console.log('User profile fetched successfully');
    
    console.log('Fetching repositories from GitHub REST API');
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers,
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    console.log(`Repos response status: ${reposResponse.status}`);
    
    if (!reposResponse.ok) {
      const errorText = await reposResponse.text();
      console.error(`GitHub API error fetching repos: ${reposResponse.status} ${errorText}`);
      throw new Error(`GitHub API error fetching repos: ${reposResponse.status} ${errorText}`);
    }
    
    const repos: GitHubRepo[] = await reposResponse.json();
    console.log(`Fetched ${repos.length} repositories`);

    const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
    console.log(`Total stars: ${totalStars}`);
   
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
    
    console.log('Top languages calculated');

    console.log('Fetching contribution count');
    let contributions = 0;
    try {
      contributions = await getContributionCount(username, token);
      console.log(`Contribution count: ${contributions}`);
    } catch (error) {
      console.error('Error fetching contribution count:', error);
      console.log('Continuing without contribution data');
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

    // Update cache
    profileCache = {
      data: profile,
      timestamp: now
    };
    
    console.log('GitHub profile constructed successfully and cached');
    return NextResponse.json({ profile });
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    // If we have cached data, return it as fallback
    if (profileCache.data) {
      console.log('Returning cached data as fallback due to error');
      return NextResponse.json({ profile: profileCache.data });
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch GitHub profile', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}