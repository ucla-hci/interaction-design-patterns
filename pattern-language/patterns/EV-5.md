---
id: "EV-5"
name: "Relate the Sources to the Parts"
level: "subtask"
role: "Evaluate"
status: "single-system"
context: ["WF-4"]
situation: "The user has parts and a collection, and wants to know what the sources say about each part."
problem: "The user cannot tell which source bears on which part, and must read every source in full."
systems: ["IdeaSynth"]
references: ["C-6", "C-7", "C-10", "C-14"]
aliases: []
---

## Solution

1. Get the analysis — C-6 Detail on Demand, C-7 Attached Evidence
   - *User:* opens the analysis of the whole work, or the [detail](C-6) of one part.
   - *System:* links sections of sources to the parts that they bear on, as [attached
     evidence](C-7). Opens a source from its link.
2. Ask about the sources — (no component)
   - *User:* asks a question about the sources or the parts.
   - *System:* answers from the collection only.
3. Turn a proposal into parts — C-10 Proposal Set, C-14 Provenance Link
   - *User:* applies a next step from the [proposal set](C-10).
   - *System:* adds a chain of new parts, each with a [provenance link](C-14) to the proposal.

## Examples

- *IdeaSynth.* At the canvas level, a researcher generates a one-paragraph summary of the
  collection, and an analysis that links key paper sections to the nodes (§4.1.2, §4.3,
  Fig. 3 ④ ⑤). The left menu of a node shows the paper sections for that node only (§4.1.4,
  Fig. 5 ⑥). The Q&A box answers questions about the papers or the nodes (§4.1.4, Fig. 3 ③). Both
  analyses suggest next steps; dragging one onto the canvas creates a chain of nodes (§4.1.4,
  Fig. 4 ⑤). Some participants did not trust the summaries without reading the papers (§5.3.3).
