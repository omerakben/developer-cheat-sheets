"use client";

import { useBookmarks } from "@/contexts/BookmarkContext";
import { DifficultyLevel } from "@/types/cheatsheet";
import { Bookmark, Check, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
  description?: string;
  difficulty?: DifficultyLevel;
  tags?: string[];
  documentationUrl?: string;
  cheatSheetId?: string;
  sectionId?: string;
}

const difficultyColors = {
  beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  intermediate:
    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  advanced:
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  expert: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

export default function CodeBlock({
  code,
  language,
  title,
  description,
  difficulty,
  tags,
  documentationUrl,
  cheatSheetId,
  sectionId,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();

  const bookmarked =
    cheatSheetId && sectionId && title
      ? isBookmarked(cheatSheetId, sectionId, title)
      : false;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const handleBookmark = () => {
    if (!cheatSheetId || !sectionId || !title) return;

    if (bookmarked) {
      removeBookmark(cheatSheetId, sectionId, title);
    } else {
      addBookmark({ cheatSheetId, sectionId, exampleTitle: title });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
      {(title || description || difficulty || tags) && (
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              {title && (
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {description}
                </p>
              )}
            </div>
            {cheatSheetId && sectionId && title && (
              <button
                onClick={handleBookmark}
                className={`ml-2 p-2 rounded-md transition-colors ${
                  bookmarked
                    ? "text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                    : "text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                title={bookmarked ? "Remove bookmark" : "Add bookmark"}
              >
                <Bookmark
                  className={`w-5 h-5 ${bookmarked ? "fill-current" : ""}`}
                />
              </button>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {difficulty && (
              <span
                className={`px-2 py-1 text-xs font-medium rounded-md ${difficultyColors[difficulty]}`}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </span>
            )}
            {tags &&
              tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs font-medium bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-md"
                >
                  {tag}
                </span>
              ))}
            {documentationUrl && (
              <a
                href={documentationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                <ExternalLink className="w-3 h-3" />
                Docs
              </a>
            )}
          </div>
        </div>
      )}

      <div className="relative">
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 bg-gray-700 hover:bg-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-md transition-colors duration-200 z-10"
          title={copied ? "Copied!" : "Copy to clipboard"}
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-gray-300" />
          )}
        </button>

        <SyntaxHighlighter
          language={language}
          style={oneDark}
          customStyle={{
            margin: 0,
            padding: "1rem",
            background: "transparent",
            fontSize: "14px",
            lineHeight: "1.5",
          }}
          showLineNumbers={false}
          wrapLines={true}
          wrapLongLines={true}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
