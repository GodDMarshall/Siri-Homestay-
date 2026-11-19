#!/usr/bin/env python3
"""Turns the PNG renders of the code-built estate into the site's image set.

    node scripts/render-views.mjs --out renders --q ultra --w 1600
    python3 scripts/build-renders.py --src renders --out public/media

Writes responsive WebP renditions, a JPEG for link previews, a tiny blurred placeholder
and public/media/manifest.json (alt text, sizes, camera and where each 3D anchor falls
in the picture, used for hotspots).
"""
import argparse, base64, io, json, os, sys
from PIL import Image, ImageFilter

# Alt text describes what the picture shows. Every picture is a 3D render made in code.
INFO = {
    'lawn-stepping-stones': ('lawn', 'Stepping stones crossing the lawn towards umbrella tables, with the volleyball net and a line of trees beyond'),
    'estate-lawn-dining': ('lawn', 'A heap of branches and logs for the campfire beside an umbrella table, with the open dining hall on the left and the lawn beyond'),
    'lawn-umbrellas': ('lawn', 'An umbrella table with blue chairs on its concrete circle, firewood beside it and more umbrellas across the lawn'),
    'lawn-table-villa': ('lawn', 'Blue chairs round a table under a large white umbrella, in front of a villa screened by golden bamboo'),
    'lawn-table-closeup': ('lawn', 'Under a white umbrella: six blue chairs round a dark table, with a villa and bamboo behind'),
    'bamboo-view-lawn': ('lawn', 'The lawn and umbrella tables seen between golden bamboo culms from a villa patio'),
    'villa-patio': ('villa', 'A whitewashed villa with sliding glass doors, a pergola, a small blue-lined pool and root-wood chairs on the patio, behind golden bamboo'),
    'patio-chairs': ('villa', 'Root-wood chairs and a glass-topped table on a villa patio, seen from the open door'),
    'doorway-bedroom': ('villa', 'Looking in through the sliding door: a king-size bed with a red throw, a single bed, the wardrobe and the bathroom door'),
    'villa-bedroom': ('villa', 'A villa bedroom: a king-size bed and a single bed, a day bed by the glass and sliding doors open to the bamboo and lawn'),
    'villa-window-pool': ('villa', 'From inside the bedroom, the small blue-lined pool just beyond the glass, with bamboo outside'),
    'villa-pool': ('villa', 'The small blue-lined pool against the villa under the pergola, with bamboo beside it'),
    'room-beds': ('villa', 'The king-size bed with white linen and a red throw, and a single bed beyond'),
    'room-pool-view': ('villa', 'The bedroom glass looking out over the pool to the bamboo and the lawn'),
    'bath-basin': ('villa', 'The attached bathroom: a white vessel basin on a dark stone counter, with a mirror and green-grey wall tiles'),
    'bath-wc': ('villa', 'The attached bathroom: a wall-hung WC and textured wall tiles'),
    'walk-door': ('villa', 'The villa’s sliding door standing open, with a red welcome mat and root-wood chairs on the patio'),
    'walk-bed': ('villa', 'The king-size bed with a red throw, seen on walking into the villa'),
    'courtyard-villas': ('courtyard', 'Two tiled-roof cottages around the paved courtyard, with a row of potted plants and a spreading tree'),
    'courtyard-villa': ('courtyard', 'A tiled-roof cottage beside the paved courtyard, with trees behind'),
    'courtyard-garden': ('courtyard', 'An umbrella and a table under a broad-leaved tree on the grass beside the courtyard’s potted plants'),
    'night-garden': ('night', 'The lawn at night under floodlights, with umbrella tables, the volleyball net and low garden lamps'),
    'night-lawn': ('night', 'The lawn under a floodlight at night, with the volleyball net and an umbrella table'),
    'night-path': ('night', 'A floodlight by the bamboo at night, low lamps glowing along the edge of the lawn'),
    'aerial': ('estate', 'The estate from above: the lawn with its umbrella tables, the garden villas along the bamboo, the dining hall, the courtyard and the pond, in forest'),
    'arrival-start': ('estate', 'Looking across the pond and the meadow towards the lawn and the villas in early light'),
    'pond': ('estate', 'The pond, edged with reeds, in early light'),
    'bed': ('villa', 'Close to the king-size bed: pillows, white linen and the red throw'),
}

def lqip(im):
    small = im.copy(); small.thumbnail((24, 24)); small = small.filter(ImageFilter.GaussianBlur(0.6))
    buf = io.BytesIO(); small.save(buf, 'WEBP', quality=40)
    return 'data:image/webp;base64,' + base64.b64encode(buf.getvalue()).decode()

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--src', default='renders')
    ap.add_argument('--out', default='public/media')
    a = ap.parse_args()
    meta = json.load(open(os.path.join(a.src, 'renders.json')))
    out_dir = os.path.join(a.out, 'renders')
    os.makedirs(out_dir, exist_ok=True)
    renders = {}
    for key, (area, alt) in INFO.items():
        src = os.path.join(a.src, key + '.png')
        if not os.path.exists(src):
            print('missing', key, file=sys.stderr); continue
        im = Image.open(src).convert('RGB')
        W, H = im.size
        portrait = H > W
        widths = [480, 768, 1200] if portrait else [640, 1024, 1600]
        files = []
        for w in widths:
            if w > W: continue
            h = round(H * w / W)
            r = im.resize((w, h), Image.LANCZOS)
            name = f'{key}-{w}.webp'
            r.save(os.path.join(out_dir, name), 'WEBP', quality=82, method=6)
            files.append({'w': w, 'h': h, 'src': name})
        jpg = f'{key}.jpg'
        og = im.copy(); og.thumbnail((1200, 1200)); og.save(os.path.join(out_dir, jpg), 'JPEG', quality=84, optimize=True, progressive=True)
        m = meta.get(key, {})
        renders[key] = {
            'key': key, 'area': area, 'alt': alt, 'w': W, 'h': H,
            'orientation': 'portrait' if portrait else 'landscape',
            'files': files, 'jpg': jpg, 'lqip': lqip(im),
            'camera': m.get('camera'), 'preset': m.get('preset'), 'anchors': m.get('anchors', {}),
        }
        print(key, W, H, len(files))
    manifest = {'generated': 'scripts/build-renders.py', 'note': '3D renders of the estate, generated in code', 'renders': renders}
    with open(os.path.join(a.out, 'manifest.json'), 'w') as f:
        json.dump(manifest, f, indent=1, ensure_ascii=False)
    print('wrote', len(renders), 'renders')

if __name__ == '__main__':
    main()
