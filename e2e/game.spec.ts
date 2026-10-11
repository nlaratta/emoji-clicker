import { test, expect, type Page } from '@playwright/test';

type Freak = {
  game: { state: Record<string, any>; gpsBase: number };
  started: boolean;
  persist(): void;
  dev: Record<string, (...a: any[]) => void>;
};
declare global {
  interface Window {
    freakmoji: Freak;
  }
}

const errors: string[] = [];

async function boot(page: Page, opts: { fresh?: boolean } = {}): Promise<void> {
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (m) => {
    if (m.type() === 'error' && !/favicon|GPU stall|WebGL/i.test(m.text())) errors.push(m.text());
  });
  if (opts.fresh !== false) {
    await page.goto('./');
    await page.evaluate(() => {
      window.freakmoji?.dev.noSave();
      localStorage.clear();
      // Software WebGL in CI is slow; low quality keeps tests quick.
      localStorage.setItem('freakmoji.settings', JSON.stringify({ quality: 'low', muted: true }));
    });
  }
  await page.goto('./');
  await expect(page.locator('.title-screen')).toBeVisible();
}

async function start(page: Page): Promise<void> {
  await page.locator('.title-screen .start').click();
  await expect(page.locator('.title-screen')).toHaveCount(0);
  await page.waitForFunction(() => window.freakmoji?.started);
}

const state = (page: Page) => page.evaluate(() => window.freakmoji.game.state);

/** Click the middle of the 3D arena (where the Freakmoji is). */
async function pokeCenter(page: Page, times: number): Promise<void> {
  const box = (await page.locator('.stage').boundingBox())!;
  for (let i = 0; i < times; i++) {
    await page.mouse.click(box.x + box.width / 2 + ((i % 5) - 2) * 12, box.y + box.height * 0.45 + ((i % 3) - 1) * 10);
    await page.waitForTimeout(45);
  }
}

test.beforeEach(() => {
  errors.length = 0;
});

test.afterEach(() => {
  expect(errors, errors.join('\n')).toEqual([]);
});

test('launches with a title screen, 3D canvas and no errors', async ({ page }) => {
  await boot(page);
  await expect(page.locator('h1.logo')).toHaveText('Freakmoji');
  await expect(page.locator('canvas#scene')).toBeVisible();
  await start(page);
  await expect(page.locator('.counter-value')).toHaveText('0');
  await expect(page.getByRole('tab', { name: /Arsenal/ })).toHaveAttribute('aria-selected', 'true');
});

test('poking the Freakmoji earns gasps and builds a combo', async ({ page }) => {
  await boot(page);
  await start(page);
  await pokeCenter(page, 15);
  const s = await state(page);
  expect(s.stats.clicks).toBeGreaterThanOrEqual(12);
  expect(s.gasps).toBeGreaterThan(10);
  expect(s.stats.bestCombo).toBeGreaterThan(5);
  await expect(page.locator('.counter-value')).not.toHaveText('0');
});

test('keyboard Space pokes for accessibility', async ({ page }) => {
  await boot(page);
  await start(page);
  for (let i = 0; i < 6; i++) await page.keyboard.press('Space');
  expect((await state(page)).stats.clicks).toBe(6);
});

test('buys a weapon and a minion through the shop', async ({ page }) => {
  await boot(page);
  await start(page);
  await page.evaluate(() => window.freakmoji.dev.gasps(500));
  await page.locator('.featured').click();
  await expect.poll(async () => (await state(page)).weapon).toBe(0);
  await page.getByRole('tab', { name: /Minions/ }).click();
  await page.getByRole('button', { name: /Poke Monkey/ }).click();
  await expect.poll(async () => (await state(page)).producers.monkey).toBe(1);
  // Production starts flowing.
  const before = (await state(page)).gasps;
  await page.waitForTimeout(1200);
  expect((await state(page)).gasps).toBeGreaterThan(before);
});

