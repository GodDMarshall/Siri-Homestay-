#!/usr/bin/env python3
"""AI-enhance every photo on the site, keeping what is in it.

Each photo is rebuilt by an AI super-resolution model (Real-ESRGAN, realesr-general-x4v3,
run with onnxruntime) from a half-size copy, which gives the clean, sharp "AI" finish, then
graded: local contrast, vibrance, a warm/teal split tone, a soft glow on the highlights and a
light vignette. Nothing is added to or removed from the scene.

Writes <key>-ai-<w>.webp sizes, <key>-ai.jpg and a new placeholder for every photo in
public/media/manifest.json, updates the manifest and removes the files it replaces (new names,
so browsers that cached the old photos fetch the new ones). Run `npm run depth` afterwards.

  python3 scripts/enhance-ai.py --model models/realesr-general-x4v3.pth --media public/media [--only key,key]
The model: https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.5.0/realesr-general-x4v3.pth
"""
import argparse, base64, collections, io, json, pickle, re, sys, zipfile
from pathlib import Path
import numpy as np, cv2, onnxruntime as ort
from onnx import TensorProto, helper, numpy_helper
from PIL import Image


def load_pth(path):
    """A PyTorch state dict without PyTorch."""
    zf = zipfile.ZipFile(path)
    pkl = next(n for n in zf.namelist() if n.endswith('data.pkl'))
    root = pkl[: -len('data.pkl')]
    types = {'FloatStorage': np.float32, 'HalfStorage': np.float16, 'DoubleStorage': np.float64}

    class U(pickle.Unpickler):
        def find_class(self, mod, name):
            if name == '_rebuild_tensor_v2':
                def rebuild(st, offset, size, stride, *a):
                    arr = np.frombuffer(zf.read(root + 'data/' + st[0]), dtype=st[1])
                    return arr[offset: offset + int(np.prod(size))].reshape(size).astype(np.float32)
                return rebuild
            if name == '_rebuild_parameter':
                return lambda data, *a: data
            if mod == 'torch' and name.endswith('Storage'):
                return name
            if name == 'OrderedDict':
                return collections.OrderedDict
            return super().find_class(mod, name)

        def persistent_load(self, pid):
            return (pid[2], types.get(pid[1], np.float32))

    sd = U(zf.open(pkl)).load()
    return sd.get('params_ema') or sd.get('params') or sd


def build_session(sd):
    """SRVGGNetCompact (64 features, 32 convs, x4) as an ONNX graph, up to the pixel shuffle."""
    nodes, inits, cur = [], [], 'input'
    n = 1 + max(int(k.split('.')[1]) for k in sd if k.startswith('body.'))
    for i in range(n):
        if f'body.{i}.bias' in sd:
            inits += [numpy_helper.from_array(sd[f'body.{i}.weight'], f'w{i}'), numpy_helper.from_array(sd[f'body.{i}.bias'], f'b{i}')]
            nodes.append(helper.make_node('Conv', [cur, f'w{i}', f'b{i}'], [f't{i}'], kernel_shape=[3, 3], pads=[1, 1, 1, 1]))
        else:
            inits.append(numpy_helper.from_array(sd[f'body.{i}.weight'].reshape(-1, 1, 1), f's{i}'))
            nodes.append(helper.make_node('PRelu', [cur, f's{i}'], [f't{i}']))
        cur = f't{i}'
    nodes.append(helper.make_node('DepthToSpace', [cur], ['output'], blocksize=4, mode='CRD'))
    io_ = lambda name: helper.make_tensor_value_info(name, TensorProto.FLOAT, [1, 3, None, None])
    model = helper.make_model(helper.make_graph(nodes, 'srvgg', [io_('input')], [io_('output')], inits),
                              opset_imports=[helper.make_opsetid('', 13)], ir_version=8)
    return ort.InferenceSession(model.SerializeToString(), providers=['CPUExecutionProvider'])


def upscale(sess, rgb):
    """rgb float32 HxWx3 in 0..1 -> 4x larger."""
    x = np.ascontiguousarray(rgb.transpose(2, 0, 1)[None])
    y = sess.run(None, {'input': x})[0] + np.repeat(np.repeat(x, 4, axis=2), 4, axis=3)
    return np.clip(y[0].transpose(1, 2, 0), 0, 1)


