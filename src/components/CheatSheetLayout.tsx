"use client";

import { CheatSheet, CodeExample, DifficultyLevel } from "@/types/cheatsheet";
import Fuse from "fuse.js";
import { Filter, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import CodeBlock from "./CodeBlock";

interface CheatSheetLayoutProps {
  cheatSheet: CheatSheet;
  cheatSheetId: string;
}

export default function CheatSheetLayout({
  cheatSheet,
  cheatSheetId,
}: CheatSheetLayoutProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<DifficultyLevel | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Create Fuse.js search index with all examples
  const searchableData = useMemo(() => {
    const data: Array<{
      sectionId: string;
      sectionTitle: string;
      example: CodeExample;
    }> = [];

    cheatSheet.sections.forEach((section) => {
      section.examples.forEach((example) => {
        data.push({
          sectionId: section.id,
          sectionTitle: section.title,
          example,
        });
      });
    });

    return data;
  }, [cheatSheet]);

  // Configure Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(searchableData, {
      keys: [
        { name: "example.title", weight: 0.4 }, // Title most important
        { name: "example.description", weight: 0.3 },
        { name: "example.tags", weight: 0.2 },
        { name: "example.code", weight: 0.1 }, // Code least important
        { name: "sectionTitle", weight: 0.15 },
      ],
      threshold: 0.4, // 0 = perfect match, 1 = match anything
      distance: 100,
      minMatchCharLength: 2,
      includeScore: true,
      useExtendedSearch: true,
    });
  }, [searchableData]);

  // Perform fuzzy search
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return searchableData;

    const results = fuse.search(searchTerm);
    return results.map((result) => result.item);
  }, [searchTerm, fuse, searchableData]);

  // Filter by difficulty and organize into sections
  const filteredSections = useMemo(() => {
    const filteredData = searchResults.filter((item) => {
      const matchesDifficulty =
        !selectedDifficulty || item.example.difficulty === selectedDifficulty;
      return matchesDifficulty;
    });

    // Group back into sections
    const sectionMap = new Map<
      string,
      {
        id: string;
        title: string;
        description: string;
        examples: CodeExample[];
      }
    >();

    filteredData.forEach((item) => {
      if (!sectionMap.has(item.sectionId)) {
        const originalSection = cheatSheet.sections.find(
          (s) => s.id === item.sectionId
        );
        if (originalSection) {
          sectionMap.set(item.sectionId, {
            ...originalSection,
            examples: [],
          });
        }
      }

      const section = sectionMap.get(item.sectionId);
      if (section) {
        section.examples.push(item.example);
      }
    });

    return Array.from(sectionMap.values());
  }, [searchResults, selectedDifficulty, cheatSheet.sections]);

  const clearSearch = () => {
    setSearchTerm("");
  };

  const clearFilters = () => {
    setSelectedDifficulty(null);
    setSearchTerm("");
  };

  const difficulties: DifficultyLevel[] = [
    "beginner",
    "intermediate",
    "advanced",
    "expert",
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {cheatSheet.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {cheatSheet.description}
              </p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search examples..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    title="Clear search"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
                {selectedDifficulty && (
                  <span className="ml-1 px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full">
                    1
                  </span>
                )}
              </button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Difficulty Level
                  </h3>
                  {selectedDifficulty && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {difficulties.map((difficulty) => (
                    <button
                      key={difficulty}
                      onClick={() =>
                        setSelectedDifficulty(
                          selectedDifficulty === difficulty ? null : difficulty
                        )
                      }
                      className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                        selectedDifficulty === difficulty
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* Sidebar Navigation */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-60">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Sections
            </h2>
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
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {section.title}
                  <span className="ml-2 text-xs opacity-75">
                    ({section.examples.length})
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {(searchTerm || selectedDifficulty) && (
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300">
                Found{" "}
                {filteredSections.reduce(
                  (acc, section) => acc + section.examples.length,
                  0
                )}{" "}
                example(s)
                {searchTerm && ` matching "${searchTerm}"`}
                {selectedDifficulty &&
                  ` with ${selectedDifficulty} difficulty`}
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
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {section.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {section.description}
                  </p>
                </div>

                <div className="space-y-6">
                  {section.examples.map((example, index) => (
                    <CodeBlock
                      key={index}
                      title={example.title}
                      description={example.description}
                      code={example.code}
                      language={example.language}
                      difficulty={example.difficulty}
                      tags={example.tags}
                      documentationUrl={example.documentationUrl}
                      cheatSheetId={cheatSheetId}
                      sectionId={section.id}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>

          {filteredSections.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
                No examples found
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm mb-4">
                Try adjusting your search or filters
              </p>
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
