"""Era IV props: a city plaza at blue hour."""
from __future__ import annotations

import math
import random

import bmesh
import bpy
from mathutils import Matrix, Vector

from kit import C, vtx_material, add_bevel, apply_mods, bm_ico, join, mesh_obj, mix, mul, paint, paint_faces, paint_solid, sweep
from hard import beam, block, cylinder, glow_mat, metal_mat
from props_stone import _outline, _prism

CONCRETE = C("#74767f")
CONCRETE_D = C("#4e5058")
ASPHALT = C("#2e3038")
PAINT_Y = C("#f2c230")
PAINT_W = C("#eef0f2")
SODIUM = C("#ffb35a")
WINDOW_WARM = C("#ffd08a")
WINDOW_COOL = C("#a8d4ff")


def metal(ob):
    ob.data.materials.clear()
    ob.data.materials.append(metal_mat())
    return ob


def glow(ob, col):
    ob.data.materials.clear()
    ob.data.materials.append(glow_mat())
    if col is not None:
        paint_solid(ob, col)
    return ob


def dais(name="helipad"):
    """A raised concrete helipad: a yellow ring, a white H, edge lights."""
    rnd = random.Random(2)
    parts = []
    bm = bmesh.new()
    _prism(bm, _outline(32, 2.3, 1, 0.0), -0.12, 0.2)
    pad = mesh_obj(bm, f"{name}_pad", smooth=False)
    add_bevel(pad, 0.05, 2, 40, harden=False)
    apply_mods(pad)
    paint_faces(pad, lambda c, n, i: mul(CONCRETE if n.z > 0.7 else CONCRETE_D, 0.95 + rnd.random() * 0.06))
    parts.append(pad)
    ring = [(math.cos(a / 48 * math.tau) * 1.85, math.sin(a / 48 * math.tau) * 1.85, 0.205) for a in range(49)]
    r = sweep(f"{name}_ring", ring, 0.07, around=4)
    for v in r.data.vertices:
        v.co.z = min(v.co.z, 0.215)
    paint_solid(r, PAINT_Y)
    parts.append(r)
    for k, (x, y, sx, sy) in enumerate([(-0.45, 0, 0.18, 1.3), (0.45, 0, 0.18, 1.3), (0, 0, 0.75, 0.18)]):
        parts.append(block(f"{name}_h{k}", sx, sy, 0.025, PAINT_W, bevel=0, at=(x, y, 0.2 + k * 0.004)))
    for k in range(16):
        a = k / 16 * math.tau
        lamp = mesh_obj(bm_ico(1.0, 1), f"{name}_lamp{k}")
        lamp.data.transform(Matrix.Diagonal((0.05, 0.05, 0.04, 1)))
        lamp.data.transform(Matrix.Translation((math.cos(a) * 2.2, math.sin(a) * 2.2, 0.21)))
        parts.append(glow(lamp, C("#7ad0ff") if k % 2 else C("#ffffff")))
    ob = join(parts, name)
    ob["col"] = 2.3
    ob["walk"] = 1
    return ob


def gloss(ob):
    ob.data.materials.clear()
    ob.data.materials.append(vtx_material("Gloss", rough=0.16))
    return ob


GLASS = C("#1a2234")
ROOF = C("#3a3a42")


def pane(name, w, h, col):
    """A flat window pane facing -y (front), resting on z=0: two triangles
    where a box would spend twelve on sides nobody sees."""
    bm = bmesh.new()
    vs = [bm.verts.new(p) for p in ((-w / 2, 0, 0), (w / 2, 0, 0), (w / 2, 0, h), (-w / 2, 0, h))]
    bm.faces.new(vs)
    ob = mesh_obj(bm, name, smooth=False)
    paint_solid(ob, col)
    return ob


