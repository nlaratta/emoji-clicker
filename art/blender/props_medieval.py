"""Era II props: a castle bailey on a spring morning."""
from __future__ import annotations

import math
import random

import bmesh
import bpy
from mathutils import Matrix, Vector, noise

from kit import C, apply_mods, bm_ico, displace, join, mesh_obj, mix, mul, paint, paint_faces, paint_solid, shade_flat, sweep
from hard import (
    banner, barrel, beam, block, cone_roof, crate, crenellate, cylinder, fence, gable_roof, glow_mat, masonry,
)
from props_stone import _prism, _sector, _outline

LIME = C("#c4b69a")
LIME_D = C("#958a76")
LIME_L = C("#dccfb4")
MORTAR = C("#6f6656")
TIMBER = C("#5a3c28")
PLASTER = C("#efe6d2")
ROOF_RED = C("#b8452f")
ROOF_SLATE = C("#4f5a6e")
THATCH = C("#c9a35a")
HERALD_RED = C("#c8303a")
HERALD_BLUE = C("#2f5fb4")
HERALD_GOLD = C("#f2c24a")
WOOD = C("#8a5e3a")


def dais(name="dais_m"):
    """An octagonal limestone dais: a moulded step, fitted slabs, and a ring
    of red-and-gold heraldic tiles."""
    rnd = random.Random(4)
    parts = []
    bm = bmesh.new()
    _prism(bm, [(math.cos(a / 8 * math.tau + math.pi / 8) * 2.3, math.sin(a / 8 * math.tau + math.pi / 8) * 2.3) for a in range(8)], -0.12, 0.09)
    step = mesh_obj(bm, f"{name}_step", smooth=False)
    from kit import add_bevel
    add_bevel(step, 0.04, 1, 40, harden=False)
    apply_mods(step)
    paint_faces(step, lambda c, n, i: mul(LIME_D if n.z < 0.7 else LIME, 0.95 + rnd.random() * 0.08))
    parts.append(step)
    bm = bmesh.new()
    _prism(bm, [(math.cos(a / 8 * math.tau + math.pi / 8) * 1.98, math.sin(a / 8 * math.tau + math.pi / 8) * 1.98) for a in range(8)], 0.0, 0.165)
    grout = mesh_obj(bm, f"{name}_grout", smooth=False)
    paint_solid(grout, mul(MORTAR, 0.8))
    parts.append(grout)
    rings = [(0.0, 0.62, 1, 0.0), (0.66, 1.2, 8, 0.0), (1.24, 1.44, 16, 0.1), (1.48, 1.96, 12, 0.25)]
    for ri, (r0, r1, cnt, off) in enumerate(rings):
        for k in range(cnt):
            if r0 == 0:
                bm = bmesh.new()
                _prism(bm, _outline(10, r1, 3, 0.02), 0.0, 0.22)
            else:
                a0 = k / cnt * math.tau + off + 0.02
                a1 = (k + 1) / cnt * math.tau + off - 0.02
                bm = bmesh.new()
                _sector(bm, a0, a1, r0 + 0.015, r1 - 0.015, 0.0, 0.22 + (rnd.random() - 0.5) * 0.012, k + ri * 20)
            ob = mesh_obj(bm, f"{name}_s{ri}_{k}", smooth=False)
            add_bevel(ob, 0.025, 1, 35, harden=False)
            apply_mods(ob)
            if ri == 2:
                col = HERALD_RED if k % 2 else HERALD_GOLD
            else:
                col = mix(LIME, LIME_L, rnd.random())
            tone = 0.93 + rnd.random() * 0.1
            paint_faces(ob, lambda c, n, i, col=col, tone=tone: mul(col if n.z > 0.7 else mul(col, 0.78), tone))
            parts.append(ob)
    ob = join(parts, name)
    ob["col"] = 2.3
    ob["walk"] = 1
    return ob


def wall_segment(name, length=4.4, height=3.6, depth=1.3, seed=0):
    """A stretch of curtain wall: battered base, coursed masonry, walkway and
    merlons. Origin at the base centre, running along X."""
    parts = []
    body = block(f"{name}_body", length, depth, height, LIME, bevel=0.06, seed=seed)
    for v in body.data.vertices:
        if v.co.z < 0.6:
            v.co.y *= 1 + (0.6 - v.co.z) * 0.25  # battered foot
    masonry(body, LIME, MORTAR, course=0.6, block_w=1.1, seed=seed)
    parts.append(body)
    parts.append(crenellate(f"{name}_cren", length, depth * 0.36, 0.6, LIME_L, at=(0, -depth * 0.32, height), seed=seed))
    walk = block(f"{name}_walk", length, depth * 0.6, 0.12, LIME_D, bevel=0.02, at=(0, depth * 0.05, height - 0.05), seed=seed)
    parts.append(walk)
    return join(parts, name)


