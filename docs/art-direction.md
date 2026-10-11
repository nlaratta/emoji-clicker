# Art direction

Freakmoji Clicker is a **toybox diorama**: a glossy, very startled emoji on a pedestal, surrounded by a
hand-built little world that is rebuilt around it, era by era. Everything should look like it was
designed, sculpted and painted for this game, not assembled from primitives.

## Pillars

1. **Chunky and soft.** Rounded, bevelled, slightly exaggerated forms with readable silhouettes at
   gameplay zoom. Big shapes first; detail only where the eye lands.
2. **Painted, not textured.** Colour lives in vertex paint: warm lit tops, cool shaded undersides,
   gentle noise so nothing is a flat fill. Ambient occlusion is baked into every asset so props sit
   in the ground instead of on it.
3. **One light story per era.** A key light with a clear colour and direction, a complementary sky
   fill, atmospheric fog that matches the horizon, and practical lights (fire, lamps, neon) only
   where something in the scene would emit them.
4. **Composed, not scattered.** Every era has a focal point (the Freakmoji), one landmark, a few
   clusters of storytelling props, and open ground for the minions to work in. The space in front
   of the pedestal stays clear.
5. **Inhabited.** Minions are little workers with jobs: they walk to stations, use tools, haul
   things, cheer and rest. Their attacks are what the player's production looks like.
6. **Restraint with effects.** Glow, particles and post-processing support the art; they never
   stand in for it.

## Shape language

| Element | Language |
|---|---|
| Foliage | Cauliflower clumps with per-puff soft normals; drooping, irregular conifer boughs |
| Rock | Faceted, chamfered planes with moss or dust painted on up-facing faces |
| Built things | Thick bevels, slightly tapered walls, oversized trim and rivets, nothing razor-thin |
| Characters | Vinyl-toy proportions: big head (~45% of height), round body, stubby limbs, glossy black eyes with a glint (the Freakmoji's eyes) |
| UI | Lacquered plum panels with cream/gold trim, chunky pressable keys, illustrated icons in medallions |

## Eras

| Era | Mood | Key light | Palette |
|---|---|---|---|
| I · Stone Age | Golden-hour meadow below sandstone mesas, a camp and a smoking volcano | Low apricot sun, violet shadows | Sage and olive greens, ochre earth, terracotta rock, teal pines |
| II · Middle Ages | Crisp spring morning in a castle bailey | High warm-white sun, blue sky fill | Cream stone, terracotta roofs, heraldic red/blue/gold, deep greens |
| III · Industrial | Smoggy amber afternoon in a factory yard | Hazy orange sun through smoke | Brick red, soot grey, brass and copper, sepia haze |
| IV · Modern | Blue-hour city plaza: a helipad, a ring road and a stepped skyline of lit windows | Cool moonlight; warm sodium pools on the paving; sweeping searchlights | Navy, slate, sodium orange, window gold |
| V · Neon Overdrive | A rain-slick arcade district: noodle stall, arcade cabinets, a maglev line, megatowers with holo billboards | Low violet key under magenta city-glow cloud; cyan and amber practicals | Wet slate, magenta, cyan, lantern orange |
| VI · Cosmic | A mining outpost on a tiny asteroid whose ground curves away to a close horizon; a ringed giant beyond | Hard white sunlight, deep violet shadow | Lavender regolith, white and gold hardware, hazard amber, violet crystal |
| VII · Reality | A pastel floating island built from fragments of every era, drifting in an iridescent void | Soft pearly key, mint rim | Mint, lilac, peach, cream, with each earlier era's palette in its fragments |

Later eras escalate in spectacle through architecture, light and atmosphere, never through more
particles or neon on generic geometry.

## Pipeline

- **3D:** procedural models in `art/blender/` (Blender 5.x, headless), exported as vertex-coloured,
  AO-baked, meshopt-compressed glTF into `src/assets/models/`. Rebuild with `art/build.sh`.
- **Icons:** illustrated with a local Krea 2 Turbo model from prompts in `art/icons/catalog.py`, keyed
  and packed into an atlas by `art/icons/pack.py`.
- **Layout:** `src/render/minions/layout.json` holds every machine minion's slot; the era scripts
  (`art/blender/eraN.py`) keep big scenery off those slots (`Composer.slot_clear`) and export named
  anchors (lamps, smoke, seats, paths) that the era scripts in `src/render/eras/` bring to life.
- **Runtime:** one shared vertex-colour material family with wind sway and the era reveal built into
  the vertex shader; static props are merged per era; repeated props and minion parts are instanced.
