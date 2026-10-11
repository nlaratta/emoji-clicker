"""Era II: The Middle Ages of Mild Peril — a castle bailey on a crisp spring
morning: curtain wall and keep behind the star, a smithy, market and
cottages on the left, the tiltyard and practice butts on the right, and
patchwork fields with a windmill rolling away beyond the walls.

    Blender -b --factory-startup -P era1.py -- <out.glb> [preview.png]
"""
import math
import os
import random
import sys

sys.path.insert(0, os.path.dirname(__file__))
from mathutils import Vector, noise  # noqa: E402

from kit import C, argv, mix, mul, reset  # noqa: E402
from compose import LAYOUT, Composer  # noqa: E402
from flora import broadleaf, bush, fern_clump, flower_patch  # noqa: E402
from rocks import boulder, pebble_cluster  # noqa: E402
from hard import banner, barrel, block, crate, fence  # noqa: E402
from props_medieval import (  # noqa: E402
    LIME, archery_target, pavilion, paving, cottage, dais, dragon, forge, gatehouse, hay_bale, market_stall, poplar, round_tower,
    training_dummy, wall_segment, well, windmill,
)
from terrain import smoothstep  # noqa: E402

reset()
args = argv()
OUT, PREVIEW = args[0], (args[1] if len(args) > 1 else None)

GRASS = [C("#5f9a3a"), C("#7fb446"), C("#a7c25a"), C("#4a7a32")]
GRAVEL = C("#b9a888")
GRAVEL_D = C("#8f7f66")
FIELDS = [C("#c9b24e"), C("#7fa83e"), C("#a8834a"), C("#5e8f3a"), C("#d6c06a")]
WALL_R = 15.5

PAL_OAK = dict(leaf0=C("#24482c"), leaf1=C("#5f9a3a"), leaf2=C("#d4dc6c"), bark0=C("#4b3326"), bark1=C("#7b5a43"))
PAL_POP = dict(leaf0=C("#1f4430"), leaf1=C("#4f8c3c"), leaf2=C("#b9d060"))


def height(x, z):
    r = math.hypot(x, z)
    h = noise.noise(Vector((x * 0.06, z * 0.06, 1.3))) * 0.4 * smoothstep(7, 14, r)
    # Beyond the walls the land rolls up into hills.
    out = smoothstep(WALL_R + 2, WALL_R + 30, r)
    h += out * (3.5 + 5.0 * (0.5 + 0.5 * noise.noise(Vector((x * 0.02, z * 0.02, 4.0)))))
    h *= 1 - smoothstep(4, 0, -z) * 0.0
    return h - 0.03 * (1 - smoothstep(5.5, 7.5, r)) * smoothstep(2.4, 3.0, r)


def color(x, z, y, slope):
    r = math.hypot(x, z)
    k = noise.noise(Vector((x * 0.2, z * 0.2, 2.0)))
    k2 = noise.noise(Vector((x * 0.7, z * 0.7, 5.0)))
    c = mix(GRASS[0], GRASS[1], 0.5 + k * 0.8)
    c = mix(c, GRASS[2], max(0.0, k2 - 0.3) * 1.1)
    c = mix(c, GRASS[3], max(0.0, -k2 - 0.35) * 1.2)
    # The bailey courtyard: raked gravel, darker where it's trodden.
    yard = 1 - smoothstep(3.6 + k * 0.5, 4.6 + k * 0.5, r)
    c = mix(c, mix(GRAVEL_D, GRAVEL, 0.6 + k2 * 0.4), yard * 0.92)
    # Track to the gate.
    if z < 0 and abs(x) < 2.0 + 0.3 * k and r > 3:
        c = mix(c, GRAVEL_D, (1 - smoothstep(1.3, 2.0, abs(x))) * 0.85 * (1 - smoothstep(WALL_R + 6, WALL_R + 14, r)))
    # Patchwork fields beyond the walls.
    if r > WALL_R + 4:
        fx = math.floor((x + noise.noise(Vector((z * 0.05, 0, 1))) * 6) / 9)
        fz = math.floor((z + noise.noise(Vector((x * 0.05, 0, 2))) * 6) / 7)
        f = FIELDS[int(abs(fx * 7 + fz * 13)) % len(FIELDS)]
        rowline = 0.92 + 0.08 * math.sin((x * 0.7 + z * 0.4) * 3.0)
        c = mix(c, mul(f, rowline), smoothstep(WALL_R + 4, WALL_R + 9, r) * 0.9)
    for fx, fz, fr in comp.footprints:
        d = math.hypot(x - fx, z - fz)
        if d < fr * 1.2:
            c = mix(c, mul(c, 0.7), (1 - d / (fr * 1.2)) * 0.4)
    return c


