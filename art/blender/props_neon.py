"""Era V props: a rain-slick arcade district under a neon sky. Wet dark
paving, warm paper lanterns and street food against cool cyan and magenta
signage, a maglev line and megatowers threaded with skybridges."""
from __future__ import annotations

import math
import random

import bmesh
import bpy
from mathutils import Matrix, Vector

from kit import C, add_bevel, apply_mods, bm_ico, join, mesh_obj, mix, mul, paint, paint_faces, paint_solid, sweep, vtx_material
from hard import beam, block, cylinder, glow_mat, metal_mat
from props_stone import _outline, _prism

SLATE = C("#262634")
SLATE_L = C("#34344a")
CHROME = C("#b8c0d0")
CYAN = C("#3af0ff")
MAGENTA = C("#ff3ad0")
AMBER = C("#ffb03a")
LANTERN = C("#ff7a3a")
GLASS = C("#141a2a")


def metal(ob):
    ob.data.materials.clear()
    ob.data.materials.append(metal_mat())
    return ob


def glow(ob, col=None):
    ob.data.materials.clear()
    ob.data.materials.append(glow_mat())
    if col is not None:
        paint_solid(ob, col)
    return ob


def gloss(ob):
    ob.data.materials.clear()
    ob.data.materials.append(vtx_material("Gloss", rough=0.16))
    return ob


def ball(name, r, at, col=None, subdiv=1, squash=(1, 1, 1)):
    ob = mesh_obj(bm_ico(1.0, subdiv), name)
    ob.data.transform(Matrix.Diagonal((r * squash[0], r * squash[1], r * squash[2], 1)))
    ob.data.transform(Matrix.Translation(at))
    if col is not None:
        paint_solid(ob, col)
    return ob


# ───────────────────────────────────────────── the stage
def dais(name="hoverpad"):
    """An octagonal hover-pad: dark wet deck, a glowing cyan ring inset,
    magenta chevrons round the rim and emitter studs at the corners."""
    parts = []
    bm = bmesh.new()
    _prism(bm, [(math.cos(a / 8 * math.tau + math.pi / 8) * 2.45, math.sin(a / 8 * math.tau + math.pi / 8) * 2.45) for a in range(8)], -0.12, 0.16)
    base = mesh_obj(bm, f"{name}_base", smooth=False)
    add_bevel(base, 0.06, 2, 40, harden=False)
    apply_mods(base)
    paint_faces(base, lambda c, n, i: SLATE_L if n.z > 0.7 else SLATE)
    parts.append(base)
    deck = cylinder(f"{name}_deck", 2.0, 2.0, 0.03, C("#1a1a26"), segs=40, bevel=0, at=(0, 0, 0.16))
    parts.append(gloss(deck))
    ring = [(math.cos(a / 64 * math.tau) * 1.8, math.sin(a / 64 * math.tau) * 1.8, 0.2) for a in range(65)]
    parts.append(glow(sweep(f"{name}_ring", ring, 0.045, around=6), CYAN))
    inner = [(math.cos(a / 48 * math.tau) * 1.1, math.sin(a / 48 * math.tau) * 1.1, 0.195) for a in range(49)]
    parts.append(glow(sweep(f"{name}_inner", inner, 0.025, around=6), mix(CYAN, C("#ffffff"), 0.3)))
    for k in range(8):
        a = k / 8 * math.tau
        r = 2.47
        chev = block(f"{name}_chev{k}", 0.55, 0.04, 0.07, MAGENTA, bevel=0, at=(0, -r, 0.01), rot=0)
        chev.data.transform(Matrix.Rotation(a, 4, "Z"))
        parts.append(glow(chev, MAGENTA))
        stud = ball(f"{name}_stud{k}", 0.07, (math.cos(a + math.pi / 8) * 2.3, math.sin(a + math.pi / 8) * 2.3, 0.18), squash=(1, 1, 0.6))
        parts.append(glow(stud, C("#ffffff") if k % 2 else CYAN))
    ob = join(parts, name)
    ob["col"] = 2.4
    ob["walk"] = 1
    return ob


