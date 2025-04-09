import { GitHubProfile } from "./types";

export async function getGitHubProfile(): Promise<GitHubProfile | null> {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL ||
        process.env.VERCEL_URL ||
        "http://localhost:3000";
      const res = await fetch(`${baseUrl}/api/github-profile`, {
        next: { revalidate: 1800 },
      });
  
      if (!res.ok) {
        console.error(`Failed to fetch GitHub profile: ${res.status}`);
        return null;
      }
  
      const data = await res.json();
      return data.profile;
    } catch (error) {
      console.error("Error fetching GitHub profile:", error);
      return null;
    }
  }
  