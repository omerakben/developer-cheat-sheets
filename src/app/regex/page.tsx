import CheatSheetLayout from "@/components/CheatSheetLayout";
import { regexCheatSheet } from "@/lib/cheatsheets/regex";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regular Expressions (Regex) Cheat Sheet",
  description:
    "Master regex patterns for text matching, validation, and extraction. From basics to advanced lookaheads with real-world examples.",
};

export default function RegexPage() {
  return (
    <CheatSheetLayout cheatSheet={regexCheatSheet} cheatSheetId="regex" />
  );
}
