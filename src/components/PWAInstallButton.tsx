import React, { useState } from 'react';
import { Download, Smartphone, X, CheckCircle } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  onOpenAndroidGuide?: () => void;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ onOpenAndroidGuide }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [justInstalled, setJustInstalled] = useState(false);

  // If already installed, show small badge
  if (isInstalled || justInstalled) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ebdda0]/30 text-[#187206] text-xs font-bold border border-[#ebdda0]">
        <CheckCircle className="w-3.5 h-3.5 text-[#187206]" />
        <span>Installé</span>
      </div>
    );
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (success) {
        setJustInstalled(true);
      }
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else if (onOpenAndroidGuide) {
      onOpenAndroidGuide();
    }
  };

  return (
    <>
      <button
        onClick={handleInstallClick}
        aria-label="Installer sur Android"
        className="inline-flex items-center gap-2 rounded-lg bg-[#187206] hover:bg-[#135c05] px-3.5 py-2 text-xs sm:text-sm font-bold text-white shadow-sm active:scale-95 transition-all border border-[#187206]"
      >
        <Smartphone className="w-4 h-4 text-[#ebdda0]" />
        <span className="hidden xs:inline sm:inline">Installer l'App</span>
        <span className="xs:hidden sm:hidden">Installer</span>
      </button>

      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl relative border border-[#ebdda0]">
            <button
              onClick={() => setShowIOSGuide(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-xl bg-[#ebdda0]/30 text-[#187206] flex items-center justify-center mb-4 border border-[#ebdda0]/60">
              <Download className="w-6 h-6 text-[#187206]" />
            </div>
            <h3 className="text-lg font-bold text-[#222222]">Installer sur iPhone / iPad</h3>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              1. Appuyez sur le bouton <strong>Partager</strong> <span className="inline-block px-1.5 py-0.5 bg-gray-100 rounded text-xs">⎋</span> dans la barre Safari.<br />
              2. Faites défiler et appuyez sur <strong>Sur l'écran d'accueil</strong> <span className="inline-block px-1.5 py-0.5 bg-gray-100 rounded text-xs">➕</span>.<br />
              3. Validez en haut à droite avec <strong>Ajouter</strong>.
            </p>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="mt-5 w-full rounded-xl bg-[#187206] py-2.5 text-sm font-bold text-white hover:bg-[#135c05] transition shadow-md"
            >
              Compris
            </button>
          </div>
        </div>
      )}
    </>
  );
};
