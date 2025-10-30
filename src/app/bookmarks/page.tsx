"use client";

import { useBookmarks } from "@/contexts/BookmarkContext";
import { Bookmark, ExternalLink, Trash2 } from "lucide-react";
import Link from "next/link";

export default function BookmarksPage() {
  const { bookmarks, removeBookmark, clearAllBookmarks } = useBookmarks();

  const getCheatSheetName = (id: string): string => {
    const names: Record<string, string> = {
      python: "Python",
      django: "Django",
      typescript: "TypeScript",
      nextjs: "Next.js",
      openai: "OpenAI",
      fastapi: "FastAPI",
    };
    return names[id] || id;
  };

  const groupedBookmarks = bookmarks.reduce(
    (acc, bookmark) => {
      if (!acc[bookmark.cheatSheetId]) {
        acc[bookmark.cheatSheetId] = [];
      }
      acc[bookmark.cheatSheetId].push(bookmark);
      return acc;
    },
    {} as Record<string, typeof bookmarks>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Bookmarks
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Your saved code snippets and examples
              </p>
            </div>
            {bookmarks.length > 0 && (
              <button
                onClick={() => {
                  if (
                    confirm(
                      "Are you sure you want to clear all bookmarks? This cannot be undone."
                    )
                  ) {
                    clearAllBookmarks();
                  }
                }}
                className="px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Bookmark className="w-4 h-4" />
            <span>{bookmarks.length} bookmark(s) saved</span>
          </div>
        </div>

        {bookmarks.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
              <Bookmark className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No bookmarks yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Start bookmarking your favorite code snippets to access them
              quickly later. Just click the bookmark icon on any example.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Explore Cheat Sheets
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedBookmarks).map(
              ([cheatSheetId, sheetBookmarks]) => (
                <div
                  key={cheatSheetId}
                  className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {getCheatSheetName(cheatSheetId)}
                    </h2>
                    <Link
                      href={`/${cheatSheetId}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center gap-1"
                    >
                      View Cheat Sheet
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {sheetBookmarks.map((bookmark) => (
                      <div
                        key={`${bookmark.sectionId}-${bookmark.exampleTitle}`}
                        className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-between group hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                            {bookmark.exampleTitle}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Section: {bookmark.sectionId}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/${cheatSheetId}#${bookmark.sectionId}`}
                            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md transition-colors"
                            title="Go to example"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </Link>
                          <button
                            onClick={() =>
                              removeBookmark(
                                bookmark.cheatSheetId,
                                bookmark.sectionId,
                                bookmark.exampleTitle
                              )
                            }
                            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors"
                            title="Remove bookmark"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
