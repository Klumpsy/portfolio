import { GitHubProfile } from "./types";

// Cache for storing GitHub profile data
let profileCache: {
  data: GitHubProfile | null;
  timestamp: number;
} = {
  data: null,
  timestamp: 0
};

// Cache expiration time (1 hour)
const CACHE_EXPIRATION = 3600000; // 1 hour in milliseconds

export async function getGitHubProfile(): Promise<GitHubProfile | null> {
    try {
      console.log("Starting getGitHubProfile function");
      
      // Check if we have valid cached data
      const now = Date.now();
      if (profileCache.data && (now - profileCache.timestamp) < CACHE_EXPIRATION) {
        console.log("Returning cached profile data");
        return profileCache.data;
      }
      
      console.log("Cache expired or empty, fetching fresh data");
      
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
        next: { revalidate: 3600 }, // Cache for 1 hour
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
      
      // Update cache
      profileCache = {
        data: data.profile,
        timestamp: now
      };
      
      return data.profile;
    } catch (error) {
      console.error("Error fetching GitHub profile:", error);
      if (error instanceof Error) {
        console.error("Error details:", error.message);
        console.error("Error stack:", error.stack);
      }
      
      // If we have cached data, return it as fallback
      if (profileCache.data) {
        console.log("Returning cached data as fallback due to error");
        return profileCache.data;
      }
      
      return null;
    }
  }
  