---
id: "WF-C"
name: "Decompose and Verify"
level: "workflow"
status: "active"
context: []
situation: "The user checks a claim with evidence that arrives one piece at a time."
problem: "One check does not settle the claim, and the user loses which check applies to which part, and why it ran."
systems: ["THESEUS"]
references: ["FR-2", "EX-3", "EV-3", "EV-4", "CM-2", "CN-1"]
aliases: []
---

## Solution

Support this sequence of subtasks:

```mermaid
flowchart LR
FR2["FR-2 State the Claim"] --> EX3["EX-3 Split the Claim into Checkable Parts"]
EX3 --> EV3["EV-3 Collect Evidence for Each Part"]
EV3 --> EV4["EV-4 Judge Each Part Against Its Evidence"]
EV4 --> CM2["CM-2 Accept or Reject Proposed Revisions"]
CM2 --> CN1["CN-1 Propose Next Steps from Open Items"]
CN1 -- "more evidence" --> EV3
CN1 -- "replacement part" --> EX3
EX3 -- "decompose a part further" --> EX3
```

1. FR-2 State the Claim. The user states the claim to check.
2. EX-3 Split the Claim into Checkable Parts. The system proposes parts with rationale. The user
   edits the structure.
3. EV-3 Collect Evidence for Each Part. The user edits a procedure per part, runs it, and reports
   outcomes.
4. EV-4 Judge Each Part Against Its Evidence. The system reports what the outcome does to that
   part.
5. CM-2 Accept or Reject Proposed Revisions. The judgement becomes proposed changes to the parts.
6. CN-1 Propose Next Steps from Open Items. An open part becomes another check or a replacement
   part.

## Examples

Built from the subtask Examples: the site shows one table per system, a row per subtask.