def grass(x, z):
    r = math.hypot(x, z)
    if r < 3.9 or r > 28:
        return 0.0
    g = smoothstep(3.9, 5.0, r) * (1 - smoothstep(20, 28, r))
    if z < 0 and abs(x) < 2.2:
        g *= smoothstep(1.4, 2.2, abs(x))
    if abs(r - WALL_R) < 1.6:
        g *= 0.3
    for fx, fz, fr in comp.footprints:
        if math.hypot(x - fx, z - fz) < fr:
            return 0.0
    return g * (0.65 + 0.35 * noise.noise(Vector((x * 0.3, z * 0.3, 7.0))) + 0.2)


comp = Composer(height)
T = comp.tmpl
T("dais", dais())
T("paving", paving())
T("pavilion", pavilion())
T("wall", wall_segment("wall", 4.5, 3.6, 1.3, seed=1))
T("tower", round_tower("tower", 1.55, 6.6, seed=2))
T("keep", gatehouse("keep"))
T("cottage_a", cottage("cottage_a", 2.7, 2.1, 1.9, seed=3))
T("cottage_b", cottage("cottage_b", 2.2, 1.9, 2.1, roof=C("#b8452f"), seed=5))
T("stall", market_stall())
T("stall_b", market_stall("stall_b", stripe=C("#2f5fb4"), seed=4))
T("forge", forge())
T("well", well())
T("hay", hay_bale("hay", 1))
T("dummy", training_dummy())
T("target", archery_target())
T("barrel", barrel("barrel", seed=2))
T("crate", crate("crate", seed=3))
T("fence", fence("fence", 3.0, seed=4))
T("oak_a", broadleaf("oak_a", 41, 4.6, pal=PAL_OAK))
T("oak_b", broadleaf("oak_b", 17, 3.9, pal=PAL_OAK))
T("poplar", poplar("poplar", 6, 6.2, pal=PAL_POP))
T("poplar_b", poplar("poplar_b", 9, 5.0, pal=PAL_POP))
T("bush", bush("bush", 4, 0.85, flowers=[C("#ffffff"), C("#f3c64a")]))
T("ferns", fern_clump("ferns", 2, 0.7))
T("flowers", flower_patch("flowers", 3, [C("#f6e7a1"), C("#e98ab0"), C("#ffffff"), C("#8aa8f0")]))
T("rubble", boulder("rubble", 30, size=0.55, squash=0.75, moss=False, facets=12, pal=dict(rock=LIME, rock_dark=C("#8d8576"))))
T("stones", pebble_cluster("stones", 9, count=7, spread=0.6, size=0.15, pal=dict(rock=LIME, rock_dark=C("#8d8576"))))
mill, sails = windmill()
T("mill", mill)
T("sails", sails)
for key, colors in (("banner_r", [C("#c8303a"), C("#f2c24a")]), ("banner_b", [C("#2f5fb4"), C("#f2c24a")])):
    T(key, banner(key, 1.1, 2.3, colors))
comp.bake_templates(samples=64)

put = comp.put
rnd = random.Random(2)
put("dais", 0, 0, yaw=math.pi / 8, name="pedestal", foot=2.4)
put("paving", 0, 0, name="paving")

# ── The curtain wall behind the star, with the keep on axis.
for k in range(-6, 7):
    a = math.pi + k * 0.152
    if abs(k) <= 1:
        continue
    put("wall", math.sin(a) * WALL_R, math.cos(a) * WALL_R, yaw=a, foot=2.2)
put("keep", 0, -WALL_R - 0.4, yaw=0, name="keep", foot=3.0)
for k in (-6.5, -3.5, 3.5, 6.5):
    a = math.pi + k * 0.152
    put("tower", math.sin(a) * WALL_R, math.cos(a) * WALL_R, yaw=a, foot=1.7, name=f"tower_{k}")
# Banners hang from the keep's face (animated by the era script).
for i, (x, key) in enumerate(((-1.55, "banner_r"), (1.55, "banner_b"))):
    b = put(key, x, -WALL_R - 0.4 + 1.95, y=comp.height(x, -WALL_R) + 7.7, name=f"banner_{i}")
    b["role"] = "anim"

# ── Left: the village — smithy, market, cottages and the well.
put("forge", -5.0, -4.7, yaw=0.55, foot=1.0, name="forge")
put("cottage_a", -8.7, -4.3, yaw=1.2, foot=1.6)
put("cottage_b", -10.9, -7.9, yaw=0.95, foot=1.4)
put("stall", -3.4, -7.6, yaw=0.22, foot=1.1)
put("stall_b", 2.9, -8.6, yaw=-0.25, foot=1.1)
put("well", -12.4, -11.6, foot=0.8)
put("barrel", -3.4, 2.4, yaw=0.3)
put("barrel", -3.95, 2.0, yaw=1.0, scale=0.9)
put("crate", -4.3, 2.7, yaw=0.4)
put("crate", -4.1, 2.75, yaw=0.9, scale=0.75, y=comp.height(-4.1, 2.75) + 0.6)
put("barrel", -5.4, -3.6, yaw=0.2, foot=0.4)
put("crate", -7.5, -2.6, yaw=0.2, foot=0.4)