test('progress persists across reloads and offline time is credited', async ({ page }) => {
  await boot(page);
  await start(page);
  await page.evaluate(() => {
    const f = window.freakmoji;
    f.dev.gasps(1000);
    f.dev.minions(5);
    f.persist();
  });
  const saved = await state(page);
  // Pretend the player left an hour ago.
  await page.evaluate(() => {
    window.freakmoji.dev.noSave();
    const raw = JSON.parse(localStorage.getItem('freakmoji.save')!);
    raw.data.lastSeen -= 3600_000;
    raw.t -= 3600_000;
    // Re-sign so the integrity check passes.
    const data = JSON.stringify(raw.data);
    let h = 0x811c9dc5;
    for (let i = 0; i < data.length; i++) {
      h ^= data.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    raw.sum = (h >>> 0).toString(36);
    localStorage.setItem('freakmoji.save', JSON.stringify(raw));
  });
  await boot(page, { fresh: false });
  await expect(page.locator('.title-screen .start')).toHaveText('Keep poking');
  await expect(page.locator('.away')).toContainText('While you were away');
  const s = await state(page);
  expect(s.producers.monkey).toBe(5);
  expect(s.gasps).toBeGreaterThan(saved.gasps);
  await start(page);
});

test('a corrupted save falls back to the backup with a warning', async ({ page }) => {
  await boot(page);
  await start(page);
  await page.evaluate(() => {
    window.freakmoji.dev.gasps(777);
    window.freakmoji.persist();
    window.freakmoji.dev.gasps(1);
    window.freakmoji.persist();
    window.freakmoji.dev.noSave();
    localStorage.setItem('freakmoji.save', '{"v":2,"data":{"gasps":');
  });
  await page.goto('./');
  await expect(page.locator('.title-screen [role="alert"]')).toContainText('backup');
  expect((await state(page)).gasps).toBeGreaterThan(700);
});

test('era gate boss can be challenged and beaten', async ({ page }) => {
  await boot(page);
  await start(page);
  await page.evaluate(() => {
    window.freakmoji.dev.gasps(20_000);
    window.freakmoji.dev.minions(40);
  });
  await expect(page.locator('.gate')).toBeVisible();
  await page.keyboard.press('b');
  await expect.poll(async () => (await state(page)).era, { timeout: 20_000 }).toBe(1);
  await expect(page.locator('.era-name')).toHaveText(/Middle Ages/);
  // Haymaker unlocks in Era II.
  await expect(page.getByRole('button', { name: /Haymaker/ })).toBeVisible();
});

test('collapsing a timeline grants Paranoia and resets the run', async ({ page }) => {
  await boot(page);
  await start(page);
  await page.evaluate(() => {
    window.freakmoji.dev.era(3);
    window.freakmoji.dev.gasps(1e12);
  });
  await page.getByRole('tab', { name: /Paranoia/ }).click();
  await page.getByRole('button', { name: 'Collapse timeline…' }).click();
  await page.getByRole('button', { name: 'Yes, collapse it' }).click();
  await expect.poll(async () => (await state(page)).timelines).toBe(1);
  const s = await state(page);
  expect(s.paranoia).toBeGreaterThan(0);
  expect(s.era).toBe(0);
  expect(s.gasps).toBe(0);
});

test('settings persist and reset requires two clicks', async ({ page }) => {
  await boot(page);
  await start(page);
  const before = await page.evaluate(() => JSON.parse(localStorage.getItem('freakmoji.settings')!).muted);
  await page.getByRole('button', { name: 'Settings' }).click();
  await page.getByRole('dialog', { name: 'Settings' }).getByRole('button', { name: /On|Off/ }).first().click();
  await page.keyboard.press('Escape');
  const muted = await page.evaluate(() => JSON.parse(localStorage.getItem('freakmoji.settings')!).muted);
  expect(muted).toBe(!before);
  await page.evaluate(() => window.freakmoji.dev.gasps(50));
  await page.getByRole('button', { name: 'Settings' }).click();
  const reset = page.getByRole('button', { name: /Reset everything/ });
  await reset.click();
  await expect(page.getByRole('button', { name: /Click again/ })).toBeVisible();
  await page.getByRole('button', { name: /Click again/ }).click();
  await expect(page.locator('.title-screen .start')).toHaveText('Start poking');
  expect((await state(page)).gasps).toBe(0);
});

test('mobile layout fits without horizontal scrolling @mobile', async ({ page }) => {
  await boot(page);
  await start(page);
  await pokeCenter(page, 5);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
  await expect(page.locator('.panel')).toBeVisible();
  await expect(page.locator('.counter-value')).toBeVisible();
  await page.screenshot({ path: 'test-results/mobile.png' });
  expect((await state(page)).stats.clicks).toBeGreaterThan(0);
});
