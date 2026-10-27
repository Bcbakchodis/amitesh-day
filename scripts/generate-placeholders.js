// Script to create clean visual SVG placeholders for all sections
const fs = require('fs');
const path = require('path');

function createSvgPlaceholder(title, subtitle, icon, accentColor = '#3b82f6') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="50%" stop-color="#1e1b4b" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${accentColor}" />
      <stop offset="100%" stop-color="#f59e0b" />
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" stroke-width="0.5" stroke-opacity="0.3"/>
    </pattern>
  </defs>
  <rect width="800" height="600" fill="url(#bg)" />
  <rect width="800" height="600" fill="url(#grid)" />
  <circle cx="400" cy="240" r="140" fill="${accentColor}" opacity="0.12" filter="blur(40px)" />
  
  <rect x="60" y="50" width="680" height="500" rx="24" fill="#0f172a" fill-opacity="0.6" stroke="#475569" stroke-dasharray="8 8" stroke-width="2" />
  
  <!-- Icon symbol -->
  <g transform="translate(400, 210) scale(2.2)">
    <circle cx="0" cy="0" r="28" fill="#1e293b" stroke="${accentColor}" stroke-width="2" />
    <text x="0" y="10" font-family="system-ui, sans-serif" font-size="28" text-anchor="middle" fill="#f8fafc">${icon}</text>
  </g>
  
  <!-- Text -->
  <text x="400" y="340" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="28" text-anchor="middle" fill="#f8fafc" letter-spacing="1.5">
    ${title.toUpperCase()}
  </text>
  
  <rect x="220" y="365" width="360" height="2" fill="url(#accent)" />
  
  <text x="400" y="410" font-family="system-ui, -apple-system, sans-serif" font-weight="500" font-size="16" text-anchor="middle" fill="#94a3b8">
    ${subtitle}
  </text>

  <rect x="260" y="440" width="280" height="42" rx="10" fill="#1e293b" stroke="#334155" stroke-width="1" />
  <text x="400" y="466" font-family="ui-monospace, monospace" font-size="13" text-anchor="middle" fill="#38bdf8">
    Awaiting Photo Upload
  </text>
</svg>`;
}

const placeholders = [
  {
    filePath: 'public/images/welcome/mallick-welcome.svg',
    title: 'Mr. Mallick Welcome',
    subtitle: 'Upload to /public/images/welcome/cover.jpg',
    icon: '🎓',
    accent: '#eab308'
  },
  {
    filePath: 'public/images/roast/roast-1.svg',
    title: 'Mallick File #01: Innocence',
    subtitle: 'Upload to /public/images/roast/roast-1.jpg',
    icon: '🕵️',
    accent: '#ef4444'
  },
  {
    filePath: 'public/images/roast/roast-2.svg',
    title: 'Mallick File #02: The Transition',
    subtitle: 'Upload to /public/images/roast/roast-2.jpg',
    icon: '⚡',
    accent: '#f97316'
  },
  {
    filePath: 'public/images/roast/roast-3.svg',
    title: 'Mallick File #03: Downfall Confirmed',
    subtitle: 'Upload to /public/images/roast/roast-3.jpg',
    icon: '💀',
    accent: '#a855f7'
  },
  {
    filePath: 'public/images/scratch/scratch-secret.svg',
    title: 'Secret Mallick Photo',
    subtitle: 'Upload to /public/images/scratch/mystery.jpg',
    icon: '✨',
    accent: '#06b6d4'
  },
  {
    filePath: 'public/images/cake/birthday-cake.svg',
    title: 'Amitesh Birthday Cake',
    subtitle: 'Upload to /public/images/cake/cake.jpg',
    icon: '🎂',
    accent: '#ec4899'
  },
  {
    filePath: 'public/images/college/first-year/memory-1.svg',
    title: 'First Year Memories',
    subtitle: 'Upload to /public/images/college/first-year/photo-1.jpg',
    icon: '🎒',
    accent: '#10b981'
  },
  {
    filePath: 'public/images/college/second-year/memory-1.svg',
    title: 'Second Year Chaos',
    subtitle: 'Upload to /public/images/college/second-year/photo-1.jpg',
    icon: '🚀',
    accent: '#3b82f6'
  },
  {
    filePath: 'public/images/college/third-year/memory-1.svg',
    title: 'Third Year Peak Bakchodi',
    subtitle: 'Upload to /public/images/college/third-year/photo-1.jpg',
    icon: '🍻',
    accent: '#f59e0b'
  },
  {
    filePath: 'public/images/college/final-year/memory-1.svg',
    title: 'Final Year Legends',
    subtitle: 'Upload to /public/images/college/final-year/photo-1.jpg',
    icon: '👑',
    accent: '#8b5cf6'
  },
  {
    filePath: 'public/images/gift/manas-placeholder.svg',
    title: 'Manas - The Culprit',
    subtitle: 'Optional: Upload to /public/images/gift/manas.jpg',
    icon: '🤷‍♂️',
    accent: '#ef4444'
  }
];

placeholders.forEach(p => {
  const fullPath = path.join(__dirname, p.filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, createSvgPlaceholder(p.title, p.subtitle, p.icon, p.accent));
  console.log(`Generated ${p.filePath}`);
});
