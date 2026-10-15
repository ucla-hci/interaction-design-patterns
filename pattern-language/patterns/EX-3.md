---
id: "EX-3"
name: "Split the Claim into Checkable Parts"
level: "subtask"
role: "Expand"
role_also: "Organize"
status: "single-system"
context: ["WF-3"]
situation: "The claim is stated, and it is too broad to check in one step."
problem: "The user loses which part a check applies to, and why the check ran."
systems: ["THESEUS"]
references: ["C-4", "C-7", "C-8", "C-9", "C-17"]
aliases: ["C1"]
---

## Solution

1. Inspect the proposed parts — C-4 Persistent Structure Map, C-17 Typed Item, C-7 Attached Evidence, C-8 Confidence Cue
   - *User:* opens the rationale of a link on the map.
   - *System:* proposes a hierarchy of parts from the claim, on the [persistent structure
     map](C-4). States what a node and a link mean. Shows each part as a [typed item](C-17) with
     the same fields: what varies, what is measured, and what is assumed. To each parent-child
     link, attaches the rationale and the sources as [attached evidence](C-7), and a score with
     a [confidence cue](C-8).
2. Discuss a part — C-9 Scoped Conversation
   - *User:* selects a part, and opens a [scoped conversation](C-9) about it.
   - *System:* answers about that part and its neighbors.
3. Edit the parts — C-4 Persistent Structure Map
   - *User:* edits parts on the [persistent structure map](C-4), adds parts, and requests a
     further split of one part.
   - *System:* adds the new parts to the map.

## Examples

- *THESEUS.* A researcher enters a broad hypothesis and a decomposition depth (§4.1). THESEUS
  retrieves literature and proposes a graph of sub-hypotheses. Each one has typed fields: the
  experimental system, the variables, the controls, the measurements, and the assumptions
  (§4.1). A score on each edge shows the confidence in the split (§4). Selecting a node opens
  an evidence panel with its rationale and literature (§4.1). The researcher can add a
  sub-hypothesis, or request a further split of an approved leaf (§4.1).
