"""Batch icon generation with the local Krea-2-Turbo MLX model.

    ~/AI/krea2-mlx/.venv/bin/python art/icons/krea_batch.py jobs.json outdir

jobs.json: [{"id": "...", "prompt": "...", "seed": 0}, ...]. Loads the model
once and skips ids that already have an output file, so it can be re-run.
"""
import json, os, sys, time

KREA = os.path.expanduser(os.environ.get("KREA_DIR", "~/AI/krea2-mlx"))
sys.path.insert(0, KREA)
from krea2.pipeline import Krea2Pipeline, resolve_weights  # noqa: E402

jobs = json.load(open(sys.argv[1]))
out = sys.argv[2]
size = int(os.environ.get("ICON_SIZE", "640"))
steps = int(os.environ.get("ICON_STEPS", "8"))
os.makedirs(out, exist_ok=True)
todo = [j for j in jobs if not os.path.exists(os.path.join(out, f"{j['id']}.png"))]
print(f"{len(todo)} of {len(jobs)} to generate", flush=True)
if not todo:
    sys.exit(0)
precision, tpath = resolve_weights(KREA, precision=None, download=True)
pipe = Krea2Pipeline(transformer_path=tpath, precision=precision)
for j in todo:
    t0 = time.time()
    imgs = pipe.generate(j["prompt"], width=size, height=size, steps=steps, seed=j.get("seed", 0), num_images=1)
    imgs[0].save(os.path.join(out, f"{j['id']}.png"))
    print(f"{j['id']} {time.time() - t0:.1f}s", flush=True)