def hex_plaza(name="hexplaza", radius=7.5, size=0.62, seed=4):
    """Wet hexagonal paving, glossy and dark, a few tiles lit from beneath."""
    rnd = random.Random(seed)
    parts, lit = [], []
    dx = size * math.sqrt(3)
    n = int(radius / dx) + 2
    tones = [C("#22222e"), C("#2a2a38"), C("#1e1e2a"), C("#2e2e3e")]
    for j in range(-n * 2, n * 2 + 1):
        for i in range(-n, n + 1):
            x = i * dx + (j % 2) * dx / 2
            y = j * size * 1.5
            r = math.hypot(x, y)
            if r > radius - 0.3 or r < 2.55:
                continue
            on = rnd.random() < 0.06
            col = mix(CYAN, MAGENTA, rnd.random()) if on else tones[rnd.randrange(4)]
            t = cylinder(f"{name}_{i}_{j}", size * 0.93, size * 0.93, 0.05, col, segs=6, bevel=0.012, at=(x, y, -0.01), flat=True)
            t.data.transform(Matrix.Translation((-x, -y, 0)))
            t.data.transform(Matrix.Rotation(math.pi / 6, 4, "Z"))
            t.data.transform(Matrix.Translation((x, y, 0)))
            if on:
                paint_solid(t, mul(col, 0.55))
                lit.append(glow(t))
            else:
                parts.append(gloss(t))
    return join(parts + lit, name)


def light_channels(name="channels", r0=2.6, r1=7.4, n=8):
    """Glowing channels in the paving radiating from the pad."""
    parts = []
    for k in range(n):
        a = (k + 0.5) / n * math.tau
        col = CYAN if k % 2 else MAGENTA
        strip = block(f"{name}_{k}", 0.07, r1 - r0, 0.02, col, bevel=0, at=(0, -(r0 + r1) / 2, 0.03))
        strip.data.transform(Matrix.Rotation(a, 4, "Z"))
        parts.append(glow(strip, col))
    return join(parts, name)


# ───────────────────────────────────────────── the street
def noodle_stall(name="noodles"):
    """A street-food counter: red lanterns, a cloth noren, a steaming pot,
    three stools and a glowing sign."""
    W = 2.6
    parts = [block(f"{name}_counter", W, 0.7, 0.95, C("#5a3426"), bevel=0.05)]
    parts.append(block(f"{name}_top", W + 0.1, 0.8, 0.06, C("#8a5a3a"), bevel=0.02, at=(0, 0, 0.95)))
    parts.append(block(f"{name}_back", W, 0.5, 2.2, C("#3a2a2a"), bevel=0.05, at=(0, 0.75, 0)))
    for s in (-1, 1):
        parts.append(metal(cylinder(f"{name}_post{s}", 0.05, 0.05, 2.4, C("#4a4a56"), segs=8, bevel=0, at=(s * (W / 2 - 0.05), -0.35, 0))))
    parts.append(block(f"{name}_roof", W + 0.5, 1.6, 0.1, C("#2a2a36"), bevel=0.03, at=(0, 0.2, 2.4)))
    # Noren: split cloth panels hanging from the front edge.
    for k in range(5):
        x = -W / 2 + (k + 0.5) * W / 5
        cloth = block(f"{name}_noren{k}", W / 5 - 0.05, 0.03, 0.5, C("#d8d0c0") if k % 2 else C("#2e4a8a"), bevel=0, at=(x, -0.42, 1.88))
        parts.append(cloth)
    pot = cylinder(f"{name}_pot", 0.28, 0.25, 0.3, C("#6a6a72"), segs=12, bevel=0.02, at=(0.6, 0.1, 1.0))
    parts.append(metal(pot))
    parts.append(cylinder(f"{name}_broth", 0.25, 0.25, 0.02, C("#d8a050"), segs=12, bevel=0, at=(0.6, 0.1, 1.28)))
    for k in range(3):
        x = -0.85 + k * 0.85
        parts.append(metal(cylinder(f"{name}_stoolleg{k}", 0.04, 0.05, 0.55, C("#4a4a56"), segs=6, bevel=0, at=(x, -0.85, 0))))
        parts.append(cylinder(f"{name}_stool{k}", 0.2, 0.2, 0.08, C("#c83a2a"), segs=12, bevel=0.02, at=(x, -0.85, 0.55)))
    lit = []
    for k in range(4):
        x = -W / 2 + 0.25 + k * (W - 0.5) / 3
        lit.append(glow(ball(f"{name}_lantern{k}", 0.16, (x, -0.55, 2.15), subdiv=2, squash=(1, 1, 1.25)), LANTERN))
        parts.append(block(f"{name}_lcap{k}", 0.12, 0.12, 0.05, C("#2a2a2a"), bevel=0, at=(x, -0.55, 2.33)))
    sign = block(f"{name}_sign", 1.6, 0.1, 0.45, mix(MAGENTA, C("#ffffff"), 0.15), bevel=0.03, at=(0, -0.5, 2.5))
    lit.append(glow(sign))
    parts.append(block(f"{name}_signframe", 1.7, 0.08, 0.55, C("#1a1a22"), bevel=0.02, at=(0, -0.44, 2.45)))
    ob = join(parts + lit, name)
    ob["col"] = 1.4
    return ob


