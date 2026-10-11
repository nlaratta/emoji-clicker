"""Era ground: a polar-grid terrain (dense around the arena, sparse toward the
horizon) with painted colour, baked AO and a `_grass` density attribute that
the runtime uses to scatter instanced grass.

All composition code works in GAME coordinates (x right, z toward the camera,
y up); `G()` converts to Blender (x, -z, y).
"""
from __future__ import annotations

import math

import bmesh
import bpy
from mathutils import Vector

from kit import ensure_col, mesh_obj


def G(x: float, z: float, y: float = 0.0) -> Vector:
    return Vector((x, -z, y))


def smoothstep(a: float, b: float, x: float) -> float:
    t = max(0.0, min(1.0, (x - a) / (b - a)))
    return t * t * (3 - 2 * t)


def ring_radii(inner_step=0.35, inner=13.0, outer=130.0) -> list[float]:
    rs = [0.0]
    r = 0.0
    while r < inner:
        r += inner_step
        rs.append(r)
    step = inner_step
    while r < outer:
        step *= 1.16
        r += step
        rs.append(min(r, outer))
    return rs


def build_terrain(name: str, height, color, grass, segs=176, inner_step=0.35, inner=13.0, outer=220.0) -> bpy.types.Object:
    """height(x, z) -> y, color(x, z, y, slope) -> rgb, grass(x, z) -> 0..1 (game coords)."""
    bm = bmesh.new()
    radii = ring_radii(inner_step, inner, outer)
    center = bm.verts.new(G(0, 0, height(0, 0)))
    rows = []
    for r in radii[1:]:
        row = []
        for i in range(segs):
            a = i / segs * math.tau
            x, z = math.cos(a) * r, math.sin(a) * r
            row.append(bm.verts.new(G(x, z, height(x, z))))
        rows.append(row)
    for i in range(segs):
        j = (i + 1) % segs
        bm.faces.new((center, rows[0][j], rows[0][i]))
    for k in range(len(rows) - 1):
        for i in range(segs):
            j = (i + 1) % segs
            bm.faces.new((rows[k][i], rows[k][j], rows[k + 1][j], rows[k + 1][i]))
    ob = mesh_obj(bm, name, smooth=True)
    me = ob.data
    me.update()
    col = ensure_col(ob)
    for poly in me.polygons:
        for li in poly.loop_indices:
            v = me.vertices[me.loops[li].vertex_index]
            x, z, y = v.co.x, -v.co.y, v.co.z
            slope = 1 - max(0.0, v.normal.z)
            c = color(x, z, y, slope)
            col.data[li].color = (c[0], c[1], c[2], 1.0)
    ob["role"] = "terrain"
    return ob


def build_grassmap(name: str, terrain: bpy.types.Object, grass, max_r: float = 32.0) -> bpy.types.Object:
    """Grass density as its own small mesh (the terrain inside `max_r`, with
    density in the vertex colour). Not rendered: the runtime scatters
    instanced blades from it. (Blender drops vertex-colour alpha and extra
    colour sets, and gltfpack drops custom attributes, so this is the robust
    channel.)"""
    src = terrain.data
    bm = bmesh.new()
    bm.from_mesh(src)
    far = [v for v in bm.verts if Vector((v.co.x, v.co.y)).length > max_r + 3]
    bmesh.ops.delete(bm, geom=far, context="VERTS")
    ob = mesh_obj(bm, name, smooth=True)
    col = ensure_col(ob)
    me = ob.data
    for poly in me.polygons:
        for li in poly.loop_indices:
            v = me.vertices[me.loops[li].vertex_index]
            d = grass(v.co.x, -v.co.y)
            col.data[li].color = (d, d, d, 1.0)
    ob["role"] = "grassmap"
    return ob


def place(ob: bpy.types.Object, x: float, z: float, height=None, yaw: float = 0.0, scale: float = 1.0, sink: float = 0.0) -> bpy.types.Object:
    y = height(x, z) if height else 0.0
    ob.location = G(x, z, y - sink)
    ob.rotation_euler = (0, 0, yaw)
    ob.scale = (scale, scale, scale)
    return ob


def anchor(name: str, x: float, z: float, y: float = 0.0, **props) -> bpy.types.Object:
    """An empty exported as a named glTF node: a gameplay point for minions
    or an attachment point for runtime effects (fire, smoke, lights)."""
    e = bpy.data.objects.new(name, None)
    e.empty_display_size = 0.3
    e.location = G(x, z, y)
    e["role"] = "anchor"
    for k, v in props.items():
        e[k] = v
    bpy.context.scene.collection.objects.link(e)
    return e
