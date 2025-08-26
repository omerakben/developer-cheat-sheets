import CheatSheetLayout from "@/components/CheatSheetLayout";
import { pythonCheatSheet } from "@/lib/cheatsheets/python";

export default function PythonPage() {
  return <CheatSheetLayout cheatSheet={pythonCheatSheet} />;
}
