import {
  ArrowRight,
  Atom,
  Bookmark,
  Brain,
  Code,
  Container,
  Copy,
  Database,
  Filter,
  GitBranch,
  Layers,
  Regex as RegexIcon,
  Rocket,
  Search,
  Sparkles,
  Type,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const cheatsheets = [
    {
      href: "/git",
      title: "Git",
      icon: GitBranch,
      color: "orange",
      description:
        "Version control mastery: commits, branches, rebasing, and collaboration",
    },
    {
      href: "/docker",
      title: "Docker",
      icon: Container,
      color: "blue",
      description:
        "Containerization: builds, compose, multi-stage, and best practices",
    },
    {
      href: "/react",
      title: "React",
      icon: Atom,
      color: "cyan",
      description:
        "Modern hooks, performance, custom hooks, and advanced patterns",
    },
    {
      href: "/python",
      title: "Python",
      icon: Code,
      color: "yellow",
      description:
        "Variables, data types, control flow, functions, classes, and more",
    },
    {
      href: "/typescript",
      title: "TypeScript",
      icon: Type,
      color: "blue",
      description:
        "Types, interfaces, generics, utility types, and advanced patterns",
    },
    {
      href: "/nextjs",
      title: "Next.js",
      icon: Layers,
      color: "black",
      description:
        "App Router, Server Components, data fetching, and deployment",
    },
    {
      href: "/django",
      title: "Django",
      icon: Database,
      color: "green",
      description:
        "Models, views, templates, authentication, and REST API patterns",
    },
    {
      href: "/fastapi",
      title: "FastAPI",
      icon: Rocket,
      color: "teal",
      description: "Path operations, validation, security, and deployment",
    },
    {
      href: "/openai",
      title: "OpenAI",
      icon: Brain,
      color: "purple",
      description: "Chat completions, function calling, assistants, and more",
    },
    {
      href: "/regex",
      title: "Regex",
      icon: RegexIcon,
      color: "red",
      description:
        "Pattern matching, validation, and extraction made simple",
    },
  ];

  const features = [
    {
      icon: Copy,
      title: "Copy-Paste Ready",
      description:
        "Every code example is production-ready. Just copy, paste, and customize for your needs.",
      color: "blue",
    },
    {
      icon: Search,
      title: "Instant Search",
      description:
        "Find exactly what you need in seconds with powerful search across all examples.",
      color: "green",
    },
    {
      icon: Filter,
      title: "Smart Filtering",
      description:
        "Filter by difficulty level (beginner to expert) and tags to match your skill level.",
      color: "purple",
    },
    {
      icon: Bookmark,
      title: "Bookmark System",
      description:
        "Save your favorite snippets for quick access. Your bookmarks sync across sessions.",
      color: "orange",
    },
    {
      icon: Sparkles,
      title: "Best Practices",
      description:
        "All examples follow modern standards with security and performance in mind.",
      color: "pink",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Optimized for speed with instant page loads and smooth interactions.",
      color: "yellow",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 dark:from-blue-900 dark:via-blue-800 dark:to-purple-900">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 mb-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Sparkles className="w-4 h-4 text-yellow-300 mr-2" />
              <span className="text-sm text-white font-medium">
                10 Comprehensive Cheat Sheets
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Developer Cheat Sheets
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Your go-to resource for quick reference guides. Copy-paste ready
              code examples for modern web development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/python"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl group"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://github.com/omerakben/developer-cheat-sheets"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-blue-800/50 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-blue-800/70 transition-all border border-white/20"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Cheat Sheets Grid */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Available Cheat Sheets
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Explore comprehensive guides for your favorite technologies
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cheatsheets.map((sheet) => {
            const Icon = sheet.icon;
            return (
              <Link
                key={sheet.href}
                href={sheet.href}
                className="group relative bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all shadow-sm hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {sheet.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {sheet.description}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 dark:bg-gray-900/50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Use These Cheat Sheets?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Built for developers who value speed, clarity, and best practices
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800"
                >
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg w-fit mb-4">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Code Faster?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join developers who use these cheat sheets to boost their
            productivity and write better code.
          </p>
          <Link
            href="/python"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl group"
          >
            Start Exploring
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
