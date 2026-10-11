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
    paint, paint_solid, preview, reset, sweep, vtx_material,
)
from rocks import boulder  # noqa: E402

reset()
args = argv()
OUT = args[0]
PREVIEW = args[1] if len(args) > 1 else None
OUTC = collection("export")
GLOSS = vtx_material("Gloss", rough=0.18)


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
    """Knuckle-walking silverback: a hunched barrel body, a low head with a
    heavy brow, and enormous forearms planted on the ground."""
    FUR, FUR_L, FUR_D = C("#3c3a42"), C("#5d5b66"), C("#24232b")
    SILVER = C("#9896a3")
    FACE, FACE_L = C("#2a2226"), C("#53454b")
    root = character("gorilla")
    hip = Vector((0, 0.1, 0.36))
    body = blob("g_body", (0.27, 0.3, 0.25), (0, 0.0, 0.55))
    for v in body.data.vertices:
        # Shoulders broad and high, rump low: a sloped back.
        f = max(0.0, -v.co.y) / 0.3
        v.co.z += f * 0.12
        v.co.x *= 1 + f * 0.18
    displace(body, 0.012, 9, 3)
    fur(body, FUR, FUR_L, FUR_D, 11, belly=lambda co, n: n.z > 0.35 and co.y > -0.12, belly_col=SILVER)
    chest = blob("g_chest", (0.21, 0.07, 0.16), (0, -0.27, 0.6))
    paint(chest, lambda co, n, *_: mix(FACE, FACE_L, 0.45 + 0.55 * max(0, n.z)))
    body = part(join([body, chest], "g_bodyj"), "gorilla_body", hip, root)
    neck = Vector((0, -0.24, 0.76))
    head = blob("g_head", (0.165, 0.16, 0.16), (0, -0.33, 0.82))
    crest = blob("g_crest", (0.1, 0.12, 0.07), (0, -0.3, 0.925), 2)
    fur(head, FUR, FUR_L, FUR_D, 12)
    fur(crest, FUR, FUR_L, FUR_D, 13)
    face = blob("g_face", (0.115, 0.07, 0.11), (0, -0.44, 0.8))
    paint(face, lambda co, n, *_: mix(FACE, FACE_L, 0.35 + 0.65 * max(0, n.z)))
    brow = blob("g_brow", (0.125, 0.055, 0.035), (0, -0.475, 0.875), 2)
    paint(brow, lambda co, n, *_: mix(FACE, FACE_L, 0.7))
    muzzle = blob("g_muzzle", (0.08, 0.055, 0.06), (0, -0.495, 0.765))
    paint(muzzle, lambda co, n, *_: mix(FACE, FACE_L, 0.6 + 0.4 * max(0, n.z)))
    nos = [blob(f"g_nos{s}", (0.015, 0.008, 0.011), (s * 0.022, -0.55, 0.785), 1) for s in (-1, 1)]
    for nn in nos:
        paint_solid(nn, C("#0e0b0d"))
    eyes = [eye(f"g_eye{s}", (s * 0.045, -0.5, 0.835), (0.017, 0.012, 0.019)) for s in (-1, 1)]
    ears = [blob(f"g_ear{s}", (0.02, 0.03, 0.035), (s * 0.145, -0.34, 0.83), 1) for s in (-1, 1)]
    for e in ears:
        paint_solid(e, FACE_L)
    head = join([head, crest, face, brow, muzzle, *nos, *eyes, *ears], "g_headj")
    part(head, "gorilla_head", neck, body)
    for s, side in ((-1, "L"), (1, "R")):
        sh = Vector((s * 0.29, -0.2, 0.72))
        el = Vector((s * 0.36, -0.3, 0.42))
        wr = Vector((s * 0.37, -0.36, 0.12))
        upper = capsule(f"g_up{side}", sh, el, 0.1, 0.085, around=12)
        fore = capsule(f"g_fo{side}", el, wr, 0.095, 0.115, around=12)
        fur(upper, FUR, FUR_L, FUR_D, 14)
        fur(fore, FUR, FUR_L, FUR_D, 15)
        fist = blob(f"g_fist{side}", (0.095, 0.1, 0.075), tuple(wr + Vector((0, -0.03, -0.045))), 2)
        paint(fist, lambda co, n, *_: mix(FACE, FACE_L, 0.4 + 0.6 * max(0, n.z)))
        part(join([upper, fore, fist], f"g_armj{side}"), f"gorilla_arm{side}", sh, body)
        hp = Vector((s * 0.16, 0.18, 0.34))
        leg = capsule(f"g_leg{side}", hp, hp + Vector((s * 0.03, -0.02, -0.27)), 0.1, 0.085, around=12)
        fur(leg, FUR, FUR_L, FUR_D, 16)
        foot = blob(f"g_foot{side}", (0.075, 0.11, 0.035), tuple(hp + Vector((s * 0.035, -0.07, -0.31))), 2)
        paint(foot, lambda co, n, *_: mix(FACE, FACE_L, 0.5))
        part(join([leg, foot], f"g_legj{side}"), f"gorilla_leg{side}", hp, root)
    # Accessory: a bone necklace for the troop's veterans.
    beads = []
    for k in range(7):
        a = (k / 6 - 0.5) * 2.0
        b = blob(f"g_bone{k}", (0.013, 0.013, 0.036), (math.sin(a) * 0.19, -0.33 + (1 - math.cos(a)) * 0.08, 0.68 - 0.02 * math.cos(a)), 1)
        paint_solid(b, C("#efe4cc"))
        beads.append(b)
    part(join(beads, "g_beads"), "gorilla_acc0", Vector((0, -0.3, 0.7)), body)
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
    shadow = None
    return [rock, banana, shadow]


monkey_root = monkey()
gorilla_root = gorilla()
gear()

for prefix in ("monkey_", "gorilla_", "proj_"):
    parts = [o for o in OUTC.objects if o.type == "MESH" and o.name.startswith(prefix)]
    bake_ao(parts, samples=160, distance=0.22, strength=0.45, ground=False)
export_glb(OUT, objs=list(OUTC.objects))

if PREVIEW:
    # Line-up for visual QA: monkey, gorilla, and their gear.
    monkey_root.location = (-0.45, 0, 0)
    gorilla_root.location = (0.45, 0, 0)
    bpy.ops.mesh.primitive_plane_add(size=20)
    gp = bpy.context.active_object
    paint_solid(gp, C("#7d8a48"))
    gp.data.materials.append(vtx_material())
    preview(PREVIEW, eye=(0.2, -3.0, 1.0), target=(0, 0, 0.45), lens=60, size=(960, 600), sun_dir=(-0.5, -0.6, 0.6), world_rgb=(0.55, 0.5, 0.55), sun=3.0)
    monkey_root.rotation_euler = (0, 0, math.radians(-50))
    gorilla_root.rotation_euler = (0, 0, math.radians(50))
    preview(PREVIEW.replace(".png", "_3q.png"), eye=(0.0, -3.4, 1.9), target=(0, 0, 0.42), lens=60, size=(960, 600), sun_dir=(-0.5, -0.6, 0.6), world_rgb=(0.55, 0.5, 0.55), sun=3.0)
