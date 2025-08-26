import { Code, Copy, Database, Layers, Type, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Developer Cheat Sheets</h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Comprehensive reference guides with copy-paste ready code examples
              to supercharge your development speed. From Python basics to
              TypeScript types, Django patterns to Next.js App Router -
              everything you need is here.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <Link
                href="/python"
                className="bg-blue-600 hover:bg-blue-700 px-6 py-4 rounded-lg font-semibold transition-colors flex items-center gap-2 justify-center"
              >
                <Code className="w-5 h-5" />
                Python
              </Link>
              <Link
                href="/django"
                className="bg-green-600 hover:bg-green-700 px-6 py-4 rounded-lg font-semibold transition-colors flex items-center gap-2 justify-center"
              >
                <Database className="w-5 h-5" />
                Django
              </Link>
              <Link
                href="/typescript"
                className="bg-blue-500 hover:bg-blue-600 px-6 py-4 rounded-lg font-semibold transition-colors flex items-center gap-2 justify-center"
              >
                <Type className="w-5 h-5" />
                TypeScript
              </Link>
              <Link
                href="/nextjs"
                className="bg-gray-800 hover:bg-gray-700 px-6 py-4 rounded-lg font-semibold transition-colors flex items-center gap-2 justify-center"
              >
                <Layers className="w-5 h-5" />
                Next.js
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Why Use These Cheat Sheets?
          </h2>
          <p className="text-gray-400 text-lg">
            Designed for developers who want to code faster and more efficiently
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Copy className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Copy-Paste Ready
            </h3>
            <p className="text-gray-400">
              Every code example is production-ready and can be copied directly
              into your projects. No more typing out boilerplate code from
              scratch.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Boost Your Speed
            </h3>
            <p className="text-gray-400">
              Stop googling the same patterns over and over. Find what you need
              instantly with organized, searchable sections.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Code className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Best Practices
            </h3>
            <p className="text-gray-400">
              All examples follow modern development best practices, helping you
              write cleaner, more maintainable code across multiple
              technologies.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Access Section */}
      <div className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Code className="w-6 h-6 text-blue-500" />
                Python Essentials
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Variables, data types, and basic operations</li>
                <li>• Lists, dictionaries, sets, and tuples</li>
                <li>• Control flow and loops</li>
                <li>• Functions and classes</li>
                <li>• File I/O and error handling</li>
                <li>• Essential standard library modules</li>
              </ul>
              <Link
                href="/python"
                className="inline-block mt-4 text-blue-400 hover:text-blue-300 font-semibold"
              >
                Explore Python →
              </Link>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Database className="w-6 h-6 text-green-500" />
                Django Framework
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Project setup and configuration</li>
                <li>• Models, views, and URL patterns</li>
                <li>• Templates and forms</li>
                <li>• User authentication and admin</li>
                <li>• Class-based views and mixins</li>
                <li>• API development patterns</li>
              </ul>
              <Link
                href="/django"
                className="inline-block mt-4 text-green-400 hover:text-green-300 font-semibold"
              >
                Explore Django →
              </Link>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Type className="w-6 h-6 text-blue-400" />
                TypeScript Types
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Basic types and interfaces</li>
                <li>• Advanced type patterns</li>
                <li>• React component typing</li>
                <li>• Generic types and constraints</li>
                <li>• Utility types and mapped types</li>
                <li>• Configuration and tooling</li>
              </ul>
              <Link
                href="/typescript"
                className="inline-block mt-4 text-blue-400 hover:text-blue-300 font-semibold"
              >
                Explore TypeScript →
              </Link>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Layers className="w-6 h-6 text-gray-400" />
                Next.js App Router
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>• App Router and routing patterns</li>
                <li>• Server and Client Components</li>
                <li>• Data fetching strategies</li>
                <li>• API routes and middleware</li>
                <li>• Styling and component patterns</li>
                <li>• Performance optimizations</li>
              </ul>
              <Link
                href="/nextjs"
                className="inline-block mt-4 text-gray-400 hover:text-gray-300 font-semibold"
              >
                Explore Next.js →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
