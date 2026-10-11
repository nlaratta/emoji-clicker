"""Era I: The Stone Age of Poking — a golden-hour meadow camp below sandstone
mesas, with a quarry for the gorillas and a smoking volcano on the horizon.

    Blender -b --factory-startup -P era0.py -- <out.glb> [preview.png]
"""
import math
import os
import random
import sys

sys.path.insert(0, os.path.dirname(__file__))
import bpy  # noqa: E402
from mathutils import Vector, noise  # noqa: E402

from kit import C, argv, bake_ao, collection, export_glb, mix, move_to, mul, preview, reset, vtx_material  # noqa: E402
from flora import broadleaf, bush, conifer, fern_clump, flower_patch, mushrooms, tree_fern  # noqa: E402
from rocks import boulder, mesa, pebble_cluster  # noqa: E402
from props_stone import banana_basket, campfire, dais, drying_rack, log, mammoth, rock_pile, standing_stone, tent, tusk_arch  # noqa: E402
from terrain import G, anchor, build_grassmap, build_terrain, smoothstep  # noqa: E402

reset()
args = argv()
OUT = args[0]
PREVIEW = args[1] if len(args) > 1 else None

# ───────────────────────────────────────────── palette (golden hour meadow)
MEADOW = [C("#6f8a3c"), C("#8ea24a"), C("#a9ad57"), C("#5a7232")]
DIRT = C("#a07a52")
DIRT_DARK = C("#7c5a3e")
ROCKY = C("#8d6f5c")
PAL_OAK = dict(leaf0=C("#2c4a2e"), leaf1=C("#6f9840"), leaf2=C("#d2c766"), bark0=C("#4b3326"), bark1=C("#7b5a43"), ground=C("#6b5a3a"))
PAL_OAK2 = dict(leaf0=C("#33452a"), leaf1=C("#86963c"), leaf2=C("#e3b85a"), bark0=C("#4b3326"), bark1=C("#7b5a43"))
PAL_FIR = dict(leaf0=C("#14302c"), leaf1=C("#2b5847"), leaf2=C("#86a560"))
PAL_FERN = dict(leaf0=C("#2a4a26"), leaf1=C("#5d8a36"), leaf2=C("#b6c35a"))
MESA_PAL = dict(bands=[C("#c9774f"), C("#dc9b68"), C("#b5604a"), C("#e6b17f"), C("#a65448")])

templates = collection("templates")
templates.hide_render = True
world = collection("world")

# Paths the minions have worn into the meadow (game x, z polylines).
PATHS = [
    [(0, 0), (-1.6, -1.4), (-3.0, -2.2), (-4.6, -3.3), (-6.0, -4.6)],
    [(0, 0), (1.8, -1.2), (3.4, -2.4), (4.6, -4.2), (5.2, -5.8)],
    [(-3.0, -2.2), (-2.6, -3.8), (-2.2, -6.0), (-1.4, -9.0)],
]


def seg_dist(px, pz, a, b):
    ax, az = a
    bx, bz = b
    dx, dz = bx - ax, bz - az
    t = max(0.0, min(1.0, ((px - ax) * dx + (pz - az) * dz) / (dx * dx + dz * dz)))
    return math.hypot(px - (ax + dx * t), pz - (az + dz * t))


def path_dist(x, z):
    return min(seg_dist(x, z, p[i], p[i + 1]) for p in PATHS for i in range(len(p) - 1))


def height(x, z):
    r = math.hypot(x, z)
    n = noise.noise(Vector((x * 0.07, z * 0.07, 0.3)))
    h = n * 0.55 * smoothstep(5, 14, r)
    h += noise.noise(Vector((x * 0.5, z * 0.5, 2.0))) * 0.05 * smoothstep(2.6, 4.5, r)
    back = smoothstep(9, 42, -z)
    h += back * (2.6 + 3.2 * (0.5 + 0.5 * noise.noise(Vector((x * 0.025, 0.0, 7.0)))))
    h += smoothstep(12, 36, abs(x)) * 2.2 * (1 - smoothstep(0, 20, z))
    h -= 0.04 * (1 - smoothstep(0.3, 0.9, path_dist(x, z))) * smoothstep(2.4, 3.0, r)
    return h


