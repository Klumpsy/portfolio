import { GitHubProfile } from "./types";

export async function getGitHubProfile(): Promise<GitHubProfile | null> {
    try {
      console.log("Starting getGitHubProfile function");
      
      let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      console.log(`NEXT_PUBLIC_BASE_URL: ${baseUrl || 'not set'}`);
      
      if (!baseUrl && process.env.VERCEL_URL) {
        baseUrl = `https://${process.env.VERCEL_URL}`;
        console.log(`Using VERCEL_URL: ${baseUrl}`);
      }
      
      if (!baseUrl) {
        baseUrl = "http://localhost:3000";
        console.log("Using localhost fallback");
      }
      
      const apiUrl = `${baseUrl}/api/github-profile`;
      console.log(`Fetching GitHub profile from: ${apiUrl}`);
      
      const res = await fetch(apiUrl, {
        cache: 'no-store',
      });
  
      console.log(`Response status: ${res.status}`);
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error(`Failed to fetch GitHub profile: ${res.status}`);
        console.error(`Error response: ${errorText}`);
        return null;
      }
  
      const data = await res.json();
      console.log("Successfully fetched GitHub profile data");
      
      if (!data.profile) {
        console.error("Profile data is missing from response");
        console.log("Response data:", JSON.stringify(data));
        return null;
      }
      
      return data.profile;
    } catch (error) {
      console.error("Error fetching GitHub profile:", error);
      if (error instanceof Error) {
        console.error("Error details:", error.message);
        console.error("Error stack:", error.stack);
      }
      return null;
    }
  }
  