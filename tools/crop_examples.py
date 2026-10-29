"""Crop the Example figure of each page listed in pattern-language/refs/example-figures.yaml.

Reads the figures made by tools/extract_figures.py. Writes pattern-language/figures/<ID>/<n>-<paper>.png
(tracked; the site shows them).
Run: python3 tools/crop_examples.py
"""
from pathlib import Path

import yaml
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
INDEX = ROOT / "data" / "figures" / "index.yaml"


def main():
    figures = {e["id"]: e for e in yaml.safe_load(INDEX.read_text())}
    pages = yaml.safe_load((ROOT / "pattern-language" / "refs" / "example-figures.yaml").read_text())
    for page, entries in pages.items():
        out = ROOT / "pattern-language" / "figures" / page
        out.mkdir(parents=True, exist_ok=True)
        for n, e in enumerate(entries, 1):
            im = Image.open(ROOT / figures[e["figure"]]["file"]).convert("RGB")
            x0, y0, x1, y1 = e["box"]
            crop = im.crop((round(x0 * im.width), round(y0 * im.height),
                            round(x1 * im.width), round(y1 * im.height)))
            paper = e["figure"].split("/")[0]
            crop.save(out / f"{n}-{paper}.png", optimize=True)
        print(f"{page}: {len(entries)} -> {out.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
