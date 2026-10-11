"""Era VI props: a mining outpost on a small asteroid. Clean white and
gold hardware, hazard amber, warm habitat windows and violet crystals,
against lavender regolith and a ringed gas giant."""
from __future__ import annotations

import math
import random

import bmesh
import bpy
from mathutils import Matrix, Vector

from kit import C, add_bevel, apply_mods, bm_ico, join, mesh_obj, mix, mul, paint, paint_faces, paint_solid, sweep, vtx_material
from hard import beam, block, cylinder, glow_mat, metal_mat
from props_stone import _prism

HULL = C("#e4e6ec")
HULL_D = C("#9aa0ae")
STEEL = C("#5a6070")
AMBER = C("#ffb02a")
HAZARD_D = C("#22222a")
WARM = C("#ffc880")
VIOLET = C("#b06aff")
TEAL = C("#3ae0d0")
REGOLITH = C("#8a8298")


def metal(ob):
    ob.data.materials.clear()
    ob.data.materials.append(metal_mat())
    return ob


def glow(ob, col=None):
    ob.data.materials.clear()
    ob.data.materials.append(glow_mat())
    if col is not None:
        paint_solid(ob, col)
    return ob


def gloss(ob):
    ob.data.materials.clear()
    ob.data.materials.append(vtx_material("Gloss", rough=0.16))
    return ob


def ball(name, r, at=(0, 0, 0), col=None, subdiv=2, squash=(1, 1, 1)):
    ob = mesh_obj(bm_ico(1.0, subdiv), name)
    ob.data.transform(Matrix.Diagonal((r * squash[0], r * squash[1], r * squash[2], 1)))
    ob.data.transform(Matrix.Translation(at))
    if col is not None:
        paint_solid(ob, col)
    return ob


def dome(name, r, at=(0, 0, 0), segs=24, rings=8):
    """A hemisphere (open at the bottom), base at z=0."""
    bm = bmesh.new()
    rows = []
    for i in range(rings + 1):
        phi = (i / rings) * math.pi / 2
        z = math.sin(phi) * r
        rr = math.cos(phi) * r
        if i == rings:
            rows.append([bm.verts.new((0, 0, z))])
            break
        rows.append([bm.verts.new((math.cos(a / segs * math.tau) * rr, math.sin(a / segs * math.tau) * rr, z)) for a in range(segs)])
    for i in range(rings):
        a_row, b_row = rows[i], rows[i + 1]
        for k in range(segs):
            if len(b_row) == 1:
                bm.faces.new((a_row[k], a_row[(k + 1) % segs], b_row[0]))
            else:
                bm.faces.new((a_row[k], a_row[(k + 1) % segs], b_row[(k + 1) % segs], b_row[k]))
    ob = mesh_obj(bm, name)
    ob.data.transform(Matrix.Translation(at))
    return ob


def hazard(ob, axis_fn, width=0.35):
    """Paint amber/black hazard bands by a coordinate function."""
    paint(ob, lambda co, n, *_: AMBER if math.floor(axis_fn(co) / width) % 2 == 0 else HAZARD_D)


# ───────────────────────────────────────────── the pad
def dais(name="landing_pad"):
    """A landing pad: a steel drum with a hazard-striped rim, a white deck
    with a target ring, and amber landing lights."""
    parts = []
    drum = cylinder(f"{name}_drum", 2.45, 2.5, 0.28, STEEL, segs=40, bevel=0.04, at=(0, 0, -0.12))
    parts.append(metal(drum))
    rim = cylinder(f"{name}_rim", 2.47, 2.47, 0.1, AMBER, segs=48, bevel=0, at=(0, 0, 0.0))
    hazard(rim, lambda co: math.atan2(co.y, co.x) * 2.47, 0.4)
    parts.append(rim)
    deck = cylinder(f"{name}_deck", 2.25, 2.25, 0.04, HULL, segs=40, bevel=0, at=(0, 0, 0.13))
    paint(deck, lambda co, n, *_: mix(HULL_D, HULL, 0.85 + 0.15 * math.sin(math.hypot(co.x, co.y) * 9)))
    parts.append(deck)
    ring = [(math.cos(a / 64 * math.tau) * 1.65, math.sin(a / 64 * math.tau) * 1.65, 0.175) for a in range(65)]
    r = sweep(f"{name}_target", ring, 0.06, around=4)
    for v in r.data.vertices:
        v.co.z = min(v.co.z, 0.18)
    paint_solid(r, AMBER)
    parts.append(r)
    for k in range(4):
        a = k / 4 * math.tau + math.pi / 4
        mark = block(f"{name}_mark{k}", 0.16, 0.6, 0.02, AMBER, bevel=0, at=(0, -1.05, 0.17))
        mark.data.transform(Matrix.Rotation(a, 4, "Z"))
        parts.append(mark)
    for k in range(12):
        a = k / 12 * math.tau
        parts.append(glow(ball(f"{name}_light{k}", 0.06, (math.cos(a) * 2.33, math.sin(a) * 2.33, 0.17), squash=(1, 1, 0.6)), AMBER if k % 3 else C("#ffffff")))
    ob = join(parts, name)
    ob["col"] = 2.4
    ob["walk"] = 1
    return ob


