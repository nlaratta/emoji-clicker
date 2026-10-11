import { defineConfig } from 'vitest/config';

// Relative base so the build works at any path, including the
// GitHub Pages project subpath (https://nlaratta.github.io/emoji-clicker/).
export default defineConfig({
  base: './',
  build: {
    target: 'es2022',
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 1200,
  },
  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'node',
  },
});