# ── Right: the tiltyard and practice butts (knights' stations stay clear).
put("rubble", 3.95, -2.75, yaw=0.3, foot=0.9, name="rock_pile")
put("stones", 4.4, -2.4, yaw=1.0)
put("rubble", 3.5, -3.2, yaw=1.8, scale=0.75)
put("rubble", 4.3, -3.25, yaw=2.6, scale=0.6, y=comp.height(4.3, -3.25) + 0.25)
put("dummy", 7.3, -4.4, yaw=-0.6, foot=0.4)
put("dummy", 8.6, -3.2, yaw=-1.0, foot=0.4)
put("target", 10.2, -7.4, yaw=-0.7, foot=0.5)
put("pavilion", 11.3, -11.0, yaw=0.9, foot=1.6)
put("target", 11.6, -5.2, yaw=-1.0, foot=0.5)
put("hay", 5.7, -6.9, yaw=0.3, foot=0.55, name="hay_a")
put("hay", 6.7, -6.5, yaw=-0.2, foot=0.55)
put("hay", 6.2, -6.75, yaw=0.1, y=comp.height(6.2, -6.75) + 0.48)
put("hay", 3.7, 2.8, yaw=0.5, foot=0.55)
put("fence", 9.3, -1.0, yaw=-1.35, foot=0.4)
put("fence", 9.0, 2.0, yaw=-1.75, foot=0.4)

# ── Trees: inside the bailey only at the edges; a line of poplars beyond the wall.
put("oak_a", -11.8, -3.6, yaw=0.4, foot=0.9)
put("oak_b", 11.6, -10.6, yaw=1.6, foot=0.8)
put("bush", -7.0, -1.2, yaw=0.3, foot=0.7)
put("bush", 8.4, -8.6, yaw=1.2, foot=0.7)
put("ferns", -6.8, -6.2, yaw=0.5)
put("flowers", -2.4, -6.6, yaw=0.2)
put("flowers", 2.6, -7.2, yaw=1.4)
put("flowers", -5.0, 0.8, yaw=0.5, scale=0.8)
for k in range(16):
    a = math.pi + (k - 7.5) * 0.13 + (rnd.random() - 0.5) * 0.04
    r = WALL_R + 4 + rnd.random() * 3
    put("poplar" if k % 3 else "poplar_b", math.sin(a) * r, math.cos(a) * r, yaw=rnd.random() * 6, scale=0.9 + rnd.random() * 0.4)
for k in range(26):
    a = rnd.random() * math.tau
    r = WALL_R + 9 + rnd.random() * 16
    x, z = math.sin(a) * r, math.cos(a) * r
    if z > 4:
        continue
    put(rnd.choice(["oak_a", "oak_b", "poplar"]), x, z, yaw=rnd.random() * 6, scale=1.0 + rnd.random() * 0.5)
put("mill", -30, -46, yaw=0.6, name="windmill")
s = put("sails", -30 + math.sin(0.6) * 1.45, -46 + math.cos(0.6) * 1.45, y=comp.height(-30, -46) + 4.4, yaw=0.6, name="mill_sails")
s["role"] = "anim"

# ── Anchors: rest spots, effects, wildlife.
comp.anchor("fx_forge", -5.0, -4.7, 0.95, kind="fire")
comp.anchor("fx_chimney_0", -8.7 + 0.5, -4.3 - 0.35, 3.5, kind="smoke")
comp.anchor("fx_chimney_1", -10.9 + 0.45, -7.9 - 0.25, 3.6, kind="smoke")
comp.anchor("rest_0", 5.7, -6.2, 0.5, kind="seat", yaw=2.9)
comp.anchor("rest_1", 6.7, -5.85, 0.5, kind="seat", yaw=3.3)
comp.anchor("rest_2", 3.7, 2.15, 0.5, kind="seat", yaw=0.4)
comp.anchor("rest_3", -3.4, -6.8, 0.0, kind="eat", yaw=0.2)
comp.anchor("rest_4", 2.9, -7.8, 0.0, kind="eat", yaw=-0.25)
comp.anchor("rest_5", -11.0, -3.0, 0.0, kind="shade", yaw=1.2)
comp.anchor("st_rockpile", 3.95, -2.75, 0.0, kind="rockpile")
comp.anchor("path_dragon_0", -60, -40, 22, kind="path")
comp.anchor("path_dragon_1", 60, -50, 26, kind="path")
comp.add_anim(dragon(), -40, -60, dy=30)

for key, pts in LAYOUT.items():
    if key.startswith("_") or key == "rockpile":
        continue
    for x, z in pts:
        if not comp.clear_of(x, z, 0.9):
            print(f"WARNING: {key} slot ({x}, {z}) is crowded")

comp.finish(OUT, color, grass, PREVIEW, sun_dir=(-0.45, 0.5, 0.75), world_rgb=(0.62, 0.72, 0.9))
