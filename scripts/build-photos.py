#!/usr/bin/env python3
"""
Siri Homestay photo pipeline.

Turns the owners' photos (and two stills from their bathroom video) into web images:
  - a gentle clean-up: levels, a little contrast and colour, fill light for backlit
    rooms, light noise reduction and sharpening. Nothing is added, removed or redrawn.
  - responsive WebP sizes, including a 1.5x enlargement for large screens
  - one JPEG for social sharing, and a tiny placeholder embedded in the manifest

Usage:
  python3 scripts/build-photos.py --src /path/to/originals --out public/media

The source names are the files the owners sent over WhatsApp (Nov 2026). WhatsApp
reduced them to 1600 x 1200; the original camera files would give sharper results:
add them to --src under the same names and re-run.
"""
import argparse, base64, io, json, subprocess, sys, tempfile
from datetime import datetime, timezone
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageFilter, ImageOps

# --------------------------------------------------------------------------
# Catalogue. Alt text and captions describe only what is visible.
# look: exterior | interior | glass | night | video (clean-up settings below)
# --------------------------------------------------------------------------
PHOTOS = [
    # key, source, area, look, caption, alt
    ("villa-patio", "2429d46f-image.jpg", "villa", "exterior", "A villa behind golden bamboo",
     "A whitewashed villa with sliding glass doors, rustic root-wood chairs and a glass table on its patio, and tall golden bamboo in front"),
    ("patio-chairs", "be2fa44c-image.jpg", "villa", "glass", "Root-wood chairs on the patio",
     "Three root-wood chairs and a glass table on a villa patio beside a bamboo grove"),
    ("doorway-bedroom", "25dd883b-image.jpg", "villa", "interior", "Through the sliding door",
     "Looking through a villa's sliding door into the bedroom: a king-size bed with a red throw, a single bed, a wardrobe, a dressing mirror and the bathroom door"),
    ("villa-bedroom", "f150a8e3-image.jpg", "villa", "interior", "The bedroom",
     "A villa bedroom with a king-size bed, two single beds, a glass-and-root side table and sliding glass doors open to the lawn"),
    ("villa-window-pool", "179a2a45-image.jpg", "villa", "glass", "The pool, seen from the bed",
     "View from a villa bedroom through floor-to-ceiling glass to a blue-lined pool and a grove of bamboo"),
    ("villa-pool", "aec27664-image.jpg", "villa", "exterior", "The pool under the glass pergola",
     "A villa's blue-lined pool under a glass-roofed pergola, with bamboo in front of the bedroom window"),
    ("lawn-stepping-stones", "29887266-image.jpg", "lawn", "exterior", "Stepping stones across the lawn",
     "Stepping stones curving across the lawn towards umbrella seating and the volleyball net, framed by bamboo leaves"),
    ("estate-lawn-dining", "84d2e80f-image.jpg", "lawn", "exterior", "The lawn and the dining hall",
     "The estate lawn with umbrella seating in front, the open dining hall with yellow chairs on the left, a cottage behind and the volleyball net on the right"),
    ("lawn-umbrellas", "73a00b45-image.jpg", "lawn", "exterior", "Umbrella seating and firewood for a campfire",
     "Umbrella seating on the lawn, two more umbrellas and the volleyball net in the distance, and firewood stacked for a campfire"),
    ("lawn-table-villa", "45f0548d-image.jpg", "lawn", "exterior", "A table under the umbrella",
     "Six blue chairs around a round table under a large white umbrella, in front of a villa screened by golden bamboo"),
    ("lawn-table-closeup", "f037c923-image.jpg", "lawn", "exterior", "Blue chairs under a white umbrella",
     "Blue chairs around a dark round table beneath a white umbrella, with a villa and bamboo behind"),
    ("bamboo-view-lawn", "714c8a88-image.jpg", "lawn", "exterior", "The lawn through the bamboo",
     "The lawn and umbrella seating seen between bamboo culms from a villa patio"),
    ("courtyard-villas", "aaebd599-image.jpg", "courtyard", "exterior", "Villas around the courtyard",
     "Two tiled-roof villas around the paved courtyard, lined with potted plants"),
    ("courtyard-villa", "060b9444-image.jpg", "courtyard", "exterior", "The courtyard and the hills",
     "The paved courtyard beside a villa with a tiled roof, backed by forested hills"),
    ("courtyard-garden", "894989e7-image.jpg", "courtyard", "exterior", "A table under the tree",
     "An umbrella table under a tree beside a row of potted plants and the paved courtyard"),
    ("night-garden", "30e83c9f-image.jpg", "night", "night", "The garden after dark",
     "The garden at night: floodlit trees, glowing ground lights, umbrella tables and the volleyball net"),
    ("night-lawn", "d2eb6775-image.jpg", "night", "night", "The lawn under the floodlight",
     "The lawn under a floodlight at night, with the volleyball net and a lit umbrella table near the villas"),
    ("night-path", "9c3a566a-image.jpg", "night", "night", "A lit path between the beds",
     "A floodlit path at night between bamboo and garden plants"),
]

