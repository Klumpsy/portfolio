import { Project } from "./types";

export async function getProjects(): Promise<Project[]> {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/github-projects`,
        {
          next: { revalidate: 3600 },
        }
      );
  
      if (!res.ok) {
        throw new Error("Failed to fetch projects");
      }
  
      return res.json();
    } catch (error) {
      console.error("Error fetching projects:", error);
      return [];
    }
  }
  