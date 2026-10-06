---
id: "WF-A"
name: "Guided Candidate Search"
level: "workflow"
status: "active"
context: []
situation: "The user must find candidates that satisfy several criteria at once."
problem: "The space is too large to search by hand, and the user checks each criterion in a separate tool, one candidate at a time."
systems: ["HALO", "HAPPIER"]
references: ["FR-1", "EX-1", "OR-1", "EV-1", "SY-1", "CM-1"]
aliases: []
---

## Solution

Support this sequence of subtasks:

```mermaid
flowchart LR
FR1["FR-1 State the Start and the Criteria"] --> EX1["EX-1 Generate Candidates"]
EX1 --> OR1["OR-1 Group Candidates by Criteria"]
OR1 <--> EV1["EV-1 Check Candidates Against Every Criterion"]
EV1 <--> SY1["SY-1 Combine Partial Candidates (optional)"]
EV1 --> CM1["CM-1 Keep Candidates and Start the Next Round"]
SY1 --> CM1
CM1 -- "kept candidate starts next batch" --> EX1
```

1. FR-1 State the Start and the Criteria. The user gives the starting point and each criterion.
2. EX-1 Generate Candidates. The system returns a batch of candidates from the criteria.
3. OR-1 Group Candidates by Criteria. The system groups candidates by their scores.
4. EV-1 Check Candidates Against Every Criterion. The user checks groups and candidates.
5. SY-1 Combine Partial Candidates. Optional. Include it when the domain lets candidates combine.
6. CM-1 Keep Candidates and Start the Next Round. A kept candidate starts the next round.

## Examples

Built from the subtask Examples: the site shows one table per system, a row per subtask.