def deck_plates(name="deck", radius=7.0, size=1.75, seed=3):
    """Riveted steel plates laid around the pad."""
    rnd = random.Random(seed)
    parts = []
    tones = [C("#6a7080"), C("#5e6474"), C("#727888"), C("#646a7a")]
    n = int(radius / size) + 1
    for i in range(-n, n + 1):
        for j in range(-n, n + 1):
            x, y = i * size, j * size
            if math.hypot(abs(x) + size / 2, abs(y) + size / 2) > radius + 0.3 or math.hypot(x, y) < 2.5:
                continue
            parts.append(block(f"{name}_{i}_{j}", size - 0.06, size - 0.06, 0.06, tones[rnd.randrange(4)], bevel=0.015, at=(x, y, -0.02)))
    ob = join(parts, name)
    return metal(ob)


def hazard_ring(name="hazard", r=7.2):
    pts = [(math.cos(a / 120 * math.tau) * r, math.sin(a / 120 * math.tau) * r, 0.02) for a in range(121)]
    ob = sweep(name, pts, 0.12, around=4)
    for v in ob.data.vertices:
        v.co.z = max(0.0, min(v.co.z, 0.06))
    hazard(ob, lambda co: math.atan2(co.y, co.x) * r, 0.5)
    return ob


# ───────────────────────────────────────────── outpost hardware
def hab_dome(name, r=2.6, seed=0):
    """A habitat: a steel base ring with a band of warm windows, a glass
    dome with ribs, a door module and an antenna."""
    rnd = random.Random(seed)
    parts, lit = [], []
    base = cylinder(f"{name}_base", r * 1.02, r * 1.05, 0.9, HULL, segs=28, bevel=0.05)
    paint(base, lambda co, n, *_: mix(HULL_D, HULL, 0.6 + 0.4 * max(0, n.z)))
    parts.append(base)
    for k in range(10):
        a = k / 10 * math.tau
        win = block(f"{name}_win{k}", 0.55, 0.1, 0.3, WARM, bevel=0, at=(0, -r * 1.04, 0.35))
        win.data.transform(Matrix.Rotation(a, 4, "Z"))
        lit.append(glow(win, WARM))
    glass = dome(f"{name}_glass", r * 0.98, at=(0, 0, 0.9))
    paint(glass, lambda co, n, *_: mix(C("#1a3a4a"), C("#5ab0c8"), max(0, n.z) * 0.6))
    parts.append(gloss(glass))
    for k in range(6):
        a = k / 6 * math.tau
        rib = [(math.cos(a) * math.cos(p / 10 * math.pi / 2) * r, math.sin(a) * math.cos(p / 10 * math.pi / 2) * r, 0.9 + math.sin(p / 10 * math.pi / 2) * r) for p in range(11)]
        parts.append(metal(sweep(f"{name}_rib{k}", rib, 0.05, around=5)))
    # Inside: a warm glow so the dome reads as lived-in.
    lit.append(glow(cylinder(f"{name}_floor", r * 0.9, r * 0.9, 0.04, mul(WARM, 0.55), segs=20, bevel=0, at=(0, 0, 0.92)), mul(WARM, 0.55)))
    lit.append(glow(ball(f"{name}_lamp", 0.25, (0, 0, 0.9 + r * 0.75)), C("#fff0d0")))
    door = block(f"{name}_door", 1.1, 1.0, 1.7, HULL, bevel=0.08, at=(0, -r - 0.35, 0))
    parts.append(door)
    lit.append(glow(block(f"{name}_doorlight", 0.5, 0.06, 0.9, mix(TEAL, C("#ffffff"), 0.4), bevel=0, at=(0, -r - 0.86, 0.3))))
    parts.append(metal(cylinder(f"{name}_mast", 0.04, 0.03, 1.6, STEEL, segs=6, bevel=0, at=(r * 0.3, r * 0.2, 0.9 + r * 0.92))))
    lit.append(glow(ball(f"{name}_tip", 0.07, (r * 0.3, r * 0.2, 2.55 + r * 0.92)), C("#ff3a3a")))
    ob = join(parts + lit, name)
    ob["col"] = r * 1.05
    return ob


