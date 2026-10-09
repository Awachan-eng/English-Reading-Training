export type Difficulty = 'easy' | 'normal' | 'hard' | 'master';

export interface DifficultyConfig {
  id: Difficulty;
  label: string;
  eikenGrade: string;
  wordCountTarget: string;
  wordCountMin: number;
  wordCountMax: number;
  description: string;
  targetAudience: string;
  accentBg: string;
  accentText: string;
  accentBorder: string;
  gradient: string;
  badge: string;
}

export interface Question {
  id: number;
  question: string;
  options: string[]; // 5 choices: A, B, C, D, E
  correctAnswer: number; // 0-4
  explanation: string;
  questionType: string; // e.g. "要旨把握", "理由・因果関係", "詳細一致", "文脈・語彙推論", "筆者の主張"
  keyReferencePhrase?: string; // Phrase in the passage answering this
}

export interface VocabularyItem {
  word: string;
  meaning: string;
  partOfSpeech?: string;
  exampleSentence?: string;
}

export interface PassageData {
  id: string;
  title: string;
  difficulty: Difficulty;
  topic: string;
  wordCount: number;
  passage: string; // multi-paragraph English text
  keySentences: string[]; // Key sentences to highlight in RED
  japaneseTranslation: string;
  vocabulary: VocabularyItem[];
  questions: Question[];
}

export interface UserAnswerRecord {
  questionId: number;
  selectedOption: number;
  isCorrect: boolean;
  questionType: string;
}

export interface WeaknessAnalysis {
  summary: string;
  weakPoints: {
    category: string;
    description: string;
    severity: 'high' | 'medium' | 'low';
  }[];
  strengths: string[];
  actionableTips: string[];
  recommendedDifficulty: Difficulty;
  speedAndAccuracyComment: string;
}

export interface SessionResult {
  id: string;
  timestamp: number;
  dateStr: string;
  difficulty: Difficulty;
  passageTitle: string;
  score: number; // out of 5
  totalQuestions: number; // 5
  accuracyRate: number; // 0-100%
  timeSpentSeconds: number;
  answers: UserAnswerRecord[];
  weaknessAnalysis: WeaknessAnalysis;
  passageData: PassageData;
}

export interface UserProfile {
  email: string;
  name: string;
  avatarUrl?: string;
  provider: 'google' | 'email';
  createdAt: number;
  lastLogin: number;
  totalTestsTaken: number;
  totalQuestionsAnswered: number;
  totalCorrect: number;
  results: SessionResult[];
}
