"use client";

import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  topics: string[];
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  homepage: string | null;
}

export default function ProjectCard({
  name,
  description,
  html_url,
  topics,
  stargazers_count,
  language,
  homepage,
}: ProjectCardProps) {
  // Create a clickable card that links to the project homepage or GitHub
  const projectLink = homepage || html_url;

  return (
    <div className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:translate-y-[-6px] flex flex-col h-full relative">
      {/* Make entire card clickable with invisible overlay */}
      <Link
        href={projectLink}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-10"
        aria-label={`View ${name} project`}
      >
        <span className="sr-only">View project</span>
      </Link>

      {/* Icon header */}
      <div className="bg-slate-50 dark:bg-slate-900 p-6 flex items-center justify-center h-40 border-b border-slate-200 dark:border-slate-700 relative">
        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300"></div>

        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[url('/grid-light.svg')] dark:bg-[url('/grid-dark.svg')] bg-center opacity-30 dark:opacity-20"></div>

        <div className="relative transform group-hover:scale-110 transition-transform duration-300">
          <Image
            src={`/icons/${name.toLowerCase().replace(/\s+/g, "-")}.svg`}
            width={70}
            height={70}
            alt={name}
            className="drop-shadow-md"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              const target = e.target as HTMLImageElement;
              target.src = "/icons/space.svg";
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-lg font-bold mb-2 text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {name}
        </h3>

        <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3 text-sm flex-grow">
          {description || "No description available"}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {topics.slice(0, 4).map((topic) => (
            <span
              key={topic}
              className="px-2 py-0.5 text-xs rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 border border-blue-100 dark:border-blue-800 font-medium"
            >
              {topic}
            </span>
          ))}
          {topics.length > 4 && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-600 font-medium">
              +{topics.length - 4}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            {language && (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400"></span>
                {language}
              </span>
            )}
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5 text-yellow-500 dark:text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {stargazers_count}
            </span>
          </div>

          <div className="flex gap-2">
            <Link
              href={html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 relative z-20"
              onClick={(e) => e.stopPropagation()}
              aria-label="View on GitHub"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.91-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs">GitHub</span>
            </Link>
            {homepage && (
              <Link
                href={homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 relative z-20"
                onClick={(e) => e.stopPropagation()}
                aria-label="View live demo"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                <span className="text-xs">Demo</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
