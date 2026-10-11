"""Era VI: Space Is Freaking Out — a mining outpost on a small asteroid. A
landing pad on riveted deck plates, habitat domes linked by corridors, a
comms dish, solar arrays, a parked lander and glowing crystal outcrops; the
ground curves away to a close horizon, a ringed gas giant hangs beyond and
boulders drift in the low gravity.

    Blender -b --factory-startup -P era5.py -- <out.glb> [preview.png]
"""
import math
import os
import random
import sys

sys.path.insert(0, os.path.dirname(__file__))
from mathutils import Vector, noise  # noqa: E402

from kit import C, argv, mix, mul, reset  # noqa: E402
from compose import LAYOUT, Composer  # noqa: E402
from props_space import (  # noqa: E402
    REGOLITH, TEAL, VIOLET, beacon_mast, comms_dish, container, crystals, dais, deck_plates, floating_rock, fuel_tank,
    gas_giant, hab_dome, hazard_ring, lander, ore_pile, rover, solar_array, tube,
)
from rocks import boulder, pebble_cluster  # noqa: E402
from terrain import smoothstep  # noqa: E402

reset()
args = argv()
OUT, PREVIEW = args[0], (args[1] if len(args) > 1 else None)

R_WORLD = 95.0  # the asteroid's radius of curvature: a close horizon
rnd_c = random.Random(11)
CRATERS = []
while len(CRATERS) < 26:
    a = rnd_c.random() * math.tau
    d = 11 + rnd_c.random() * 55
    x, z = math.sin(a) * d, math.cos(a) * d
    rc = 1.6 + rnd_c.random() * (2.5 + d * 0.08)
    if z > 2 and abs(x) < 6:
        continue
    CRATERS.append((x, z, rc, 0.25 + rc * 0.12))


def crater_h(x, z):
    h = 0.0
    for cx, cz, rc, depth in CRATERS:
        r = math.hypot(x - cx, z - cz) / rc
        if r < 1.0:
            h -= depth * (1 - r * r)
        h += depth * 0.35 * math.exp(-((r - 1.0) / 0.28) ** 2)
    return h


def height(x, z):
    r = math.hypot(x, z)
    curve = -max(0.0, r - 12) ** 2 / (2 * R_WORLD)
    bumps = smoothstep(8, 20, r) * (noise.noise(Vector((x * 0.07, z * 0.07, 1.0))) * 0.6)
    return curve + bumps + smoothstep(8.5, 12, r) * crater_h(x, z)


def color(x, z, y, slope):
    r = math.hypot(x, z)
    k = noise.noise(Vector((x * 0.35, z * 0.35, 4.0)))
    if r < 7.4:
        return C("#3a3e4a")
    base = mix(REGOLITH, C("#a49cb4"), 0.5 + 0.5 * k)
    # Craters darker inside, dusted lighter on the rims; steep faces darker.
    c = crater_h(x, z) * smoothstep(8.5, 12, r)
    base = mul(base, 1.0 + max(-0.35, min(0.25, c * 0.35)))
    base = mul(base, 1.0 - min(0.4, slope * 0.5))
    # Darker toward the horizon, so the sky and the planet carry the backdrop.
    return mul(base, 1.0 - 0.5 * smoothstep(14, 42, r))


def grass(x, z):
    return 0.0


def facing(x, z):
    return math.atan2(-x, -z)


comp = Composer(height)
T = comp.tmpl
T("dais", dais())
T("deck", deck_plates())
T("hazard", hazard_ring())
T("hab_big", hab_dome("hab_big", 3.0, seed=1))
T("hab_small", hab_dome("hab_small", 2.1, seed=2))
T("tube6", tube("tube6", 6.0))
T("solar", solar_array())
T("tank", fuel_tank())
T("box_w", container("box_w", C("#d8dae2"), 1))
T("box_o", container("box_o", C("#e07a3a"), 2))
T("box_b", container("box_b", C("#3a6ab0"), 3))
T("lander", lander())
T("beacon", beacon_mast())
T("cry_v", crystals("cry_v", 1, VIOLET, 7, 1.0))
T("cry_t", crystals("cry_t", 2, TEAL, 6, 0.8))
T("cry_big", crystals("cry_big", 3, VIOLET, 9, 1.8))
T("ore", ore_pile())
pal = dict(rock=C("#9a92a8"), rock_dark=C("#4a4458"))
T("rock_a", boulder("rock_a", 61, size=1.0, squash=0.65, moss=False, facets=10, pal=pal))
T("rock_b", boulder("rock_b", 62, size=1.6, squash=0.55, moss=False, facets=11, pal=pal))
T("pebbles", pebble_cluster("pebbles", 63, count=7, spread=0.7, size=0.15, pal=pal))
dish = comms_dish()
rov = rover()
floaters = [floating_rock(f"float_{i}", 70 + i, size=0.5 + (i % 3) * 0.35) for i in range(7)]
planet = gas_giant()
comp.bake_templates(samples=48)

put = comp.put
rnd = random.Random(5)
put("dais", 0, 0, name="pedestal", foot=2.4)
put("deck", 0, 0, name="deck")
put("hazard", 0, 0, name="hazard")

