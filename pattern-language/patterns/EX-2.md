---
id: "EX-2"
name: "Build Contrasting Viewpoints"
level: "subtask"
role: "Expand"
status: "single-system"
context: ["WF-2"]
situation: "With the claim stated, the user needs viewpoints that differ from the user's own, each with a stated basis."
problem: "The viewpoints read alike, and the user cannot tell what each one contributes or what it rests on."
systems: ["PerspectEvolver"]
references: ["C-3", "C-4", "C-7", "C-12", "C-17"]
aliases: ["B1"]
---

## Example

- `figures/EX-2/1-perspectevolver.png` PerspectEvolver Fig. 2, callouts 2 and 3: literature map, and two Perspective cards

1. Get the viewpoints. The system retrieves source material for the claim (674 papers), and sorts it
   into groups (labelled regions on a map, 2). It builds one viewpoint per group (7 Perspectives),
   each with the same fields (Position, Scope, Explanation, Approach, Significance, 3).
2. Open the sources. The user opens the evidence of a viewpoint (42 sources). Each field cites its
   sources (§4.1.3; not in the figure).
3. Keep a working set. The user compares the viewpoints, and keeps two or more as a working set
   (Select at least 2 Perspectives; Create panel).

## Solution

1. Get the viewpoints — C-3 Candidate Groups, C-17 Typed Item
   - *User:* —
   - *System:* retrieves source material for the claim, and sorts it into [candidate
     groups](C-3). Builds one viewpoint per group, as a [typed item](C-17): every viewpoint has
     the same fields.
2. Open the sources — C-7 Attached Evidence
   - *User:* opens the [attached evidence](C-7) of a field.
   - *System:* attaches evidence to each field. Links it to its source passage.
3. Keep a working set — C-12 Shortlist, C-4 Persistent Structure Map
   - *User:* compares the viewpoints field by field, then keeps a working set in a
     [shortlist](C-12).
   - *System:* shows the working set on the [persistent structure map](C-4).

## Examples

- *PerspectEvolver.* From the Investigation Brief, the system writes research directions and
  searches Semantic Scholar with them (§4.1.2). It groups the papers into labelled regions on
  a Literature Map (§4.1.2). From each region it forms one Perspective Card, with six fields:
  Framing, Position, Scope, Explanation, Approach, and Significance. Each field cites its
  literature evidence (§4.1.3). In the walkthrough, 674 papers give seven Perspectives
  (Fig. 2). The researcher compares the cards, selects two or three, and chooses Create panel
  (§4.1.3).
