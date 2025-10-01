// types/practice.ts

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PracticeMode } from './navigation';

// Tipos básicos para modos de práctica
export type QuestionType = 'visual' | 'audio';
export type PracticeType = 'visual-written' | 'audio-written' | 'visual-oral' | 'audio-oral';
export type PracticeCategory = 'category' | 'random' | 'incorrect' | 'marked';

// Interfaz para preguntas
export interface Question {
  id: number;
  category: string;
  subcategory?: string;
  question: {
    text: string;
    audio?: string;
    visual?: string;
  };
  answer: string;
  audioAnswer?: string;
}

// Interfaz para respuestas de práctica
export interface PracticeAnswer {
  questionId: number;
  userAnswer: string;
  isCorrect: boolean;
  timestamp: Date;
  timeSpent: number; // en milisegundos
}

// Interfaz para estadísticas de la sesión
export interface PracticeStats {
  totalSessions: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  averageScore: number;
  bestScore: number;
  categories: Record<string, {
    totalQuestions: number;
    correctAnswers: number;
    incorrectAnswers: number;
  }>;
}

// Interfaz principal para la sesión de práctica
export interface PracticeSession {
  mode: PracticeMode;
  category: string;
  section: string;
  type: 'multiple' | 'single';
  questions: PracticeQuestion[];
  currentIndex: number;
  answers: Record<string, string>;
  score: number;
}

// Configuración para iniciar una sesión
export interface PracticeSessionConfig {
  mode: PracticeMode;
  questionType: QuestionType;
  category?: string;
  count?: number;
}

// Resultado de la sesión de práctica
export interface PracticeResult {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  score: number;
  timeSpent: number;
  questions: {
    id: string;
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    explanation?: {
      es: string;
      en: string;
    };
  }[];
}

// Estado persistente de práctica
export interface PracticePersistentState {
  markedQuestions: Set<number>;
  incorrectQuestions: Set<number>;
  completedSessions: number;
  totalCorrect: number;
  totalIncorrect: number;
  totalTime: number;
  lastSession?: PracticeResult;
}

export interface PracticeOption {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  gradient: [string, string];
  mode: PracticeMode;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  gradient: [string, string];
  sections?: Section[];
}

export interface Section {
  id: string;
  title: string;
  description: string;
}

export interface PracticeQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  category: string;
  section: string;
  type: 'multiple' | 'single';
  audioQuestion?: string;
  audioAnswer?: string;
  explanation?: {
    es: string;
    en: string;
  };
  isMarked?: boolean;
}
