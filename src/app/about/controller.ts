import { GitHubProfile } from "./types";

// Cache key for localStorage
const CACHE_KEY = 'github-profile-cache';
const CACHE_EXPIRATION = 3600000; // 1 hour in milliseconds

export async function getGitHubProfile(): Promise<GitHubProfile | null> {
    try {
      console.log("Starting getGitHubProfile function");
      
      // Check if we're in a browser environment
      if (typeof window !== 'undefined') {
        // Try to get cached data from localStorage
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          try {
            const { data, timestamp } = JSON.parse(cachedData);
            const now = Date.now();
            
            // Check if cache is still valid
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
      
      // Cache the data in localStorage if in browser environment
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
              data: data.profile,
              timestamp: Date.now()
            })
          );
          console.log("Profile data cached in localStorage");
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
      
      // Try to get cached data as fallback if in browser environment
      if (typeof window !== 'undefined') {
        try {
          const cachedData = localStorage.getItem(CACHE_KEY);
          if (cachedData) {
            const { data } = JSON.parse(cachedData);
            if (data) {
              console.log("Returning cached data as fallback due to error");
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
  