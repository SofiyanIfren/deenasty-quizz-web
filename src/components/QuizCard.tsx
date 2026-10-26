import React from 'react';
import { Question } from '../types/question';
import { Book, CheckCircle2, XCircle } from 'lucide-react';

interface QuizCardProps {
  question: Question;
  onAnswer: (answer: string) => void;
  selectedAnswer: string | null;
  showAnswer: boolean;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  onAnswer,
  selectedAnswer,
  showAnswer,
}) => {
  const isMultipleChoice = question.propostion_1 !== undefined;

  const getButtonClass = (option: string) => {
    if (!showAnswer) {
      return selectedAnswer === option
        ? 'bg-[#187206] text-white border-[#187206] shadow-md'
        : 'bg-white text-[#222222] border-[#ebdda0]/70 hover:bg-[#ebdda0]/15 hover:border-[#187206] shadow-sm';
    }
    
    // Correct answer: brand primary emerald green (#187206) with gold ring (#ebdda0)
    if (option === question.response) {
      return 'bg-[#187206] text-white border-[#187206] shadow-md ring-2 ring-[#ebdda0] font-semibold';
    }
    
    // Incorrect answer selected: brand danger (#f53d3d)
    if (selectedAnswer === option && option !== question.response) {
      return 'bg-[#f53d3d] text-white border-[#f53d3d] shadow-md font-semibold';
    }
    
    return 'bg-gray-50 text-gray-400 border-gray-200 opacity-60';
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 sm:p-7 max-w-2xl w-full border border-[#ebdda0]/50 transition-all">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 bg-[#ebdda0]/30 rounded-xl text-[#187206] border border-[#ebdda0]/50">
          <Book className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-bold text-[#187206]">Question</h2>
      </div>
      
      <p className="text-base sm:text-lg text-[#222222] font-semibold mb-6 leading-relaxed">
        {question.text_question}
      </p>

      <div className="space-y-3">
        {isMultipleChoice ? (
          <>
            {[1, 2, 3, 4].map((num) => {
              const prop = `propostion_${num}` as keyof Question;
              const option = question[prop];
              if (!option) return null;

              const isCorrectOption = showAnswer && option === question.response;
              const isWrongSelected = showAnswer && selectedAnswer === option && option !== question.response;

              return (
                <button
                  key={num}
                  onClick={() => !showAnswer && onAnswer(option)}
                  disabled={showAnswer}
                  className={`w-full p-4 rounded-xl border text-left font-medium transition-all duration-200 flex items-center justify-between text-sm sm:text-base active:scale-[0.99] ${getButtonClass(
                    option
                  )}`}
                >
                  <span className="flex-1 pr-3">{option}</span>
                  {isCorrectOption && <CheckCircle2 className="w-5 h-5 text-[#ebdda0] flex-shrink-0" />}
                  {isWrongSelected && <XCircle className="w-5 h-5 text-white flex-shrink-0" />}
                </button>
              );
            })}
          </>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {['Vrai', 'Faux'].map((option) => {
              const isCorrectOption = showAnswer && option === question.response;
              const isWrongSelected = showAnswer && selectedAnswer === option && option !== question.response;

              return (
                <button
                  key={option}
                  onClick={() => !showAnswer && onAnswer(option)}
                  disabled={showAnswer}
                  className={`p-4 rounded-xl border text-center font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base active:scale-[0.99] ${getButtonClass(
                    option
                  )}`}
                >
                  <span>{option}</span>
                  {isCorrectOption && <CheckCircle2 className="w-4 h-4 text-[#ebdda0]" />}
                  {isWrongSelected && <XCircle className="w-4 h-4 text-white" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {showAnswer && (
        <div className="mt-6 p-4 sm:p-5 bg-[#ebdda0]/25 rounded-2xl border border-[#ebdda0] animate-fade-in">
          <h3 className="font-bold text-[#187206] mb-1.5 text-sm flex items-center gap-2">
            <span>Explication :</span>
          </h3>
          <p className="text-[#222222] text-xs sm:text-sm leading-relaxed">{question.responseText}</p>
        </div>
      )}
    </div>
  );
};