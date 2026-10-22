---
id: "EX-3"
name: "Split the Claim into Parts"
level: "subtask"
role: "Expand"
role_also: "Organize"
status: "active"
context: ["WF-3", "WF-4"]
situation: "The claim is stated, and it is too broad to check or to develop in one step."
problem: "The user works on the whole claim at once, and cannot tell which part a check or a change applies to."
systems: ["THESEUS", "IdeaSynth"]
references: ["C-4", "C-7", "C-8", "C-9", "C-17"]
aliases: ["C1"]
---

## Solution

1. Get the parts — C-4 Persistent Structure Map, C-17 Typed Item, C-7 Attached Evidence, C-8 Confidence Cue
   - *User:* adds a part by hand, or requests parts from the claim or from one part. Opens the
     rationale of a link on the map.
   - *System:* proposes parts on the [persistent structure map](C-4), linked to the part that
     they come from. States what a node and a link mean. Shows each part as a [typed
     item](C-17). To each link, attaches the rationale and the sources as [attached
     evidence](C-7), and a score with a [confidence cue](C-8).
2. Discuss a part — C-9 Scoped Conversation
   - *User:* selects a part, and opens a [scoped conversation](C-9) about it.
   - *System:* answers about that part and its neighbors.
3. Edit the parts — C-4 Persistent Structure Map
   - *User:* edits parts on the [persistent structure map](C-4), and removes parts.
   - *System:* updates the map.

## Examples

- *THESEUS.* A researcher enters a broad hypothesis and a decomposition depth (§4.1). THESEUS
  retrieves literature and proposes a graph of sub-hypotheses. Each one has typed fields: the
  experimental system, the variables, the controls, the measurements, and the assumptions
  (§4.1). A score on each edge shows the confidence in the split (§4). Selecting a node opens
  an evidence panel with its rationale and literature (§4.1). The researcher can add a
  sub-hypothesis, or request a further split of an approved leaf (§4.1).
- *IdeaSynth.* A researcher puts the initial idea in a "Problem Description and RQ" node
  (§4.1.2, Fig. 4 ①). The arrow menus of a node generate nodes of the other facet types:
  design, evaluation method, and contribution, with an optional prompt (§4.1.4, §4.2,
  Fig. 5 ⑤). New nodes are colour-coded by type and linked to their origin, in a tree (§4.1.4,
  §4.2). The researcher can also create a node by hand, of any type (§4.2). Eleven participants
  said that the split into facets helped them expand the idea (§5.3.2). IdeaSynth has no scoped
  conversation and no rationale on a split link.
