"""Shared modelling toolkit for the Freakmoji art pipeline (Blender 5.x, headless).

Everything the game ships is modelled procedurally here, then exported as
vertex-coloured glTF: base colour lives in a colour attribute, ambient
occlusion is baked into it with Cycles, and one shared material is used so
the runtime can merge and instance freely.

Conventions
- Blender is Z-up; glTF export converts to Y-up (game space: x right, y up, z toward camera).
- Colours are linear floats; `C("#rrggbb")` converts from sRGB hex.
- Object custom properties export as glTF extras -> three.js `userData`:
    sway   (float)  wind strength for foliage (0 = rigid)
    role   (str)    'static' (merged), 'anim' (kept separate), 'anchor' (empty, gameplay point)
    col    (float)  collider radius for minion navigation (static props only)
"""
from __future__ import annotations

import math
import os
import random
import sys

import bmesh
import bpy
from mathutils import Matrix, Vector, noise

# ───────────────────────────────────────────────────────────── colour helpers


def srgb_to_linear(c: float) -> float:
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def C(hex_: str) -> tuple[float, float, float]:
    h = hex_.lstrip("#")
    return tuple(srgb_to_linear(int(h[i : i + 2], 16) / 255) for i in (0, 2, 4))  # type: ignore


def mix(a, b, t: float):
    return tuple(x + (y - x) * t for x, y in zip(a, b))


def mul(a, k: float):
    return tuple(x * k for x in a)


def jitter(c, amt: float, rnd: random.Random):
    """Small value/hue wobble so repeated assets never look stamped."""
    k = 1 + (rnd.random() - 0.5) * 2 * amt
    hue = (rnd.random() - 0.5) * amt
    return (max(0, c[0] * k * (1 + hue)), max(0, c[1] * k), max(0, c[2] * k * (1 - hue)))


# ───────────────────────────────────────────────────────────── scene helpers


def reset():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    for addon in ("cycles",):
        try:
            bpy.ops.preferences.addon_enable(module=addon)
        except Exception:
            pass
    sc = bpy.context.scene
    sc.unit_settings.system = "METRIC"
    if not sc.world:
        sc.world = bpy.data.worlds.new("World")


_MAT: bpy.types.Material | None = None


def vtx_material(name: str = "Vtx", rough: float = 0.82, metal: float = 0.0, emissive: bool = False) -> bpy.types.Material:
    """One principled material that takes its base colour from the 'Col' attribute."""
    mat = bpy.data.materials.get(name)
    if mat:
        return mat
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    nt = mat.node_tree
    bsdf = next(n for n in nt.nodes if n.type == "BSDF_PRINCIPLED")
    attr = nt.nodes.new("ShaderNodeVertexColor")
    attr.layer_name = "Col"
    nt.links.new(attr.outputs["Color"], bsdf.inputs["Base Color"])
    bsdf.inputs["Roughness"].default_value = rough
    bsdf.inputs["Metallic"].default_value = metal
    if emissive:
        nt.links.new(attr.outputs["Color"], bsdf.inputs["Emission Color"])
        bsdf.inputs["Emission Strength"].default_value = 1.0
    return mat


def obj_from_bm(bm: bmesh.types.BMesh, name: str, mat: bpy.types.Material | None = None, smooth: bool = True) -> bpy.types.Object:
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    ob = bpy.data.objects.new(name, me)
    bpy.context.scene.collection.objects.link(ob)
    for p in me.polygons:
        p.use_smooth = smooth
    me.materials.append(mat or vtx_material())
    return ob


def link(ob: bpy.types.Object, coll: bpy.types.Collection | None = None) -> bpy.types.Object:
    target = coll or bpy.context.scene.collection
    if ob.name not in target.objects:
        target.objects.link(ob)
    return ob


def collection(name: str) -> bpy.types.Collection:
    c = bpy.data.collections.get(name) or bpy.data.collections.new(name)
    if c.name not in bpy.context.scene.collection.children:
        bpy.context.scene.collection.children.link(c)
    return c


def move_to(ob: bpy.types.Object, coll: bpy.types.Collection) -> None:
    for c in list(ob.users_collection):
        c.objects.unlink(ob)
    coll.objects.link(ob)


def select_only(objs):
    bpy.ops.object.select_all(action="DESELECT")
    for o in objs:
        o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]


