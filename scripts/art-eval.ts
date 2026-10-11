/**
 * Debug helper: open the dev server, start a game in an era with minions,
 * then print the result of a JS expression evaluated in the page.
 *   pnpm exec tsx scripts/art-eval.ts <era> '<expression>'
 */
import { chromium } from '@playwright/test';

const era = Number(process.argv[2] ?? 0);
const expr = process.argv[3] ?? '1';
const URL = process.env.URL ?? 'http://localhost:5241/';
const browser = await chromium.launch({ args: ['--ignore-gpu-blocklist', '--enable-gpu', '--use-angle=metal'] });
const page = await browser.newPage({ viewport: { width: 1200, height: 800 } });
page.on('console', (m) => console.log('[console]', m.type(), m.text()));
page.on('pageerror', (e) => console.log('[pageerror]', e.message));
await page.goto(URL);
await page.evaluate(() => {
  (window as any).freakmoji?.dev.noSave();
  localStorage.clear();
  localStorage.setItem('freakmoji.settings', JSON.stringify({ quality: 'high', muted: true }));
});
await page.goto(URL);
await page.locator('.title-screen .start').click();
await page.evaluate((era) => {
  const f = (window as any).freakmoji;
  f.dev.era(era);
  f.game.state.producers.monkey = 6;
  f.game.state.producers.gorilla = 4;
  f.game.refresh();
}, era);
await page.waitForTimeout(3000);
console.log(JSON.stringify(await page.evaluate(expr), null, 1));
const shot = process.env.SHOT;
if (shot) {
  await page.waitForTimeout(Number(process.env.SHOT_WAIT ?? 400));
  await page.screenshot({ path: shot });
}
await browser.close();
