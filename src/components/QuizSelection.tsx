import React from 'react';
import { Trophy, Smartphone, Sparkles } from 'lucide-react';
import { QuizMetadata } from '../types/question';
import { allQuizzes } from '../data/quizzes';
import { PWAInstallButton } from './PWAInstallButton';

interface QuizSelectionProps {
  onSelectQuiz: (quiz: QuizMetadata) => void;
  totalScore: number;
  onOpenAndroidGuide: () => void;
}

export const QuizSelection: React.FC<QuizSelectionProps> = ({
  onSelectQuiz,
  totalScore,
  onOpenAndroidGuide,
}) => {
  return (
    <>
      <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-30 border-b border-[#ebdda0]/40">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center justify-between sm:justify-start">
              <div className="flex items-center gap-3">
                <img
                  src="/icon.svg"
                  alt="Deenasty Logo"
                  className="w-10 h-10 rounded-xl shadow-sm flex-shrink-0 border border-[#ebdda0]/40"
                />
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-[#187206] leading-tight">Deenasty Quiz</h1>
                  <p className="text-xs text-gray-500 hidden sm:block">L'histoire des califats et dynasties islamiques</p>
                </div>
              </div>

              {/* Mobile Score Badge */}
              <div className="flex sm:hidden items-center gap-1.5 px-3 py-1 rounded-full bg-[#ebdda0]/30 text-[#187206] text-sm font-bold border border-[#ebdda0]">
                <Trophy className="w-4 h-4 text-[#187206]" />
                <span>{totalScore} pts</span>
              </div>
            </div>

            {/* Actions & Desktop Score */}
            <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#ebdda0]/30 text-[#187206] font-bold border border-[#ebdda0] text-sm">
                <Trophy className="w-5 h-5 text-[#187206]" />
                <span>{totalScore} points</span>
              </div>

              <div className="flex items-center gap-2">
                <PWAInstallButton onOpenAndroidGuide={onOpenAndroidGuide} />
                
                <button
                  onClick={onOpenAndroidGuide}
                  title="Exporter APK & Guide Google Play"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg border border-[#ebdda0] bg-white text-[#187206] hover:bg-[#ebdda0]/20 hover:border-[#187206] transition shadow-sm"
                >
                  <Smartphone className="w-4 h-4 text-[#187206]" />
                  <span className="hidden md:inline">APK & Google Play</span>
                  <span className="md:hidden">APK</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Android Banner Promo with Brand Emerald & Warm Gold */}
      <div className="max-w-7xl mx-auto px-4 pt-6 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0f4a04] via-[#187206] to-[#125805] rounded-2xl p-5 sm:p-6 text-white shadow-lg border border-[#ebdda0]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/15 text-xs font-semibold text-[#ebdda0] backdrop-blur-sm border border-[#ebdda0]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#ebdda0]" />
              <span>Application Android & PWA</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold">Disponible sur Android & Google Play</h2>
            <p className="text-xs sm:text-sm text-[#ebdda0]/90 max-w-xl leading-relaxed">
              Installez l'application directement sur votre smartphone Android avec support 100% hors-ligne, ou générez le package APK / Android App Bundle pour la console Google Play.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={onOpenAndroidGuide}
              className="px-5 py-2.5 bg-[#ebdda0] hover:bg-[#e4d493] text-[#222222] rounded-xl font-bold text-xs sm:text-sm shadow-md transition active:scale-95"
            >
              Générer l'APK / Play Store
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#222222]">Choisissez une série de quiz</h2>
          <span className="text-xs font-medium text-gray-500 bg-white px-2.5 py-1 rounded-full border border-gray-200">{allQuizzes.length} quiz disponibles</span>
        </div>

        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allQuizzes.map((quiz) => (
            <button
              key={quiz.id}
              onClick={() => onSelectQuiz(quiz)}
              className="group bg-white rounded-2xl shadow-sm p-5 sm:p-6 text-left hover:shadow-md hover:border-[#187206] border border-[#ebdda0]/40 transition-all active:scale-[0.99] flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-[#222222] group-hover:text-[#187206] transition-colors mb-1.5">
                  {quiz.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-4 leading-relaxed line-clamp-2">
                  {quiz.description}
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs font-semibold">
                <span className="text-[#187206] bg-[#187206]/10 px-2.5 py-1 rounded-md border border-[#187206]/20">
                  {quiz.totalQuestions} questions
                </span>
                <span className="text-[#187206] opacity-70 group-hover:opacity-100 transition-opacity">
                  Commencer →
                </span>
              </div>
            </button>
          ))}
        </div>
      </main>
    </>
  );
};