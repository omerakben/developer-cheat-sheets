"use client";

import { BookmarkedExample } from "@/types/cheatsheet";
import { createContext, useContext, useEffect, useState } from "react";

interface BookmarkContextType {
  bookmarks: BookmarkedExample[];
  addBookmark: (bookmark: Omit<BookmarkedExample, "timestamp">) => void;
  removeBookmark: (
    cheatSheetId: string,
    sectionId: string,
    exampleTitle: string
  ) => void;
  isBookmarked: (
    cheatSheetId: string,
    sectionId: string,
    exampleTitle: string
  ) => boolean;
  clearAllBookmarks: () => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined
);

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<BookmarkedExample[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("bookmarks");
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to parse bookmarks:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks, mounted]);

  const addBookmark = (
    bookmark: Omit<BookmarkedExample, "timestamp">
  ): void => {
    setBookmarks((prev) => [
      ...prev,
      { ...bookmark, timestamp: Date.now() },
    ]);
  };

  const removeBookmark = (
    cheatSheetId: string,
    sectionId: string,
    exampleTitle: string
  ): void => {
    setBookmarks((prev) =>
      prev.filter(
        (b) =>
          !(
            b.cheatSheetId === cheatSheetId &&
            b.sectionId === sectionId &&
            b.exampleTitle === exampleTitle
          )
      )
    );
  };

  const isBookmarked = (
    cheatSheetId: string,
    sectionId: string,
    exampleTitle: string
  ): boolean => {
    return bookmarks.some(
      (b) =>
        b.cheatSheetId === cheatSheetId &&
        b.sectionId === sectionId &&
        b.exampleTitle === exampleTitle
    );
  };

  const clearAllBookmarks = (): void => {
    setBookmarks([]);
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        addBookmark,
        removeBookmark,
        isBookmarked,
        clearAllBookmarks,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    // Return default values during SSR or if provider is missing
    return {
      bookmarks: [],
      addBookmark: () => {},
      removeBookmark: () => {},
      isBookmarked: () => false,
      clearAllBookmarks: () => {},
    };
  }
  return context;
}
