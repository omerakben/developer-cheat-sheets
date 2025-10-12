import CheatSheetLayout from "@/components/CheatSheetLayout";
import { openaiCheatSheet } from "@/lib/cheatsheets/openai";

export default function OpenAIPage() {
  return <CheatSheetLayout cheatSheet={openaiCheatSheet} />;
}
