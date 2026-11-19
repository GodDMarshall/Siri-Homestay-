#!/usr/bin/env python3
"""
Siri Homestay media pipeline.

Turns the client's original photos and phone videos into web-ready assets:
  - responsive WebP renditions + one JPEG for social sharing
  - tiny blurred placeholders (LQIP) embedded in the manifest
  - depth maps (MiDaS small, ONNX) for the 2.5D parallax shader
  - the room-entry montage clip, estate-arrival clip and full walk-through tours
  - a scroll-scrubbed image sequence for the homepage arrival
  - stills pulled from the footage (bathroom, pool view)

Usage:
  python3 scripts/build-media.py --src /path/to/originals --out public/media \
      [--midas /path/to/model-small.onnx]

The source filenames below are the ones the client sent over WhatsApp
(Nov 2026). Re-run after adding photos to PHOTOS.
"""
import argparse, base64, io, json, os, subprocess, sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter, ImageOps

# --------------------------------------------------------------------------
# Catalogue. Alt text describes only what is visible in each photo.
# --------------------------------------------------------------------------
PHOTOS = [
    # key, source file, area, alt
    ("lawn-stepping-stones", "29887266-image.jpg", "lawn",
     "Stepping stones curving across the lawn towards umbrella seating and the volleyball net, framed by bamboo leaves"),
    ("estate-lawn-dining", "84d2e80f-image.jpg", "lawn",
     "The estate lawn with umbrella seating in front, the open dining hall with yellow chairs on the left, a cottage behind and the volleyball net on the right"),
    ("lawn-umbrellas", "73a00b45-image.jpg", "lawn",
     "Umbrella seating on the lawn, two more umbrellas and the volleyball net in the distance, and firewood stacked for a campfire"),
    ("lawn-table-villa", "45f0548d-image.jpg", "lawn",
     "Six blue chairs around a round table under a large white umbrella, in front of a villa screened by golden bamboo"),
    ("lawn-table-closeup", "f037c923-image.jpg", "lawn",
     "Blue chairs around a dark round table beneath a white umbrella, with a villa and bamboo behind"),
    ("bamboo-view-lawn", "714c8a88-image.jpg", "lawn",
     "The lawn and umbrella seating seen between bamboo culms from a villa patio"),
    ("villa-patio", "2429d46f-image.jpg", "villa",
     "A whitewashed villa with sliding glass doors, rustic root-wood chairs and a glass table on its patio, and tall golden bamboo in front"),
    ("patio-chairs", "be2fa44c-image.jpg", "villa",
     "Three root-wood chairs and a glass table on a villa patio beside a bamboo grove"),
    ("doorway-bedroom", "25dd883b-image.jpg", "villa",
     "Looking through a villa's sliding door into the bedroom: a king-size bed with a red throw, a single bed, a wardrobe, a dressing mirror and the bathroom door"),
    ("villa-bedroom", "f150a8e3-image.jpg", "villa",
     "A villa bedroom with a king-size bed, two single beds, a glass-and-root side table and sliding glass doors open to the lawn"),
    ("villa-window-pool", "179a2a45-image.jpg", "villa",
     "View from a villa bedroom through floor-to-ceiling glass to a blue-lined pool and a grove of bamboo"),
    ("villa-pool", "aec27664-image.jpg", "villa",
     "A villa's blue-lined pool under a glass-roofed pergola, with bamboo in front of the bedroom window"),
    ("courtyard-villas", "aaebd599-image.jpg", "courtyard",
     "Two tiled-roof villas around the paved courtyard, lined with potted plants"),
    ("courtyard-villa", "060b9444-image.jpg", "courtyard",
     "The paved courtyard beside a villa with a tiled roof, backed by forested hills"),
    ("courtyard-garden", "894989e7-image.jpg", "courtyard",
     "An umbrella table under a tree beside a row of potted plants and the paved courtyard"),
    ("night-garden", "30e83c9f-image.jpg", "night",
     "The garden at night: floodlit trees, glowing ground lights, umbrella tables and the volleyball net"),
    ("night-lawn", "d2eb6775-image.jpg", "night",
     "The lawn under a floodlight at night, with the volleyball net and a lit umbrella table near the villas"),
    ("night-path", "9c3a566a-image.jpg", "night",
     "A floodlit path at night between bamboo and garden plants"),
]

# Photos that get a depth map for the WebGL parallax.
DEPTH_KEYS = [
    "lawn-stepping-stones", "estate-lawn-dining", "lawn-umbrellas", "lawn-table-villa",
    "villa-patio", "villa-bedroom", "villa-window-pool", "courtyard-villas",
    "night-garden", "bamboo-view-lawn", "doorway-bedroom", "villa-pool",
]

VIDEO_1 = "4af9fe02-1000163369.mp4"   # garden path -> doorway -> bedroom -> patio -> lawn (49 s)
VIDEO_2 = "1092f7b6-1000162616.mp4"   # path -> bedroom -> pool view -> TV -> bathroom (104 s)

