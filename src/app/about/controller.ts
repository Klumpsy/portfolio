import { GitHubProfile } from "./types";

const CACHE_KEY = 'github-profile-cache';
const CACHE_EXPIRATION = 3600000; // 1 hour in milliseconds

export async function getGitHubProfile(): Promise<GitHubProfile | null> {
    try {
 
      if (typeof window !== 'undefined') {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          try {
            const { data, timestamp } = JSON.parse(cachedData);
            const now = Date.now();
          
            if (data && (now - timestamp) < CACHE_EXPIRATION) {
              console.log("Returning cached profile data from localStorage");
              return data;
            } else {
              console.log("Cache expired, fetching fresh data");
            }
          } catch (e) {
            console.error("Error parsing cached data:", e);
          }
        }
      }
      
      let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      
      if (!baseUrl && process.env.VERCEL_URL) {
        baseUrl = `https://${process.env.VERCEL_URL}`;
      }
      
      if (!baseUrl) {
        baseUrl = "http://localhost:3000";
      }
      
      const apiUrl = `${baseUrl}/api/github-profile`;
      const res = await fetch(apiUrl, {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });
  
      if (!res.ok) {
        const errorText = await res.text();
        console.error(`Failed to fetch GitHub profile: ${res.status}`);
        console.error(`Error response: ${errorText}`);
        return null;
      }
  
      const data = await res.json();
      
      if (!data.profile) {
        console.error("Profile data is missing from response");
        console.log("Response data:", JSON.stringify(data));
        return null;
      }
      
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
              data: data.profile,
              timestamp: Date.now()
            })
          );
        } catch (e) {
          console.error("Error caching data in localStorage:", e);
        }
      }
      
      return data.profile;
    } catch (error) {
      console.error("Error fetching GitHub profile:", error);
      if (error instanceof Error) {
        console.error("Error details:", error.message);
        console.error("Error stack:", error.stack);
      }
      
      if (typeof window !== 'undefined') {
        try {
          const cachedData = localStorage.getItem(CACHE_KEY);
          if (cachedData) {
            const { data } = JSON.parse(cachedData);
            if (data) {
              return data;
            }
          }
        } catch (e) {
          console.error("Error retrieving cached data:", e);
        }
      }
      
      return null;
    }
  }
  