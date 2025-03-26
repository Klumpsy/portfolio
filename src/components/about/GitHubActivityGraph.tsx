"use client";

import GitHubCalendar from "react-github-calendar";

interface GitHubActivityGraphProps {
  username: string;
}

export default function GitHubActivityGraph({
  username,
}: GitHubActivityGraphProps) {
  return (
    <div className="bg-gradient-to-br from-background-light via-background-light to-secondary-light/50 dark:from-background-dark dark:via-slate-800/90 dark:to-primary-dark/20 rounded-xl p-6 shadow-lg border border-secondary-DEFAULT dark:border-primary-dark/30">
      <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-DEFAULT to-accent-light dark:from-primary-light dark:to-accent-light">
          GitHub Activity
        </span>
      </h3>
      <div className="overflow-x-auto p-4 bg-white/70 dark:bg-slate-800/70 rounded-lg border border-secondary-DEFAULT dark:border-primary-dark/30 shadow-md">
        <GitHubCalendar
          username={username}
          blockSize={15}
          blockMargin={4}
          fontSize={14}
          hideColorLegend
          hideTotalCount
          showWeekdayLabels
          theme={{
            light: ["#f8fafc", "#dbeafe", "#93c5fd", "#3b82f6", "#1d4ed8"],
            dark: ["#0f172a", "#1e40af", "#3b82f6", "#60a5fa", "#93c5fd"],
          }}
        />
      </div>
      <p className="text-sm text-text-light/80 dark:text-text-dark/80 mt-4 text-center">
        My GitHub contribution activity over the past year
      </p>
    </div>
  );
}
