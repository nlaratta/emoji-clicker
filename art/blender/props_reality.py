"""Era VII props: reality has come apart. A floating island in a pastel
void, made of fragments of every earlier era: a patchwork dais, a portal
arch, stairs that loop, a melting clock, crystals and glitch cubes."""
from __future__ import annotations

import math
import random

import bmesh
import bpy
from mathutils import Matrix, Vector, noise

from kit import C, add_bevel, apply_mods, bm_ico, join, mesh_obj, mix, mul, paint, paint_faces, paint_solid, sweep, vtx_material
from hard import block, cylinder, glow_mat, metal_mat
from props_stone import _prism, _sector

MINT = C("#6affd8")
LILAC = C("#c89aff")
PEACH = C("#ffb89a")
PINK = C("#ff7ad8")
CREAM = C("#f4ecdc")
INDIGO = C("#2a2050")
TURF = C("#9ad8b0")
TURF_D = C("#5aa088")
CLIFF = C("#b8a0d0")
CLIFF_D = C("#6a5a8a")


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


# ───────────────────────────────────────────── the dais
ERA_FLOORS = [
    # (top colour, side colour, accent) per era, in order round the dais.
    (C("#c8a878"), C("#8a6a48"), None),            # I   sandstone pavers
    (C("#b8b4aa"), C("#7a766e"), C("#c8402e")),    # II  flagstone + herald red
    (C("#6a5a4a"), C("#3a3230"), C("#d8a040")),    # III iron plate + brass
    (C("#74767f"), C("#4e5058"), C("#f2c230")),    # IV  concrete + road yellow
    (C("#262634"), C("#1a1a24"), C("#3af0ff")),    # V   wet slate + neon
    (C("#e4e6ec"), C("#9aa0ae"), C("#ffb02a")),    # VI  white deck + hazard
]


def patch_dais(name="patchwork"):
    """The star's platform, pieced together from every era's floor: six
    sectors at slightly different heights, drifting apart at the seams."""
    parts, lit = [], []
    for k, (top, side, accent) in enumerate(ERA_FLOORS):
        a0 = k / 6 * math.tau + 0.04
        a1 = (k + 1) / 6 * math.tau - 0.04
        z1 = 0.16 + (k % 3) * 0.035
        bm = bmesh.new()
        _sector(bm, a0, a1, 0.25, 2.35, -0.25 - k * 0.02, z1, seed=k, segs=8)
        sec = mesh_obj(bm, f"{name}_s{k}", smooth=False)
        add_bevel(sec, 0.04, 1, 40, harden=False)
        apply_mods(sec)
        paint_faces(sec, lambda c, n, i, top=top, side=side: top if n.z > 0.7 else side)
        if k == 4:
            gloss(sec)
        elif k in (2, 5):
            metal(sec)
        parts.append(sec)
        if accent is not None:
            am = (a0 + a1) / 2
            strip = block(f"{name}_acc{k}", 0.08, 1.5, 0.02, accent, bevel=0, at=(0, -1.3, z1 + 0.001))
            strip.data.transform(Matrix.Rotation(am + math.pi / 2, 4, "Z"))
            if k == 4:
                lit.append(glow(strip, accent))
            else:
                parts.append(strip)
    # A mint seam of light where reality is held together.
    ring = [(math.cos(a / 72 * math.tau) * 2.42, math.sin(a / 72 * math.tau) * 2.42, 0.05) for a in range(73)]
    lit.append(glow(sweep(f"{name}_seam", ring, 0.05, around=6), MINT))
    ob = join(parts + lit, name)
    ob["col"] = 2.4
    ob["walk"] = 1
    return ob


