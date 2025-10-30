export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface CodeExample {
  title: string;
  description: string;
  code: string;
  language: string;
  difficulty?: DifficultyLevel;
  tags?: string[];
  documentationUrl?: string;
}

export interface CheatSheetSection {
  id: string;
  title: string;
  description: string;
  examples: CodeExample[];
  icon?: string;
}

export interface CheatSheet {
  title: string;
  description: string;
  sections: CheatSheetSection[];
  metadata?: {
    lastUpdated?: string;
    version?: string;
    author?: string;
  };
}

export interface BookmarkedExample {
  cheatSheetId: string;
  sectionId: string;
  exampleTitle: string;
  timestamp: number;
}