def tube(name, length, r=0.55):
    """A pressurised corridor along +x, ribbed, with a strip of portholes."""
    parts = [cylinder(f"{name}_tube", r, r, length, HULL, segs=14, bevel=0, axis="X", at=(0, 0, r + 0.15))]
    lit = []
    n = max(2, int(length / 1.2))
    for k in range(n + 1):
        x = -length / 2 + k * length / n
        parts.append(metal(cylinder(f"{name}_rib{k}", r + 0.06, r + 0.06, 0.12, STEEL, segs=14, bevel=0.01, axis="X", at=(x, 0, r + 0.15))))
        if k < n:
            lit.append(glow(ball(f"{name}_port{k}", 0.12, (x + length / n / 2, -r, r + 0.25), squash=(1, 0.4, 1)), WARM))
    return join(parts + lit, name)


def comms_dish(name="dish"):
    """A big comms dish on a lattice mast (the dish is its own part, so the
    runtime can slew it)."""
    root = bpy.data.objects.new(name, None)
    bpy.context.scene.collection.objects.link(root)
    root["role"] = "anim"
    mast = [cylinder(f"{name}_foot", 1.0, 1.2, 0.5, STEEL, segs=10, bevel=0.03)]
    for k in range(3):
        a = k / 3 * math.tau
        mast.append(beam(f"{name}_leg{k}", (math.cos(a) * 0.9, math.sin(a) * 0.9, 0.4), (0, 0, 3.6), 0.12, HULL_D))
    for z in (1.4, 2.5):
        f = 1 - z / 3.6
        for k in range(3):
            a0, a1 = k / 3 * math.tau, (k + 1) / 3 * math.tau
            mast.append(beam(f"{name}_brace{k}{int(z*10)}", (math.cos(a0) * 0.9 * f, math.sin(a0) * 0.9 * f, z), (math.cos(a1) * 0.9 * f, math.sin(a1) * 0.9 * f, z), 0.06, HULL_D))
    base = join(mast, f"{name}_mastj")
    base.parent = root
    base["role"] = "part"
    dish = [cylinder(f"{name}_bowl", 2.4, 0.4, 0.8, HULL, segs=28, bevel=0.02, at=(0, 0, 0))]
    dish[0].data.transform(Matrix.Rotation(math.pi, 4, "X"))
    dish[0].data.transform(Matrix.Translation((0, 0, 0.8)))
    paint(dish[0], lambda co, n, *_: mix(HULL_D, HULL, 0.5 + 0.5 * abs(n.z)))
    ring = [(math.cos(a / 40 * math.tau) * 2.4, math.sin(a / 40 * math.tau) * 2.4, 0.8) for a in range(41)]
    dish.append(metal(sweep(f"{name}_lip", ring, 0.07, around=5)))
    for k in range(3):
        a = k / 3 * math.tau
        dish.append(metal(beam(f"{name}_strut{k}", (math.cos(a) * 2.2, math.sin(a) * 2.2, 0.8), (0, 0, 2.3), 0.05, STEEL)))
    dish.append(glow(ball(f"{name}_feed", 0.16, (0, 0, 2.35)), C("#ff4a4a")))
    d = join(dish, f"{name}_bowlj")
    for v in d.data.vertices:
        v.co.z += 0.0
    d.data.transform(Matrix.Rotation(math.radians(-35), 4, "X"))
    d.data.transform(Matrix.Translation((0, 0, 3.7)))
    d.parent = root
    d["role"] = "part"
    root["col"] = 1.2
    return [root, base, d]


