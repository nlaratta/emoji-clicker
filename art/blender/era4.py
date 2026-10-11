"""Era V: Neon Overdrive — a rain-slick arcade district at night. A hover-pad
on wet hex paving, a noodle stall under paper lanterns, arcade cabinets and
luminous planters; a maglev line across the back, low neon arcades and
megatowers threaded with skybridges rising into the haze.

    Blender -b --factory-startup -P era4.py -- <out.glb> [preview.png]
"""
import math
import os
import random
import sys

sys.path.insert(0, os.path.dirname(__file__))
from mathutils import Vector, noise  # noqa: E402

from kit import C, argv, mix, mul, reset, sweep  # noqa: E402
from compose import LAYOUT, Composer  # noqa: E402
from props_neon import (  # noqa: E402
    AMBER, CYAN, MAGENTA, arcade_cabinet, arcade_front, bio_planter, bollard, dais, glow, hex_plaza, holo_kiosk,
    festoon, hover_bike, hover_car, light_channels, light_pole, maglev_pylon, maglev_track, maglev_train, megatower, noodle_stall,
    scrap_pile, skybridge,
)
from terrain import smoothstep  # noqa: E402

reset()
args = argv()
OUT, PREVIEW = args[0], (args[1] if len(args) > 1 else None)

PAVE = C("#1c1c26")
STREET = C("#14141c")
WALK = C("#24242e")
TRACK_Z, TRACK_H = -13.5, 4.2


def height(x, z):
    r = math.hypot(x, z)
    return smoothstep(40, 80, r) * 1.5 * (0.5 + 0.5 * noise.noise(Vector((x * 0.02, z * 0.02, 5.0))))


def color(x, z, y, slope):
    r = math.hypot(x, z)
    k = noise.noise(Vector((x * 0.25, z * 0.25, 2.0)))
    if r < 7.6:
        return PAVE
    if r < 12.0:
        return mul(STREET, 0.95 + k * 0.1)
    if z < -12 and abs(x) < 3.2:
        return mul(STREET, 0.95 + k * 0.1)
    joint = (abs(math.sin(x * 1.2)) < 0.05) or (abs(math.sin(z * 1.2)) < 0.05)
    return mul(WALK, (0.8 if joint else 1.0) + k * 0.06)


def grass(x, z):
    return 0.0


def local(x0, z0, yaw, lx, ly):
    """Game position of a point given in a template's local (Blender x, y) frame."""
    bx = lx * math.cos(yaw) - ly * math.sin(yaw)
    by = lx * math.sin(yaw) + ly * math.cos(yaw)
    return x0 + bx, z0 - by


def facing(x, z):
    """Yaw that turns a template's front toward the plaza centre."""
    return math.atan2(-x, -z)


comp = Composer(height)
T = comp.tmpl
T("dais", dais())
T("hex", hex_plaza())
T("channels", light_channels())
edge = sweep("edge", [(math.cos(a / 96 * math.tau) * 7.6, math.sin(a / 96 * math.tau) * 7.6, 0.03) for a in range(97)], 0.05, around=6)
T("edge", glow(edge, CYAN))
T("noodles", noodle_stall())
for i, (body, screen) in enumerate(((C("#3a2a5a"), CYAN), (C("#5a2a3a"), MAGENTA), (C("#2a3a5a"), AMBER), (C("#2a4a3a"), C("#7aff6a")))):
    T(f"cab{i}", arcade_cabinet(f"cab{i}", body, screen, seed=i))
T("planter", bio_planter())
T("bollard", bollard())
T("kiosk_c", holo_kiosk("kiosk_c", CYAN))
T("kiosk_m", holo_kiosk("kiosk_m", MAGENTA))
T("bike_m", hover_bike("bike_m", MAGENTA))
T("bike_c", hover_bike("bike_c", C("#3a8aff")))
T("scrap", scrap_pile())
T("pylon", maglev_pylon(h=TRACK_H))
T("track", maglev_track(length=96.0, h=TRACK_H))
FRONTS = [
    (7.0, 5.0, 3, C("#2e2a3a"), MAGENTA), (6.0, 5.0, 2, C("#2a2e3a"), CYAN), (8.0, 5.5, 4, C("#34283a"), AMBER),
    (6.5, 5.0, 3, C("#262a36"), C("#7a5aff")),
]
for i, (w, d, f, body, acc) in enumerate(FRONTS):
    T(f"front{i}", arcade_front(f"front{i}", w, d, f, body=body, accent=acc, seed=i * 5 + 1))
