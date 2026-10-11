"""Rocks, boulders, pebbles and layered cliffs: faceted, chamfered, painted."""
from __future__ import annotations

import math
import random

import bmesh
import bpy
from mathutils import Matrix, Vector, noise

from kit import (
    C, add_bevel, apply_mods, bm_ico, decimate_planar, displace, join, mesh_obj, mix, mul, paint_faces,
    set_origin_base, shade_flat,
)


def boulder(name: str, seed: int, size=1.0, squash=0.7, pal=None, moss=True, facets=9, subdiv=None) -> bpy.types.Object:
    """A faceted boulder: noisy sphere, planar-decimated into broad chunky
    facets, then lightly chamfered so edges catch the light."""
    rnd = random.Random(seed)
    pal = pal or {}
    ob = mesh_obj(bm_ico(1.0, subdiv if subdiv is not None else (3 if size >= 0.6 else 2)), name, smooth=False)
    me = ob.data
    stretch = Vector((1 + (rnd.random() - 0.5) * 0.5, 1 + (rnd.random() - 0.5) * 0.5, squash))
    me.transform(Matrix.Diagonal((*stretch, 1)))
    displace(ob, strength=0.28, scale=1.1, seed=seed, detail=2)
    # Flat-ish bottom so it beds into the ground.
    for v in me.vertices:
        if v.co.z < -0.35 * squash:
            v.co.z = -0.35 * squash + (v.co.z + 0.35 * squash) * 0.25
    decimate_planar(ob, facets)
    apply_mods(ob)
    add_bevel(ob, width=0.035, segments=1, angle=25, harden=False)
    apply_mods(ob)
    me.transform(Matrix.Diagonal((size, size, size, 1)))
    shade_flat(ob)
    base = pal.get("rock", C("#8d7e70"))
    dark = pal.get("rock_dark", C("#5a4d47"))
    moss_c = pal.get("moss", C("#7c8f3a"))
    off = Vector((seed * 1.3, seed * 2.1, 0))

    def fn(c, n, i):
        k = noise.noise(c * 1.4 / size + off)
        col = mix(dark, base, 0.55 + 0.45 * n.z + k * 0.25)
        col = mul(col, 0.92 + rnd.random() * 0.12)
        if moss and n.z > 0.55 and noise.noise(c * 1.1 / size + off * 3) > -0.15:
            col = mix(col, moss_c, min(1, (n.z - 0.55) * 3.5))
        return col

    paint_faces(ob, fn)
    set_origin_base(ob)
    ob.location = (0, 0, 0)
    # Sink slightly so there is no visible gap at the base.
    ob.data.transform(Matrix.Translation((0, 0, -0.06 * size)))
    return ob


def pebble_cluster(name: str, seed: int, count=6, spread=0.5, size=0.12, pal=None) -> bpy.types.Object:
    rnd = random.Random(seed)
    parts = []
    for i in range(count):
        p = boulder(f"{name}_{i}", seed * 31 + i, size=size * (0.6 + rnd.random() * 0.8), squash=0.6, pal=pal, moss=False, facets=12)
        a = rnd.random() * math.tau
        d = rnd.random() * spread
        p.location = (math.cos(a) * d, math.sin(a) * d, 0)
        p.rotation_euler = (0, 0, rnd.random() * math.tau)
        parts.append(p)
    ob = join(parts, name)
    from kit import apply_transform
    apply_transform(ob, loc=False)
    return ob


def _slab(bm, outline, z0, z1):
    """Extrude a closed outline into a vertical-sided slab."""
    lo = [bm.verts.new((x, y, z0)) for x, y in outline]
    hi = [bm.verts.new((x, y, z1)) for x, y in outline]
    n = len(outline)
    for i in range(n):
        j = (i + 1) % n
        bm.faces.new((lo[i], lo[j], hi[j], hi[i]))
    bm.faces.new(list(reversed(lo)))
    bm.faces.new(hi)


