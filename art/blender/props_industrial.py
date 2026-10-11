"""Era III props: a smoggy amber factory yard."""
from __future__ import annotations

import math
import random

import bmesh
import bpy
from mathutils import Matrix, Vector, noise

from kit import C, add_bevel, apply_mods, bm_ico, displace, join, mesh_obj, mix, mul, paint, paint_faces, paint_solid, sweep, vtx_material
from hard import barrel, beam, block, crate, cylinder, gable_roof, glow_mat, masonry, metal_mat
from props_stone import _outline, _prism, _sector
from rocks import boulder

BRICK = C("#a24a32")
BRICK_D = C("#6e2e22")
MORTAR = C("#5a4a42")
IRON = C("#3d3c42")
IRON_L = C("#5c5b64")
BRASS = C("#c9963e")
COPPER = C("#b5683e")
SOOT = C("#2a2624")
CINDER = C("#5a4c42")
WOOD = C("#7a5636")
WINDOW = C("#ffb050")


def metal(ob):
    ob.data.materials.clear()
    ob.data.materials.append(metal_mat())
    return ob


def glow(ob, col=WINDOW):
    ob.data.materials.clear()
    ob.data.materials.append(glow_mat())
    paint_solid(ob, col)
    return ob


def rivets(name, ring_r, z, count, col=BRASS, r=0.035):
    parts = []
    for k in range(count):
        a = k / count * math.tau
        b = mesh_obj(bm_ico(1.0, 1), f"{name}_{k}")
        b.data.transform(Matrix.Diagonal((r, r, r * 0.7, 1)))
        b.data.transform(Matrix.Translation((math.cos(a) * ring_r, math.sin(a) * ring_r, z)))
        paint_solid(b, col)
        parts.append(metal(b))
    return join(parts, name)


def dais(name="dais_i"):
    """A cast-iron turntable: brick plinth, iron deck plates with brass seams
    and a ring of rivets. Top at y = 0.22."""
    rnd = random.Random(3)
    parts = []
    bm = bmesh.new()
    _prism(bm, _outline(24, 2.32, 2, 0.01), -0.14, 0.06)
    plinth = mesh_obj(bm, f"{name}_plinth", smooth=False)
    add_bevel(plinth, 0.03, 1, 40, harden=False)
    apply_mods(plinth)
    masonry(plinth, BRICK, MORTAR, course=0.1, block_w=0.32, seed=4, vertical=False)
    parts.append(plinth)
    ring = [(math.cos(a / 48 * math.tau) * 1.98, math.sin(a / 48 * math.tau) * 1.98, 0.17) for a in range(49)]
    rim = sweep(f"{name}_rim", ring, 0.09, around=8)
    paint(rim, lambda co, n, i: mix(mul(BRASS, 0.7), BRASS, 0.5 + 0.5 * n.z))
    parts.append(metal(rim))
    for k in range(8):
        a0 = k / 8 * math.tau + 0.015
        a1 = (k + 1) / 8 * math.tau - 0.015
        bm = bmesh.new()
        _sector(bm, a0, a1, 0.55, 1.92, 0.05, 0.22, k)
        plate = mesh_obj(bm, f"{name}_pl{k}", smooth=False)
        add_bevel(plate, 0.02, 1, 35, harden=False)
        apply_mods(plate)
        t = 0.9 + rnd.random() * 0.15
        paint_faces(plate, lambda c, n, i, t=t: mul(IRON_L if n.z > 0.7 else IRON, t))
        parts.append(metal(plate))
    hub = cylinder(f"{name}_hub", 0.55, 0.55, 0.2, BRASS, segs=24, bevel=0.03, at=(0, 0, 0.04))
    parts.append(metal(hub))
    parts.append(rivets(f"{name}_rv", 1.86, 0.225, 32))
    parts.append(rivets(f"{name}_rv2", 0.62, 0.225, 12))
    ob = join(parts, name)
    ob["col"] = 2.3
    ob["walk"] = 1
    return ob