TOWERS = [
    (6.0, 6.0, 34.0, C("#22283a"), CYAN, 3), (7.0, 6.0, 46.0, C("#2a2238"), MAGENTA, 3), (5.5, 5.5, 58.0, C("#1e2434"), C("#7a5aff"), 4),
    (8.0, 7.0, 28.0, C("#28262e"), AMBER, 2), (6.0, 7.0, 40.0, C("#20283a"), CYAN, 3),
]
for i, (w, d, h, body, acc, tiers) in enumerate(TOWERS):
    T(f"tower{i}", megatower(f"tower{i}", w, d, h, body=body, accent=acc, seed=i * 11 + 3, tiers=tiers, billboard=(i % 2 == 0 or h > 45)))
T("bridge", skybridge("bridge", 10.0))
T("pole", light_pole())
train = maglev_train()
cars = [hover_car(f"skycar_{i}", col) for i, col in enumerate((C("#e8e8f0"), C("#ff5a8a"), C("#5ab0ff")))]
comp.bake_templates(samples=48)

put = comp.put
rnd = random.Random(7)
put("dais", 0, 0, name="pedestal", foot=2.4)
put("hex", 0, 0, name="hexplaza")
put("channels", 0, 0, name="channels")
put("edge", 0, 0, name="edge")

# ── The street ring: bollards, planters, the noodle stall and the arcade row.
for deg in range(15, 360, 30):
    a = math.radians(deg)
    x, z = math.sin(a) * 8.1, math.cos(a) * 8.1
    if comp.slot_clear(x, z, 0.3, margin=0.6):
        put("bollard", x, z, foot=0.25)
for x, z in ((-7.2, 4.2), (7.4, 4.6), (-4.4, -7.3), (4.7, -7.5)):
    put("planter", x, z, yaw=rnd.random() * 6, foot=0.75)

NX, NZ = -7.6, -5.0
nyaw = facing(NX, NZ)
put("noodles", NX, NZ, yaw=nyaw, foot=1.5, name="noodle_stall")
for k, lx in enumerate((-0.85, 0.0, 0.85)):
    sx, sz = local(NX, NZ, nyaw, lx, -0.85)
    comp.anchor(f"rest_{k}", sx, sz, 0.62, kind="seat", yaw=nyaw)
ex, ez = local(NX, NZ, nyaw, 1.5, -1.2)
comp.anchor("rest_3", ex, ez, 0.0, kind="eat", yaw=nyaw)
px, pz = local(NX, NZ, nyaw, 0.6, 0.1)
comp.anchor("fx_steam", px, pz, 1.3, kind="steam")
for k in range(4):
    lx = -1.3 + 0.25 + k * (2.6 - 0.5) / 3
    lx_, lz_ = local(NX, NZ, nyaw, lx, -0.55)
    comp.anchor(f"fx_lantern_{k}", lx_, lz_, 2.15, kind="lantern")

# Arcade cabinets in a shallow arc on the right, screens toward the plaza.
for k in range(4):
    a = math.radians(128 - k * 9.5)
    x, z = math.sin(a) * 8.9, math.cos(a) * 8.9
    put(f"cab{k}", x, z, yaw=facing(x, z), foot=0.45, name=f"cabinet_{k}")
comp.anchor("rest_4", math.sin(math.radians(114)) * 7.6, math.cos(math.radians(114)) * 7.6, 0.0, kind="shade", yaw=facing(7, -3))

put("bike_m", -9.4, -1.0, yaw=0.3, foot=0.6)
put("bike_c", -9.9, 0.6, yaw=0.15, foot=0.6)
put("kiosk_c", -3.6, -10.2, foot=0.6, name="kiosk_l")
put("kiosk_m", 3.9, -10.4, foot=0.6, name="kiosk_r")
comp.anchor("fx_holo_0", -3.6, -10.2, 1.6, kind="holo", color="cyan")
comp.anchor("fx_holo_1", 3.9, -10.4, 1.6, kind="holo", color="magenta")

# The gorillas' scrap heap.
put("scrap", 3.95, -2.75, yaw=0.6, foot=0.9, name="rock_pile")
comp.anchor("st_rockpile", 3.95, -2.75, 0.0, kind="rockpile")

# ── Festoon lights strung over the back of the plaza between tall poles.
POLES = [(-9.6, -3.2), (-6.4, -8.9), (0.0, -10.9), (6.6, -9.0), (9.7, -3.4)]
POLES = [(x, z) for x, z in POLES if comp.slot_clear(x, z, 0.2, margin=0.5)]
for i, (x, z) in enumerate(POLES):
    put("pole", x, z, foot=0.25, name=f"pole_{i}")
