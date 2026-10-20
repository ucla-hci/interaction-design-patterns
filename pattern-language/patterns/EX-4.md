---
id: "EX-4"
name: "Generate Alternatives to a Part"
level: "subtask"
role: "Expand"
status: "single-system"
context: ["WF-4"]
situation: "The user has one version of a part, and wants other versions to compare with it."
problem: "The user develops the first version of each part, and does not consider others."
systems: ["IdeaSynth"]
references: ["C-4", "C-7", "C-10", "C-14", "C-17"]
aliases: []
---

## Solution

1. Request alternatives — C-4 Persistent Structure Map, C-17 Typed Item, C-14 Provenance Link
   - *User:* selects a part on the [persistent structure map](C-4), and requests alternatives.
     Can add an instruction.
   - *System:* reads the part and its linked parts. Adds alternatives of the same kind, as
     [typed items](C-17), each with a [provenance link](C-14) to the part.
2. Apply a proposal — C-10 Proposal Set, C-7 Attached Evidence
   - *User:* moves through the [proposal set](C-10) of one part, and applies one proposal.
   - *System:* proposes a question, an alternative, or a new part, each with its [attached
     evidence](C-7).
3. Remove alternatives — C-4 Persistent Structure Map
   - *User:* removes the alternatives that do not fit from the [persistent structure map](C-4).
   - *System:* —

## Examples

- *IdeaSynth.* "Generate Alternatives" in the node menu creates nodes of the same facet type,
  with an optional prompt (§4.2, Fig. 5 ⑤). A new node reads the current node and its linked
  nodes, and links to its origin (§4.1.4, §4.2). "Get AI Suggestions" gives a clarifying
  question, an alternative, or an expansion, with paper references; arrows move between them
  (§4.1.3, §4.3, Fig. 5 ③ ④). The researcher generated three design nodes and deleted one that
  was out of scope (§4.1.4). Fourteen participants said that alternatives led them to explore
  more (§5.3.1).