def solar_array(name="solar", panels=4):
    parts = []
    for k in range(panels):
        x = (k - (panels - 1) / 2) * 1.5
        parts.append(metal(cylinder(f"{name}_post{k}", 0.06, 0.06, 0.9, STEEL, segs=6, bevel=0, at=(x, 0, 0))))
        p = block(f"{name}_panel{k}", 1.4, 1.0, 0.05, C("#1a3a8a"), bevel=0.01, at=(0, 0, 0))
        paint_faces(p, lambda c, n, i: C("#2a5ad0") if n.z > 0.5 else C("#c8ccd4"))
        p.data.transform(Matrix.Rotation(math.radians(-30), 4, "X"))
        p.data.transform(Matrix.Translation((x, 0, 0.95)))
        parts.append(gloss(p))
        for g in range(1, 3):
            line = block(f"{name}_grid{k}{g}", 0.03, 1.0, 0.06, C("#c8ccd4"), bevel=0, at=(0, 0, 0))
            line.data.transform(Matrix.Translation((-0.7 + g * 0.47, 0, 0.005)))
            line.data.transform(Matrix.Rotation(math.radians(-30), 4, "X"))
            line.data.transform(Matrix.Translation((x, 0, 0.95)))
            parts.append(line)
    ob = join(parts, name)
    ob["col"] = 0.6
    return ob


def rover(name="rover"):
    """A six-wheeled buggy with a bubble cab and a dish (an `anim` node)."""
    root = bpy.data.objects.new(name, None)
    bpy.context.scene.collection.objects.link(root)
    root["role"] = "anim"
    parts = [block(f"{name}_chassis", 2.6, 1.3, 0.35, HULL, bevel=0.1, at=(0, 0, 0.45))]
    hazard_strip = block(f"{name}_stripe", 2.62, 1.32, 0.08, AMBER, bevel=0, at=(0, 0, 0.55))
    hazard(hazard_strip, lambda co: co.x + co.y, 0.25)
    parts.append(hazard_strip)
    parts.append(gloss(ball(f"{name}_cab", 0.62, (-0.6, 0, 0.85), squash=(1.1, 0.95, 0.75))))
    parts.append(block(f"{name}_bed", 1.1, 1.1, 0.4, HULL_D, bevel=0.05, at=(0.6, 0, 0.8)))
    for x in (-0.9, 0.0, 0.9):
        for s in (-1, 1):
            parts.append(cylinder(f"{name}_wheel{int(x*10)}{s}", 0.32, 0.32, 0.26, C("#2a2a32"), segs=12, bevel=0.03, axis="Y", at=(x, s * 0.72, 0.32)))
            parts.append(metal(cylinder(f"{name}_hub{int(x*10)}{s}", 0.13, 0.13, 0.28, HULL_D, segs=8, bevel=0, axis="Y", at=(x, s * 0.73, 0.32))))
    parts.append(metal(cylinder(f"{name}_ant", 0.02, 0.02, 1.1, STEEL, segs=5, bevel=0, at=(0.9, 0.4, 1.0))))
    lit = [glow(ball(f"{name}_hl{s}", 0.08, (-1.3, s * 0.4, 0.55)), C("#fff4d0")) for s in (-1, 1)]
    lit.append(glow(ball(f"{name}_beacon", 0.08, (0.9, 0.4, 2.1)), AMBER))
    body = join(parts + lit, f"{name}_body")
    body.parent = root
    body["role"] = "part"
    return [root, body]


def crystals(name, seed=0, col=None, count=7, size=1.0):
    """A cluster of glowing hexagonal crystals."""
    rnd = random.Random(seed)
    col = col or VIOLET
    parts = [ball(f"{name}_rock", 0.5 * size, (0, 0, -0.1), col=mul(REGOLITH, 0.7), subdiv=1, squash=(1.3, 1.1, 0.5))]
    lit = []
    for k in range(count):
        h = (0.5 + rnd.random() * 1.2) * size
        r = (0.09 + rnd.random() * 0.08) * size
        c = cylinder(f"{name}_c{k}", r, r * 0.6, h, col, segs=6, bevel=0, flat=True)
        tip = cylinder(f"{name}_t{k}", r * 0.6, 0.01, r * 2.2, col, segs=6, bevel=0, at=(0, 0, h), flat=True)
        cr = join([c, tip], f"{name}_cr{k}")
        paint(cr, lambda co, n, *_: mix(mul(col, 0.45), mix(col, C("#ffffff"), 0.35), min(1, co.z / (h + 0.01))))
        cr.data.transform(Matrix.Rotation(rnd.uniform(-0.6, 0.6), 4, "X"))
        cr.data.transform(Matrix.Rotation(rnd.uniform(-0.6, 0.6), 4, "Y"))
        cr.data.transform(Matrix.Translation((rnd.uniform(-0.3, 0.3) * size, rnd.uniform(-0.3, 0.3) * size, 0)))
        lit.append(glow(cr))
    ob = join(parts + lit, name)
    ob["col"] = 0.6 * size
    return ob


