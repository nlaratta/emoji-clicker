"""Stylised vegetation: branching trees, conifers, tree ferns, bushes, grass."""
from __future__ import annotations

import math
import random

import bmesh
import bpy
from mathutils import Matrix, Vector, noise

from kit import (
    C, add_subsurf, apply_mods, bm_cyl, bm_ico, displace, ensure_col, jitter, join, mesh_obj, mix, mul,
    paint, radial_normals, set_origin_base, vtx_material,
)

# ───────────────────────────────────────────────────────────── skeletons


class Skeleton:
    """Vertices + edges + radii, turned into an organic limb mesh with the
    Skin modifier and smoothed with subdivision."""

    def __init__(self):
        self.verts: list[Vector] = []
        self.radii: list[float] = []
        self.edges: list[tuple[int, int]] = []

    def add(self, p: Vector, r: float, parent: int | None) -> int:
        self.verts.append(p.copy())
        self.radii.append(r)
        i = len(self.verts) - 1
        if parent is not None:
            self.edges.append((parent, i))
        return i

    def build(self, name: str, subdiv: int = 2, mat=None) -> bpy.types.Object:
        me = bpy.data.meshes.new(name)
        me.from_pydata([tuple(v) for v in self.verts], self.edges, [])
        ob = bpy.data.objects.new(name, me)
        bpy.context.scene.collection.objects.link(ob)
        skin = ob.modifiers.new("Skin", "SKIN")
        skin.use_smooth_shade = True
        skin.branch_smoothing = 0.6
        for i, r in enumerate(self.radii):
            sv = me.skin_vertices[0].data[i]
            sv.radius = (r, r)
            sv.use_root = i == 0
        add_subsurf(ob, subdiv)
        apply_mods(ob)
        me = ob.data
        for p in me.polygons:
            p.use_smooth = True
        me.materials.append(mat or vtx_material())
        return ob


def _bend(d: Vector, rnd: random.Random, amt: float) -> Vector:
    return (d + Vector(((rnd.random() - 0.5) * amt, (rnd.random() - 0.5) * amt, (rnd.random() - 0.5) * amt * 0.5))).normalized()


def grow_branch(sk: Skeleton, rnd, parent: int, start: Vector, direction: Vector, length: float, r0: float, r1: float, segs: int, curl: float, up: float) -> int:
    """A tapered, gently curving limb; returns the index of its tip vertex."""
    p = start.copy()
    d = direction.normalized()
    idx = parent
    for s in range(1, segs + 1):
        t = s / segs
        d = _bend(d + Vector((0, 0, up)) * (1 / segs), rnd, curl)
        p = p + d * (length / segs)
        idx = sk.add(p, r0 + (r1 - r0) * t, idx)
    return idx


# ───────────────────────────────────────────────────────────── canopies


def canopy_blobs(centers_radii, name, seed=0, lumpy=0.12, subdiv=3) -> bpy.types.Object:
    """Overlapping noisy spheres merged into one canopy object."""
    rnd = random.Random(seed)
    parts = []
    for i, (c, r, squash) in enumerate(centers_radii):
        bm = bm_ico(1.0, subdiv)
        ob = mesh_obj(bm, f"{name}_b{i}")
        ob.data.transform(Matrix.Diagonal((r, r, r * squash, 1)))
        displace(ob, strength=r * lumpy, scale=1.6 / max(0.3, r), seed=seed * 31 + i)
        # Flatten the underside a touch: canopies sag and read heavier at the bottom.
        for v in ob.data.vertices:
            if v.co.z < -r * 0.35 * squash:
                v.co.z = -r * 0.35 * squash + (v.co.z + r * 0.35 * squash) * 0.45
        ob.data.transform(Matrix.Translation(c))
        parts.append(ob)
    return join(parts, name)


