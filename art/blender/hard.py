"""Hard-surface building blocks: bevelled blocks and cylinders, masonry,
roofs, timber framing, cloth, fences, barrels and crates. Everything is
vertex-painted and stays chunky (thick bevels, nothing razor thin)."""
from __future__ import annotations

import math
import random

import bmesh
import bpy
from mathutils import Matrix, Vector, noise

from kit import (
    C, add_bevel, apply_mods, apply_transform, bm_box, bm_cyl, bm_ico, join, mesh_obj, mix, mul, paint, paint_faces,
    paint_solid, set_origin_base, shade_flat, vtx_material,
)


def glow_mat():
    return vtx_material("Glow", rough=1.0, emissive=True)


def metal_mat():
    return vtx_material("Metal", rough=0.38, metal=0.75)


def block(name, sx, sy, sz, col, bevel=0.04, at=(0, 0, 0), rot=0.0, seg=1, jitter=0.06, seed=0, flat=True):
    """A bevelled box resting on z=0 (then moved to `at`), painted with gentle
    per-face variation and a lighter top."""
    rnd = random.Random(seed)
    ob = mesh_obj(bm_box(sx, sy, sz), name, smooth=not flat)
    if bevel > 0:
        add_bevel(ob, width=bevel, segments=seg, angle=40, harden=False)
        apply_mods(ob)
    if flat:
        shade_flat(ob)
    paint_faces(ob, lambda c, n, i: mul(mix(mul(col, 0.8), col, 0.55 + 0.45 * max(0.0, n.z)), 1 + (rnd.random() - 0.5) * jitter * 2))
    ob.data.transform(Matrix.Rotation(rot, 4, "Z"))
    ob.data.transform(Matrix.Translation(at))
    return ob


def cylinder(name, r1, r2, h, col, segs=12, bevel=0.03, at=(0, 0, 0), flat=False, seed=0, axis=None):
    rnd = random.Random(seed)
    ob = mesh_obj(bm_cyl(r1, r2, h, segs), name, smooth=not flat)
    if bevel > 0:
        add_bevel(ob, width=bevel, segments=1, angle=40, harden=True)
        apply_mods(ob)
    paint_faces(ob, lambda c, n, i: mul(mix(mul(col, 0.82), col, 0.55 + 0.45 * max(0.0, n.z)), 1 + (rnd.random() - 0.5) * 0.06))
    if axis == "X":
        ob.data.transform(Matrix.Translation((0, 0, -h / 2)))
        ob.data.transform(Matrix.Rotation(math.pi / 2, 4, "Y"))
    elif axis == "Y":
        ob.data.transform(Matrix.Translation((0, 0, -h / 2)))
        ob.data.transform(Matrix.Rotation(math.pi / 2, 4, "X"))
    ob.data.transform(Matrix.Translation(at))
    return ob


def masonry(ob, base, mortar, course=0.42, block_w=0.7, seed=0, var=0.07, vertical=True):
    """Repaint a mesh as stone blocks: faces are cut along course lines (and,
    for flat walls, vertical joints) so every block gets its own tone."""
    me = ob.data
    bm = bmesh.new()
    bm.from_mesh(me)
    zs = [v.co.z for v in bm.verts]
    xs = [v.co.x for v in bm.verts]
    ys = [v.co.y for v in bm.verts]
    z = min(zs) + course
    while z < max(zs) - 0.02:
        geom = bm.verts[:] + bm.edges[:] + bm.faces[:]
        bmesh.ops.bisect_plane(bm, geom=geom, plane_co=(0, 0, z), plane_no=(0, 0, 1))
        z += course
    if vertical:
        for axis, lo, hi in ((0, min(xs), max(xs)), (1, min(ys), max(ys))):
            v = lo + block_w
            while v < hi - 0.05:
                co = [0, 0, 0]
                co[axis] = v
                no = [0, 0, 0]
                no[axis] = 1
                geom = bm.verts[:] + bm.edges[:] + bm.faces[:]
                bmesh.ops.bisect_plane(bm, geom=geom, plane_co=co, plane_no=no)
                v += block_w
    bm.to_mesh(me)
    bm.free()
    rnd = random.Random(seed)
    shade_flat(ob)
    z0 = min(zs)

    def fn(c, n, i):
        row = math.floor((c.z - z0) / course)
        u = (c.x * abs(n.y) + c.y * abs(n.x)) / block_w if abs(n.z) < 0.7 else (c.x + c.y) / block_w
        h = noise.noise(Vector((math.floor(u) * 1.7, row * 2.3, seed)))
        col = mul(base, 1 + h * var * 2.2 + (rnd.random() - 0.5) * 0.05)
        col = mix(col, mortar, 0.05 + max(0.0, -h) * 0.08)
        if n.z > 0.7:
            col = mul(col, 1.06)
        return col

    paint_faces(ob, fn)
    return ob


