import React, { useState } from 'react';
import { QuizView } from './components/QuizView';
import { QuizSelection } from './components/QuizSelection';
import { OfflineIndicator } from './components/OfflineIndicator';
import { AndroidDeploymentModal } from './components/AndroidDeploymentModal';
import { QuizMetadata } from './types/question';

function App() {
  const [selectedQuiz, setSelectedQuiz] = useState<QuizMetadata | null>(null);
  const [isAndroidModalOpen, setIsAndroidModalOpen] = useState(false);
  const [totalScore, setTotalScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('totalScore');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const handleQuizComplete = (score: number) => {
    setTotalScore(prev => {
      const updated = prev + score;
      try {
        localStorage.setItem('totalScore', updated.toString());
      } catch (e) {
        console.error('Failed to save score', e);
      }
      return updated;
    });
    setSelectedQuiz(null);
  };

  return (
    <div className="min-h-screen bg-[#fbf9f4] text-[#222222] flex flex-col font-sans selection:bg-[#187206] selection:text-white">
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
          onOpenAndroidGuide={() => setIsAndroidModalOpen(true)}
        />
      )}

      {/* Offline Status Indicator */}
      <OfflineIndicator />

      {/* Android Deployment & APK Assistant Modal */}
      <AndroidDeploymentModal
        isOpen={isAndroidModalOpen}
        onClose={() => setIsAndroidModalOpen(false)}
      />
    </div>
  );
}

export default App;