def color_canopy(ob, center: Vector, top, mid, bottom, seed=0, height=1.0, spots=None):
    """Vertical gradient (sunlit crown → shaded underside) with soft noise
    patches so the volume never looks like a flat-filled blob."""
    off = Vector((seed * 3.1, seed * 1.7, 0))

    def fn(co, n, i):
        h = (co.z - center.z) / height
        t = max(0.0, min(1.0, h * 0.5 + 0.5))
        c = mix(bottom, mid, min(1, t * 1.6)) if t < 0.62 else mix(mid, top, (t - 0.62) / 0.38)
        nz = noise.noise(co * 1.3 + off)
        c = mul(c, 1 + nz * 0.16)
        if spots is not None:
            s = noise.noise(co * 0.9 + off * 2)
            if s > 0.25:
                c = mix(c, spots, min(1, (s - 0.25) * 2.5) * 0.6)
        # Outward-facing tops catch the sky.
        c = mul(c, 0.92 + max(0, n.z) * 0.14)
        return c

    paint(ob, fn)


def color_bark(ob, base, top, seed=0, ground=None):
    off = Vector((seed * 5.3, seed * 2.9, 0))
    zs = [v.co.z for v in ob.data.vertices]
    z0, z1 = min(zs), max(zs)

    def fn(co, n, i):
        t = (co.z - z0) / max(1e-4, z1 - z0)
        c = mix(base, top, t)
        streak = noise.noise(Vector((co.x * 6, co.y * 6, co.z * 0.8)) + off)
        c = mul(c, 1 + streak * 0.22)
        if ground is not None and co.z < 0.25:
            c = mix(c, ground, (0.25 - co.z) / 0.25 * 0.5)
        return c

    paint(ob, fn)


# ───────────────────────────────────────────────────────────── trees


def clump_canopy(clumps, name, seed=0, lumpy=0.1, subdiv=2):
    """Cauliflower foliage: each clump is a core puff with smaller puffs
    budding from its upper half. Returns the joined object and the list of
    (centre, radius) puffs used for shading."""
    rnd = random.Random(seed)
    parts, puffs = [], []
    for ci, (c, r) in enumerate(clumps):
        spec = [(c, r)]
        n = 4 + rnd.randint(0, 2)
        for k in range(n):
            a = k / n * math.tau + rnd.random() * 0.9
            el = 0.15 + rnd.random() * 0.75
            d = Vector((math.cos(a) * math.cos(el), math.sin(a) * math.cos(el), math.sin(el)))
            spec.append((c + d * r * (0.62 + rnd.random() * 0.12), r * (0.5 + rnd.random() * 0.16)))
        for k, (pc, pr) in enumerate(spec):
            # Big core puffs carry the silhouette; small buds can be coarser.
            bm = bm_ico(1.0, subdiv + 1 if (k == 0 and pr > 0.55) else subdiv)
            ob = mesh_obj(bm, f"{name}_p{ci}_{k}")
            ob.data.transform(Matrix.Diagonal((pr, pr, pr * 0.9, 1)))
            displace(ob, strength=pr * lumpy, scale=2.2 / max(0.25, pr), seed=seed * 97 + ci * 7 + k)
            for v in ob.data.vertices:
                if v.co.z < -pr * 0.3:
                    v.co.z = -pr * 0.3 + (v.co.z + pr * 0.3) * 0.5
            ob.data.transform(Matrix.Translation(pc))
            parts.append(ob)
            puffs.append((pc, pr))
    return join(parts, name), puffs