def apply_mods(ob: bpy.types.Object) -> None:
    select_only([ob])
    for m in list(ob.modifiers):
        bpy.ops.object.modifier_apply(modifier=m.name)


def apply_transform(ob: bpy.types.Object, loc=False, rot=True, scale=True) -> None:
    select_only([ob])
    bpy.ops.object.transform_apply(location=loc, rotation=rot, scale=scale)


def join(objs, name: str) -> bpy.types.Object:
    objs = [o for o in objs if o]
    select_only(objs)
    bpy.ops.object.join()
    ob = bpy.context.view_layer.objects.active
    ob.name = name
    ob.data.name = name
    return ob


def set_origin_base(ob: bpy.types.Object) -> None:
    """Origin at the bottom-centre of the bounding box (so props sit on y=0)."""
    me = ob.data
    if not me.vertices:
        return
    xs = [v.co.x for v in me.vertices]
    ys = [v.co.y for v in me.vertices]
    zs = [v.co.z for v in me.vertices]
    off = Vector(((min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2, min(zs)))
    me.transform(Matrix.Translation(-off))
    ob.location += off


def shade_flat(ob):
    for p in ob.data.polygons:
        p.use_smooth = False


def shade_smooth(ob):
    for p in ob.data.polygons:
        p.use_smooth = True


# ───────────────────────────────────────────────────────────── colour attributes


def ensure_col(ob: bpy.types.Object, name: str = "Col"):
    me = ob.data
    a = me.color_attributes.get(name)
    if a is None:
        a = me.color_attributes.new(name=name, type="FLOAT_COLOR", domain="CORNER")
    me.color_attributes.active_color = a
    try:
        me.color_attributes.render_color_index = me.color_attributes.find(name)
    except Exception:
        pass
    return a


def paint(ob: bpy.types.Object, fn, name: str = "Col") -> None:
    """fn(co: Vector (object space), normal: Vector, poly_index) -> rgb."""
    me = ob.data
    me.update()
    a = ensure_col(ob, name)
    for poly in me.polygons:
        for li in poly.loop_indices:
            vi = me.loops[li].vertex_index
            v = me.vertices[vi]
            rgb = fn(v.co, poly.normal if not poly.use_smooth else v.normal, poly.index)
            a.data[li].color = (rgb[0], rgb[1], rgb[2], 1.0)


def paint_solid(ob, rgb, name="Col"):
    paint(ob, lambda co, n, i: rgb, name)


def paint_faces(ob, fn, name="Col"):
    """Per-face colour (flat look): fn(center, normal, index) -> rgb."""
    me = ob.data
    a = ensure_col(ob, name)
    for poly in me.polygons:
        rgb = fn(poly.center, poly.normal, poly.index)
        for li in poly.loop_indices:
            a.data[li].color = (rgb[0], rgb[1], rgb[2], 1.0)


def bake_ao(objs, samples: int = 64, distance: float = 0.6, strength: float = 0.75, extra_occluders=(), ground: bool = True, floor_z: float = 0.0) -> None:
    """Bake Cycles AO into an 'AO' attribute, then multiply it into 'Col'.

    A temporary ground plane makes undersides and bases darken where they
    meet the floor, which is most of what makes props feel grounded.
    """
    sc = bpy.context.scene
    sc.render.engine = "CYCLES"
    sc.cycles.samples = samples
    sc.cycles.device = "CPU"
    sc.world.light_settings.distance = distance
    sc.render.bake.target = "VERTEX_COLORS"
    sc.render.bake.use_selected_to_active = False
    plane = None
    if ground:
        bpy.ops.mesh.primitive_plane_add(size=200, location=(0, 0, floor_z - 0.002))
        plane = bpy.context.active_object
    hidden = []
    for o in sc.objects:
        if o.type == "MESH" and o not in objs and o not in extra_occluders and o is not plane:
            if not o.hide_render:
                hidden.append(o)
                o.hide_render = True
    for ob in objs:
        me = ob.data
        # Per-vertex (POINT) AO: per-corner baking samples every face corner
        # separately, which reads as blotchy facets.
        ao = me.color_attributes.new(name="AO", type="FLOAT_COLOR", domain="POINT")
        me.color_attributes.active_color = ao
        select_only([ob])
        bpy.ops.object.bake(type="AO")
        ao = me.color_attributes["AO"]
        col = me.color_attributes.get("Col")
        if col is not None:
            corner = col.domain == "CORNER"
            for i in range(len(col.data)):
                vi = me.loops[i].vertex_index if corner else i
                a = ao.data[vi].color[0]
                k = 1 - strength + strength * a
                c = col.data[i].color
                col.data[i].color = (c[0] * k, c[1] * k, c[2] * k, c[3])
        me.color_attributes.remove(ao)
        ensure_col(ob, "Col")
    for o in hidden:
        o.hide_render = False
    if plane:
        bpy.data.objects.remove(plane, do_unlink=True)


# ───────────────────────────────────────────────────────────── primitives (bmesh)


def bm_ico(radius=1.0, subdiv=2) -> bmesh.types.BMesh:
    bm = bmesh.new()
    bmesh.ops.create_icosphere(bm, subdivisions=subdiv, radius=radius)
    return bm


def bm_uvsphere(radius=1.0, segs=16, rings=10) -> bmesh.types.BMesh:
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=segs, v_segments=rings, radius=radius)
    return bm


