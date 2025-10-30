import CheatSheetLayout from "@/components/CheatSheetLayout";
import { openaiCheatSheet } from "@/lib/cheatsheets/openai";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenAI API Cheat Sheet",
  description:
    "Complete OpenAI API guide covering chat completions, function calling, assistants, vision, audio, embeddings, and production best practices.",
};

export default function OpenAIPage() {
  return (
    <CheatSheetLayout cheatSheet={openaiCheatSheet} cheatSheetId="openai" />
  );
}