def shade_puffs(ob, puffs, top, mid, bottom, seed=0, spots=None, blend=0.85):
    """Per-puff radial normals and colour: every puff reads as its own soft
    volume (lit crown, cool underside) inside the overall canopy gradient."""
    me = ob.data
    zs = [v.co.z for v in me.vertices]
    z0, z1 = min(zs), max(zs)
    owner = []
    for v in me.vertices:
        best, bi = 1e9, 0
        for i, (pc, pr) in enumerate(puffs):
            d = abs((v.co - pc).length - pr)
            if d < best:
                best, bi = d, i
        owner.append(bi)
    gc = Vector((sum(p[0].x for p in puffs) / len(puffs), sum(p[0].y for p in puffs) / len(puffs), (z0 + z1) / 2))
    normals = []
    for v, oi in zip(me.vertices, owner):
        pc, pr = puffs[oi]
        local = (v.co - pc).normalized()
        glob = (v.co - gc)
        glob = Vector((glob.x / 1.3, glob.y / 1.3, glob.z)).normalized()
        normals.append(v.normal.lerp(local.lerp(glob, 0.35), blend).normalized())
    me.normals_split_custom_set_from_vertices(normals)
    off = Vector((seed * 3.1, seed * 1.7, 0))
    prnd = random.Random(seed)
    tints = [1 + (prnd.random() - 0.5) * 0.14 for _ in puffs]
    col = ensure_col(ob)
    for poly in me.polygons:
        for li in poly.loop_indices:
            vi = me.loops[li].vertex_index
            v = me.vertices[vi]
            pc, pr = puffs[owner[vi]]
            lz = (v.co.z - pc.z) / pr  # -1..1 within the puff
            gz = (v.co.z - z0) / max(1e-4, z1 - z0)
            t = max(0.0, min(1.0, 0.5 + lz * 0.32 + (gz - 0.5) * 0.75))
            c = mix(bottom, mid, min(1, t / 0.55)) if t < 0.55 else mix(mid, top, (t - 0.55) / 0.45)
            c = mul(c, tints[owner[vi]] * (1 + noise.noise(v.co * 1.7 + off) * 0.1))
            if spots is not None and lz > 0.2 and noise.noise(v.co * 2.3 + off) > 0.3:
                c = mix(c, spots, 0.5)
            col.data[li].color = (*c, 1)


def broadleaf(name: str, seed: int, height=4.2, spread=1.0, pal=None) -> bpy.types.Object:
    """Round-crowned deciduous tree: a flared, slightly twisting trunk that
    forks twice into curving limbs, each ending in a cauliflower clump."""
    rnd = random.Random(seed)
    pal = pal or {}
    sk = Skeleton()
    r_trunk = 0.16 + height * 0.04
    root = sk.add(Vector((0, 0, -0.12)), r_trunk * 1.6, None)
    for k in range(5):
        a = k / 5 * math.tau + rnd.random() * 0.6
        grow_branch(sk, rnd, root, Vector((0, 0, -0.12)), Vector((math.cos(a), math.sin(a), -0.28)), 0.45 + rnd.random() * 0.3, r_trunk * 0.75, r_trunk * 0.2, 2, 0.25, -0.25)
    lean = Vector(((rnd.random() - 0.5) * 0.35, (rnd.random() - 0.5) * 0.35, 1)).normalized()
    fork_h = height * (0.3 + rnd.random() * 0.08)
    fork = grow_branch(sk, rnd, root, Vector((0, 0, -0.12)), lean, fork_h, r_trunk * 1.08, r_trunk * 0.86, 4, 0.16, 0.0)
    fork_p = sk.verts[fork].copy()
    clumps = []
    n_limbs = 3 if rnd.random() < 0.55 else 4
    base_a = rnd.random() * math.tau
    for k in range(n_limbs):
        a = base_a + k / n_limbs * math.tau + (rnd.random() - 0.5) * 0.8
        out = 0.85 + rnd.random() * 0.35
        L = height * (0.3 + rnd.random() * 0.1) * spread
        mid = grow_branch(sk, rnd, fork, fork_p, Vector((math.cos(a) * out, math.sin(a) * out, 1)), L * 0.55, r_trunk * 0.66, r_trunk * 0.42, 3, 0.2, 0.15)
        mp = sk.verts[mid].copy()
        for s in (-1, 1):
            a2 = a + s * (0.45 + rnd.random() * 0.35)
            L2 = L * (0.5 + rnd.random() * 0.25)
            tip = grow_branch(sk, rnd, mid, mp, Vector((math.cos(a2) * 0.8, math.sin(a2) * 0.8, 1.0)), L2, r_trunk * 0.38, r_trunk * 0.14, 3, 0.3, 0.3)
            tp = sk.verts[tip].copy()
            clumps.append((tp + Vector((0, 0, 0.12)), (0.5 + L2 * 0.45) * (0.85 + rnd.random() * 0.3)))
    # A crowning clump closes the top of the silhouette.
    top = Vector((fork_p.x, fork_p.y, height * 0.86))
    clumps.append((top, height * 0.2 * spread))
    trunk = sk.build(f"{name}_trunk")
    color_bark(trunk, pal.get("bark0", C("#4a3328")), pal.get("bark1", C("#7a5a44")), seed, pal.get("ground"))
    canopy, puffs = clump_canopy(clumps, f"{name}_leaves", seed)
    shade_puffs(canopy, puffs, pal.get("leaf2", C("#c4cf62")), pal.get("leaf1", C("#6f9a3e")), pal.get("leaf0", C("#244232")), seed, pal.get("spots"))
    canopy["sway"] = 1.0
    ob = join([trunk, canopy], name)
    set_origin_base(ob)
    ob.location = (0, 0, 0)
    return ob