def arcade_cabinet(name, col, screen, seed=0):
    parts = [block(f"{name}_body", 0.75, 0.7, 1.75, col, bevel=0.05, seed=seed)]
    parts.append(block(f"{name}_panel", 0.75, 0.35, 0.12, mul(col, 0.7), bevel=0.03, at=(0, -0.45, 0.95), rot=0))
    for k, c in enumerate((C("#ff3030"), C("#30a0ff"), C("#ffd030"))):
        parts.append(glow(ball(f"{name}_btn{k}", 0.04, (-0.15 + k * 0.12, -0.5, 1.08)), c))
    scr = block(f"{name}_screen", 0.58, 0.04, 0.5, screen, bevel=0, at=(0, -0.36, 1.12))
    marquee = block(f"{name}_marq", 0.7, 0.05, 0.2, mix(screen, C("#ffffff"), 0.4), bevel=0, at=(0, -0.36, 1.68))
    ob = join(parts + [glow(scr), glow(marquee)], name)
    ob["col"] = 0.5
    return ob


def bio_planter(name="bioplanter", seed=2):
    """A planter of luminous alien flora: dark leaves, glowing bulbs."""
    rnd = random.Random(seed)
    parts = [cylinder(f"{name}_pot", 0.7, 0.62, 0.5, C("#2a2a38"), segs=8, bevel=0.03, flat=True)]
    parts.append(glow(cylinder(f"{name}_rim", 0.72, 0.72, 0.04, CYAN, segs=8, bevel=0, at=(0, 0, 0.5), flat=True), CYAN))
    lit = []
    for k in range(7):
        a = rnd.random() * math.tau
        d = rnd.random() * 0.4
        h = 0.6 + rnd.random() * 1.1
        x, y = math.cos(a) * d, math.sin(a) * d
        lean = (math.cos(a) * 0.25, math.sin(a) * 0.25)
        stalk = sweep(f"{name}_stalk{k}", [(x, y, 0.45), (x + lean[0] * 0.5, y + lean[1] * 0.5, 0.45 + h * 0.6), (x + lean[0], y + lean[1], 0.45 + h)], [0.045, 0.035, 0.02], around=6)
        paint_solid(stalk, C("#1e3a3a"))
        parts.append(stalk)
        bulb_col = mix(CYAN, C("#a05aff"), rnd.random())
        lit.append(glow(ball(f"{name}_bulb{k}", 0.09 + rnd.random() * 0.06, (x + lean[0], y + lean[1], 0.47 + h), subdiv=2, squash=(1, 1, 1.3)), bulb_col))
        for j in range(2):
            b = rnd.random() * math.tau
            leaf = ball(f"{name}_leaf{k}{j}", 0.18, (x + math.cos(b) * 0.18, y + math.sin(b) * 0.18, 0.55 + rnd.random() * 0.3), subdiv=1, squash=(1.3, 0.5, 0.25))
            leaf.data.transform(Matrix.Translation((-x, -y, 0)))
            leaf.data.transform(Matrix.Rotation(b, 4, "Z"))
            leaf.data.transform(Matrix.Translation((x, y, 0)))
            paint(leaf, lambda co, n, *_: mix(C("#14302e"), C("#2a6a5a"), max(0, n.z)))
            parts.append(leaf)
    ob = join(parts + lit, name)
    ob["col"] = 0.75
    ob["sway"] = 0.35
    return ob