def fuel_tank(name="tank"):
    parts = [cylinder(f"{name}_body", 0.75, 0.75, 3.2, HULL, segs=18, bevel=0.06, axis="X", at=(0, 0, 1.05))]
    for s in (-1, 1):
        parts.append(ball(f"{name}_cap{s}", 0.75, (s * 1.6, 0, 1.05), col=HULL, squash=(0.45, 1, 1)))
        parts.append(block(f"{name}_cradle{s}", 0.3, 1.5, 0.5, STEEL, bevel=0.04, at=(s * 0.9, 0, 0)))
    band = cylinder(f"{name}_band", 0.77, 0.77, 0.4, AMBER, segs=18, bevel=0, axis="X", at=(0, 0, 1.05))
    hazard(band, lambda co: math.atan2(co.z - 1.05, co.y) * 0.77, 0.3)
    parts.append(band)
    ob = join(parts, name)
    ob["col"] = 1.0
    return ob


def container(name, col, seed=0):
    parts = [block(f"{name}_box", 2.4, 1.2, 1.2, col, bevel=0.05, seed=seed)]
    for k in range(5):
        x = -1.0 + k * 0.5
        parts.append(block(f"{name}_rib{k}", 0.06, 1.24, 1.16, mul(col, 0.8), bevel=0, at=(x, 0, 0.02)))
    parts.append(glow(block(f"{name}_tag", 0.4, 0.04, 0.12, AMBER, bevel=0, at=(0.8, -0.62, 0.95)), AMBER))
    ob = join(parts, name)
    ob["col"] = 0.9
    return ob


def lander(name="lander"):
    """A parked lander: a white capsule on four splayed legs over an engine bell."""
    parts = []
    body = cylinder(f"{name}_body", 1.1, 0.75, 1.5, HULL, segs=16, bevel=0.06, at=(0, 0, 1.4))
    paint(body, lambda co, n, *_: mix(HULL_D, HULL, 0.6 + 0.4 * max(0, n.z)))
    parts.append(body)
    parts.append(ball(f"{name}_nose", 0.75, (0, 0, 2.9), col=HULL, squash=(1, 1, 0.6)))
    parts.append(metal(cylinder(f"{name}_bell", 0.4, 0.7, 0.7, STEEL, segs=14, bevel=0.02, at=(0, 0, 0.7))))
    gold = cylinder(f"{name}_gold", 1.12, 1.12, 0.35, C("#d8a030"), segs=16, bevel=0, at=(0, 0, 1.4))
    parts.append(metal(gold))
    for k in range(4):
        a = k / 4 * math.tau + math.pi / 4
        parts.append(metal(beam(f"{name}_leg{k}", (math.cos(a) * 0.8, math.sin(a) * 0.8, 1.5), (math.cos(a) * 1.7, math.sin(a) * 1.7, 0.1), 0.08, HULL_D)))
        parts.append(cylinder(f"{name}_pad{k}", 0.25, 0.3, 0.08, STEEL, segs=10, bevel=0.01, at=(math.cos(a) * 1.7, math.sin(a) * 1.7, 0)))
    parts.append(gloss(ball(f"{name}_window", 0.22, (0, -0.85, 2.3), col=C("#1a2a3a"), squash=(1, 0.4, 1))))
    lit = [glow(ball(f"{name}_light", 0.08, (0.6, -0.6, 2.75)), C("#3aff6a"))]
    ob = join(parts + lit, name)
    ob["col"] = 1.6
    return ob