# Footprints of placed props, so grass doesn't grow through them.
FOOTPRINTS: list[tuple[float, float, float]] = []


def ground_color(x, z, y, slope):
    r = math.hypot(x, z)
    k = noise.noise(Vector((x * 0.16, z * 0.16, 1.0)))
    k2 = noise.noise(Vector((x * 0.6, z * 0.6, 4.0)))
    c = mix(MEADOW[0], MEADOW[1], 0.5 + k * 0.9)
    c = mix(c, MEADOW[2], max(0.0, k2 - 0.25) * 1.2)
    c = mix(c, MEADOW[3], max(0.0, -k2 - 0.35) * 1.4)
    # Trampled earth around the dais where the minions work.
    worn = 1 - smoothstep(2.5, 3.3 + k2 * 0.5, r)
    c = mix(c, mix(DIRT_DARK, DIRT, 0.6 + k2 * 0.4), worn * 0.92)
    pd = path_dist(x, z)
    c = mix(c, mix(DIRT, DIRT_DARK, 0.3 + k2 * 0.3), (1 - smoothstep(0.35, 0.85 + k * 0.2, pd)) * 0.9)
    c = mix(c, ROCKY, smoothstep(0.25, 0.55, slope))
    # Distant slopes: drier, warmer grass.
    c = mix(c, C("#b39b5c"), smoothstep(18, 60, r) * 0.45)
    for fx, fz, fr in FOOTPRINTS:
        d = math.hypot(x - fx, z - fz)
        if d < fr * 1.25:
            c = mix(c, DIRT_DARK, (1 - d / (fr * 1.25)) * 0.35)
    return c


def grass_density(x, z):
    r = math.hypot(x, z)
    if r < 2.6 or r > 30:
        return 0.0
    g = smoothstep(2.6, 3.8, r) * smoothstep(0.4, 1.0, path_dist(x, z)) * (1 - smoothstep(18, 30, r))
    g *= 0.55 + 0.45 * noise.noise(Vector((x * 0.25, z * 0.25, 9.0))) + 0.25
    for fx, fz, fr in FOOTPRINTS:
        if math.hypot(x - fx, z - fz) < fr:
            return 0.0
    return max(0.0, min(1.0, g))


# ───────────────────────────────────────────── templates
def tmpl(ob, sway=None):
    move_to(ob, templates)
    ob.location = (0, 0, 0)
    if sway is not None:
        ob["sway"] = sway
    return ob