# No photo shows the bathroom, so two frames come from the owners' walk-through video.
VIDEO_2 = "1092f7b6-1000162616.mp4"
STILLS = [
    # key, video, time (s), area, caption, alt
    ("bath-basin", VIDEO_2, 94.5, "villa", "The attached bathroom",
     "Attached bathroom with a white vessel basin on a dark stone counter, a mirror, tiled walls and a window"),
    ("bath-wc", VIDEO_2, 92.5, "villa", "Wall-hung WC and tiled walls",
     "Attached bathroom with a wall-hung WC and textured wall tiles"),
]

LOOKS = {
    "exterior": dict(denoise=3, stretch=0.12, contrast=0.08, vibrance=0.10, shadows=0.10, wb=0.0, sharpen=0.55),
    "interior": dict(denoise=3, stretch=0.12, contrast=0.06, vibrance=0.03, shadows=0.32, wb=0.4, sharpen=0.5),
    "glass":    dict(denoise=3, stretch=0.12, contrast=0.12, vibrance=0.06, shadows=0.10, wb=0.0, sharpen=0.5),
    "night":    dict(denoise=6, stretch=0.0,  contrast=0.04, vibrance=0.05, shadows=0.0,  wb=0.0, sharpen=0.35),
    "video":    dict(denoise=4, stretch=0.10, contrast=0.06, vibrance=0.04, shadows=0.15, wb=0.3, sharpen=0.6),
}


def clean(img, denoise, stretch, contrast, vibrance, shadows, wb, sharpen):
    """Photographic clean-up. Tonal and colour adjustments only; no content changes."""
    a = np.asarray(img.convert("RGB"))
    if denoise:
        a = cv2.fastNlMeansDenoisingColored(a, None, denoise, denoise, 7, 21)
    f = a.astype(np.float32) / 255.0
    lum = lambda x: 0.2126 * x[..., 0] + 0.7152 * x[..., 1] + 0.0722 * x[..., 2]
    if wb:
        # Neutralise a colour cast using the bright, nearly grey areas (white walls, sheets).
        y = lum(f); mx = f.max(-1); mn = f.min(-1)
        sel = (y > 0.55) & (y < 0.95) & ((mx - mn) < 0.12)
        if sel.sum() > 2000:
            mean = f[sel].mean(0)
            gain = (mean.mean() / np.maximum(mean, 1e-3)) ** wb
            f = np.clip(f * gain, 0, 1)
    # Levels on luminance, capped so a photo is never pushed far.
    y = lum(f)
    lo, hi = np.percentile(y, 0.3), np.percentile(y, 99.7)
    lo, hi = min(lo, stretch * 0.5), max(hi, 1 - stretch)
    f = np.clip((f - lo) / max(1e-3, hi - lo), 0, 1)
    if shadows:
        # Fill light for rooms lit from a bright window: lift the dark tones, keep colour ratios.
        y = lum(f)
        y2 = np.clip(y + shadows * 4 * y * (1 - y) ** 3, 0, 1)
        f = np.clip(f * (y2 / np.maximum(y, 1e-4))[..., None], 0, 1)
    if contrast:
        f = np.clip(f + contrast * np.sin((f - 0.5) * np.pi) * 0.5 * (1 - np.abs(2 * f - 1)), 0, 1)
    if vibrance:
        hsv = cv2.cvtColor(f.astype(np.float32), cv2.COLOR_RGB2HSV)
        s = hsv[..., 1]
        hsv[..., 1] = np.clip(s + vibrance * s * (1 - s), 0, 1)
        f = cv2.cvtColor(hsv, cv2.COLOR_HSV2RGB)
    if sharpen:
        f = unsharp(f, 1.1, sharpen, 0.6)
    return Image.fromarray((np.clip(f, 0, 1) * 255 + 0.5).astype(np.uint8))


