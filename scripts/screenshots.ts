/**
 * Regenerates the README screenshots from a running dev server:
 *   pnpm dev   (in another terminal)   then   pnpm screenshots
 * Writes docs/screenshot.jpg and docs/mobile.jpg, plus per-era tiles in
 * test-results/eras/ that are stitched into docs/eras.jpg with ImageMagick
 * (if `magick` is installed).
 */
import { chromium, type Page } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const URL = process.env.URL ?? 'http://localhost:5199/';
const TILES = 'test-results/eras';
mkdirSync(TILES, { recursive: true });

async function open(page: Page): Promise<void> {
  await page.goto(URL);
  await page.evaluate(() => {
    const w = window as any;
    w.freakmoji.dev.noSave();
    localStorage.clear();
    localStorage.setItem('freakmoji.settings', JSON.stringify({ quality: 'high', muted: true }));
  });
  await page.goto(URL);
  await page.locator('.title-screen .start').click();
  await page.waitForTimeout(800);
}

const browser = await chromium.launch({ args: ['--ignore-gpu-blocklist', '--enable-gpu'] });

// Hero: mid-era action with minions, a Freak Out and a golden Freakmoji.
{
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
  await open(page);
  await page.evaluate(() => {
    const f = (window as any).freakmoji;
    f.dev.noSave();
    f.dev.era(3);
    f.dev.weapon(20);
    for (const id of ['monkey', 'gorilla', 'trebuchet', 'knight', 'steam', 'factory', 'turret', 'jet']) f.game.state.producers[id] = 6;
    f.game.refresh();
    f.dev.gasps(4.2e9);
    f.game.state.upgrades.w_anatomy = true;
    f.game.refresh();
    f.game.state.nextGoldenAt = f.game.state.time + 0.1;
    f.game.state.nextWeakSpotAt = f.game.state.time + 0.1;
  });
  await page.waitForTimeout(5000);
  const box = (await page.locator('.stage').boundingBox())!;
  for (let i = 0; i < 9; i++) {
    await page.mouse.click(box.x + box.width / 2 + (i % 3 - 1) * 40, box.y + box.height * 0.46 + (i % 2) * 30);
    await page.waitForTimeout(70);
  }
  await page.waitForTimeout(120);
  await page.screenshot({ path: 'docs/screenshot.jpg', type: 'jpeg', quality: 86 });
  await page.close();
}

// Every era, HUD hidden, for the montage.
{
  const page = await browser.newPage({ viewport: { width: 960, height: 600 } });
  await open(page);
  await page.addStyleTag({ content: '.hud, .panel, .toasts { display: none !important; } #app { grid-template-columns: 1fr !important; }' });
  // Each era with its own crew (and everything before it) at work.
  const crews = [['monkey', 'gorilla'], ['trebuchet', 'knight'], ['steam', 'factory'], ['turret', 'jet'], ['drone', 'orbital'], ['moon', 'blackhole'], ['printer', 'paradox']];
  for (let era = 0; era < 7; era++) {
    await page.evaluate(([e, ids]) => {
      const f = (window as any).freakmoji;
      f.dev.era(e);
      for (const id of ids as string[]) f.game.state.producers[id] = 4;
      f.game.refresh();
    }, [era, crews.slice(0, era + 1).flat()] as const);
    await page.waitForTimeout(4500);
    await page.screenshot({ path: `${TILES}/era-${era + 1}.png` });
  }
  await page.close();
}

// Mobile.
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  await open(page);
  await page.evaluate(() => {
    const f = (window as any).freakmoji;
    f.dev.era(4);
    f.game.state.producers.drone = 8;
    f.game.state.producers.monkey = 5;
    f.game.refresh();
    f.dev.gasps(2.5e11);
  });
  await page.waitForTimeout(5000);
  await page.screenshot({ path: 'docs/mobile.jpg', type: 'jpeg', quality: 86 });
  await page.close();
}

await browser.close();

try {
  const t = (n: number): string => `${TILES}/era-${n}.png`;
  execFileSync('magick', [t(1), t(2), t(3), t(4), '-resize', '480x300', '+append', `${TILES}/row1.png`]);
  execFileSync('magick', [t(5), t(6), t(7), '-resize', '480x300', '+append', '-background', '#1d1233', '-gravity', 'center', '-extent', '1920x300', `${TILES}/row2.png`]);
  execFileSync('magick', [`${TILES}/row1.png`, `${TILES}/row2.png`, '-append', '-quality', '82', 'docs/eras.jpg']);
} catch {
  console.warn('ImageMagick not found; era tiles left in', TILES);
}
console.log('screenshots written to docs/');