# Stills pulled from the footage: key, video, time (s), alt
STILLS = [
    ("bath-basin", VIDEO_2, 94.5, "Attached bathroom with a white vessel basin on a dark stone counter, tiled walls and a window"),
    ("bath-wc", VIDEO_2, 92.5, "Attached bathroom with a wall-hung WC and textured wall tiles"),
    ("room-pool-view", VIDEO_2, 28.0, "Floor-to-ceiling glass looking out from the bedroom to the blue-lined pool and bamboo"),
    ("room-beds", VIDEO_2, 72.0, "A made-up king-size bed in a villa bedroom"),
    ("walk-bed", VIDEO_1, 22.6, "The king-size bed with a red throw, seen on walking into the villa"),
    ("walk-door", VIDEO_1, 7.2, "Steps up to a villa door with a red welcome mat"),
]

FFMPEG = "ffmpeg"


def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        sys.stderr.write(r.stderr[-3000:])
        raise SystemExit(f"command failed: {' '.join(cmd[:6])} ...")


def lqip(img: Image.Image) -> str:
    small = img.copy()
    small.thumbnail((24, 24))
    buf = io.BytesIO()
    small.save(buf, "WEBP", quality=40)
    return "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode()


def save_renditions(img: Image.Image, key: str, out: Path, widths):
    files = []
    for w in widths:
        if w > img.width:
            continue
        r = img.copy()
        r = r.resize((w, round(img.height * w / img.width)), Image.LANCZOS)
        p = out / f"{key}-{w}.webp"
        r.save(p, "WEBP", quality=78, method=6)
        files.append({"w": w, "h": r.height, "src": p.name})
    return files


