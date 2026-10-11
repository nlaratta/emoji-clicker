"""Cut the generated icons out of their grey backgrounds and pack an atlas.

    ~/AI/krea2-mlx/.venv/bin/python art/icons/pack.py

Reads art/icons/raw/*.png (from krea_batch.py) and writes
src/assets/icons/atlas.webp + atlas.json ({cell, cols, icons: {id: index}}).

Cut-out, per icon:
1. Model the background as a smooth quadratic gradient fitted to the border.
2. Flood-fill "background" inward from the edges through pixels close to that
   model (and through faint, neutral contact shadows), so pale subjects such
   as white gloves survive: they aren't connected to the border.
3. Soften only a thin band along the silhouette, and remove the grey spill
   there so icons sit cleanly on dark panels.
4. Crop to the subject and fit it into a square cell with a uniform margin.
"""
import json
import os
import sys

import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
RAW = os.path.join(HERE, "raw")
OUT = os.path.join(HERE, "..", "..", "src", "assets", "icons")
CELL = 128
FILL = 0.86


def fit_background(a: np.ndarray) -> np.ndarray:
    h, w, _ = a.shape
    band = max(6, int(min(h, w) * 0.05))
    ys, xs = np.mgrid[0:h, 0:w]
    mask = np.zeros((h, w), bool)
    mask[:band] = mask[-band:] = True
    mask[:, :band] = mask[:, -band:] = True
    X = np.stack([np.ones(mask.sum()), xs[mask] / w, ys[mask] / h, (xs[mask] / w) ** 2, (ys[mask] / h) ** 2, xs[mask] * ys[mask] / (w * h)], 1)
    bg = np.empty_like(a, dtype=float)
    full = np.stack([np.ones(h * w), xs.ravel() / w, ys.ravel() / h, (xs.ravel() / w) ** 2, (ys.ravel() / h) ** 2, xs.ravel() * ys.ravel() / (w * h)], 1)
    for c in range(3):
        coef, *_ = np.linalg.lstsq(X, a[..., c][mask].astype(float), rcond=None)
        bg[..., c] = (full @ coef).reshape(h, w)
    return bg


def dilate(m: np.ndarray) -> np.ndarray:
    d = m.copy()
    d[1:] |= m[:-1]
    d[:-1] |= m[1:]
    d[:, 1:] |= m[:, :-1]
    d[:, :-1] |= m[:, 1:]
    return d


def cutout(path: str) -> Image.Image:
    im = Image.open(path).convert("RGB")
    a = np.asarray(im).astype(float)
    bg = fit_background(a)
    diff = np.sqrt(((a - bg) ** 2).sum(2))
    luma = a.mean(2)
    bgl = bg.mean(2)
    chroma = np.abs((a - a.mean(2, keepdims=True)) - (bg - bg.mean(2, keepdims=True))).sum(2)
    # Background-like: close to the model, or a faint neutral shadow on it.
    near = diff < 16
    shadow = (luma < bgl) & (bgl - luma < 34) & (chroma < 10)
    cand = near | shadow
    seed = np.zeros(cand.shape, bool)
    seed[0, :] = seed[-1, :] = seed[:, 0] = seed[:, -1] = True
    bgmask = seed & cand
    for _ in range(2000):
        nxt = dilate(bgmask) & cand
        if (nxt == bgmask).all():
            break
        bgmask = nxt
    # Alpha: opaque inside; soft ramp in a 3px band along the silhouette.
    alpha = (~bgmask).astype(float)
    band = dilate(dilate(dilate(bgmask))) & ~bgmask
    ramp = np.clip((diff - 10) / 34, 0, 1)
    alpha[band] = np.maximum(ramp[band], 0.0)
    # Shadows that got kept at the very edge fade out instead of ringing.
    alpha[bgmask] = 0
    # Despill: un-mix the background from semi-transparent edge pixels.
    a_ = np.clip(alpha, 1e-3, 1)[..., None]
    rgb = np.where(alpha[..., None] < 0.999, (a - (1 - a_) * bg) / a_, a)
    rgb = np.clip(rgb, 0, 255)
    out = np.dstack([rgb, alpha * 255]).astype(np.uint8)
    img = Image.fromarray(out, "RGBA")
    box = img.getchannel("A").point(lambda v: 255 if v > 24 else 0).getbbox()
    if box:
        img = img.crop(box)
    side = max(img.size) / FILL
    canvas = Image.new("RGBA", (int(side), int(side)), (0, 0, 0, 0))
    canvas.paste(img, ((int(side) - img.size[0]) // 2, (int(side) - img.size[1]) // 2))
    return canvas.resize((CELL, CELL), Image.LANCZOS)


def main():
    files = sorted(f for f in os.listdir(RAW) if f.endswith(".png"))
    ids = [f[:-4] for f in files]
    cols = 16
    rows = (len(ids) + cols - 1) // cols
    atlas = Image.new("RGBA", (cols * CELL, rows * CELL), (0, 0, 0, 0))
    for i, f in enumerate(files):
        icon = cutout(os.path.join(RAW, f))
        atlas.paste(icon, ((i % cols) * CELL, (i // cols) * CELL))
        if "--preview" in sys.argv:
            print(f"{i:3d} {ids[i]}")
    os.makedirs(OUT, exist_ok=True)
    atlas.save(os.path.join(OUT, "atlas.webp"), "WEBP", quality=88, method=6)
    json.dump({"cell": CELL, "cols": cols, "rows": rows, "icons": {k: i for i, k in enumerate(ids)}}, open(os.path.join(OUT, "atlas.json"), "w"), indent=0)
    print(f"packed {len(ids)} icons -> {OUT}/atlas.webp ({os.path.getsize(os.path.join(OUT, 'atlas.webp')) // 1024} KB)")


if __name__ == "__main__":
    main()
