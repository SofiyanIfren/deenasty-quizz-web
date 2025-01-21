import React from 'react';
import { BookOpen, Trophy } from 'lucide-react';
import { QuizMetadata } from '../types/question';
import { allQuizzes } from '../data/quizzes';

interface QuizSelectionProps {
  onSelectQuiz: (quiz: QuizMetadata) => void;
  totalScore: number;
}

export const QuizSelection: React.FC<QuizSelectionProps> = ({
  onSelectQuiz,
  totalScore,
}) => {
  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-800">Quiz Islamique</h1>
            </div>
            <div className="flex items-center gap-2 text-blue-600">
              <Trophy className="w-6 h-6" />
              <span className="text-lg">{totalScore} points</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allQuizzes.map((quiz) => (
            <button
              key={quiz.id}
              onClick={() => onSelectQuiz(quiz)}
              className="bg-white rounded-lg shadow-md p-6 text-left hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {quiz.title}
              </h2>
              <p className="text-gray-600 mb-4">{quiz.description}</p>
              <div className="text-sm text-blue-600">
                {quiz.totalQuestions} questions
              </div>
            </button>
          ))}
        </div>
      </main>
    </>
  );
};