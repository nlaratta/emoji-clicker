"""Era III: The Freakdustrial Revolution — a smoggy amber factory yard:
brick sheds and chimneys behind, a wall of turning gears on axis with the
star, a boiler and pipework on the left, the coal heap on the right, gas
lamps, and a railway along which a little engine puffs past.

    Blender -b --factory-startup -P era2.py -- <out.glb> [preview.png]
"""
import math
import os
import random
import sys

sys.path.insert(0, os.path.dirname(__file__))
from mathutils import Vector, noise  # noqa: E402

from kit import C, argv, mix, mul, reset  # noqa: E402
from compose import LAYOUT, Composer  # noqa: E402
from flora import bush, grass_tuft  # noqa: E402
from rocks import boulder, pebble_cluster  # noqa: E402
from hard import barrel, block, crate, fence, masonry  # noqa: E402
from props_industrial import (  # noqa: E402
    BRICK, MORTAR, bench, boiler, coal_cart, jib_crane, sacks, chimney, coal_heap, dais, factory_shed, gas_lamp, gasometer, gear, locomotive,
    pipe_run, rails, water_tower,
)
from terrain import smoothstep  # noqa: E402

reset()
args = argv()
OUT, PREVIEW = args[0], (args[1] if len(args) > 1 else None)

CINDER = [C("#5e5046"), C("#4a3f38"), C("#6e5e50"), C("#3a322e")]
COBBLE = C("#7a7068")
DRYGRASS = C("#8a7a46")
RAIL_Z = -12.5


def height(x, z):
    r = math.hypot(x, z)
    h = noise.noise(Vector((x * 0.08, z * 0.08, 3.1))) * 0.25 * smoothstep(6, 14, r)
    h += smoothstep(24, 60, r) * (2.0 + 3.0 * (0.5 + 0.5 * noise.noise(Vector((x * 0.03, z * 0.03, 8.0)))))
    # Track bed: a low embankment the rails sit on.
    h += 0.12 * (1 - smoothstep(1.2, 2.2, abs(z - RAIL_Z)))
    return h


def color(x, z, y, slope):
    r = math.hypot(x, z)
    k = noise.noise(Vector((x * 0.18, z * 0.18, 2.0)))
    k2 = noise.noise(Vector((x * 0.8, z * 0.8, 5.0)))
    c = mix(CINDER[0], CINDER[1], 0.5 + k * 0.9)
    c = mix(c, CINDER[2], max(0.0, k2 - 0.25) * 1.2)
    c = mix(c, CINDER[3], max(0.0, -k2 - 0.3) * 1.3)
    # Cobbled lanes: one to the sheds, one across the front.
    lane = abs(x) if z < -2.5 else 99
    if lane < 1.6 and z > RAIL_Z:
        cob = 0.85 + 0.2 * (0.5 + 0.5 * math.sin(x * 9) * math.sin(z * 9))
        c = mix(c, mul(COBBLE, cob), (1 - smoothstep(1.1, 1.6, lane)) * 0.75)
    ring = abs(math.hypot(x, z) - 2.9)
    if ring < 0.6:
        c = mix(c, mul(COBBLE, 0.85), (1 - smoothstep(0.35, 0.6, ring)) * 0.7)
    # Ballast under the track.
    if abs(z - RAIL_Z) < 1.6:
        c = mix(c, C("#6a625a"), 0.8)
    # Scrubby dry grass far from the works.
    c = mix(c, DRYGRASS, smoothstep(14, 26, r) * 0.6 * (0.6 + 0.4 * k))
    for fx, fz, fr in comp.footprints:
        d = math.hypot(x - fx, z - fz)
        if d < fr * 1.3:
            c = mix(c, mul(c, 0.65), (1 - d / (fr * 1.3)) * 0.45)
    return c


def grass(x, z):
    r = math.hypot(x, z)
    if r < 9 or r > 30 or abs(z - RAIL_Z) < 2:
        return 0.0
    for fx, fz, fr in comp.footprints:
        if math.hypot(x - fx, z - fz) < fr:
            return 0.0
    return smoothstep(9, 14, r) * 0.35 * (0.5 + 0.5 * noise.noise(Vector((x * 0.3, z * 0.3, 1.0))))


