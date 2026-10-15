---
id: "SY-1"
name: "Combine Partial Candidates"
level: "subtask"
role: "Synthesize"
status: "single-system"
context: ["WF-1"]
situation: "Some groups pass only some criteria, and the user wants new candidates that combine their strengths."
problem: "The user must find why each group fails, and must combine partial successes by hand."
systems: ["HALO"]
references: ["C-10", "C-14"]
aliases: ["A5"]
---

## Solution

1. Apply an option — C-10 Proposal Set
   - *User:* applies an option.
   - *System:* for each group, reports what its candidates share, and what corrects the failed
     criteria. Shows options within one group and across groups. When the user applies one,
     edits the candidate, and shows the gain and the loss on every criterion at once.
2. Choose a direction — C-10 Proposal Set
   - *User:* chooses a direction.
   - *System:* reduces the number of open options.
3. Save the candidate — C-14 Provenance Link
   - *User:* saves the candidate.
   - *System:* creates a candidate linked to its source.

## Examples

- *HALO.* In MolStrategy, the strategies tab suggests which fragments of the cluster members
  to change, to correct the worsened properties (§4.2). MolSynthesis lists strategies within
  one cluster and across clusters, each with an explanation (§4.3). Clicking a strategy
  updates the molecule in the editor. The property scores below it show gains in green and
  losses in red, and the chemist refines until more properties pass (§4.3). Saving adds a node
  with an edit edge to its source (§4.3). Participants found the strategy list too long
  (§5.2.3).
