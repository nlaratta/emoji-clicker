#!/usr/bin/env bash
# Rebuild the game's 3D art kits from the procedural sources in art/blender.
#
#   art/build.sh            # every kit
#   art/build.sh era0       # one kit (preview renders land in art/previews/)
#
# Blender exports raw glTF; gltfpack then quantizes and meshopt-compresses it
# into src/assets/models/, keeping node names and extras (the runtime reads them).
set -euo pipefail
cd "$(dirname "$0")/.."
BLENDER="${BLENDER:-/Applications/Blender.app/Contents/MacOS/Blender}"
KITS=("$@")
[ ${#KITS[@]} -eq 0 ] && KITS=(era0 minions)
mkdir -p art/previews art/.raw src/assets/models
for kit in "${KITS[@]}"; do
  echo "── $kit"
  "$BLENDER" -b --factory-startup -P "art/blender/$kit.py" -- "art/.raw/$kit.glb" "art/previews/$kit.png" 2>&1 \
    | grep -E "Error|Traceback|exported|^  File" || true
  pnpm exec gltfpack -i "art/.raw/$kit.glb" -o "src/assets/models/$kit.glb" -cc -kn -ke -km -kv -vp 16 -vn 8 -vc 10
  ls -la "src/assets/models/$kit.glb" | awk '{printf "   %s  %.0f KB\n", $9, $5/1024}'
done
