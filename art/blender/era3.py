"""Era IV: Shock & Awe — a city plaza at blue hour: a helipad dais, a ring
road, sodium lamps and planters, a news van and a hot-dog cart, a
construction corner, and skyscrapers full of lit windows behind.

    Blender -b --factory-startup -P era3.py -- <out.glb> [preview.png]
"""
import math
import os
import random
import sys

sys.path.insert(0, os.path.dirname(__file__))
from mathutils import Vector, noise  # noqa: E402

from kit import C, argv, mix, mul, reset  # noqa: E402
from compose import LAYOUT, Composer  # noqa: E402
from rocks import boulder, pebble_cluster  # noqa: E402
from hard import block, crate, glow_mat  # noqa: E402
from props_modern import (  # noqa: E402
    ASPHALT, CONCRETE, barrier, plaza_tiles, road_markings, bus_stop, car, cone, dais, helicopter, hotdog_cart, news_van, planter_tree, street_lamp,
    tower, tower_crane, vending,
)
from terrain import smoothstep  # noqa: E402

reset()
args = argv()
OUT, PREVIEW = args[0], (args[1] if len(args) > 1 else None)

PLAZA = C("#4a4c54")
PLAZA_L = C("#9a9ca4")
GROUT = C("#4e5058")
SIDEWALK = C("#54565e")
ROAD_IN, ROAD_OUT = 7.6, 10.6


def height(x, z):
    r = math.hypot(x, z)
    return smoothstep(30, 70, r) * 2.0 * (0.5 + 0.5 * noise.noise(Vector((x * 0.02, z * 0.02, 3.0))))


def color(x, z, y, slope):
    r = math.hypot(x, z)
    k = noise.noise(Vector((x * 0.3, z * 0.3, 1.0)))
    if r < ROAD_IN - 0.5:
        return mul(mix(GROUT, PLAZA, 0.7), 0.95 + k * 0.05)
    if r < ROAD_IN:
        return SIDEWALK
    if r < ROAD_OUT:
        return mul(ASPHALT, 0.95 + k * 0.08)
    if r < ROAD_OUT + 1.4:
        return mul(SIDEWALK, 0.95 + k * 0.05)
    # City blocks beyond: paving slabs, with the back avenue left as asphalt.
    if z < -ROAD_OUT and abs(x) < 3.2:
        return mul(ASPHALT, 0.95 + k * 0.08)
    joint = (abs(math.sin(x * 1.4)) < 0.06) or (abs(math.sin(z * 1.4)) < 0.06)
    return mul(C("#5a5c64"), (0.82 if joint else 0.97) + k * 0.05)


def grass(x, z):
    return 0.0


comp = Composer(height)
T = comp.tmpl
T("dais", dais())
T("markings", road_markings())
T("plaza", plaza_tiles())
# Three tiers so the skyline steps up: brick low-rise in front, mid-rise
# offices behind, glass towers at the back.
TIERS = {
    "low": [(7, 5, 4, C("#7a4434"), "tank", 0.5), (6, 5, 3, C("#8a7a66"), "flat", 0.55), (8, 6, 5, C("#5a3a32"), "flat", 0.45)],
    "mid": [(7, 6, 9, C("#4c5664"), "tank", 0.42), (6, 6, 11, C("#6a6458"), "flat", 0.5)],
    "tall": [(6, 6, 16, C("#2c3a52"), "spire", 0.55), (7, 6, 20, C("#283246"), "spire", 0.6), (6, 7, 14, C("#2c4a5a"), "flat", 0.5)],
}
for tier, specs in TIERS.items():
    for i, (w, d, f, body, crown, lit) in enumerate(specs):
        T(f"tower_{tier}{i}", tower(f"tower_{tier}{i}", w, d, f, body=body, crown=crown, lit=lit, seed=hash((tier, i)) % 997))
T("lamp", street_lamp())
T("car_r", car("car_r", C("#d23a3a"), 1))
T("car_b", car("car_b", C("#2f6fd0"), 2))
T("car_y", car("car_y", C("#f2c230"), 3))
T("van", news_van())
T("hotdog", hotdog_cart())
T("stop", bus_stop())
T("cone", cone())
T("barrier", barrier())
T("planter", planter_tree())
T("vending", vending())
T("crane", tower_crane())
T("rubble", boulder("rubble", 21, size=0.55, squash=0.7, moss=False, facets=12, pal=dict(rock=C("#a0a2a8"), rock_dark=C("#5a5c64"))))
T("chunks", pebble_cluster("chunks", 6, count=7, spread=0.6, size=0.15, pal=dict(rock=C("#a0a2a8"), rock_dark=C("#5a5c64"))))
T("crate", crate("crate", wood=C("#8a6a46"), seed=2))
bench = block("bench", 1.6, 0.45, 0.45, C("#6a4a32"), bevel=0.04)
T("bench", bench)
heli = helicopter()
comp.bake_templates(samples=64)

put = comp.put
rnd = random.Random(4)
put("dais", 0, 0, name="pedestal", foot=2.4)
put("markings", 0, 0, name="markings")
put("plaza", 0, 0, name="plaza")