def bm_cyl(r1=1.0, r2=1.0, depth=1.0, segs=12, cap=True) -> bmesh.types.BMesh:
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=cap, cap_tris=False, segments=segs, radius1=r1, radius2=r2, depth=depth)
    bmesh.ops.translate(bm, verts=bm.verts, vec=(0, 0, depth / 2))
    return bm


def bm_box(sx=1.0, sy=1.0, sz=1.0) -> bmesh.types.BMesh:
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1.0)
    bmesh.ops.scale(bm, vec=(sx, sy, sz), verts=bm.verts)
    bmesh.ops.translate(bm, verts=bm.verts, vec=(0, 0, sz / 2))
    return bm


def mesh_obj(bm, name, mat=None, smooth=True):
    return obj_from_bm(bm, name, mat, smooth)


def add_bevel(ob, width=0.04, segments=2, angle=None, harden=True):
    m = ob.modifiers.new("Bevel", "BEVEL")
    m.width = width
    m.segments = segments
    m.limit_method = "ANGLE" if angle is not None else "NONE"
    if angle is not None:
        m.angle_limit = math.radians(angle)
    m.harden_normals = harden
    return m


def add_subsurf(ob, levels=1):
    m = ob.modifiers.new("Subsurf", "SUBSURF")
    m.levels = levels
    m.render_levels = levels
    return m


def displace(ob, strength=0.2, scale=1.0, seed=0, detail=2, axis=None):
    """Noise displacement along normals (applied immediately)."""
    me = ob.data
    off = Vector((seed * 13.7, seed * 7.1, seed * 3.3))
    me.update()
    for v in me.vertices:
        p = v.co * scale + off
        n = noise.fractal(p, 0.55, 2.0, detail, noise_basis="PERLIN_ORIGINAL")
        if axis is None:
            v.co += v.normal * n * strength
        else:
            v.co += Vector(axis) * n * strength


def decimate_planar(ob, angle=8):
    m = ob.modifiers.new("Dec", "DECIMATE")
    m.decimate_type = "DISSOLVE"
    m.angle_limit = math.radians(angle)
    return m


def decimate_ratio(ob, ratio=0.5):
    m = ob.modifiers.new("Dec", "DECIMATE")
    m.ratio = ratio
    return m


def triangulate(ob):
    m = ob.modifiers.new("Tri", "TRIANGULATE")
    return m


def radial_normals(ob, center: Vector, blend: float = 0.75, squash=Vector((1, 1, 1))):
    """Custom normals pointing away from `center`: the soft, painterly
    shading stylised foliage relies on (no faceting inside a canopy)."""
    me = ob.data
    normals = []
    for v in me.vertices:
        d = (v.co - center)
        d = Vector((d.x / squash.x, d.y / squash.y, d.z / squash.z))
        if d.length < 1e-6:
            d = Vector((0, 0, 1))
        n = v.normal.lerp(d.normalized(), blend).normalized()
        normals.append(n)
    me.normals_split_custom_set_from_vertices(normals)


# ───────────────────────────────────────────────────────────── export & preview


