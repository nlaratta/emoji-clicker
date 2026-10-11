"""Minion characters and their gear, exported as jointed part hierarchies.

    Blender -b --factory-startup -P minions.py -- <out.glb> [preview.png]

Each character is an empty `chr_<id>` whose children are parts named
`<id>_<part>`, origins at their joints (hip, neck, shoulder...), parented in a
hierarchy. Characters face game +z (Blender -Y) and stand on y = 0. The
runtime animates the parts procedurally and draws each part instanced.

Materials: `Vtx` (matte vertex colour) and `Gloss` (eyes, shiny bits).
"""
import math
import os
import random
import sys

sys.path.insert(0, os.path.dirname(__file__))
import bmesh  # noqa: E402
import bpy  # noqa: E402
from mathutils import Matrix, Vector, noise  # noqa: E402

from kit import (  # noqa: E402
    C, apply_mods, argv, bake_ao, bm_cyl, bm_ico, collection, displace, export_glb, join, mesh_obj, mix, move_to, mul,
    paint, paint_faces, paint_solid, preview, reset, sweep, vtx_material,
)
from rocks import boulder  # noqa: E402

reset()
args = argv()
OUT = args[0]
PREVIEW = args[1] if len(args) > 1 else None
OUTC = collection("export")
GLOSS = vtx_material("Gloss", rough=0.18)
METAL = vtx_material("Metal", rough=0.35, metal=0.7)


def blob(name, radii, center=(0, 0, 0), subdiv=3, rot=None):
    ob = mesh_obj(bm_ico(1.0, subdiv), name)
    ob.data.transform(Matrix.Diagonal((*radii, 1)))
    if rot:
        ob.data.transform(Matrix.Rotation(rot[0], 4, rot[1]))
    ob.data.transform(Matrix.Translation(center))
    return ob


def capsule(name, p0, p1, r0, r1=None, around=10):
    """A tapered limb between two points (rounded ends)."""
    r1 = r0 if r1 is None else r1
    p0, p1 = Vector(p0), Vector(p1)
    pts, radii = [], []
    n = 8
    for i in range(n + 1):
        t = i / n
        pts.append(p0.lerp(p1, t))
        radii.append(r0 + (r1 - r0) * t)
    tube = sweep(name, pts, radii, around=around, cap=False)
    caps = [blob(f"{name}_c0", (r0, r0, r0), tuple(p0), 2), blob(f"{name}_c1", (r1, r1, r1), tuple(p1), 2)]
    return join([tube] + caps, name)


def eye(name, center, radii, look=Vector((0, -1, 0))):
    """Glossy black eye with a white glint (separate Gloss material)."""
    e = blob(name, radii, center, 2)
    e.data.materials.clear()
    e.data.materials.append(GLOSS)
    paint_solid(e, C("#0d0a0c"))
    g = blob(f"{name}_g", (radii[0] * 0.32, radii[1] * 0.3, radii[2] * 0.3), (center[0] + radii[0] * 0.35, center[1] - radii[1] * 0.9, center[2] + radii[2] * 0.4), 1)
    g.data.materials.clear()
    g.data.materials.append(GLOSS)
    paint_solid(g, (1.6, 1.6, 1.6))
    return join([e, g], name)


def fur(ob, base, light, dark, seed=0, belly=None, belly_col=None):
    off = Vector((seed, 0, 0))

    def fn(co, n, i):
        c = mix(dark, base, 0.55 + 0.45 * max(-1, min(1, n.z * 1.3)))
        c = mix(c, light, max(0.0, n.z) * 0.35)
        c = mul(c, 1 + noise.noise(co * 9 + off) * 0.05)
        if belly is not None and belly(co, n):
            c = belly_col
        return c

    paint(ob, fn)


ORIGIN: dict[str, Vector] = {}


def part(ob, name, origin, parent):
    """Turn a mesh into a rig part: pivot at `origin` (world, rest pose),
    parented so its local translation is the offset from the parent's pivot."""
    origin = Vector(origin)
    ob.data.transform(Matrix.Translation(-origin))
    ob.name = name
    ob.data.name = name
    ob.parent = parent
    ob.location = origin - ORIGIN.get(parent.name, Vector())
    ORIGIN[name] = origin
    move_to(ob, OUTC)
    ob["role"] = "part"
    # Game-space pivot (x, y, z) and parent part: the runtime rebuilds the
    # rig from these, independent of how gltfpack lays out the nodes.
    ob["joint"] = [origin.x, origin.z, -origin.y]
    ob["parentPart"] = parent.name if parent.get("role") == "part" else ""
    return ob


def character(cid):
    root = bpy.data.objects.new(f"chr_{cid}", None)
    OUTC.objects.link(root)
    root["role"] = "character"
    return root


# Blender: -Y is the character's front (game +z, toward the camera).
# ───────────────────────────────────────────── Poke Monkey
def monkey():
    FUR, FUR_L, FUR_D = C("#8a5536"), C("#b07548"), C("#5a3422")
    PEACH, PEACH_D = C("#f4caa0"), C("#d9a47c")
    root = character("monkey")
    hip = Vector((0, 0, 0.21))
    body = blob("m_body", (0.15, 0.13, 0.185), (0, 0.01, 0.34))
    fur(body, FUR, FUR_L, FUR_D, 1, belly=lambda co, n, *_: n.y < -0.45 and co.z < 0.4, belly_col=PEACH)
    body = part(body, "monkey_body", hip, root)
    neck = Vector((0, 0, 0.47))
    head = blob("m_head", (0.175, 0.16, 0.165), (0, 0, 0.62))
    fur(head, FUR, FUR_L, FUR_D, 2, belly=lambda co, n, *_: n.y < -0.42 and co.z < 0.71 and not (abs(co.x) < 0.02 and co.z > 0.69), belly_col=PEACH)
    muzzle = blob("m_muzzle", (0.095, 0.06, 0.06), (0, -0.135, 0.565))
    paint(muzzle, lambda co, n, *_: mix(PEACH_D, PEACH, 0.6 + 0.4 * max(0, n.z)))
    nostrils = [blob(f"m_nos{s}", (0.01, 0.006, 0.008), (s * 0.018, -0.192, 0.582), 1) for s in (-1, 1)]
    for nn in nostrils:
        paint_solid(nn, C("#3a2018"))
    mouth = sweep("m_mouth", [(-0.035, -0.188, 0.548), (0, -0.196, 0.542), (0.035, -0.188, 0.548)], 0.006, around=4)
    paint_solid(mouth, C("#4a2418"))
    ears = []
    for s in (-1, 1):
        e = blob(f"m_ear{s}", (0.028, 0.06, 0.07), (s * 0.175, 0.0, 0.64), 2)
        paint(e, lambda co, n, *_, s=s: PEACH_D if n.x * s < 0.3 else FUR)
        ears.append(e)
    tuft = [blob(f"m_tuft{k}", (0.03, 0.03, 0.06), (0.03 * (k - 1), 0.02, 0.785), 1, rot=(0.4 * (k - 1), "Y")) for k in range(3)]
    for t in tuft:
        paint_solid(t, FUR_D)
    eyes = [eye(f"m_eye{s}", (s * 0.062, -0.142, 0.655), (0.034, 0.02, 0.045)) for s in (-1, 1)]
    head = join([head, muzzle, mouth, *nostrils, *ears, *tuft, *eyes], "m_headj")
    head = part(head, "monkey_head", neck, body)
    for s, side in ((-1, "L"), (1, "R")):
        sh = Vector((s * 0.135, -0.01, 0.43))
        arm = capsule(f"m_arm{side}", sh, sh + Vector((s * 0.03, -0.01, -0.2)), 0.042, 0.036)
        fur(arm, FUR, FUR_L, FUR_D, 3)
        hand = blob(f"m_hand{side}", (0.045, 0.045, 0.048), tuple(sh + Vector((s * 0.035, -0.015, -0.23))), 2)
        paint(hand, lambda co, n, *_: mix(PEACH_D, PEACH, 0.5 + 0.5 * max(0, n.z)))
        arm = part(join([arm, hand], f"m_armj{side}"), f"monkey_arm{side}", sh, body)
        hp = Vector((s * 0.07, 0.0, 0.2))
        leg = capsule(f"m_leg{side}", hp, hp + Vector((s * 0.01, 0, -0.15)), 0.048, 0.04)
        fur(leg, FUR, FUR_L, FUR_D, 4)
        foot = blob(f"m_foot{side}", (0.05, 0.075, 0.03), tuple(hp + Vector((s * 0.012, -0.03, -0.18))), 2)
        paint(foot, lambda co, n, *_: mix(PEACH_D, PEACH, 0.5 + 0.5 * max(0, n.z)))
        part(join([leg, foot], f"m_legj{side}"), f"monkey_leg{side}", hp, root)
    tail_pts = []
    for i in range(16):
        t = i / 15
        a = t * math.pi * 1.6
        tail_pts.append((0, 0.13 + math.sin(a) * 0.12 + t * 0.1, 0.24 + (1 - math.cos(a)) * 0.13 + t * 0.12))
    tail = sweep("m_tail", tail_pts, [0.026 - 0.012 * (i / 15) for i in range(16)], around=6)
    fur(tail, FUR, FUR_L, FUR_D, 5)
    part(tail, "monkey_tail", Vector((0, 0.13, 0.24)), body)
    # Tool: a poking stick held in the right hand (parented to the arm, pointing forward).
    hand_r = Vector((0.135 + 0.035, -0.025, 0.2))
    stick = sweep("m_stick", [(0, 0.12, 0), (0, -0.1, 0.02), (0, -0.32, 0.01), (0, -0.48, 0.0)], [0.016, 0.016, 0.014, 0.004], around=6)
    paint(stick, lambda co, n, *_: mix(C("#7a5032"), C("#c99a64"), 0.4 + 0.6 * max(0, n.z)) if co.y > -0.4 else C("#e8d2a8"))
    leaf = blob("m_leaf", (0.04, 0.012, 0.02), (0.02, 0.0, 0.03), 1)
    paint_solid(leaf, C("#6fa040"))
    stick = join([stick, leaf], "m_stickj")
    stick.data.transform(Matrix.Translation(hand_r))
    arm_r = bpy.data.objects["monkey_armR"]
    part(stick, "monkey_tool", hand_r, arm_r)
    # Accessories (shown on some individuals): a leaf hat and a bone necklace.
    hat = blob("m_hat", (0.13, 0.11, 0.025), (0, 0.0, 0.79), 2)
    for v in hat.data.vertices:
        v.co.z += (v.co.x ** 2 + v.co.y ** 2) * -1.2
    paint(hat, lambda co, n, *_: mix(C("#3f6e2a"), C("#8cbf4a"), 0.5 + 0.5 * n.z))
    part(hat, "monkey_acc0", Vector((0, 0, 0.78)), bpy.data.objects["monkey_head"])
    beads = []
    for k in range(9):
        a = (k / 8 - 0.5) * 2.4
        b = blob(f"m_bead{k}", (0.016, 0.016, 0.016), (math.sin(a) * 0.14, -math.cos(a) * 0.12, 0.45 - 0.01 * math.cos(a)), 1)
        paint_solid(b, C("#efe4cc") if k % 2 else C("#c4553a"))
        beads.append(b)
    part(join(beads, "m_beads"), "monkey_acc1", Vector((0, 0, 0.45)), body)
    return root


