"""Download the Higgsfield brand renders listed in brand/manifest.json.

Runs on a GitHub runner (see .github/workflows/fetch-brand-assets.yml); the
development container has no egress to the render CDN. Manifest entries:

  {"id": "...", "url": "...", "preview": true}
      -> included in brand/sheet-N.jpg only (thumbnail contact sheet)
  {"id": "...", "url": "...", "out": "src/assets/brand/x.webp", "ops": ["trim"], "max": 1600}
      -> downloaded, optionally trimmed to its alpha bounding box, resized to
         fit `max`, and written in the format implied by the extension
         (.webp, .png, .jpg, .ico).
  "cover": [w, h]   -> centre-cropped to exactly w x h (Open Graph cards).
  "info": "path.json" -> also write image width/height/duration metadata.

Videos (.mp4): "frames" (default 4) evenly spaced frames go to the sheet; with
"out" the video is re-encoded for the web (H.264, capped width, faststart, no
audio) and an optional "poster" frame is written.
"""
import io
import json
import os
import subprocess
import tempfile

import requests
from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MANIFEST = os.path.join(ROOT, "brand", "manifest.json")
INFO = {}


def fetch(url):
    r = requests.get(url, timeout=240)
    r.raise_for_status()
    return r.content


def probe(src):
    out = subprocess.check_output(
        ["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
         "stream=width,height:format=duration", "-of", "json", src]
    ).decode()
    j = json.loads(out)
    st = (j.get("streams") or [{}])[0]
    return {"width": st.get("width"), "height": st.get("height"), "duration": float(j.get("format", {}).get("duration") or 0)}


def video_frames(src, n=4):
    dur = probe(src)["duration"] or 1
    frames = []
    with tempfile.TemporaryDirectory() as d:
        for i in range(n):
            t = dur * (i + 0.5) / n
            out = os.path.join(d, f"f{i}.png")
            subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", f"{t:.2f}", "-i", src, "-frames:v", "1", out], check=True)
            frames.append(Image.open(out).convert("RGBA"))
    return frames, dur


def trim(im):
    if im.mode != "RGBA":
        return im
    bbox = im.split()[3].getbbox()
    return im.crop(bbox) if bbox else im


def cover(im, w, h):
    sw, sh = im.size
    scale = max(w / sw, h / sh)
    im = im.resize((round(sw * scale), round(sh * scale)), Image.LANCZOS)
    left, top = (im.width - w) // 2, (im.height - h) // 2
    return im.crop((left, top, left + w, top + h))


def save(out, path, it):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    ext = os.path.splitext(path)[1].lower()
    q = it.get("quality", 90)
    if ext == ".webp":
        out.save(path, "WEBP", quality=q, method=6)
    elif ext in (".jpg", ".jpeg"):
        out.convert("RGB").save(path, "JPEG", quality=q, optimize=True)
    elif ext == ".ico":
        out.convert("RGBA").save(path, "ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    else:
        out.save(path, "PNG", optimize=True)
    INFO[it["id"]] = {"out": it["out"], "width": out.width, "height": out.height, "bytes": os.path.getsize(path)}
    print("wrote", path, out.width, "x", out.height, os.path.getsize(path))


def main():
    items = json.load(open(MANIFEST))
    previews = []
    cache = {}
    for it in items:
        url, iid = it["url"], it["id"]
        print("fetching", iid, url)
        try:
            data = cache.get(url) or fetch(url)
            cache[url] = data
        except Exception as exc:  # a missing/expired render must not sink the whole run
            print("skip", iid, exc)
            continue
        if url.lower().endswith(".mp4"):
            with tempfile.TemporaryDirectory() as d:
                src = os.path.join(d, "src.mp4")
                with open(src, "wb") as f:
                    f.write(data)
                meta = probe(src)
                if it.get("preview", True):
                    frames, dur = video_frames(src, it.get("frames", 4))
                    for k, fr in enumerate(frames):
                        previews.append((f"{iid} v{k} {dur:.1f}s {meta['width']}x{meta['height']}", fr))
                if it.get("out"):
                    path = os.path.join(ROOT, it["out"])
                    os.makedirs(os.path.dirname(path), exist_ok=True)
                    width = it.get("width", 1280)
                    crf = str(it.get("crf", 28))
                    subprocess.run(
                        ["ffmpeg", "-v", "error", "-y", "-i", src, "-an",
                         "-vf", f"scale='min({width},iw)':-2", "-c:v", "libx264",
                         "-preset", "slow", "-crf", crf, "-pix_fmt", "yuv420p",
                         "-movflags", "+faststart", path],
                        check=True,
                    )
                    INFO[iid] = {"out": it["out"], "bytes": os.path.getsize(path), **meta}
                    if it.get("poster"):
                        poster = os.path.join(ROOT, it["poster"])
                        t = it.get("poster_at", 0)
                        subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", str(t), "-i", path, "-frames:v", "1", "-q:v", "4", poster], check=True)
                        print("wrote", poster, os.path.getsize(poster))
                    print("wrote", path, os.path.getsize(path), meta)
            continue

        im = Image.open(io.BytesIO(data))
        im.load()
        label = f"{iid} {im.width}x{im.height} {im.mode}"
        if it.get("preview", True):
            previews.append((label, im.convert("RGBA")))
        if it.get("out"):
            ops = it.get("ops", [])
            out = im.convert("RGBA")
            if "trim" in ops:
                out = trim(out)
            if "cover" in it:
                out = cover(out, *it["cover"])
            if "max" in it:
                out.thumbnail((it["max"], it["max"]), Image.LANCZOS)
            save(out, os.path.join(ROOT, it["out"]), it)

    # Contact sheets: 5 per row, 300px cells, checkerboard behind alpha, labelled.
    W, cols, per_sheet = 300, 5, 20
    for s in range(0, len(previews), per_sheet):
        chunk = previews[s:s + per_sheet]
        rows = (len(chunk) + cols - 1) // cols
        sheet = Image.new("RGB", (cols * (W + 8), rows * (W + 26)), (34, 34, 34))
        d = ImageDraw.Draw(sheet)
        for i, (label, im) in enumerate(chunk):
            th = im.copy()
            th.thumbnail((W, W), Image.LANCZOS)
            bg = Image.new("RGBA", (W, W), (96, 96, 96, 255))
            for y in range(0, W, 20):
                for x in range(0, W, 20):
                    if (x // 20 + y // 20) % 2:
                        bg.paste((120, 120, 120, 255), (x, y, x + 20, y + 20))
            bg.alpha_composite(th, ((W - th.width) // 2, (W - th.height) // 2))
            x, y = (i % cols) * (W + 8), (i // cols) * (W + 26)
            sheet.paste(bg.convert("RGB"), (x, y))
            d.text((x + 3, y + W + 4), label, fill=(255, 255, 255))
        p = os.path.join(ROOT, "brand", f"sheet-{s // per_sheet + 1}.jpg")
        sheet.save(p, "JPEG", quality=80)
        print("sheet", p, os.path.getsize(p))
    with open(os.path.join(ROOT, "brand", "info.json"), "w") as f:
        json.dump(INFO, f, indent=1, sort_keys=True)


if __name__ == "__main__":
    main()
