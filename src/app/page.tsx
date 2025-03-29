import Link from "next/link";
import Image from "next/image";
import FeaturedProjectCard from "@/components/home/FeaturedProjectCard";
import { getFeaturedProjects } from "./controller";

export default async function Home() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-blue-100/40 to-transparent dark:from-blue-900/20 dark:to-transparent"></div>

      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-200/30 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-40 -right-20 w-80 h-80 bg-blue-300/20 dark:bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-40 -left-40 w-80 h-80 bg-blue-100/30 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <section className="relative pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
                <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse"></span>
                <span className="text-blue-600 dark:text-blue-300 text-sm font-medium">
                  Developer
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="block text-slate-800 dark:text-white mb-1">
                  Hi, I&apos;m Bart Klumpers
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-400 to-blue-500 dark:from-blue-400 dark:via-blue-300 dark:to-blue-500 font-extrabold">
                  JavaScript Enthusiast
                </span>
              </h1>

              <p className="text-xl text-slate-600 dark:text-slate-300">
                I love Javascript/Typescript in every way, shape and form!
                Creating modern web experiences with clean code is what i love
                to do.
              </p>

              <div className="flex flex-wrap gap-4 pt-6">
                <Link
                  href="/projects"
                  className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300 hover:translate-y-[-2px]"
                >
                  View Projects
                </Link>
                <Link
                  href="/about"
                  className="px-6 py-3 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 hover:translate-y-[-2px]"
                >
                  About Me
                </Link>
              </div>

              <div className="flex gap-5 pt-6">
                <a
                  href="https://github.com/Klumpsy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transform hover:scale-110 transition-transform"
                  aria-label="GitHub profile"
                  id="robo-github-link"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/bart-klumpers-064402213"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transform hover:scale-110 transition-transform"
                  aria-label="LinkedIn profile"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="mailto:bart_klumperman@live.nl"
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transform hover:scale-110 transition-transform"
                  aria-label="Email me"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div className="md:w-1/2 flex justify-center mt-12 md:mt-0">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80">
                {/* Profile image with modern styling */}
                <div className="absolute inset-0 bg-[#f1f5f9] dark:bg-slate-800 rounded-2xl rotate-6 z-0"></div>

                <div className="absolute inset-2 overflow-hidden rounded-2xl z-10 border-2 border-white dark:border-slate-700 shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100/60 to-blue-300/30 dark:from-blue-900/40 dark:to-blue-700/20 z-0"></div>
                  <Image
                    src="/profile.jpg"
                    alt="Bart Klumpers"
                    fill
                    priority
                    className="object-cover z-10 mix-blend-normal"
                    id="robo-profile-image"
                  />
                </div>

                <div className="absolute -right-4 -bottom-4 bg-blue-500 dark:bg-blue-400 rounded-full w-16 h-16 z-20 shadow-lg flex items-center justify-center text-white text-lg font-bold">
                  TS
                </div>

                <div className="absolute -top-6 -left-6 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-lg z-20 border border-slate-200 dark:border-slate-700">
                  <span className="font-mono text-blue-600 dark:text-blue-400">
                    &lt;/&gt;
                  </span>
                </div>

                <div className="absolute -right-12 -top-12 w-24 h-24 grid grid-cols-3 gap-2">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-blue-400/50 dark:bg-blue-500/40"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20">
        <div className="absolute inset-0 bg-slate-100/70 dark:bg-slate-800/20"></div>

        <div className="absolute top-0 w-full h-24 bg-gradient-to-b from-slate-50 to-transparent dark:from-slate-900 dark:to-transparent"></div>
        <div className="absolute -right-20 top-40 w-64 h-64 bg-blue-200/30 dark:bg-blue-700/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 max-w-5xl relative">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-4">
              <span className="text-blue-600 dark:text-blue-300 text-sm font-medium">
                My Work
              </span>
            </div>

            <h2 className="text-3xl font-bold mb-4 text-slate-800 dark:text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300">
                Featured Projects
              </span>
            </h2>

            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Check out some of my recent work. From educational tools to modern
              web applications, each project represents a unique challenge.
            </p>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            id="featured-projects"
          >
            {featuredProjects.length > 0 ? (
              featuredProjects.map((project) => (
                <FeaturedProjectCard key={project.id} {...project} />
              ))
            ) : (
              <div className="col-span-full text-center py-10 bg-white/50 dark:bg-slate-800/50 rounded-xl backdrop-blur-sm border border-slate-200 dark:border-slate-700">
                <p className="text-slate-600 dark:text-slate-300 text-lg mb-4">
                  No featured projects found. Check back soon for updates!
                </p>
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300 hover:translate-y-[-2px]"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