T = {}
T["dais"] = tmpl(dais())
T["oak_a"] = tmpl(broadleaf("oak_a", 21, height=4.6, pal=PAL_OAK))
T["oak_b"] = tmpl(broadleaf("oak_b", 8, height=3.8, pal=PAL_OAK2))
T["oak_hero"] = tmpl(broadleaf("oak_hero", 34, height=5.6, spread=1.1, pal=PAL_OAK))
T["fir_a"] = tmpl(conifer("fir_a", 4, height=5.0, pal=PAL_FIR))
T["fir_b"] = tmpl(conifer("fir_b", 9, height=3.8, pal=PAL_FIR))
T["fern_a"] = tmpl(tree_fern("fern_a", 5, height=2.6, pal=PAL_FERN))
T["fern_b"] = tmpl(tree_fern("fern_b", 13, height=3.3, pal=PAL_FERN))
T["bush_a"] = tmpl(bush("bush_a", 2, 0.75, flowers=[C("#f6e7a1"), C("#ee8fa8")]))
T["bush_b"] = tmpl(bush("bush_b", 6, 1.0))
T["bush_c"] = tmpl(bush("bush_c", 11, 0.55, flowers=[C("#f3d36b")]))
T["rock_a"] = tmpl(boulder("rock_a", 10, size=1.0))
T["rock_b"] = tmpl(boulder("rock_b", 11, size=1.0, squash=0.55))
T["rock_c"] = tmpl(boulder("rock_c", 14, size=1.0, squash=0.85))
T["pebbles"] = tmpl(pebble_cluster("pebbles", 5))
T["mesa_a"] = tmpl(mesa("mesa_a", 3, radius=7, height=11, pal=MESA_PAL))
T["mesa_b"] = tmpl(mesa("mesa_b", 8, radius=10, height=15, pal=MESA_PAL, pillars=5))
T["mesa_c"] = tmpl(mesa("mesa_c", 15, radius=5, height=8, pal=MESA_PAL, pillars=3))
pit, embers = campfire()
T["fire_pit"] = tmpl(pit)
T["embers"] = tmpl(embers)
T["log_seat"] = tmpl(log("log_seat", length=1.25, r=0.15, seed=3))
T["tent"] = tmpl(tent())
T["rack"] = tmpl(drying_rack())
T["tusk_arch"] = tmpl(tusk_arch())
T["rock_pile"] = tmpl(rock_pile())
T["bananas"] = tmpl(banana_basket())
T["menhir_face"] = tmpl(standing_stone("menhir_face", 1, 2.3, face=True))
T["menhir"] = tmpl(standing_stone("menhir", 4, 1.9, face=False))
T["ferns"] = tmpl(fern_clump("ferns", 3, 0.75, pal=PAL_FERN))
T["ferns_b"] = tmpl(fern_clump("ferns_b", 8, 0.95, pal=PAL_FERN))
T["flowers_a"] = tmpl(flower_patch("flowers_a", 1, [C("#f6e7a1"), C("#ffffff"), C("#f3c64a")]))
T["flowers_b"] = tmpl(flower_patch("flowers_b", 2, [C("#e98ab0"), C("#c88ae8"), C("#ffffff")]))
T["shrooms"] = tmpl(mushrooms("shrooms", 5))


def volcano():
    """A broad, ash-streaked cone with a glowing crater lip."""
    import bmesh
    from kit import mesh_obj, paint_faces, shade_flat, displace, apply_mods, decimate_planar
    bm = bmesh.new()
    segs, rows = 30, 9
    vs = []
    for j in range(rows):
        t = j / (rows - 1)
        r = 26 * (1 - t) ** 1.25 + 3.2
        z = 24 * t
        vs.append([bm.verts.new((math.cos(i / segs * math.tau) * r, math.sin(i / segs * math.tau) * r, z)) for i in range(segs)])
    for j in range(rows - 1):
        for i in range(segs):
            k = (i + 1) % segs
            bm.faces.new((vs[j][i], vs[j][k], vs[j + 1][k], vs[j + 1][i]))
    crater = [bm.verts.new((math.cos(i / segs * math.tau) * 2.2, math.sin(i / segs * math.tau) * 2.2, 22.6)) for i in range(segs)]
    for i in range(segs):
        k = (i + 1) % segs
        bm.faces.new((vs[-1][i], vs[-1][k], crater[k], crater[i]))
    ob = mesh_obj(bm, "volcano", smooth=False)
    displace(ob, strength=1.1, scale=0.18, seed=4)
    shade_flat(ob)
    rnd = random.Random(2)

    def fn(c, n, i):
        u = c.z / 24
        col = mix(C("#5a3f45"), C("#8b6461"), 0.4 + 0.6 * max(0.0, n.z))
        col = mix(col, C("#3a2c34"), max(0.0, noise.noise(Vector((c.x * 0.12, c.y * 0.12, 0)))) * 0.8 * u)
        if u > 0.9 and n.z > 0.2:
            col = mix(col, C("#ff7a2e"), 0.85)
        return mul(col, 0.93 + rnd.random() * 0.1)

    paint_faces(ob, fn)
    return ob