def conifer(name: str, seed: int, height=5.0, pal=None) -> bpy.types.Object:
    """Stylised fir: a conical cloud of overlapping, drooping tufts around a
    tapering trunk, with an irregular, slightly windswept crown."""
    rnd = random.Random(seed)
    pal = pal or {}
    sk = Skeleton()
    root = sk.add(Vector((0, 0, -0.1)), 0.12 + height * 0.024, None)
    grow_branch(sk, rnd, root, Vector((0, 0, -0.1)), Vector((0, 0, 1)), height * 0.7, 0.1 + height * 0.02, 0.05, 4, 0.03, 0)
    trunk = sk.build(f"{name}_trunk", subdiv=1)
    color_bark(trunk, pal.get("bark0", C("#3b2a22")), pal.get("bark1", C("#6a4a38")), seed)
    leaf0, leaf1, leaf2 = pal.get("leaf0", C("#173229")), pal.get("leaf1", C("#2c5a44")), pal.get("leaf2", C("#7aa463"))
    base_z = height * 0.16
    R = height * 0.27
    layers = 7
    puffs = []
    lean = Vector(((rnd.random() - 0.5) * 0.25, (rnd.random() - 0.5) * 0.25, 0))
    for j in range(layers):
        t = j / (layers - 1)
        z = base_z + (height - base_z) * t * 0.9
        rad = R * (1 - t) ** 0.85 + 0.08
        n = max(1, int(round(2 + rad / R * 7)))
        a0 = rnd.random() * math.tau
        for k in range(n):
            a = a0 + k / n * math.tau + (rnd.random() - 0.5) * 0.45
            rr = rad * (0.75 + rnd.random() * 0.3)
            p = Vector((math.cos(a) * rr, math.sin(a) * rr, z - rr * 0.32)) + lean * t
            pr = (0.3 + 0.36 * (1 - t)) * (height / 5) * (0.85 + rnd.random() * 0.3)
            puffs.append((p, pr, a))
        # Inner filler so the cone never looks hollow.
        puffs.append((Vector((0, 0, z + 0.1)) + lean * t, rad * 0.62 + 0.12, 0.0))
    puffs.append((Vector((0, 0, height * 0.97)) + lean, 0.22 * height / 5 + 0.08, 0.0))
    parts = []
    for i, (p, r, a) in enumerate(puffs):
        ob = mesh_obj(bm_ico(1.0, 2), f"{name}_q{i}")
        # Tufts are wider than tall and droop outward.
        ob.data.transform(Matrix.Diagonal((r * 1.25, r * 1.0, r * 0.72, 1)))
        ob.data.transform(Matrix.Rotation(a, 4, "Z"))
        for v in ob.data.vertices:
            out = (v.co.x * math.cos(a) + v.co.y * math.sin(a)) / max(1e-4, r * 1.25)
            if out > 0:
                v.co.z -= out * out * r * 0.35
        displace(ob, strength=r * 0.16, scale=2.4 / r, seed=seed * 53 + i)
        ob.data.transform(Matrix.Translation(p))
        parts.append(ob)
    foliage = join(parts, f"{name}_needles")
    me = foliage.data
    normals = []
    for v in me.vertices:
        u = v.co.z / height
        radial = Vector((v.co.x, v.co.y, 0.35 + u * 0.4)).normalized()
        normals.append(v.normal.lerp(radial, 0.7).normalized())
    me.normals_split_custom_set_from_vertices(normals)
    off = Vector((seed, 0, 0))

    def fn(co, n_, i):
        u = co.z / height
        cone_r = R * max(0.05, 1 - (co.z - base_z) / (height - base_z)) ** 0.85 + 0.1
        out = min(1.2, Vector((co.x, co.y)).length / cone_r)
        c = mix(leaf0, leaf1, max(0, min(1, (out - 0.35) * 1.5)))
        c = mix(c, leaf2, max(0, min(1, (out - 0.85) * 3 + (u - 0.6) * 0.8)) * 0.7)
        if n_.z < -0.2:
            c = mix(c, leaf0, min(1, -n_.z) * 0.7)
        return mul(c, (0.8 + 0.3 * u) * (1 + noise.noise(co * 1.6 + off) * 0.12))

    paint(foliage, fn)
    foliage["sway"] = 0.55
    tree = join([trunk, foliage], name)
    set_origin_base(tree)
    tree.location = (0, 0, 0)
    return tree


