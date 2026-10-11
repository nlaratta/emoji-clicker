"""Era VII: Reality Has Left the Chat — a pastel floating island adrift in
an iridescent void, pieced together from every era. The star stands on a
patchwork of all six floors; a portal arch glows behind it; stairs loop
forever, a clock melts over a cube, and smaller islands drift past, each
carrying a fragment of an earlier age.

    Blender -b --factory-startup -P era6.py -- <out.glb> [preview.png]
"""
import math
import os
import random
import sys

sys.path.insert(0, os.path.dirname(__file__))
from mathutils import Matrix, Vector, noise  # noqa: E402

from kit import C, argv, join, mix, mul, reset  # noqa: E402
from compose import LAYOUT, Composer  # noqa: E402
from props_reality import (  # noqa: E402
    CREAM, LILAC, MINT, PEACH, PINK, TURF, TURF_D, anim_root, crystal_spire, fragment_pile, glitch_cube, island,
    melting_clock, patch_dais, penrose_stairs, portal_arch, tea_table, tile_ring,
)
from terrain import smoothstep  # noqa: E402

reset()
args = argv()
OUT, PREVIEW = args[0], (args[1] if len(args) > 1 else None)


def edge(x, z):
    """The island's rim: close in front, reaching far back behind the star."""
    a = math.atan2(x, z)
    return 14.0 + 11.0 * (1 - math.cos(a)) / 2 + noise.noise(Vector((math.cos(a) * 2, math.sin(a) * 2, 7.0))) * 2.0


def height(x, z):
    r = math.hypot(x, z)
    e = edge(x, z)
    mound = smoothstep(4.5, 9, r) * noise.noise(Vector((x * 0.12, z * 0.12, 2.0))) * 0.45
    lip = smoothstep(e - 4, e - 0.8, r) * 0.35
    drop = smoothstep(e - 0.4, e + 2.2, r) * 42.0
    return mound + lip - drop


def color(x, z, y, slope):
    r = math.hypot(x, z)
    k = noise.noise(Vector((x * 0.3, z * 0.3, 1.0)))
    if r < 4.6:
        return mul(CREAM, 0.6)
    if y < -0.6 or slope > 0.8:
        band = 0.5 + 0.5 * math.sin(y * 1.4 + k * 2)
        return mix(C("#8a74a8"), C("#c8b0dc"), band)
    return mix(TURF_D, TURF, 0.55 + 0.45 * k)


def grass(x, z):
    r = math.hypot(x, z)
    if r < 4.6 or r > edge(x, z) - 1.2:
        return 0.0
    return 0.75 * smoothstep(4.6, 6.5, r)


def facing(x, z):
    return math.atan2(-x, -z)


comp = Composer(height)
T = comp.tmpl
T("dais", patch_dais())
T("tiles", tile_ring())
T("portal", portal_arch())
T("stairs", penrose_stairs())
T("clock", melting_clock())
T("tea", tea_table())
T("frag", fragment_pile())
for key, col, h in (("spire_m", MINT, 3.2), ("spire_l", LILAC, 4.2), ("spire_p", PINK, 2.6)):
    T(key, crystal_spire(key, col, seed=len(key), h=h))
for key, col, s in (("cube_m", MINT, 0.5), ("cube_p", PINK, 0.35), ("cube_l", LILAC, 0.6)):
    T(key, glitch_cube(key, col, s))
T("seat", __import__("hard").block("seat", 0.7, 0.7, 0.45, PEACH, bevel=0.08))
comp.T["seat"]["col"] = 0.4


# ── The drifting islands: each carries a fragment of an earlier era.
def vignette_stone():
    from flora import broadleaf
    from props_stone import standing_stone
    base = island("isl_stone", 3.6, 5.5, seed=1)
    tree = broadleaf("isl_stone_tree", 4, height=3.4, pal=None)
    tree.data.transform(Matrix.Translation((-0.8, 0.4, 0.1)))
    men = standing_stone("isl_stone_men", seed=2, height=1.6)
    men.data.transform(Matrix.Translation((1.3, -0.5, 0.0)))
    return [base, tree, men]


