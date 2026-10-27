const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

// Ensure destination directories exist
const dirs = [
  'public/original-uploads',
  'public/images/scratch',
  'public/images/comedy',
  'public/images/cake',
  'public/images/college/first-year',
  'public/images/college/second-year',
  'public/images/college/third-year',
  'public/images/college/final-year',
  'public/images/gift',
  'public/videos',
  'public/audio'
];

dirs.forEach(d => {
  const full = path.join(rootDir, d);
  if (!fs.existsSync(full)) {
    fs.mkdirSync(full, { recursive: true });
  }
});

// Mapping for clean organization while preserving originals
const imageAssignments = [
  // Scratch image
  { src: 'scratch.jpeg', dest: 'public/images/scratch/scratch-reveal.webp', title: 'Scratch Card Mystery' },
  { src: 'scratch.jpeg', dest: 'public/images/comedy/reveal.webp', title: 'Comedy Reveal Photo' },

  // First Year: image1.jpeg, 5.jpeg, 6.jpeg, 7.jpeg
  { src: 'image1.jpeg', dest: 'public/images/college/first-year/first-year-01.webp', title: 'First Year Memories #1' },
  { src: '5.jpeg', dest: 'public/images/college/first-year/first-year-02.webp', title: 'First Year Memories #2' },
  { src: '6.jpeg', dest: 'public/images/college/first-year/first-year-03.webp', title: 'First Year Memories #3' },
  { src: '7.jpeg', dest: 'public/images/college/first-year/first-year-04.webp', title: 'First Year Memories #4' },

  // Second Year: image2.jpeg, 8.jpeg, 9.jpeg, 10.jpeg
  { src: 'image2.jpeg', dest: 'public/images/college/second-year/second-year-01.webp', title: 'Second Year Memories #1' },
  { src: '8.jpeg', dest: 'public/images/college/second-year/second-year-02.webp', title: 'Second Year Memories #2' },
  { src: '9.jpeg', dest: 'public/images/college/second-year/second-year-03.webp', title: 'Second Year Memories #3' },
  { src: '10.jpeg', dest: 'public/images/college/second-year/second-year-04.webp', title: 'Second Year Memories #4' },

  // Third Year: image3.jpeg, 11.jpeg, 12.jpeg, 13.jpeg
  { src: 'image3.jpeg', dest: 'public/images/college/third-year/third-year-01.webp', title: 'Third Year Memories #1' },
  { src: '11.jpeg', dest: 'public/images/college/third-year/third-year-02.webp', title: 'Third Year Memories #2' },
  { src: '12.jpeg', dest: 'public/images/college/third-year/third-year-03.webp', title: 'Third Year Memories #3' },
  { src: '13.jpeg', dest: 'public/images/college/third-year/third-year-04.webp', title: 'Third Year Memories #4' },

  // Final Year: image 4.jpeg, 14.jpeg, 15.jpeg, 16.jpeg
  { src: 'image 4.jpeg', dest: 'public/images/college/final-year/final-year-01.webp', title: 'Final Year Memories #1' },
  { src: '14.jpeg', dest: 'public/images/college/final-year/final-year-02.webp', title: 'Final Year Memories #2' },
  { src: '15.jpeg', dest: 'public/images/college/final-year/final-year-03.webp', title: 'Final Year Memories #3' },
  { src: '16.jpeg', dest: 'public/images/college/final-year/final-year-04.webp', title: 'Final Year Memories #4' }
];

async function run() {
  console.log('--- Step 1: Backing up originals to public/original-uploads ---');
  const files = fs.readdirSync(publicDir);
  for (const f of files) {
    const full = path.join(publicDir, f);
    if (!fs.statSync(full).isDirectory() && !f.endsWith('.svg')) {
      const backupPath = path.join(publicDir, 'original-uploads', f);
      if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(full, backupPath);
      }
    }
  }
  console.log('Originals safely backed up.');

  console.log('--- Step 2: Organizing videos ---');
  const video1 = path.join(publicDir, 'scrachkebaad click hga ye vuideo bajega.mp4');
  const video2 = path.join(publicDir, 'vidoe2 jo bich me aega.mp4');
  const targetVideo1 = path.join(publicDir, 'videos', 'scratch-reveal-video.mp4');
  const targetVideo2 = path.join(publicDir, 'videos', 'college-middle-video.mp4');

  if (fs.existsSync(video1)) {
    fs.copyFileSync(video1, targetVideo1);
    console.log('Copied scratch-reveal-video.mp4');
  }
  if (fs.existsSync(video2)) {
    fs.copyFileSync(video2, targetVideo2);
    console.log('Copied college-middle-video.mp4');
  }

  console.log('--- Step 3: Organizing audio anthem ---');
  const audioAnthem = path.join(publicDir, 'audio', 'Khilji Gang Anthem.mp4');
  const targetSong = path.join(publicDir, 'audio', 'birthday-song.mp4');
  if (fs.existsSync(audioAnthem)) {
    fs.copyFileSync(audioAnthem, targetSong);
    console.log('Copied birthday-song.mp4');
  }

  console.log('--- Step 4: Converting photographs to WebP (quality 85) ---');
  let convertedCount = 0;
  for (const item of imageAssignments) {
    const srcPath = path.join(publicDir, item.src);
    const destPath = path.join(rootDir, item.dest);
    if (fs.existsSync(srcPath)) {
      try {
        await sharp(srcPath)
          .webp({ quality: 85 })
          .toFile(destPath);
        const meta = await sharp(destPath).metadata();
        const stat = fs.statSync(destPath);
        console.log(`✓ Converted [${item.src}] -> [${item.dest}] (${meta.width}x${meta.height}, ${(stat.size/1024).toFixed(1)} KB)`);
        convertedCount++;
      } catch (err) {
        console.error(`Failed to convert ${item.src}:`, err.message);
      }
    } else {
      console.warn(`File not found: ${srcPath}`);
    }
  }
  console.log(`Successfully converted ${convertedCount} WebP images.`);
}

run();