def bollard(name="bollard"):
    parts = [metal(cylinder(f"{name}_post", 0.1, 0.12, 0.75, C("#3a3a48"), segs=10, bevel=0.02))]
    parts.append(glow(cylinder(f"{name}_cap", 0.1, 0.1, 0.1, CYAN, segs=10, bevel=0, at=(0, 0, 0.75)), CYAN))
    ob = join(parts, name)
    ob["col"] = 0.2
    return ob


def holo_kiosk(name="holokiosk", col=None):
    """A pedestal projecting a floating hologram: a glowing cone of light
    and a slowly turning emblem above it."""
    col = col or CYAN
    parts = [cylinder(f"{name}_base", 0.55, 0.65, 0.5, C("#2a2a38"), segs=12, bevel=0.03)]
    parts.append(metal(cylinder(f"{name}_lens", 0.3, 0.35, 0.1, CHROME, segs=12, bevel=0.02, at=(0, 0, 0.5))))
    lit = [glow(cylinder(f"{name}_emit", 0.22, 0.22, 0.03, col, segs=12, bevel=0, at=(0, 0, 0.6)), col)]
    ob = join(parts + lit, name)
    ob["col"] = 0.6
    return ob


def hover_bike(name, col):
    parts = []
    body = ball(f"{name}_body", 0.5, (0, 0, 0.55), subdiv=2, squash=(0.45, 1.35, 0.4))
    paint(body, lambda co, n, *_: mix(mul(col, 0.6), col, 0.5 + 0.5 * n.z))
    parts.append(metal(body))
    parts.append(block(f"{name}_seat", 0.3, 0.55, 0.1, C("#1a1a22"), bevel=0.04, at=(0, 0.15, 0.72)))
    parts.append(gloss(ball(f"{name}_screen", 0.22, (0, -0.42, 0.78), subdiv=1, squash=(1, 0.5, 0.6))))
    lit = []
    for y in (-0.45, 0.45):
        lit.append(glow(cylinder(f"{name}_pad{int(y*10)}", 0.2, 0.2, 0.04, CYAN, segs=12, bevel=0, at=(0, y, 0.22)), CYAN))
    lit.append(glow(block(f"{name}_tail", 0.25, 0.04, 0.06, C("#ff2a4a"), bevel=0, at=(0, 0.68, 0.6)), C("#ff2a4a")))
    ob = join(parts + lit, name)
    ob["col"] = 0.6
    return ob


def scrap_pile(name="scrap"):
    """The gorillas' quarry here: a heap of junked robots and crates."""
    from rocks import boulder
    rnd = random.Random(9)
    pal = dict(rock=C("#6a6c78"), rock_dark=C("#3a3c46"))
    parts = []
    for k in range(5):
        a = k / 5 * math.tau + 0.3
        b = boulder(f"{name}_chunk{k}", 30 + k, size=0.38 + rnd.random() * 0.2, squash=0.7, moss=False, facets=8, pal=pal)
        b.data.transform(Matrix.Translation((math.cos(a) * 0.45, math.sin(a) * 0.45, 0)))
        parts.append(metal(b))
    parts.append(block(f"{name}_crate", 0.55, 0.55, 0.5, C("#3a5a7a"), bevel=0.04, at=(0.1, 0.05, 0.25), rot=0.4))
    parts.append(block(f"{name}_crate2", 0.4, 0.4, 0.36, C("#8a3a5a"), bevel=0.04, at=(-0.35, -0.2, 0.0), rot=1.1))
    head = ball(f"{name}_bothead", 0.24, (0.35, -0.35, 0.55), subdiv=2, squash=(1, 0.9, 0.85))
    paint_solid(head, C("#c8ccd4"))
    parts.append(metal(head))
    parts.append(glow(ball(f"{name}_boteye", 0.06, (0.35, -0.56, 0.58), subdiv=1), C("#ff3a3a")))
    ob = join(parts, name)
    ob["col"] = 0.9
    return ob


