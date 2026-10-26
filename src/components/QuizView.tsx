import React, { useState } from 'react';
import { QuizCard } from './QuizCard';
import { QuizState } from '../types/question';
import { Award, Trophy, ArrowLeft } from 'lucide-react';
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
      <div className="min-h-screen bg-[#fbf9f4] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-md w-full text-center border border-[#ebdda0]/60 animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-[#ebdda0]/30 text-[#187206] flex items-center justify-center mx-auto mb-4 border border-[#ebdda0]">
            <Award className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-[#222222] mb-1">Quiz Terminé !</h1>
          <p className="text-sm font-medium text-[#187206] mb-6">{metadata.title}</p>
          
          <div className="bg-[#ebdda0]/20 rounded-xl p-4 space-y-3 mb-6 border border-[#ebdda0]/50">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Score de cette série :</span>
              <span className="font-bold text-[#187206] text-lg">{currentScore} / 10</span>
            </div>
            <div className="flex items-center justify-between text-sm border-t border-[#ebdda0]/40 pt-2 text-[#222222]">
              <div className="flex items-center gap-1.5 font-semibold text-[#187206]">
                <Trophy className="w-4 h-4 text-[#187206]" />
                <span>Score total cumulé :</span>
              </div>
              <span className="font-bold text-base text-[#187206]">{totalScore + currentScore} points</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleRestart}
              className="w-full bg-[#187206] text-white px-6 py-3.5 rounded-xl font-bold hover:bg-[#135c05] transition shadow-md active:scale-98"
            >
              Recommencer ce Quiz
            </button>
            <button
              onClick={() => onComplete(currentScore)}
              className="w-full bg-[#ebdda0] text-[#222222] px-6 py-3.5 rounded-xl font-bold hover:bg-[#e4d493] transition active:scale-98 shadow-sm"
            >
              Retourner aux Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  const progressPercent = ((questionCount + 1) / 10) * 100;

  return (
    <div className="min-h-screen bg-[#fbf9f4] flex flex-col">
      <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-30 border-b border-[#ebdda0]/40">
        <div className="max-w-4xl mx-auto px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={onExit}
              className="flex items-center gap-1.5 text-gray-600 hover:text-[#187206] p-1.5 rounded-lg hover:bg-[#ebdda0]/20 transition text-sm font-semibold"
              title="Retourner à la liste des quiz"
            >
              <ArrowLeft className="w-5 h-5 text-[#187206]" />
              <span className="hidden sm:inline">Quitter</span>
            </button>

            <div className="text-center flex-1 mx-2 min-w-0">
              <h1 className="text-base sm:text-lg font-bold text-[#187206] truncate">{metadata.title}</h1>
              <p className="text-xs text-gray-500 font-medium">Question {questionCount + 1} sur 10</p>
            </div>

            <div className="flex items-center gap-1.5 text-[#187206] bg-[#ebdda0]/30 px-3 py-1 rounded-full text-xs sm:text-sm font-bold border border-[#ebdda0]">
              <Trophy className="w-4 h-4 text-[#187206]" />
              <span>{totalScore + currentScore} pts</span>
            </div>
          </div>

          {/* Progress Bar with Brand Colors */}
          <div className="w-full bg-[#ebdda0]/40 h-2 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-[#187206] h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </header>

      <main className="max-w-4xl w-full mx-auto px-4 py-6 sm:px-6 flex-1 flex flex-col items-center justify-center">
        <div className="w-full flex flex-col items-center">
          <QuizCard
            question={quizState.currentQuestion}
            onAnswer={handleAnswer}
            selectedAnswer={quizState.selectedAnswer}
            showAnswer={quizState.showAnswer}
          />
          
          {quizState.showAnswer && (
            <button
              onClick={handleNext}
              className="mt-6 w-full max-w-2xl bg-[#187206] text-white px-6 py-3.5 rounded-xl font-bold hover:bg-[#135c05] shadow-lg transition active:scale-[0.99]"
            >
              {questionCount === 9 ? 'Voir les Résultats' : 'Question Suivante →'}
            </button>
          )}
        </div>
      </main>
    </div>
  );
};