def parapet(name, w, d, h, z, col, t=0.22):
    """A hollow rooftop parapet (four walls), so the roof itself shows."""
    return [
        block(f"{name}_pf", w, t, h, col, bevel=0.03, at=(0, -d / 2 + t / 2, z)),
        block(f"{name}_pb", w, t, h, col, bevel=0.03, at=(0, d / 2 - t / 2, z)),
        block(f"{name}_pl", t, d - 2 * t, h, col, bevel=0.03, at=(-w / 2 + t / 2, 0, z)),
        block(f"{name}_pr", t, d - 2 * t, h, col, bevel=0.03, at=(w / 2 - t / 2, 0, z)),
    ]


def tower(name, w=6.0, d=6.0, floors=12, floor_h=1.25, body=None, frame=None, lit=0.45, warm=0.8, seed=0, crown="flat"):
    """A building: pilasters and floor bands frame a grid of tall windows
    (dark glass, some lit warm or cool), a lit storefront at street level
    under an awning, and a crown. Origin at the base centre."""
    rnd = random.Random(seed)
    body = body or C("#3a4256")
    frame = frame or mix(body, C("#c8ccd4"), 0.35)
    shop_h = floor_h * 1.5
    h = shop_h + (floors - 1) * floor_h
    parts = [block(f"{name}_core", w, d, h, body, bevel=0.06, seed=seed)]
    parts.append(block(f"{name}_roof", w - 0.3, d - 0.3, 0.04, ROOF, bevel=0, at=(0, 0, h)))
    lit_parts, dark_parts = [], []
    awning = rnd.choice((C("#c8402e"), C("#2e7a5a"), C("#2e5aa8"), C("#d89a2a")))
    for side in range(4):
        sw = w if side % 2 == 0 else d
        depth = (d if side % 2 == 0 else w) / 2
        cols = max(3, int(sw / 0.85))
        pitch = sw / cols
        rot = Matrix.Rotation(side * math.pi / 2, 4, "Z")

        def face(ob, u, z):
            ob.data.transform(Matrix.Translation((u, -depth, z)))
            ob.data.transform(rot)
            return ob

        # Street level: one long storefront window and an awning over it.
        shop = pane(f"{name}_shop{side}", sw * 0.86, shop_h * 0.62, mix(WINDOW_WARM, C("#ffffff"), 0.15))
        shop.data.transform(Matrix.Translation((0, -0.03, 0)))
        lit_parts.append(face(shop, 0, 0.12))
        parts.append(face(block(f"{name}_awn{side}", sw * 0.9, 0.5, 0.12, awning, bevel=0.03), 0, shop_h * 0.78))
        # Upper floors: a grid of tall windows.
        for f in range(1, floors):
            z = shop_h + (f - 1) * floor_h + floor_h * 0.2
            for c in range(cols):
                u = -sw / 2 + (c + 0.5) * pitch
                win = pane(f"{name}_w{side}_{f}_{c}", pitch * 0.56, floor_h * 0.62, GLASS)
                win.data.transform(Matrix.Translation((0, -0.03, 0)))
                face(win, u, z)
                if rnd.random() < lit:
                    paint_solid(win, (WINDOW_WARM if rnd.random() < warm else WINDOW_COOL))
                    lit_parts.append(win)
                else:
                    dark_parts.append(win)
        # Pilasters between window columns.
        for c in range(cols + 1):
            u = -sw / 2 + c * pitch
            parts.append(face(block(f"{name}_pil{side}_{c}", 0.14, 0.12, h - shop_h, frame, bevel=0.02), u, shop_h))
    # Floor bands, a heavier cornice over the shop floor.
    parts.append(block(f"{name}_cornice", w + 0.24, d + 0.24, 0.22, frame, bevel=0.04, at=(0, 0, shop_h)))
    for f in range(2, floors):
        z = shop_h + (f - 1) * floor_h
        parts.append(block(f"{name}_band{f}", w + 0.1, d + 0.1, 0.1, frame, bevel=0.015, at=(0, 0, z - 0.05)))
    if crown == "spire":
        parts += parapet(f"{name}_par", w + 0.14, d + 0.14, 0.35, h, frame)
        parts.append(block(f"{name}_crown", w * 0.6, d * 0.6, 1.6, frame, bevel=0.05, at=(0, 0, h)))
        parts.append(block(f"{name}_crown2", w * 0.32, d * 0.32, 1.2, frame, bevel=0.05, at=(0, 0, h + 1.6)))
        parts.append(metal(cylinder(f"{name}_mast", 0.12, 0.05, 4.0, C("#c8ccd4"), segs=8, bevel=0, at=(0, 0, h + 2.8))))
        tip = mesh_obj(bm_ico(0.16, 1), f"{name}_tip")
        tip.data.transform(Matrix.Translation((0, 0, h + 6.8)))
        lit_parts.append(paint_solid(tip, C("#ff3a3a")) or tip)
    elif crown == "tank":
        parts += parapet(f"{name}_par", w + 0.14, d + 0.14, 0.4, h, frame)
        parts.append(cylinder(f"{name}_tank", 0.9, 0.9, 1.3, C("#6a5040"), segs=12, bevel=0.03, at=(w * 0.2, d * 0.15, h + 1.0)))
        parts.append(cylinder(f"{name}_tankroof", 0.95, 0.1, 0.5, C("#5a4032"), segs=12, bevel=0.02, at=(w * 0.2, d * 0.15, h + 2.3)))
        for k in range(4):
            a = k / 4 * math.tau + 0.4
            parts.append(metal(cylinder(f"{name}_leg{k}", 0.05, 0.05, 1.0, C("#4a4e5a"), segs=6, bevel=0,
                                        at=(w * 0.2 + math.cos(a) * 0.7, d * 0.15 + math.sin(a) * 0.7, h))))
        parts.append(block(f"{name}_hut", 1.6, 1.4, 1.2, frame, bevel=0.04, at=(-w * 0.2, -d * 0.1, h)))
    else:
        parts += parapet(f"{name}_par", w + 0.2, d + 0.2, 0.5, h, frame)
        for k in range(3):
            parts.append(metal(block(f"{name}_ac{k}", 0.8, 0.6, 0.5, C("#9aa0aa"), bevel=0.04,
                                     at=(-w * 0.25 + k * 0.9, d * 0.2, h))))
        if rnd.random() < 0.6:
            sign = block(f"{name}_sign", w * 0.7, 0.12, 1.1, rnd.choice((C("#ff4a6a"), C("#4ad0ff"), C("#ffd23f"))), bevel=0.03)
            sign.data.transform(Matrix.Translation((0, -d / 2 + 0.3, h + 0.5)))
            lit_parts.append(sign)
    for ob in lit_parts:
        glow(ob, None)
    for ob in dark_parts:
        gloss(ob)
    ob = join(parts + lit_parts + dark_parts, name)
    ob["col"] = max(w, d) * 0.55
    return ob


