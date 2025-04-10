import { GitHubProfile } from "./types";

export async function getGitHubProfile(): Promise<GitHubProfile | null> {
    try {

      let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      
  
      if (!baseUrl && process.env.VERCEL_URL) {
        baseUrl = `https://${process.env.VERCEL_URL}`;
      }
      
      if (!baseUrl) {
        baseUrl = "http://localhost:3000";
      }
      
      console.log(`Fetching GitHub profile from: ${baseUrl}/api/github-profile`);
      
      const res = await fetch(`${baseUrl}/api/github-profile`, {
        next: { revalidate: 3600 },
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
  