def mesa(name: str, seed: int, radius=6.0, height=9.0, pal=None, pillars=4, stretch=(1.0, 1.0), **_) -> bpy.types.Object:
    """A sandstone butte built as a cluster of faceted, flat-topped pillars of
    different heights over a rubble skirt, banded with horizontal strata."""
    rnd = random.Random(seed)
    pal = pal or {}
    bands = pal.get("bands", [C("#c9774f"), C("#dc9b68"), C("#b5604a"), C("#e6b17f"), C("#a65448")])
    ledge = pal.get("ledge", C("#efc792"))
    shadow = pal.get("shadow", C("#7a4048"))
    talus_c = pal.get("talus", C("#a8705a"))
    band_h = height / 7.5
    parts = []
    for k in range(pillars + 1):
        talus = k == pillars
        if talus:
            pr, ph, px, py = radius * 1.25, height * 0.18, 0.0, 0.0
        else:
            a = k / pillars * math.tau + rnd.random() * 0.8
            d = radius * (0.15 + rnd.random() * 0.4) if k else 0.0
            pr = radius * (0.55 + rnd.random() * 0.3) * (1.15 if k == 0 else 1.0)
            ph = height * ((1.0 if k == 0 else 0.55 + rnd.random() * 0.35))
            px, py = math.cos(a) * d, math.sin(a) * d
        ob = mesh_obj(bm_ico(1.0, 2), f"{name}_p{k}", smooth=False)
        me = ob.data
        me.transform(Matrix.Diagonal((pr * stretch[0], pr * stretch[1], ph * 0.85, 1)))
        displace(ob, strength=pr * 0.16, scale=1.4 / pr, seed=seed * 11 + k)
        top = ph * (0.6 if not talus else 0.12)
        for v in me.vertices:
            # Steep walls: push the upper half outward so the column is boxy, then cut the top flat.
            if not talus and v.co.z > -ph * 0.3:
                s = 1.18
                v.co.x *= s
                v.co.y *= s
            if v.co.z > top:
                v.co.z = top + (v.co.z - top) * 0.04
            if v.co.z < -ph * 0.3:
                v.co.z = -ph * 0.3
        decimate_planar(ob, 7)
        apply_mods(ob)
        me.transform(Matrix.Translation((px, py, ph * 0.3)))
        parts.append(ob)
    ob = join(parts, name)
    shade_flat(ob)

    def fn(c, n, i):
        if n.z > 0.6:
            return mul(ledge, 0.94 + rnd.random() * 0.06)
        if c.z < height * 0.1:
            return mul(mix(shadow, talus_c, 0.5 + 0.5 * max(0, n.z)), 0.93 + rnd.random() * 0.08)
        bi = int(c.z / band_h)
        col = bands[(bi + seed) % len(bands)]
        col = mix(col, shadow, max(0.0, -n.z) * 0.6 + max(0.0, 0.3 - c.z / height) * 0.5)
        return mul(col, 0.96 + rnd.random() * 0.05)

    # Re-split faces along strata lines so bands are crisp horizontal stripes.
    bm = bmesh.new()
    bm.from_mesh(ob.data)
    zs = [v.co.z for v in bm.verts]
    z = band_h
    while z < max(zs):
        geom = bm.verts[:] + bm.edges[:] + bm.faces[:]
        bmesh.ops.bisect_plane(bm, geom=geom, plane_co=(0, 0, z), plane_no=(0, 0, 1))
        z += band_h
    bm.to_mesh(ob.data)
    bm.free()
    shade_flat(ob)
    paint_faces(ob, fn)
    set_origin_base(ob)
    ob.location = (0, 0, 0)
    return ob


def cliff_wall(name: str, seed: int, length=20.0, height=8.0, depth=4.0, pal=None, terraces=3) -> bpy.types.Object:
    """A long escarpment: a mesa stretched along X."""
    r = depth / 2
    return mesa(name, seed, radius=r, height=height, pal=pal, terraces=terraces, stretch=(length / depth, 1.0))
