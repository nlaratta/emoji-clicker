import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

/** The simulation must stay independent of rendering, audio and the DOM. */
const PURE_DIRS = ['src/core', 'src/content', 'src/sim'];
const FORBIDDEN = [/from ['"]three/, /\bdocument\.[a-z]/, /\bwindow\.[a-z]/, /localStorage/, /from ['"]\.\.\/(render|audio|ui|app)\//];

describe('architecture', () => {
  for (const dir of PURE_DIRS) {
    for (const file of readdirSync(dir).filter((f) => f.endsWith('.ts'))) {
      it(`${dir}/${file} has no DOM, three.js or presentation imports`, () => {
        const src = readFileSync(join(dir, file), 'utf8');
        for (const re of FORBIDDEN) expect(src, `${file} matches ${re}`).not.toMatch(re);
      });
    }
  }
});
