"""Era I props: the stone dais, a camp, a quarry and some Stone Age storytelling."""
from __future__ import annotations

import math
import random

import bmesh
import bpy
from mathutils import Matrix, Vector, noise

from kit import (
    C, add_bevel, add_subsurf, apply_mods, bm_cyl, bm_ico, displace, ensure_col, join, mesh_obj, mix, mul,
    paint, paint_faces, paint_solid, set_origin_base, shade_flat, vtx_material,
)
from rocks import boulder

SAND = C("#cf9f6c")
SAND_TOP = C("#e4bd8a")
SAND_DARK = C("#8f5e45")
BARK = C("#5a3d2b")
BARK_LIGHT = C("#8a6448")
WOOD_END = C("#d9b17c")
HIDE = [C("#c49a6c"), C("#a97b52"), C("#dcc199"), C("#8f6544")]
BONE = C("#efe4cc")
BONE_SHADE = C("#b8a88c")


def glow_material():
    return vtx_material("Glow", rough=1.0, emissive=True)


def _outline(segs, r, seed, amp=0.06):
    pts = []
    for i in range(segs):
        a = i / segs * math.tau
        w = 1 + noise.noise(Vector((math.cos(a) * 2, math.sin(a) * 2, seed))) * amp
        pts.append((math.cos(a) * r * w, math.sin(a) * r * w))
    return pts


def _prism(bm, pts, z0, z1):
    lo = [bm.verts.new((x, y, z0)) for x, y in pts]
    hi = [bm.verts.new((x, y, z1)) for x, y in pts]
    n = len(pts)
    for i in range(n):
        j = (i + 1) % n
        bm.faces.new((lo[i], lo[j], hi[j], hi[i]))
    bm.faces.new(list(reversed(lo)))
    top = bm.faces.new(hi)
    return top


def _sector(bm, a0, a1, r0, r1, z0, z1, seed, segs=5):
    """An annular-sector slab (one fitted paving stone of a round dais)."""
    outer, inner = [], []
    for i in range(segs + 1):
        a = a0 + (a1 - a0) * i / segs
        wob = 1 + noise.noise(Vector((math.cos(a) * 3, math.sin(a) * 3, seed))) * 0.03
        outer.append((math.cos(a) * r1 * wob, math.sin(a) * r1 * wob))
        inner.append((math.cos(a) * r0, math.sin(a) * r0))
    return _prism(bm, outer + list(reversed(inner)), z0, z1)


def dais(name="dais") -> bpy.types.Object:
    """The Freakmoji's pedestal: fitted sandstone paving on a ring of chunky
    footing blocks, each stone its own shade. Top surface at y = 0.22."""
    rnd = random.Random(7)
    stones = [C("#c08a5c"), C("#a8734f"), C("#cf9e6e"), C("#b47e58"), C("#9c8270")]
    parts = []

    def slab(bm_fn, label, lift=0.0):
        bm = bmesh.new()
        bm_fn(bm)
        ob = mesh_obj(bm, label, smooth=False)
        add_bevel(ob, width=0.03, segments=1, angle=35, harden=False)
        apply_mods(ob)
        base = stones[rnd.randrange(len(stones))]
        tone = 0.92 + rnd.random() * 0.14
        zs = [v.co.z for v in ob.data.vertices]
        ztop = max(zs)

        def fn(c, n, i):
            if n.z > 0.7:
                col = mix(base, SAND_TOP, 0.35) if c.z > ztop - 0.01 else base
            else:
                col = mix(SAND_DARK, base, 0.55 + 0.45 * max(0.0, (c.z + 0.1) / 0.35))
            return mul(col, tone * (0.97 + rnd.random() * 0.06))

        paint_faces(ob, fn)
        parts.append(ob)

    # Footing ring.
    n = 13
    for k in range(n):
        a0 = k / n * math.tau + 0.02
        a1 = (k + 1) / n * math.tau - 0.02
        h = 0.17 + rnd.random() * 0.05
        slab(lambda bm, a0=a0, a1=a1, h=h, k=k: _sector(bm, a0, a1, 1.78, 2.28 + rnd.random() * 0.06, -0.12, h - 0.12 + 0.06, k), f"{name}_f{k}")
    # Grout disc under the paving (dark, so joints read).
    bm = bmesh.new()
    _prism(bm, _outline(24, 1.9, 2), -0.05, 0.16)
    grout = mesh_obj(bm, f"{name}_grout", smooth=False)
    paint_solid(grout, C("#5a4034"))
    parts.append(grout)
    # Paving: a centre stone and two rings of fitted slabs.
    slab(lambda bm: _prism(bm, _outline(10, 0.62, 5, 0.04), 0.0, 0.22), f"{name}_c")
    for ring, (r0, r1, cnt, off) in enumerate([(0.66, 1.26, 7, 0.2), (1.3, 1.9, 11, 0.0)]):
        for k in range(cnt):
            a0 = k / cnt * math.tau + off + 0.025
            a1 = (k + 1) / cnt * math.tau + off - 0.025
            lift = (rnd.random() - 0.5) * 0.025
            slab(lambda bm, a0=a0, a1=a1, lift=lift, k=k: _sector(bm, a0, a1, r0 + 0.02, r1 - 0.02, 0.0, 0.22 + lift, k * 3 + ring), f"{name}_s{ring}_{k}")
    ob = join(parts, name)
    ob["col"] = 2.3
    ob["walk"] = 1
    return ob


