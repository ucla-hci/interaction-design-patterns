---
id: "FR-1"
name: "State the Start and the Criteria"
level: "subtask"
role: "Frame"
status: "active"
context: ["WF-A"]
situation: "Before the search, the user has a starting point and the criteria that candidates must satisfy."
problem: "The criteria stay in the notes of the user or in separate tools, where generation and checks cannot read them."
systems: ["HALO", "HAPPIER"]
references: ["C-1"]
aliases: ["A1"]
---

## Solution

1. C-1 Inquiry Frame
   - *User:* enters the starting point, and one value per criterion, each in the format of the
     domain.
   - *System:* shows one field for the starting point and one per criterion. Flags a field
     that a later subtask requires.
2. C-1 Inquiry Frame
   - *User:* —
   - *System:* keeps the fields visible. EX-1, OR-1, and EV-1 read them.

## Examples

- *HAPPIER.* A medicinal chemist enters three inputs: an initial protein, a desired
  therapeutic impact, and a ligand (§5.1.1, §5.2). Each input serves one criterion. The
  protein centers the interaction graph, the impact drives the impact score, and the ligand
  drives the docking simulation (§5.1.1). The study task used MAPT, "to phosphorylate MAPT",
  and Roscovitine (§6.2).
- *HALO.* A chemist starts from one initial molecule, the root of the trajectory map (§4.1).
  In the study, the task set four target properties, with a known trade-off between PlogP and
  liver toxicity (§5.1.1). The paper shows no form for the criteria. This instance is weak.