def street_lamp(name="street_lamp"):
    parts = [metal(cylinder(f"{name}_pole", 0.07, 0.05, 4.2, C("#4a4e5a"), segs=8, bevel=0.01))]
    parts.append(metal(beam(f"{name}_arm", (0, 0, 4.1), (0, -0.9, 4.25), 0.06, C("#4a4e5a"))))
    head = block(f"{name}_head", 0.36, 0.5, 0.12, C("#4a4e5a"), bevel=0.03, at=(0, -0.95, 4.12))
    parts.append(metal(head))
    bulb = block(f"{name}_bulb", 0.28, 0.4, 0.04, SODIUM, bevel=0.01, at=(0, -0.95, 4.09))
    parts.append(glow(bulb, SODIUM))
    parts.append(block(f"{name}_base", 0.3, 0.3, 0.4, C("#3a3e48"), bevel=0.03))
    return join(parts, name)


def car(name, body_col, seed=0):
    """A chunky toy car: rounded body, glass cabin, chunky wheels, lights."""
    parts = []
    b = block(f"{name}_body", 1.9, 0.95, 0.5, body_col, bevel=0.16, seg=3, at=(0, 0, 0.22), flat=False, seed=seed)
    parts.append(b)
    cab = block(f"{name}_cab", 1.05, 0.85, 0.42, mul(body_col, 0.9), bevel=0.14, seg=3, at=(-0.1, 0, 0.66), flat=False, seed=seed)
    parts.append(cab)
    for k, (x, sx) in enumerate(((0.36, 0.06), (-0.58, 0.06))):
        g = block(f"{name}_ws{k}", sx, 0.74, 0.3, C("#1e2838"), bevel=0.02, at=(x, 0, 0.72))
        parts.append(g)
    for s in (-1, 1):
        side = block(f"{name}_sw{s}", 0.8, 0.04, 0.26, C("#1e2838"), bevel=0.01, at=(-0.1, s * 0.43, 0.74))
        parts.append(side)
    for x in (-0.6, 0.6):
        for s in (-1, 1):
            w = cylinder(f"{name}_wh{int(x*10)}{s}", 0.22, 0.22, 0.18, C("#1a1a1e"), segs=12, bevel=0.03, axis="Y", at=(x, s * 0.44, 0.22))
            hub = cylinder(f"{name}_hub{int(x*10)}{s}", 0.1, 0.1, 0.2, C("#c8ccd4"), segs=8, bevel=0, axis="Y", at=(x, s * 0.45, 0.22))
            parts += [w, metal(hub)]
    for s in (-1, 1):
        parts.append(glow(block(f"{name}_hl{s}", 0.04, 0.2, 0.1, C("#fff4d0"), bevel=0, at=(0.96, s * 0.3, 0.38)), C("#fff1c8")))
        parts.append(glow(block(f"{name}_tl{s}", 0.04, 0.2, 0.08, C("#ff3030"), bevel=0, at=(-0.96, s * 0.3, 0.4)), C("#ff2a2a")))
    ob = join(parts, name)
    ob["col"] = 1.0
    return ob