def tree_fern(name: str, seed: int, height=3.2, pal=None) -> bpy.types.Object:
    """Prehistoric tree fern: a shaggy curved trunk crowned by arching fronds."""
    rnd = random.Random(seed)
    pal = pal or {}
    sk = Skeleton()
    root = sk.add(Vector((0, 0, -0.1)), 0.24, None)
    d = Vector(((rnd.random() - 0.5) * 0.4, (rnd.random() - 0.5) * 0.4, 1))
    tip = grow_branch(sk, rnd, root, Vector((0, 0, -0.1)), d, height, 0.2, 0.15, 6, 0.18, 0.1)
    top = sk.verts[tip].copy()
    trunk = sk.build(f"{name}_trunk", subdiv=1)
    # Shaggy trunk: horizontal bands of old frond bases.
    displace(trunk, strength=0.035, scale=9, seed=seed)
    b0, b1 = pal.get("bark0", C("#3a2a20")), pal.get("bark1", C("#6e5238"))
    paint(trunk, lambda co, n, i: mul(mix(b0, b1, 0.5 + 0.5 * math.sin(co.z * 22)), 0.85 + 0.15 * min(1, co.z / height)))
    fronds = []
    n_f = 9
    for k in range(n_f):
        a = k / n_f * math.tau + rnd.random() * 0.3
        L = height * (0.55 + rnd.random() * 0.2)
        rise = 0.55 + rnd.random() * 0.3
        segs = 9
        bm = bmesh.new()
        left, right, mids = [], [], []
        for s in range(segs + 1):
            t = s / segs
            # Arching curve: up then down.
            px = t * L
            pz = math.sin(t * math.pi * 0.9) * L * 0.35 * rise - t * t * L * 0.38
            w = (0.22 * math.sin(min(1, t * 1.25) * math.pi) + 0.02) * L * 0.42
            mids.append(bm.verts.new((px, 0, pz + 0.03)))
            left.append(bm.verts.new((px, w, pz - w * 0.25)))
            right.append(bm.verts.new((px, -w, pz - w * 0.25)))
        for s in range(segs):
            bm.faces.new((mids[s], mids[s + 1], left[s + 1], left[s]))
            bm.faces.new((mids[s + 1], mids[s], right[s], right[s + 1]))
        ob = mesh_obj(bm, f"{name}_f{k}")
        sol = ob.modifiers.new("Sol", "SOLIDIFY")
        sol.thickness = 0.03
        apply_mods(ob)
        ob.data.transform(Matrix.Rotation(a, 4, "Z"))
        ob.data.transform(Matrix.Translation(top))
        l0, l1, l2 = pal.get("leaf0", C("#284a26")), pal.get("leaf1", C("#4f7a34")), pal.get("leaf2", C("#9fbf5a"))

        def fn(co, n_, i, top=top, L=L):
            t = min(1, (co - top).length / L)
            c = mix(l1, l2, t * 0.8) if n_.z > 0 else mix(l0, l1, t)
            return mul(c, 1 + noise.noise(co * 3 + Vector((seed, 0, 0))) * 0.1)

        paint(ob, fn)
        fronds.append(ob)
    crown = join(fronds, f"{name}_crown")
    crown["sway"] = 1.0
    ob = join([trunk, crown], name)
    set_origin_base(ob)
    ob.location = (0, 0, 0)
    return ob