def export_glb(path: str, objs=None, compress=False) -> None:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    if objs is not None:
        select_only(list(objs))
    kw = dict(
        filepath=path,
        export_format="GLB",
        use_selection=objs is not None,
        export_vertex_color="ACTIVE",
        export_all_vertex_colors=False,
        export_extras=True,
        export_attributes=True,
        export_texcoords=False,
        export_normals=True,
        export_materials="EXPORT",
        export_yup=True,
        export_apply=True,
        export_animations=False,
        export_cameras=False,
        export_lights=False,
    )
    if compress:
        kw["export_meshopt_compression_enable"] = True
    bpy.ops.export_scene.gltf(**kw)
    print(f"exported {path} ({os.path.getsize(path) / 1024:.0f} KB)")


def preview(path: str, eye=(0, -9, 3.5), target=(0, 0, 1.0), lens=50, size=(960, 600), sun_dir=(-0.5, -0.4, 0.75), world_rgb=(0.55, 0.5, 0.6), sun=3.2, ortho=None) -> None:
    """Quick Eevee render for visual QA (not shipped)."""
    sc = bpy.context.scene
    sc.render.engine = "BLENDER_EEVEE"
    sc.render.resolution_x, sc.render.resolution_y = size
    sc.render.film_transparent = False
    sc.view_settings.view_transform = "Standard"
    cam_data = bpy.data.cameras.new("PrevCam")
    cam_data.lens = lens
    if ortho:
        cam_data.type = "ORTHO"
        cam_data.ortho_scale = ortho
    cam = bpy.data.objects.new("PrevCam", cam_data)
    sc.collection.objects.link(cam)
    cam.location = eye
    d = Vector(target) - Vector(eye)
    cam.rotation_euler = d.to_track_quat("-Z", "Y").to_euler()
    sc.camera = cam
    ld = bpy.data.lights.new("PrevSun", "SUN")
    ld.energy = sun
    ld.angle = math.radians(8)
    lo = bpy.data.objects.new("PrevSun", ld)
    sc.collection.objects.link(lo)
    lo.rotation_euler = Vector(sun_dir).to_track_quat("Z", "Y").to_euler()
    w = sc.world
    w.use_nodes = True
    bg = w.node_tree.nodes.get("Background")
    bg.inputs["Color"].default_value = (*world_rgb, 1)
    bg.inputs["Strength"].default_value = 1.0
    sc.render.filepath = path
    bpy.ops.render.render(write_still=True)
    bpy.data.objects.remove(cam, do_unlink=True)
    bpy.data.objects.remove(lo, do_unlink=True)


def argv() -> list[str]:
    return sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else []


def sweep(name: str, points, radii, around: int = 8, cap: bool = True, mat=None, smooth=True) -> bpy.types.Object:
    """A tube swept along a polyline with per-point radii (tusks, horns,
    pipes, cables, rings). Frames are parallel-transported so it never twists."""
    pts = [Vector(p) for p in points]
    if isinstance(radii, (int, float)):
        radii = [radii] * len(pts)
    bm = bmesh.new()
    rings = []
    tangent = (pts[1] - pts[0]).normalized()
    ref = Vector((0, 0, 1)) if abs(tangent.z) < 0.9 else Vector((1, 0, 0))
    nrm = tangent.cross(ref).normalized()
    for i, p in enumerate(pts):
        if i == 0:
            t = (pts[1] - pts[0]).normalized()
        elif i == len(pts) - 1:
            t = (pts[-1] - pts[-2]).normalized()
        else:
            t = (pts[i + 1] - pts[i - 1]).normalized()
        # Parallel transport the normal onto the new tangent's plane.
        nrm = (nrm - t * nrm.dot(t)).normalized()
        bin_ = t.cross(nrm).normalized()
        ring = []
        for k in range(around):
            a = k / around * math.tau
            off = nrm * math.cos(a) * radii[i] + bin_ * math.sin(a) * radii[i]
            ring.append(bm.verts.new(p + off))
        rings.append(ring)
    closed = (pts[0] - pts[-1]).length < 1e-5
    n = len(rings) - (1 if closed else 0)
    for i in range(n):
        a_ring = rings[i]
        b_ring = rings[(i + 1) % len(rings)] if not closed else rings[(i + 1) % (len(rings) - 1)]
        for k in range(around):
            j = (k + 1) % around
            bm.faces.new((a_ring[k], a_ring[j], b_ring[j], b_ring[k]))
    if cap and not closed:
        bm.faces.new(list(reversed(rings[0])))
        bm.faces.new(rings[-1])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    return obj_from_bm(bm, name, mat, smooth)