T["volcano"] = tmpl(volcano())

for name, t in T.items():
    print(f'tris {name}: {sum(len(p.vertices) - 2 for p in t.data.polygons)}')
# Bake AO into each template on its own (with a ground plane under it).
for name, t in T.items():
    if name in ("embers",):
        continue
    templates.hide_render = False
    others = [o for o in templates.objects if o is not t]
    for o in others:
        o.hide_render = True
    bake_ao([t], samples=48, distance=1.2 if name.startswith(("mesa", "volcano")) else 0.7, strength=0.7)
    for o in others:
        o.hide_render = False
templates.hide_render = True
for o in templates.objects:
    o.hide_render = False

# ───────────────────────────────────────────── placement
placed = []


def put(key, x, z, yaw=0.0, scale=1.0, sink=0.0, foot=None, name=None, **props):
    t = T[key]
    ob = t.copy()  # linked duplicate: shares mesh data
    ob.name = name or f"{key}.{len(placed):03d}"
    world.objects.link(ob)
    ob.location = G(x, z, height(x, z) - sink)
    ob.rotation_euler = (0, 0, yaw)
    ob.scale = (scale, scale, scale)
    for k, v in t.items():
        ob[k] = v
    for k, v in props.items():
        ob[k] = v
    if foot:
        FOOTPRINTS.append((x, z, foot * scale))
    placed.append(ob)
    return ob


rnd = random.Random(1)
put("dais", 0, 0, yaw=0.3, name="pedestal", foot=2.4)

# Camp (left, behind the star).
put("fire_pit", -3.7, -2.5, foot=0.7, name="campfire")
put("embers", -3.7, -2.5, name="embers")
put("log_seat", -4.75, -1.65, yaw=0.9, foot=0.6)
put("log_seat", -3.0, -3.65, yaw=-0.35, foot=0.6)
put("log_seat", -4.9, -3.3, yaw=-1.6, scale=0.85, foot=0.5)
put("tent", -6.4, -4.9, yaw=-0.5, foot=1.3)
put("rack", -4.6, -6.1, yaw=0.35, foot=0.4)
put("tusk_arch", -5.9, -7.4, yaw=0.25, foot=0.4)
put("fern_a", -7.6, -2.7, yaw=1.0, foot=0.4)
put("bush_a", -5.9, -2.6, yaw=0.3, foot=0.6)
put("pebbles", -2.6, -2.2, yaw=0.2)

# Quarry (right, behind the star) — the gorillas' rock pile.
put("rock_pile", 3.95, -2.75, yaw=0.4, foot=1.0, name="rock_pile")
put("rock_a", 5.7, -4.4, yaw=1.1, scale=1.7, sink=0.25, foot=1.4)
put("rock_b", 6.9, -3.2, yaw=0.2, scale=1.25, sink=0.15, foot=1.1)
put("rock_c", 4.9, -5.6, yaw=2.2, scale=1.0, sink=0.1, foot=0.9)
put("pebbles", 3.0, -3.8, yaw=1.4, scale=1.3)
put("oak_hero", 7.4, -8.0, yaw=0.6, scale=1.08, foot=0.9, name="oak_hero")
put("bananas", 5.1, -6.4, yaw=0.3, foot=0.5, name="bananas")
put("fern_b", 7.6, -1.7, yaw=2.2, foot=0.4)

# Standing stones frame the star from behind; the left one bears its face.
put("menhir_face", -2.2, -4.6, yaw=0.15, sink=0.1, foot=0.6)
put("menhir", 2.5, -5.0, yaw=-0.3, sink=0.1, foot=0.5)

# Low foreground framing at the screen edges.
put("rock_b", -3.7, 2.4, yaw=0.5, scale=0.75, sink=0.1, foot=0.8)
put("bush_c", -3.0, 3.1, yaw=0.2, foot=0.5)
put("bush_a", 3.6, 2.6, yaw=1.6, scale=0.85, foot=0.6)
put("rock_c", 4.2, 1.6, yaw=2.6, scale=0.5, sink=0.05, foot=0.5)