# ── The skyline: towers in a deep arc behind, taller further back.
for ring, (tier, r0, n) in enumerate((("low", 17.0, 9), ("mid", 27.0, 11), ("tall", 40.0, 13))):
    for k in range(n):
        a = math.pi + (k / (n - 1) - 0.5) * (2.5 - ring * 0.25) + (rnd.random() - 0.5) * 0.08
        r = r0 + rnd.random() * 4
        x, z = math.sin(a) * r, math.cos(a) * r
        if ring == 0 and abs(x) < 6:
            continue  # keep a view down the avenue behind the star
        key = f"tower_{tier}{rnd.randrange(len(TIERS[tier]))}"
        sc = 0.95 + rnd.random() * 0.2
        if not comp.slot_clear(x, z, 3.6 * sc):
            continue  # leave room for the trebuchets and slap factories
        # Face the plaza (the facade's front is -y in the template).
        put(key, x, z, yaw=a + math.pi, scale=sc, foot=4.0)
put("crane", -9.0, -30.0, yaw=0.5, name="tower_crane")
put("tower_tall1", 0.0, -48.0, yaw=0.0, scale=1.35, name="landmark")

# ── The plaza: lamps, planters, benches.
LAMPS = (50, 115, 165, -50, -115, -165)
for i, deg in enumerate(LAMPS):
    a = math.radians(deg)
    put("lamp", math.sin(a) * 7.15, math.cos(a) * 7.15, yaw=a, foot=0.3, name=f"lamp_{i}")
for i, (x, z) in enumerate(((-5.2, -5.6), (5.6, -5.8), (-7.0, 4.0), (7.2, 4.4))):
    put("planter", x, z, yaw=rnd.random() * 6, foot=0.8)
put("bench", -7.2, 0.6, yaw=1.4, foot=0.7, name="bench_l")
put("bench", 2.0, -6.6, yaw=0.05, foot=0.7, name="bench_r")
put("hotdog", -3.0, -6.2, yaw=0.3, foot=0.8, name="hotdog")
put("vending", -8.6, -5.6, yaw=0.9, foot=0.6)

# ── The road: parked cars, the news van, a bus stop.
put("van", 8.6, -4.6, yaw=-1.25, foot=1.4, name="news_van")
put("car_r", -9.1, -2.6, yaw=1.8, foot=1.0)
put("car_b", -8.0, -6.2, yaw=2.3, foot=1.0)
put("car_y", 6.8, -7.4, yaw=-2.4, foot=1.0)
put("stop", -4.2, -10.8, yaw=0.2, foot=1.2, name="bus_stop")

# ── Construction corner (the gorillas' rubble).
put("rubble", 3.95, -2.75, yaw=0.5, foot=0.9, name="rock_pile")
put("chunks", 4.5, -2.2, yaw=1.0)
put("rubble", 3.4, -3.3, yaw=2.0, scale=0.7)
put("barrier", 6.7, -3.5, yaw=-0.9, foot=0.6)
for i, (x, z) in enumerate(((5.2, -3.6), (5.8, -0.4), (2.7, -1.9), (4.9, 0.6))):
    put("cone", x, z, yaw=rnd.random() * 6)
put("crate", 9.6, -1.6, yaw=0.4, foot=0.5)
put("crate", 9.9, -0.9, yaw=1.2, foot=0.5)

# ── Anchors.
for i, deg in enumerate(LAMPS):
    a = math.radians(deg)
    comp.anchor(f"fx_lamp_{i}", math.sin(a) * 7.15 - math.sin(a) * 0.95, math.cos(a) * 7.15 - math.cos(a) * 0.95, 4.05, kind="lamp")
for i, (x, z) in enumerate(((-14, -24), (11, -26), (-2, -34))):
    comp.anchor(f"fx_search_{i}", x, z, 0.5, kind="searchlight")
comp.anchor("fx_crane", -9.0 + 0.0, -30.0, 23.0, kind="beacon")
comp.anchor("rest_0", -7.2, 0.6, 0.45, kind="seat", yaw=1.4 + math.pi)
comp.anchor("rest_1", 2.0, -6.6, 0.45, kind="seat", yaw=math.pi)
comp.anchor("rest_2", -3.0, -5.5, 0.0, kind="eat", yaw=0.3)
comp.anchor("rest_3", -4.2, -10.3, 0.45, kind="seat", yaw=math.pi + 0.2)
comp.anchor("rest_4", 5.6, -5.0, 0.0, kind="shade", yaw=0.8)
comp.anchor("st_rockpile", 3.95, -2.75, 0.0, kind="rockpile")
comp.add_anim(heli, 12, -26, dy=16)
for i, key in enumerate(("car_b", "car_r", "car_y")):
    c = put(key, -12 + i * 6, -9.1, yaw=0, name=f"traffic_{i}")
    c["role"] = "anim"

for key, pts in LAYOUT.items():
    if key.startswith("_") or key in ("rockpile", "printer", "paradox"):
        continue
    for x, z in pts:
        if not comp.clear_of(x, z, 0.8):
            print(f"WARNING: {key} slot ({x}, {z}) is crowded")

comp.finish(OUT, color, grass, PREVIEW, sun_dir=(-0.4, 0.5, 0.75), world_rgb=(0.18, 0.22, 0.4))