def round_tower(name, r=1.55, h=6.4, roof=ROOF_RED, flag=True, seed=0):
    parts = []
    body = cylinder(f"{name}_body", r * 1.06, r, h, LIME, segs=16, bevel=0.04, seed=seed)
    masonry(body, LIME, MORTAR, course=0.62, block_w=1.0, seed=seed)
    parts.append(body)
    # Machicolation band and corbels.
    band = cylinder(f"{name}_band", r * 1.16, r * 1.16, 0.5, LIME_L, segs=16, bevel=0.03, at=(0, 0, h - 0.1), flat=True, seed=seed)
    parts.append(band)
    for k in range(10):
        a = k / 10 * math.tau
        parts.append(block(f"{name}_cb{k}", 0.22, 0.22, 0.3, LIME_D, bevel=0.02, at=(math.cos(a) * r * 1.05, math.sin(a) * r * 1.05, h - 0.4), rot=a, seed=k))
    parts.append(cone_roof(f"{name}_roof", r * 1.12, r * 1.9, roof, segs=16, at=(0, 0, h + 0.38), seed=seed))
    # Slit windows (dark).
    for k in range(3):
        a = k * 2.1 + 0.4
        z = h * (0.35 + k * 0.18)
        slit = block(f"{name}_w{k}", 0.14, 0.12, 0.55, C("#1d1a22"), bevel=0.02, at=(math.cos(a) * r * 1.0, math.sin(a) * r * 1.0, z), rot=a)
        parts.append(slit)
    if flag:
        pole = cylinder(f"{name}_pole", 0.035, 0.03, 1.5, C("#3a2a20"), segs=6, bevel=0, at=(0, 0, h + 0.38 + r * 1.85))
        parts.append(pole)
    return join(parts, name)


def gatehouse(name="keep", seed=7):
    """A square keep-gatehouse: twin towers flanking an arched gate with a
    portcullis, a tall central block and slate roofs."""
    parts = []
    core = block(f"{name}_core", 4.6, 3.6, 8.2, LIME, bevel=0.08, seed=seed)
    masonry(core, LIME, MORTAR, course=0.62, block_w=1.15, seed=seed)
    parts.append(core)
    parts.append(crenellate(f"{name}_cren", 4.6, 0.5, 0.65, LIME_L, at=(0, -1.55, 8.2), seed=seed))
    parts.append(crenellate(f"{name}_cren2", 4.6, 0.5, 0.65, LIME_L, at=(0, 1.55, 8.2), seed=seed + 3))
    parts.append(gable_roof(f"{name}_roof", 3.6, 2.6, 2.4, ROOF_SLATE, overhang=0.1, at=(0, 0, 8.2), seed=seed))
    # Gate arch: a dark recess with a portcullis grid.
    gate = block(f"{name}_gate", 1.8, 0.3, 2.6, C("#151218"), bevel=0.02, at=(0, -1.72, 0))
    arch = cylinder(f"{name}_arch", 0.9, 0.9, 0.3, C("#151218"), segs=16, bevel=0, axis="Y", at=(0, -1.72, 2.6))
    parts += [gate, arch]
    for k in range(5):
        parts.append(block(f"{name}_pv{k}", 0.07, 0.08, 2.9, C("#3b3a40"), bevel=0.01, at=(-0.72 + k * 0.36, -1.9, 0.6)))
    for k in range(4):
        parts.append(block(f"{name}_ph{k}", 1.7, 0.08, 0.07, C("#3b3a40"), bevel=0.01, at=(0, -1.9, 0.9 + k * 0.6)))
    for s in (-1, 1):
        t = round_tower(f"{name}_t{s}", r=1.25, h=7.0, roof=ROOF_SLATE, flag=False, seed=seed + s)
        t.data.transform(Matrix.Translation((s * 2.6, -1.0, 0)))
        parts.append(t)
    # Windows with a warm interior glow.
    for k, (x, z) in enumerate([(-1.1, 5.0), (1.1, 5.0), (0, 6.6)]):
        w = block(f"{name}_win{k}", 0.42, 0.12, 0.8, C("#ffcf7a"), bevel=0.02, at=(x, -1.84, z))
        w.data.materials.clear()
        w.data.materials.append(glow_mat())
        paint_solid(w, C("#ffb44a"))
        parts.append(w)
    return join(parts, name)