for i, ((x0, z0), (x1, z1)) in enumerate(zip(POLES, POLES[1:])):
    s = festoon(f"festoon{i}", (x0, -z0, 5.15), (x1, -z1, 5.15), sag=0.9, bulbs=10)
    comp.tmpl(f"festoon{i}", s)
    put(f"festoon{i}", 0, 0, name=f"festoon_{i}")
for i, (x0, z0) in enumerate(POLES[1:-1]):
    s = festoon(f"cross{i}", (x0, -z0, 5.15), (0.0, 0.0, 6.4), sag=0.7, bulbs=8, colors=[CYAN, MAGENTA])
    comp.tmpl(f"cross{i}", s)
    put(f"cross{i}", 0, 0, name=f"cross_{i}")

# ── The maglev line across the back.
put("track", 0, TRACK_Z, name="maglev_track")
for x in (-38, -31, -24, -17, -9.5, -3.5, 3.5, 9.5, 17, 24, 31, 38):
    if comp.slot_clear(x, TRACK_Z, 0.8, margin=0.8):
        put("pylon", x, TRACK_Z, foot=0.6)
comp.add_anim(train, -60, TRACK_Z, dy=TRACK_H + 0.75)
comp.anchor("path_train_0", -70, TRACK_Z, TRACK_H + 0.75, kind="path")
comp.anchor("path_train_1", 70, TRACK_Z, TRACK_H + 0.75, kind="path")

# ── Low neon arcades behind the line, megatowers rising behind them.
for k in range(12):
    a = math.pi + (k / 11 - 0.5) * 2.3 + (rnd.random() - 0.5) * 0.06
    r = 20.5 + rnd.random() * 2.5
    x, z = math.sin(a) * r, math.cos(a) * r
    if abs(x) < 5.0:
        continue
    key = f"front{rnd.randrange(len(FRONTS))}"
    if not comp.slot_clear(x, z, 3.8):
        continue
    put(key, x, z, yaw=facing(x, z), scale=0.95 + rnd.random() * 0.15, foot=3.8)
spots = []
for ring, (r0, n, span) in enumerate(((31.0, 9, 2.0), (46.0, 11, 1.8), (64.0, 9, 1.5))):
    for k in range(n):
        a = math.pi + (k / (n - 1) - 0.5) * span + (rnd.random() - 0.5) * 0.08
        r = r0 + rnd.random() * 6
        x, z = math.sin(a) * r, math.cos(a) * r
        key = f"tower{rnd.randrange(len(TOWERS))}"
        sc = 0.9 + ring * 0.2 + rnd.random() * 0.25
        put(key, x, z, yaw=facing(x, z) + rnd.choice((0, 0.3, -0.3)), scale=sc, foot=4.5)
        spots.append((x, z, sc, ring))
# Skybridges between neighbouring towers of the first ring.
first = sorted([s for s in spots if s[3] == 0], key=lambda s: math.atan2(s[0], s[1]))
for (x0, z0, s0, _), (x1, z1, s1, _) in zip(first, first[1:]):
    d = math.hypot(x1 - x0, z1 - z0)
    if d > 16:
        continue
    yaw = math.atan2(-(z1 - z0), x1 - x0)
    b = put("bridge", (x0 + x1) / 2, (z0 + z1) / 2, yaw=yaw, scale=1.0, y=12 + rnd.random() * 10)
    b.scale = (d / 10.0, 1, 1)
put("tower2", 0, -78, yaw=0, scale=1.5, name="landmark")
comp.anchor("fx_beacon_0", 0, -78, 58 * 1.5 * 1.0 + 9.2, kind="beacon")

# ── Sky traffic: three flying cars in lanes behind the line.
for i, car in enumerate(cars):
    comp.add_anim(car, -40 + i * 25, -22 - i * 6, dy=8.5 + i * 3.0)

for key, pts in LAYOUT.items():
    if key.startswith("_") or key in ("rockpile", "printer", "paradox"):
        continue
    for x, z in pts:
        if not comp.clear_of(x, z, 0.8):
            print(f"WARNING: {key} slot ({x}, {z}) is crowded")

comp.finish(OUT, color, grass, PREVIEW, sun_dir=(-0.3, 0.6, 0.6), world_rgb=(0.2, 0.12, 0.3))