def vignette_castle():
    from props_medieval import round_tower
    base = island("isl_castle", 3.0, 5.0, seed=2, top=C("#b8d89a"))
    tw = round_tower("isl_castle_tw", r=1.1, h=4.2, seed=3)
    tw.data.transform(Matrix.Translation((0.2, 0.0, 0.0)))
    return [base, tw]


def vignette_factory():
    from props_industrial import chimney, gear
    base = island("isl_fac", 3.0, 5.0, seed=3, top=C("#c8b89a"))
    ch = chimney("isl_fac_ch", h=6.5, r=0.5, seed=1)
    ch.data.transform(Matrix.Translation((-0.6, 0.3, 0.0)))
    g = gear("isl_fac_gear", r=1.1, teeth=10)
    g.data.transform(Matrix.Rotation(math.pi / 2, 4, "X"))
    g.data.transform(Matrix.Translation((0.9, -0.2, 1.2)))
    return [base, ch, g]


def vignette_city():
    from props_modern import street_lamp, tower
    base = island("isl_city", 3.3, 5.0, seed=4, top=C("#a8b0c0"))
    tw = tower("isl_city_tw", 3.0, 3.0, 4, seed=5, crown="tank", body=C("#7a4434"), lit=0.6)
    tw.data.transform(Matrix.Translation((-0.4, 0.3, 0.0)))
    lamp = street_lamp("isl_city_lamp")
    lamp.data.transform(Matrix.Translation((1.8, -0.8, 0.0)))
    return [base, tw, lamp]


def vignette_neon():
    from props_neon import arcade_cabinet, bio_planter, CYAN, MAGENTA
    base = island("isl_neon", 2.6, 4.5, seed=5, top=C("#3a3a54"))
    cab = arcade_cabinet("isl_neon_cab", C("#3a2a5a"), MAGENTA, seed=1)
    cab.data.transform(Matrix.Translation((-0.5, 0.0, 0.0)))
    pl = bio_planter("isl_neon_pl", seed=4)
    pl.data.transform(Matrix.Translation((0.9, 0.3, 0.0)))
    return [base, cab, pl]


def vignette_space():
    from props_space import crystals, hab_dome, VIOLET
    base = island("isl_space", 3.0, 5.0, seed=6, top=C("#8a8298"))
    dome = hab_dome("isl_space_dome", 1.3, seed=3)
    dome.data.transform(Matrix.Translation((-0.4, 0.2, 0.0)))
    cr = crystals("isl_space_cr", 5, VIOLET, 5, 0.8)
    cr.data.transform(Matrix.Translation((1.4, -0.6, 0.0)))
    return [base, dome, cr]


def vignette_tree():
    """A small island with a tree growing down from its underside."""
    from flora import broadleaf
    base = island("isl_tree", 2.2, 2.0, seed=7)
    base.data.transform(Matrix.Rotation(math.pi, 4, "X"))
    tree = broadleaf("isl_tree_tree", 9, height=3.0, pal=None)
    tree.data.transform(Matrix.Rotation(math.pi, 4, "X"))
    tree.data.transform(Matrix.Translation((0, 0, -0.1)))
    return [base, tree]


ISLANDS = [
    ("isle_stone", vignette_stone, -17.0, -24.0, 4.5),
    ("isle_castle", vignette_castle, 15.0, -27.0, 6.5),
    ("isle_factory", vignette_factory, -31.0, -18.0, 9.0),
    ("isle_city", vignette_city, 30.0, -16.0, 3.5),
    ("isle_neon", vignette_neon, 5.0, -38.0, 11.0),
    ("isle_space", vignette_space, -6.0, -44.0, 2.0),
    ("isle_tree", vignette_tree, 9.0, -21.0, 12.5),
]
isles = [(name, anim_root(name, build()), x, z, dy) for name, build, x, z, dy in ISLANDS]

