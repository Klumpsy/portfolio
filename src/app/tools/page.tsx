"use server";

import ReduxVisualizationWithProvider from "@/components/tools/ReduxVisualisation/ReduxVisualisation";
import React from "react";

export default async function ToolsPage() {
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
              Tools
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-400 to-blue-500 dark:from-blue-400 dark:via-blue-300 dark:to-blue-500">
            Visualization of tools
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            The best way to learn new stuff (for me at least) is to build
            projects with them and try to explain the concepts to another person
            (or in programming: the rubber duck). On this page I try to
            vizualize and explain tools I have learned and used so maybe I can
            help other people understand certain concepts and I can prove to
            myself and others that I understand them to a certain extend.
          </p>
        </div>

        <div className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <div className="flex-shrink-0 w-1 h-6 bg-blue-500 dark:bg-blue-400 rounded"></div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300">
                Redux (toolkit)
              </span>
            </h2>
          </div>
          <ReduxVisualizationWithProvider />
        </div>

        <div className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <div className="flex-shrink-0 w-1 h-6 bg-blue-500 dark:bg-blue-400 rounded"></div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300">
                Thunks
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            Coming soon...
          </div>
        </div>

        <div className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <div className="flex-shrink-0 w-1 h-6 bg-blue-500 dark:bg-blue-400 rounded"></div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300">
                Sagas
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            Coming soon...
          </div>
        </div>
      </div>
    </main>
  );
}
