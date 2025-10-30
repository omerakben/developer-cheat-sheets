"use client";

import { Code, Github, Linkedin, Twitter, Heart, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Code className="w-8 h-8 text-blue-500" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Dev CheatSheets
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Your go-to resource for quick developer reference guides. Copy-paste
              ready code examples for modern web development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/python"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  Python
                </Link>
              </li>
              <li>
                <Link
                  href="/django"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  Django
                </Link>
              </li>
              <li>
                <Link
                  href="/typescript"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  TypeScript
                </Link>
              </li>
              <li>
                <Link
                  href="/nextjs"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  Next.js
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/openai"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  OpenAI
                </Link>
              </li>
              <li>
                <Link
                  href="/fastapi"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  FastAPI
                </Link>
              </li>
              <li>
                <Link
                  href="/bookmarks"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  Bookmarks
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/omerakben/developer-cheat-sheets"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Connect
            </h3>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://github.com/omerakben"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/omerakben"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/omerakben"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                title="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@omerakben.com"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                title="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <a
              href="https://omerakben.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              omerakben.com
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
              Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> by{" "}
              <a
                href="https://omerakben.com"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Omer Akben
              </a>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} Developer CheatSheets. Open Source under MIT License.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
