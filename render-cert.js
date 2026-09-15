import puppeteer from 'puppeteer-core';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function render() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: 800,
    height: 1080,
    deviceScaleFactor: 2
  });

  const filePath = path.join(__dirname, 'temp-certificate.html');
  await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0' });

  // Wait for fonts to load
  await page.evaluateHandle('document.fonts.ready');

  const cardElement = await page.$('.cert-card');
  const outputPath = path.join(__dirname, 'public', 'official-member-quotation-certificate.png');
  const rootOutputPath = path.join(__dirname, 'official-member-quotation-certificate.png');

  await cardElement.screenshot({
    path: outputPath,
    omitBackground: true
  });

  await cardElement.screenshot({
    path: rootOutputPath,
    omitBackground: true
  });

  console.log('Certificate screenshot rendered successfully to:', outputPath);
  await browser.close();
}

render().catch(console.error);