def unsharp(f, radius, amount, threshold):
    """Unsharp mask on lightness only (no colour fringes); threshold spares flat areas."""
    lab = cv2.cvtColor(np.clip(f, 0, 1).astype(np.float32), cv2.COLOR_RGB2LAB)
    L = lab[..., 0]
    diff = L - cv2.GaussianBlur(L, (0, 0), radius)
    lab[..., 0] = np.where(np.abs(diff) > threshold, np.clip(L + amount * diff, 0, 100), L)
    return cv2.cvtColor(lab, cv2.COLOR_LAB2RGB)


def resized(img, w):
    h = round(img.height * w / img.width)
    r = img.resize((w, h), Image.LANCZOS)
    if w > img.width:  # enlargement for big screens: restore a little edge contrast
        f = np.asarray(r).astype(np.float32) / 255.0
        r = Image.fromarray((np.clip(unsharp(f, 1.5, 0.35, 0.8), 0, 1) * 255 + 0.5).astype(np.uint8))
    return r


def lqip(img):
    small = img.copy()
    small.thumbnail((24, 24))
    buf = io.BytesIO()
    small.save(buf, "WEBP", quality=40)
    return "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode()


def widths_for(img):
    if img.height > img.width:  # portrait
        base = [480, 768, img.width] if img.width >= 1000 else [img.width * 3 // 4, img.width]
    else:
        base = [640, 1024, img.width]
    base = sorted({w for w in base if w <= img.width})
    return base + [round(img.width * 1.5)]


def frame(video, t):
    with tempfile.TemporaryDirectory() as d:
        p = Path(d) / "f.png"
        r = subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", str(t), "-i", str(video), "-frames:v", "1", str(p)], capture_output=True)
        if r.returncode != 0:
            sys.exit(r.stderr.decode()[-2000:])
        return Image.open(p).convert("RGB")


def build(key, img, area, look, caption, alt, source, out):
    img = clean(img, **LOOKS[look])
    files = []
    for w in widths_for(img):
        r = resized(img, w)
        name = f"{key}-{w}.webp"
        r.save(out / name, "WEBP", quality=82, method=6)
        files.append({"w": r.width, "h": r.height, "src": name})
    og = img.copy()
    og.thumbnail((1600, 1600))
    og.save(out / f"{key}.jpg", "JPEG", quality=84, optimize=True, progressive=True)
    return {"key": key, "area": area, "caption": caption, "alt": alt, "source": source,
            "w": img.width, "h": img.height, "orientation": "portrait" if img.height > img.width else "landscape",
            "files": files, "jpg": f"{key}.jpg", "lqip": lqip(img)}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", required=True)
    ap.add_argument("--out", required=True)
    a = ap.parse_args()
    src, out = Path(a.src), Path(a.out)
    (out / "photos").mkdir(parents=True, exist_ok=True)
    photos = {}
    for key, fname, area, look, caption, alt in PHOTOS:
        img = ImageOps.exif_transpose(Image.open(src / fname)).convert("RGB")
        photos[key] = build(key, img, area, look, caption, alt, "photo", out / "photos")
        print("photo", key, img.size)
    for key, video, t, area, caption, alt in STILLS:
        img = frame(src / video, t)
        photos[key] = build(key, img, area, "video", caption, alt, "video", out / "photos")
        print("still", key, img.size)
    manifest = {
        "generated": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "note": "The owners' photographs of Siri Homestay, cleaned up for the web (levels, colour, light sharpening). "
                "bath-* are stills from the owners' video. Built by scripts/build-photos.py.",
        "photos": photos,
    }
    (out / "manifest.json").write_text(json.dumps(manifest, indent=1, ensure_ascii=False) + "\n")


if __name__ == "__main__":
    main()
