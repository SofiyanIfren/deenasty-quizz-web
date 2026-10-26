import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:right-auto z-50 flex items-center justify-center gap-2 rounded-xl bg-[#222222] px-4 py-2.5 text-xs sm:text-sm font-medium text-white shadow-xl backdrop-blur-sm border border-[#ebdda0]">
      <WifiOff className="w-4 h-4 text-[#ebdda0] animate-pulse flex-shrink-0" />
      <span>Mode Hors Ligne — L'application fonctionne à 100% avec les données en cache.</span>
    </div>
  );
};
