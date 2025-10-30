import CheatSheetLayout from "@/components/CheatSheetLayout";
import { pythonCheatSheet } from "@/lib/cheatsheets/python";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Python Cheat Sheet",
  description:
    "Comprehensive Python reference guide with copy-paste ready code examples covering variables, data types, control flow, functions, classes, and more.",
};

export default function PythonPage() {
  return (
    <CheatSheetLayout cheatSheet={pythonCheatSheet} cheatSheetId="python" />
  );
}