def crenellate(name, length, depth, height, col, merlon=0.55, gap=0.42, at=(0, 0, 0), seed=0):
    """A row of merlons along X, centred."""
    parts = []
    n = int(length / (merlon + gap))
    x0 = -(n * (merlon + gap) - gap) / 2 + merlon / 2
    for k in range(n):
        parts.append(block(f"{name}_{k}", merlon, depth, height, col, bevel=0.035, at=(x0 + k * (merlon + gap), 0, 0), seed=seed + k))
    ob = join(parts, name)
    ob.data.transform(Matrix.Translation(at))
    return ob


def cone_roof(name, r, h, col, segs=14, overhang=1.12, bands=True, at=(0, 0, 0), seed=0):
    """A conical tiled roof: horizontal tile courses painted in alternating tones."""
    bm = bmesh.new()
    rows = 6
    rings = []
    for j in range(rows):
        t = j / rows
        rr = r * overhang * (1 - t)
        z = h * t
        rings.append([bm.verts.new((math.cos(a / segs * math.tau) * rr, math.sin(a / segs * math.tau) * rr, z)) for a in range(segs)])
    tip = bm.verts.new((0, 0, h))
    for j in range(rows - 1):
        for i in range(segs):
            k = (i + 1) % segs
            bm.faces.new((rings[j][i], rings[j][k], rings[j + 1][k], rings[j + 1][i]))
    for i in range(segs):
        bm.faces.new((rings[-1][i], rings[-1][(i + 1) % segs], tip))
    bm.faces.new(list(reversed(rings[0])))
    ob = mesh_obj(bm, name, smooth=False)
    rnd = random.Random(seed)
    paint_faces(ob, lambda c, n, i: mul(col, (0.85 if (int(c.z / (h / rows)) % 2) and bands else 1.0) * (0.95 + rnd.random() * 0.1) * (0.8 if n.z < 0 else 1)))
    ob.data.transform(Matrix.Translation(at))
    return ob


