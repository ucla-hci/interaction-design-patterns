---
id: "EX-1"
name: "Generate Candidates"
level: "subtask"
role: "Expand"
status: "active"
context: ["WF-1"]
situation: "The criteria are set, and the user needs many candidates for them."
problem: "Manual search stays near familiar options, and it is slow."
systems: ["HALO", "HAPPIER"]
references: ["C-1", "C-4", "C-14"]
aliases: ["A2"]
---

## Solution

1. Request candidates — C-1 Inquiry Frame, C-4 Persistent Structure Map, C-14 Provenance Link
   - *User:* requests candidates from the starting point and criteria in the [inquiry
     frame](C-1).
   - *System:* returns a batch, not one answer. Sizes it so that the groups in OR-1 stay
     legible. Puts each candidate on the [persistent structure map](C-4), with a [provenance
     link](C-14) to the request that produced it.
2. Refine and request again — C-1 Inquiry Frame
   - *User:* edits the criteria in the [inquiry frame](C-1), and requests another batch.
   - *System:* returns the next batch in the same way.

## Examples

- *HALO.* From the initial molecule, a chemist generates dozens of candidate molecules with a
  generative model, or edits one by hand (§4.1). Each candidate appears on an interactive
  trajectory map. The map shows how the structures change, and how each change affects the
  property scores (§4.1).
- *HAPPIER.* From the initial protein, the system collects connected proteins from STRING,
  and builds subgraphs ranked by interaction potential (§5.1.1). The chemist starts on the
  first subgraph, centered on the input protein (§5.1). Each interaction in a subgraph is a
  candidate.