# ───────────────────────────────────────────── Rock Gorilla
def gorilla():
    """A chunky toy silverback: a big friendly head, a barrel chest, short
    mighty arms with huge fists planted on the ground, and stubby legs."""
    FUR, FUR_L, FUR_D = C("#4b4958"), C("#706e80"), C("#2c2b36")
    SILVER = C("#a8a6b6")
    FACE, FACE_L = C("#5b4b52"), C("#8a7378")
    root = character("gorilla")
    hip = Vector((0, 0.08, 0.34))
    body = blob("g_body", (0.29, 0.26, 0.27), (0, 0.0, 0.5))
    for v in body.data.vertices:
        f = max(0.0, -v.co.y) / 0.26
        v.co.z += f * 0.08
        v.co.x *= 1 + f * 0.12
    displace(body, 0.01, 9, 3)
    fur(body, FUR, FUR_L, FUR_D, 11, belly=lambda co, n: n.z > 0.4 and co.y > -0.05, belly_col=SILVER)
    chest = blob("g_chest", (0.2, 0.07, 0.17), (0, -0.24, 0.52))
    paint(chest, lambda co, n, *_: mix(FACE, FACE_L, 0.4 + 0.6 * max(0, n.z)))
    body = part(join([body, chest], "g_bodyj"), "gorilla_body", hip, root)
    neck = Vector((0, -0.2, 0.7))
    head = blob("g_head", (0.2, 0.19, 0.19), (0, -0.28, 0.82))
    crest = blob("g_crest", (0.12, 0.13, 0.08), (0, -0.25, 0.97), 2)
    fur(head, FUR, FUR_L, FUR_D, 12)
    fur(crest, FUR, FUR_L, FUR_D, 13)
    face = blob("g_face", (0.15, 0.08, 0.14), (0, -0.42, 0.8))
    paint(face, lambda co, n, *_: mix(FACE, FACE_L, 0.35 + 0.65 * max(0, n.z)))
    brow = blob("g_brow", (0.16, 0.06, 0.04), (0, -0.45, 0.885), 2)
    paint(brow, lambda co, n, *_: mix(FACE, FACE_L, 0.55))
    muzzle = blob("g_muzzle", (0.1, 0.07, 0.075), (0, -0.48, 0.76))
    paint(muzzle, lambda co, n, *_: mix(FACE, FACE_L, 0.6 + 0.4 * max(0, n.z)))
    nos = [blob(f"g_nos{s}", (0.017, 0.009, 0.012), (s * 0.028, -0.545, 0.785), 1) for s in (-1, 1)]
    for nn in nos:
        paint_solid(nn, C("#1a1416"))
    mouth = sweep("g_mouth", [(-0.045, -0.535, 0.735), (0, -0.548, 0.728), (0.045, -0.535, 0.735)], 0.008, around=4)
    paint_solid(mouth, C("#2a1c20"))
    eyes = [eye(f"g_eye{s}", (s * 0.06, -0.485, 0.84), (0.027, 0.016, 0.03)) for s in (-1, 1)]
    ears = [blob(f"g_ear{s}", (0.03, 0.04, 0.045), (s * 0.19, -0.28, 0.83), 1) for s in (-1, 1)]
    for e in ears:
        paint_solid(e, FACE_L)
    head = join([head, crest, face, brow, muzzle, mouth, *nos, *eyes, *ears], "g_headj")
    part(head, "gorilla_head", neck, body)
    for s, side in ((-1, "L"), (1, "R")):
        sh = Vector((s * 0.28, -0.14, 0.64))
        el = Vector((s * 0.36, -0.22, 0.4))
        wr = Vector((s * 0.36, -0.28, 0.17))
        upper = capsule(f"g_up{side}", sh, el, 0.1, 0.09, around=12)
        fore = capsule(f"g_fo{side}", el, wr, 0.1, 0.12, around=12)
        fur(upper, FUR, FUR_L, FUR_D, 14)
        fur(fore, FUR, FUR_L, FUR_D, 15)
        fist = blob(f"g_fist{side}", (0.11, 0.115, 0.09), tuple(wr + Vector((0, -0.02, -0.06))), 2)
        paint(fist, lambda co, n, *_: mix(FACE, FACE_L, 0.4 + 0.6 * max(0, n.z)))
        part(join([upper, fore, fist], f"g_armj{side}"), f"gorilla_arm{side}", sh, body)
        hp = Vector((s * 0.15, 0.16, 0.32))
        leg = capsule(f"g_leg{side}", hp, hp + Vector((s * 0.03, -0.02, -0.24)), 0.1, 0.09, around=12)
        fur(leg, FUR, FUR_L, FUR_D, 16)
        foot = blob(f"g_foot{side}", (0.08, 0.11, 0.04), tuple(hp + Vector((s * 0.035, -0.07, -0.28))), 2)
        paint(foot, lambda co, n, *_: mix(FACE, FACE_L, 0.5))
        part(join([leg, foot], f"g_legj{side}"), f"gorilla_leg{side}", hp, root)
    # Accessory: a bone necklace for the troop's veterans.
    beads = []
    for k in range(7):
        a = (k / 6 - 0.5) * 2.0
        b = blob(f"g_bone{k}", (0.014, 0.014, 0.038), (math.sin(a) * 0.2, -0.31 + (1 - math.cos(a)) * 0.08, 0.64 - 0.02 * math.cos(a)), 1)
        paint_solid(b, C("#efe4cc"))
        beads.append(b)
    part(join(beads, "g_beads"), "gorilla_acc0", Vector((0, -0.28, 0.64)), body)
    return root