def news_van(name="news_van"):
    parts = [block(f"{name}_body", 2.6, 1.2, 1.4, C("#f2f2f4"), bevel=0.12, seg=2, at=(0, 0, 0.25), flat=False)]
    parts.append(block(f"{name}_stripe", 2.62, 1.22, 0.18, C("#d23a3a"), bevel=0.02, at=(0, 0, 0.75)))
    parts.append(block(f"{name}_ws", 0.06, 1.0, 0.45, C("#1e2838"), bevel=0.02, at=(1.3, 0, 1.0)))
    for x in (-0.8, 0.8):
        for s in (-1, 1):
            parts.append(cylinder(f"{name}_wh{int(x*10)}{s}", 0.26, 0.26, 0.2, C("#1a1a1e"), segs=12, bevel=0.03, axis="Y", at=(x, s * 0.55, 0.26)))
    parts.append(metal(cylinder(f"{name}_mast", 0.06, 0.05, 1.4, C("#c8ccd4"), segs=8, bevel=0, at=(-0.6, 0, 1.65))))
    dish = mesh_obj(bm_ico(1.0, 2), f"{name}_dish")
    dish.data.transform(Matrix.Diagonal((0.55, 0.55, 0.18, 1)))
    for v in dish.data.vertices:
        if v.co.z > 0:
            v.co.z *= -0.3
    dish.data.transform(Matrix.Rotation(-0.9, 4, "Y"))
    dish.data.transform(Matrix.Translation((-0.4, 0, 3.1)))
    paint_solid(dish, C("#e8e8ec"))
    parts.append(dish)
    ob = join(parts, name)
    ob["col"] = 1.4
    return ob


