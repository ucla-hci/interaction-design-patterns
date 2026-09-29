"""Crop each CP instance listed in pattern-language/refs/cp-figures.yaml.

Reads the figures made by tools/extract_figures.py. Writes data/figures/cp/<CP>/<n>-<paper>.png,
and one side-by-side sheet per CP: data/figures/cp/<CP>/sheet.png.
Run: python3 tools/crop_cp.py
"""
from pathlib import Path

import yaml
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
INDEX = ROOT / "data" / "figures" / "index.yaml"
SHEET_H = 900  # px: height of each crop on the sheet


def main():
    figures = {e["id"]: e for e in yaml.safe_load(INDEX.read_text())}
    cps = yaml.safe_load((ROOT / "pattern-language" / "refs" / "cp-figures.yaml").read_text())
    for cp, entry in cps.items():
        out = ROOT / "data" / "figures" / "cp" / cp
        out.mkdir(parents=True, exist_ok=True)
        crops = []
        for n, inst in enumerate(entry["instances"], 1):
            im = Image.open(ROOT / figures[inst["figure"]]["file"]).convert("RGB")
            x0, y0, x1, y1 = inst["box"]
            crop = im.crop((round(x0 * im.width), round(y0 * im.height),
                            round(x1 * im.width), round(y1 * im.height)))
            crop.save(out / f"{n}-{inst['paper']}.png")
            crops.append((f"{n} {inst['figure']} {inst.get('callout', '')}", crop))
        tiles = []
        for label, crop in crops:
            t = crop.resize((round(crop.width * SHEET_H / crop.height), SHEET_H))
            tile = Image.new("RGB", (t.width, SHEET_H + 40), "white")
            tile.paste(t, (0, 40))
            ImageDraw.Draw(tile).text((8, 10), label, fill="red", font_size=24)
            tiles.append(tile)
        sheet = Image.new("RGB", (sum(t.width for t in tiles) + 20 * len(tiles), SHEET_H + 40), "#888")
        x = 0
        for t in tiles:
            sheet.paste(t, (x, 0))
            x += t.width + 20
        sheet.save(out / "sheet.png")
        print(f"{cp}: {len(crops)} instances -> {out.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