# ───────────────────────────────────────────── Trebuchet
def trebuchet():
    """A chunky siege engine: wheeled base, A-frames, a long throwing arm on
    an axle (pivot), a hanging counterweight box (pivot) and a sling pouch."""
    from hard import beam, block, cylinder
    WOOD, WOOD_D, IRON = C("#9a6a40"), C("#6a4428"), C("#3e3e46")
    root = character("trebuchet")
    parts = []
    for s in (-1, 1):
        parts.append(beam(f"t_rail{s}", (s * 0.55, 1.2, 0.35), (s * 0.55, -1.2, 0.35), 0.18, WOOD_D))
        parts.append(beam(f"t_af{s}", (s * 0.55, 0.8, 0.35), (s * 0.5, 0.0, 2.15), 0.15, WOOD))
        parts.append(beam(f"t_ab{s}", (s * 0.55, -0.8, 0.35), (s * 0.5, 0.0, 2.15), 0.15, WOOD))
        for y in (-0.95, 0.95):
            w = cylinder(f"t_wh{s}{y}", 0.3, 0.3, 0.14, WOOD_D, segs=12, bevel=0.02, axis="X", at=(s * 0.7, y, 0.3))
            hub = cylinder(f"t_hub{s}{y}", 0.09, 0.09, 0.18, IRON, segs=8, bevel=0, axis="X", at=(s * 0.7, y, 0.3))
            parts += [w, hub]
    for y in (-1.0, 0.0, 1.0):
        parts.append(beam(f"t_x{y}", (-0.6, y, 0.35), (0.6, y, 0.35), 0.14, WOOD_D))
    parts.append(cylinder("t_axle", 0.08, 0.08, 1.2, IRON, segs=10, bevel=0, axis="X", at=(0, 0, 2.15)))
    base = join(parts, "t_base")
    base = part(base, "trebuchet_base", Vector((0, 0, 0)), root)
    axle = Vector((0, 0, 2.15))
    # Arm along +Y (long end, toward the back when cocked) and -Y (short end).
    arm = beam("t_arm", (0, 0.65, 2.15), (0, -2.4, 2.15), 0.14, WOOD)
    for k, y in enumerate((0.3, -0.9, -1.8)):
        arm = join([arm, cylinder(f"t_band{k}", 0.1, 0.1, 0.06, IRON, segs=8, bevel=0, axis="Y", at=(0, y, 2.15))], "t_arm")
    pouch_rope = sweep("t_rope", [(0, -2.4, 2.15), (0, -2.55, 1.75), (0, -2.5, 1.4)], 0.015, around=4)
    paint_solid(pouch_rope, C("#c9b28a"))
    pouch = blob("t_pouch", (0.14, 0.14, 0.08), (0, -2.5, 1.36), 2)
    paint_solid(pouch, C("#7a5a3a"))
    arm = part(join([arm, pouch_rope, pouch], "t_armj"), "trebuchet_arm", axle, base)
    pivot_w = Vector((0, 0.65, 2.15))
    box = block("t_box", 0.6, 0.55, 0.55, WOOD_D, bevel=0.03, at=(0, 0.65, 1.45))
    stones = [blob(f"t_st{k}", (0.12, 0.12, 0.1), (0.15 * ((k % 3) - 1), 0.65 + 0.12 * (k // 3 - 0.5), 2.02), 1) for k in range(6)]
    for st in stones:
        paint(st, lambda co, n, *_: mix(C("#6e665e"), C("#a8a096"), 0.5 + 0.5 * n.z))
    hang = [sweep(f"t_ch{s}", [(s * 0.22, 0.65, 2.1), (s * 0.22, 0.65, 2.0)], 0.02, around=4) for s in (-1, 1)]
    for hh in hang:
        paint_solid(hh, IRON)
    part(join([box, *stones, *hang], "t_weight"), "trebuchet_weight", pivot_w, arm)
    return root


# ───────────────────────────────────────────── Jousting Knight
def knight():
    """A stout toy horse in a blue caparison, ridden by a chunky knight with
    a plumed helm, a barber-pole lance and a kite shield."""
    from hard import cylinder
    HORSE, HORSE_D, MANE = C("#9a5a34"), C("#5e3420"), C("#3a2418")
    CLOTH, TRIM = C("#2f5fb4"), C("#f2c24a")
    STEEL, STEEL_D = C("#a7adbd"), C("#5d6272")
    root = character("knight")
    # Horse body + caparison skirt.
    body = blob("k_body", (0.27, 0.55, 0.29), (0, 0, 0.82))
    paint(body, lambda co, n, *_: mix(HORSE_D, HORSE, 0.5 + 0.5 * n.z))
    skirt_pts = []
    bm = __import__("bmesh").new()
    segs = 18
    rows = []
    for r, (sx, sy, z) in enumerate([(0.31, 0.6, 0.86), (0.35, 0.65, 0.66), (0.385, 0.7, 0.5), (0.39, 0.71, 0.47), (0.4, 0.72, 0.42)]):
        rows.append([bm.verts.new((math.cos(a / segs * math.tau) * sx, math.sin(a / segs * math.tau) * sy, z + (0.04 * math.sin(a * 2.3) if r >= 2 else 0))) for a in range(segs)])
    for r in range(len(rows) - 1):
        for k in range(segs):
            j = (k + 1) % segs
            bm.faces.new((rows[r][k], rows[r][j], rows[r + 1][j], rows[r + 1][k]))
    skirt = mesh_obj(bm, "k_skirt", smooth=True)
    sol = skirt.modifiers.new("S", "SOLIDIFY")
    sol.thickness = 0.03
    from kit import apply_mods as _am
    _am(skirt)
    from kit import paint_faces as _pf
    _pf(skirt, lambda co, n, *_: TRIM if co.z < 0.49 else CLOTH)
    saddle = blob("k_saddle", (0.2, 0.25, 0.06), (0, 0.05, 1.1), 2)
    paint_solid(saddle, C("#5a2e1c"))
    body = part(join([body, skirt, saddle], "k_bodyj"), "knight_body", Vector((0, 0, 0.82)), root)
    # Neck and head.
    neck = capsule("k_neck", (0, -0.42, 0.95), (0, -0.62, 1.32), 0.13, 0.1)
    paint(neck, lambda co, n, *_: mix(HORSE_D, HORSE, 0.5 + 0.5 * n.z))
    head = blob("k_head", (0.11, 0.24, 0.12), (0, -0.78, 1.28))
    head.data.transform(Matrix.Translation((0, 0.78, -1.28)))
    head.data.transform(Matrix.Rotation(0.5, 4, "X"))
    head.data.transform(Matrix.Translation((0, -0.78, 1.28)))
    paint(head, lambda co, n, *_: mix(HORSE_D, HORSE, 0.5 + 0.5 * n.z))
    mane = sweep("k_mane", [(0, -0.38, 1.05), (0, -0.52, 1.3), (0, -0.66, 1.45)], [0.06, 0.07, 0.05], around=6)
    paint_solid(mane, MANE)
    ears = [blob(f"k_ear{s}", (0.03, 0.03, 0.06), (s * 0.06, -0.68, 1.48), 1) for s in (-1, 1)]
    for e in ears:
        paint_solid(e, HORSE_D)
    eyes = [eye(f"k_eye{s}", (s * 0.1, -0.82, 1.33), (0.018, 0.022, 0.024)) for s in (-1, 1)]
    chanfron = blob("k_chan", (0.08, 0.2, 0.06), (0, -0.86, 1.32), 2)
    chanfron.data.transform(Matrix.Translation((0, 0.86, -1.32)))
    chanfron.data.transform(Matrix.Rotation(0.5, 4, "X"))
    chanfron.data.transform(Matrix.Translation((0, -0.86, 1.36)))
    chanfron.data.materials.clear()
    chanfron.data.materials.append(METAL)
    paint_solid(chanfron, STEEL)
    part(join([neck, head, mane, *ears, *eyes, chanfron], "k_neckj"), "knight_neck", Vector((0, -0.42, 0.95)), body)
    for name, (x, y) in (("FL", (-0.15, -0.36)), ("FR", (0.15, -0.36)), ("BL", (-0.15, 0.36)), ("BR", (0.15, 0.36))):
        hip = Vector((x, y, 0.66))
        leg = capsule(f"k_leg{name}", hip, (x, y, 0.12), 0.075, 0.06)
        paint(leg, lambda co, n, *_: mix(HORSE_D, HORSE, 0.5 + 0.5 * n.z))
        hoof = cylinder(f"k_hoof{name}", 0.07, 0.075, 0.1, C("#2a2020"), segs=10, bevel=0.01, at=(x, y, 0.0))
        part(join([leg, hoof], f"k_legj{name}"), f"knight_leg{name}", hip, body)
    tail = sweep("k_tail", [(0, 0.55, 0.92), (0, 0.72, 0.75), (0, 0.75, 0.48)], [0.07, 0.06, 0.03], around=6)
    paint_solid(tail, MANE)
    part(tail, "knight_tail", Vector((0, 0.55, 0.92)), body)
    # Rider.
    torso = blob("k_torso", (0.17, 0.14, 0.2), (0, 0.04, 1.3))
    torso.data.materials.clear()
    torso.data.materials.append(METAL)
    paint(torso, lambda co, n, *_: (CLOTH if n.y < -0.3 and abs(co.x) < 0.11 else mix(STEEL_D, STEEL, 0.5 + 0.5 * n.z)))
    tabard_cross = blob("k_cross", (0.03, 0.02, 0.1), (0, -0.1, 1.3), 1)
    paint_solid(tabard_cross, TRIM)
    rlegs = []
    for s in (-1, 1):
        lg = capsule(f"k_rleg{s}", (s * 0.12, 0.05, 1.15), (s * 0.27, -0.05, 0.85), 0.06, 0.055)
        lg.data.materials.clear()
        lg.data.materials.append(METAL)
        paint(lg, lambda co, n, *_: mix(STEEL_D, STEEL, 0.5 + 0.5 * n.z))
        rlegs.append(lg)
    rider = part(join([torso, tabard_cross, *rlegs], "k_riderj"), "knight_rider", Vector((0, 0.05, 1.12)), body)
    helm = blob("k_helm", (0.135, 0.14, 0.15), (0, 0.04, 1.62))
    helm.data.materials.clear()
    helm.data.materials.append(METAL)
    paint(helm, lambda co, n, *_: C("#1d1d24") if (abs(co.z - 1.63) < 0.018 and n.y < -0.3) else mix(STEEL_D, STEEL, 0.5 + 0.5 * n.z))
    plume = sweep("k_plume", [(0, 0.02, 1.76), (0, 0.1, 1.92), (0, 0.28, 1.95), (0, 0.42, 1.82)], [0.04, 0.07, 0.06, 0.02], around=8)
    paint(plume, lambda co, n, *_: mix(C("#a01e28"), C("#e8414a"), 0.5 + 0.5 * n.z))
    part(join([helm, plume], "k_helmj"), "knight_helm", Vector((0, 0.04, 1.5)), rider)
    sh_r = Vector((0.17, 0.04, 1.42))
    arm_r = capsule("k_armR", sh_r, (0.22, -0.12, 1.25), 0.055, 0.05)
    arm_r.data.materials.clear()
    arm_r.data.materials.append(METAL)
    paint(arm_r, lambda co, n, *_: mix(STEEL_D, STEEL, 0.5 + 0.5 * n.z))
    lance = cylinder("k_lance", 0.05, 0.012, 1.9, C("#ffffff"), segs=10, bevel=0, axis="Y", at=(0.22, -0.9, 1.25))
    paint(lance, lambda co, n, *_: C("#d23a3a") if int((co.y + 3) * 6) % 2 else C("#f4ede0"))
    vamp = cylinder("k_vamp", 0.03, 0.12, 0.16, STEEL, segs=10, bevel=0, axis="Y", at=(0.22, -0.18, 1.25))
    vamp.data.materials.clear()
    vamp.data.materials.append(METAL)
    paint_solid(vamp, STEEL)
    part(join([arm_r, lance, vamp], "k_armRj"), "knight_armR", sh_r, rider)
    sh_l = Vector((-0.17, 0.04, 1.42))
    arm_l = capsule("k_armL", sh_l, (-0.24, -0.06, 1.24), 0.055, 0.05)
    arm_l.data.materials.clear()
    arm_l.data.materials.append(METAL)
    paint(arm_l, lambda co, n, *_: mix(STEEL_D, STEEL, 0.5 + 0.5 * n.z))
    bm = __import__("bmesh").new()
    vs = [bm.verts.new(p) for p in [(0, 0, 0.16), (0.13, 0, 0.1), (0.1, 0, -0.08), (0, 0, -0.24), (-0.1, 0, -0.08), (-0.13, 0, 0.1)]]
    bm.faces.new(vs)
    shield = mesh_obj(bm, "k_shield", smooth=False)
    sol = shield.modifiers.new("S", "SOLIDIFY")
    sol.thickness = 0.04
    _am(shield)
    shield.data.transform(Matrix.Rotation(1.3, 4, "Z"))
    shield.data.transform(Matrix.Translation((-0.3, -0.06, 1.25)))
    paint(shield, lambda co, n, *_: TRIM if abs(co.z - 1.27) < 0.03 or abs(co.y + 0.06) < 0.025 else CLOTH)
    part(join([arm_l, shield], "k_armLj"), "knight_armL", sh_l, rider)
    return root


# ───────────────────────────────────────────── Steam Prodder
def steam():
    """A squat brass boiler-bot: porthole eyes, a pressure gauge belly,
    stubby iron legs, a valve-wheel hand and a telescoping piston arm."""
    from hard import cylinder, block
    BRASS, BRASS_D, IRON, IRON_L = C("#d0a046"), C("#8a6424"), C("#3e3d44"), C("#6a6972")
    root = character("steam")
    hip = Vector((0, 0, 0.2))
    body = cylinder("s_body", 0.21, 0.2, 0.36, BRASS, segs=18, bevel=0.03, at=(0, 0, 0.2))
    paint(body, lambda co, n, *_: mix(BRASS_D, BRASS, 0.5 + 0.5 * max(-1, min(1, n.z + 0.3))))
    dome = blob("s_dome", (0.2, 0.2, 0.12), (0, 0, 0.56))
    paint(dome, lambda co, n, *_: mix(BRASS_D, BRASS, 0.6 + 0.4 * n.z))
    base = blob("s_base", (0.22, 0.22, 0.08), (0, 0, 0.2))
    paint_solid(base, IRON)
    bands = [cylinder(f"s_band{k}", 0.215, 0.215, 0.035, IRON_L, segs=18, bevel=0, at=(0, 0, z)) for k, z in enumerate((0.27, 0.48))]
    gauge = cylinder("s_gauge", 0.075, 0.075, 0.03, C("#f2e8d0"), segs=14, bevel=0.005, axis="Y", at=(0, -0.21, 0.33))
    needle = block("s_needle", 0.008, 0.01, 0.06, C("#c03030"), bevel=0, at=(0.01, -0.235, 0.32), rot=0.6)
    eyes = []
    for sgn in (-1, 1):
        ring = cylinder(f"s_port{sgn}", 0.065, 0.065, 0.04, BRASS_D, segs=14, bevel=0.01, axis="Y", at=(sgn * 0.085, -0.19, 0.5))
        eyes.append(ring)
        eyes.append(eye(f"s_eye{sgn}", (sgn * 0.085, -0.215, 0.5), (0.05, 0.02, 0.05)))
    stack = cylinder("s_stack", 0.045, 0.06, 0.16, IRON, segs=10, bevel=0.01, at=(0.06, 0.05, 0.63))
    soot = cylinder("s_soot", 0.035, 0.035, 0.01, C("#120e0e"), segs=10, bevel=0, at=(0.06, 0.05, 0.79))
    whistle = cylinder("s_whistle", 0.02, 0.02, 0.07, BRASS, segs=8, bevel=0, at=(-0.07, 0.04, 0.66))
    body = part(join([body, dome, base, *bands, gauge, needle, *eyes, stack, soot, whistle], "s_bodyj"), "steam_body", hip, root)
    for sgn, side in ((-1, "L"), (1, "R")):
        hp = Vector((sgn * 0.11, 0, 0.2))
        leg = capsule(f"s_leg{side}", hp, hp + Vector((0, 0, -0.13)), 0.045, 0.04)
        paint_solid(leg, IRON_L)
        foot = blob(f"s_foot{side}", (0.07, 0.09, 0.035), tuple(hp + Vector((0, -0.03, -0.17))), 2)
        paint_solid(foot, IRON)
        part(join([leg, foot], f"s_legj{side}"), f"steam_leg{side}", hp, root)
    # Left: a little arm with a valve wheel.
    shl = Vector((-0.22, 0, 0.38))
    arm = capsule("s_armL", shl, shl + Vector((-0.04, -0.02, -0.15)), 0.035, 0.03)
    paint_solid(arm, IRON_L)
    wheel = sweep("s_wheel", [(shl.x - 0.04 + math.cos(a / 12 * math.tau) * 0.05, shl.y - 0.02, shl.z - 0.19 + math.sin(a / 12 * math.tau) * 0.05) for a in range(13)], 0.012, around=5)
    paint_solid(wheel, C("#c03030"))
    part(join([arm, wheel], "s_armLj"), "steam_armL", shl, body)
    # Right: the piston sleeve (arm) and the rod that shoots out (tool).
    shr = Vector((0.22, 0, 0.38))
    sleeve = cylinder("s_sleeve", 0.06, 0.055, 0.28, IRON_L, segs=12, bevel=0.01, axis="Y", at=(0.24, -0.12, 0.36))
    jointb = blob("s_jointR", (0.06, 0.06, 0.06), tuple(shr), 2)
    paint_solid(jointb, BRASS_D)
    part(join([sleeve, jointb], "s_armRj"), "steam_armR", shr, body)
    rod = cylinder("s_rod", 0.03, 0.03, 0.3, C("#c8ccd4"), segs=10, bevel=0, axis="Y", at=(0.24, -0.3, 0.36))
    tip = blob("s_tip", (0.06, 0.05, 0.06), (0.24, -0.44, 0.36), 2)
    paint(tip, lambda co, n, *_: mix(C("#7a1a1a"), C("#d23a3a"), 0.5 + 0.5 * n.z))
    part(join([rod, tip], "s_rodj"), "steam_tool", Vector((0.24, -0.26, 0.36)), bpy.data.objects["steam_armR"])
    for o in (bpy.data.objects["steam_body"],):
        pass
    return root


# ───────────────────────────────────────────── Slap Factory
def factory():
    """A little brick works with a sawtooth roof and a smoking chimney; on
    its roof a sprung arm that flings giant gloves (the `arm` part)."""
    from hard import block, cylinder, masonry, gable_roof
    BRICK, MORTAR = C("#a24a32"), C("#5a4a42")
    root = character("factory")
    parts = []
    walls = block("f_walls", 2.6, 2.2, 1.9, BRICK, bevel=0.05)
    masonry(walls, BRICK, MORTAR, course=0.24, block_w=0.45, seed=3)
    parts.append(walls)
    parts.append(block("f_cornice", 2.8, 2.4, 0.16, C("#6e2e22"), bevel=0.03, at=(0, 0, 1.88)))
    parts.append(gable_roof("f_roof", 2.6, 2.2, 0.7, C("#4e5058"), overhang=0.1, thick=0.1, at=(0, 0, 2.0), courses=3))
    for k, x in enumerate((-0.7, 0.0, 0.7)):
        w = block(f"f_win{k}", 0.42, 0.06, 0.6, C("#ffb050"), bevel=0.02, at=(x, -1.12, 0.8))
        w.data.materials.clear()
        w.data.materials.append(vtx_material("Glow", rough=1.0, emissive=True))
        paint_solid(w, C("#ffa94a"))
        parts.append(w)
    door = block("f_door", 0.7, 0.08, 1.1, C("#4a3a30"), bevel=0.02, at=(0.85, -1.13, 0))
    parts.append(door)
    chim = cylinder("f_chim", 0.26, 0.2, 2.2, BRICK, segs=12, bevel=0.02, at=(-0.9, 0.6, 1.9))
    parts.append(chim)
    parts.append(cylinder("f_chimcap", 0.24, 0.27, 0.18, C("#2a2624"), segs=12, bevel=0.02, at=(-0.9, 0.6, 4.05)))
    # Conveyor out front with a few gloves riding it.
    parts.append(block("f_belt", 2.6, 0.5, 0.12, C("#2a2a30"), bevel=0.02, at=(0, -1.6, 0.42)))
    for x in (-1.1, 1.1):
        parts.append(block(f"f_bleg{x}", 0.08, 0.4, 0.42, C("#5c5b64"), bevel=0.01, at=(x, -1.6, 0)))
    for k, x in enumerate((-0.7, 0.1, 0.8)):
        g = blob(f"f_g{k}", (0.13, 0.1, 0.05), (x, -1.6, 0.6), 2)
        paint_solid(g, C("#f4f2ec"))
        parts.append(g)
    sign = block("f_sign", 1.6, 0.08, 0.4, C("#f2c24a"), bevel=0.02, at=(0, -1.15, 1.95))
    parts.append(sign)
    base = part(join(parts, "f_basej"), "factory_base", Vector((0, 0, 0)), root)
    # Roof arm: a riveted beam on a spring pivot, a big glove at the end.
    pivot = Vector((0.4, 0.2, 2.6))
    beam_ = block("f_beam", 0.18, 1.7, 0.18, C("#8a3a2a"), bevel=0.02, at=(0.4, -0.55, 2.52))
    spring = sweep("f_spring", [(0.4 + math.cos(a * 0.9) * 0.12, 0.2 + math.sin(a * 0.9) * 0.12, 2.0 + a * 0.05) for a in range(13)], 0.025, around=5)
    paint_solid(spring, C("#c9963e"))
    glove = blob("f_glove", (0.32, 0.18, 0.36), (0.4, -1.45, 2.65), 2)
    paint(glove, lambda co, n, *_: mix(C("#c8c4ba"), C("#fbfaf6"), 0.5 + 0.5 * n.z))
    cuff = cylinder("f_cuff", 0.2, 0.22, 0.14, C("#e8e4da"), segs=12, bevel=0.02, axis="Y", at=(0.4, -1.22, 2.6))
    part(join([beam_, glove, cuff, spring], "f_armj"), "factory_arm", pivot, base)
    return root


# ───────────────────────────────────────────── Auto-Turret
def turret():
    """A sentry gun: tripod and ammo box (base), a yawing armoured head with a
    red sensor eye (head), and pitching twin barrels (guns)."""
    from hard import beam, block, cylinder
    OLIVE, OLIVE_D, GUNMETAL = C("#6f7a3e"), C("#454c26"), C("#3a3c44")
    root = character("turret")
    parts = []
    for k in range(3):
        a = k / 3 * math.tau + math.pi / 2
        parts.append(beam(f"tu_leg{k}", (math.cos(a) * 0.55, math.sin(a) * 0.55, 0.0), (0, 0, 0.55), 0.07, GUNMETAL))
        parts.append(cylinder(f"tu_foot{k}", 0.09, 0.1, 0.05, GUNMETAL, segs=8, bevel=0, at=(math.cos(a) * 0.55, math.sin(a) * 0.55, 0)))
    parts.append(cylinder("tu_col", 0.12, 0.14, 0.75, GUNMETAL, segs=10, bevel=0.02, at=(0, 0, 0.1)))
    parts.append(block("tu_ammo", 0.35, 0.25, 0.28, OLIVE_D, bevel=0.03, at=(0.25, 0.25, 0.2)))
    base = part(join(parts, "tu_basej"), "turret_base", Vector((0, 0, 0)), root)
    for o in [base]:
        o.data.materials.clear()
        o.data.materials.append(METAL)
    head = block("tu_head", 0.55, 0.62, 0.38, OLIVE, bevel=0.1, seg=2, at=(0, 0.02, 0.8))
    paint(head, lambda co, n, *_: mix(OLIVE_D, OLIVE, 0.5 + 0.5 * n.z))
    shield = block("tu_shield", 0.75, 0.08, 0.42, OLIVE_D, bevel=0.04, at=(0, -0.33, 0.8))
    lens_ring = cylinder("tu_ring", 0.09, 0.09, 0.06, GUNMETAL, segs=12, bevel=0.01, axis="Y", at=(0.18, -0.39, 1.07))
    lens = blob("tu_lens", (0.065, 0.03, 0.065), (0.18, -0.42, 1.07), 2)
    lens.data.materials.clear()
    lens.data.materials.append(vtx_material("Glow", rough=1.0, emissive=True))
    paint_solid(lens, C("#ff2a2a"))
    stripe = block("tu_stripe", 0.56, 0.63, 0.05, C("#f2c230"), bevel=0, at=(0, 0.02, 1.02))
    head = part(join([head, shield, lens_ring, lens, stripe], "tu_headj"), "turret_head", Vector((0, 0, 0.85)), base)
    guns = []
    for sgn in (-1, 1):
        barrel = cylinder(f"tu_barrel{sgn}", 0.055, 0.05, 0.85, GUNMETAL, segs=10, bevel=0.01, axis="Y", at=(sgn * 0.13, -0.75, 0.92))
        brake = cylinder(f"tu_brake{sgn}", 0.08, 0.08, 0.12, GUNMETAL, segs=10, bevel=0.01, axis="Y", at=(sgn * 0.13, -1.16, 0.92))
        guns += [barrel, brake]
    breech = block("tu_breech", 0.42, 0.3, 0.22, GUNMETAL, bevel=0.04, at=(0, -0.32, 0.81))
    g = join([breech, *guns], "tu_gunsj")
    g.data.materials.clear()
    g.data.materials.append(METAL)
    part(g, "turret_guns", Vector((0, -0.25, 0.92)), head)
    return root


# ───────────────────────────────────────────── Strafing Jet
def jet():
    """A chunky toy fighter: rounded fuselage, swept wings, twin fins, a glossy
    canopy, red stripes and an afterburner nozzle."""
    from hard import block, cylinder
    SILVER, SILVER_D, RED = C("#b8bcc6"), C("#7a7e8a"), C("#d23a3a")
    root = character("jet")
    fus = capsule("j_fus", (0, -1.2, 0.0), (0, 1.1, 0.05), 0.32, 0.26, around=14)
    fus.data.materials.clear()
    fus.data.materials.append(METAL)
    paint(fus, lambda co, n, *_: RED if abs(co.y + 0.2) < 0.12 else mix(SILVER_D, SILVER, 0.5 + 0.5 * n.z))
    nose = blob("j_nose", (0.2, 0.45, 0.2), (0, -1.55, -0.02), 2)
    nose.data.materials.clear()
    nose.data.materials.append(METAL)
    paint_solid(nose, C("#3a3c44"))
    canopy = blob("j_canopy", (0.2, 0.55, 0.2), (0, -0.55, 0.26), 2)
    canopy.data.materials.clear()
    canopy.data.materials.append(GLOSS)
    paint(canopy, lambda co, n, *_: mix(C("#0e1a30"), C("#5a8ad0"), max(0, n.z) * 0.6))
    import bmesh as _bm
    def wing(nm, pts, thick=0.06):
        bm = _bm.new()
        vs = [bm.verts.new(p) for p in pts]
        bm.faces.new(vs)
        ob = mesh_obj(bm, nm, smooth=False)
        sol = ob.modifiers.new("S", "SOLIDIFY")
        sol.thickness = thick
        from kit import apply_mods as _am
        _am(ob)
        ob.data.materials.clear()
        ob.data.materials.append(METAL)
        paint(ob, lambda co, n, *_: RED if abs(abs(co.x) - 1.1) < 0.12 else mix(SILVER_D, SILVER, 0.6 + 0.4 * n.z))
        return ob
    wings = [wing(f"j_wing{sgn}", [(sgn * 0.25, -0.35, -0.05), (sgn * 1.55, 0.55, -0.1), (sgn * 1.55, 0.85, -0.1), (sgn * 0.25, 0.75, -0.05)]) for sgn in (-1, 1)]
    tails = [wing(f"j_tail{sgn}", [(sgn * 0.2, 0.8, 0.0), (sgn * 0.75, 1.25, -0.02), (sgn * 0.75, 1.42, -0.02), (sgn * 0.2, 1.35, 0.0)], 0.05) for sgn in (-1, 1)]
    fins = [wing(f"j_fin{sgn}", [(sgn * 0.15, 0.75, 0.2), (sgn * 0.3, 1.25, 0.85), (sgn * 0.3, 1.45, 0.85), (sgn * 0.15, 1.4, 0.2)], 0.05) for sgn in (-1, 1)]
    nozzle = cylinder("j_noz", 0.22, 0.25, 0.25, C("#2a2a30"), segs=12, bevel=0.01, axis="Y", at=(0, 1.32, 0.05))
    flame = blob("j_flame", (0.17, 0.2, 0.17), (0, 1.5, 0.05), 2)
    flame.data.materials.clear()
    flame.data.materials.append(vtx_material("Glow", rough=1.0, emissive=True))
    paint(flame, lambda co, n, *_: mix(C("#ff6a1a"), C("#ffe08a"), max(0, -n.y)))
    body = join([fus, nose, canopy, *wings, *tails, *fins, nozzle, flame], "j_bodyj")
    part(body, "jet_body", Vector((0, 0, 0)), root)
    return root


# ───────────────────────────────────────────── Drone Swarm
def drone():
    """A friendly quad drone: a rounded pod with a visor and one glowing eye,
    four ducted rotors (spun by the runtime) and a twin-prong zapper."""
    from hard import cylinder
    from kit import sweep as _sweep
    WHITE, TEAL, GREY = C("#eef0f4"), C("#2ab0b8"), C("#4a4e5a")
    GLOW = vtx_material("Glow", rough=1.0, emissive=True)
    root = character("drone")
    shell = blob("d_shell", (0.27, 0.3, 0.17), (0, 0, 0), 3)
    paint(shell, lambda co, n, *_: TEAL if abs(co.z) < 0.035 else (WHITE if co.z > 0 else mix(GREY, WHITE, 0.5)))
    shell.data.materials.clear()
    shell.data.materials.append(GLOSS)
    visor = blob("d_visor", (0.17, 0.09, 0.09), (0, -0.24, 0.02), 2)
    visor.data.materials.clear()
    visor.data.materials.append(GLOSS)
    paint_solid(visor, C("#10141e"))
    eye_ = blob("d_eye", (0.06, 0.035, 0.06), (0, -0.315, 0.025), 2)
    eye_.data.materials.clear()
    eye_.data.materials.append(GLOW)
    paint_solid(eye_, C("#3af0ff"))
    bits = [shell, visor, eye_]
    hubs = []
    for k, (sx, sy) in enumerate(((-1, -1), (1, -1), (-1, 1), (1, 1))):
        hub = Vector((sx * 0.4, sy * 0.38, 0.05))
        hubs.append(hub)
        arm = capsule(f"d_arm{k}", (sx * 0.14, sy * 0.14, 0.0), tuple(hub), 0.035, 0.03, around=8)
        paint_solid(arm, GREY)
        ring = [(hub.x + math.cos(a / 24 * math.tau) * 0.17, hub.y + math.sin(a / 24 * math.tau) * 0.17, hub.z) for a in range(25)]
        duct = _sweep(f"d_duct{k}", ring, 0.03, around=6)
        paint_solid(duct, WHITE)
        glow_ring = _sweep(f"d_glow{k}", [(x, y, z - 0.03) for x, y, z in ring], 0.012, around=4)
        glow_ring.data.materials.clear()
        glow_ring.data.materials.append(GLOW)
        paint_solid(glow_ring, C("#3af0ff") if sy < 0 else C("#ff3ad0"))
        bits += [arm, duct, glow_ring]
    for sx in (-1, 1):
        skid = capsule(f"d_skid{sx}", (sx * 0.12, -0.15, -0.2), (sx * 0.12, 0.15, -0.2), 0.02, around=6)
        strut = capsule(f"d_strut{sx}", (sx * 0.1, 0.0, -0.1), (sx * 0.12, 0.0, -0.2), 0.018, around=6)
        paint_solid(skid, GREY)
        paint_solid(strut, GREY)
        bits += [skid, strut]
    body = part(join(bits, "d_bodyj"), "drone_body", Vector((0, 0, 0)), root)
    for k, hub in enumerate(hubs):
        blades = [block_(f"d_blade{k}{j}", 0.3, 0.045, 0.012, C("#2a2e38"), (hub.x, hub.y, hub.z + 0.01), j * math.pi / 2) for j in range(2)]
        cap = blob(f"d_cap{k}", (0.03, 0.03, 0.02), (hub.x, hub.y, hub.z + 0.025), 1)
        paint_solid(cap, WHITE)
        part(join(blades + [cap], f"d_rotorj{k}"), f"drone_rotor{k}", hub, body)
    prongs = []
    for sx in (-1, 1):
        pr = capsule(f"d_prong{sx}", (sx * 0.05, -0.12, -0.1), (sx * 0.045, -0.3, -0.17), 0.016, 0.012, around=6)
        paint_solid(pr, C("#c8ccd4"))
        tip = blob(f"d_tip{sx}", (0.025, 0.025, 0.025), (sx * 0.045, -0.31, -0.175), 1)
        tip.data.materials.clear()
        tip.data.materials.append(GLOW)
        paint_solid(tip, C("#a0f8ff"))
        prongs += [pr, tip]
    z = join(prongs, "d_zapj")
    z.data.materials[0] = METAL if z.data.materials and z.data.materials[0].name == "Vtx" else z.data.materials[0]
    part(z, "drone_zap", Vector((0, -0.12, -0.1)), body)
    return root


def block_(name, sx, sy, sz, col, at, rot):
    from hard import block
    return block(name, sx, sy, sz, col, bevel=0.005, at=at, rot=rot)


# ───────────────────────────────────────────── Orbital Laser
def orbital():
    """A satellite: a gold-foil hexagonal bus, two long solar wings (their
    own part, so they can trim toward the sun), a dish, and a lens barrel
    underneath that aims at the star."""
    from hard import beam, block, cylinder
    GOLD, GOLD_D, CELL, FRAME = C("#e0b040"), C("#a07020"), C("#1a3a8a"), C("#c8ccd4")
    GLOW = vtx_material("Glow", rough=1.0, emissive=True)
    rnd = random.Random(5)
    root = character("orbital")
    bus = cylinder("o_bus", 0.55, 0.55, 1.1, GOLD, segs=6, bevel=0.03, at=(0, 0, -0.55), flat=True)
    paint_faces(bus, lambda c, n, i: mix(GOLD_D, GOLD, rnd.random() * 0.6 + 0.4 * max(0, n.z)))
    bus.data.materials.clear()
    bus.data.materials.append(METAL)
    bands = [cylinder(f"o_band{k}", 0.57, 0.57, 0.06, FRAME, segs=6, bevel=0, at=(0, 0, z), flat=True) for k, z in enumerate((-0.5, 0.45))]
    dish = cylinder("o_dish", 0.06, 0.48, 0.22, C("#f2f2f4"), segs=16, bevel=0.01, at=(0, 0, 0.6))
    feed = cylinder("o_feed", 0.03, 0.03, 0.4, FRAME, segs=6, bevel=0, at=(0, 0, 0.6))
    beacon = blob("o_beacon", (0.05, 0.05, 0.05), (0.3, 0.3, 0.6), 1)
    beacon.data.materials.clear()
    beacon.data.materials.append(GLOW)
    paint_solid(beacon, C("#ff3a3a"))
    body = part(join([bus, *bands, dish, feed, beacon], "o_bodyj"), "orbital_body", Vector((0, 0, 0)), root)
    wing_bits = []
    for sx in (-1, 1):
        wing_bits.append(beam(f"o_boom{sx}", (sx * 0.5, 0, 0), (sx * 1.05, 0, 0), 0.06, FRAME))
        for k in range(4):
            x = sx * (1.4 + k * 0.68)
            panel = block(f"o_panel{sx}{k}", 0.62, 0.95, 0.04, CELL, bevel=0.005, at=(x, 0, -0.02))
            paint_faces(panel, lambda c, n, i: mix(CELL, C("#3a6ad0"), 0.35 if n.z > 0.5 else 0.0))
            wing_bits.append(gloss_(panel))
            wing_bits.append(block(f"o_frame{sx}{k}", 0.05, 0.97, 0.05, FRAME, bevel=0, at=(x - sx * 0.33, 0, -0.025)))
            wing_bits.append(block(f"o_mid{sx}{k}", 0.62, 0.03, 0.05, FRAME, bevel=0, at=(x, 0, -0.025)))
    part(join(wing_bits, "o_wingsj"), "orbital_wings", Vector((0, 0, 0)), body)
    barrel = cylinder("o_barrel", 0.3, 0.26, 0.8, C("#3a3c44"), segs=14, bevel=0.02, at=(0, 0, -1.35))
    collar = cylinder("o_collar", 0.36, 0.36, 0.1, FRAME, segs=14, bevel=0.01, at=(0, 0, -0.75))
    fins = [block(f"o_fin{k}", 0.04, 0.5, 0.35, C("#2a2c34"), bevel=0, at=(0, 0, -1.1), rot=k * math.pi / 2) for k in range(2)]
    lens = blob("o_lens", (0.22, 0.22, 0.08), (0, 0, -1.37), 2)
    lens.data.materials.clear()
    lens.data.materials.append(GLOW)
    paint(lens, lambda co, n, *_: mix(C("#ff2a4a"), C("#ffd0d8"), max(0, -n.z) * 0.6))
    lb = join([barrel, collar, *fins, lens], "o_lensj")
    lb.data.materials[0] = METAL
    part(lb, "orbital_lens", Vector((0, 0, -0.6)), body)
    return root


def gloss_(ob):
    ob.data.materials.clear()
    ob.data.materials.append(GLOSS)
    return ob


# ───────────────────────────────────────────── Moon Cannon
def moon():
    """A small cratered moon with a cannon strapped to it: a steel collar
    band, a fat barrel (its own part, so it can aim) and little thrusters."""
    from hard import cylinder
    MOONC, MOON_D = C("#e8e2d0"), C("#a8a090")
    STEEL_ = C("#5a6070")
    GLOW = vtx_material("Glow", rough=1.0, emissive=True)
    rnd = random.Random(8)
    root = character("moon")
    body = blob("m_body", (2.2, 2.2, 2.2), (0, 0, 0), 4)
    craters = [(Vector((rnd.uniform(-1, 1), rnd.uniform(-1, 1), rnd.uniform(-1, 1))).normalized(), rnd.uniform(0.18, 0.45)) for _ in range(16)]
    for v in body.data.vertices:
        n = v.co.normalized()
        d = 0.0
        for c, rad in craters:
            a = math.acos(max(-1, min(1, n.dot(c))))
            x = a / rad
            if x < 1:
                d -= 0.12 * (1 - x * x)
            d += 0.05 * math.exp(-((x - 1) / 0.25) ** 2)
        v.co = n * (2.2 + d)

    def mc(co, n, *_):
        r = co.length / 2.2
        return mix(MOON_D, MOONC, max(0, min(1, (r - 0.95) * 8)) * 0.8 + 0.2 * (0.5 + 0.5 * noise.noise(co * 1.5)))
    paint(body, mc)
    collar = cylinder("m_collar", 2.28, 2.28, 0.45, STEEL_, segs=40, bevel=0.04, at=(0, 0, -0.22))
    collar.data.transform(Matrix.Rotation(math.pi / 2, 4, "X"))
    collar.data.materials.clear()
    collar.data.materials.append(METAL)
    bits = [body, collar]
    for k in range(6):
        a = k / 6 * math.tau
        rivet = blob(f"m_rivet{k}", (0.08, 0.08, 0.08), (math.cos(a) * 2.32, 0, math.sin(a) * 2.32), 1)
        paint_solid(rivet, C("#c8ccd4"))
        bits.append(rivet)
    for sx in (-1, 1):
        th = cylinder(f"m_thr{sx}", 0.22, 0.32, 0.5, STEEL_, segs=12, bevel=0.02, at=(sx * 2.2, 0.6, -1.6))
        fl = blob(f"m_flame{sx}", (0.2, 0.2, 0.35), (sx * 2.2, 0.6, -1.85), 2)
        fl.data.materials.clear()
        fl.data.materials.append(GLOW)
        paint(fl, lambda co, n, *_: mix(C("#ff7a2a"), C("#ffe9a0"), max(0, n.z)))
        bits += [th, fl]
    # A grumpy face: the moon is not thrilled about this either.
    for sx in (-1, 1):
        bits.append(eye(f"m_eye{sx}", (sx * 0.62, -2.05, 0.55), (0.24, 0.12, 0.3)))
        brow = capsule(f"m_brow{sx}", (sx * 0.95, -2.02, 1.02), (sx * 0.3, -2.12, 0.86), 0.06, around=6)
        paint_solid(brow, C("#4a4438"))
        bits.append(brow)
    mouth = capsule("m_mouth", (-0.4, -2.12, -0.35), (0.4, -2.12, -0.35), 0.06, around=6)
    paint_solid(mouth, C("#4a4438"))
    bits.append(mouth)
    b = part(join(bits, "m_bodyj"), "moon_body", Vector((0, 0, 0)), root)
    # The cannon rides on top of the collar, pointing forward (-Y).
    Z = 2.3
    barrel = [cylinder("m_barrel", 0.55, 0.48, 3.0, STEEL_, segs=18, bevel=0.03, axis="Y", at=(0, -1.4, Z))]
    barrel.append(cylinder("m_muzzle", 0.66, 0.66, 0.42, C("#3a3e48"), segs=18, bevel=0.04, axis="Y", at=(0, -2.9, Z)))
    barrel.append(cylinder("m_breech", 0.8, 0.8, 0.7, STEEL_, segs=18, bevel=0.05, axis="Y", at=(0, 0.2, Z)))
    barrel.append(block_("m_mount", 1.0, 1.0, 0.5, STEEL_, (0, 0.1, Z - 0.75), 0.0))
    for k in range(2):
        barrel.append(cylinder(f"m_band{k}", 0.58, 0.58, 0.14, C("#ffb02a"), segs=18, bevel=0, axis="Y", at=(0, -0.9 - k * 1.1, Z)))
    bore = blob("m_bore", (0.38, 0.06, 0.38), (0, -3.12, Z), 2)
    paint_solid(bore, C("#0a0a0e"))
    barrel.append(bore)
    bj = join(barrel, "m_barrelj")
    bj.data.materials[0] = METAL
    part(bj, "moon_barrel", Vector((0, 0.1, Z)), b)
    return root


# ───────────────────────────────────────────── Black Hole Engine
def blackhole():
    """The containment rig for a black hole: a plinth, three swept pylons
    and a heavy ring gantry (its own part; the runtime turns it). The hole
    and its accretion disc are drawn by the runtime inside the ring."""
    from hard import block, cylinder
    STEEL_, DARK, TRIM = C("#4a4e5c"), C("#24242c"), C("#9a6aff")
    GLOW = vtx_material("Glow", rough=1.0, emissive=True)
    root = character("blackhole")
    base = [cylinder("bh_plinth", 1.9, 2.1, 0.5, STEEL_, segs=24, bevel=0.05)]
    base.append(cylinder("bh_step", 1.5, 1.5, 0.2, DARK, segs=24, bevel=0.03, at=(0, 0, 0.5)))
    glow_ring = cylinder("bh_glow", 1.52, 1.52, 0.05, TRIM, segs=24, bevel=0, at=(0, 0, 0.66))
    glow_ring.data.materials.clear()
    glow_ring.data.materials.append(GLOW)
    paint_solid(glow_ring, TRIM)
    base.append(glow_ring)
    for k in range(3):
        a = k / 3 * math.tau + math.pi / 2
        pts = [(math.cos(a) * (1.6 - t * 0.2), math.sin(a) * (1.6 - t * 0.2) * 0.35, 0.5 + t * 2.0) for t in (0, 0.35, 0.7, 1.0)]
        pyl = sweep(f"bh_pylon{k}", pts, [0.22, 0.18, 0.15, 0.13], around=8)
        paint_solid(pyl, STEEL_)
        base.append(pyl)
    bj = join(base, "bh_basej")
    bj.data.materials[0] = METAL
    b = part(bj, "blackhole_base", Vector((0, 0, 0)), root)
    ring_pts = [(math.cos(t / 48 * math.tau) * 1.75, 0, 2.7 + math.sin(t / 48 * math.tau) * 1.75) for t in range(49)]
    ring = sweep("bh_ring", ring_pts, 0.24, around=10)
    paint_solid(ring, DARK)
    inner = sweep("bh_inner", [(x * 0.88, -0.02, 2.7 + (z - 2.7) * 0.88) for x, _, z in ring_pts], 0.05, around=6)
    inner.data.materials.clear()
    inner.data.materials.append(GLOW)
    paint_solid(inner, TRIM)
    bits = [ring, inner]
    for k in range(8):
        a = k / 8 * math.tau
        clamp_ = block(f"bh_clamp{k}", 0.35, 0.6, 0.35, C("#c8ccd4"), bevel=0.05, at=(math.cos(a) * 1.75, 0, 2.7 + math.sin(a) * 1.75 - 0.17))
        bits.append(clamp_)
    rj = join(bits, "bh_ringj")
    rj.data.materials[0] = METAL
    part(rj, "blackhole_ring", Vector((0, 0, 2.7)), b)
    return root


# ───────────────────────────────────────────── gear and projectiles
def gear():
    rock = boulder("proj_rock", 77, size=0.14, squash=0.85, moss=False, facets=14, subdiv=2,
                   pal=dict(rock=C("#9a8c80"), rock_dark=C("#5e524c")))
    zs = [v.co.z for v in rock.data.vertices]
    rock.data.transform(Matrix.Translation((0, 0, -(min(zs) + max(zs)) / 2)))
    move_to(rock, OUTC)
    rock["role"] = "gear"
    banana = mesh_obj(bm_cyl(0.035, 0.022, 0.2, 7), "proj_banana")
    for v in banana.data.vertices:
        t = v.co.z / 0.2
        v.co.x += math.sin(t * math.pi * 0.8) * 0.04
    banana.data.transform(Matrix.Translation((0, 0, -0.1)))
    paint(banana, lambda co, n, *_: mix(C("#d2a91d"), C("#ffe25a"), 0.5 + 0.5 * max(0, n.x)))
    move_to(banana, OUTC)
    banana["role"] = "gear"
    glove_parts = []
    palm = blob("pg_palm", (0.3, 0.12, 0.34), (0, 0, 0))
    glove_parts.append(palm)
    for k, x in enumerate((-0.2, -0.07, 0.07, 0.2)):
        f = capsule(f"pg_f{k}", (x, 0, 0.25), (x * 1.15, 0, 0.55 - abs(x) * 0.4), 0.075)
        glove_parts.append(f)
    th = capsule("pg_th", (0.26, -0.02, 0.0), (0.45, -0.04, 0.22), 0.08)
    glove_parts.append(th)
    cuff = blob("pg_cuff", (0.26, 0.14, 0.1), (0, 0, -0.33))
    glove_parts.append(cuff)
    glove = join(glove_parts, "proj_glove")
    paint(glove, lambda co, n, *_: mix(C("#c8c4ba"), C("#fbfaf6"), 0.5 + 0.5 * n.z))
    move_to(glove, OUTC)
    glove["role"] = "gear"
    return [rock, banana, glove]


monkey_root = monkey()
gorilla_root = gorilla()
treb_root = trebuchet()
knight_root = knight()
steam_root = steam()
factory_root = factory()
turret_root = turret()
jet_root = jet()
drone_root = drone()
orbital_root = orbital()
moon_root = moon()
bh_root = blackhole()
gear()

for prefix in ("monkey_", "gorilla_", "trebuchet_", "knight_", "steam_", "factory_", "turret_", "jet_", "drone_", "orbital_", "moon_", "blackhole_", "proj_"):
    parts = [o for o in OUTC.objects if o.type == "MESH" and o.name.startswith(prefix)]
    bake_ao(parts, samples=160, distance=0.22, strength=0.45, ground=False)
export_glb(OUT, objs=list(OUTC.objects))

if PREVIEW:
    # Line-up for visual QA: monkey, gorilla, and their gear.
    monkey_root.location = (-0.45, 0, 0)
    gorilla_root.location = (0.45, 0, 0)
    treb_root.location = (-2.6, 2.0, 0)
    knight_root.location = (2.2, 0.8, 0)
    steam_root.location = (-1.2, -0.6, 0)
    factory_root.location = (4.5, 3.5, 0)
    turret_root.location = (1.4, -1.6, 0)
    jet_root.location = (-3.5, -2.0, 1.6)
    drone_root.location = (3.2, -2.2, 1.4)
    drone_root.scale = (1.6, 1.6, 1.6)
    orbital_root.location = (0.0, 4.5, 3.6)
    orbital_root.scale = (0.6, 0.6, 0.6)
    bpy.ops.mesh.primitive_plane_add(size=20)
    gp = bpy.context.active_object
    paint_solid(gp, C("#7d8a48"))
    gp.data.materials.append(vtx_material())
    preview(PREVIEW, eye=(0.2, -7.0, 2.4), target=(0, 0.8, 0.9), lens=50, size=(960, 600), sun_dir=(-0.5, -0.6, 0.6), world_rgb=(0.55, 0.5, 0.55), sun=3.0)
    monkey_root.rotation_euler = (0, 0, math.radians(-50))
    gorilla_root.rotation_euler = (0, 0, math.radians(50))
    preview(PREVIEW.replace(".png", "_3q.png"), eye=(0.0, -3.4, 1.9), target=(0, 0, 0.42), lens=60, size=(960, 600), sun_dir=(-0.5, -0.6, 0.6), world_rgb=(0.55, 0.5, 0.55), sun=3.0)
    # Close-up of the flying crew (drone, satellite) for QA.
    for r in (monkey_root, gorilla_root, treb_root, knight_root, steam_root, factory_root, turret_root, jet_root):
        r.location.z -= 50
    drone_root.location = (-0.9, -1.2, 1.3)
    drone_root.scale = (2.2, 2.2, 2.2)
    drone_root.rotation_euler = (0, 0, math.radians(-25))
    orbital_root.location = (1.3, 1.5, 1.9)
    orbital_root.scale = (0.45, 0.45, 0.45)
    orbital_root.rotation_euler = (math.radians(15), 0, math.radians(20))
    moon_root.location = (-3.5, 6.0, 2.5)
    moon_root.scale = (0.5, 0.5, 0.5)
    bh_root.location = (3.4, 5.0, 0.0)
    bh_root.scale = (0.6, 0.6, 0.6)
    preview(PREVIEW.replace(".png", "_fly.png"), eye=(0.0, -6.0, 2.6), target=(0.2, 0.5, 1.5), lens=45, size=(960, 600), sun_dir=(-0.5, -0.6, 0.6), world_rgb=(0.35, 0.3, 0.45), sun=3.0)
