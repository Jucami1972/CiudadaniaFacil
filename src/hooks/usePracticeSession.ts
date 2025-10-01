// src/hooks/usePracticeSession.ts
import { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  Question,
  QuestionAnswer,
  QuestionStats,
  PracticeMode,
} from '@/types/question';
import { shuffleArray } from '@/utils/arrayUtils';

interface UsePracticeSessionProps {
  mode: PracticeMode;
  questions: Question[];
  category?: string;
  section?: string;
  questionCount?: number;
}

interface PracticeSession {
  currentMode: PracticeMode;
  questions: Question[];
  currentQuestionIndex: number;
  correctAnswers: number;
  incorrectAnswers: Set<number>;
  markedQuestions: Set<number>;
  answers: QuestionAnswer[];
  startTime: Date;
  isComplete: boolean;
}

const STORAGE_KEYS = {
  INCORRECT_QUESTIONS: '@practice:incorrect',
  MARKED_QUESTIONS: '@practice:marked',
  PRACTICE_STATS: '@practice:stats',
  LAST_SESSION: '@practice:lastSession'
} as const;

export const usePracticeSession = ({
  mode,
  questions,
  category,
  section,
  questionCount = 10
}: UsePracticeSessionProps) => {
  const [session, setSession] = useState<PracticeSession>(() => ({
    currentMode: mode,
    questions: [],
    currentQuestionIndex: 0,
    correctAnswers: 0,
    incorrectAnswers: new Set<number>(),
    markedQuestions: new Set<number>(),
    answers: [],
    startTime: new Date(),
    isComplete: false
  }));

  // Inicialización y carga de datos persistentes
  useEffect(() => {
    const initializeSession = async () => {
      try {
        await loadPersistedData();
        initializeQuestions();
      } catch (error) {
        console.error('Error initializing session:', error);
      }
    };

    initializeSession();
  }, []);

  const loadPersistedData = async () => {
    try {
      const [incorrectData, markedData] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.INCORRECT_QUESTIONS),
        AsyncStorage.getItem(STORAGE_KEYS.MARKED_QUESTIONS)
      ]);

      setSession(prev => ({
        ...prev,
        incorrectAnswers: new Set(JSON.parse(incorrectData || '[]')),
        markedQuestions: new Set(JSON.parse(markedData || '[]'))
      }));
    } catch (error) {
      console.error('Error loading persisted data:', error);
    }
  };

  const initializeQuestions = useCallback(() => {
    let filteredQuestions = [...questions];

    if (category) {
      filteredQuestions = filteredQuestions.filter(q => q.category === category);
    }
    if (section) {
      filteredQuestions = filteredQuestions.filter(q => q.section === section);
    }

    const selectedQuestions = shuffleArray(filteredQuestions)
      .slice(0, questionCount);

    setSession(prev => ({
      ...prev,
      questions: selectedQuestions
    }));
  }, [questions, category, section, questionCount]);

  // Manejadores de acciones
  const handleAnswer = useCallback(async (answer: string, isCorrect: boolean) => {
    const currentQuestion = session.questions[session.currentQuestionIndex];
    const timeSpent = new Date().getTime() - session.startTime.getTime();

    const questionAnswer: QuestionAnswer = {
      questionId: currentQuestion.id,
      answer: answer,
      isCorrect,
      timeSpent,
      timestamp: new Date(),
      mode: session.currentMode,
    };

    setSession(prev => ({
      ...prev,
      correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
      incorrectAnswers: isCorrect 
        ? prev.incorrectAnswers 
        : new Set([...prev.incorrectAnswers, currentQuestion.id]),
      answers: [...prev.answers, questionAnswer],
      currentQuestionIndex: prev.currentQuestionIndex + 1,
      isComplete: prev.currentQuestionIndex + 1 >= prev.questions.length,
      startTime: new Date() // Reset timer for next question
    }));

    try {
      if (!isCorrect) {
        await AsyncStorage.setItem(
          STORAGE_KEYS.INCORRECT_QUESTIONS,
          JSON.stringify([...session.incorrectAnswers, currentQuestion.id])
        );
      }
      await saveAnswer(questionAnswer);
    } catch (error) {
      console.error('Error saving answer:', error);
    }
  }, [session]);

  const toggleMarked = useCallback(async (questionId: number) => {
    const newMarked = new Set(session.markedQuestions);
    if (newMarked.has(questionId)) {
      newMarked.delete(questionId);
    } else {
      newMarked.add(questionId);
    }

    setSession(prev => ({
      ...prev,
      markedQuestions: newMarked
    }));

    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.MARKED_QUESTIONS,
        JSON.stringify([...newMarked])
      );
    } catch (error) {
      console.error('Error toggling marked question:', error);
    }
  }, [session.markedQuestions]);

  // Getters
  const getCurrentQuestion = useCallback((): Question | null => {
    return session.questions[session.currentQuestionIndex] || null;
  }, [session.questions, session.currentQuestionIndex]);

  const getProgress = useCallback(() => ({
    current: session.currentQuestionIndex + 1,
    total: session.questions.length,
    percentage: ((session.currentQuestionIndex + 1) / session.questions.length) * 100,
    timeElapsed: new Date().getTime() - session.startTime.getTime()
  }), [session.currentQuestionIndex, session.questions.length, session.startTime]);

  const getStats = useCallback(() => ({
    correct: session.correctAnswers,
    incorrect: session.currentQuestionIndex - session.correctAnswers,
    total: session.questions.length,
    score: session.currentQuestionIndex > 0 
      ? (session.correctAnswers / session.currentQuestionIndex) * 100 
      : 0,
    averageTime: session.answers.reduce((acc, curr) => acc + curr.timeSpent, 0) / 
      (session.answers.length || 1)
  }), [session]);

  // Utilidades
  const saveAnswer = async (answer: QuestionAnswer) => {
    try {
      const existingAnswers = await AsyncStorage.getItem(STORAGE_KEYS.PRACTICE_STATS);
      const answers = existingAnswers ? JSON.parse(existingAnswers) : [];
      answers.push(answer);
      await AsyncStorage.setItem(STORAGE_KEYS.PRACTICE_STATS, JSON.stringify(answers));
    } catch (error) {
      console.error('Error saving answer:', error);
    }
  };

  return {
    // Estado actual
    currentQuestion: getCurrentQuestion(),
    isComplete: session.isComplete,
    
    // Progreso y estadísticas
    progress: getProgress(),
    stats: getStats(),
    
    // Acciones
    handleAnswer,
    toggleMarked,
    
    // Utilidades
    isMarked: useCallback((id: number) => session.markedQuestions.has(id), [session.markedQuestions]),
    isIncorrect: useCallback((id: number) => session.incorrectAnswers.has(id), [session.incorrectAnswers])
  };
};

export default usePracticeSession;