def hotdog_cart(name="hotdog"):
    parts = [block(f"{name}_box", 1.4, 0.8, 0.85, C("#c8cdd6"), bevel=0.06, at=(0, 0, 0.35))]
    metal(parts[0])
    for x in (-0.5, 0.5):
        parts.append(cylinder(f"{name}_wh{int(x*10)}", 0.2, 0.2, 0.08, C("#2a2a30"), segs=12, bevel=0.02, axis="Y", at=(x, 0.42, 0.2)))
    parts.append(beam(f"{name}_pole", (0, 0, 1.2), (0, 0, 2.2), 0.04, C("#5a5e68")))
    bm = bmesh.new()
    n = 10
    for k in range(n):
        a0, a1 = k / n * math.tau, (k + 1) / n * math.tau
        vs = [bm.verts.new(p) for p in [(0, 0, 2.35), (math.cos(a0) * 1.0, math.sin(a0) * 1.0, 2.0), (math.cos(a1) * 1.0, math.sin(a1) * 1.0, 2.0)]]
        bm.faces.new(vs)
    umb = mesh_obj(bm, f"{name}_umb", smooth=False)
    sol = umb.modifiers.new("S", "SOLIDIFY")
    sol.thickness = 0.03
    apply_mods(umb)
    paint_faces(umb, lambda c, n_, i: C("#d23a3a") if int((math.atan2(c.y, c.x) + math.pi) / math.tau * n) % 2 else C("#f4f2ea"))
    parts.append(umb)
    parts.append(block(f"{name}_sign", 1.0, 0.04, 0.3, PAINT_Y, bevel=0.01, at=(0, -0.42, 0.8)))
    ob = join(parts, name)
    ob["col"] = 0.8
    return ob


def bus_stop(name="bus_stop"):
    parts = [block(f"{name}_roof", 2.6, 1.2, 0.1, C("#3a3e48"), bevel=0.03, at=(0, 0, 2.3))]
    for x in (-1.2, 1.2):
        parts.append(metal(block(f"{name}_post{x}", 0.08, 0.08, 2.3, C("#6a6e78"), bevel=0.01, at=(x, 0.5, 0))))
    glass = block(f"{name}_back", 2.4, 0.04, 1.8, C("#8ab0d0"), bevel=0, at=(0, 0.55, 0.3))
    parts.append(glass)
    ad = block(f"{name}_ad", 0.9, 0.06, 1.4, C("#ff9ad0"), bevel=0, at=(-1.15, 0.0, 0.5), rot=math.pi / 2)
    parts.append(glow(ad, C("#ff8ac8")))
    parts.append(block(f"{name}_bench", 1.8, 0.4, 0.08, C("#7a5a3a"), bevel=0.02, at=(0, 0.25, 0.45)))
    ob = join(parts, name)
    ob["col"] = 1.0
    return ob


def cone(name="cone"):
    parts = [cylinder(f"{name}_c", 0.18, 0.03, 0.6, C("#ff6a1a"), segs=10, bevel=0, at=(0, 0, 0.05))]
    parts.append(cylinder(f"{name}_band", 0.12, 0.1, 0.1, PAINT_W, segs=10, bevel=0, at=(0, 0, 0.3)))
    parts.append(block(f"{name}_base", 0.42, 0.42, 0.06, C("#2a2a30"), bevel=0.02))
    return join(parts, name)


def barrier(name="barrier"):
    parts = [block(f"{name}_bar", 1.6, 0.12, 0.28, C("#f4f2ea"), bevel=0.03, at=(0, 0, 0.75))]
    paint_faces(parts[0], lambda c, n, i: C("#d23a3a") if int((c.x + 2) * 3) % 2 else C("#f4f2ea"))
    for x in (-0.6, 0.6):
        parts.append(metal(beam(f"{name}_l{x}a", (x - 0.2, -0.25, 0), (x, 0, 0.9), 0.05, C("#5a5e68"))))
        parts.append(metal(beam(f"{name}_l{x}b", (x + 0.2, 0.25, 0), (x, 0, 0.9), 0.05, C("#5a5e68"))))
    return join(parts, name)