def gear(name, r=1.0, teeth=12, depth=0.25, col=BRASS):
    """A chunky spur gear (axis along local Y), as an `anim`-ready object."""
    shape = []
    inner = r * 0.82
    for i in range(teeth * 4):
        a = i / (teeth * 4) * math.tau
        rr = r if (i % 4) in (1, 2) else inner
        shape.append((math.cos(a) * rr, math.sin(a) * rr))
    bm = bmesh.new()
    _prism(bm, shape, -depth / 2, depth / 2)
    ob = mesh_obj(bm, name, smooth=False)
    add_bevel(ob, 0.02, 1, 35, harden=False)
    apply_mods(ob)
    paint_faces(ob, lambda c, n, i: mul(col, 0.8 if abs(n.z) < 0.5 else 1.0))
    hub = cylinder(f"{name}_hub", r * 0.28, r * 0.28, depth * 1.6, mul(col, 0.7), segs=12, bevel=0.02, at=(0, 0, -depth * 0.8))
    spokes = [block(f"{name}_sp{k}", r * 1.4, r * 0.12, depth * 0.8, mul(col, 0.85), bevel=0.01, at=(0, 0, -depth * 0.4), rot=k * math.pi / 3) for k in range(3)]
    g = join([ob, hub, *spokes], name)
    g.data.transform(Matrix.Rotation(math.pi / 2, 4, "X"))
    return metal(g)


def factory_shed(name, w=8.0, d=5.0, h=4.2, teeth=3, seed=0):
    """A brick shed with a sawtooth roof, arched lit windows and a door."""
    rnd = random.Random(seed)
    parts = []
    body = block(f"{name}_body", w, d, h, BRICK, bevel=0.06, seed=seed)
    masonry(body, BRICK, MORTAR, course=0.36, block_w=0.7, seed=seed)
    parts.append(body)
    parts.append(block(f"{name}_cornice", w + 0.25, d + 0.25, 0.25, BRICK_D, bevel=0.04, at=(0, 0, h - 0.05)))
    tw = w / teeth
    for k in range(teeth):
        x0 = -w / 2 + k * tw
        bm = bmesh.new()
        hd = d / 2 + 0.15
        pts = [(x0, -hd, h + 0.2), (x0 + tw, -hd, h + 0.2), (x0 + tw, -hd, h + 1.5), (x0, hd, h + 0.2), (x0 + tw, hd, h + 0.2), (x0 + tw, hd, h + 1.5)]
        vs = [bm.verts.new(p) for p in pts]
        bm.faces.new((vs[0], vs[1], vs[2]))
        bm.faces.new((vs[5], vs[4], vs[3]))
        bm.faces.new((vs[0], vs[3], vs[4], vs[1]))
        bm.faces.new((vs[1], vs[4], vs[5], vs[2]))
        bm.faces.new((vs[2], vs[5], vs[3], vs[0]))
        bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
        tooth = mesh_obj(bm, f"{name}_t{k}", smooth=False)
        paint_faces(tooth, lambda c, n, i: C("#4e5058") if n.z > 0.2 else (WINDOW if n.x > 0.7 else C("#3a3b42")))
        # The vertical face of each tooth is glazed: make it glow.
        parts.append(tooth)
        glass = block(f"{name}_g{k}", 0.06, d * 0.92, 1.0, WINDOW, bevel=0, at=(x0 + tw - 0.02, 0, h + 0.3))
        parts.append(glow(glass, C("#ffbe6a")))
    for k in range(int(w / 1.6)):
        x = -w / 2 + 0.8 + k * 1.6
        win = block(f"{name}_w{k}", 0.8, 0.1, 1.5, WINDOW, bevel=0.02, at=(x, -d / 2 - 0.03, 1.4))
        arch = cylinder(f"{name}_a{k}", 0.4, 0.4, 0.1, WINDOW, segs=12, bevel=0, axis="Y", at=(x, -d / 2 - 0.03, 2.9))
        parts.append(glow(join([win, arch], f"{name}_wa{k}"), C("#ffa94a") if rnd.random() < 0.7 else C("#5a4a3a")))
        parts.append(block(f"{name}_sill{k}", 1.0, 0.18, 0.12, C("#c9b8a0"), bevel=0.02, at=(x, -d / 2 - 0.06, 1.3)))
    door = block(f"{name}_door", 1.6, 0.12, 2.4, C("#4a3a30"), bevel=0.03, at=(w * 0.32, -d / 2 - 0.05, 0))
    parts.append(door)
    ob = join(parts, name)
    ob["col"] = max(w, d) * 0.5
    return ob


