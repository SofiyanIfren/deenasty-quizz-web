import { Question, QuizMetadata } from '../types/question';

import { rashidunQuestions1, rashidunQuizMetadata1 } from './rashidun/rashidun-questions-1';
import { rashidunQuestions2, rashidunQuizMetadata2 } from './rashidun/rashidun-questions-2';
import { rashidunQuestions3, rashidunQuizMetadata3 } from './rashidun/rashidun-questions-3';
import { rashidunQuestions4, rashidunQuizMetadata4 } from './rashidun/rashidun-questions-4';
import { rashidunQuestions5, rashidunQuizMetadata5 } from './rashidun/rashidun-questions-5';

import { omeyyadQuestions1, omeyyadQuizMetadata1 } from './omeyyad/omeyyad-questions-1';
import { omeyyadQuestions2, omeyyadQuizMetadata2 } from './omeyyad/omeyyad-questions-2';
import { omeyyadQuestions3, omeyyadQuizMetadata3 } from './omeyyad/omeyyad-questions-3';
import { omeyyadQuestions4, omeyyadQuizMetadata4 } from './omeyyad/omeyyad-questions-4';
import { omeyyadQuestions5, omeyyadQuizMetadata5 } from './omeyyad/omeyyad-questions-5';

import { abbasidQuestions1, abbasidQuizMetadata1 } from './abbasid/abbasid-questions-1';
import { abbasidQuestions2, abbasidQuizMetadata2 } from './abbasid/abbasid-questions-2';
import { abbasidQuestions3, abbasidQuizMetadata3 } from './abbasid/abbasid-questions-3';
import { abbasidQuestions4, abbasidQuizMetadata4 } from './abbasid/abbasid-questions-4';
import { abbasidQuestions5, abbasidQuizMetadata5 } from './abbasid/abbasid-questions-5';

import { andalousQuestions1, andalousQuizMetadata1 } from './andalous/andalous-questions-1';
import { andalousQuestions2, andalousQuizMetadata2 } from './andalous/andalous-questions-2';
import { andalousQuestions3, andalousQuizMetadata3 } from './andalous/andalous-questions-3';
import { andalousQuestions4, andalousQuizMetadata4 } from './andalous/andalous-questions-4';
import { andalousQuestions5, andalousQuizMetadata5 } from './andalous/andalous-questions-5';

import { ottomanQuestions1, ottomanQuizMetadata1 } from './ottoman/ottoman-questions-1';
import { ottomanQuestions2, ottomanQuizMetadata2 } from './ottoman/ottoman-questions-2';
import { ottomanQuestions3, ottomanQuizMetadata3 } from './ottoman/ottoman-questions-3';
import { ottomanQuestions4, ottomanQuizMetadata4 } from './ottoman/ottoman-questions-4';
import { ottomanQuestions5, ottomanQuizMetadata5 } from './ottoman/ottoman-questions-5';

const quizzes: Record<string, Question[]> = {

  [rashidunQuizMetadata1.id]: rashidunQuestions1,
  [rashidunQuizMetadata2.id]: rashidunQuestions2,
  [rashidunQuizMetadata3.id]: rashidunQuestions3,
  [rashidunQuizMetadata4.id]: rashidunQuestions4,
  [rashidunQuizMetadata5.id]: rashidunQuestions5,

  [omeyyadQuizMetadata1.id]: omeyyadQuestions1,
  [omeyyadQuizMetadata2.id]: omeyyadQuestions2,
  [omeyyadQuizMetadata3.id]: omeyyadQuestions3,
  [omeyyadQuizMetadata4.id]: omeyyadQuestions4,
  [omeyyadQuizMetadata5.id]: omeyyadQuestions5,

  [abbasidQuizMetadata1.id]: abbasidQuestions1,
  [abbasidQuizMetadata2.id]: abbasidQuestions2,
  [abbasidQuizMetadata3.id]: abbasidQuestions3,
  [abbasidQuizMetadata4.id]: abbasidQuestions4,
  [abbasidQuizMetadata5.id]: abbasidQuestions5,

  [andalousQuizMetadata1.id]: andalousQuestions1,
  [andalousQuizMetadata2.id]: andalousQuestions2,
  [andalousQuizMetadata3.id]: andalousQuestions3,
  [andalousQuizMetadata4.id]: andalousQuestions4,
  [andalousQuizMetadata5.id]: andalousQuestions5,

  [ottomanQuizMetadata1.id]: ottomanQuestions1,
  [ottomanQuizMetadata2.id]: ottomanQuestions2,
  [ottomanQuizMetadata3.id]: ottomanQuestions3,
  [ottomanQuizMetadata4.id]: ottomanQuestions4,
  [ottomanQuizMetadata5.id]: ottomanQuestions5,
};

const metadata: Record<string, QuizMetadata> = {
  [rashidunQuizMetadata1.id]: rashidunQuizMetadata1,
  [rashidunQuizMetadata2.id]: rashidunQuizMetadata2,
  [rashidunQuizMetadata3.id]: rashidunQuizMetadata3,
  [rashidunQuizMetadata4.id]: rashidunQuizMetadata4,
  [rashidunQuizMetadata5.id]: rashidunQuizMetadata5,  

  [omeyyadQuizMetadata1.id]: omeyyadQuizMetadata1,
  [omeyyadQuizMetadata2.id]: omeyyadQuizMetadata2,
  [omeyyadQuizMetadata3.id]: omeyyadQuizMetadata3,
  [omeyyadQuizMetadata4.id]: omeyyadQuizMetadata4,
  [omeyyadQuizMetadata5.id]: omeyyadQuizMetadata5,

  [abbasidQuizMetadata1.id]: abbasidQuizMetadata1,
  [abbasidQuizMetadata2.id]: abbasidQuizMetadata2,
  [abbasidQuizMetadata3.id]: abbasidQuizMetadata3,
  [abbasidQuizMetadata4.id]: abbasidQuizMetadata4,
  [abbasidQuizMetadata5.id]: abbasidQuizMetadata5,

  [andalousQuizMetadata1.id]: andalousQuizMetadata1,
  [andalousQuizMetadata2.id]: andalousQuizMetadata2,
  [andalousQuizMetadata3.id]: andalousQuizMetadata3,
  [andalousQuizMetadata4.id]: andalousQuizMetadata4,
  [andalousQuizMetadata5.id]: andalousQuizMetadata5,
  
  [ottomanQuizMetadata1.id]: ottomanQuizMetadata1,
  [ottomanQuizMetadata2.id]: ottomanQuizMetadata2,
  [ottomanQuizMetadata3.id]: ottomanQuizMetadata3,
  [ottomanQuizMetadata4.id]: ottomanQuizMetadata4,
  [ottomanQuizMetadata5.id]: ottomanQuizMetadata5, 
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