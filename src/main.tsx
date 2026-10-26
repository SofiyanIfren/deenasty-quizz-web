import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Mount React application immediately so UI is always visible and functional
const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

// Safely register PWA service worker without blocking UI render
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  import('virtual:pwa-register')
    .then(({ registerSW }) => {
      try {
        registerSW({ immediate: true });
      } catch (err) {
        console.warn('PWA service worker registration skipped in current environment:', err);
      }
    })
    .catch((err) => {
      console.warn('PWA module not active in dev mode:', err);
    });
}
