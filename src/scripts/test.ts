import { chromium } from 'playwright';

async function takeScreenshot() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.google.com');
  await page.screenshot({ path: 'tmp/google_screenshot.png' });
  await browser.close();
}

takeScreenshot();