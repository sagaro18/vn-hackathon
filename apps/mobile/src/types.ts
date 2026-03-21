// --- VISUAL NOVEL STORY TYPES ---

export interface Choice {
  label: string;
  nextLineId: string;
}

export interface DialogueLine {
  id: string;
  speaker: string; // e.g., "Vaina", "Player", or "" for narrator
  text: string;
  expression: string; // e.g., "none", "Happy"
  background: string; // e.g., "beginner_cave", "Village_Interior"
  choices?: Choice[];
  triggerEvent?: string; // e.g., "START_FREE_TIME"
  _comment?: string; // Optional field for the storyteller's notes
}

// --- GAME STATE & AI TYPES (For later today) ---

export interface Character {
  id: string;
  name: string;
  relationshipLevel: number;
  affectionPoints: number;
  unlockedTopics: string[];
}

export interface PlayerState {
  currentChapter: number;
  gems: number;
  premiumScenesUnlocked: string[];
}