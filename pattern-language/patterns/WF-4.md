---
id: "WF-4"
name: "Decompose, Vary, and Compose"
level: "workflow"
status: "active"
context: []
situation: "The user develops a rough claim into a complete statement, one part at a time."
problem: "In one linear document, the user develops one version of each part, and does not see how the parts fit together."
systems: ["IdeaSynth"]
references: ["FR-2", "FR-3", "EX-3", "EX-4", "EV-5", "OR-2", "SY-3"]
aliases: []
---

## Solution

Support this sequence of subtasks:

```mermaid
flowchart LR
FR2["FR-2 State the Claim"] --> FR3["FR-3 Collect the Sources"]
FR3 --> EX3["EX-3 Split the Claim into Parts"]
EX3 <--> EX4["EX-4 Generate Alternatives to a Part"]
EX4 <--> EV5["EV-5 Relate the Sources to the Parts"]
EV5 <--> OR2["OR-2 Link Parts and Check Each Link"]
OR2 --> SY3["SY-3 Compose Selected Parts"]
SY3 -- "user wants another composition → the parts" --> EX3
```

1. FR-2 State the Claim. The user states the claim in a first part.
2. FR-3 Collect the Sources. The user adds the sources that later subtasks can use.
3. EX-3 Split the Claim into Parts. The user and the system add parts of different kinds.
4. EX-4 Generate Alternatives to a Part. The system proposes other versions of one part.
5. EV-5 Relate the Sources to the Parts. The system links source sections to each part.
6. OR-2 Link Parts and Check Each Link. The system scores how well two linked parts fit.
7. SY-3 Compose Selected Parts. The system writes one document from the parts that the user
   selects.

## Examples

Built from the subtask Examples: the site shows one table per system, a row per subtask.
