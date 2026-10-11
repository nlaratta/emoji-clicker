import { Bot, PLAYSTYLES } from '../src/sim/bot';
import { fmt } from '../src/core/format';
import { dynamicClickMult, comboMult, clickBase } from '../src/sim/economy';
const style = PLAYSTYLES[process.argv[2] ?? 'intense'];
const bot = new Bot(style);
const step = Number(process.argv[3] ?? 10);
const total = Number(process.argv[4] ?? 180);
for (let t = step; t <= total; t += step) {
  bot.run(step);
  const g = bot.game, s = g.state;
  console.log(`${String(t).padStart(5)}s era=${s.era} gasps=${fmt(s.gasps).padStart(7)} run=${fmt(s.runGasps).padStart(7)} gps=${fmt(g.gpsBase).padStart(7)} base=${fmt(clickBase(s, g.mods, g.gpsBase)).padStart(6)} dyn=${dynamicClickMult(s, g.mods).toFixed(1)} combo=${comboMult(g.liveStreak, g.mods).toFixed(2)} w=${s.weapon} buffs=${s.buffs.map(b=>b.id).join(',')} fo=${s.time < s.freakOutEnd} gold=${s.stats.goldenCaught} ups=${Object.keys(s.upgrades).join(',')}`);
}
