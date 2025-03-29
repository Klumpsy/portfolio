import Image from "next/image";
import GitHubStats from "@/components/about/GitHubStats";
import GitHubActivityGraph from "@/components/about/GitHubActivityGraph";
import Link from "next/link";

interface GitHubProfile {
  login: string;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  followers: number;
  following: number;
  totalStars: number;
  topLanguages: { name: string; percentage: number }[];
  publicRepos: number;
  contributions: number;
  company: string | null;
  location: string | null;
  twitter_username: string | null;
  blog: string | null;
}

async function getGitHubProfile(): Promise<GitHubProfile | null> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      process.env.VERCEL_URL ||
      "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/github-profile`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!res.ok) {
      console.error(`Failed to fetch GitHub profile: ${res.status}`);
      return null;
    }

    const data = await res.json();
    return data.profile;
  } catch (error) {
    console.error("Error fetching GitHub profile:", error);
    return null;
  }
}

export default async function AboutPage() {
  const profile = await getGitHubProfile();

  const fallbackProfile: GitHubProfile = profile || {
    login: "example",
    avatar_url: "/profile.jpg",
    name: "Bart Klumpers",
    bio: "Developer & Typescript Enthusiast",
    followers: 0,
    following: 0,
    totalStars: 0,
    topLanguages: [],
    publicRepos: 0,
    contributions: 0,
    company: null,
    location: "Netherlands",
    twitter_username: null,
    blog: null,
  };

  return (
    <main className="flex min-h-screen flex-col items-center py-28 px-4 sm:px-8 md:px-16 bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-blue-100/40 to-transparent dark:from-blue-900/20 dark:to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/30 dark:bg-blue-800/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/4 -left-40 w-80 h-80 bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-300/20 dark:bg-blue-700/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl w-full relative">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse"></span>
            <span className="text-blue-600 dark:text-blue-300 text-sm font-medium">
              About Me
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-400 to-blue-500 dark:from-blue-400 dark:via-blue-300 dark:to-blue-500">
            My Journey
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            From education to technology, my path has been driven by a passion
            for learning new technologies and creating meaningful experiences.
            Also, I love to code and build new projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          <div className="space-y-8 mt-8">
            <div className="relative">
              <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700">
                <div className="aspect-square relative">
                  <Image
                    src={profile?.avatar_url || "/profile.jpg"}
                    alt={profile?.name || "Bart Klumpers"}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    id="robo-profile-image"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                    {fallbackProfile.name}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 mt-2">
                    Developer &{" "}
                    <span className="text-yellow-300 dark:text-yellow-300 font-medium">
                      JavaScript
                    </span>
                    /
                    <span className="text-blue-500 dark:text-blue-400 font-medium">
                      TypeScript
                    </span>{" "}
                    Enthusiast
                  </p>
                  {fallbackProfile.location && (
                    <p className="text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {fallbackProfile.location}
                    </p>
                  )}
                  {fallbackProfile.company && (
                    <p className="text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      {fallbackProfile.company}
                    </p>
                  )}

                  <div className="flex gap-4 mt-4">
                    <Link
                      href={`https://github.com/${fallbackProfile.login}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      aria-label="GitHub profile"
                      id="robo-github-link"
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
                  </div>
                </div>
              </div>
            </div>

            <GitHubStats
              followers={fallbackProfile.followers}
              following={fallbackProfile.following}
              totalStars={fallbackProfile.totalStars}
              topLanguages={fallbackProfile.topLanguages}
              publicRepos={fallbackProfile.publicRepos}
              contributions={fallbackProfile.contributions}
              bio={fallbackProfile.bio}
            />

            {profile && <GitHubActivityGraph username={profile.login} />}
          </div>

          {/* Right column - Timeline and Skills */}
          <div className="space-y-8 mt-8">
            {/* My Story */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden relative">
              {/* Decorative overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-blue-100/20 dark:from-blue-900/10 dark:via-transparent dark:to-blue-800/10 pointer-events-none"></div>

              <div className="p-6 relative">
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex-shrink-0 w-1 h-6 bg-blue-500 dark:bg-blue-400 rounded"></div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                    My Story
                  </h3>
                </div>

                <div className="space-y-8">
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-800"></div>
                    <div className="absolute left-[-4px] top-1 w-3 h-3 rounded-full bg-blue-500 dark:bg-blue-400 border-2 border-white dark:border-slate-800"></div>
                    <div className="mb-1">
                      <h4 className="font-semibold text-slate-800 dark:text-white text-lg">
                        Teaching Background
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300 mt-2">
                        My journey began in education, where I developed a deep
                        understanding of how people learn and interact with
                        technology.
                      </p>
                    </div>
                  </div>

                  <div className="relative pl-8">
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-800"></div>
                    <div className="absolute left-[-4px] top-1 w-3 h-3 rounded-full bg-blue-500 dark:bg-blue-400 border-2 border-white dark:border-slate-800"></div>
                    <div className="mb-1">
                      <h4 className="font-semibold text-slate-800 dark:text-white text-lg">
                        Problem Solving Through Code
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300 mt-2">
                        I discovered my passion for programming when I started
                        creating tools to enhance the learning experience. This
                        led me to explore the world of web development.
                      </p>
                    </div>
                  </div>

                  <div className="relative pl-8">
                    <div className="absolute left-0 top-0 h-1/2 w-0.5 bg-blue-200 dark:bg-blue-800"></div>
                    <div className="absolute left-[-4px] top-1 w-3 h-3 rounded-full bg-blue-500 dark:bg-blue-400 border-2 border-white dark:border-slate-800"></div>
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-white text-lg">
                        Professional Development
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300 mt-2">
                        Today, I focus on building modern web applications and
                        creating engaging user experiences. My background in
                        education helps me approach development with a
                        user-centric mindset.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Skills */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden relative">
              {/* Decorative overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-blue-100/20 dark:from-blue-900/10 dark:via-transparent dark:to-blue-800/10 pointer-events-none"></div>

              <div className="p-6 relative">
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex-shrink-0 w-1 h-6 bg-blue-500 dark:bg-blue-400 rounded"></div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                    Tech Skills
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-6" id="robo-tech-skills">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full"></span>
                        Frontend
                      </h4>
                      <ul className="space-y-2 text-slate-600 dark:text-slate-300 ml-3">
                        {[
                          "JavaScript/TypeScript",
                          "React/Next.js",
                          "Redux Toolkit",
                          "Redux Saga",
                          "Tailwind CSS",
                          "Sass",
                          "Material UI",
                          "HTML5/CSS3",
                        ].map((skill) => (
                          <li key={skill} className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4 text-blue-500 dark:text-blue-400 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full"></span>
                        Backend
                      </h4>
                      <ul className="space-y-2 text-slate-600 dark:text-slate-300 ml-3">
                        {[
                          "Node.js",
                          "Symfony",
                          "PHP",
                          "REST APIs",
                          "SQL",
                          "NoSQL",
                        ].map((skill) => (
                          <li key={skill} className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4 text-blue-500 dark:text-blue-400 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full"></span>
                        Tools
                      </h4>
                      <ul className="space-y-2 text-slate-600 dark:text-slate-300 ml-3">
                        {["Git/GitHub", "VS Code", "Docker", "Vercel"].map(
                          (skill) => (
                            <li key={skill} className="flex items-center gap-2">
                              <svg
                                className="w-4 h-4 text-blue-500 dark:text-blue-400 flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {skill}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full"></span>
                        Other
                      </h4>
                      <ul className="space-y-2 text-slate-600 dark:text-slate-300 ml-3">
                        {[
                          "Agile/Scrum",
                          "CI/CD",
                          "Cypress",
                          "Jest",
                          "PestPHP",
                          "PHPUnit",
                          "Documentation",
                          "Design Patterns (still learning but deeply interested)",
                        ].map((skill) => (
                          <li key={skill} className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4 text-blue-500 dark:text-blue-400 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