def chimney(name, h=14.0, r=0.7, seed=0):
    parts = []
    body = cylinder(f"{name}_b", r * 1.3, r, h, BRICK, segs=14, bevel=0.03, seed=seed)
    masonry(body, BRICK, MORTAR, course=0.4, block_w=0.6, seed=seed, vertical=False)
    parts.append(body)
    for z in (h * 0.3, h * 0.62):
        parts.append(metal(cylinder(f"{name}_band{z}", r * 1.22 - z / h * 0.25, r * 1.22 - z / h * 0.25, 0.25, IRON, segs=14, bevel=0.02, at=(0, 0, z))))
    crown = cylinder(f"{name}_cr", r * 1.2, r * 1.3, 0.6, BRICK_D, segs=14, bevel=0.04, at=(0, 0, h - 0.1))
    soot = cylinder(f"{name}_soot", r * 1.0, r * 1.0, 0.05, SOOT, segs=14, bevel=0, at=(0, 0, h + 0.45))
    parts += [crown, soot]
    return join(parts, name)


def water_tower(name="water_tower"):
    parts = []
    for k in range(4):
        a = k / 4 * math.tau + math.pi / 4
        parts.append(metal(beam(f"{name}_leg{k}", (math.cos(a) * 1.4, math.sin(a) * 1.4, 0), (math.cos(a) * 1.0, math.sin(a) * 1.0, 5.0), 0.16, IRON)))
    for z in (1.6, 3.3):
        for k in range(4):
            a0 = k / 4 * math.tau + math.pi / 4
            a1 = (k + 1) / 4 * math.tau + math.pi / 4
            rr = 1.4 - z / 5 * 0.4
            parts.append(metal(beam(f"{name}_br{z}{k}", (math.cos(a0) * rr, math.sin(a0) * rr, z), (math.cos(a1) * rr, math.sin(a1) * rr, z), 0.08, IRON)))
    tank = cylinder(f"{name}_tank", 1.5, 1.5, 2.3, C("#8a6a4a"), segs=20, bevel=0.03, at=(0, 0, 5.0))

    def staves(c, n, i):
        k = int((math.atan2(c.y, c.x) + math.pi) / math.tau * 20)
        return mul(C("#8a6a4a"), 0.88 + (k % 2) * 0.12) if abs(n.z) < 0.5 else C("#6a4e36")

    paint_faces(tank, staves)
    parts.append(tank)
    for z in (5.4, 6.4, 7.0):
        parts.append(metal(cylinder(f"{name}_hoop{z}", 1.53, 1.53, 0.08, IRON, segs=20, bevel=0, at=(0, 0, z))))
    from hard import cone_roof
    parts.append(cone_roof(f"{name}_roof", 1.6, 1.0, C("#4e5058"), segs=20, at=(0, 0, 7.3), bands=False))
    ob = join(parts, name)
    ob["col"] = 1.5
    return ob


def gasometer(name="gasometer", r=4.5, h=6.0):
    parts = []
    tank = cylinder(f"{name}_tank", r * 0.95, r * 0.95, h * 0.75, C("#6e7a7a"), segs=28, bevel=0.04, at=(0, 0, 0))
    parts.append(metal(tank))
    for k in range(12):
        a = k / 12 * math.tau
        parts.append(metal(block(f"{name}_col{k}", 0.25, 0.25, h, C("#7a3a30"), bevel=0.02, at=(math.cos(a) * r, math.sin(a) * r, 0), rot=a)))
    for z in (h * 0.33, h * 0.66, h):
        ring = sweep(f"{name}_ring{z}", [(math.cos(a / 24 * math.tau) * r, math.sin(a / 24 * math.tau) * r, z) for a in range(25)], 0.1, around=6)
        paint_solid(ring, C("#7a3a30"))
        parts.append(metal(ring))
    ob = join(parts, name)
    ob["col"] = r
    return ob


def pipe_run(name, pts, r=0.18, col=COPPER, flanges=True):
    """A run of pipe along points, with bolted flanges at the joints."""
    parts = [sweep(name, pts, r, around=10)]
    paint(parts[0], lambda co, n, i: mix(mul(col, 0.7), col, 0.5 + 0.5 * n.z))
    if flanges:
        for k, p in enumerate(pts[1:-1]):
            f = cylinder(f"{name}_fl{k}", r * 1.45, r * 1.45, 0.08, BRASS, segs=10, bevel=0, at=p)
            parts.append(f)
    for p in (pts[0], pts[-1]):
        parts.append(cylinder(f"{name}_end{p}", r * 1.4, r * 1.4, r * 1.6, IRON, segs=10, bevel=0.02, at=(p[0], p[1], p[2] - r * 0.8)))
    return metal(join(parts, name))


