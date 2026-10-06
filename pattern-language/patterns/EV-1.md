---
id: "EV-1"
name: "Check Candidates Against Every Criterion"
level: "subtask"
role: "Evaluate"
status: "active"
context: ["WF-A"]
situation: "The user has groups of candidates, and must find the ones that pass every criterion."
problem: "The user checks each criterion in a separate tool, and cannot tell when a generated score is wrong."
systems: ["HALO", "HAPPIER"]
references: ["C-5", "C-6", "C-7", "C-8"]
aliases: ["A4"]
---

## Solution

1. C-5 Multi-Criteria Encoding
   - *User:* turns criteria on and off.
   - *System:* shows every criterion on one view. Gives each criterion one visual channel and
     one toggle.
2. C-8 Confidence Cue
   - *User:* —
   - *System:* when the system generated a score, shows the cue beside it.
3. C-6 Detail on Demand
   - *User:* selects a candidate.
   - *System:* opens the detail of the candidate.
4. C-7 Attached Evidence
   - *User:* reads the evidence for each score.
   - *System:* shows the evidence in the detail.
5. C-5 Multi-Criteria Encoding
   - *User:* rejects candidates, then goes back to OR-1 for the next group.
   - *System:* —

## Examples

- *HAPPIER.* A chemist applies the three criteria in the graph, all at once or one at a time
  (§5.1). Edge thickness shows interaction potential, edge color shows therapeutic impact,
  and node color shows docking potential (§5.1). Clicking an interaction opens the Detail
  Panel. It shows the explanation for the impact score with its papers, and a 3D docking
  simulation with the input ligand (§5.2).
- *HALO.* In MolStrategy, the candidates tab lists every member of a cluster in a sortable
  table. It shows each property value, and the change from the initial molecule (§4.2). The
  overview tab gives a generated summary of the strengths and weaknesses of the cluster
  (§4.2).
