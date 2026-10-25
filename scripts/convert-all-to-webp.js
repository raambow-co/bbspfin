import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT_DIR = process.cwd();

// Find all image files
function findImages(dir, fileList = []) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (!['node_modules', '.git', 'dist', '.firebase'].includes(item.name)) {
        findImages(fullPath, fileList);
      }
    } else if (/\.(png|jpg|jpeg)$/i.test(item.name)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

async function convertImages() {
  console.log('--- Step 1: Converting all images to WebP ---');
  const images = findImages(ROOT_DIR);
  console.log(`Found ${images.length} images to convert.`);

  let totalOriginalSize = 0;
  let totalWebpSize = 0;
  const convertedMap = new Map();

  for (const imgPath of images) {
    const ext = path.extname(imgPath);
    const webpPath = imgPath.slice(0, -ext.length) + '.webp';
    const originalSize = fs.statSync(imgPath).size;
    totalOriginalSize += originalSize;

    const basename = path.basename(imgPath).toLowerCase();
    const isIconOrLogo = basename.includes('logo') || basename.includes('icon') || basename.includes('favicon') || basename.includes('qr') || basename.includes('map');

    try {
      if (isIconOrLogo) {
        // High fidelity / near-lossless for logos, maps, QR and icons
        await sharp(imgPath)
          .webp({ quality: 92, nearLossless: true, effort: 6 })
          .toFile(webpPath);
      } else {
        // High quality webp for hero images, photos
        await sharp(imgPath)
          .webp({ quality: 85, effort: 6 })
          .toFile(webpPath);
      }

      const webpSize = fs.statSync(webpPath).size;
      totalWebpSize += webpSize;
      const savingsPct = Math.round((1 - webpSize / originalSize) * 100);

      const relOld = path.relative(ROOT_DIR, imgPath);
      const relNew = path.relative(ROOT_DIR, webpPath);
      convertedMap.set(relOld, relNew);

      console.log(`✓ [${savingsPct}% saved] ${relOld} (${(originalSize / 1024).toFixed(1)} KB) -> ${relNew} (${(webpSize / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`Failed to convert ${imgPath}:`, err.message);
    }
  }

  const totalSavedMb = ((totalOriginalSize - totalWebpSize) / 1024 / 1024).toFixed(2);
  const totalSavingsPct = Math.round((1 - totalWebpSize / totalOriginalSize) * 100);
  console.log(`\n🎉 Conversion complete! Saved ${totalSavedMb} MB (${totalSavingsPct}% reduction overall)`);

  // Step 2: Replace references across codebase
  console.log('\n--- Step 2: Updating all source references to .webp ---');

  // File types to update
  function findSourceFiles(dir, fileList = []) {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        if (!['node_modules', '.git', 'dist', '.firebase'].includes(item.name)) {
          findSourceFiles(fullPath, fileList);
        }
      } else if (/\.(html|tsx|ts|js|jsx|css|json|xml|md)$/i.test(item.name)) {
        // Avoid modifying the converter script itself
        if (!fullPath.includes('convert-all-to-webp.js')) {
          fileList.push(fullPath);
        }
      }
    }
    return fileList;
  }

  const sourceFiles = findSourceFiles(ROOT_DIR);
  let filesModified = 0;
  let totalReplacements = 0;

  // Patterns to replace: all image filenames mapped from .png/.jpg/.jpeg to .webp
  // Build filename substitution pairs
  const filenamePairs = [];
  for (const [oldRel, newRel] of convertedMap.entries()) {
    const oldBase = path.basename(oldRel);
    const newBase = path.basename(newRel);
    filenamePairs.push({ oldBase, newBase });
  }

  // Sort by length descending to prevent partial match overwrites
  filenamePairs.sort((a, b) => b.oldBase.length - a.oldBase.length);

  for (const filePath of sourceFiles) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    for (const { oldBase, newBase } of filenamePairs) {
      if (content.includes(oldBase)) {
        // Replace all exact instances
        const regex = new RegExp(oldBase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        const count = (content.match(regex) || []).length;
        if (count > 0) {
          content = content.replace(regex, newBase);
          modified = true;
          totalReplacements += count;
          console.log(`  Replaced ${count}x "${oldBase}" -> "${newBase}" in ${path.relative(ROOT_DIR, filePath)}`);
        }
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      filesModified++;
    }
  }

  console.log(`\nUpdated ${totalReplacements} references across ${filesModified} files.`);
}

convertImages().catch(err => {
  console.error('Error during conversion process:', err);
  process.exit(1);
});