def cottage(name, w=2.6, d=2.0, h=1.9, roof=THATCH, seed=0):
    """Timber-framed cottage: plaster panels between dark beams, a thick
    roof, a chimney and a lit window."""
    rnd = random.Random(seed)
    parts = []
    stone = block(f"{name}_plinth", w + 0.12, d + 0.12, 0.35, LIME_D, bevel=0.04, seed=seed)
    masonry(stone, LIME_D, MORTAR, course=0.18, block_w=0.4, seed=seed)
    parts.append(stone)
    parts.append(block(f"{name}_walls", w, d, h, PLASTER, bevel=0.03, at=(0, 0, 0.3), seed=seed))
    hw, hd = w / 2 + 0.02, d / 2 + 0.02
    for x in [-hw, -hw / 3, hw / 3, hw]:
        for y in (-hd, hd):
            parts.append(beam(f"{name}_v{len(parts)}", (x, y, 0.3), (x, y, 0.3 + h), 0.13, TIMBER))
    for y in (-hd, hd):
        for z in (0.32, 0.3 + h * 0.55, 0.3 + h):
            parts.append(beam(f"{name}_h{len(parts)}", (-hw, y, z), (hw, y, z), 0.12, TIMBER))
        parts.append(beam(f"{name}_d{len(parts)}", (-hw, y, 0.35), (-hw / 3, y, 0.3 + h * 0.52), 0.1, TIMBER))
        parts.append(beam(f"{name}_d{len(parts)}", (hw, y, 0.35), (hw / 3, y, 0.3 + h * 0.52), 0.1, TIMBER))
    for x in (-hw, hw):
        for z in (0.32, 0.3 + h):
            parts.append(beam(f"{name}_s{len(parts)}", (x, -hd, z), (x, hd, z), 0.12, TIMBER))
    # Gable ends.
    for x in (-w / 2, w / 2):
        bm = bmesh.new()
        vs = [bm.verts.new(p) for p in [(x, -d / 2, 0.3 + h), (x, d / 2, 0.3 + h), (x, 0, 0.3 + h + d * 0.62)]]
        bm.faces.new(vs)
        tri = mesh_obj(bm, f"{name}_gab{x}", smooth=False)
        sol = tri.modifiers.new("S", "SOLIDIFY")
        sol.thickness = 0.06
        apply_mods(tri)
        paint_solid(tri, PLASTER)
        parts.append(tri)
    parts.append(gable_roof(f"{name}_roof", w, d, d * 0.62, roof, overhang=0.32, thick=0.22, at=(0, 0, 0.3 + h - 0.02), courses=5, seed=seed))
    parts.append(block(f"{name}_chim", 0.42, 0.42, 1.4, LIME_D, bevel=0.03, at=(w * 0.28, d * 0.18, 0.3 + h + 0.4), seed=seed))
    door = block(f"{name}_door", 0.6, 0.08, 1.15, C("#4a2e1c"), bevel=0.02, at=(-w * 0.18, -d / 2 - 0.04, 0.33))
    parts.append(door)
    win = block(f"{name}_win", 0.46, 0.08, 0.42, C("#ffcf7a"), bevel=0.015, at=(w * 0.22, -d / 2 - 0.04, 0.3 + h * 0.62))
    win.data.materials.clear()
    win.data.materials.append(glow_mat())
    paint_solid(win, C("#ffae4a"))
    parts.append(win)
    parts.append(block(f"{name}_wsill", 0.62, 0.14, 0.06, TIMBER, bevel=0.01, at=(w * 0.22, -d / 2 - 0.06, 0.3 + h * 0.58)))
    ob = join(parts, name)
    ob["col"] = max(w, d) * 0.62
    return ob


