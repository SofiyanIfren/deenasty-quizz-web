import React from 'react';
import { useState } from 'react';
import { QuizView } from './components/QuizView';
import { QuizSelection } from './components/QuizSelection';
import { QuizMetadata } from './types/question';

function App() {
  const [selectedQuiz, setSelectedQuiz] = useState<QuizMetadata | null>(null);
  const [totalScore, setTotalScore] = useState<number>(() => {
    const saved = localStorage.getItem('totalScore');
    return saved ? parseInt(saved, 10) : 0;
  });

  const handleQuizComplete = (score: number) => {
    setTotalScore(prev => prev + score);
    setSelectedQuiz(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {selectedQuiz ? (
        <QuizView
          quizId={selectedQuiz.id}
          onComplete={handleQuizComplete}
          onExit={() => setSelectedQuiz(null)}
          totalScore={totalScore}
        />
      ) : (
        <QuizSelection
          onSelectQuiz={setSelectedQuiz}
          totalScore={totalScore}
        />
      )}
    </div>
  );
}

export default App;