# Two hero trees frame the camp and the quarry; firs cluster on the flanks.
# The centre stays open so the mesas and the volcano read behind the star.
put("oak_hero", -8.4, -7.2, yaw=1.9, foot=0.9, name="oak_hero_l")
for (k, x, z, s, yaw) in [
    ("fir_a", -11.5, -9.0, 1.1, 0.0), ("fir_b", -10.2, -11.6, 1.0, 0.6), ("fir_a", -14.2, -7.4, 0.95, 1.0),
    ("fir_b", -13.0, -12.8, 1.15, 0.3), ("oak_b", -10.6, -4.8, 0.85, 1.4), ("bush_b", -7.6, -5.2, 0.9, 0.4),
    ("fir_a", 12.4, -10.5, 1.15, 0.3), ("fir_b", 10.8, -13.0, 1.0, 0.0), ("fir_b", 14.6, -8.6, 0.9, 1.1),
    ("oak_b", 10.4, -6.2, 0.95, 2.0), ("bush_b", 8.6, -5.4, 0.9, 1.0), ("fern_a", 8.8, -3.6, 0.9, 0.6),
    ("bush_c", -1.6, -8.6, 1.0, 0.0), ("bush_c", 2.4, -9.6, 0.8, 1.0), ("rock_b", 0.8, -11.0, 0.8, 0.4),
]:
    put(k, x, z, yaw=yaw, scale=s, foot=0.8 * s)
# Far hillside forest on the flanks.
for i in range(34):
    a = math.pi * 1.04 + (i / 33) * math.pi * 0.92 + (rnd.random() - 0.5) * 0.08
    d = 20 + rnd.random() * 18
    x, z = math.cos(a) * d * 1.25, math.sin(a) * d
    if z > -10 or abs(x) < 13:
        continue
    put(rnd.choice(["fir_a", "fir_b", "fir_a", "oak_a"]), x, z, yaw=rnd.random() * 6, scale=1.1 + rnd.random() * 0.6)
# Ground cover in clusters: ferns at the feet of rocks and trees, flower
# drifts along the meadow, toadstools in the shade of the hero trees.
for (k, x, z, sc, yaw) in [
    ("ferns", -7.0, -6.2, 1.0, 0.2), ("ferns_b", -9.2, -7.9, 1.1, 1.0), ("shrooms", -8.0, -6.4, 1.0, 0.0),
    ("ferns", 6.4, -4.0, 0.9, 1.5), ("ferns_b", 8.0, -7.2, 1.0, 0.4), ("shrooms", 7.0, -7.1, 1.1, 2.0),
    ("ferns", 4.9, -1.1, 0.8, 0.9), ("ferns", -5.6, -1.4, 0.75, 2.1), ("ferns_b", -2.8, -5.2, 0.8, 0.6),
    ("flowers_a", -3.4, -8.2, 1.1, 0.0), ("flowers_b", 1.8, -6.2, 1.0, 0.4), ("flowers_a", 4.2, -9.8, 1.2, 1.0),
    ("flowers_b", -6.4, -10.5, 1.2, 0.3), ("flowers_a", 3.5, 3.2, 0.9, 2.0), ("flowers_b", -4.4, 1.0, 0.8, 0.8),
    ("flowers_a", 0.4, -13.0, 1.3, 0.2), ("flowers_b", -1.2, -16.0, 1.4, 1.1), ("ferns", 1.2, -10.4, 0.9, 0.0),
    ("shrooms", -2.4, -4.95, 0.8, 1.0), ("flowers_b", 6.0, -1.0, 0.8, 0.5),
]:
    put(k, x, z, yaw=yaw, scale=sc)

