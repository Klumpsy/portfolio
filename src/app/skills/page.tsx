"use client";

import { Suspense } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { skillsData } from "@/components/skills/skillsData";
import Image from "next/image";

export interface Skill {
  name: string;
  icon: string;
  color: string;
  proficiency: number;
  category: string;
  description: string;
}

// Dynamically import the 3D visualization component with no SSR
// This ensures Three.js only loads on the client side
const TechStackVisualization = dynamic(
  () => import("@/components/skills/TechStackVisualization"),
  { ssr: false, loading: () => <VisualizationLoader /> }
);

function VisualizationLoader() {
  return (
    <div className="flex items-center justify-center h-[400px] sm:h-[500px] lg:h-[600px]">
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          Loading 3D visualization...
        </p>
      </div>
    </div>
  );
}

export default function SkillsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center py-28 px-4 sm:px-8 md:px-16 bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-blue-100/40 to-transparent dark:from-blue-900/20 dark:to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/30 dark:bg-blue-800/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 -left-40 w-80 h-80 bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl w-full relative">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse"></span>
            <span className="text-blue-600 dark:text-blue-300 text-sm font-medium">
              Technical Skills
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-400 to-blue-500 dark:from-blue-400 dark:via-blue-300 dark:to-blue-500">
            My Tech Stack
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Explore my technical skills and experience in this interactive 3D
            visualization. Drag to rotate, scroll to zoom, and click on any
            technology to learn more. You will see proficiency bars below but we
            all know that skills are not suitable to put into proficiency bars,
            but hey they look cool!
          </p>
        </div>

        <div className="mt-8 mb-16">
          <Suspense fallback={<VisualizationLoader />}>
            <TechStackVisualization skills={skillsData} />
          </Suspense>
        </div>

        <div className="mt-16">
          <div className="flex items-center gap-2 mb-8">
            <div className="flex-shrink-0 w-1 h-6 bg-blue-500 dark:bg-blue-400 rounded"></div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300">
                Skill Details
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillsData.map((skill) => (
              <div
                key={skill.name}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ background: `${skill.color}20` }}
                  >
                    <Image
                      src={skill.icon}
                      alt={`${skill.name} icon`}
                      width={32}
                      height={32}
                      className="w-8 h-8"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                      {skill.name}
                    </h3>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {skill.category.charAt(0).toUpperCase() +
                        skill.category.slice(1)}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Proficiency
                    </span>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {skill.proficiency}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${skill.proficiency}%`,
                        backgroundColor: skill.color,
                      }}
                    ></div>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-sm flex-grow">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 bg-white dark:bg-slate-800 rounded-xl px-8 py-4 text-slate-800 dark:text-white font-medium border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <svg
              className="w-5 h-5 text-blue-600 dark:text-blue-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            See These Skills in Action
          </Link>
        </div>
      </div>
    </main>
  );
}
