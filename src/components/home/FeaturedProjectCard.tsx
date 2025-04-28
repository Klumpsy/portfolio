"use client";

import Image from "next/image";
import Link from "next/link";

interface FeaturedProjectCardProps {
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

export default function FeaturedProjectCard({
  name,
  description,
  html_url,
  topics,
  stargazers_count,
  language,
  homepage,
}: FeaturedProjectCardProps) {
  const projectLink = homepage || html_url;

  return (
    <div
      className="group relative rounded-xl overflow-hidden transition-all duration-300 hover:translate-y-[-8px]"
      id="robo-featured-projects"
    >
      <Link
        href={projectLink}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-10"
        aria-label={`View ${name} project`}
      >
        <span className="sr-only">View project</span>
      </Link>

      <div className="absolute inset-0 bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 rounded-xl z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-900/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 relative z-10"></div>

      <div className="relative z-10">
        <div className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex justify-center items-center h-48 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-light.svg')] dark:bg-[url('/grid-dark.svg')] bg-center opacity-50 dark:opacity-30"></div>

          <div className="absolute top-0 left-0 w-24 h-24 bg-blue-200/30 dark:bg-blue-500/10 rounded-full blur-xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-300/30 dark:bg-blue-400/10 rounded-full blur-xl transform translate-x-1/3 translate-y-1/3"></div>

          <div className="relative transform group-hover:scale-110 transition-transform duration-500">
            <Image
              src={`/icons/${name.toLowerCase().replace(/\s+/g, "-")}.svg`}
              width={80}
              height={80}
              alt={name}
              className="drop-shadow-md"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                const target = e.target as HTMLImageElement;
                target.src = "/icons/projectLogo.svg";
              }}
            />
          </div>
        </div>

        <div className="p-6 relative">
          <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {name}
          </h3>

          <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3 text-sm">
            {description || "No description available"}
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            {topics.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="px-2.5 py-1 text-xs rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 border border-blue-100 dark:border-blue-800 font-medium"
              >
                {topic}
              </span>
            ))}
            {topics.length > 3 && (
              <span className="px-2.5 py-1 text-xs rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-600 font-medium">
                +{topics.length - 3} more
              </span>
            )}
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
              {language && (
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 dark:bg-blue-400"></span>
                  {language}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-yellow-500 dark:text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {stargazers_count}
              </span>
            </div>

            <div className="flex gap-3">
              <Link
                href={html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors relative z-20"
                onClick={(e) => e.stopPropagation()}
                aria-label="View on GitHub"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.91-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              {homepage && (
                <Link
                  href={homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors relative z-20"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="View live demo"
                >
                  <svg
                    className="w-5 h-5"
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
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