def market_stall(name="stall", stripe=HERALD_RED, seed=2):
    rnd = random.Random(seed)
    parts = []
    for x in (-0.9, 0.9):
        for y in (-0.55, 0.55):
            parts.append(block(f"{name}_p{x}{y}", 0.1, 0.1, 1.9 if y < 0 else 1.6, WOOD, bevel=0.02, at=(x, y, 0)))
    parts.append(block(f"{name}_counter", 2.0, 0.6, 0.12, mul(WOOD, 1.1), bevel=0.02, at=(0, -0.45, 0.85)))
    parts.append(block(f"{name}_front", 2.0, 0.06, 0.8, mul(WOOD, 0.9), bevel=0.015, at=(0, -0.72, 0.05)))
    # Striped awning sloping toward the front.
    bm = bmesh.new()
    n = 8
    for k in range(n):
        x0, x1 = -1.1 + 2.2 * k / n, -1.1 + 2.2 * (k + 1) / n
        vs = [bm.verts.new(p) for p in [(x0, -0.95, 1.65), (x1, -0.95, 1.65), (x1, 0.7, 1.95), (x0, 0.7, 1.95)]]
        bm.faces.new(vs)
    aw = mesh_obj(bm, f"{name}_awn", smooth=False)
    sol = aw.modifiers.new("S", "SOLIDIFY")
    sol.thickness = 0.05
    apply_mods(aw)
    paint_faces(aw, lambda c, n_, i: stripe if int((c.x + 1.1) / (2.2 / n)) % 2 == 0 else C("#f4ede0"))
    parts.append(aw)
    # Scalloped valance.
    for k in range(n):
        x = -1.1 + 2.2 * (k + 0.5) / n
        sc = mesh_obj(bm_ico(1.0, 1), f"{name}_sc{k}")
        sc.data.transform(Matrix.Diagonal((0.13, 0.02, 0.1, 1)))
        sc.data.transform(Matrix.Translation((x, -0.97, 1.6)))
        paint_solid(sc, stripe if k % 2 == 0 else C("#f4ede0"))
        parts.append(sc)
    # Produce: apples, cabbages, loaves in little crates.
    for k, (x, col) in enumerate([(-0.6, C("#d23a2a")), (0.0, C("#7fb246")), (0.6, C("#e3a64e"))]):
        parts.append(block(f"{name}_cr{k}", 0.5, 0.42, 0.14, mul(WOOD, 0.8), bevel=0.01, at=(x, -0.45, 0.97)))
        for j in range(5):
            f = mesh_obj(bm_ico(1.0, 1), f"{name}_f{k}{j}")
            rr = 0.07 + rnd.random() * 0.02
            f.data.transform(Matrix.Diagonal((rr, rr, rr * 0.9, 1)))
            f.data.transform(Matrix.Translation((x + (j % 3 - 1) * 0.13, -0.45 + (j // 3 - 0.5) * 0.14, 1.13)))
            paint(f, lambda co, n_, i, col=col: mix(mul(col, 0.7), col, 0.5 + 0.5 * n_.z))
            parts.append(f)
    ob = join(parts, name)
    ob["col"] = 1.1
    return ob


def forge(name="forge"):
    """A smithy corner: stone hearth with glowing coals under a hood, an
    anvil on a stump, a quench barrel and racked tools."""
    parts = []
    hearth = block(f"{name}_hearth", 1.4, 1.0, 0.85, LIME_D, bevel=0.04)
    masonry(hearth, LIME_D, MORTAR, course=0.22, block_w=0.4, seed=3)
    parts.append(hearth)
    coals = mesh_obj(bm_ico(1.0, 2), f"{name}_coals", mat=glow_mat())
    coals.data.transform(Matrix.Diagonal((0.45, 0.32, 0.1, 1)))
    coals.data.transform(Matrix.Translation((0, -0.05, 0.86)))
    displace(coals, 0.03, 8, 2)
    paint(coals, lambda co, n, i: mix(C("#ff4a12"), C("#ffd06a"), max(0.0, noise.noise(co * 12)) * 1.5 + 0.2))
    parts.append(coals)
    hood = cylinder(f"{name}_hood", 0.75, 0.3, 0.9, LIME, segs=4, bevel=0.03, flat=True, at=(0, 0.1, 1.7))
    hood.data.transform(Matrix.Rotation(math.pi / 4, 4, "Z"))
    parts.append(hood)
    parts.append(block(f"{name}_flue", 0.36, 0.36, 2.2, LIME, bevel=0.03, at=(0, 0.1, 2.5)))
    for p in (hood,):
        masonry(p, LIME, MORTAR, course=0.25, block_w=0.4, seed=5)
    stump = cylinder(f"{name}_stump", 0.26, 0.28, 0.55, C("#6a4a30"), segs=10, at=(1.25, -0.55, 0))
    parts.append(stump)
    anvil = [
        block(f"{name}_av1", 0.5, 0.2, 0.12, C("#3c3d44"), bevel=0.02, at=(1.25, -0.55, 0.55)),
        block(f"{name}_av2", 0.2, 0.15, 0.12, C("#3c3d44"), bevel=0.02, at=(1.25, -0.55, 0.66)),
        block(f"{name}_av3", 0.62, 0.24, 0.12, C("#4a4b52"), bevel=0.03, at=(1.25, -0.55, 0.77)),
    ]
    horn = cylinder(f"{name}_horn", 0.1, 0.01, 0.3, C("#4a4b52"), segs=8, bevel=0, axis="X", at=(1.65, -0.55, 0.83))
    parts += anvil + [horn]
    bq = barrel(f"{name}_quench", r=0.3, h=0.7, seed=4)
    bq.data.transform(Matrix.Translation((-1.0, -0.6, 0)))
    parts.append(bq)
    water = cylinder(f"{name}_water", 0.25, 0.25, 0.02, C("#3a5a6e"), segs=12, bevel=0, at=(-1.0, -0.6, 0.66))
    parts.append(water)
    ob = join(parts, name)
    ob["col"] = 1.0
    return ob


def well(name="well"):
    parts = []
    ring = cylinder(f"{name}_ring", 0.75, 0.72, 0.8, LIME, segs=14, bevel=0.04)
    masonry(ring, LIME, MORTAR, course=0.2, block_w=0.35, seed=8)
    parts.append(ring)
    parts.append(cylinder(f"{name}_water", 0.6, 0.6, 0.02, C("#24384a"), segs=14, bevel=0, at=(0, 0, 0.62)))
    for s in (-1, 1):
        parts.append(block(f"{name}_post{s}", 0.12, 0.12, 1.7, WOOD, bevel=0.02, at=(s * 0.66, 0, 0.75)))
    parts.append(cylinder(f"{name}_axle", 0.06, 0.06, 1.5, WOOD, segs=8, bevel=0, axis="X", at=(0, 0, 2.1)))
    parts.append(gable_roof(f"{name}_roof", 1.5, 1.1, 0.55, ROOF_RED, overhang=0.12, thick=0.08, at=(0, 0, 2.38), courses=3, seed=9))
    bucket = barrel(f"{name}_bucket", r=0.14, h=0.22, seed=10)
    bucket.data.transform(Matrix.Translation((0, 0, 1.55)))
    parts.append(bucket)
    rope = cylinder(f"{name}_rope", 0.012, 0.012, 0.35, C("#c9b28a"), segs=4, bevel=0, at=(0, 0, 1.77))
    parts.append(rope)
    ob = join(parts, name)
    ob["col"] = 0.8
    return ob


def hay_bale(name, seed=0):
    rnd = random.Random(seed)
    ob = block(name, 1.0, 0.55, 0.5, THATCH, bevel=0.1, seg=2, seed=seed, flat=False)
    displace(ob, 0.015, 14, seed)

    def fn(co, n, i):
        streak = noise.noise(Vector((co.x * 1.5, co.y * 30, co.z * 30)))
        col = mix(mul(THATCH, 0.8), THATCH, 0.6 + streak * 0.5)
        if abs(co.x) > 0.25 and abs(co.x) < 0.3:
            col = C("#7a5a30")
        return mul(col, 0.95 + 0.1 * max(0.0, n.z))

    paint(ob, fn)
    ob["col"] = 0.55
    del rnd
    return ob


def training_dummy(name="dummy", seed=0):
    parts = [block(f"{name}_post", 0.14, 0.14, 1.8, WOOD, bevel=0.02)]
    sack = mesh_obj(bm_ico(1.0, 2), f"{name}_sack")
    sack.data.transform(Matrix.Diagonal((0.3, 0.26, 0.42, 1)))
    sack.data.transform(Matrix.Translation((0, 0, 1.2)))
    displace(sack, 0.02, 6, seed)
    paint(sack, lambda co, n, i: mix(C("#a88a5a"), C("#d8bf8c"), 0.5 + 0.5 * n.z))
    head = mesh_obj(bm_ico(1.0, 2), f"{name}_head")
    head.data.transform(Matrix.Diagonal((0.2, 0.2, 0.22, 1)))
    head.data.transform(Matrix.Translation((0, 0, 1.8)))
    paint(head, lambda co, n, i: mix(C("#a88a5a"), C("#d8bf8c"), 0.5 + 0.5 * n.z))
    arms = beam(f"{name}_arms", (-0.6, 0, 1.45), (0.6, 0, 1.45), 0.09, WOOD)
    shield = cylinder(f"{name}_shield", 0.3, 0.3, 0.06, HERALD_BLUE, segs=14, bevel=0.02, axis="Y", at=(-0.55, -0.12, 1.3))
    boss = cylinder(f"{name}_boss", 0.08, 0.06, 0.06, HERALD_GOLD, segs=10, bevel=0, axis="Y", at=(-0.55, -0.17, 1.3))
    parts += [sack, head, arms, shield, boss]
    ob = join(parts, name)
    ob["col"] = 0.4
    return ob


def archery_target(name="target"):
    """A straw butt on an easel, painted in concentric rings."""
    parts = []
    rings = [C("#f4ede0"), C("#1d1d24"), C("#2f5fb4"), C("#d23a3a"), C("#f2c24a")]
    for k, col in enumerate(rings):
        r = 0.6 - k * 0.12
        parts.append(cylinder(f"{name}_r{k}", r, r, 0.16 + k * 0.012, col, segs=20, bevel=0.015 if k == 0 else 0.0, axis="Y", at=(0, -k * 0.006, 1.0)))
    for s in (-1, 1):
        parts.append(beam(f"{name}_leg{s}", (s * 0.4, 0.05, 0), (s * 0.15, 0.1, 1.4), 0.08, WOOD))
    parts.append(beam(f"{name}_back", (0, 0.6, 0), (0, 0.12, 1.3), 0.08, WOOD))
    ob = join(parts, name)
    ob["col"] = 0.5
    return ob


def windmill(name="windmill"):
    """A stone tower mill. Its sail cross is a separate `anim` part."""
    parts = []
    body = cylinder(f"{name}_body", 1.5, 1.05, 5.2, PLASTER, segs=12, bevel=0.04, flat=True, seed=3)
    parts.append(body)
    parts.append(cone_roof(f"{name}_cap", 1.25, 1.6, THATCH, segs=12, at=(0, 0, 5.15), seed=2))
    parts.append(block(f"{name}_door", 0.7, 0.2, 1.3, C("#4a2e1c"), bevel=0.02, at=(0, -1.38, 0)))
    tower = join(parts, name)
    sail_parts = [cylinder(f"{name}_hub", 0.22, 0.22, 0.4, WOOD, segs=10, axis="Y", at=(0, 0, 0))]
    for k in range(4):
        a = k / 4 * math.tau
        arm = block(f"{name}_arm{k}", 0.12, 0.08, 3.2, WOOD, bevel=0.01)
        lattice = block(f"{name}_lat{k}", 0.62, 0.04, 2.5, C("#efe6d2"), bevel=0.01, at=(0.36, 0, 0.6))
        sail = join([arm, lattice], f"{name}_sail{k}")
        sail.data.transform(Matrix.Rotation(a, 4, "Y"))
        sail_parts.append(sail)
    sails = join(sail_parts, f"{name}_sails")
    return tower, sails


def dragon(name="dragon"):
    """A storybook dragon built from parts for the runtime to fly: body,
    neck+head, two wings (pivots at the shoulders) and a tail."""
    RED, RED_D, BELLY = C("#b8322a"), C("#6e1a1c"), C("#f2c27a")
    root = bpy.data.objects.new(name, None)
    bpy.context.scene.collection.objects.link(root)
    root["role"] = "anim"
    parts = []

    def scaly(ob):
        paint(ob, lambda co, n, i: BELLY if n.z < -0.45 else mix(RED_D, RED, 0.5 + 0.5 * n.z))

    body = mesh_obj(bm_ico(1.0, 3), f"{name}_body")
    body.data.transform(Matrix.Diagonal((0.55, 1.3, 0.5, 1)))
    scaly(body)
    neck_pts = [(0, -1.1 + 0, 0.15), (0, -1.6, 0.45), (0, -2.0, 0.65)]
    neck = sweep(f"{name}_neck", neck_pts, [0.3, 0.24, 0.2], around=10)
    scaly(neck)
    head = mesh_obj(bm_ico(1.0, 2), f"{name}_headm")
    head.data.transform(Matrix.Diagonal((0.28, 0.45, 0.26, 1)))
    head.data.transform(Matrix.Translation((0, -2.3, 0.72)))
    scaly(head)
    horns = []
    for s in (-1, 1):
        hn = sweep(f"{name}_horn{s}", [(s * 0.12, -2.15, 0.9), (s * 0.2, -1.95, 1.15), (s * 0.18, -1.75, 1.25)], [0.06, 0.04, 0.01], around=6)
        paint_solid(hn, C("#f2e4c6"))
        horns.append(hn)
    eyes = []
    for s in (-1, 1):
        e = mesh_obj(bm_ico(1.0, 1), f"{name}_eye{s}")
        e.data.transform(Matrix.Diagonal((0.05, 0.05, 0.05, 1)))
        e.data.transform(Matrix.Translation((s * 0.2, -2.45, 0.82)))
        paint_solid(e, C("#ffe46a"))
        eyes.append(e)
    tail_pts = [(0, 1.1, 0), (0, 1.9, -0.1), (0, 2.7, 0.1), (0, 3.4, 0.4)]
    tail = sweep(f"{name}_tail", tail_pts, [0.32, 0.22, 0.12, 0.04], around=10)
    scaly(tail)
    spade = mesh_obj(bm_ico(1.0, 1), f"{name}_spade")
    spade.data.transform(Matrix.Diagonal((0.22, 0.25, 0.04, 1)))
    spade.data.transform(Matrix.Translation((0, 3.55, 0.45)))
    paint_solid(spade, RED_D)
    core = join([body, neck, head, *horns, *eyes, tail, spade], f"{name}_core")
    core.parent = root
    core["role"] = "part"
    parts.append(core)
    for s in (-1, 1):
        bm = bmesh.new()
        # Membrane: a fan from the shoulder to three finger tips.
        sh = bm.verts.new((0, 0, 0))
        tip_co = [(s * 2.6, -0.3, 0.5), (s * 2.9, 0.6, 0.0), (s * 2.3, 1.3, -0.2), (s * 1.2, 1.2, -0.1)]
        tips = [bm.verts.new(p) for p in tip_co]
        for a, b in zip(tips, tips[1:]):
            bm.faces.new((sh, a, b) if s > 0 else (sh, b, a))
        wing = mesh_obj(bm, f"{name}_wingm{s}", smooth=False)
        sol = wing.modifiers.new("S", "SOLIDIFY")
        sol.thickness = 0.05
        apply_mods(wing)
        paint(wing, lambda co, n, i: mix(RED_D, C("#d8574a"), 0.4 + 0.4 * abs(co.x) / 3))
        bones = [sweep(f"{name}_bone{s}{k}", [(0, 0, 0), t], [0.07, 0.02], around=5) for k, t in enumerate(tip_co[:3])]
        for b in bones:
            paint_solid(b, RED_D)
        w = join([wing, *bones], f"{name}_wing{'L' if s < 0 else 'R'}")
        w.location = (s * 0.42, -0.4, 0.25)
        w.parent = root
        w["role"] = "part"
        parts.append(w)
    return [root] + parts


def poplar(name, seed, height=6.0, pal=None):
    """A columnar poplar: a narrow, tall cauliflower crown."""
    from flora import Skeleton, grow_branch, color_bark, clump_canopy, shade_puffs
    rnd = random.Random(seed)
    pal = pal or {}
    sk = Skeleton()
    root = sk.add(Vector((0, 0, -0.1)), 0.18, None)
    grow_branch(sk, rnd, root, Vector((0, 0, -0.1)), Vector((0, 0, 1)), height * 0.85, 0.16, 0.05, 5, 0.04, 0)
    trunk = sk.build(f"{name}_trunk", subdiv=1)
    color_bark(trunk, pal.get("bark0", C("#4a3a2e")), pal.get("bark1", C("#8a7a64")), seed)
    clumps = []
    for k in range(6):
        t = k / 5
        z = height * (0.25 + t * 0.68)
        r = (0.62 - abs(t - 0.4) * 0.5) * height * 0.13 + 0.25
        clumps.append((Vector(((rnd.random() - 0.5) * 0.2, (rnd.random() - 0.5) * 0.2, z)), r))
    canopy, puffs = clump_canopy(clumps, f"{name}_leaves", seed, lumpy=0.12)
    shade_puffs(canopy, puffs, pal.get("leaf2", C("#c7d66a")), pal.get("leaf1", C("#5e9a3e")), pal.get("leaf0", C("#22452e")), seed)
    canopy["sway"] = 0.8
    from kit import join as j2, set_origin_base
    ob = j2([trunk, canopy], name)
    set_origin_base(ob)
    ob.location = (0, 0, 0)
    return ob


def pavilion(name="pavilion", a=C("#2f5fb4"), b=C("#f4ede0"), seed=3):
    """A round tournament pavilion: striped walls, a peaked roof with a
    scalloped valance and a pennant pole."""
    parts = []
    r, h = 1.5, 1.6
    segs = 16
    bm = bmesh.new()
    lo = [bm.verts.new((math.cos(k / segs * math.tau) * r, math.sin(k / segs * math.tau) * r, 0)) for k in range(segs)]
    hi = [bm.verts.new((math.cos(k / segs * math.tau) * r * 0.98, math.sin(k / segs * math.tau) * r * 0.98, h)) for k in range(segs)]
    for k in range(segs):
        if k in (12,):  # the open door flap faces the camera side
            continue
        j = (k + 1) % segs
        bm.faces.new((lo[k], lo[j], hi[j], hi[k]))
    wall = mesh_obj(bm, f"{name}_wall", smooth=False)
    sol = wall.modifiers.new("S", "SOLIDIFY")
    sol.thickness = 0.04
    apply_mods(wall)
    paint_faces(wall, lambda c, n, i: a if int((math.atan2(c.y, c.x) + math.pi) / math.tau * segs) % 2 else b)
    parts.append(wall)
    inner = cylinder(f"{name}_in", r * 0.95, r * 0.95, h * 0.98, C("#2a2030"), segs=segs, bevel=0)
    parts.append(inner)
    parts.append(cone_roof(f"{name}_roof", r * 1.08, 1.5, a, segs=segs, at=(0, 0, h), bands=False, seed=seed))
    for k in range(segs):
        ang = (k + 0.5) / segs * math.tau
        sc = mesh_obj(bm_ico(1.0, 1), f"{name}_val{k}")
        sc.data.transform(Matrix.Diagonal((0.2, 0.03, 0.14, 1)))
        sc.data.transform(Matrix.Rotation(ang + math.pi / 2, 4, "Z"))
        sc.data.transform(Matrix.Translation((math.cos(ang) * r * 1.12, math.sin(ang) * r * 1.12, h - 0.02)))
        paint_solid(sc, b if k % 2 else HERALD_GOLD)
        parts.append(sc)
    parts.append(cylinder(f"{name}_pole", 0.04, 0.03, 1.2, C("#3a2a20"), segs=6, bevel=0, at=(0, 0, h + 1.4)))
    bm = bmesh.new()
    vs = [bm.verts.new(p) for p in [(0, 0, h + 2.55), (0.9, 0, h + 2.4), (0, 0, h + 2.2)]]
    bm.faces.new(vs)
    pen = mesh_obj(bm, f"{name}_pen", smooth=False)
    sol = pen.modifiers.new("S", "SOLIDIFY")
    sol.thickness = 0.02
    apply_mods(pen)
    paint_solid(pen, HERALD_RED)
    parts.append(pen)
    ob = join(parts, name)
    ob["col"] = 1.6
    return ob


def paving(name="paving", r0=2.32, r1=3.4, path_to=-14.0, seed=5):
    """Flagstones: a ring round the dais and a road to the gate (toward -z)."""
    from props_stone import _sector as sector
    rnd = random.Random(seed)
    parts = []
    tones = [C("#a69b88"), C("#8f8676"), C("#b8ad98"), C("#9b917f")]
    k = 0
    for ring, (ra, rb, cnt) in enumerate([(r0, (r0 + r1) / 2, 18), ((r0 + r1) / 2, r1, 22)]):
        for i in range(cnt):
            a0 = i / cnt * math.tau + ring * 0.13 + 0.025
            a1 = (i + 1) / cnt * math.tau + ring * 0.13 - 0.025
            bm = bmesh.new()
            sector(bm, a0, a1, ra + 0.025, rb - 0.025, -0.1, 0.035 + rnd.random() * 0.012, k)
            ob = mesh_obj(bm, f"{name}_{k}", smooth=False)
            from kit import add_bevel
            add_bevel(ob, 0.02, 1, 35, harden=False)
            apply_mods(ob)
            t = tones[rnd.randrange(len(tones))]
            paint_faces(ob, lambda c, n, i, t=t: t if n.z > 0.7 else mul(t, 0.75))
            parts.append(ob)
            k += 1
    # Road: staggered rectangular slabs (Blender -Y is toward the camera, so the gate is +Y).
    y = r1 + 0.1
    row = 0
    while y < -path_to:
        w_total = 2.2
        n = 3 if row % 2 else 2
        x = -w_total / 2
        for j in range(n):
            w = w_total / n
            ob = block(f"{name}_p{k}", w - 0.06, 0.62, 0.12, tones[rnd.randrange(len(tones))], bevel=0.02, at=(x + w / 2, y + 0.33, -0.08 + rnd.random() * 0.012))
            parts.append(ob)
            k += 1
            x += w
        y += 0.68
        row += 1
    return join(parts, name)