# Scattered stones in the meadow.
for i in range(14):
    a = rnd.random() * math.tau
    d = 5 + rnd.random() * 9
    x, z = math.cos(a) * d, math.sin(a) * d
    if z > 1.5 and abs(x) < 4:
        continue
    put(rnd.choice(["rock_a", "rock_b", "rock_c", "pebbles"]), x, z, yaw=rnd.random() * 6, scale=0.3 + rnd.random() * 0.4, sink=0.05, foot=0.4)

# Backdrop: mesas and the volcano.
put("mesa_a", -26, -36, yaw=0.4, scale=1.0)
put("mesa_b", -48, -52, yaw=1.2, scale=1.1)
put("mesa_c", -11, -50, yaw=2.0, scale=1.0)
put("mesa_a", 25, -42, yaw=2.6, scale=1.15)
put("mesa_c", 38, -30, yaw=0.9, scale=1.2)
put("mesa_b", 62, -50, yaw=0.2, scale=1.0)
put("volcano", 18, -150, yaw=0.0, scale=1.25, name="volcano")

# ───────────────────────────────────────────── gameplay anchors & effects
anchor("fx_fire", -3.7, -2.5, height(-3.7, -2.5) + 0.12, kind="fire")
anchor("fx_volcano", 18, -150, 29.5, kind="smoke")
anchor("rest_0", -4.75, -1.65, height(-4.75, -1.65) + 0.3, kind="seat", yaw=0.9)
anchor("rest_1", -3.0, -3.65, height(-3.0, -3.65) + 0.3, kind="seat", yaw=-0.35)
anchor("rest_2", -4.9, -3.3, height(-4.9, -3.3) + 0.26, kind="seat", yaw=-1.6)
anchor("rest_3", 5.1, -5.7, height(5.1, -5.7), kind="eat")
anchor("rest_4", 6.2, -6.8, height(6.2, -6.8), kind="shade")
anchor("st_rockpile", 3.95, -2.75, height(3.95, -2.75), kind="rockpile")
anchor("st_bananas", 5.1, -6.4, height(5.1, -6.4), kind="bananas")
anchor("st_fire", -3.7, -2.5, height(-3.7, -2.5), kind="warm")
for i, (x, z) in enumerate([(-30, -26), (30, -24)]):
    anchor(f"path_mammoth_{i}", x, z, height(x, z), kind="path")
# Anchors go in the exported collection with everything else.
for o in list(bpy.context.scene.collection.objects):
    if o.get("role") == "anchor":
        move_to(o, world)

# Wildlife: two mammoths wander the far plain (animated by the runtime).
mam = mammoth("mammoth")
bake_ao([p for p in mam[1:]], samples=32, distance=0.6, strength=0.6)
for p in mam:
    if p.name in templates.objects:
        templates.objects.unlink(p)
    for c in list(p.users_collection):
        c.objects.unlink(p)
    world.objects.link(p)
mam[0].location = G(-18, -24, height(-18, -24))

# ───────────────────────────────────────────── terrain
terrain = build_terrain("terrain", height, ground_color, grass_density)
move_to(terrain, world)
bake_ao([terrain], samples=48, distance=1.6, strength=0.75, extra_occluders=placed, ground=False)
gmap = build_grassmap("grassmap", terrain, grass_density)
move_to(gmap, world)

for o in world.objects:
    o.select_set(True)
export_glb(OUT, objs=list(world.objects))

if PREVIEW:
    sky = bpy.data.worlds["World"]
    preview(PREVIEW, eye=G(0, 8.8, 2.6), target=G(0, 0, 1.2), lens=34.6, size=(960, 600),
            sun_dir=tuple(G(-0.55, 0.45, 0.6)), world_rgb=(0.62, 0.45, 0.5), sun=3.0)
    preview(PREVIEW.replace(".png", "_wide.png"), eye=G(0, 26, 16), target=G(0, -6, 0), lens=30, size=(960, 600),
            sun_dir=tuple(G(-0.55, 0.45, 0.6)), world_rgb=(0.62, 0.45, 0.5), sun=3.0)