# ───────────────────────────────────────────── the skyline
def arcade_front(name, w=7.0, d=5.0, floors=3, body=None, accent=None, seed=0):
    """A low shopfront block: lit shop windows under shutters and awnings,
    ribbon windows above, a big neon sign on the parapet."""
    rnd = random.Random(seed)
    body = body or C("#2e2a3a")
    accent = accent or MAGENTA
    fh = 1.5
    h = 2.4 + (floors - 1) * fh
    parts = [block(f"{name}_core", w, d, h, body, bevel=0.06, seed=seed)]
    parts.append(block(f"{name}_roof", w - 0.3, d - 0.3, 0.04, C("#1e1e28"), bevel=0, at=(0, 0, h)))
    lit = []
    for side in range(4):
        sw = w if side % 2 == 0 else d
        depth = (d if side % 2 == 0 else w) / 2
        rot = Matrix.Rotation(side * math.pi / 2, 4, "Z")

        def face(ob, u, z):
            ob.data.transform(Matrix.Translation((u, -depth, z)))
            ob.data.transform(rot)
            return ob
        bays = max(1, int(sw / 2.4))
        for b in range(bays):
            u = -sw / 2 + (b + 0.5) * sw / bays
            shop_col = rnd.choice((AMBER, mix(CYAN, C("#ffffff"), 0.3), mix(MAGENTA, C("#ffffff"), 0.3), C("#fff0d0")))
            lit.append(glow(face(block(f"{name}_shop{side}_{b}", sw / bays * 0.8, 0.06, 1.5, mul(shop_col, 0.8), bevel=0), u, 0.15)))
            parts.append(face(block(f"{name}_aw{side}_{b}", sw / bays * 0.84, 0.55, 0.08, rnd.choice((C("#3a2a4a"), C("#2a3a4a"), C("#4a2a2a"))), bevel=0.02), u, 1.8))
        for f in range(1, floors):
            z = 2.4 + (f - 1) * fh + 0.35
            ribbon = block(f"{name}_rib{side}_{f}", sw * 0.88, 0.05, 0.7, GLASS, bevel=0)
            face(ribbon, 0, z)
            if rnd.random() < 0.5:
                paint_solid(ribbon, mul(mix(CYAN, C("#ffffff"), 0.5), 0.55 + rnd.random() * 0.3))
                lit.append(glow(ribbon))
            else:
                parts.append(gloss(ribbon))
        # A vertical blade sign jutting from the facade: glyph blocks on a dark slab.
        if side == 0 or rnd.random() < 0.4:
            bu = rnd.choice((-1, 1)) * (sw / 2 - 0.6)
            bz = 2.3
            bh = min(h - 2.6, 3.2)
            blade = block(f"{name}_blade{side}", 0.14, 0.8, bh, C("#14141c"), bevel=0.03, at=(0, -0.45, 0))
            parts.append(face(blade, bu, bz))
            gcol = rnd.choice((CYAN, MAGENTA, AMBER, C("#7aff6a")))
            n = max(2, int(bh / 0.62))
            for g in range(n):
                glyph = block(f"{name}_glyph{side}_{g}", 0.18, 0.5, 0.42, gcol, bevel=0, at=(0, -0.5, 0))
                lit.append(glow(face(glyph, bu, bz + 0.12 + g * bh / n), mix(gcol, C("#ffffff"), 0.1 * (g % 2))))
        # Neon edge strip up one corner of each face.
        lit.append(glow(face(block(f"{name}_edge{side}", 0.08, 0.08, h - 2.2, accent, bevel=0), -sw / 2 + 0.04, 2.2), accent))
    sx = rnd.uniform(-w * 0.1, w * 0.1)
    sign = block(f"{name}_sign", w * 0.6, 0.12, 1.2, accent, bevel=0.04, at=(sx, -d / 2 + 0.4, h + 0.15))
    lit.append(glow(sign, mix(accent, C("#ffffff"), 0.12)))
    parts.append(block(f"{name}_signback", w * 0.64, 0.1, 1.3, C("#14141c"), bevel=0.02, at=(sx, -d / 2 + 0.5, h + 0.1)))
    ob = join(parts + lit, name)
    ob["col"] = max(w, d) * 0.55
    return ob


