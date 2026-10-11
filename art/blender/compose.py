"""Shared scaffolding for era compositions: template library, AO bakes,
placement in game coordinates, anchors, terrain, export and previews."""
from __future__ import annotations

import json
import math
import os

import bpy

from kit import bake_ao, collection, export_glb, move_to, preview
from terrain import G, anchor, build_grassmap, build_terrain

LAYOUT = json.load(open(os.path.join(os.path.dirname(__file__), "..", "..", "src", "render", "minions", "layout.json")))


class Composer:
    def __init__(self, height):
        self.height = height
        self.templates = collection("templates")
        self.templates.hide_render = True
        self.world = collection("world")
        self.T: dict[str, bpy.types.Object] = {}
        self.placed: list[bpy.types.Object] = []
        self.footprints: list[tuple[float, float, float]] = []
        self.anims: list[bpy.types.Object] = []

    # ── templates ──
    def tmpl(self, key, ob, sway=None):
        move_to(ob, self.templates)
        ob.location = (0, 0, 0)
        if sway is not None:
            ob["sway"] = sway
        self.T[key] = ob
        return ob

    def bake_templates(self, samples=64, big=("wall", "tower", "keep", "mesa", "volcano", "building", "tower")):
        tris = sum(sum(len(p.vertices) - 2 for p in t.data.polygons) for t in self.T.values())
        print(f"templates: {len(self.T)}, {tris} tris")
        for name, t in self.T.items():
            self.templates.hide_render = False
            others = [o for o in self.templates.objects if o is not t]
            for o in others:
                o.hide_render = True
            dist = 1.2 if name.startswith(big) else 0.7
            bake_ao([t], samples=samples, distance=dist, strength=0.7)
            for o in others:
                o.hide_render = False
        self.templates.hide_render = True
        for o in self.templates.objects:
            o.hide_render = False

    # ── placement (game coordinates) ──
    def put(self, key, x, z, yaw=0.0, scale=1.0, sink=0.0, foot=None, name=None, y=None, **props):
        t = self.T[key]
        ob = t.copy()
        ob.name = name or f"{key}.{len(self.placed):03d}"
        self.world.objects.link(ob)
        ob.location = G(x, z, (self.height(x, z) if y is None else y) - sink)
        ob.rotation_euler = (0, 0, yaw)
        ob.scale = (scale, scale, scale)
        for k, v in t.items():
            ob[k] = v
        for k, v in props.items():
            ob[k] = v
        if foot:
            self.footprints.append((x, z, foot * scale))
        self.placed.append(ob)
        return ob

    def ring(self, key, radius, a0, a1, step, face_in=True, **kw):
        """Place copies along an arc (angles in radians from +z toward +x)."""
        out = []
        n = max(1, int(round(abs(a1 - a0) / step)))
        for k in range(n + 1):
            a = a0 + (a1 - a0) * k / n
            x, z = math.sin(a) * radius, math.cos(a) * radius
            out.append(self.put(key, x, z, yaw=(a if face_in else a + math.pi), **kw))
        return out

    def anchor(self, name, x, z, dy=0.0, **props):
        # Anchors live in the world collection too, or the export skips them.
        e = anchor(name, x, z, self.height(x, z) + dy, **props)
        move_to(e, self.world)
        return e

    def add_anim(self, objs, x, z, yaw=0.0, dy=0.0, scale=1.0):
        """Move an `anim` hierarchy (root first) into the world."""
        root = objs[0]
        for p in objs:
            for c in list(p.users_collection):
                c.objects.unlink(p)
            self.world.objects.link(p)
        root.location = G(x, z, self.height(x, z) + dy)
        root.rotation_euler = (0, 0, yaw)
        root.scale = (scale, scale, scale)
        self.anims.extend(objs)
        return root

    def slot_clear(self, x, z, r, margin=1.0):
        """True if a prop of radius `r` at (x, z) keeps clear of every minion
        slot in layout.json (so big scenery never lands on a machine)."""
        for key, pts in LAYOUT.items():
            if key.startswith("_") or key in ("rockpile", "printer", "paradox"):
                continue
            for px, pz in pts:
                if math.hypot(x - px, z - pz) < r + margin:
                    return False
        return True

    def clear_of(self, x, z, r):
        """True if no footprint overlaps the circle (keep minion spots clear)."""
        return all(math.hypot(x - fx, z - fz) > r + fr for fx, fz, fr in self.footprints)

    # ── finish ──
    def finish(self, out, color, grass, preview_path=None, cam=None, sun_dir=(-0.55, 0.45, 0.6), world_rgb=(0.6, 0.6, 0.7), samples=64, terrain_kw=None):
        anim_meshes = [o for o in self.anims if o.type == "MESH"]
        if anim_meshes:
            bake_ao(anim_meshes, samples=32, distance=0.6, strength=0.55)
        terrain = build_terrain("terrain", self.height, color, grass, **(terrain_kw or {}))
        move_to(terrain, self.world)
        bake_ao([terrain], samples=samples, distance=1.6, strength=0.75, extra_occluders=self.placed, ground=False)
        gmap = build_grassmap("grassmap", terrain, grass)
        move_to(gmap, self.world)
        export_glb(out, objs=list(self.world.objects))
        if preview_path:
            eye, target = cam or (G(0, 9.3, 2.95), G(0, 0, 1.15))
            preview(preview_path, eye=eye, target=target, lens=34.6, size=(960, 600), sun_dir=tuple(G(*sun_dir)), world_rgb=world_rgb, sun=3.0)
            preview(preview_path.replace(".png", "_wide.png"), eye=G(0, 26, 16), target=G(0, -6, 0), lens=30, size=(960, 600), sun_dir=tuple(G(*sun_dir)), world_rgb=world_rgb, sun=3.0)
