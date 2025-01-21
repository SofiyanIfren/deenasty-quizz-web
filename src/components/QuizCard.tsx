import React from 'react';
import { Question } from '../types/question';
import { Book } from 'lucide-react';

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
        ? 'bg-blue-600 text-white'
        : 'bg-white text-gray-800 hover:bg-blue-50';
    }
    
    if (option === question.response) {
      return 'bg-green-600 text-white';
    }
    
    if (selectedAnswer === option && option !== question.response) {
      return 'bg-red-600 text-white';
    }
    
    return 'bg-white text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
      <div className="flex items-center gap-3 mb-6">
        <Book className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">Question</h2>
      </div>
      
      <p className="text-lg text-gray-700 mb-6">{question.text_question}</p>

      <div className="space-y-3">
        {isMultipleChoice ? (
          <>
            {[1, 2, 3, 4].map((num) => {
              const prop = `propostion_${num}` as keyof Question;
              const option = question[prop];
              if (!option) return null;

              return (
                <button
                  key={num}
                  onClick={() => !showAnswer && onAnswer(option)}
                  disabled={showAnswer}
                  className={`w-full p-4 rounded-lg border transition-colors duration-200 ${getButtonClass(
                    option
                  )}`}
                >
                  {option}
                </button>
              );
            })}
          </>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {['Vrai', 'Faux'].map((option) => (
              <button
                key={option}
                onClick={() => !showAnswer && onAnswer(option)}
                disabled={showAnswer}
                className={`p-4 rounded-lg border transition-colors duration-200 ${getButtonClass(
                  option
                )}`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      {showAnswer && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Explication:</h3>
          <p className="text-blue-800">{question.responseText}</p>
        </div>
      )}
    </div>
  );
};