import CheatSheetLayout from "@/components/CheatSheetLayout";
import { djangoCheatSheet } from "@/lib/cheatsheets/django";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Django Cheat Sheet",
  description:
    "Complete Django framework reference with models, views, templates, authentication, REST API patterns, and best practices.",
};

export default function DjangoPage() {
  return (
    <CheatSheetLayout cheatSheet={djangoCheatSheet} cheatSheetId="django" />
  );
}
