#!/usr/bin/env python3
"""
Depth maps for the owners' photos, used by the site's 3D motion (public/js/motion.js):
nearer things move more than distant ones when the camera drifts, so a flat photo
behaves like a real scene. The photo itself is never changed.

Model: MiDaS v2.1 small (ONNX, 256 x 256 input), from https://github.com/isl-org/MiDaS
releases. One pass over the whole photo gives the overall shape; overlapping tiles add
detail and are aligned to it; an edge-aware filter then snaps the depth to the photo's
own edges (bamboo, umbrellas, door frames).

Usage:
  python3 scripts/build-depth.py --model models/model-small.onnx --media public/media
Reads public/media/manifest.json and the 1600 px photos; writes public/media/depth/<key>.webp
and adds "depth" to each manifest entry.
"""
import re, argparse, json
from pathlib import Path

import cv2
import numpy as np
import onnxruntime as ort
from PIL import Image

MEAN = np.array([0.485, 0.456, 0.406], np.float32)
STD = np.array([0.229, 0.224, 0.225], np.float32)
SKIP = {"bath-basin", "bath-wc"}  # small video stills: shown flat


def infer(sess, rgb):
    x = cv2.resize(rgb, (256, 256), interpolation=cv2.INTER_AREA)
    x = ((x - MEAN) / STD).transpose(2, 0, 1)[None].astype(np.float32)
    return sess.run(None, {sess.get_inputs()[0].name: x})[0][0]  # inverse depth, bigger = nearer


def guided(I, p, r, eps):
    """He et al. guided filter (grey guide)."""
    box = lambda a: cv2.boxFilter(a, -1, (2 * r + 1, 2 * r + 1))
    mI, mp = box(I), box(p)
    a = (box(I * p) - mI * mp) / (box(I * I) - mI * mI + eps)
    b = mp - a * mI
    return box(a) * I + box(b)


def depth_for(sess, rgb, W=1024):
    h0, w0 = rgb.shape[:2]
    H = round(W * h0 / w0)
    img = cv2.resize(rgb, (W, H), interpolation=cv2.INTER_AREA)
    base = cv2.resize(infer(sess, img), (W, H), interpolation=cv2.INTER_CUBIC)
    base = (base - base.min()) / max(1e-6, np.ptp(base))
    # Overlapping tiles at roughly twice the resolution, each aligned to the whole-photo pass.
    acc = np.zeros((H, W), np.float32); wsum = np.zeros((H, W), np.float32)
    tw, th = W // 2, H // 2
    for ty in np.linspace(0, H - th, 3).astype(int):
        for tx in np.linspace(0, W - tw, 3).astype(int):
            t = cv2.resize(infer(sess, img[ty:ty + th, tx:tx + tw]), (tw, th), interpolation=cv2.INTER_CUBIC)
            g = base[ty:ty + th, tx:tx + tw]
            A = np.stack([t.ravel(), np.ones(t.size)], 1)
            s, o = np.linalg.lstsq(A, g.ravel(), rcond=None)[0]
            wy = np.sin(np.linspace(0, np.pi, th))[:, None] ** 2 + 1e-3
            wx = np.sin(np.linspace(0, np.pi, tw))[None, :] ** 2 + 1e-3
            acc[ty:ty + th, tx:tx + tw] += (s * t + o) * wy * wx
            wsum[ty:ty + th, tx:tx + tw] += wy * wx
    tiles = acc / np.maximum(wsum, 1e-6)
    # Keep the overall shape from the whole-photo pass, take the fine detail from the tiles.
    lp = lambda a: cv2.GaussianBlur(a, (0, 0), 24)
    d = lp(base) + (tiles - lp(tiles))
    # Snap depth edges to the photo's edges.
    grey = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY).astype(np.float32)
    d = guided(grey, d.astype(np.float32), 6, 2e-3)
    d = guided(grey, d, 2, 1e-3)
    d = cv2.GaussianBlur(d, (0, 0), 1.0)
    lo, hi = np.percentile(d, 0.5), np.percentile(d, 99.5)
    return np.clip((d - lo) / max(1e-6, hi - lo), 0, 1)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--model", required=True)
    ap.add_argument("--media", default="public/media")
    ap.add_argument("--only", nargs="*")
    a = ap.parse_args()
    media = Path(a.media)
    (media / "depth").mkdir(parents=True, exist_ok=True)
    sess = ort.InferenceSession(a.model, providers=["CPUExecutionProvider"])
    mf = media / "manifest.json"
    manifest = json.loads(mf.read_text())
    for key, m in manifest["photos"].items():
        if key in SKIP or (a.only and key not in a.only):
            continue
        src = [f for f in m["files"] if f["w"] <= m["w"]][-1]["src"]  # the native-size file
        rgb = np.asarray(Image.open(media / "photos" / src).convert("RGB")).astype(np.float32) / 255.0
        d = depth_for(sess, rgb)
        name = re.sub(r"-\d+\.webp$", ".webp", src)  # villa-patio-ai-1600.webp -> villa-patio-ai.webp
        Image.fromarray((d * 255 + 0.5).astype(np.uint8), "L").save(media / "depth" / name, "WEBP", quality=90)
        if m.get("depth") and m["depth"] != name and (media / "depth" / m["depth"]).exists():
            (media / "depth" / m["depth"]).unlink()
        m["depth"] = name
        print("depth", key)
    mf.write_text(json.dumps(manifest, indent=1, ensure_ascii=False) + "\n")


if __name__ == "__main__":
    main()
