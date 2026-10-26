import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svgBuffer = fs.readFileSync(path.resolve('./public/icon.svg'));

async function generate() {
  const publicDir = path.resolve('./public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 1. Standard 192x192
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'pwa-192x192.png'));

  // 2. Standard 512x512
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-512x512.png'));

  // 3. Apple touch icon 180x180
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  // 4. Maskable 512x512 with safe zone padding (central 80% circle)
  const innerSize = Math.round(512 * 0.78);
  const innerBuffer = await sharp(svgBuffer)
    .resize(innerSize, innerSize)
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 24, g: 114, b: 6, alpha: 1 } // #187206
    }
  })
    .composite([
      {
        input: innerBuffer,
        top: Math.round((512 - innerSize) / 2),
        left: Math.round((512 - innerSize) / 2),
      }
    ])
    .png()
    .toFile(path.join(publicDir, 'pwa-maskable-512x512.png'));

  // 5. Favicon 48x48 PNG
  await sharp(svgBuffer)
    .resize(48, 48)
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'));

  // 6. Mobile Screenshot (720x1280) for PWABuilder / Google Play
  const mobileSvg = `
  <svg width="720" height="1280" viewBox="0 0 720 1280" xmlns="http://www.w3.org/2000/svg">
    <rect width="720" height="1280" fill="#fbf9f4"/>
    <!-- Header -->
    <rect width="720" height="120" fill="#ffffff"/>
    <line x1="0" y1="120" x2="720" y2="120" stroke="#ebdda0" stroke-width="2"/>
    <text x="40" y="75" font-family="sans-serif" font-weight="bold" font-size="36" fill="#187206">Deenasty Quiz</text>
    <rect x="520" y="40" width="160" height="48" rx="24" fill="#ebdda0" fill-opacity="0.3" stroke="#ebdda0"/>
    <text x="560" y="72" font-family="sans-serif" font-weight="bold" font-size="22" fill="#187206">★ 150 pts</text>

    <!-- Banner -->
    <rect x="40" y="160" width="640" height="240" rx="24" fill="#187206"/>
    <text x="70" y="220" font-family="sans-serif" font-weight="bold" font-size="32" fill="#ffffff">Quiz sur l'Histoire Islamique</text>
    <text x="70" y="270" font-family="sans-serif" font-size="20" fill="#ebdda0">25 séries de quiz interactifs sur les califats</text>
    <rect x="70" y="310" width="220" height="56" rx="16" fill="#ebdda0"/>
    <text x="100" y="346" font-family="sans-serif" font-weight="bold" font-size="20" fill="#222222">Commencer</text>

    <!-- Quiz Card 1 -->
    <rect x="40" y="440" width="640" height="180" rx="20" fill="#ffffff" stroke="#ebdda0" stroke-width="2"/>
    <text x="70" y="495" font-family="sans-serif" font-weight="bold" font-size="28" fill="#222222">Les Califes Bien Guidés (Rashidun)</text>
    <text x="70" y="535" font-family="sans-serif" font-size="20" fill="#666666">Questions sur Abu Bakr, Omar, Othman et Ali</text>
    <rect x="70" y="565" width="150" height="34" rx="8" fill="#187206" fill-opacity="0.1"/>
    <text x="85" y="588" font-family="sans-serif" font-weight="bold" font-size="16" fill="#187206">10 questions</text>

    <!-- Quiz Card 2 -->
    <rect x="40" y="650" width="640" height="180" rx="20" fill="#ffffff" stroke="#ebdda0" stroke-width="2"/>
    <text x="70" y="705" font-family="sans-serif" font-weight="bold" font-size="28" fill="#222222">La Dynastie des Omeyyades</text>
    <text x="70" y="745" font-family="sans-serif" font-size="20" fill="#666666">De Damas aux confins de l'Andalousie</text>
    <rect x="70" y="775" width="150" height="34" rx="8" fill="#187206" fill-opacity="0.1"/>
    <text x="85" y="798" font-family="sans-serif" font-weight="bold" font-size="16" fill="#187206">10 questions</text>

    <!-- Quiz Card 3 -->
    <rect x="40" y="860" width="640" height="180" rx="20" fill="#ffffff" stroke="#ebdda0" stroke-width="2"/>
    <text x="70" y="915" font-family="sans-serif" font-weight="bold" font-size="28" fill="#222222">L'Âge d'Or des Abbassides</text>
    <text x="70" y="955" font-family="sans-serif" font-size="20" fill="#666666">Bagdad, la Maison de la Sagesse et les sciences</text>
    <rect x="70" y="985" width="150" height="34" rx="8" fill="#187206" fill-opacity="0.1"/>
    <text x="85" y="1008" font-family="sans-serif" font-weight="bold" font-size="16" fill="#187206">10 questions</text>
  </svg>`;

  await sharp(Buffer.from(mobileSvg))
    .png()
    .toFile(path.join(publicDir, 'screenshot-mobile.png'));

  // 7. Desktop Screenshot (1280x720) for PWABuilder
  const desktopSvg = `
  <svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
    <rect width="1280" height="720" fill="#fbf9f4"/>
    <!-- Top Header -->
    <rect width="1280" height="80" fill="#ffffff"/>
    <line x1="0" y1="80" x2="1280" y2="80" stroke="#ebdda0" stroke-width="2"/>
    <text x="60" y="52" font-family="sans-serif" font-weight="bold" font-size="28" fill="#187206">Deenasty Quiz</text>
    <rect x="1080" y="24" width="140" height="38" rx="19" fill="#ebdda0" fill-opacity="0.3" stroke="#ebdda0"/>
    <text x="1110" y="48" font-family="sans-serif" font-weight="bold" font-size="18" fill="#187206">★ 240 pts</text>

    <!-- Promo Banner -->
    <rect x="60" y="110" width="1160" height="150" rx="16" fill="#187206"/>
    <text x="100" y="165" font-family="sans-serif" font-weight="bold" font-size="26" fill="#ffffff">Quiz Interactif sur l'Histoire Islamique</text>
    <text x="100" y="200" font-family="sans-serif" font-size="16" fill="#ebdda0">Découvrez l'histoire des Rashidun, Omeyyades, Abbassides, Al-Andalus et Ottomans</text>

    <!-- Grid of 3 Cards -->
    <rect x="60" y="290" width="365" height="180" rx="16" fill="#ffffff" stroke="#ebdda0" stroke-width="2"/>
    <text x="85" y="335" font-family="sans-serif" font-weight="bold" font-size="20" fill="#222222">Les Rashidun</text>
    <text x="85" y="370" font-family="sans-serif" font-size="14" fill="#666666">Les quatre premiers califes bien guidés</text>
    <rect x="85" y="420" width="110" height="28" rx="6" fill="#187206" fill-opacity="0.1"/>
    <text x="95" y="439" font-family="sans-serif" font-weight="bold" font-size="13" fill="#187206">10 questions</text>

    <rect x="455" y="290" width="365" height="180" rx="16" fill="#ffffff" stroke="#ebdda0" stroke-width="2"/>
    <text x="480" y="335" font-family="sans-serif" font-weight="bold" font-size="20" fill="#222222">Les Omeyyades</text>
    <text x="480" y="370" font-family="sans-serif" font-size="14" fill="#666666">L'expansion et le califat de Damas</text>
    <rect x="480" y="420" width="110" height="28" rx="6" fill="#187206" fill-opacity="0.1"/>
    <text x="490" y="439" font-family="sans-serif" font-weight="bold" font-size="13" fill="#187206">10 questions</text>

    <rect x="855" y="290" width="365" height="180" rx="16" fill="#ffffff" stroke="#ebdda0" stroke-width="2"/>
    <text x="880" y="335" font-family="sans-serif" font-weight="bold" font-size="20" fill="#222222">Les Abbassides</text>
    <text x="880" y="370" font-family="sans-serif" font-size="14" fill="#666666">Le rayonnement scientifique et culturel</text>
    <rect x="855" y="420" width="110" height="28" rx="6" fill="#187206" fill-opacity="0.1"/>
    <text x="865" y="439" font-family="sans-serif" font-weight="bold" font-size="13" fill="#187206">10 questions</text>
  </svg>`;

  await sharp(Buffer.from(desktopSvg))
    .png()
    .toFile(path.join(publicDir, 'screenshot-desktop.png'));

  console.log('All icons and screenshots generated successfully!');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
