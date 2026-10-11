import { WEAPONS } from '../src/content/weapons';
import { fmt } from '../src/core/format';
for (const w of WEAPONS) console.log(w.index, w.era, w.name.padEnd(24), fmt(w.cost).padStart(9), fmt(w.damage).padStart(9));
