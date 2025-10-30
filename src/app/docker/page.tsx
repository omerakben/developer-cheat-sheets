import CheatSheetLayout from "@/components/CheatSheetLayout";
import { dockerCheatSheet } from "@/lib/cheatsheets/docker";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Docker & Containers Cheat Sheet",
  description:
    "Master Docker containerization with practical examples. Build, run, and deploy containers with Docker Compose, multi-stage builds, and best practices.",
};

export default function DockerPage() {
  return (
    <CheatSheetLayout cheatSheet={dockerCheatSheet} cheatSheetId="docker" />
  );
}
