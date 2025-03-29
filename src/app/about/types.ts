export interface GitHubProfile {
    login: string;
    avatar_url: string;
    name: string | null;
    bio: string | null;
    followers: number;
    following: number;
    totalStars: number;
    topLanguages: { name: string; percentage: number }[];
    publicRepos: number;
    contributions: number;
    company: string | null;
    location: string | null;
    twitter_username: string | null;
    blog: string | null;
  }