def beacon_mast(name="beacon", h=7.0):
    parts = [cylinder(f"{name}_foot", 0.5, 0.6, 0.4, STEEL, segs=8, bevel=0.03)]
    parts.append(metal(cylinder(f"{name}_pole", 0.1, 0.06, h, HULL_D, segs=8, bevel=0)))
    for z in (h * 0.4, h * 0.7):
        parts.append(block(f"{name}_flag{int(z)}", 0.04, 0.6, 0.35, AMBER, bevel=0, at=(0, -0.3, z)))
    parts.append(glow(ball(f"{name}_lamp", 0.16, (0, 0, h + 0.1)), C("#ff3a3a")))
    ob = join(parts, name)
    ob["col"] = 0.4
    return ob


def ore_pile(name="ore"):
    """The gorillas' quarry here: a heap of space rock shot with crystal."""
    from rocks import boulder
    pal = dict(rock=C("#8a8298"), rock_dark=C("#4a4458"))
    parts = []
    for k in range(5):
        a = k / 5 * math.tau + 0.4
        b = boulder(f"{name}_chunk{k}", 50 + k, size=0.4 + (k % 2) * 0.15, squash=0.7, moss=False, facets=9, pal=pal)
        b.data.transform(Matrix.Translation((math.cos(a) * 0.45, math.sin(a) * 0.45, 0)))
        parts.append(b)
    parts.append(crystals(f"{name}_cr", seed=7, col=VIOLET, count=4, size=0.6))
    ob = join(parts, name)
    ob["col"] = 0.9
    return ob


def floating_rock(name, seed, size=1.0):
    """A boulder drifting in the low gravity (an `anim` node)."""
    from rocks import boulder
    root = bpy.data.objects.new(name, None)
    bpy.context.scene.collection.objects.link(root)
    root["role"] = "anim"
    b = boulder(f"{name}_rock", seed, size=size, squash=0.85, moss=False, facets=10, pal=dict(rock=C("#9a92a8"), rock_dark=C("#4a4458")))
    b.data.transform(Matrix.Translation((0, 0, -size * 0.4)))
    b.parent = root
    b["role"] = "part"
    return [root, b]


def gas_giant(name="planet", r=40.0):
    """The ringed gas giant on the horizon: banded body, bright ring."""
    body = mesh_obj(bm_ico(1.0, 4), f"{name}_body")
    body.data.transform(Matrix.Diagonal((r, r, r * 0.94, 1)))
    bands = [C("#e8b88a"), C("#c88a6a"), C("#f0d2a8"), C("#a86a5a"), C("#e8c098")]

    def band(co, n, *_):
        z = co.z / r
        k = (z * 5.5 + 0.15 * math.sin(co.x / r * 7)) % 1
        i = int((z * 5.5 + 10) // 1) % len(bands)
        c = mix(bands[i], bands[(i + 1) % len(bands)], k)
        return mul(c, 0.4 + 0.6 * max(0.0, n.dot(Vector((0.5, -0.65, 0.55)).normalized())))
    paint(body, band)
    ring_parts = []
    for k, (r0, r1, col) in enumerate(((1.35, 1.6, C("#e8d0b0")), (1.66, 1.95, C("#c8a888")), (2.0, 2.1, C("#a89078")))):
        bm = bmesh.new()
        segs = 96
        for side in (0, 1):
            # Two sheets a hair apart (top and underside both visible).
            z = 0.02 * r * (side - 0.5)
            outer = [bm.verts.new((math.cos(a / segs * math.tau) * r1 * r, math.sin(a / segs * math.tau) * r1 * r, z)) for a in range(segs)]
            inner = [bm.verts.new((math.cos(a / segs * math.tau) * r0 * r, math.sin(a / segs * math.tau) * r0 * r, z)) for a in range(segs)]
            for a in range(segs):
                quad = (inner[a], inner[(a + 1) % segs], outer[(a + 1) % segs], outer[a])
                bm.faces.new(quad if side else quad[::-1])
        ring = mesh_obj(bm, f"{name}_ring{k}", smooth=False)
        paint_solid(ring, col)
        ring_parts.append(ring)
    rings = join(ring_parts, f"{name}_rings")
    rings.data.transform(Matrix.Rotation(math.radians(18), 4, "X"))
    rings.data.transform(Matrix.Rotation(math.radians(-12), 4, "Y"))
    ob = join([body, rings], name)
    for p in ob.data.polygons:
        p.use_smooth = True
    glow(ob)
    return ob