comp = Composer(height)
T = comp.tmpl
T("dais", dais())
T("shed_a", factory_shed("shed_a", 9.0, 5.5, 4.4, teeth=3, seed=1))
T("shed_b", factory_shed("shed_b", 7.0, 5.0, 3.8, teeth=2, seed=2))
T("chimney", chimney("chimney", 16, 0.75, seed=1))
T("chimney_b", chimney("chimney_b", 12, 0.6, seed=2))
T("tower", water_tower())
T("gasometer", gasometer())
T("boiler", boiler())
T("coal", coal_heap())
T("lamp", gas_lamp())
T("rails", rails("rails", 120))
T("bench", bench())
T("crane", jib_crane())
T("sacks", sacks())
T("cart", coal_cart())
T("barrel", barrel("barrel", wood=C("#5a5048"), band=C("#2e2e34"), seed=3))
T("crate", crate("crate", wood=C("#8a6a46"), seed=4))
T("fence", fence("fence", 3.0, post=C("#3d3c42"), rail=C("#55545c"), seed=2))
T("scrub", bush("scrub", 9, 0.6, pal=dict(leaf0=C("#3a3a22"), leaf1=C("#6a6a36"), leaf2=C("#a09a5a"))))
T("rubble", pebble_cluster("rubble", 4, count=6, spread=0.6, size=0.14, pal=dict(rock=C("#7a6e66"), rock_dark=C("#3e3834"))))
T("bricks", boulder("bricks", 12, size=0.5, squash=0.6, moss=False, facets=10, pal=dict(rock=BRICK, rock_dark=C("#5a2a20"))))
# A brick wall carrying three great gears, on axis behind the star.
wall = block("gearwall", 14, 1.4, 7.0, BRICK, bevel=0.08, seed=5)
masonry(wall, BRICK, MORTAR, course=0.38, block_w=0.75, seed=5)
T("gearwall", wall)
for i, (r, teeth) in enumerate(((2.6, 16), (1.7, 11), (2.1, 13))):
    T(f"gear{i}", gear(f"gear{i}", r, teeth, 0.35))
loco = locomotive()
T("pipe_l", pipe_run("pipe_l", [(-5.2, 2.6, 0.3), (-3.6, 3.4, 0.3), (-3.6, 3.4, 1.4), (-2.0, 6.2, 1.4), (-2.0, 6.2, 0.3)], r=0.16))
T("pipe_r", pipe_run("pipe_r", [(6.0, 0.4, 0.3), (8.6, 1.2, 0.3), (8.6, 1.2, 1.6), (9.4, 5.6, 1.6), (9.4, 5.6, 0.3)], r=0.2, col=C("#8a8a94")))
comp.bake_templates(samples=64)

put = comp.put
rnd = random.Random(3)
put("dais", 0, 0, name="pedestal", foot=2.4)

# ── Backdrop: the works.
put("gearwall", 0, -18.5, foot=7.0)
for i, (x, y, z) in enumerate(((-3.6, 4.4, -17.6), (0.9, 5.4, -17.5), (4.6, 3.6, -17.6))):
    g = put(f"gear{i}", x, z, y=comp.height(x, -18.5) + y, name=f"gear_{i}")
    g["role"] = "anim"
put("shed_a", -6.8, -24.5, yaw=0.08, foot=4.0)
put("shed_b", 8.4, -25.5, yaw=-0.1, foot=3.5)
put("chimney", -10.6, -27.0, foot=1.0, name="chimney_0")
put("chimney", 3.2, -29.0, scale=1.15, foot=1.0, name="chimney_1")
put("chimney_b", 14.5, -27.0, foot=0.8, name="chimney_2")
put("chimney_b", -18.0, -22.0, scale=0.9, foot=0.8, name="chimney_3")
put("tower", -15.5, -9.5, foot=1.6)
put("gasometer", 19.0, -16.0, foot=4.6)
put("rails", 0, RAIL_Z, y=comp.height(0, RAIL_Z) + 0.02, name="rails")
comp.add_anim(loco, -30, RAIL_Z, yaw=0.0, dy=0.14)

# ── Left: the boiler house corner with pipework.
put("boiler", -6.4, -5.2, yaw=0.5, foot=1.5, name="boiler")
put("pipe_l", 0, 0, name="pipes_l")
put("pipe_r", 0, 0, name="pipes_r")
put("crate", -4.2, -7.6, yaw=0.3, foot=0.5)
put("crate", -4.9, -7.3, yaw=0.7, foot=0.5)
put("crate", -4.55, -7.5, yaw=0.5, y=comp.height(-4.55, -7.5) + 0.6)
put("barrel", -3.4, -8.4, foot=0.4)
put("barrel", -8.6, -2.0, foot=0.4)
put("bench", -8.6, -3.6, yaw=1.2, foot=0.7, name="bench_l")
put("crane", -10.6, -6.4, yaw=-0.9, foot=0.7, name="crane")
put("sacks", -5.6, -8.6, yaw=0.4, foot=0.7)
put("sacks", -9.8, -1.6, yaw=1.4, foot=0.7)
put("crate", -11.4, -3.8, yaw=0.2, foot=0.5)
put("crate", -11.2, -4.6, yaw=0.9, foot=0.5)