def log(name, length=1.1, r=0.13, seed=0, charred=0.0, segs=10) -> bpy.types.Object:
    bm = bm_cyl(r, r * 0.92, length, segs)
    ob = mesh_obj(bm, name, smooth=True)
    add_bevel(ob, width=r * 0.18, segments=2, angle=50, harden=True)
    apply_mods(ob)
    displace(ob, strength=r * 0.12, scale=6, seed=seed)
    off = Vector((seed, 0, 0))

    def fn(c, n, i):
        if abs(n.z) > 0.8:
            ring = 0.5 + 0.5 * math.sin(Vector((c.x, c.y)).length * 90)
            return mix(mul(WOOD_END, 0.8), WOOD_END, ring)
        streak = noise.noise(Vector((c.x * 9, c.y * 9, c.z * 1.2)) + off)
        col = mix(BARK, BARK_LIGHT, 0.45 + streak * 0.5)
        if charred > 0 and c.z > length * (1 - charred):
            col = mix(col, C("#1d1513"), min(1, (c.z - length * (1 - charred)) / (length * charred) * 1.4))
        return col

    paint(ob, fn)
    # Lay it along X.
    ob.data.transform(Matrix.Translation((0, 0, -length / 2)))
    ob.data.transform(Matrix.Rotation(math.pi / 2, 4, "Y"))
    ob.data.transform(Matrix.Translation((0, 0, r * 0.85)))
    return ob


def campfire(name="campfire") -> tuple[bpy.types.Object, bpy.types.Object]:
    """Returns (fire pit, ember bed). The embers use the Glow material."""
    parts = []
    rnd = random.Random(5)
    for i in range(10):
        a = i / 10 * math.tau
        s = boulder(f"{name}_st{i}", 40 + i, size=0.17 + rnd.random() * 0.05, squash=0.65, moss=False, facets=12,
                    pal=dict(rock=C("#8c8178"), rock_dark=C("#3f3634")))
        s.location = (math.cos(a) * 0.52, math.sin(a) * 0.52, 0)
        s.rotation_euler = (0, 0, rnd.random() * 6)
        parts.append(s)
    for i in range(4):
        a = i / 4 * math.tau + 0.4
        lg = log(f"{name}_lg{i}", length=0.72, r=0.055, seed=i, charred=0.45, segs=7)
        lg.data.transform(Matrix.Translation((-0.36, 0, -0.05)))
        lg.data.transform(Matrix.Rotation(-0.62, 4, "Y"))
        lg.data.transform(Matrix.Rotation(a, 4, "Z"))
        lg.data.transform(Matrix.Translation((math.cos(a) * 0.32, math.sin(a) * 0.32, 0.04)))
        parts.append(lg)
    for p in parts:
        from kit import apply_transform
        apply_transform(p, loc=True)
    pit = join(parts, name)
    bm = bm_ico(1.0, 2)
    emb = mesh_obj(bm, f"{name}_embers", mat=glow_material())
    emb.data.transform(Matrix.Diagonal((0.36, 0.36, 0.07, 1)))
    displace(emb, strength=0.02, scale=8, seed=2)
    paint(emb, lambda c, n, i: mix(C("#ff5a1a"), C("#ffc04a"), max(0, noise.noise(c * 14)) * 1.6 + 0.2))
    return pit, emb


