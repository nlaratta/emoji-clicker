/**
 * Where does a frame's time go? Boots each era with its crews at work,
 * then measures real GPU time per frame (WebGL timer queries), JS time per
 * frame, draw calls and triangles, and repeats with one subsystem switched
 * off at a time so each one's cost shows up as the difference.
 *
 *   pnpm dev   (in another terminal)
 *   pnpm perf [eras=0,3,6] [--tier=high|medium|low] [--soft] [--url=...]
 *
 * --soft renders in software (SwiftShader, like CI) and reports fps instead
 * of GPU time, which software rendering can't measure.
 */
import { chromium } from '@playwright/test';

const args = process.argv.slice(2);
const opt = (k: string, d: string): string => args.find((a) => a.startsWith(`--${k}=`))?.split('=')[1] ?? d;
const eras = (args.find((a) => !a.startsWith('--')) ?? '0,3,6').split(',').map(Number);
const tier = opt('tier', 'high');
const soft = args.includes('--soft');
const URL = opt('url', 'http://localhost:5173/');
const crews = [['monkey', 'gorilla'], ['trebuchet', 'knight'], ['steam', 'factory'], ['turret', 'jet'], ['drone', 'orbital'], ['moon', 'blackhole'], ['printer', 'paradox']];

/** Runs in the page: average GPU ms, JS ms, calls and triangles over `frames`. */
const MEASURE = (frames: number): string => `(async () => {
  const v = window.freakmoji.view; const st = v.stage; const ren = st.renderer; const gl = ren.getContext();
  const ext = gl.getExtension('EXT_disjoint_timer_query_webgl2');
  const origRender = st.render.bind(st); const origFrame = v.frame.bind(v);
  const pending = []; const gpu = []; let js = 0, jsN = 0;
  st.render = () => {
    let q = null;
    if (ext) { q = gl.createQuery(); gl.beginQuery(ext.TIME_ELAPSED_EXT, q); }
    origRender();
    if (q) { gl.endQuery(ext.TIME_ELAPSED_EXT); pending.push(q); }
  };
  v.frame = (dt, g) => { const t = performance.now(); origFrame(dt, g); js += performance.now() - t; jsN++; };
  const poll = () => {
    for (let i = pending.length - 1; i >= 0; i--) {
      const q = pending[i];
      if (gl.getQueryParameter(q, gl.QUERY_RESULT_AVAILABLE) && !gl.getParameter(ext.GPU_DISJOINT_EXT)) {
        gpu.push(gl.getQueryParameter(q, gl.QUERY_RESULT) / 1e6); gl.deleteQuery(q); pending.splice(i, 1);
      }
    }
  };
  ren.info.autoReset = false; ren.info.reset();
  const t0 = performance.now(); let n = 0;
  await new Promise((res) => { function f() { n++; if (ext) poll(); if (n < ${frames}) requestAnimationFrame(f); else res(); } requestAnimationFrame(f); });
  await new Promise((res) => setTimeout(res, 200)); if (ext) poll();
  const out = { fps: +(n / ((performance.now() - t0) / 1000)).toFixed(1), gpu: gpu.length ? +(gpu.reduce((a, b) => a + b, 0) / gpu.length).toFixed(2) : null,
    js: +(js / Math.max(1, jsN)).toFixed(2), calls: Math.round(ren.info.render.calls / n), tris: Math.round(ren.info.render.triangles / n) };
  ren.info.autoReset = true; st.render = origRender; v.frame = origFrame; return out;
})()`;

/** Each ablation switches one thing off (and the next one restores it). */
const ABLATIONS: [string, string, string][] = [
  ['shadows', `(() => { const s = window.freakmoji.view.stage; s.renderer.shadowMap.enabled = false; s.key.castShadow = false; })()`,
    `(() => { const s = window.freakmoji.view.stage; const on = s.tier !== 'low'; s.renderer.shadowMap.enabled = on; s.key.castShadow = on; })()`],
  ['post', `(() => { const s = window.freakmoji.view.stage; s.__render = s.render; s.render = () => s.renderer.render(s.scene, s.camera); })()`,
    `(() => { const s = window.freakmoji.view.stage; s.render = s.__render; })()`],
  ['grass', `(() => { const k = window.freakmoji.view.world.kit; k.__g = k.grass && k.grass.count; if (k.grass) k.grass.count = 0; })()`,
    `(() => { const k = window.freakmoji.view.world.kit; if (k.grass) k.grass.count = k.__g; })()`],
  ['kit', `window.freakmoji.view.world.kit.group.visible = false`, `window.freakmoji.view.world.kit.group.visible = true`],
  ['minions', `window.freakmoji.view.minions.group.visible = false`, `window.freakmoji.view.minions.group.visible = true`],
  ['particles', `(() => { const p = window.freakmoji.view.particles; p.glow.mesh.visible = false; p.matter.mesh.visible = false; })()`,
    `(() => { const p = window.freakmoji.view.particles; p.glow.mesh.visible = true; p.matter.mesh.visible = true; })()`],
];

const browser = await chromium.launch({ args: soft ? ['--ignore-gpu-blocklist'] : ['--ignore-gpu-blocklist', '--enable-gpu'] });
console.log(`tier=${tier} ${soft ? 'software (SwiftShader)' : 'GPU'}  ·  "off" rows show the frame with that one subsystem switched off`);
for (const era of eras) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(URL);
  await page.evaluate(`(() => { window.freakmoji?.dev.noSave(); localStorage.clear(); localStorage.setItem('freakmoji.settings', JSON.stringify({ quality: '${tier}', muted: true })); })()`);
  await page.goto(URL);
  await page.locator('.title-screen .start').click();
  await page.waitForFunction('window.freakmoji?.started');
  await page.evaluate(`(() => { const f = window.freakmoji; f.dev.noSave(); f.dev.era(${era}); for (const id of ${JSON.stringify(crews.slice(0, era + 1).flat())}) f.game.state.producers[id] = 4; f.game.refresh(); })()`);
  await page.waitForTimeout(soft ? 9000 : 6000);
  const frames = soft ? 20 : 180;
  const rows: [string, Record<string, number | null>][] = [['all on', await page.evaluate(MEASURE(frames)) as Record<string, number | null>]];
  for (const [name, off, on] of ABLATIONS) {
    await page.evaluate(off);
    await page.waitForTimeout(soft ? 1500 : 500);
    rows.push([`${name} off`, await page.evaluate(MEASURE(frames)) as Record<string, number | null>]);
    await page.evaluate(on);
    await page.waitForTimeout(soft ? 1500 : 300);
  }
  console.log(`\nera ${era}`);
  const base = rows[0][1];
  for (const [label, r] of rows) {
    const d = (k: string): string => (label === 'all on' || r[k] === null || base[k] === null ? '' : ` (${(r[k]! - base[k]!) >= 0 ? '+' : ''}${(r[k]! - base[k]!).toFixed(2)})`);
    const timing = soft ? `fps ${String(r.fps).padStart(5)}${d('fps')}` : `gpu ${String(r.gpu).padStart(5)} ms${d('gpu')}`;
    console.log(`  ${label.padEnd(14)} ${timing.padEnd(26)} js ${String(r.js).padStart(5)} ms   calls ${String(r.calls).padStart(4)}   tris ${String(r.tris).padStart(8)}`);
  }
  await page.close();
}
await browser.close();
