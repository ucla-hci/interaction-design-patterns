"""Extract the figures of the exemplar papers in data/ as a dataset.

1. Render each PDF page to an image: data/pages/<paper>/p-NN.png (150 dpi).
2. Find each figure from its caption, and crop it: data/figures/<paper>/fig-N.png (400 dpi).
   The crop is taken from the PDF, not from the page image, so small text stays legible.
3. Write the index: data/figures/index.yaml (paper, figure, page, box, caption, file).

A figure is the graphics above its caption: embedded images and vector drawings, grown upward
while the gap stays small. Run: python3 tools/extract_figures.py
"""
import re
from pathlib import Path

import fitz  # PyMuPDF
import yaml

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data"
PAPERS = ["halo", "happier", "perspectevolver", "theseus"]
CAPTION = re.compile(r"^(Figure|Fig\.)\s*(\d+)[.:]")
PAGE_DPI, FIG_DPI = 150, 400
GAP = 36  # pt: the largest vertical gap inside one figure
PAD = 4   # pt: margin around a crop


def graphics(page):
    """Rectangles of the embedded images and the vector drawings on a page."""
    rects = [fitz.Rect(i["bbox"]) for i in page.get_image_info()]
    rects += [d["rect"] for d in page.get_drawings()]
    return [r & page.rect for r in rects if not (r & page.rect).is_empty]


def figure_box(page, cap, floor):
    """Grow a box upward from the caption top, through graphics that overlap its columns."""
    items = [r for r in graphics(page)
             if r.y1 <= cap.y0 + 2 and r.y0 >= floor
             and r.x1 > cap.x0 - 20 and r.x0 < cap.x1 + 20]
    items.sort(key=lambda r: -r.y1)
    box, edge = None, cap.y0
    for r in items:
        if r.y1 < edge - GAP:
            break
        box = r if box is None else box | r
        edge = min(edge, r.y0)
    if box is None:
        return None
    # Text inside the box (labels of a vector figure) belongs to the figure.
    for b in page.get_text("blocks"):
        t = fitz.Rect(b[:4])
        if CAPTION.match(b[4].strip()) or t.y1 > cap.y0:
            continue
        inside = t.y0 >= box.y0 - GAP / 2 and t.intersects(box)
        subcaption = t.y0 >= box.y1 - 2 and t.x1 > box.x0 and t.x0 < box.x1  # "(c) ..." under a panel
        if inside or subcaption:
            box |= t
    box = box + (-PAD, -PAD, PAD, PAD)
    # Stay within the body text, and above the caption: margin line numbers are not the figure.
    body = fitz.Rect(cap)
    for b in page.get_text("blocks"):
        if len(b[4].strip()) > 40:
            body |= fitz.Rect(b[:4])
    return box & fitz.Rect(body.x0 - 10, 0, body.x1 + 10, cap.y0) & page.rect


def main():
    index = []
    for name in PAPERS:
        doc = fitz.open(DATA / f"{name}.pdf")
        pages_dir = DATA / "pages" / name
        figs_dir = DATA / "figures" / name
        pages_dir.mkdir(parents=True, exist_ok=True)
        figs_dir.mkdir(parents=True, exist_ok=True)
        for page in doc:
            n = page.number + 1
            page.get_pixmap(dpi=PAGE_DPI).save(pages_dir / f"p-{n:02d}.png")
            caps = sorted(
                ((fitz.Rect(b[:4]), CAPTION.match(b[4].strip()), b[4]) for b in page.get_text("blocks")
                 if CAPTION.match(b[4].strip())),
                key=lambda c: c[0].y0)
            for rect, m, text in caps:
                # A caption higher on the page, in the same columns, bounds this figure from above.
                above = [r.y1 for r, _, _ in caps if r.y1 <= rect.y0 and r.x1 > rect.x0 and r.x0 < rect.x1]
                box = figure_box(page, rect, max(above, default=0))
                fig = int(m.group(2))
                entry = {"id": f"{name}/fig-{fig}", "paper": name, "figure": fig, "page": n,
                         "caption": " ".join(text.split())}
                if box is None:
                    entry["note"] = "no graphics found above the caption"
                else:
                    out = figs_dir / f"fig-{fig}.png"
                    page.get_pixmap(dpi=FIG_DPI, clip=box).save(out)
                    entry["box"] = [round(v, 1) for v in box]
                    entry["file"] = str(out.relative_to(ROOT))
                index.append(entry)
        print(f"{name}: {doc.page_count} pages, {sum(e['paper'] == name for e in index)} figures")
    with open(DATA / "figures" / "index.yaml", "w") as f:
        yaml.safe_dump(index, f, sort_keys=False, allow_unicode=True, width=100)


if __name__ == "__main__":
    main()
