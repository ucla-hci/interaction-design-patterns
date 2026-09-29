# Eigen-UIs

An eigen-UI is a greyscale wireframe of what the instances of one component pattern share. It
cites its instances, marks each variation with a count, and holds no style and no domain content.
At the component level, the eigen-UI card is the spec: `pattern-language/cards/cp-N.html`.
(Decisions, 9/29.)

## Pipeline

1. `python3 tools/extract_figures.py`: page images (`data/pages/`), figure crops at 400 dpi
   (`data/figures/<paper>/fig-N.png`), and `data/figures/index.yaml`. 4 papers, 121 pages, 35 figures.
2. `pattern-language/refs/cp-figures.yaml`: the box of each CP instance, by hand.
3. `python3 tools/crop_cp.py`: one crop per instance, and a sheet per CP, in `data/figures/cp/`.
4. The card: `pattern-language/cards/cp-N.html`, with the eigen-UI drawn from the sheet.

`data/` is not in git. The crops stay local.

## Pilot, 9/29: CP-4 and CP-6

### CP-4 · Persistent Structure Map ([card](../cards/cp-4.html))

No YAML spec existed. The card is drawn from these features of the four instances:

1. A node is a card with a label and a summary (4 of 4). The MVP says "tree, graph, or canvas" and
   does not state what a node shows.
2. A status line on a node (3 of 4). A selected state that opens CP-6 (2 of 4).
3. A score on a link (2 of 4). This is CP-8 on the map.
4. A second node type, drawn apart from the first (2 of 4).
5. Map controls (3 of 4), and a legend when marks encode criteria (1 of 4).
6. Shape: a tree from a root (3 of 4), or a network with no root (1 of 4, HAPPIER).

### CP-6 · Detail on Demand ([card](../cards/cp-6.html))

The YAML spec held: an overview that stays, a side panel, a claim, a confidence line, and sources
that open. The crops differ from that spec at five points. The card follows the crops:

1. **The selected item is marked in the overview** (2 of 3). The spec has no selected state on
   `#item`.
2. **The overview is a map** (2 of 3), not a list of rows. The spec draws `#overview` as rows.
   CP-6 can take CP-4 as its overview.
3. **Evidence that is not a source** (2 of 3): a table of members, a structure viewer. The spec has
   only `#source` rows.
4. **The panel content is in sections that collapse** (2 of 3).
5. **A keep toggle in the header** (1 of 3), which is CP-12. Tabs (1 of 3). The one-action
   `#act` button appears in 1 of 3.

## Limits of this pilot

- The boxes and the counts are from one reader, from one or two figures per system. A figure shows
  one moment, so a count of 1 can mean "not drawn in the figure".
- PerspectEvolver has no CP-6 instance in the MVP Examples column, so CP-6 has three systems.
