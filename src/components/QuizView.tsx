import React, { useState } from 'react';
import { QuizCard } from './QuizCard';
import { QuizState } from '../types/question';
import { BookOpen, Award, Trophy } from 'lucide-react';
import { getQuizQuestions, getQuizMetadata } from '../data/quizzes';

interface QuizViewProps {
  quizId: string;
  onComplete: (score: number) => void;
  onExit: () => void;
  totalScore: number;
}

export const QuizView: React.FC<QuizViewProps> = ({
  quizId,
  onComplete,
  onExit,
  totalScore,
}) => {
  const [questionCount, setQuestionCount] = useState<number>(0);
  const [currentScore, setCurrentScore] = useState<number>(0);
  const questions = getQuizQuestions(quizId);
  const metadata = getQuizMetadata(quizId);
  
  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  };

  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: getRandomQuestion(),
    showAnswer: false,
    selectedAnswer: null,
  });

  const handleAnswer = (answer: string) => {
    const isCorrect = answer === quizState.currentQuestion.response;
    if (isCorrect) {
      setCurrentScore(prev => prev + 1);
    }
    
    setQuizState(prev => ({
      ...prev,
      selectedAnswer: answer,
      showAnswer: true,
    }));
  };

  const handleNext = () => {
    setQuestionCount(prev => prev + 1);
    setQuizState({
      currentQuestion: getRandomQuestion(),
      showAnswer: false,
      selectedAnswer: null,
    });
  };

  const handleRestart = () => {
    setQuestionCount(0);
    setCurrentScore(0);
    setQuizState({
      currentQuestion: getRandomQuestion(),
      showAnswer: false,
      selectedAnswer: null,
    });
  };

  const isQuizComplete = questionCount >= 10;

  if (isQuizComplete) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <Award className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Quiz Terminé!</h1>
          <div className="space-y-4 mb-6">
            <p className="text-lg text-gray-600">
              Score de ce quiz: {currentScore} / 10
            </p>
            <div className="flex items-center justify-center gap-2 text-lg text-blue-600">
              <Trophy className="w-6 h-6" />
              <p>Score total: {totalScore} points</p>
            </div>
          </div>
          <div className="space-y-3">
            <button
              onClick={handleRestart}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Recommencer ce Quiz
            </button>
            <button
              onClick={() => onComplete(currentScore)}
              className="w-full bg-gray-100 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Retour aux Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Quiz Islamique</h1>
                <p className="text-sm text-gray-600">{metadata.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-blue-600">
                <Trophy className="w-5 h-5" />
                <span>{totalScore} points</span>
              </div>
              <div className="text-gray-600">
                Question {questionCount + 1} / 10
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <QuizCard
            question={quizState.currentQuestion}
            onAnswer={handleAnswer}
            selectedAnswer={quizState.selectedAnswer}
            showAnswer={quizState.showAnswer}
          />
          
          {quizState.showAnswer && (
            <button
              onClick={handleNext}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {questionCount === 9 ? 'Voir les Résultats' : 'Question Suivante'}
            </button>
          )}
        </div>
      </main>
    </div>
  );
};