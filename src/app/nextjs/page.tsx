import CheatSheetLayout from "@/components/CheatSheetLayout";
import { nextjsCheatSheet } from "@/lib/cheatsheets/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Cheat Sheet",
  description:
    "Modern Next.js App Router guide covering Server Components, data fetching, API routes, middleware, and deployment.",
};

export default function NextJSPage() {
  return (
    <CheatSheetLayout cheatSheet={nextjsCheatSheet} cheatSheetId="nextjs" />
  );
}