def holo_board(name, bw, bh, at, rnd):
    """A billboard as glowing geometry: two-tone bands and, half the time,
    an ad for the star itself (a yellow face with two eyes)."""
    base = rnd.choice((MAGENTA, AMBER, CYAN, C("#7a5aff")))
    x, y, z = at
    out = []
    n = 6
    for k in range(n):
        col = mul(base, 0.5) if k % 2 else mix(base, C("#ffffff"), 0.15)
        out.append(glow(block(f"{name}_b{k}", bw, 0.1, bh / n, col, bevel=0, at=(x, y, z + k * bh / n)), col))
    if rnd.random() < 0.5:
        r = bh * 0.32
        face = cylinder(f"{name}_face", r, r, 0.06, C("#ffd23f"), segs=20, bevel=0, axis="Y", at=(x, y - 0.08, z + bh / 2))
        out.append(glow(face, C("#ffd23f")))
        for s in (-1, 1):
            eye = cylinder(f"{name}_eye{s}", r * 0.22, r * 0.22, 0.04, C("#1a1a22"), segs=10, bevel=0, axis="Y", at=(x + s * r * 0.35, y - 0.13, z + bh / 2 + r * 0.15))
            out.append(eye)
    return out


def megatower(name, w=6.0, d=6.0, h=40.0, body=None, accent=None, seed=0, tiers=3, billboard=True):
    """A slender stepped tower: ribbon windows, neon corner strips, an
    optional holo billboard and a crown with a halo ring and beacon."""
    rnd = random.Random(seed)
    body = body or C("#22283a")
    accent = accent or CYAN
    parts, lit = [], []
    z0 = 0.0
    tw, td = w, d
    for t in range(tiers):
        th = h * (0.5 if t == 0 else 0.5 / (tiers - 1))
        parts.append(block(f"{name}_t{t}", tw, td, th, body, bevel=0.08, seed=seed + t))
        # Ribbon windows every 1.8 m.
        z = z0 + 0.6
        while z < z0 + th - 0.6:
            for side in range(4):
                sw = tw if side % 2 == 0 else td
                depth = (td if side % 2 == 0 else tw) / 2
                rib = block(f"{name}_r{t}_{int(z*10)}_{side}", sw * 0.86, 0.05, 0.75, GLASS, bevel=0)
                rib.data.transform(Matrix.Translation((0, -depth, z)))
                rib.data.transform(Matrix.Rotation(side * math.pi / 2, 4, "Z"))
                if rnd.random() < 0.42:
                    paint_solid(rib, mul(mix(rnd.choice((CYAN, C("#ffffff"), AMBER)), C("#ffffff"), 0.4), 0.45 + rnd.random() * 0.35))
                    lit.append(glow(rib))
                else:
                    parts.append(gloss(rib))
            z += 1.8
        for cx in (-1, 1):
            for cy in (-1, 1):
                lit.append(glow(block(f"{name}_e{t}{cx}{cy}", 0.1, 0.1, th, accent, bevel=0, at=(cx * tw / 2, cy * td / 2, z0)), accent))
        parts.append(block(f"{name}_ledge{t}", tw + 0.3, td + 0.3, 0.25, mix(body, C("#8a90a0"), 0.25), bevel=0.04, at=(0, 0, z0 + th)))
        z0 += th
        tw, td = tw * 0.78, td * 0.78
    if billboard:
        lit += holo_board(f"{name}_board", w * 0.8, min(h * 0.18, 6.0), (0, -d / 2 - 0.25, h * 0.28), rnd)
        parts.append(block(f"{name}_boardframe", w * 0.8 + 0.25, 0.1, min(h * 0.18, 6.0) + 0.25, C("#14141c"), bevel=0.03, at=(0, -d / 2 - 0.15, h * 0.28 - 0.12)))
    halo = [(math.cos(a / 32 * math.tau) * tw * 0.75, math.sin(a / 32 * math.tau) * td * 0.75, z0 + 1.2) for a in range(33)]
    lit.append(glow(sweep(f"{name}_halo", halo, 0.08, around=6), accent))
    parts.append(metal(cylinder(f"{name}_mast", 0.14, 0.05, 6.0, CHROME, segs=8, bevel=0, at=(0, 0, z0))))
    lit.append(glow(ball(f"{name}_beacon", 0.22, (0, 0, z0 + 6.1)), C("#ff3a5a")))
    ob = join(parts + lit, name)
    ob["col"] = max(w, d) * 0.55
    return ob


