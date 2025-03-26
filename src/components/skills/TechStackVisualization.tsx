"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";
import { Skill } from "@/app/skills/page";
import Image from "next/image";

interface SkillDetailProps {
  skill: Skill | null;
  onClose: () => void;
}

interface InstructionsProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

interface TechStackVisualizationProps {
  skills: Skill[];
}

function SkillDetail({ skill, onClose }: SkillDetailProps) {
  if (!skill) return null;

  return (
    <div className="absolute bottom-4 left-4 right-4 lg:left-auto lg:right-4 lg:bottom-4 lg:w-80 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 z-10">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: `${skill.color}20` }}
          >
            <Image
              src={skill.icon}
              alt={`${skill.name} icon`}
              width={24}
              height={24}
              className="w-6 h-6"
              onError={() => {}}
            />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
            {skill.name}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="mb-3">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Proficiency
          </span>
          <span className="text-sm font-medium" style={{ color: skill.color }}>
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

      <p className="text-slate-600 dark:text-slate-300 text-sm">
        {skill.description}
      </p>
    </div>
  );
}

function Instructions({ visible, setVisible }: InstructionsProps) {
  if (!visible) return null;

  return (
    <div className="absolute top-4 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 z-10 max-w-md">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
          How to Interact
        </h3>
        <button
          onClick={() => setVisible(false)}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <ul className="space-y-2 text-slate-600 dark:text-slate-300 text-sm">
        <li className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
            />
          </svg>
          <span>Click and drag to rotate the view</span>
        </li>
        <li className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>Scroll to zoom in/out</span>
        </li>
        <li className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
            />
          </svg>
          <span>Click on any skill for more details</span>
        </li>
      </ul>
    </div>
  );
}

const TechStackVisualization: React.FC<TechStackVisualizationProps> = ({
  skills,
}) => {
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === "class") {
            const isDark = document.documentElement.classList.contains("dark");
            setIsDarkMode(isDark);
          }
        });
      });

      observer.observe(document.documentElement, { attributes: true });
      return () => observer.disconnect();
    }
  }, []);

  const handleNodeClick = (skill: Skill) => {
    setActiveSkill((prev) => (prev?.name === skill.name ? null : skill));
    setShowInstructions(false);
  };

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        performance={{ min: 0.5 }}
      >
        <color
          attach="background"
          args={[isDarkMode ? "#0f172a" : "#f8fafc"]}
        />
        <Scene
          skills={skills}
          onNodeClick={handleNodeClick}
          activeSkill={activeSkill}
        />
      </Canvas>

      <Instructions
        visible={showInstructions}
        setVisible={setShowInstructions}
      />
      <SkillDetail skill={activeSkill} onClose={() => setActiveSkill(null)} />

      {/* Help button */}
      {!showInstructions && (
        <button
          onClick={() => setShowInstructions(true)}
          className="absolute top-4 right-4 w-10 h-10 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center shadow-md border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default TechStackVisualization;
