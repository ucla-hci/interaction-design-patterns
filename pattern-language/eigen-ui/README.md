# Eigen-UIs

An eigen-UI is a greyscale wireframe of what the instances of one component pattern share. It
cites its instances, marks each variation with a count, and holds no style and no domain content.
At the component level, the eigen-UI card is the spec: `pattern-language/cards/cp-N.html`.
(Decisions, 9/29.)

## Pipeline

1. `python3 tools/extract_figures.py`: page images (`data/pages/`), figure crops at 400 dpi
   (`data/figures/<paper>/fig-N.png`), and `data/figures/index.yaml`. 5 papers, 144 pages, 43 figures.
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

## 10/22: C-7, C-10, C-14

The three components that the most subtasks use (8 each). Boxes in `refs/cp-figures.yaml`. The
spec text of each is one or two sentences, so the drawings add detail more than they contradict
it. The author edits the spec.

### C-7 · Attached Evidence (5 instances)

1. The evidence opens from the item that it justifies (5 of 5): a node (4), a link (1, HAPPIER).
2. The rationale is prose (4 of 5), or labelled fields (2 of 5). IdeaSynth gives sources only.
3. A list of sources, each with a title, metadata, and an open control (3 of 5). A count of the
   sources (2 of 5). THESEUS also says how each source was found.
4. Evidence that is data, not a source: a member table, a simulation (2 of 5).

### C-10 · Proposal Set (4 instances)

1. Three options in most instances. A summary or a rationale on each (4 of 4).
2. An apply action on each option (3 of 4). **Differs from the spec**: in IdeaSynth all the options
   go on the map, and the user deletes the ones not wanted. The spec says the user applies one.
   The author added it as a variation (10/22).
3. Options grouped or tagged by kind (3 of 4). Each option links to its origin (3 of 4), which is
   C-14. `references` now lists C-14 (10/22).
4. An option not yet opened is drawn apart (3 of 4), which the spec states.

### C-14 · Provenance Link (4 instances)

1. Each new item links to what produced it (4 of 4). The link is dashed, apart from other links
   (2 of 4). The new item can start the next round (2 of 4).
2. The replaced item stays (3 of 4). Before and now side by side, by field (1 of 4, PerspectEvolver).
3. **Not in the spec**: a composed item marks the items that it uses when it is in focus (1 of 4,
   IdeaSynth). The link goes from the new item back to many sources, not to one parent. The
   author added it as a variation (10/22).

## Limits of this pilot

- The boxes and the counts are from one reader, from one or two figures per system. A figure shows
  one moment, so a count of 1 can mean "not drawn in the figure".
- 10/22: the HAPPIER PDF in `data/` is the published version. The C-4 and C-6 boxes were drawn on
  the anonymous submission; the published Fig. 3 is the same screen, a few pixels off.
- PerspectEvolver has no CP-6 instance in the MVP Examples column, so CP-6 has three systems.
