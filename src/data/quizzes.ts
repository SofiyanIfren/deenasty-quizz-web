import { Question, QuizMetadata } from '../types/question';
import { abbasidQuestions, abbasidQuizMetadata } from './abbasid/abbasid-questions';
import { abbasidQuestions2, abbasidQuizMetadata2 } from './abbasid/abbasid-questions-2';
import { abbasidQuestions3, abbasidQuizMetadata3 } from './abbasid/abbasid-questions-3';
import { abbasidQuestions4, abbasidQuizMetadata4 } from './abbasid/abbasid-questions-4';
import { abbasidQuestions5, abbasidQuizMetadata5 } from './abbasid/abbasid-questions-5';

const quizzes: Record<string, Question[]> = {
  [abbasidQuizMetadata.id]: abbasidQuestions,
  [abbasidQuizMetadata2.id]: abbasidQuestions2,
  [abbasidQuizMetadata3.id]: abbasidQuestions3,
  [abbasidQuizMetadata4.id]: abbasidQuestions4,
  [abbasidQuizMetadata5.id]: abbasidQuestions5,
};

const metadata: Record<string, QuizMetadata> = {
  [abbasidQuizMetadata.id]: abbasidQuizMetadata,
  [abbasidQuizMetadata2.id]: abbasidQuizMetadata2,
  [abbasidQuizMetadata3.id]: abbasidQuizMetadata3,
  [abbasidQuizMetadata4.id]: abbasidQuizMetadata4,
  [abbasidQuizMetadata5.id]: abbasidQuizMetadata5,
};

export const allQuizzes = Object.values(metadata);

export const getQuizQuestions = (quizId: string): Question[] => {
  return quizzes[quizId] || [];
};

export const getQuizMetadata = (quizId: string): QuizMetadata => {
  return metadata[quizId] || {
    id: '',
    title: '',
    description: '',
    totalQuestions: 0,
  };
};