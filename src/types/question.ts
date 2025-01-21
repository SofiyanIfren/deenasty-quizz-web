export interface Question {
  id_question: string;
  text_question: string;
  propostion_1?: string;
  propostion_2?: string;
  propostion_3?: string;
  propostion_4?: string;
  response: string;
  responseText: string;
}

export interface QuizState {
  currentQuestion: Question;
  showAnswer: boolean;
  selectedAnswer: string | null;
}

export interface QuizMetadata {
  id: string;
  title: string;
  description: string;
  totalQuestions: number;
}