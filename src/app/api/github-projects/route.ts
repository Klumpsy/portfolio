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

interface PortfolioProject {
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
    const response = await fetch('https://api.github.com/users/Klumpsy/repos', {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-App'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub projects');
    }

    const repos = await response.json() as GitHubRepo[];
    
    // Filter repos that have the portfolio topic
    const portfolioProjects = repos
      .filter((repo) => repo.topics?.includes('portfolio'))
      .map((repo): PortfolioProject => ({
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

    return NextResponse.json(portfolioProjects);
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub projects' },
      { status: 500 }
    );
  }
} 