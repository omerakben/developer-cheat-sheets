import CheatSheetLayout from "@/components/CheatSheetLayout";
import { typescriptCheatSheet } from "@/lib/cheatsheets/typescript";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TypeScript Cheat Sheet",
  description:
    "TypeScript essentials including types, interfaces, generics, utility types, and advanced patterns for modern web development.",
};

export default function TypeScriptPage() {
  return (
    <CheatSheetLayout
      cheatSheet={typescriptCheatSheet}
      cheatSheetId="typescript"
    />
  );
}