def boiler(name="boiler"):
    parts = []
    body = cylinder(f"{name}_b", 0.9, 0.9, 2.6, C("#4a4a52"), segs=18, bevel=0.06, axis="X", at=(0, 0, 1.15))
    parts.append(metal(body))
    for x in (-1.0, -0.3, 0.4, 1.1):
        parts.append(metal(cylinder(f"{name}_band{x}", 0.93, 0.93, 0.08, BRASS, segs=18, bevel=0, axis="X", at=(x, 0, 1.15))))
    for s in (-1, 1):
        parts.append(block(f"{name}_saddle{s}", 0.35, 1.5, 0.5, BRICK, bevel=0.04, at=(s * 0.8, 0, 0)))
    parts.append(metal(cylinder(f"{name}_dome", 0.3, 0.25, 0.4, BRASS, segs=12, bevel=0.04, at=(0.3, 0, 1.95))))
    gauge = cylinder(f"{name}_gauge", 0.16, 0.16, 0.06, C("#efe4cc"), segs=14, bevel=0.01, axis="Y", at=(-0.5, -0.92, 1.4))
    rimg = cylinder(f"{name}_grim", 0.19, 0.19, 0.05, BRASS, segs=14, bevel=0, axis="Y", at=(-0.5, -0.9, 1.4))
    parts += [gauge, metal(rimg)]
    fire = block(f"{name}_fire", 0.5, 0.1, 0.35, C("#ff8a3a"), bevel=0.02, at=(1.3, -0.4, 0.55))
    parts.append(glow(fire, C("#ff6a1a")))
    parts.append(metal(cylinder(f"{name}_stack", 0.15, 0.12, 1.4, IRON, segs=10, bevel=0.02, at=(-0.9, 0, 1.9))))
    ob = join(parts, name)
    ob["col"] = 1.5
    return ob


def coal_heap(name="coal_heap"):
    """The gorillas' ammunition here: a heap of coal lumps with a shovel."""
    rnd = random.Random(7)
    parts = []
    heap = mesh_obj(bm_ico(1.0, 3), f"{name}_heap", smooth=False)
    heap.data.transform(Matrix.Diagonal((1.0, 0.9, 0.55, 1)))
    displace(heap, 0.12, 2.5, 3)
    for v in heap.data.vertices:
        if v.co.z < 0:
            v.co.z *= 0.1
    from kit import decimate_planar
    decimate_planar(heap, 10)
    apply_mods(heap)
    paint_faces(heap, lambda c, n, i: mul(C("#2a2830"), 0.8 + rnd.random() * 0.5))
    parts.append(heap)
    for k in range(10):
        a = rnd.random() * math.tau
        d = 0.8 + rnd.random() * 0.5
        lump = boulder(f"{name}_l{k}", 200 + k, size=0.12 + rnd.random() * 0.1, squash=0.8, moss=False, facets=14, subdiv=1, pal=dict(rock=C("#3a3840"), rock_dark=C("#18171c")))
        lump.location = (math.cos(a) * d, math.sin(a) * d, 0)
        from kit import apply_transform
        apply_transform(lump, loc=True)
        parts.append(lump)
    shovel = join([beam(f"{name}_sh", (0.2, -0.2, 0.3), (0.9, -0.6, 1.25), 0.05, WOOD), block(f"{name}_blade", 0.28, 0.06, 0.32, IRON, bevel=0.01, at=(0.15, -0.17, 0.12))], f"{name}_shovel")
    parts.append(shovel)
    ob = join(parts, name)
    ob["col"] = 0.95
    return ob


def gas_lamp(name="gas_lamp"):
    parts = [metal(cylinder(f"{name}_post", 0.07, 0.05, 2.6, IRON, segs=8, bevel=0.01))]
    parts.append(metal(cylinder(f"{name}_base", 0.16, 0.12, 0.35, IRON, segs=8, bevel=0.02)))
    cage = cylinder(f"{name}_cage", 0.2, 0.26, 0.42, C("#ffd27a"), segs=6, bevel=0, flat=True, at=(0, 0, 2.6))
    parts.append(glow(cage, C("#ffc35a")))
    parts.append(metal(cylinder(f"{name}_cap", 0.32, 0.05, 0.25, IRON, segs=6, bevel=0, flat=True, at=(0, 0, 3.0))))
    return join(parts, name)


