import { Bot, PLAYSTYLES } from '../src/sim/bot';
import { fmtTime, fmt } from '../src/core/format';
for (const key of ['casual', 'intense', 'idle']) {
  const bot = new Bot(PLAYSTYLES[key]);
  const g = bot.game;
  let readyAt = -1, attempts = 0, startHp = 0;
  const lines: string[] = [];
  for (let t = 0; t < 5 * 3600; t += 1) {
    bot.run(1);
    if (readyAt < 0 && g.gateBoss()) readyAt = bot.clock;
    const s = g.state;
    if (s.boss && startHp === 0) { attempts++; startHp = s.boss.maxHp; }
    if (!s.boss) startHp = 0;
    if (readyAt >= 0 && !g.gateBoss() && !s.boss && s.bossRetryAt <= s.time) {
      lines.push(`era→${s.era} at ${fmtTime(bot.clock)}: gate open ${fmtTime(bot.clock - readyAt)}, attempts ${attempts}, gps ${fmt(g.gpsBase)}`);
      readyAt = -1; attempts = 0;
    }
  }
  console.log(`## ${key}\n` + lines.join('\n'));
}