# ───────────────────────────────────────────── islands
def island(name, r=4.0, depth=6.0, seed=0, top=None, rock=None):
    """A floating island: a grassy, gently domed top and a rocky underside
    tapering to a point, banded in pastel strata. Origin at the top centre."""
    rnd = random.Random(seed)
    top = top or TURF
    rock = rock or CLIFF
    segs, rings = 28, 9
    bm = bmesh.new()
    rows = []
    for i in range(rings + 1):
        t = i / rings
        # Radius shrinks with depth; the profile bulges a little near the top.
        rr = r * (1 - t) ** 0.75 * (1 + 0.12 * math.sin(t * math.pi))
        z = -depth * t ** 1.3
        row = []
        for k in range(segs):
            a = k / segs * math.tau
            wob = 1 + noise.noise(Vector((math.cos(a) * 1.7, math.sin(a) * 1.7, seed + t * 3))) * 0.22
            if i == rings:
                row = [bm.verts.new((rnd.uniform(-0.2, 0.2) * r, rnd.uniform(-0.2, 0.2) * r, z))]
                break
            row.append(bm.verts.new((math.cos(a) * rr * wob, math.sin(a) * rr * wob, z)))
        rows.append(row)
    centre = bm.verts.new((0, 0, 0.25 * r * 0.12))
    for k in range(segs):
        bm.faces.new((rows[0][k], rows[0][(k + 1) % segs], centre))
    for i in range(rings):
        a_row, b_row = rows[i], rows[i + 1]
        for k in range(segs):
            if len(b_row) == 1:
                bm.faces.new((a_row[(k + 1) % segs], a_row[k], b_row[0]))
            else:
                bm.faces.new((a_row[(k + 1) % segs], a_row[k], b_row[k], b_row[(k + 1) % segs]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    ob = mesh_obj(bm, name, smooth=False)

    def col(co, n, *_):
        if n.z > 0.55 and co.z > -0.3:
            return mix(TURF_D, top, 0.5 + 0.5 * noise.noise(co * 0.8))
        band = 0.5 + 0.5 * math.sin(co.z * 2.2 + noise.noise(co * 0.6) * 1.5)
        return mix(mul(rock, 0.65), rock, band) if co.z > -depth * 0.6 else mix(CLIFF_D, mul(rock, 0.7), band)
    paint_faces(ob, col)
    return ob


# ───────────────────────────────────────────── set pieces
def portal_arch(name="portal"):
    """A cream stone arch on a stepped plinth; the doorway holds a glowing
    gradient (the runtime swirls a second layer over it)."""
    parts, lit = [], []
    parts.append(block(f"{name}_step0", 5.2, 1.8, 0.3, CREAM, bevel=0.05))
    parts.append(block(f"{name}_step1", 4.6, 1.4, 0.3, mul(CREAM, 0.92), bevel=0.05, at=(0, 0, 0.3)))
    for s in (-1, 1):
        parts.append(block(f"{name}_jamb{s}", 0.7, 0.8, 3.6, CREAM, bevel=0.06, at=(s * 1.85, 0, 0.6)))
    arch = [(math.cos(a / 24 * math.pi) * 1.85, 0, 4.2 + math.sin(a / 24 * math.pi) * 1.85) for a in range(25)]
    ring = sweep(f"{name}_arch", arch, 0.38, around=8)
    paint_solid(ring, CREAM)
    parts.append(ring)
    key = block(f"{name}_key", 0.55, 0.9, 0.7, PEACH, bevel=0.06, at=(0, 0, 5.75))
    parts.append(key)
    # The doorway: a disc-topped slab of light, mint at the edge to pink at the centre.
    bm = bmesh.new()
    pts = [(-1.5, 0.6)] + [(math.cos(math.pi - a / 16 * math.pi) * 1.5, 4.2 + math.sin(math.pi - a / 16 * math.pi) * 1.5) for a in range(17)] + [(1.5, 0.6)]
    for y, flip in ((-0.05, False), (0.05, True)):
        vs = [bm.verts.new((x, y, z)) for x, z in pts]
        bm.faces.new(vs[::-1] if flip else vs)
    door = mesh_obj(bm, f"{name}_door", smooth=False)
    paint(door, lambda co, n, *_: mix(PINK, MINT, min(1, math.hypot(co.x / 1.5, (co.z - 3.0) / 2.4))))
    lit.append(glow(door))
    ob = join(parts + lit, name)
    ob["col"] = 2.0
    return ob


def penrose_stairs(name="stairs", r=1.9, steps=28, turns=1.6):
    """Stairs to nowhere: slabs spiralling up round a slender pillar, held
    up by nothing at all, ending at a door-less landing."""
    parts = []
    cols = [PEACH, LILAC, MINT, C("#ffd88a")]
    rise = 0.24
    for s_ in range(steps):
        a = s_ / steps * turns * math.tau
        z = s_ * rise
        slab = block(f"{name}_{s_}", 1.1, 0.5, 0.18, cols[(s_ // 4) % 4], bevel=0.03, seed=s_)
        slab.data.transform(Matrix.Translation((r - 0.15, 0, z)))
        slab.data.transform(Matrix.Rotation(a, 4, "Z"))
        parts.append(slab)
    top = steps * rise
    parts.append(cylinder(f"{name}_pillar", 0.55, 0.65, top + 0.3, CREAM, segs=14, bevel=0.04))
    parts.append(cylinder(f"{name}_landing", 1.0, 1.0, 0.2, PEACH, segs=16, bevel=0.04, at=(0, 0, top + 0.3)))
    parts.append(cylinder(f"{name}_foot", 1.1, 1.3, 0.25, LILAC, segs=16, bevel=0.04))
    ob = join(parts, name)
    ob["col"] = r + 0.5
    return ob


def tile_ring(name="tiles", r0=2.62, r1=4.5, rings=2, per=22, seed=5):
    """Pastel paving round the dais: two courses of fitted sector stones."""
    rnd = random.Random(seed)
    cols = [CREAM, mix(LILAC, CREAM, 0.45), mix(PEACH, CREAM, 0.4), mix(MINT, CREAM, 0.55)]
    parts = []
    for i in range(rings):
        ra = r0 + (r1 - r0) * i / rings
        rb = r0 + (r1 - r0) * (i + 1) / rings - 0.06
        n = per + i * 6
        off = rnd.random()
        for k in range(n):
            a0 = (k + off) / n * math.tau + 0.012
            a1 = (k + 1 + off) / n * math.tau - 0.012
            bm = bmesh.new()
            _sector(bm, a0, a1, ra, rb, -0.1, 0.03 + rnd.uniform(-0.01, 0.02), seed=k + i * 50, segs=3)
            t = mesh_obj(bm, f"{name}_{i}_{k}", smooth=False)
            c = cols[(k + i) % 4]
            paint_faces(t, lambda cc, n_, j, c=c: c if n_.z > 0.7 else mul(c, 0.75))
            parts.append(t)
    return join(parts, name)


def melting_clock(name="clock", r=1.2):
    """A pocket watch drooped over the edge of a cube: the face is a disc
    bent down past the edge, with hands and hour marks."""
    parts = [block(f"{name}_cube", 1.8, 1.8, 1.6, LILAC, bevel=0.08)]
    edge_x = 0.9
    bm = bmesh.new()
    segs, rings = 32, 8
    rows = []
    for i in range(rings + 1):
        rr = r * i / rings
        rows.append([bm.verts.new((math.cos(a / segs * math.tau) * rr, math.sin(a / segs * math.tau) * rr, 0)) for a in range(segs)] if i else [bm.verts.new((0, 0, 0))])
    for i in range(rings):
        for k in range(segs):
            if i == 0:
                bm.faces.new((rows[0][0], rows[1][k], rows[1][(k + 1) % segs]))
            else:
                bm.faces.new((rows[i][k], rows[i + 1][k], rows[i + 1][(k + 1) % segs], rows[i][(k + 1) % segs]))
    face = mesh_obj(bm, f"{name}_face", smooth=True)
    sol = face.modifiers.new("S", "SOLIDIFY")
    sol.thickness = 0.1
    apply_mods(face)
    marks = []
    for k in range(12):
        a = k / 12 * math.tau
        m = block(f"{name}_m{k}", 0.05, 0.16, 0.02, INDIGO, bevel=0, at=(math.cos(a) * r * 0.8, math.sin(a) * r * 0.8, 0.0))
        m.data.transform(Matrix.Translation((0, 0, 0)))
        marks.append(m)
    hands = [block(f"{name}_h0", 0.06, r * 0.7, 0.03, INDIGO, bevel=0, at=(0, r * 0.32, 0.0)),
             block(f"{name}_h1", r * 0.5, 0.07, 0.03, INDIGO, bevel=0, at=(r * 0.22, 0, 0.0))]
    rim = sweep(f"{name}_rim", [(math.cos(a / 48 * math.tau) * r, math.sin(a / 48 * math.tau) * r, 0.05) for a in range(49)], 0.07, around=6)
    paint_solid(rim, C("#e8c060"))
    paint_solid(face, CREAM)
    dial = join([face, rim] + marks + hands, f"{name}_dial")
    # Lay it on the cube top, then droop everything past the edge.
    dial.data.transform(Matrix.Translation((0.25, 0, 1.66)))
    for v in dial.data.vertices:
        over = v.co.x - edge_x
        if over > 0:
            # Bend down round the edge like soft cheese.
            ang = min(math.pi / 2, over / 0.55)
            rad = 0.55
            v.co.x = edge_x + math.sin(ang) * rad + max(0, over - rad * math.pi / 2) * 0.0
            v.co.z = v.co.z - (1 - math.cos(ang)) * rad - max(0, over - rad * math.pi / 2)
    metal(dial)
    parts.append(dial)
    ob = join(parts, name)
    ob["col"] = 1.3
    return ob


def glitch_cube(name, col, s=0.5):
    """A cube of solid light with a dark core peeking through its faces."""
    outer = block(f"{name}_o", s, s, s, col, bevel=0.0)
    glow(outer, col)
    return outer


def crystal_spire(name, col, seed=0, h=3.0):
    """A tall pastel crystal with satellites at its foot."""
    rnd = random.Random(seed)
    parts = []
    for k in range(5):
        hh = h * (1.0 if k == 0 else rnd.uniform(0.25, 0.5))
        r = (0.35 if k == 0 else rnd.uniform(0.12, 0.2))
        c = cylinder(f"{name}_c{k}", r, r * 0.75, hh, col, segs=6, bevel=0, flat=True)
        t = cylinder(f"{name}_t{k}", r * 0.75, 0.01, r * 2.4, col, segs=6, bevel=0, at=(0, 0, hh), flat=True)
        cr = join([c, t], f"{name}_cr{k}")
        paint(cr, lambda co, n, *_, hh=hh: mix(mul(col, 0.55), mix(col, C("#ffffff"), 0.45), min(1, co.z / (hh + 0.01))))
        if k:
            cr.data.transform(Matrix.Rotation(rnd.uniform(-0.7, 0.7), 4, "X"))
            cr.data.transform(Matrix.Rotation(rnd.uniform(-0.7, 0.7), 4, "Y"))
            a = rnd.random() * math.tau
            cr.data.transform(Matrix.Translation((math.cos(a) * 0.45, math.sin(a) * 0.45, 0)))
        parts.append(glow(cr))
    ob = join(parts, name)
    ob["col"] = 0.6
    return ob


def fragment_pile(name="fragments"):
    """The gorillas' quarry here: a heap of every era's rubble."""
    from rocks import boulder
    parts = []
    for k, (pal, x, y) in enumerate(((dict(rock=C("#9b8f84"), rock_dark=C("#5b504c")), 0.4, 0.1),
                                     (dict(rock=C("#c8c4ba"), rock_dark=C("#7a766e")), -0.35, 0.25),
                                     (dict(rock=C("#9a92a8"), rock_dark=C("#4a4458")), 0.0, -0.4))):
        b = boulder(f"{name}_r{k}", 80 + k, size=0.45, squash=0.7, moss=False, facets=9, pal=pal)
        b.data.transform(Matrix.Translation((x, y, 0)))
        parts.append(b)
    col = cylinder(f"{name}_column", 0.22, 0.22, 1.1, CREAM, segs=10, bevel=0.03, axis="X", at=(0.1, 0.45, 0.22))
    parts.append(col)
    gear = cylinder(f"{name}_gear", 0.35, 0.35, 0.1, C("#d8a040"), segs=12, bevel=0.01, at=(-0.45, -0.3, 0.45))
    gear.data.transform(Matrix.Rotation(0.5, 4, "X"))
    parts.append(metal(gear))
    tubeg = cylinder(f"{name}_neon", 0.05, 0.05, 0.9, MINT, segs=6, bevel=0, axis="X", at=(0.25, -0.2, 0.55))
    parts.append(glow(tubeg, MINT))
    ob = join(parts, name)
    ob["col"] = 0.9
    return ob


def tea_table(name="tea"):
    """A tea party that has been going on since the Stone Age: a round table,
    a teapot, cups and two cushioned stools."""
    parts = [cylinder(f"{name}_top", 0.75, 0.75, 0.08, CREAM, segs=20, bevel=0.02, at=(0, 0, 0.7))]
    parts.append(cylinder(f"{name}_leg", 0.08, 0.14, 0.7, LILAC, segs=10, bevel=0.01))
    cloth = cylinder(f"{name}_cloth", 0.78, 0.8, 0.14, PINK, segs=20, bevel=0, at=(0, 0, 0.64))
    parts.append(cloth)
    pot = mesh_obj(bm_ico(1.0, 2), f"{name}_pot")
    pot.data.transform(Matrix.Diagonal((0.22, 0.22, 0.18, 1)))
    pot.data.transform(Matrix.Translation((0.1, 0.05, 0.95)))
    paint_solid(pot, MINT)
    spout = sweep(f"{name}_spout", [(0.3, 0.05, 0.92), (0.42, 0.05, 1.0), (0.5, 0.05, 1.1)], [0.05, 0.04, 0.03], around=6)
    paint_solid(spout, MINT)
    lid = cylinder(f"{name}_lid", 0.08, 0.02, 0.08, PEACH, segs=8, bevel=0, at=(0.1, 0.05, 1.12))
    parts += [gloss(pot), gloss(spout), lid]
    for k, (x, y) in enumerate(((-0.35, -0.25), (-0.25, 0.35))):
        parts.append(gloss(cylinder(f"{name}_cup{k}", 0.08, 0.06, 0.1, CREAM, segs=10, bevel=0.01, at=(x, y, 0.78))))
    for k, (x, y) in enumerate(((0, -1.1), (0, 1.1))):
        parts.append(cylinder(f"{name}_stool{k}", 0.3, 0.3, 0.45, PEACH, segs=14, bevel=0.06, at=(x, y, 0)))
    ob = join(parts, name)
    ob["col"] = 0.9
    return ob


def anim_root(name, objs, role_part=True):
    """Wrap objects (joined) under an `anim` empty."""
    root = bpy.data.objects.new(name, None)
    bpy.context.scene.collection.objects.link(root)
    root["role"] = "anim"
    body = join(objs, f"{name}_body") if len(objs) > 1 else objs[0]
    body.name = f"{name}_body"
    body.parent = root
    body["role"] = "part"
    return [root, body]