def bush(name: str, seed: int, size=0.9, pal=None, flowers=None) -> bpy.types.Object:
    rnd = random.Random(seed)
    pal = pal or {}
    blobs = []
    n = 4 + rnd.randint(0, 2)
    for i in range(n):
        a = i / n * math.tau + rnd.random()
        d = size * (0.35 + rnd.random() * 0.25)
        r = size * (0.42 + rnd.random() * 0.22)
        blobs.append((Vector((math.cos(a) * d, math.sin(a) * d, r * 0.55)), r, 0.85))
    blobs.append((Vector((0, 0, size * 0.75)), size * 0.55, 0.9))
    ob = canopy_blobs(blobs, name, seed, lumpy=0.18, subdiv=2)
    zs = [v.co.z for v in ob.data.vertices]
    c = Vector((0, 0, (max(zs) + min(zs)) * 0.4))
    radial_normals(ob, c, blend=0.75, squash=Vector((1.4, 1.4, 1)))
    color_canopy(ob, c, pal.get("leaf2", C("#a9bf55")), pal.get("leaf1", C("#5d8436")), pal.get("leaf0", C("#2a4527")), seed, (max(zs) - min(zs)) / 2)
    if flowers:
        frnd = random.Random(seed + 99)
        blooms = []
        me = ob.data
        tops = [v.co.copy() for v in me.vertices if v.normal.z > 0.35]
        for k in range(min(len(tops), 7 + frnd.randint(0, 5))):
            p = tops[frnd.randrange(len(tops))]
            fc = flowers[frnd.randrange(len(flowers))]
            fl = mesh_obj(bm_ico(1.0, 1), f"{name}_fl{k}")
            fl.data.transform(Matrix.Diagonal((0.075, 0.075, 0.05, 1)))
            fl.data.transform(Matrix.Translation(p + Vector((0, 0, 0.02))))
            paint(fl, lambda co, n_, i, fc=fc: mix(fc, (1, 1, 0.85), max(0, n_.z) * 0.25))
            blooms.append(fl)
        if blooms:
            ob = join([ob] + blooms, name)
    ob["sway"] = 0.35
    set_origin_base(ob)
    ob.location = (0, 0, 0)
    for v in ob.data.vertices:
        v.co.z -= size * 0.08
    return ob


