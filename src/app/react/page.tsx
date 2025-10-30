import CheatSheetLayout from "@/components/CheatSheetLayout";
import { reactCheatSheet } from "@/lib/cheatsheets/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "React Hooks & Patterns Cheat Sheet",
  description:
    "Modern React development with hooks, performance optimization, and patterns. From useState to custom hooks, memo, and advanced techniques.",
};

export default function ReactPage() {
  return (
    <CheatSheetLayout cheatSheet={reactCheatSheet} cheatSheetId="react" />
  );
}
