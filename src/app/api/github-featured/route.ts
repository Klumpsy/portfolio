import { NextResponse } from 'next/server';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  topics: string[];
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  homepage: string | null;
}

interface FeaturedProject {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  topics: string[];
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  homepage: string | null;
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
    
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers
    });

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub projects');
    }

    const repos = await response.json() as GitHubRepo[];
  
    const featuredProjects = repos
      .filter((repo) => repo.topics?.includes('featured'))
      .map((repo): FeaturedProject => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        topics: repo.topics,
        stargazers_count: repo.stargazers_count,
        language: repo.language,
        updated_at: repo.updated_at,
        homepage: repo.homepage
      }));

    return NextResponse.json(featuredProjects);
  } catch (error) {
    console.error('Error fetching featured GitHub projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch featured GitHub projects' },
      { status: 500 }
    );
  }
} 