def grass_tuft(name: str, seed: int, blades=7, height=0.32, pal=None) -> bpy.types.Object:
    """A small clump of curved, tapered blades (instanced by the thousand at runtime)."""
    rnd = random.Random(seed)
    pal = pal or {}
    bm = bmesh.new()
    g0, g1 = pal.get("root", C("#3d5a26")), pal.get("tip", C("#b8c766"))
    tips = []
    for b in range(blades):
        a = rnd.random() * math.tau
        lean = 0.25 + rnd.random() * 0.45
        h = height * (0.6 + rnd.random() * 0.6)
        w = 0.035 + rnd.random() * 0.02
        ox, oy = (rnd.random() - 0.5) * 0.12, (rnd.random() - 0.5) * 0.12
        dx, dy = math.cos(a), math.sin(a)
        px, py = -dy, dx
        prev = None
        segs = 3
        for s in range(segs + 1):
            t = s / segs
            ww = w * (1 - t) ** 0.8
            cx = ox + dx * lean * h * t * t
            cy = oy + dy * lean * h * t * t
            cz = h * t - lean * h * 0.25 * t * t
            l = bm.verts.new((cx + px * ww, cy + py * ww, cz))
            r = bm.verts.new((cx - px * ww, cy - py * ww, cz))
            if prev:
                bm.faces.new((prev[0], prev[1], r, l))
            prev = (l, r)
            tips.append((l, t))
            tips.append((r, t))
    ob = mesh_obj(bm, name)
    me = ob.data
    col = ensure_col(ob)
    for poly in me.polygons:
        for li in poly.loop_indices:
            v = me.vertices[me.loops[li].vertex_index]
            t = max(0, min(1, v.co.z / height))
            c = mix(g0, g1, t ** 0.8)
            col.data[li].color = (*c, 1)
    # Grass normals point up so blades light like the ground they grow from.
    me.normals_split_custom_set_from_vertices([Vector((0, 0, 1)) for _ in me.vertices])
    ob["sway"] = 1.0
    return ob


def _frond(name, L, rise, width=0.42, segs=9, leaflets=True):
    """An arching, pinnate frond in the +X direction from the origin."""
    bm = bmesh.new()
    left, right, mids = [], [], []
    for s in range(segs + 1):
        t = s / segs
        px = t * L
        pz = math.sin(t * math.pi * 0.9) * L * 0.35 * rise - t * t * L * 0.38
        w = (0.22 * math.sin(min(1, t * 1.25) * math.pi) + 0.02) * L * width
        if leaflets and 0 < s < segs:
            w *= 1.25 if s % 2 else 0.7  # serrated, leaflet-like edge
        mids.append(bm.verts.new((px, 0, pz + 0.02 * L)))
        left.append(bm.verts.new((px, w, pz - w * 0.3)))
        right.append(bm.verts.new((px, -w, pz - w * 0.3)))
    for s in range(segs):
        bm.faces.new((mids[s], mids[s + 1], left[s + 1], left[s]))
        bm.faces.new((mids[s + 1], mids[s], right[s], right[s + 1]))
    ob = mesh_obj(bm, name)
    sol = ob.modifiers.new("Sol", "SOLIDIFY")
    sol.thickness = 0.015
    apply_mods(ob)
    return ob


def fern_clump(name: str, seed: int, size=0.8, pal=None) -> bpy.types.Object:
    rnd = random.Random(seed)
    pal = pal or {}
    l0, l1, l2 = pal.get("leaf0", C("#2b4d26")), pal.get("leaf1", C("#5f8f38")), pal.get("leaf2", C("#a9c25a"))
    parts = []
    n = 7 + rnd.randint(0, 3)
    for k in range(n):
        a = k / n * math.tau + rnd.random() * 0.4
        L = size * (0.75 + rnd.random() * 0.4)
        f = _frond(f"{name}_f{k}", L, 1.0 + rnd.random() * 0.5, width=0.5)
        f.data.transform(Matrix.Rotation(-0.35 - rnd.random() * 0.3, 4, "Y"))
        f.data.transform(Matrix.Rotation(a, 4, "Z"))

        def fn(co, n_, i, L=L):
            t = min(1, Vector((co.x, co.y)).length / L)
            c = mix(l0, l1, min(1, t * 1.8))
            c = mix(c, l2, max(0, t - 0.5) * 1.2 * max(0, n_.z))
            return mul(c, 1 + noise.noise(co * 4 + Vector((seed, 0, 0))) * 0.1)

        paint(f, fn)
        parts.append(f)
    ob = join(parts, name)
    ob["sway"] = 0.8
    return ob