def rails(name="rails", length=90.0):
    """A straight stretch of track along X: sleepers and two rails."""
    parts = []
    n = int(length / 0.9)
    for k in range(n):
        x = -length / 2 + k * 0.9
        parts.append(block(f"{name}_s{k}", 0.3, 2.2, 0.12, C("#5a4434"), bevel=0.015, at=(x, 0, 0)))
    for s in (-0.7, 0.7):
        parts.append(metal(block(f"{name}_r{s}", length, 0.1, 0.12, C("#8a8a94"), bevel=0.01, at=(0, s, 0.1))))
    return join(parts, name)


def locomotive(name="locomotive"):
    """A little tank engine and two wagons; `anim` (the era script runs it along the rails)."""
    root = bpy.data.objects.new(name, None)
    bpy.context.scene.collection.objects.link(root)
    root["role"] = "anim"
    parts = []
    RED, BLACK = C("#9a2a26"), C("#25242a")
    boil = metal(cylinder(f"{name}_boiler", 0.62, 0.62, 2.6, BLACK, segs=16, bevel=0.04, axis="X", at=(0.6, 0, 1.35)))
    cab = block(f"{name}_cab", 1.4, 1.5, 1.6, RED, bevel=0.06, at=(-1.2, 0, 0.75))
    roof = block(f"{name}_roof", 1.7, 1.7, 0.12, BLACK, bevel=0.03, at=(-1.2, 0, 2.35))
    stack = metal(cylinder(f"{name}_stack", 0.22, 0.32, 0.9, BLACK, segs=12, bevel=0.03, at=(1.5, 0, 1.9)))
    dome = metal(cylinder(f"{name}_dome", 0.25, 0.2, 0.35, BRASS, segs=12, bevel=0.04, at=(0.6, 0, 1.9)))
    chassis = block(f"{name}_ch", 3.8, 1.3, 0.35, RED, bevel=0.03, at=(0, 0, 0.45))
    lamp = glow(cylinder(f"{name}_lamp", 0.16, 0.16, 0.1, C("#fff0a0"), segs=10, bevel=0, axis="X", at=(1.95, 0, 1.25)), C("#ffe68a"))
    parts += [boil, cab, roof, stack, dome, chassis, lamp]
    for x in (-1.2, -0.2, 0.8, 1.6):
        for s in (-1, 1):
            w = metal(cylinder(f"{name}_w{x}{s}", 0.36 if x < 1.4 else 0.26, 0.36 if x < 1.4 else 0.26, 0.12, RED, segs=14, bevel=0.02, axis="Y", at=(x, s * 0.6, 0.38)))
            parts.append(w)
    eng = join(parts, f"{name}_engine")
    eng.parent = root
    eng["role"] = "part"
    out = [root, eng]
    for k in range(2):
        wag = [block(f"{name}_wb{k}", 3.0, 1.4, 0.9, mul(WOOD, 0.9), bevel=0.05, at=(0, 0, 0.6))]
        coal = mesh_obj(bm_ico(1.0, 2), f"{name}_coal{k}", smooth=False)
        coal.data.transform(Matrix.Diagonal((1.3, 0.55, 0.3, 1)))
        coal.data.transform(Matrix.Translation((0, 0, 1.5)))
        displace(coal, 0.08, 3, k)
        paint_faces(coal, lambda c, n, i: C("#2a2830"))
        wag.append(coal)
        for x in (-0.9, 0.9):
            for s in (-1, 1):
                wag.append(metal(cylinder(f"{name}_ww{k}{x}{s}", 0.28, 0.28, 0.1, BLACK, segs=12, bevel=0.01, axis="Y", at=(x, s * 0.6, 0.3))))
        wj = join(wag, f"{name}_wagon{k}")
        wj.location = (-4.0 - k * 3.6, 0, 0)
        wj.parent = root
        wj["role"] = "part"
        out.append(wj)
    return out


def bench(name="bench"):
    parts = [block(f"{name}_seat", 1.6, 0.45, 0.08, WOOD, bevel=0.02, at=(0, 0, 0.45)), block(f"{name}_back", 1.6, 0.06, 0.4, WOOD, bevel=0.015, at=(0, 0.22, 0.6))]
    for s in (-1, 1):
        parts.append(metal(block(f"{name}_leg{s}", 0.08, 0.5, 0.5, IRON, bevel=0.01, at=(s * 0.7, 0, 0))))
    ob = join(parts, name)
    ob["col"] = 0.6
    return ob


