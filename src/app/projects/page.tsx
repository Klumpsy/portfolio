import ProjectCard from "@/components/projects/ProjectCard";
import { getProjects } from "./controller";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="flex min-h-screen flex-col items-center py-28 px-4 sm:px-8 md:px-16 bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-blue-100/40 to-transparent dark:from-blue-900/20 dark:to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/30 dark:bg-blue-800/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/4 -left-40 w-80 h-80 bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-300/20 dark:bg-blue-700/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl w-full relative">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse"></span>
            <span className="text-blue-600 dark:text-blue-300 text-sm font-medium">
              My Work
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-400 to-blue-500 dark:from-blue-400 dark:via-blue-300 dark:to-blue-500">
            My Projects
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            A collection of my work, some of it will be in vanilla
            Javascript/typescript, most of it will be in React/Next.js. And
            ofcourse I love to try different frameworks and libraries so there
            might be small project that are just POC&apos;s. These are all
            personal projects, most of my code resides in company repositories
            which are not public.
          </p>
        </div>

        <div className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <div className="flex-shrink-0 w-1 h-6 bg-blue-500 dark:bg-blue-400 rounded"></div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300">
                All Projects
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects
              .filter((project) => project.topics.includes("portfolio"))
              .map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
          </div>
        </div>

        {projects.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 max-w-md mx-auto">
              <svg
                className="w-16 h-16 text-blue-500 dark:text-blue-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                No Projects Found
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Projects will appear here once they are added. Please check back
                soon for updates!
              </p>
            </div>
          </div>
        )}

        <div className="mt-16 text-center">
          <a
            href="https://github.com/Klumpsy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white dark:bg-slate-800 rounded-xl px-8 py-4 text-slate-800 dark:text-white font-medium border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <svg
              className="w-5 h-5 text-blue-600 dark:text-blue-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.91-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            Visit my GitHub for more projects
          </a>
        </div>
      </div>
    </main>
  );
}