def flower_patch(name: str, seed: int, colors, count=12, spread=0.55) -> bpy.types.Object:
    """A loose drift of little flowers on bent stems, with a few leaves."""
    rnd = random.Random(seed)
    parts = []
    stem_c = C("#4f7a32")
    for k in range(count):
        a = rnd.random() * math.tau
        d = spread * math.sqrt(rnd.random())
        x, y = math.cos(a) * d, math.sin(a) * d
        h = 0.18 + rnd.random() * 0.22
        lean = Vector(((rnd.random() - 0.5) * 0.12, (rnd.random() - 0.5) * 0.12, h))
        from kit import sweep
        stem = sweep(f"{name}_s{k}", [(x, y, -0.02), (x + lean.x * 0.4, y + lean.y * 0.4, h * 0.55), (x + lean.x, y + lean.y, h)], 0.012, around=4, cap=False)
        paint_solid = lambda ob, c: paint(ob, lambda co, n_, i: c)  # noqa: E731
        paint_solid(stem, stem_c)
        parts.append(stem)
        fc = colors[rnd.randrange(len(colors))]
        head = mesh_obj(bm_ico(1.0, 1), f"{name}_h{k}")
        r = 0.045 + rnd.random() * 0.03
        head.data.transform(Matrix.Diagonal((r, r, r * 0.6, 1)))
        head.data.transform(Matrix.Translation((x + lean.x, y + lean.y, h + r * 0.3)))
        paint(head, lambda co, n_, i, fc=fc: mix(mul(fc, 0.75), fc, 0.5 + 0.5 * n_.z))
        parts.append(head)
        if rnd.random() < 0.4:
            leaf = mesh_obj(bm_ico(1.0, 1), f"{name}_l{k}")
            leaf.data.transform(Matrix.Diagonal((0.09, 0.035, 0.012, 1)))
            leaf.data.transform(Matrix.Rotation(rnd.random() * 6, 4, "Z"))
            leaf.data.transform(Matrix.Translation((x, y, 0.03)))
            paint(leaf, lambda co, n_, i: C("#5a8a36"))
            parts.append(leaf)
    ob = join(parts, name)
    ob["sway"] = 0.5
    return ob


def mushrooms(name: str, seed: int, cap=None, spots=True) -> bpy.types.Object:
    """A little cluster of plump toadstools."""
    rnd = random.Random(seed)
    cap = cap or C("#c9442e")
    parts = []
    for k in range(3 + rnd.randint(0, 2)):
        a = rnd.random() * math.tau
        d = 0.05 + rnd.random() * 0.22
        x, y = math.cos(a) * d, math.sin(a) * d
        s = 0.6 + rnd.random() * 0.7
        stem = mesh_obj(bm_cyl(0.05 * s, 0.04 * s, 0.18 * s, 8), f"{name}_st{k}")
        stem.data.transform(Matrix.Translation((x, y, 0)))
        paint(stem, lambda co, n_, i: C("#efe2c6"))
        top = mesh_obj(bm_ico(1.0, 2), f"{name}_cap{k}")
        top.data.transform(Matrix.Diagonal((0.13 * s, 0.13 * s, 0.09 * s, 1)))
        for v in top.data.vertices:
            if v.co.z < 0:
                v.co.z *= 0.25
        top.data.transform(Matrix.Translation((x, y, 0.18 * s)))
        srnd = random.Random(seed * 7 + k)

        def fn(co, n_, i, srnd=srnd):
            if n_.z < -0.2:
                return C("#e8d6b4")
            c = cap
            if spots and noise.noise(co * 40 + Vector((seed, k, 0))) > 0.35:
                c = C("#fff4e0")
            return mul(c, 0.9 + 0.2 * max(0, n_.z))

        paint(top, fn)
        parts += [stem, top]
    return join(parts, name)
