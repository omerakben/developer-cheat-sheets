import CheatSheetLayout from "@/components/CheatSheetLayout";
import { gitCheatSheet } from "@/lib/cheatsheets/git";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Git Commands Cheat Sheet",
  description:
    "Essential Git commands and workflows. Master version control with practical examples for commits, branches, rebasing, and collaboration.",
};

export default function GitPage() {
  return <CheatSheetLayout cheatSheet={gitCheatSheet} cheatSheetId="git" />;
}