def skybridge(name, length, col=None):
    """A glazed tube between towers, lit along its belly."""
    col = col or C("#2a3048")
    parts = [block(f"{name}_tube", length, 1.6, 1.4, col, bevel=0.3, seg=2, flat=False)]
    rib = block(f"{name}_glass", length * 0.96, 1.64, 0.6, mix(CYAN, C("#ffffff"), 0.4), bevel=0, at=(0, 0, 0.45))
    belly = block(f"{name}_belly", length * 0.96, 0.12, 0.06, MAGENTA, bevel=0, at=(0, 0, -0.02))
    return join(parts + [glow(rib, mul(mix(CYAN, C("#ffffff"), 0.4), 0.6)), glow(belly, MAGENTA)], name)


def maglev_pylon(name="pylon", h=4.0):
    parts = [block(f"{name}_foot", 1.0, 1.0, 0.3, C("#3a3a48"), bevel=0.05)]
    parts.append(block(f"{name}_col", 0.55, 0.7, h - 0.4, C("#4a4a5a"), bevel=0.08, at=(0, 0, 0.3)))
    parts.append(block(f"{name}_cap", 1.6, 1.1, 0.35, C("#4a4a5a"), bevel=0.06, at=(0, 0, h - 0.35)))
    parts.append(glow(block(f"{name}_strip", 0.08, 0.72, h - 1.0, CYAN, bevel=0, at=(0.28, 0, 0.5)), CYAN))
    ob = join(parts, name)
    ob["col"] = 0.6
    return ob


def maglev_track(name="track", length=80.0, h=4.0):
    parts = [block(f"{name}_beam", length, 1.4, 0.45, C("#3a3a4a"), bevel=0.06, at=(0, 0, h))]
    lit = []
    for s in (-1, 1):
        lit.append(glow(block(f"{name}_rail{s}", length, 0.06, 0.05, CYAN if s < 0 else MAGENTA, bevel=0, at=(0, s * 0.5, h + 0.45)), CYAN if s < 0 else MAGENTA))
        lit.append(glow(block(f"{name}_side{s}", length, 0.04, 0.06, mul(CYAN, 0.8), bevel=0, at=(0, s * 0.72, h + 0.15)), mul(CYAN, 0.8)))
    return join(parts + lit, name)


