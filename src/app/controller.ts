import { FeaturedProject } from "./types";

export async function getFeaturedProjects(): Promise<FeaturedProject[]> {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/github-featured`,
        {
          next: { revalidate: 3600 },
        }
      );
  
      if (!res.ok) {
        throw new Error("Failed to fetch featured projects");
      }
  
      return res.json();
    } catch (error) {
      console.error("Error fetching featured projects:", error);
      return [];
    }
  }
  