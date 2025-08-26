import CheatSheetLayout from "@/components/CheatSheetLayout";
import { djangoCheatSheet } from "@/lib/cheatsheets/django";

export default function DjangoPage() {
  return <CheatSheetLayout cheatSheet={djangoCheatSheet} />;
}