# ── The outpost: two habitats joined by a corridor on the left, the lander
# and fuel on the right, the dish and solar field behind.
put("hab_big", -11.0, -6.5, yaw=facing(-11.0, -6.5), foot=3.2, name="hab_big")
put("hab_small", -9.5, 1.5, yaw=facing(-9.5, 1.5), foot=2.3, name="hab_small")
put("tube6", -10.4, -2.4, yaw=math.radians(98), name="corridor")
put("lander", 11.5, -4.5, yaw=0.4, foot=1.8, name="lander")
put("tank", 9.6, 1.6, yaw=1.3, foot=1.1)
put("box_o", 8.6, -8.4, yaw=0.9, foot=1.0)
put("box_w", 9.6, -9.6, yaw=0.6, foot=1.0, y=None)
put("box_b", -5.4, -12.4, yaw=-0.5, foot=1.0)
put("beacon", -3.8, -10.6, foot=0.4, name="beacon_l")
put("beacon", 4.4, -11.2, foot=0.4, name="beacon_r")
for i, (x, z) in enumerate(((-3.0, -16.5), (3.2, -16.8), (-1.0, -19.5), (5.6, -19.2), (-5.4, -19.0))):
    if comp.slot_clear(x, z, 1.4, margin=0.5):
        put("solar", x, z, yaw=0.05 * i, foot=1.4)
comp.add_anim(dish, -7.5, -17.5, yaw=0.5)

# Crystal outcrops in a few craters and along the deck edge.
for key, x, z, s in (("cry_v", 6.2, -6.6, 1.0), ("cry_t", -6.4, -5.6, 1.0), ("cry_big", 15.5, -14.0, 1.0), ("cry_v", -16.0, -13.0, 1.4),
                     ("cry_t", 8.4, 4.6, 0.9), ("cry_v", -7.4, 5.2, 0.8), ("cry_big", -24.0, -26.0, 1.6), ("cry_big", 27.0, -22.0, 1.4)):
    if comp.slot_clear(x, z, 0.8, margin=0.4):
        put(key, x, z, yaw=rnd.random() * 6, scale=s, foot=0.7 * s, sink=0.1)

# The gorillas' ore heap.
put("ore", 3.95, -2.75, yaw=0.3, foot=0.9, name="rock_pile")
comp.anchor("st_rockpile", 3.95, -2.75, 0.0, kind="rockpile")

# Scattered boulders on the plain.
for i in range(22):
    a = rnd.random() * math.tau
    d = 9 + rnd.random() * 40
    x, z = math.sin(a) * d, math.cos(a) * d
    if z > 3 and abs(x) < 7:
        continue
    if not comp.slot_clear(x, z, 1.0, margin=0.4) or not comp.clear_of(x, z, 0.8):
        continue
    put(rnd.choice(("rock_a", "rock_b", "pebbles")), x, z, yaw=rnd.random() * 6, scale=0.5 + rnd.random() * 0.8, sink=0.15, foot=0.8)

# The gas giant over the horizon, back left.
comp.tmpl("planet", planet)
put("planet", -45, -235, yaw=0.0, y=8.0, name="planet")

# Drifting boulders (the runtime bobs and turns them).
for i, fl in enumerate(floaters):
    a = math.radians(-60 + i * 22 + rnd.uniform(-6, 6)) + math.pi
    d = 14 + rnd.random() * 14
    comp.add_anim(fl, math.sin(a) * d, math.cos(a) * d, dy=4 + rnd.random() * 6)

# The rover's loop round the back of the outpost.
comp.add_anim(rov, 0, -14.5, yaw=0.0)

# ── Anchors.
comp.anchor("rest_0", 8.6, -7.6, 1.2, kind="seat", yaw=facing(8.6, -7.6))
comp.anchor("rest_1", -5.1, -11.6, 1.2, kind="seat", yaw=facing(-5.1, -11.6))
comp.anchor("rest_2", -8.6, -4.2, 0.0, kind="eat", yaw=facing(-8.6, -4.2))
comp.anchor("rest_3", 9.0, 0.6, 0.0, kind="shade", yaw=facing(9.0, 0.6))
comp.anchor("rest_4", -7.7, 0.0, 0.0, kind="shade", yaw=facing(-7.7, 0.0))
comp.anchor("fx_beacon_0", -3.8, -10.6, 7.1, kind="beacon")
comp.anchor("fx_beacon_1", 4.4, -11.2, 7.1, kind="beacon")
comp.anchor("fx_vent_0", 11.5, -4.5, 0.6, kind="vent")
for i, (x, z) in enumerate(((6.2, -6.6), (-6.4, -5.6), (15.5, -14.0), (-16.0, -13.0))):
    comp.anchor(f"fx_crystal_{i}", x, z, 0.8, kind="crystal")
comp.anchor("path_rover_0", -4.0, -14.3, 0.0, kind="path")
comp.anchor("path_rover_1", 5.5, -14.8, 0.0, kind="path")

for key, pts in LAYOUT.items():
    if key.startswith("_") or key in ("rockpile", "printer", "paradox"):
        continue
    for x, z in pts:
        if not comp.clear_of(x, z, 0.8):
            print(f"WARNING: {key} slot ({x}, {z}) is crowded")

comp.finish(OUT, color, grass, PREVIEW, sun_dir=(0.6, 0.35, -0.7), world_rgb=(0.12, 0.1, 0.22))