def tent(name="tent", seed=3) -> bpy.types.Object:
    """A hide tent: a lumpy patchwork cone on crossed poles, door flap open."""
    rnd = random.Random(seed)
    parts = []
    H, R = 2.3, 1.15
    segs = 9
    bm = bmesh.new()
    rows = []
    for j in range(5):
        t = j / 4
        r = R * (1 - t) ** 1.05 + 0.07
        z = H * t * 0.92
        row = []
        for i in range(segs):
            a = i / segs * math.tau
            bulge = 1 + (0.06 if j in (1, 2) else 0) + (rnd.random() - 0.5) * 0.05
            row.append(bm.verts.new((math.cos(a) * r * bulge, math.sin(a) * r * bulge, z)))
        rows.append(row)
    door = 0  # leave the first column of the lower two rows open
    for j in range(4):
        for i in range(segs):
            if j < 2 and i == door:
                continue
            k = (i + 1) % segs
            bm.faces.new((rows[j][i], rows[j][k], rows[j + 1][k], rows[j + 1][i]))
    ob = mesh_obj(bm, f"{name}_hide", smooth=False)
    sol = ob.modifiers.new("Sol", "SOLIDIFY")
    sol.thickness = 0.04
    apply_mods(ob)

    def fn(c, n, i):
        col = HIDE[(i // 3 + seed) % len(HIDE)]
        return mul(col, 0.9 + rnd.random() * 0.14)

    paint_faces(ob, fn)
    parts.append(ob)
    # Door flap folded back.
    bm = bmesh.new()
    a0, a1 = 0.0, 1 / segs * math.tau
    v = [bm.verts.new(p) for p in [(math.cos(a0) * R, math.sin(a0) * R, 0.02), (math.cos(a0) * R * 1.35, math.sin(a0) * R * 0.2 - 0.4, 0.05),
                                    (math.cos(a0) * R * 0.55, math.sin(a0) * R * 0.2 - 0.3, H * 0.45), (math.cos(a0) * R * 0.52, math.sin(a0) * R * 0.52, H * 0.46)]]
    bm.faces.new(v)
    flap = mesh_obj(bm, f"{name}_flap", smooth=False)
    sol = flap.modifiers.new("Sol", "SOLIDIFY")
    sol.thickness = 0.04
    apply_mods(flap)
    paint_solid(flap, HIDE[2])
    parts.append(flap)
    # Dark interior so the opening reads.
    inner = mesh_obj(bm_cyl(R * 0.9, 0.05, H * 0.85, 9), f"{name}_in", smooth=False)
    paint_solid(inner, C("#2a1c16"))
    parts.append(inner)
    for k in range(6):
        a = k / 6 * math.tau + 0.3
        pole = mesh_obj(bm_cyl(0.035, 0.025, H * 1.18, 6), f"{name}_pole{k}")
        pole.data.transform(Matrix.Rotation(-0.42, 4, "Y"))
        pole.data.transform(Matrix.Rotation(a, 4, "Z"))
        pole.data.transform(Matrix.Translation((math.cos(a) * R * 0.98, math.sin(a) * R * 0.98, -0.05)))
        paint_solid(pole, BARK_LIGHT)
        parts.append(pole)
    t = join(parts, name)
    t["col"] = 1.25
    return t


def drying_rack(name="rack") -> bpy.types.Object:
    parts = []
    for s in (-1, 1):
        post = mesh_obj(bm_cyl(0.05, 0.04, 1.5, 6), f"{name}_p{s}")
        post.data.transform(Matrix.Translation((s * 0.8, 0, 0)))
        fork = mesh_obj(bm_cyl(0.03, 0.02, 0.35, 6), f"{name}_f{s}")
        fork.data.transform(Matrix.Rotation(0.5 * s, 4, "Y"))
        fork.data.transform(Matrix.Translation((s * 0.8, 0, 1.38)))
        for p in (post, fork):
            paint_solid(p, BARK_LIGHT)
            parts.append(p)
    bar = log(f"{name}_bar", length=1.9, r=0.035, seed=4, segs=6)
    bar.data.transform(Matrix.Translation((0, 0, 1.47)))
    parts.append(bar)
    # Hanging hides and two fish.
    for k, x in enumerate((-0.45, 0.05, 0.5)):
        bm = bmesh.new()
        w, h = 0.36 + 0.05 * k, 0.6 + 0.1 * (k % 2)
        vs = [bm.verts.new(p) for p in [(x - w / 2, 0, 1.47), (x + w / 2, 0, 1.47), (x + w / 2 * 0.8, 0.02, 1.47 - h), (x - w / 2 * 0.7, 0.02, 1.47 - h * 0.92)]]
        bm.faces.new(vs)
        hide = mesh_obj(bm, f"{name}_h{k}", smooth=False)
        sol = hide.modifiers.new("Sol", "SOLIDIFY")
        sol.thickness = 0.025
        apply_mods(hide)
        paint_solid(hide, HIDE[k % len(HIDE)])
        parts.append(hide)
    for k, x in enumerate((-0.2, 0.28)):
        fish = mesh_obj(bm_ico(1.0, 2), f"{name}_fish{k}")
        fish.data.transform(Matrix.Diagonal((0.07, 0.03, 0.22, 1)))
        fish.data.transform(Matrix.Translation((x, 0.05, 1.18)))
        paint(fish, lambda c, n, i: mix(C("#6f8a96"), C("#d6dfe0"), max(0, n.x * 0.5 + 0.5)))
        parts.append(fish)
    ob = join(parts, name)
    return ob


def tusk(name, length=2.4, r=0.13, curl=1.1, seed=0) -> bpy.types.Object:
    """A curving, tapering ivory tusk swept along an arc."""
    segs, around = 14, 9
    bm = bmesh.new()
    rings = []
    for s in range(segs + 1):
        t = s / segs
        ang = t * curl
        cx = math.sin(ang) * length / curl
        cz = (1 - math.cos(ang)) * length / curl
        rr = r * (1 - t * 0.85) + 0.01
        # Frame: tangent along the arc.
        tx, tz = math.cos(ang), math.sin(ang)
        ring = []
        for i in range(around):
            a = i / around * math.tau
            nx, ny, nz = -tz * math.cos(a), math.sin(a), tx * math.cos(a)
            ring.append(bm.verts.new((cx + nx * rr, ny * rr, cz + nz * rr)))
        rings.append(ring)
    for s in range(segs):
        for i in range(around):
            j = (i + 1) % around
            bm.faces.new((rings[s][i], rings[s][j], rings[s + 1][j], rings[s + 1][i]))
    bm.faces.new(list(reversed(rings[0])))
    tip = bm.verts.new(rings[-1][0].co)
    for i in range(around):
        j = (i + 1) % around
        bm.faces.new((rings[-1][i], rings[-1][j], tip))
    ob = mesh_obj(bm, name, smooth=True)
    paint(ob, lambda c, n, i: mix(BONE_SHADE, BONE, 0.55 + 0.45 * max(0, n.z)))
    return ob


def tusk_arch(name="tusk_arch") -> bpy.types.Object:
    """Two mammoth tusks planted in the ground, curving up and in until their
    tips nearly touch: the camp's gate."""
    from kit import sweep, apply_transform
    parts = []
    for s in (-1, 1):
        pts, radii = [], []
        for i in range(15):
            t = i / 14
            ang = t * math.pi * 0.5
            x = s * (1.25 - (1 - math.cos(ang)) * 1.08)
            z = math.sin(ang) * 2.7 - 0.15
            y = math.sin(t * math.pi) * 0.18
            pts.append((x, y, z))
            radii.append(0.2 * (1 - t * 0.85) + 0.02)
        t = sweep(f"{name}_{s}", pts, radii, around=10)
        paint(t, lambda c, n, i: mix(BONE_SHADE, BONE, 0.5 + 0.5 * max(0, n.z)))
        parts.append(t)
        base = boulder(f"{name}_b{s}", 60 + s, size=0.36, squash=0.6, moss=False, facets=12)
        base.location = (s * 1.25, 0, 0)
        apply_transform(base, loc=True)
        parts.append(base)
    ob = join(parts, name)
    return ob


def rock_pile(name="rock_pile") -> bpy.types.Object:
    """The gorillas' ammunition dump: a heap of rounded throwing rocks."""
    rnd = random.Random(12)
    parts = []
    spots = [(0, 0, 0, 0.42), (0.55, 0.15, 0, 0.36), (-0.5, 0.2, 0, 0.38), (0.1, -0.5, 0, 0.34), (0.15, 0.55, 0, 0.33),
             (-0.3, -0.35, 0, 0.3), (0.05, 0.05, 0.38, 0.32), (0.4, -0.2, 0.25, 0.26), (-0.25, 0.3, 0.3, 0.27)]
    for i, (x, y, z, s) in enumerate(spots):
        b = boulder(f"{name}_{i}", 100 + i, size=s, squash=0.8, moss=False, facets=14,
                    pal=dict(rock=C("#9a8c80"), rock_dark=C("#5e524c")))
        b.location = (x, y, z)
        b.rotation_euler = (rnd.random() * 0.5, rnd.random() * 0.5, rnd.random() * 6)
        from kit import apply_transform
        apply_transform(b, loc=True)
        parts.append(b)
    ob = join(parts, name)
    ob["col"] = 0.9
    return ob


def banana_basket(name="bananas") -> bpy.types.Object:
    rnd = random.Random(9)
    parts = []
    bm = bm_cyl(0.42, 0.34, 0.38, 14, cap=True)
    basket = mesh_obj(bm, f"{name}_basket", smooth=False)
    me = basket.data
    paint_faces(basket, lambda c, n, i: mix(C("#8d6a3e"), C("#c9a066"), 0.5 + 0.5 * math.sin(c.z * 60 + math.atan2(c.y, c.x) * 7)))
    parts.append(basket)
    for b in range(9):
        a = rnd.random() * math.tau
        d = rnd.random() * 0.22
        bn = mesh_obj(bm_cyl(0.045, 0.03, 0.34, 7), f"{name}_b{b}")
        # Curve each banana.
        for v in bn.data.vertices:
            t = v.co.z / 0.34
            v.co.x += math.sin(t * math.pi * 0.8) * 0.07
        bn.data.transform(Matrix.Rotation(-0.9 - rnd.random() * 0.5, 4, "Y"))
        bn.data.transform(Matrix.Rotation(a, 4, "Z"))
        bn.data.transform(Matrix.Translation((math.cos(a) * d, math.sin(a) * d, 0.34)))
        paint(bn, lambda c, n, i: mix(C("#d2a91d"), C("#ffe25a"), 0.5 + 0.5 * max(0, n.z)))
        parts.append(bn)
    ob = join(parts, name)
    ob["col"] = 0.45
    return ob


def standing_stone(name="menhir", seed=1, height=2.4, face=True) -> bpy.types.Object:
    """A weathered menhir; with `face`, a startled face is pecked into it:
    the Stone Age has been worshipping the Freakmoji for a while."""
    rnd = random.Random(seed)
    ob = boulder(name, seed, size=1.0, squash=1.0, moss=True, facets=10,
                 pal=dict(rock=C("#9b8f84"), rock_dark=C("#5b504c"), moss=C("#7f8f3e")))
    me = ob.data
    zs = [v.co.z for v in me.vertices]
    z0, z1 = min(zs), max(zs)
    me.transform(Matrix.Translation((0, 0, -z0)))
    me.transform(Matrix.Diagonal((0.55, 0.4, height / (z1 - z0), 1)))
    if face:
        from kit import sweep
        front = min(v.co.y for v in me.vertices if abs(v.co.x) < 0.2 and height * 0.4 < v.co.z < height * 0.8)
        grooves = []
        for (cx, cz, r) in [(-0.17, height * 0.7, 0.1), (0.17, height * 0.7, 0.1), (0.0, height * 0.5, 0.12)]:
            ring = [(cx + math.cos(a / 16 * math.tau) * r, front + 0.01, cz + math.sin(a / 16 * math.tau) * r * 1.15) for a in range(17)]
            g = sweep(f"{name}_g{len(grooves)}", ring, 0.028, around=6)
            paint_solid(g, C("#3a302c"))
            grooves.append(g)
        # Brows: two short raised arcs, alarmed.
        for s in (-1, 1):
            arc = [(s * (0.08 + 0.2 * t), front + 0.012, height * 0.82 + 0.05 * math.sin(t * math.pi) - 0.04 * t) for t in [k / 6 for k in range(7)]]
            g = sweep(f"{name}_br{s}", arc, 0.025, around=6)
            paint_solid(g, C("#3a302c"))
            grooves.append(g)
        ob = join([ob] + grooves, name)
    return ob


def mammoth(name="mammoth") -> list[bpy.types.Object]:
    """A woolly mammoth built from separate parts so the runtime can walk it:
    body, head (with trunk, tusks, ears), four legs, tail. Parts are parented
    to an empty named `name` and their origins sit at the joints."""
    fur = C("#7b4a33")
    fur_light = C("#a46a45")
    fur_dark = C("#4a2c22")
    root = bpy.data.objects.new(name, None)
    bpy.context.scene.collection.objects.link(root)
    root["role"] = "anim"
    parts = []

    def furry(ob, light=fur_light, base=fur, dark=fur_dark):
        paint(ob, lambda c, n, i: mix(mix(dark, base, 0.5 + 0.5 * max(-1, min(1, n.z * 1.4))), light, max(0, noise.noise(c * 5)) * 0.4))

    body = mesh_obj(bm_ico(1.0, 3), f"{name}_body")
    body.data.transform(Matrix.Diagonal((1.0, 1.55, 1.05, 1)))
    for v in body.data.vertices:
        if v.co.z > 0.4 and v.co.y > 0.1:  # shoulder hump
            v.co.z += 0.25 * (v.co.y / 1.55)
    displace(body, strength=0.06, scale=4, seed=1)
    furry(body)
    body.location = (0, 0, 1.75)
    parts.append(body)

    head = mesh_obj(bm_ico(1.0, 3), f"{name}_head")
    head.data.transform(Matrix.Diagonal((0.62, 0.62, 0.72, 1)))
    head.data.transform(Matrix.Translation((0, 0.35, 0.15)))
    for v in head.data.vertices:  # domed crown
        if v.co.z > 0.5:
            v.co.z += 0.18
    furry(head)
    trunk_parts = []
    for k in range(5):
        seg = mesh_obj(bm_cyl(0.2 - k * 0.025, 0.18 - k * 0.025, 0.36, 10), f"{name}_tr{k}")
        seg.data.transform(Matrix.Rotation(math.pi + 0.25 * k, 4, "X"))
        seg.data.transform(Matrix.Translation((0, 0.85 + k * 0.1, -0.15 - k * 0.32)))
        furry(seg)
        trunk_parts.append(seg)
    head_full = [head] + trunk_parts
    for s in (-1, 1):
        ear = mesh_obj(bm_ico(1.0, 2), f"{name}_ear{s}")
        ear.data.transform(Matrix.Diagonal((0.1, 0.32, 0.36, 1)))
        ear.data.transform(Matrix.Translation((s * 0.55, 0.1, 0.25)))
        furry(ear)
        head_full.append(ear)
        t = tusk(f"{name}_tusk{s}", length=1.6, r=0.09, curl=2.2)
        t.data.transform(Matrix.Rotation(math.pi / 2 + 0.3, 4, "Z"))
        t.data.transform(Matrix.Rotation(math.pi, 4, "Y"))
        t.data.transform(Matrix.Diagonal((1, 1, 1, 1)))
        t.data.transform(Matrix.Translation((s * 0.28, 0.7, -0.25)))
        if s < 0:
            t.data.transform(Matrix.Diagonal((1, 1, 1, 1)))
        head_full.append(t)
        eye = mesh_obj(bm_ico(1.0, 1), f"{name}_eye{s}")
        eye.data.transform(Matrix.Diagonal((0.06, 0.06, 0.07, 1)))
        eye.data.transform(Matrix.Translation((s * 0.36, 0.68, 0.35)))
        paint_solid(eye, C("#120c0a"))
        head_full.append(eye)
    head = join(head_full, f"{name}_head")
    head.location = (0, 1.45, 2.25)
    parts.append(head)

    for i, (x, y) in enumerate([(-0.55, 0.9), (0.55, 0.9), (-0.55, -0.85), (0.55, -0.85)]):
        leg = mesh_obj(bm_cyl(0.3, 0.27, 1.25, 10), f"{name}_leg{i}")
        leg.data.transform(Matrix.Translation((0, 0, -1.25)))
        furry(leg)
        foot = mesh_obj(bm_cyl(0.3, 0.3, 0.12, 10), f"{name}_foot{i}")
        foot.data.transform(Matrix.Translation((0, 0, -1.3)))
        paint_solid(foot, C("#3a2a24"))
        leg = join([leg, foot], f"{name}_leg{i}")
        leg.location = (x, y, 1.3)
        parts.append(leg)
    tail = mesh_obj(bm_cyl(0.06, 0.03, 0.6, 6), f"{name}_tail")
    tail.data.transform(Matrix.Rotation(math.pi - 0.3, 4, "X"))
    furry(tail)
    tail.location = (0, -1.5, 2.1)
    parts.append(tail)
    for p in parts:
        p.parent = root
        p["role"] = "part"
    return [root] + parts
