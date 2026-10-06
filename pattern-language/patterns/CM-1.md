---
id: "CM-1"
name: "Keep Candidates and Start the Next Round"
level: "subtask"
role: "Commit"
role_also: "Continue"
status: "active"
context: ["WF-A"]
situation: "The user has the candidates that pass, and wants the next round to start from them."
problem: "Kept candidates spread across views, and the next round starts from nothing."
systems: ["HALO", "HAPPIER"]
references: ["C-1", "C-12", "C-14"]
aliases: ["A6"]
---

## Solution

1. C-12 Shortlist
   - *User:* keeps a candidate.
   - *System:* gives every candidate a keep action. Shows the shortlist as its own view. It is
     the deliverable.
2. C-12 Shortlist
   - *User:* filters the shortlist by group.
   - *System:* —
3. C-14 Provenance Link
   - *User:* —
   - *System:* keeps the link on each kept candidate.
4. C-1 Inquiry Frame
   - *User:* sends a kept candidate to EX-1 as the next starting point.
   - *System:* —

## Examples

- *HAPPIER.* In the Detail Panel, a chemist bookmarks an interaction with a toggle when all
  its evidence makes sense (§5.2). Bookmark Mode shows a personal graph of the bookmarked
  interactions. Checkboxes filter it by subgraph, and a click opens the Detail Panel again
  (§5.2.1). The chemist finalizes the curated set there (§5.2.1).
- *HALO.* In MolSynthesis, saving an edited molecule adds a node to the trajectory tree. An
  edit edge connects the node to its source (§4.3). The new node can start the next round of
  generation (§4.3).
