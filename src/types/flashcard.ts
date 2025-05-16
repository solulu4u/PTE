export interface Flashcard {
  id: string;
  front: string;
  back: string;
  imageUrl?: string;
  audioUrl?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  lastReviewed?: Date;
  timesReviewed: number;
  correctReviews: number;
}

export interface FlashcardDeck {
  id: string;
  title: string;
  description: string;
  cards: Flashcard[];
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
  authorId: string;
  tags: string[];
}

export type StudyMode = 'flip' | 'quiz' | 'write' | 'match';

export interface StudyProgress {
  deckId: string;
  cardsStudied: number;
  correctAnswers: number;
  timeSpent: number;
  lastStudied: Date;
}