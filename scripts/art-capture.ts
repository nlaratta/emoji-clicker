/**
 * Art-direction capture: renders representative eras (with minions and the
 * shop open) from a running dev server, for before/after comparisons.
 *
 *   pnpm exec vite --port 5241   (in another terminal)
 *   pnpm exec tsx scripts/art-capture.ts <outDir> [eras=0,3,6] [--mobile] [--clean]
 *
 * --clean hides the HUD and shop to judge the 3D scene on its own.
 */
import { chromium, type Page } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const args = process.argv.slice(2);
const out = args.find((a) => !a.startsWith('--') && !/^[\d,]+$/.test(a)) ?? 'test-results/art';
const eras = (args.find((a) => /^[\d,]+$/.test(a)) ?? '0,3,6').split(',').map(Number);
const mobile = args.includes('--mobile');
const clean = args.includes('--clean');
const tabs = args.includes('--tabs');
const framesArg = args.find((a) => a.startsWith('--frames='));
const frames = framesArg ? Number(framesArg.split('=')[1]) : 0;
const camArg = args.find((a) => a.startsWith('--cam='));
const cam = camArg ? camArg.split('=')[1].split(',').map(Number) : null;
const waitArg = args.find((a) => a.startsWith('--wait='));
const wait = waitArg ? Number(waitArg.split('=')[1]) : 4500;
const URL = process.env.URL ?? 'http://localhost:5241/';
mkdirSync(out, { recursive: true });

const MINIONS = ['monkey', 'gorilla', 'trebuchet', 'knight', 'steam', 'factory', 'turret', 'jet', 'drone', 'orbital', 'moon', 'blackhole', 'printer', 'paradox'];
const ERA_OF = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];

async function open(page: Page): Promise<void> {
  await page.goto(URL);
  await page.evaluate(() => {
    const w = window as any;
    w.freakmoji?.dev.noSave();
    localStorage.clear();
    localStorage.setItem('freakmoji.settings', JSON.stringify({ quality: 'high', muted: true }));
  });
  await page.goto(URL);
  await page.locator('.title-screen .start').click();
  await page.waitForTimeout(600);
}

const browser = await chromium.launch({ args: ['--ignore-gpu-blocklist', '--enable-gpu', '--use-angle=metal'] });
const page = await browser.newPage(
  mobile
    ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }
    : { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
);
page.on('pageerror', (e) => console.error('pageerror', e.message));
page.on('console', (m) => (m.type() === 'error' || m.type() === 'warning') && console.error('console', m.type(), m.text()));
await open(page);
if (clean) await page.addStyleTag({ content: '.hud, .panel, .toasts { display: none !important; } #app { grid-template-columns: 1fr !important; }' });

for (const era of eras) {
  await page.evaluate(
    ({ era, MINIONS, ERA_OF }) => {
      const f = (window as any).freakmoji;
      f.dev.era(era);
      f.dev.weapon(Math.min(39, era * 5 + 3));
      MINIONS.forEach((id: string, i: number) => (f.game.state.producers[id] = ERA_OF[i] <= era ? 6 : 0));
      f.game.refresh();
      f.dev.gasps(Math.pow(10, 3 + era * 2.3));
    },
    { era, MINIONS, ERA_OF },
  );
  if (cam) {
    await page.evaluate((cam) => {
      const rig = (window as any).freakmoji.view.rig;
      rig.baseDist = cam[0];
      rig.baseHeight = cam[1];
      if (cam.length > 2) rig.target.set(cam[2], cam[3], cam[4]);
    }, cam);
  }
  await page.waitForTimeout(wait);
  const name = `${out}/era${era}${mobile ? '-mobile' : ''}${clean ? '-clean' : ''}`;
  await page.screenshot({ path: `${name}.png` });
  for (let f = 1; f <= frames; f++) {
    await page.waitForTimeout(700);
    await page.screenshot({ path: `${name}-f${f}.png` });
  }
  if (tabs && !clean) {
    for (const tab of ['Minions', 'Upgrades']) {
      await page.getByRole('tab', { name: new RegExp(tab) }).click();
      await page.waitForTimeout(400);
      await page.screenshot({ path: `${name}-${tab.toLowerCase()}.png` });
    }
    await page.getByRole('tab', { name: /Arsenal/ }).click();
  }
  console.log('captured', name);
}
await browser.close();
