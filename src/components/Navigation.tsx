"use client";

import { useTheme } from "@/contexts/ThemeContext";
import {
  Brain,
  Code,
  Database,
  FileCode2,
  Github,
  Home,
  Menu,
  Moon,
  Rocket,
  Sun,
  X,
  Zap,
  Bookmark,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/python", label: "Python", icon: Code },
    { href: "/django", label: "Django", icon: Database },
    { href: "/typescript", label: "TypeScript", icon: FileCode2 },
    { href: "/nextjs", label: "Next.js", icon: Zap },
    { href: "/openai", label: "OpenAI", icon: Brain },
    { href: "/fastapi", label: "FastAPI", icon: Rocket },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <Code className="w-8 h-8 text-blue-500 group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
                Dev CheatSheets
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-2">
            {/* Bookmarks button */}
            <Link
              href="/bookmarks"
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="View Bookmarks"
            >
              <Bookmark className="w-5 h-5" />
            </Link>

            {/* GitHub link */}
            <a
              href="https://github.com/omerakben/developer-cheat-sheets"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="View on GitHub"
            >
              <Github className="w-5 h-5" />
            </a>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-800 py-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-md text-base font-medium transition-colors ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