def gable_roof(name, w, d, h, col, overhang=0.25, thick=0.12, at=(0, 0, 0), courses=6, seed=0, edge=None):
    """A pitched roof along X (ridge along X), with thickness and tile courses."""
    bm = bmesh.new()
    hw, hd = w / 2 + overhang, d / 2 + overhang
    pts = [(-hw, -hd, 0), (hw, -hd, 0), (hw, 0, h), (-hw, 0, h), (-hw, hd, 0), (hw, hd, 0)]
    vs = [bm.verts.new(p) for p in pts]
    up = [bm.verts.new((p[0], p[1], p[2] + thick)) for p in pts]
    bm.faces.new((vs[0], vs[1], vs[2], vs[3]))
    bm.faces.new((vs[3], vs[2], vs[5], vs[4]))
    bm.faces.new((up[3], up[2], up[1], up[0]))
    bm.faces.new((up[4], up[5], up[2], up[3]))
    for a, b in ((0, 1), (1, 2), (2, 5), (5, 4), (4, 3), (3, 0)):
        bm.faces.new((vs[a], vs[b], up[b], up[a]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    ob = mesh_obj(bm, name, smooth=False)
    # Tile courses: cut across the slope.
    bm = bmesh.new()
    bm.from_mesh(ob.data)
    for k in range(1, courses):
        y = hd * k / courses
        for s in (-1, 1):
            geom = bm.verts[:] + bm.edges[:] + bm.faces[:]
            bmesh.ops.bisect_plane(bm, geom=geom, plane_co=(0, s * y, 0), plane_no=(0, 1, 0))
    bm.to_mesh(ob.data)
    bm.free()
    shade_flat(ob)
    rnd = random.Random(seed)
    edge = edge or mul(col, 0.6)

    def fn(c, n, i):
        if abs(n.z) < 0.3:
            return edge
        course = int(abs(c.y) / (hd / courses))
        return mul(col, (0.88 if course % 2 else 1.0) * (0.94 + rnd.random() * 0.1) * (0.7 if n.z < 0 else 1))

    paint_faces(ob, fn)
    ob.data.transform(Matrix.Translation(at))
    return ob


def beam(name, p0, p1, w, col, seed=0):
    """A square timber between two points."""
    p0, p1 = Vector(p0), Vector(p1)
    d = p1 - p0
    L = d.length
    ob = block(name, w, w, L, col, bevel=min(0.02, w * 0.2), seed=seed)
    ob.data.transform(Matrix.Translation((0, 0, 0)))
    rot = Vector((0, 0, 1)).rotation_difference(d.normalized()).to_matrix().to_4x4()
    ob.data.transform(rot)
    ob.data.transform(Matrix.Translation(p0))
    return ob


def barrel(name, r=0.32, h=0.8, wood=None, band=None, seed=0):
    wood = wood or C("#8a5a34")
    band = band or C("#4a4a50")
    bm = bmesh.new()
    segs, rows = 12, 6
    rings = []
    for j in range(rows + 1):
        t = j / rows
        rr = r * (0.86 + 0.14 * math.sin(t * math.pi))
        rings.append([bm.verts.new((math.cos(a / segs * math.tau) * rr, math.sin(a / segs * math.tau) * rr, t * h)) for a in range(segs)])
    for j in range(rows):
        for i in range(segs):
            k = (i + 1) % segs
            bm.faces.new((rings[j][i], rings[j][k], rings[j + 1][k], rings[j + 1][i]))
    bm.faces.new(list(reversed(rings[0])))
    bm.faces.new(rings[-1])
    ob = mesh_obj(bm, name, smooth=False)
    rnd = random.Random(seed)

    def fn(c, n, i):
        if abs(n.z) > 0.8:
            return mul(wood, 0.85)
        t = c.z / h
        if abs(t - 0.2) < 0.06 or abs(t - 0.8) < 0.06:
            return band
        stave = int((math.atan2(c.y, c.x) + math.pi) / math.tau * 12)
        return mul(wood, 0.9 + (stave % 2) * 0.12 + rnd.random() * 0.04)

    paint_faces(ob, fn)
    return ob


def crate(name, s=0.6, wood=None, seed=0):
    wood = wood or C("#a07446")
    parts = [block(f"{name}_b", s, s, s, mul(wood, 0.92), bevel=0.03, seed=seed)]
    t = s * 0.12
    for k, (x, y) in enumerate([(-1, -1), (1, -1), (-1, 1), (1, 1)]):
        parts.append(block(f"{name}_e{k}", t, t, s + 0.02, mul(wood, 0.7), bevel=0.01, at=(x * (s / 2 - t / 2 + 0.005), y * (s / 2 - t / 2 + 0.005), -0.01), seed=seed + k))
    return join(parts, name)


def fence(name, length, h=0.9, post=None, rail=None, posts=5, seed=0):
    post = post or C("#7a5434")
    rail = rail or C("#9a7048")
    parts = []
    for k in range(posts):
        x = -length / 2 + length * k / (posts - 1)
        parts.append(block(f"{name}_p{k}", 0.12, 0.12, h, post, bevel=0.02, at=(x, 0, 0), seed=seed + k))
    for k, z in enumerate((h * 0.45, h * 0.85)):
        parts.append(block(f"{name}_r{k}", length, 0.07, 0.1, rail, bevel=0.015, at=(0, 0, z - 0.05), seed=seed + 9 + k))
    return join(parts, name)


def banner(name, w=1.0, h=1.8, colors=None, seed=0, segs=(8, 10)):
    """A heraldic cloth hanging from a horizontal top edge (local origin at
    the top centre); dense enough for the runtime to ripple it."""
    colors = colors or [C("#c8303a"), C("#f2c24a")]
    bm = bmesh.new()
    nx, nz = segs
    grid = []
    for j in range(nz + 1):
        row = []
        for i in range(nx + 1):
            x = (i / nx - 0.5) * w
            z = -j / nz * h
            if j == nz:
                z -= (0.5 - abs(i / nx - 0.5)) * h * 0.18  # swallowtail point
            row.append(bm.verts.new((x, 0, z)))
        grid.append(row)
    for j in range(nz):
        for i in range(nx):
            bm.faces.new((grid[j][i], grid[j][i + 1], grid[j + 1][i + 1], grid[j + 1][i]))
    ob = mesh_obj(bm, name, smooth=True)
    sol = ob.modifiers.new("Sol", "SOLIDIFY")
    sol.thickness = 0.03
    apply_mods(ob)
    a, b = colors[0], colors[1 % len(colors)]

    def fn(c, n, i):
        # A chevron charge on a field, with a border.
        u = c.x / w + 0.5
        v = -c.z / h
        if u < 0.07 or u > 0.93 or v < 0.05:
            return b
        if abs(v - 0.55 - abs(u - 0.5) * 0.8) < 0.09:
            return b
        return a

    paint(ob, fn)
    return ob
