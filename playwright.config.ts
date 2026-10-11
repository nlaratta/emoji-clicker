import { defineConfig, devices } from '@playwright/test';

// End-to-end tests run against the production build served under the same
// subpath GitHub Pages uses, so relative asset paths are verified too.
const PORT = 4318;
const BASE = `http://localhost:${PORT}/emoji-clicker/`;
const swiftshader = process.env.CI ? ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] : ['--ignore-gpu-blocklist'];

export default defineConfig({
  testDir: 'e2e',
  timeout: 90_000,
  expect: { timeout: 20_000 },
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: BASE,
    trace: 'retain-on-failure',
    launchOptions: { args: swiftshader },
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['Pixel 7'], browserName: 'chromium' }, grep: /@mobile/ },
  ],
  webServer: {
    command: `pnpm exec vite build --base=/emoji-clicker/ --outDir dist-e2e && pnpm exec vite preview --outDir dist-e2e --base=/emoji-clicker/ --port ${PORT} --strictPort`,
    url: BASE,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
