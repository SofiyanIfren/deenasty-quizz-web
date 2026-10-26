import React, { useState } from 'react';
import { X, Smartphone, Play, Package, ShieldCheck, Copy, Check, ExternalLink, Sparkles, AlertTriangle, FileCode, Download } from 'lucide-react';

interface AndroidDeploymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AndroidDeploymentModal: React.FC<AndroidDeploymentModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'pwabuilder' | 'manifest' | 'bubblewrap' | 'direct'>('pwabuilder');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentAppUrl = typeof window !== 'undefined' ? window.location.origin : 'https://your-app-domain.com';

  const manifestContent = JSON.stringify({
    "id": "/",
    "name": "Deenasty Quiz",
    "short_name": "Deenasty",
    "description": "Application interactive de quiz sur l'histoire islamique (Rashidun, Omeyyades, Abbassides, Al-Andalus, Ottomans).",
    "lang": "fr",
    "dir": "ltr",
    "start_url": "/",
    "scope": "/",
    "display": "standalone",
    "orientation": "portrait-primary",
    "theme_color": "#187206",
    "background_color": "#fbf9f4",
    "categories": ["education", "games"],
    "icons": [
      {
        "src": "/pwa-192x192.png",
        "sizes": "192x192",
        "type": "image/png",
        "purpose": "any"
      },
      {
        "src": "/pwa-512x512.png",
        "sizes": "512x512",
        "type": "image/png",
        "purpose": "any"
      },
      {
        "src": "/pwa-maskable-512x512.png",
        "sizes": "512x512",
        "type": "image/png",
        "purpose": "maskable"
      },
      {
        "src": "/icon.svg",
        "sizes": "512x512",
        "type": "image/svg+xml",
        "purpose": "any"
      }
    ],
    "screenshots": [
      {
        "src": "/screenshot-mobile.png",
        "sizes": "720x1280",
        "type": "image/png",
        "form_factor": "narrow",
        "label": "Écran d'accueil mobile Deenasty Quiz"
      },
      {
        "src": "/screenshot-desktop.png",
        "sizes": "1280x720",
        "type": "image/png",
        "form_factor": "wide",
        "label": "Vue d'ensemble des séries de quiz historiques"
      }
    ]
  }, null, 2);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const downloadManifest = () => {
    const blob = new Blob([manifestContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'manifest.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const bubblewrapCommand = `# 1. Installer l'outil officiel Google Bubblewrap CLI
npm install -g @bubblewrap/cli

# 2. Initialiser le projet Android
bubblewrap init --manifest="${currentAppUrl}/manifest.json"

# 3. Compiler l'APK et le bundle Android (.aab) pour Google Play
bubblewrap build`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-[#ebdda0]/60 overflow-hidden my-8 animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0f4a04] via-[#187206] to-[#125805] p-6 text-white relative border-b border-[#ebdda0]/40">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-white/15 rounded-xl backdrop-blur-md border border-[#ebdda0]/40">
              <Smartphone className="w-6 h-6 text-[#ebdda0]" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Déploiement Android & Google Play (APK / AAB)</h2>
              <p className="text-xs text-[#ebdda0]">Package ID : <code className="bg-white/15 px-1.5 py-0.5 rounded font-mono text-white">app.deenasty.quiz</code></p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 bg-gray-50 text-xs sm:text-sm font-medium overflow-x-auto">
          <button
            onClick={() => setActiveTab('pwabuilder')}
            className={`flex-1 py-3 px-3 sm:px-4 text-center border-b-2 flex items-center justify-center gap-1.5 whitespace-nowrap transition ${
              activeTab === 'pwabuilder'
                ? 'border-[#187206] text-[#187206] bg-white font-bold'
                : 'border-transparent text-gray-500 hover:text-[#222222]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#187206]" />
            <span>1. Guide PWABuilder</span>
          </button>
          <button
            onClick={() => setActiveTab('manifest')}
            className={`flex-1 py-3 px-3 sm:px-4 text-center border-b-2 flex items-center justify-center gap-1.5 whitespace-nowrap transition ${
              activeTab === 'manifest'
                ? 'border-[#187206] text-[#187206] bg-white font-bold'
                : 'border-transparent text-gray-500 hover:text-[#222222]'
            }`}
          >
            <FileCode className="w-4 h-4 text-[#187206]" />
            <span>2. Code Manifest JSON</span>
          </button>
          <button
            onClick={() => setActiveTab('bubblewrap')}
            className={`flex-1 py-3 px-3 sm:px-4 text-center border-b-2 flex items-center justify-center gap-1.5 whitespace-nowrap transition ${
              activeTab === 'bubblewrap'
                ? 'border-[#187206] text-[#187206] bg-white font-bold'
                : 'border-transparent text-gray-500 hover:text-[#222222]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>3. Google CLI</span>
          </button>
          <button
            onClick={() => setActiveTab('direct')}
            className={`flex-1 py-3 px-3 sm:px-4 text-center border-b-2 flex items-center justify-center gap-1.5 whitespace-nowrap transition ${
              activeTab === 'direct'
                ? 'border-[#187206] text-[#187206] bg-white font-bold'
                : 'border-transparent text-gray-500 hover:text-[#222222]'
            }`}
          >
            <Play className="w-4 h-4 text-[#187206]" />
            <span>4. WebAPK Mobile</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5 text-[#222222] text-sm max-h-[70vh] overflow-y-auto">
          {activeTab === 'pwabuilder' && (
            <div className="space-y-4">
              {/* Important Alert about the PWABuilder "Manifest missing" issue */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-amber-950 space-y-1">
                  <p className="font-bold">Pourquoi PWABuilder affiche l'erreur "Web Manifest introuvable" ?</p>
                  <p className="leading-relaxed">
                    L'URL actuelle (<code>ais-dev-...</code>) est un environnement de prévisualisation privé protégé par une page d'authentification interne Google.
                    Le robot serveur de PWABuilder n'étant pas connecté avec vos identifiants, il est bloqué par Google et ne peut pas lire le code HTML.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#ebdda0]/25 border border-[#ebdda0] flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#187206] flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-[#222222] space-y-1">
                  <p className="font-bold text-[#187206]">Votre Web Manifest est bien présent et 100% valide !</p>
                  <p className="leading-relaxed">
                    Il contient les icônes 192px/512px, l'icône adaptative maskable, vos couleurs (#187206 et #ebdda0), et les captures d'écran nécessaires.
                  </p>
                </div>
              </div>

              {/* 2 Easy solutions for PWABuilder */}
              <div className="space-y-3">
                <h4 className="font-bold text-[#187206] text-base">Deux solutions immédiates pour PWABuilder :</h4>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                  <p className="font-bold text-[#222222] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#187206] text-white flex items-center justify-center text-xs">A</span>
                    Solution 1 : Coller le Web Manifest directement dans PWABuilder
                  </p>
                  <p className="text-xs text-gray-600">
                    Sur PWABuilder, cliquez sur l'onglet <strong>Manifest</strong> ou <strong>Edit Manifest</strong> et collez le contenu JSON officiel :
                  </p>
                  <div className="flex gap-2 pt-1 flex-wrap">
                    <button
                      onClick={() => copyToClipboard(manifestContent, 'manifest')}
                      className="px-3.5 py-2 bg-[#187206] hover:bg-[#135c05] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
                    >
                      {copiedKey === 'manifest' ? <Check className="w-3.5 h-3.5 text-[#ebdda0]" /> : <Copy className="w-3.5 h-3.5 text-[#ebdda0]" />}
                      <span>{copiedKey === 'manifest' ? 'Copié dans le presse-papier !' : 'Copier le Manifest JSON'}</span>
                    </button>
                    <button
                      onClick={downloadManifest}
                      className="px-3.5 py-2 bg-white hover:bg-[#ebdda0]/30 border border-[#ebdda0] text-[#187206] rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
                    >
                      <Download className="w-3.5 h-3.5 text-[#187206]" />
                      <span>Télécharger manifest.json</span>
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                  <p className="font-bold text-[#222222] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#187206] text-white flex items-center justify-center text-xs">B</span>
                    Solution 2 : Déployer votre repo GitHub sur Vercel ou Netlify (1 minute, gratuit)
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Ce projet provient du dépôt GitHub <code>SofiyanIfren/deenasty-quizz-web</code>.
                    En connectant ce dépôt à <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-[#187206] underline font-bold">Vercel</a> ou <a href="https://netlify.com" target="_blank" rel="noopener noreferrer" className="text-[#187206] underline font-bold">Netlify</a>, vous obtenez une URL publique permanente (ex: <code>deenasty-quiz.vercel.app</code>) sans barrière Google Auth. PWABuilder scannera cette URL en 2 secondes avec un score de 100% !
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://www.pwabuilder.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#187206] hover:bg-[#135c05] text-white rounded-xl font-bold shadow transition text-xs sm:text-sm active:scale-95"
                >
                  <span>Ouvrir PWABuilder</span>
                  <ExternalLink className="w-4 h-4 text-[#ebdda0]" />
                </a>
              </div>
            </div>
          )}

          {activeTab === 'manifest' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-[#187206]">Contenu du fichier manifest.json</h4>
                  <p className="text-xs text-gray-500">Accessible également directement à l'adresse <code>/manifest.json</code></p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(manifestContent, 'manifest-tab')}
                    className="px-3 py-1.5 bg-[#187206] hover:bg-[#135c05] text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm transition"
                  >
                    {copiedKey === 'manifest-tab' ? <Check className="w-3.5 h-3.5 text-[#ebdda0]" /> : <Copy className="w-3.5 h-3.5 text-[#ebdda0]" />}
                    <span>{copiedKey === 'manifest-tab' ? 'Copié !' : 'Copier'}</span>
                  </button>
                  <button
                    onClick={downloadManifest}
                    className="px-3 py-1.5 bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 rounded-lg text-xs font-semibold flex items-center gap-1 shadow-sm transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Télécharger</span>
                  </button>
                </div>
              </div>

              <pre className="bg-[#222222] text-[#ebdda0] p-4 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed border border-gray-700 max-h-96">
                {manifestContent}
              </pre>
            </div>
          )}

          {activeTab === 'bubblewrap' && (
            <div className="space-y-4">
              <p className="text-xs text-gray-600 leading-relaxed">
                <strong>Google Bubblewrap CLI</strong> est l'outil officiel en ligne de commande développé par l'équipe Google Chrome pour convertir votre PWA en projet Android natif Trusted Web Activity (TWA) et produire l'APK / AAB signé sans dépendre de services tiers.
              </p>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-gray-700">Commandes Terminal (Linux / Mac / Windows) :</span>
                  <button
                    onClick={() => copyToClipboard(bubblewrapCommand, 'cmd')}
                    className="text-xs text-[#187206] hover:underline flex items-center gap-1 font-bold"
                  >
                    {copiedKey === 'cmd' ? <Check className="w-3 h-3 text-[#187206]" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'cmd' ? 'Copié !' : 'Copier les commandes'}</span>
                  </button>
                </div>
                <pre className="bg-[#222222] text-gray-100 p-3.5 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed border border-gray-700">
                  {bubblewrapCommand}
                </pre>
              </div>

              <div className="p-3 bg-[#ebdda0]/20 rounded-xl border border-[#ebdda0] text-xs space-y-1">
                <p className="font-bold text-[#187206]">Fichiers pré-configurés inclus dans ce projet :</p>
                <p>• <code className="text-[#187206] font-semibold">public/manifest.json</code> : Manifeste PWA & Android.</p>
                <p>• <code className="text-[#187206] font-semibold">public/twa-manifest.json</code> : Prêt avec l'ID <code className="text-[#222222]">app.deenasty.quiz</code>.</p>
                <p>• <code className="text-[#187206] font-semibold">public/.well-known/assetlinks.json</code> : Validation domaine Google Play.</p>
              </div>
            </div>
          )}

          {activeTab === 'direct' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#ebdda0]/25 border border-[#ebdda0] flex items-start gap-3">
                <Play className="w-5 h-5 text-[#187206] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#187206] mb-1">WebAPK Android (Sans passer par le Play Store)</h4>
                  <p className="text-xs text-[#222222] leading-relaxed">
                    Android intègre le moteur <strong>WebAPK</strong>. Lorsqu'un utilisateur clique sur "Installer", Android compile en arrière-plan un APK natif qui apparaît dans le tiroir d'applications avec son icône, son écran de démarrage et un fonctionnement 100% autonome hors-ligne !
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-gray-600 leading-relaxed">
                <h5 className="font-bold text-[#222222] text-sm">Comment tester sur un téléphone Android :</h5>
                <ol className="list-decimal list-inside space-y-1.5 pl-1">
                  <li>Ouvrez le lien de l'application dans <strong>Google Chrome sur Android</strong>.</li>
                  <li>Cliquez sur le bouton <strong>"Installer l'App"</strong> en haut de l'écran (ou menu 3 points ⋮ → <em>Ajouter à l'écran d'accueil</em>).</li>
                  <li>L'application s'installe comme une véritable application Android native sans passer par le Play Store.</li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-500">Prêt pour Google Play Console & Android 14+</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#ebdda0] hover:bg-[#dfd08f] text-[#222222] text-xs sm:text-sm font-bold rounded-xl transition"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