def ai_look(rgb):
    h, w = rgb.shape[:2]
    # the smooth, crisp "generated" finish: flatten fine texture, keep and sharpen edges
    u8 = (rgb * 255 + 0.5).astype(np.uint8)
    smooth = cv2.edgePreservingFilter(u8, flags=cv2.RECURS_FILTER, sigma_s=30, sigma_r=0.18).astype(np.float32) / 255
    detail = cv2.detailEnhance(u8, sigma_s=8, sigma_r=0.12).astype(np.float32) / 255
    rgb = rgb * 0.35 + smooth * 0.4 + detail * 0.25
    lab = cv2.cvtColor(rgb, cv2.COLOR_RGB2LAB)
    L = lab[..., 0] / 100
    clahe = cv2.createCLAHE(clipLimit=1.7, tileGridSize=(8, 8))
    Lc = clahe.apply((L * 255).astype(np.uint8)).astype(np.float32) / 255
    L = L * 0.45 + Lc * 0.55
    L = L * 0.7 + (L * L * (3 - 2 * L)) * 0.3                       # gentle S-curve
    lab[..., 0] = np.clip(L, 0, 1) * 100
    rgb = np.clip(cv2.cvtColor(lab, cv2.COLOR_LAB2RGB), 0, 1)
    hsv = cv2.cvtColor(rgb, cv2.COLOR_RGB2HSV)
    s = hsv[..., 1]
    hsv[..., 1] = np.clip(s * 1.08 + 0.55 * s * (1 - s), 0, 1)      # vibrance
    rgb = cv2.cvtColor(hsv, cv2.COLOR_HSV2RGB)
    lum = rgb @ np.float32([0.2126, 0.7152, 0.0722])
    rgb = rgb + ((1 - lum) ** 2)[..., None] * np.float32([-0.012, 0.004, 0.02]) \
              + (lum ** 2)[..., None] * np.float32([0.028, 0.012, -0.018])   # teal shadows, warm highlights
    bright = (np.clip((lum - 0.7) / 0.3, 0, 1)[..., None] * rgb).astype(np.float32)
    glow = cv2.GaussianBlur(bright, (0, 0), sigmaX=w / 90)
    rgb = 1 - (1 - np.clip(rgb, 0, 1)) * (1 - 0.45 * glow)          # bloom
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    r = ((xx / w - 0.5) ** 2 + (yy / h - 0.5) ** 2) / 0.5
    return np.clip(rgb * (1 - 0.14 * r ** 1.5)[..., None], 0, 1).astype(np.float32)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--model', required=True)
    ap.add_argument('--media', required=True)
    ap.add_argument('--only', default='')
    args = ap.parse_args()
    media = Path(args.media)
    mf = media / 'manifest.json'
    manifest = json.loads(mf.read_text())
    sess = build_session(load_pth(args.model))
    only = set(filter(None, args.only.split(',')))
    for key, m in manifest['photos'].items():
        if only and key not in only:
            continue
        if '-ai-' in m['files'][0]['src']:
            print(key, 'already done'); continue
        native = [f for f in m['files'] if f['w'] <= m['w']][-1]['src']
        src = cv2.cvtColor(cv2.imread(str(media / 'photos' / native)), cv2.COLOR_BGR2RGB).astype(np.float32) / 255
        half = cv2.resize(src, (src.shape[1] // 2, src.shape[0] // 2), interpolation=cv2.INTER_AREA)
        big = upscale(sess, half)
        top = max(m['files'], key=lambda f: f['w'])
        out = ai_look(cv2.resize(big, (top['w'], top['h']), interpolation=cv2.INTER_AREA))
        img = Image.fromarray((out * 255 + 0.5).astype(np.uint8))
        old = [f['src'] for f in m['files']] + [m.get('jpg')]
        for f in m['files']:
            f['src'] = f"{key}-ai-{f['w']}.webp"
            img.resize((f['w'], f['h']), Image.LANCZOS).save(media / 'photos' / f['src'], 'WEBP', quality=84, method=6)
        m['jpg'] = f'{key}-ai.jpg'
        img.resize((m['w'], m['h']), Image.LANCZOS).save(media / 'photos' / m['jpg'], 'JPEG', quality=86, optimize=True, progressive=True)
        tiny = io.BytesIO()
        img.resize((24, max(1, round(24 * top['h'] / top['w']))), Image.LANCZOS).save(tiny, 'WEBP', quality=40)
        m['lqip'] = 'data:image/webp;base64,' + base64.b64encode(tiny.getvalue()).decode()
        m['enhanced'] = 'AI'
        for o in old:
            if o and (media / 'photos' / o).exists():
                (media / 'photos' / o).unlink()
        mf.write_text(json.dumps(manifest, indent=1, ensure_ascii=False) + '\n')
        print(key, 'done', flush=True)


if __name__ == '__main__':
    sys.exit(main())
