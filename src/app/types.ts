export interface FeaturedProject {
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