def depth_map(img: Image.Image, sess):
    import cv2
    rgb = np.asarray(img.convert("RGB")).astype(np.float32) / 255.0
    inp = cv2.resize(rgb, (256, 256), interpolation=cv2.INTER_CUBIC)
    mean = np.array([0.485, 0.456, 0.406], np.float32)
    std = np.array([0.229, 0.224, 0.225], np.float32)
    inp = ((inp - mean) / std).transpose(2, 0, 1)[None].astype(np.float32)
    name = sess.get_inputs()[0].name
    out = sess.run(None, {name: inp})[0][0]
    out = (out - out.min()) / max(1e-6, (out.max() - out.min()))  # 1 = near
    w, h = 768, round(768 * img.height / img.width)
    d = cv2.resize(out, (w, h), interpolation=cv2.INTER_CUBIC)
    guide = cv2.resize(rgb, (w, h), interpolation=cv2.INTER_AREA)
    try:
        d = cv2.ximgproc.guidedFilter(guide.astype(np.float32), d.astype(np.float32), 8, 1e-3)
    except Exception:
        d = cv2.bilateralFilter(d.astype(np.float32), 9, 0.1, 9)
    # Dilate near regions slightly so foreground edges don't smear the background.
    d = cv2.dilate(d, np.ones((5, 5), np.uint8))
    d = cv2.GaussianBlur(d, (0, 0), 2.2)
    d = np.clip(d, 0, 1)
    return Image.fromarray((d * 255).astype(np.uint8), "L")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--midas", default=None)
    ap.add_argument("--skip-video", action="store_true")
    a = ap.parse_args()
    src, out = Path(a.src), Path(a.out)
    (out / "photos").mkdir(parents=True, exist_ok=True)
    (out / "depth").mkdir(parents=True, exist_ok=True)
    (out / "video").mkdir(parents=True, exist_ok=True)
    (out / "seq" / "arrival").mkdir(parents=True, exist_ok=True)

    manifest = {"photos": {}, "stills": {}, "video": {}, "sequences": {}}
    sess = None
    if a.midas:
        import onnxruntime as ort
        sess = ort.InferenceSession(a.midas, providers=["CPUExecutionProvider"])

    for key, fname, area, alt in PHOTOS:
        img = ImageOps.exif_transpose(Image.open(src / fname)).convert("RGB")
        portrait = img.height > img.width
        widths = [480, 800, 1200] if portrait else [640, 1024, 1600]
        files = save_renditions(img, key, out / "photos", widths)
        og = img.copy(); og.thumbnail((1200, 1200))
        og.save(out / "photos" / f"{key}.jpg", "JPEG", quality=82, optimize=True, progressive=True)
        entry = {"key": key, "area": area, "alt": alt, "w": img.width, "h": img.height,
                 "orientation": "portrait" if portrait else "landscape",
                 "files": files, "jpg": f"{key}.jpg", "lqip": lqip(img)}
        if sess is not None and key in DEPTH_KEYS:
            depth_map(img, sess).save(out / "depth" / f"{key}.webp", "WEBP", quality=82)
            entry["depth"] = f"{key}.webp"
        manifest["photos"][key] = entry
        print("photo", key, [f["w"] for f in files], "depth" if "depth" in entry else "")

    tmp = out / "_tmp"; tmp.mkdir(exist_ok=True)
    for key, vid, t, alt in STILLS:
        p = tmp / f"{key}.png"
        run([FFMPEG, "-v", "error", "-y", "-ss", str(t), "-i", str(src / vid), "-frames:v", "1", str(p)])
        img = Image.open(p).convert("RGB").filter(ImageFilter.UnsharpMask(radius=1.2, percent=60, threshold=2))
        files = save_renditions(img, key, out / "photos", [360, 576])
        entry = {"key": key, "alt": alt, "w": img.width, "h": img.height, "orientation": "portrait",
                 "files": files, "lqip": lqip(img), "source": "video-still"}
        if sess is not None and key in ("walk-bed",):
            depth_map(img, sess).save(out / "depth" / f"{key}.webp", "WEBP", quality=82)
            entry["depth"] = f"{key}.webp"
        manifest["stills"][key] = entry
        print("still", key)

    if not a.skip_video:
        v1, v2 = str(src / VIDEO_1), str(src / VIDEO_2)
        enc = ["-c:v", "libx264", "-preset", "veryfast", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an"]

        # 1) Room-entry montage: up the steps and through the door, then the bed.
        run([FFMPEG, "-v", "error", "-y", "-i", v1, "-filter_complex",
             "[0:v]trim=5.8:9.8,setpts=(PTS-STARTPTS)/1.25,fps=30[a];"
             "[0:v]trim=20.4:24.6,setpts=(PTS-STARTPTS)/1.1,fps=30[b];"
             "[a][b]xfade=transition=fade:duration=0.45:offset=2.75,format=yuv420p[v]",
             "-map", "[v]", "-crf", "25", *enc, str(out / "video" / "walk-in.mp4")])
        # 2) Estate arrival: the stone path towards a villa (video 2 opening).
        run([FFMPEG, "-v", "error", "-y", "-i", v2, "-vf", "trim=0.3:5.6,setpts=(PTS-STARTPTS)/1.15",
             "-crf", "26", *enc, str(out / "video" / "estate-walk.mp4")])
        # 3) Full walk-throughs for the gallery. Video 2 has a person reflected in the
        #    bathroom mirror between ~85.6 s and ~90.6 s: that span is removed.
        run([FFMPEG, "-v", "error", "-y", "-i", v1, "-vf", "scale=540:-2", "-crf", "29", *enc,
             str(out / "video" / "tour-garden-to-bed.mp4")])
        run([FFMPEG, "-v", "error", "-y", "-i", v2, "-filter_complex",
             "[0:v]trim=0:85.6,setpts=PTS-STARTPTS[a];[0:v]trim=90.8:104.3,setpts=PTS-STARTPTS[b];"
             "[a][b]concat=n=2:v=1:a=0,scale=540:-2[v]", "-map", "[v]", "-crf", "29", *enc,
             str(out / "video" / "tour-room-and-bath.mp4")])
        for name, vid, t in [("walk-in", "walk-in.mp4", 0), ("estate-walk", "estate-walk.mp4", 0),
                             ("tour-garden-to-bed", "tour-garden-to-bed.mp4", 21.5),
                             ("tour-room-and-bath", "tour-room-and-bath.mp4", 27.0)]:
            p = tmp / f"{name}.png"
            run([FFMPEG, "-v", "error", "-y", "-ss", str(t), "-i", str(out / "video" / vid), "-frames:v", "1", str(p)])
            Image.open(p).convert("RGB").save(out / "video" / f"{name}-poster.webp", "WEBP", quality=70)
        for vid in ["walk-in", "estate-walk", "tour-garden-to-bed", "tour-room-and-bath"]:
            dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0",
                                        str(out / "video" / f"{vid}.mp4")], capture_output=True, text=True).stdout)
            manifest["video"][vid] = {"src": f"{vid}.mp4", "poster": f"{vid}-poster.webp", "duration": round(dur, 2),
                                      "bytes": (out / "video" / f"{vid}.mp4").stat().st_size}
        # 4) Homepage arrival: lawn path -> villa door -> threshold, scrubbed by scroll.
        seq = out / "seq" / "arrival"
        for f in seq.glob("*.webp"):
            f.unlink()
        run([FFMPEG, "-v", "error", "-y", "-i", v1, "-vf", "trim=0:9.6,setpts=PTS-STARTPTS,fps=10,scale=480:-2",
             str(tmp / "arr_%03d.png")])
        frames = sorted(tmp.glob("arr_*.png"))
        total = 0
        for i, f in enumerate(frames):
            p = seq / f"{i:03d}.webp"
            Image.open(f).convert("RGB").save(p, "WEBP", quality=56, method=6)
            total += p.stat().st_size
        manifest["sequences"]["arrival"] = {"dir": "seq/arrival", "count": len(frames), "w": 480,
                                            "h": Image.open(frames[0]).height, "bytes": total, "pattern": "{i3}.webp"}
        print("arrival frames", len(frames), round(total / 1e6, 2), "MB")

    for f in tmp.glob("*"):
        f.unlink()
    tmp.rmdir()
    (out / "manifest.json").write_text(json.dumps(manifest, indent=1))
    print("manifest written")


if __name__ == "__main__":
    main()