def planter_tree(name="planter", seed=3):
    from flora import broadleaf
    parts = [cylinder(f"{name}_pot", 0.75, 0.7, 0.55, CONCRETE, segs=14, bevel=0.04)]
    soil = cylinder(f"{name}_soil", 0.66, 0.66, 0.04, C("#3a2a22"), segs=14, bevel=0, at=(0, 0, 0.5))
    parts.append(soil)
    tree = broadleaf(f"{name}_tree", seed, height=2.4, pal=dict(leaf0=C("#1e3a30"), leaf1=C("#3e7a4a"), leaf2=C("#8ac06a")))
    tree.data.transform(Matrix.Translation((0, 0, 0.5)))
    parts.append(tree)
    ob = join(parts, name)
    ob["col"] = 0.8
    ob["sway"] = 0.6
    return ob


def vending(name="vending"):
    parts = [block(f"{name}_box", 0.9, 0.7, 1.9, C("#c8303a"), bevel=0.05)]
    front = block(f"{name}_front", 0.6, 0.04, 1.2, C("#bfe8ff"), bevel=0, at=(-0.08, -0.36, 0.55))
    parts.append(glow(front, C("#9fdcff")))
    parts.append(block(f"{name}_slot", 0.5, 0.06, 0.18, C("#1a1a1e"), bevel=0.01, at=(-0.08, -0.36, 0.2)))
    ob = join(parts, name)
    ob["col"] = 0.6
    return ob


def tower_crane(name="tower_crane"):
    parts = []
    for k in range(4):
        a = k / 4 * math.tau + math.pi / 4
        parts.append(metal(beam(f"{name}_m{k}", (math.cos(a) * 0.6, math.sin(a) * 0.6, 0), (math.cos(a) * 0.6, math.sin(a) * 0.6, 22), 0.12, PAINT_Y)))
    for z in range(1, 22, 2):
        for k in range(4):
            a0, a1 = k / 4 * math.tau + math.pi / 4, (k + 1) / 4 * math.tau + math.pi / 4
            parts.append(metal(beam(f"{name}_x{z}{k}", (math.cos(a0) * 0.6, math.sin(a0) * 0.6, z), (math.cos(a1) * 0.6, math.sin(a1) * 0.6, z + 1.6), 0.05, PAINT_Y)))
    parts.append(metal(beam(f"{name}_jib", (0, 4, 22.4), (0, -14, 22.4), 0.5, PAINT_Y)))
    parts.append(block(f"{name}_cab", 1.4, 1.4, 1.2, C("#f4f2ea"), bevel=0.05, at=(0, 0.6, 21.0)))
    parts.append(block(f"{name}_cw", 1.6, 1.8, 1.4, CONCRETE_D, bevel=0.05, at=(0, 3.4, 21.0)))
    parts.append(metal(cylinder(f"{name}_cable", 0.03, 0.03, 9.0, C("#2a2a30"), segs=4, bevel=0, at=(0, -10, 13.2))))
    parts.append(block(f"{name}_load", 2.0, 0.5, 0.4, C("#c84a32"), bevel=0.03, at=(0, -10, 12.8)))
    ob = join(parts, name)
    ob["col"] = 1.0
    return ob