# The main island's underside, so it reads as floating from afar.
under = island("underside", 26.0, 70.0, seed=11)
under.data.transform(Matrix.Rotation(0.0, 4, "Z"))
under.data.transform(Matrix.Diagonal((1.0, 0.85, 1.0, 1)))
under.data.transform(Matrix.Translation((0, 6.0, -38.0)))
T("underside", under)
comp.bake_templates(samples=48)

put = comp.put
rnd = random.Random(3)
put("dais", 0, 0, name="pedestal", foot=2.4)
put("underside", 0, 0, name="underside")
put("tiles", 0, 0, name="tiles")

# ── Set pieces.
put("portal", 0.0, -13.6, yaw=0.0, foot=2.6, name="portal")
put("stairs", -12.2, -3.8, yaw=0.4, foot=2.4, name="spiral_stairs")
put("clock", 11.2, -3.2, yaw=-0.6, foot=1.3, name="clock")
put("tea", -8.8, 3.8, yaw=0.5, foot=0.9, name="tea_party")
put("frag", 3.95, -2.75, yaw=0.3, foot=0.9, name="rock_pile")
for key, x, z, s in (("spire_l", -15.5, -9.5, 1.0), ("spire_m", 15.8, -9.0, 1.1), ("spire_p", -16.5, 3.0, 1.0), ("spire_m", 16.8, 4.0, 0.9),
                     ("spire_p", -4.6, -17.5, 1.2), ("spire_l", 5.5, -18.5, 1.0)):
    if comp.slot_clear(x, z, 0.8, margin=0.6):
        put(key, x, z, yaw=rnd.random() * 6, scale=s, foot=0.7 * s)
for i in range(16):
    a = rnd.uniform(1.4, math.tau - 1.4)
    d = rnd.uniform(9.0, 19.0)
    x, z = math.sin(a) * d, math.cos(a) * d
    if not comp.slot_clear(x, z, 0.5, margin=0.4):
        continue
    put(rnd.choice(("cube_m", "cube_p", "cube_l")), x, z, y=height(x, z) + rnd.uniform(0.8, 3.5), name=f"glitch_{i}")
for i, (x, z) in enumerate(((-2.6, -12.6), (2.6, -12.6))):
    put("seat", x, z, foot=0.4, name=f"seat_{i}")

# ── Drifting islands.
for name, objs, x, z, dy in isles:
    comp.add_anim(objs, x, z, dy=dy - height(x, z))

# ── Anchors.
comp.anchor("st_rockpile", 3.95, -2.75, 0.0, kind="rockpile")
comp.anchor("rest_0", -2.6, -12.6, 0.45, kind="seat", yaw=facing(-2.6, -12.6))
comp.anchor("rest_1", 2.6, -12.6, 0.45, kind="seat", yaw=facing(2.6, -12.6))
tx, tz = -8.8, 3.8
for k, ly in enumerate((-1.1, 1.1)):
    bx = -ly * math.sin(0.5)
    by = ly * math.cos(0.5)
    comp.anchor(f"rest_{2 + k}", tx + bx, tz - by, 0.45, kind="seat", yaw=0.5 + (0 if ly < 0 else math.pi))
comp.anchor("rest_4", -10.2, -1.6, 0.0, kind="eat", yaw=facing(-10.2, -1.6))
comp.anchor("fx_portal", 0.0, -13.6, 3.2, kind="portal")
comp.anchor("fx_fall", -17.0, -24.0, 4.5 - height(-17.0, -24.0), kind="fall")
comp.anchor("fx_tesseract", 5.5, -15.5, 5.6, kind="tesseract")

for key, pts in LAYOUT.items():
    if key.startswith("_") or key in ("rockpile",):
        continue
    for x, z in pts:
        if not comp.clear_of(x, z, 0.8):
            print(f"WARNING: {key} slot ({x}, {z}) is crowded")

comp.finish(OUT, color, grass, PREVIEW, sun_dir=(-0.4, 0.6, 0.6), world_rgb=(0.55, 0.42, 0.7),
            terrain_kw=dict(outer=30.0))
