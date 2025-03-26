"use client";

import { useState } from "react";

interface GitHubStatsProps {
  followers: number;
  following: number;
  totalStars: number;
  topLanguages: { name: string; percentage: number }[];
  publicRepos: number;
  contributions: number;
  bio: string | null;
}

export default function GitHubStats({
  followers,
  following,
  totalStars,
  topLanguages,
  publicRepos,
  contributions,
  bio,
}: GitHubStatsProps) {
  const [showFullBio, setShowFullBio] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 relative">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-transparent to-blue-100/30 dark:from-blue-900/10 dark:via-transparent dark:to-blue-800/10 pointer-events-none"></div>

      <div className="relative p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex-shrink-0 w-1 h-6 bg-blue-500 dark:bg-blue-400 rounded"></div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300">
              GitHub Stats
            </span>
          </h3>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {[
            { label: "Public Repos", value: publicRepos, icon: "📁" },
            { label: "Total Stars", value: totalStars, icon: "⭐" },
            { label: "Contributions", value: contributions, icon: "📊" },
            { label: "Followers", value: followers, icon: "👥" },
            { label: "Following", value: following, icon: "🔍" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-slate-50 dark:bg-slate-900 rounded-lg px-4 py-3 border border-slate-200 dark:border-slate-700 transform hover:translate-y-[-4px] hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex items-start">
                <span className="hidden sm:block text-xl opacity-70 mr-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </span>
                <div>
                  <div className="text-2xl font-bold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {stat.value.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {stat.label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bio section */}
        {bio && (
          <div className="mb-6 bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="flex items-center text-lg font-semibold text-slate-800 dark:text-white mb-3">
              <span className="mr-2">👨‍💻</span>
              About Me
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              {showFullBio
                ? bio
                : `${bio.slice(0, 150)}${bio.length > 150 ? "..." : ""}`}
              {bio.length > 150 && (
                <button
                  onClick={() => setShowFullBio(!showFullBio)}
                  className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors"
                >
                  {showFullBio ? "Show less" : "Read more"}
                </button>
              )}
            </p>
          </div>
        )}

        {/* Languages section */}
        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
          <h3 className="flex items-center text-lg font-semibold text-slate-800 dark:text-white mb-4">
            <span className="mr-2">🔤</span>
            Top Languages
          </h3>
          <div className="space-y-5">
            {topLanguages.map((lang) => (
              <div key={lang.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {lang.name}
                  </span>
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                    {lang.percentage}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-400 dark:from-blue-400 dark:to-blue-500 rounded-full"
                    style={{ width: `${lang.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
