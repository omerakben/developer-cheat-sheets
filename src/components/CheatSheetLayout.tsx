"use client";

import { CheatSheet } from "@/types/cheatsheet";
import { Search, X } from "lucide-react";
import { useState } from "react";
import CodeBlock from "./CodeBlock";

interface CheatSheetLayoutProps {
  cheatSheet: CheatSheet;
}

export default function CheatSheetLayout({
  cheatSheet,
}: CheatSheetLayoutProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const filteredSections = cheatSheet.sections.filter(
    (section) =>
      section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.examples.some(
        (example) =>
          example.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          example.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          example.code.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">
                {cheatSheet.title}
              </h1>
              <p className="text-gray-400 mt-1">{cheatSheet.description}</p>
            </div>

            {/* Search */}
            <div className="relative max-w-md w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search cheat sheets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  title="Clear search"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* Sidebar Navigation */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-32">
            <h2 className="text-lg font-semibold text-white mb-4">Sections</h2>
            <nav className="space-y-2">
              {filteredSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    const element = document.getElementById(section.id);
                    element?.scrollIntoView({ behavior: "smooth" });
                    setActiveSection(section.id);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    activeSection === section.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {searchTerm && (
            <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
              <p className="text-gray-300">
                Found {filteredSections.length} section(s) matching &ldquo;
                {searchTerm}&rdquo;
              </p>
            </div>
          )}

          <div className="space-y-12">
            {filteredSections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-32"
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {section.title}
                  </h2>
                  <p className="text-gray-400">{section.description}</p>
                </div>

                <div className="space-y-6">
                  {section.examples.map((example, index) => (
                    <CodeBlock
                      key={index}
                      title={example.title}
                      description={example.description}
                      code={example.code}
                      language={example.language}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>

          {filteredSections.length === 0 && searchTerm && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No results found for &ldquo;{searchTerm}&rdquo;
              </p>
              <button
                onClick={clearSearch}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
