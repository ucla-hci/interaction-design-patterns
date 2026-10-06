---
id: "WF-B"
name: "Multi-Viewpoint Refinement"
level: "workflow"
status: "active"
context: []
situation: "The user develops a claim, and tests it against viewpoints that differ from the user's own."
problem: "People who hold other viewpoints are hard to reach, and generated viewpoints read alike and cite nothing."
systems: ["PerspectEvolver"]
references: ["FR-2", "EX-2", "EV-2", "SY-2", "CM-2", "CN-1"]
aliases: []
---

## Solution

Support this sequence of subtasks:

```mermaid
flowchart LR
FR2["FR-2 State the Claim"] --> EX2["EX-2 Build Contrasting Viewpoints"]
EX2 --> EV2["EV-2 Discuss One Question Across Viewpoints"]
EV2 <--> SY2["SY-2 Summarize the Discussion"]
SY2 --> CM2["CM-2 Accept or Reject Proposed Revisions"]
CM2 --> CN1["CN-1 Propose Next Steps from Open Items"]
CN1 -- "next question" --> EV2
CN1 -- "viewpoint no longer fits" --> EX2
CM2 -- "revision changes the claim" --> FR2
```

1. FR-2 State the Claim. The user states the claim and its basis.
2. EX-2 Build Contrasting Viewpoints. The system builds viewpoints from source material. The
   user keeps a working set.
3. EV-2 Discuss One Question Across Viewpoints. Each contribution names its viewpoint.
4. SY-2 Summarize the Discussion. The system records what holds, what conflicts, and what stays
   open.
5. CM-2 Accept or Reject Proposed Revisions. The record becomes proposed revisions to the
   viewpoints and the claim.
6. CN-1 Propose Next Steps from Open Items. Each open item becomes a proposed next question.

## Examples

Built from the subtask Examples: the site shows one table per system, a row per subtask.
