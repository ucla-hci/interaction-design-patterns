---
id: "SY-3"
name: "Compose Selected Parts"
level: "subtask"
role: "Synthesize"
status: "single-system"
context: ["WF-4"]
situation: "The user has developed enough parts, and needs one document that states the work."
problem: "The user rewrites the parts as prose by hand, and the document loses which part each passage came from."
systems: ["IdeaSynth"]
references: ["C-4", "C-14"]
aliases: []
---

## Solution

1. Select parts — C-4 Persistent Structure Map
   - *User:* selects linked parts on the [persistent structure map](C-4).
   - *System:* marks the selected parts.
2. Get the composition — C-14 Provenance Link
   - *User:* requests a composition.
   - *System:* writes one document from the parts, and keeps their links. When the document has
     focus, marks its parts and links on the map, through a [provenance link](C-14).
3. Keep several compositions — (no component)
   - *User:* selects other parts, and requests another composition.
   - *System:* keeps each composition in its own view.

## Examples

- *IdeaSynth.* When a researcher has explored enough, she selects a path of facet nodes and
  generates a research brief in the right panel (§4.1.5, Fig. 6). The brief keeps the
  connections between the facets (§4.2). When the brief has focus, its nodes and edges are
  highlighted on the canvas (Fig. 6). Several briefs stay open in tabs, so the researcher can
  return to the canvas and compose more (§4.1.5, Fig. 6).