def jib_crane(name="crane"):
    """A riveted jib crane: a lattice mast, a long boom with a hook block."""
    parts = []
    for k in range(4):
        a = k / 4 * math.tau + math.pi / 4
        parts.append(metal(beam(f"{name}_m{k}", (math.cos(a) * 0.45, math.sin(a) * 0.45, 0), (math.cos(a) * 0.3, math.sin(a) * 0.3, 7.5), 0.1, C("#8a3a2a"))))
    for z in range(1, 8):
        for k in range(4):
            a0, a1 = k / 4 * math.tau + math.pi / 4, (k + 1) / 4 * math.tau + math.pi / 4
            rr = 0.45 - z / 7.5 * 0.15
            parts.append(metal(beam(f"{name}_x{z}{k}", (math.cos(a0) * rr, math.sin(a0) * rr, z * 0.95), (math.cos(a1) * rr, math.sin(a1) * rr, z * 0.95 + 0.5), 0.05, C("#8a3a2a"))))
    parts.append(metal(beam(f"{name}_boom", (0, 0.6, 7.2), (0, -6.0, 8.6), 0.22, C("#9a4a32"))))
    parts.append(metal(beam(f"{name}_tie", (0, 0, 8.6), (0, -5.8, 8.7), 0.05, IRON)))
    parts.append(block(f"{name}_cw", 0.9, 0.9, 0.8, C("#4a4a52"), bevel=0.04, at=(0, 1.0, 6.7)))
    parts.append(metal(cylinder(f"{name}_cable", 0.02, 0.02, 3.6, IRON, segs=4, bevel=0, at=(0, -5.6, 4.9))))
    hook = metal(block(f"{name}_hook", 0.35, 0.25, 0.3, C("#c9963e"), bevel=0.04, at=(0, -5.6, 4.6)))
    parts.append(hook)
    crate_ = block(f"{name}_load", 1.0, 1.0, 0.7, C("#8a6a46"), bevel=0.05, at=(0, -5.6, 3.7))
    parts.append(crate_)
    ob = join(parts, name)
    ob["col"] = 0.6
    return ob


def sacks(name="sacks", seed=2):
    rnd = random.Random(seed)
    parts = []
    for k, (x, y, z) in enumerate([(0, 0, 0), (0.55, 0.05, 0), (0.27, 0.0, 0.32), (-0.5, 0.1, 0), (-0.25, 0.05, 0.32)]):
        sk = mesh_obj(bm_ico(1.0, 2), f"{name}_{k}")
        sk.data.transform(Matrix.Diagonal((0.28, 0.2, 0.17, 1)))
        displace(sk, 0.02, 6, k + seed)
        sk.data.transform(Matrix.Translation((x, y, z + 0.15)))
        tone = 0.9 + rnd.random() * 0.15
        paint(sk, lambda co, n, i, tone=tone: mul(mix(C("#a08a62"), C("#d0bc90"), 0.5 + 0.5 * n.z), tone))
        parts.append(sk)
    ob = join(parts, name)
    ob["col"] = 0.6
    return ob


def coal_cart(name="cart"):
    parts = [block(f"{name}_tub", 1.4, 0.9, 0.6, C("#5a5a62"), bevel=0.04, at=(0, 0, 0.35))]
    coal = mesh_obj(bm_ico(1.0, 2), f"{name}_coal", smooth=False)
    coal.data.transform(Matrix.Diagonal((0.62, 0.38, 0.2, 1)))
    coal.data.transform(Matrix.Translation((0, 0, 0.95)))
    displace(coal, 0.05, 4, 3)
    paint_faces(coal, lambda c, n, i: C("#2a2830"))
    parts.append(coal)
    for x in (-0.45, 0.45):
        for s in (-1, 1):
            parts.append(metal(cylinder(f"{name}_w{k}" if False else f"{name}_w{int(x*10)}{s}", 0.2, 0.2, 0.08, IRON, segs=12, bevel=0.01, axis="Y", at=(x, s * 0.5, 0.2))))
    parts.append(metal(beam(f"{name}_handle", (0.7, 0, 0.6), (1.4, 0, 0.9), 0.05, IRON)))
    ob = join(parts, name)
    ob["col"] = 0.8
    return ob