def helicopter(name="helicopter"):
    """A news chopper: body, tail boom, skids; rotor parts for the runtime to spin."""
    root = bpy.data.objects.new(name, None)
    bpy.context.scene.collection.objects.link(root)
    root["role"] = "anim"
    body = [block(f"{name}_body", 1.0, 2.2, 1.0, C("#2f5fb4"), bevel=0.35, seg=3, at=(0, 0, 0), flat=False)]
    body.append(block(f"{name}_glass", 0.9, 0.7, 0.6, C("#1e2838"), bevel=0.25, seg=2, at=(0, -0.85, 0.25), flat=False))
    body.append(beam(f"{name}_boom", (0, 0.9, 0.55), (0, 3.2, 0.75), 0.18, C("#2f5fb4")))
    body.append(block(f"{name}_fin", 0.08, 0.6, 0.7, C("#f2f2f4"), bevel=0.02, at=(0, 3.1, 0.55)))
    for s in (-1, 1):
        body.append(beam(f"{name}_skid{s}", (s * 0.55, -0.9, -0.15), (s * 0.55, 0.8, -0.15), 0.06, C("#3a3e48")))
    body.append(glow(mesh_obj(bm_ico(1.0, 1), f"{name}_beacon"), C("#ff3030")))
    body[-1].data.transform(Matrix.Diagonal((0.08, 0.08, 0.06, 1)))
    body[-1].data.transform(Matrix.Translation((0, 0.2, 1.05)))
    core = join(body, f"{name}_core")
    core.parent = root
    core["role"] = "part"
    rotor = join([block(f"{name}_blade{k}", 4.4, 0.18, 0.04, C("#2a2a30"), bevel=0.01, at=(0, 0, 1.15), rot=k * math.pi / 2) for k in range(2)] + [cylinder(f"{name}_hub", 0.12, 0.12, 0.2, C("#2a2a30"), segs=8, bevel=0, at=(0, 0, 1.0))], f"{name}_rotor")
    rotor.parent = root
    rotor["role"] = "part"
    return [root, core, rotor]


def road_markings(name="markings", r_in=7.6, r_out=10.6):
    """Thin painted lines as geometry: solid edge lines and a dashed centre."""
    parts = []

    def annulus(nm, r, w, col, a0=0.0, a1=math.tau, segs=160):
        bm = bmesh.new()
        n = max(2, int(segs * (a1 - a0) / math.tau))
        inner, outer = [], []
        for k in range(n + 1):
            a = a0 + (a1 - a0) * k / n
            inner.append(bm.verts.new((math.cos(a) * (r - w / 2), math.sin(a) * (r - w / 2), 0.012)))
            outer.append(bm.verts.new((math.cos(a) * (r + w / 2), math.sin(a) * (r + w / 2), 0.012)))
        for k in range(n):
            bm.faces.new((inner[k], inner[k + 1], outer[k + 1], outer[k]))
        ob = mesh_obj(bm, nm, smooth=False)
        paint_solid(ob, col)
        return ob

    parts.append(annulus(f"{name}_in", r_in + 0.25, 0.12, C("#d8dade")))
    parts.append(annulus(f"{name}_out", r_out - 0.25, 0.12, C("#d8dade")))
    mid = (r_in + r_out) / 2
    n = 44
    for k in range(n):
        a0 = k / n * math.tau
        parts.append(annulus(f"{name}_d{k}", mid, 0.1, PAINT_Y, a0, a0 + math.tau / n * 0.5, segs=160))
    return join(parts, name)


def plaza_tiles(name="plaza", radius=6.4, size=2.3, seed=3):
    """Fitted square concrete slabs (crisp joints) inside a radius."""
    rnd = random.Random(seed)
    parts = []
    tones = [C("#3e4048"), C("#464850"), C("#3a3c44"), C("#4c4e56")]
    n = int(radius / size) + 1
    for i in range(-n, n + 1):
        for j in range(-n, n + 1):
            x, y = i * size, j * size
            if math.hypot(abs(x) + size / 2, abs(y) + size / 2) > radius + 0.4 or math.hypot(x, y) < 2.6:
                continue
            t = tones[rnd.randrange(len(tones))]
            parts.append(block(f"{name}_{i}_{j}", size - 0.08, size - 0.08, 0.05, t, bevel=0.015, at=(x, y, -0.01)))
    return join(parts, name)
