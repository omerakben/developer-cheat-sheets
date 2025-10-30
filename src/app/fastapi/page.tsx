import CheatSheetLayout from "@/components/CheatSheetLayout";
import { fastapiCheatSheet } from "@/lib/cheatsheets/fastapi";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FastAPI Cheat Sheet",
  description:
    "FastAPI framework reference with path operations, request validation, security, authentication, and deployment best practices.",
};

export default function FastAPIPage() {
  return (
    <CheatSheetLayout cheatSheet={fastapiCheatSheet} cheatSheetId="fastapi" />
  );
}
