const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

async function inspectImages() {
  const files = fs.readdirSync(publicDir);
  console.log('=== PUBLIC DIRECTORY FILES ===');
  for (const file of files) {
    const fullPath = path.join(publicDir, file);
    const stat = fs.statSync(fullPath);
    if (!stat.isDirectory() && /\.(jpeg|jpg|png|webp)$/i.test(file)) {
      try {
        const metadata = await sharp(fullPath).metadata();
        console.log(`Image: ${file} | ${metadata.width}x${metadata.height} | Format: ${metadata.format} | Size: ${(stat.size / 1024).toFixed(1)} KB`);
      } catch (err) {
        console.error(`Error reading ${file}:`, err.message);
      }
    } else if (!stat.isDirectory()) {
      console.log(`Media: ${file} | Size: ${(stat.size / (1024 * 1024)).toFixed(2)} MB`);
    }
  }

  const audioDir = path.join(publicDir, 'audio');
  if (fs.existsSync(audioDir)) {
    console.log('=== AUDIO DIRECTORY FILES ===');
    for (const file of fs.readdirSync(audioDir)) {
      const fullPath = path.join(audioDir, file);
      const stat = fs.statSync(fullPath);
      console.log(`Audio/Media: ${file} | Size: ${(stat.size / (1024 * 1024)).toFixed(2)} MB`);
    }
  }
}

inspectImages();
