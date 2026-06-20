export type Category = 
  | 'islamic' 
  | 'science' 
  | 'general' 
  | 'geography' 
  | 'sports' 
  | 'literature';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  category: Category;
  difficulty: Difficulty;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  explanation?: string;
  points: number;
}

export interface Team {
  id: string;
  name: string;
  score: number;
  color: string; // Tailwind color class or hex
  avatar: string; // Emoji or icon identifier
  lifelines: {
    deleteTwoUsed: boolean; // 50:50 lifelines (حذف إجابتين)
    doublePointsUsed: boolean; // مضاعفة النقاط
  };
}

export interface GameConfig {
  winningScore: number;
  timePerQuestion: number; // in seconds
  selectedCategories: Category[];
  difficultyFilter: Difficulty[];
}

export type GamePhase = 'setup' | 'playing' | 'answer_result' | 'game_over';