def maglev_train(name="maglev", cars=3):
    """A sleek three-car maglev with lit window bands (an `anim` node)."""
    root = bpy.data.objects.new(name, None)
    bpy.context.scene.collection.objects.link(root)
    root["role"] = "anim"
    parts, lit = [], []
    L = 4.6
    for c in range(cars):
        x = (c - (cars - 1) / 2) * (L + 0.25)
        shell = block(f"{name}_car{c}", L, 1.25, 1.15, C("#e8eaf0"), bevel=0.4, seg=3, flat=False, at=(x, 0, 0))
        paint(shell, lambda co, n, *_: mix(C("#9aa0b0"), C("#f2f4f8"), 0.5 + 0.5 * n.z))
        parts.append(metal(shell))
        parts.append(block(f"{name}_skirt{c}", L * 0.94, 1.3, 0.2, C("#2a2a36"), bevel=0.05, at=(x, 0, 0.0)))
        lit.append(glow(block(f"{name}_win{c}", L * 0.84, 1.28, 0.32, mix(CYAN, C("#ffffff"), 0.55), bevel=0.02, at=(x, 0, 0.55)), mix(CYAN, C("#ffffff"), 0.55)))
        lit.append(glow(block(f"{name}_stripe{c}", L * 0.94, 1.31, 0.06, MAGENTA, bevel=0, at=(x, 0, 0.3)), MAGENTA))
    for s in (-1, 1):
        nose = ball(f"{name}_nose{s}", 0.62, (s * (cars / 2 * (L + 0.25) - 0.1), 0, 0.55), subdiv=2, squash=(1.5, 1.0, 0.92))
        paint(nose, lambda co, n, *_: mix(C("#9aa0b0"), C("#f2f4f8"), 0.5 + 0.5 * n.z))
        parts.append(metal(nose))
        lit.append(glow(ball(f"{name}_light{s}", 0.12, (s * (cars / 2 * (L + 0.25) + 0.75), 0, 0.5), subdiv=1), C("#ffffff") if s > 0 else C("#ff2a4a")))
    body = join(parts + lit, f"{name}_body")
    body.parent = root
    body["role"] = "part"
    return [root, body]


def hover_car(name, col):
    """A flying car: a rounded pod with glowing thrusters (an `anim` node)."""
    root = bpy.data.objects.new(name, None)
    bpy.context.scene.collection.objects.link(root)
    root["role"] = "anim"
    shell = ball(f"{name}_shell", 1.0, (0, 0, 0), subdiv=3, squash=(1.25, 0.65, 0.42))
    paint(shell, lambda co, n, *_: mix(mul(col, 0.55), col, 0.5 + 0.5 * n.z))
    parts = [metal(shell)]
    parts.append(gloss(ball(f"{name}_glass", 0.6, (-0.15, 0, 0.25), subdiv=2, squash=(1.1, 0.95, 0.6))))
    lit = []
    for s in (-1, 1):
        lit.append(glow(cylinder(f"{name}_thr{s}", 0.18, 0.18, 0.05, CYAN, segs=10, bevel=0, at=(0.2, s * 0.5, -0.42)), CYAN))
        lit.append(glow(ball(f"{name}_tail{s}", 0.07, (1.22, s * 0.35, 0.05)), C("#ff2a4a")))
        lit.append(glow(ball(f"{name}_head{s}", 0.07, (-1.22, s * 0.35, 0.0)), C("#fff4d0")))
    body = join(parts + lit, f"{name}_body")
    body.parent = root
    body["role"] = "part"
    return [root, body]


def festoon(name, p0, p1, sag=0.8, bulbs=9, colors=None):
    """A string of party lights hung between two points (Blender coords)."""
    colors = colors or [LANTERN, AMBER, MAGENTA, CYAN]
    p0, p1 = Vector(p0), Vector(p1)
    pts = []
    for k in range(17):
        t = k / 16
        p = p0.lerp(p1, t)
        p.z -= sag * 4 * t * (1 - t)
        pts.append(tuple(p))
    wire = sweep(f"{name}_wire", pts, 0.015, around=4)
    paint_solid(wire, C("#1a1a22"))
    lit = []
    for k in range(bulbs):
        t = (k + 0.5) / bulbs
        p = p0.lerp(p1, t)
        p.z -= sag * 4 * t * (1 - t) + 0.1
        lit.append(glow(ball(f"{name}_b{k}", 0.07, tuple(p), subdiv=1, squash=(1, 1, 1.25)), colors[k % len(colors)]))
    return join([wire] + lit, name)


def light_pole(name="lightpole", h=5.2):
    parts = [metal(cylinder(f"{name}_pole", 0.08, 0.06, h, C("#3a3a48"), segs=8, bevel=0.01))]
    parts.append(block(f"{name}_base", 0.3, 0.3, 0.35, C("#2a2a36"), bevel=0.03))
    parts.append(glow(ball(f"{name}_top", 0.12, (0, 0, h + 0.05)), CYAN))
    ob = join(parts, name)
    ob["col"] = 0.2
    return ob