# ── Right: coal for the gorillas, scrap and a fence.
put("coal", 3.95, -2.75, yaw=0.4, foot=1.0, name="rock_pile")
put("rubble", 5.0, -3.6, yaw=0.5)
put("bricks", 8.6, -5.4, yaw=0.6, foot=0.5)
put("bricks", 9.3, -4.8, yaw=2.0, scale=0.7)
put("fence", 10.6, -2.4, yaw=-1.4, foot=0.4)
put("bench", 5.8, -6.8, yaw=-0.5, foot=0.7, name="bench_r")
put("cart", 5.6, -1.6, yaw=-0.9, foot=0.8, name="coal_cart")
put("sacks", 10.6, -7.6, yaw=-0.6, foot=0.7)
put("crate", 11.2, -9.6, yaw=0.3, foot=0.5)
put("crate", 10.4, -10.2, yaw=1.1, foot=0.5)
put("crate", 10.8, -9.9, yaw=0.6, y=comp.height(10.8, -9.9) + 0.6)
put("barrel", 6.9, -7.4, foot=0.4)

# ── Gas lamps around the yard and foreground clutter.
for i, (x, z) in enumerate(((-3.7, 2.4), (3.9, 2.7), (-7.2, -7.4), (6.4, -9.2), (-2.4, -10.2), (2.6, -10.6))):
    put("lamp", x, z, foot=0.3, name=f"lamp_{i}")
put("barrel", -4.3, 3.0, yaw=0.2)
put("crate", 4.5, 3.2, yaw=0.4)
for i in range(10):
    a = rnd.random() * math.tau
    d = 12 + rnd.random() * 14
    x, z = math.sin(a) * d, math.cos(a) * d
    if abs(z - RAIL_Z) < 3 or z > 6:
        continue
    put(rnd.choice(["scrub", "rubble", "bricks"]), x, z, yaw=rnd.random() * 6, scale=0.7 + rnd.random() * 0.6)

# ── Anchors.
for i, (x, z, h) in enumerate(((-10.6, -27.0, 16.8), (3.2, -29.0, 19.3), (14.5, -27.0, 12.6), (-18.0, -22.0, 11.4))):
    comp.anchor(f"fx_chimney_{i}", x, z, h, kind="smoke")
comp.anchor("fx_boiler", -6.4 - 0.55, -5.2 - 0.3, 3.3, kind="smoke")
for i, (x, z, h) in enumerate(((-3.6, -3.4, 1.6), (-2.0, -6.2, 0.5), (8.6, -1.2, 1.8), (9.4, -5.6, 0.5))):
    comp.anchor(f"fx_vent_{i}", x, z, h, kind="steam")
for i, (x, z) in enumerate(((-3.7, 2.4), (3.9, 2.7), (-7.2, -7.4), (6.4, -9.2), (-2.4, -10.2), (2.6, -10.6))):
    comp.anchor(f"fx_lamp_{i}", x, z, 2.85, kind="lamp")
comp.anchor("rest_0", -8.6, -3.6, 0.45, kind="seat", yaw=1.2 + math.pi)
comp.anchor("rest_1", 5.8, -6.8, 0.45, kind="seat", yaw=-0.5 + math.pi)
comp.anchor("rest_2", -4.55, -6.9, 0.0, kind="eat", yaw=0.3)
comp.anchor("rest_3", -8.0, -1.4, 0.0, kind="shade", yaw=1.0)
comp.anchor("st_rockpile", 3.95, -2.75, 0.0, kind="rockpile")
comp.anchor("path_train_0", -60, RAIL_Z, 0.14, kind="path")
comp.anchor("path_train_1", 60, RAIL_Z, 0.14, kind="path")

for key, pts in LAYOUT.items():
    if key.startswith("_") or key in ("rockpile",):
        continue
    if key in ("turret", "printer", "paradox"):
        continue
    for x, z in pts:
        if not comp.clear_of(x, z, 0.9):
            print(f"WARNING: {key} slot ({x}, {z}) is crowded")

comp.finish(OUT, color, grass, PREVIEW, sun_dir=(-0.5, 0.4, 0.55), world_rgb=(0.75, 0.55, 0.4))
