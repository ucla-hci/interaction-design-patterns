# Eigen-UI: feasibility (9/29)

Question from the journal, 9/29: for each component pattern (CP), collect screenshots of it from
the exemplar papers. Then distill one prototypical representation, an "eigen-UI", grounded in
those screenshots. Is this feasible?

**Short answer.** Yes, with limits. A crop per CP instance is feasible. A statistical "eigen" is
not, because each CP has 1 to 4 instances. The distillation is a manual abstraction that cites
its crops. Run a pilot on two CPs before the other 14.

## Evidence examined

Two of the four PDFs, the pages of the system section only: HALO pp. 5–9, THESEUS pp. 6–12.
HAPPIER and PerspectEvolver are not examined. The claims about them come from the text.

## What works

1. **The figures are annotated screenshots.** HALO Fig. 2 has callouts A–F. THESEUS Fig. 2 has
   callouts A–E, and Fig. 3 has F–I. Each callout is a boxed region with a label.
2. **The callouts link to the text.** The system section refers to each callout, for example
   "Fig. 2–C". The Examples field of each CP already cites these sections. So a crop can be
   found from the § number, and no search is necessary.
3. **Most CPs have a visible instance.** From the two papers examined:

   | Callout | Shows | CP |
   |---|---|---|
   | HALO 2-A | trajectory map | CP-4 |
   | HALO 2-B | cluster table, green and red deltas | CP-3, CP-5 |
   | HALO 2-C | strategy list | CP-10 |
   | HALO 2-D, 2-E | strategies, then the editor with scores | CP-10, CP-15 |
   | THESEUS 2-A | main hypothesis | CP-1 |
   | THESEUS 2-B | graph, edge percentages | CP-4, CP-8 |
   | THESEUS 2-C | rationale and evidence panel | CP-6, CP-7 |
   | THESEUS 3-H | result upload | CP-16 |
   | THESEUS 3-I | follow-up paths, three candidates | CP-13, CP-10 |

## What does not work

1. **A callout is a feature, not a CP.** One crop often holds two or three CPs, as in the
   table above. A small CP is a detail inside the crop of another CP. CP-8 (a percentage on an
   edge) and CP-14 (an edit edge) are examples. For these, crop the detail and keep the parent
   crop as context.
2. **Some CPs have no crop in the main figures.** HALO targets (CP-1) are not in Fig. 2. Some
   views are in the appendix, for example HALO Fig. 10. CP-11 (revision cards) and CP-12
   (Shortlist) need a check in the two papers not examined.
3. **The sample is too small for an average.** Each CP has 1 to 4 instances, and two CPs have
   one. "Eigen" in the PCA sense is not possible. The distillation must be an abstraction that
   keeps what the crops share, and states each difference as a variation.
4. **The crops share a genre.** All four systems are node-and-card science tools. They can come
   from one lab. The crops share a visual style that is not part of any pattern. An eigen-UI
   that copies that style fails the abstraction rule in `decisions.md`.
5. **Resolution.** At page resolution the text in a crop is illegible. Render the figure
   pages at 300 dpi or more, or extract the embedded images.
6. **Licence.** The papers are anonymous submissions, and `data/` is not in git. The crops must
   stay in `data/`. The eigen-UI is our work and can be committed.

## How it relates to the current specs

- The eigen-UI does not replace the spec. The decisions for 9/22 make the spec the pattern, and
  a rendering a way to look at it. The eigen-UI is a rendering that the crops ground.
- The eigen-UI reverses the direction of the grounding. Now the spec comes from the text of the
  papers, and the render comes from the spec. After the change, the crops also inform the
  spec. A difference between an eigen-UI and a spec is a finding about the spec.
- The first `next-up` item, self-finetune CP rendering, starts with the same step: extract the
  screens that match a CP. The two tasks share their first half.

## Proposed method

1. For each CP, list its instances from the Examples column, with § and figure callout.
2. Render the figure pages at 300 dpi. Crop each instance by hand. Record the page and the box
   in `data/crops/crops.yaml`, so a crop can be made again.
3. For each CP, put its crops side by side. List what every crop has, what some crops have,
   and what is domain content.
4. Draw the eigen-UI as a greyscale wireframe: the shared elements, each variation marked, no
   domain content. Label each element with the spec element that it draws.
5. Compare the eigen-UI with the spec and with the current render. Record each difference.

## Cost

- Crops: about 40, for 16 CPs. About 1–2 hours with the pages read at full resolution.
- One eigen-UI and its comparison: about 20–30 minutes per CP.
- Pilot, two CPs: about 1 hour.

## Recommended pilot

- **CP-4 Persistent Structure Map.** All four systems have one, and it has no spec yet. It
  tests the method when instances are many and different.
- **CP-6 Detail on Demand.** Three instances, and a spec and a render exist. It tests
  the comparison with the current render.

Success check for the pilot: each eigen-UI cites its crops, it holds no domain term, and the
comparison names at least one difference from the spec, or states that there is none.
