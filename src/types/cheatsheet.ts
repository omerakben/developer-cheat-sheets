export interface CodeExample {
  title: string;
  description: string;
  code: string;
  language: string;
}

export interface CheatSheetSection {
  id: string;
  title: string;
  description: string;
  examples: CodeExample[];
}

export interface CheatSheet {
  title: string;
  description: string;
  sections: CheatSheetSection[];
}
