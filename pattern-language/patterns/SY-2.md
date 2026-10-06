---
id: "SY-2"
name: "Summarize the Discussion"
level: "subtask"
role: "Synthesize"
status: "single-system"
context: ["WF-B"]
situation: "After a discussion, the user needs to know what it settled and what stays open."
problem: "A finished discussion is long, and the user must read it again to find what it settled."
systems: ["PerspectEvolver"]
references: ["C-6", "C-7"]
aliases: ["B3"]
---

## Solution

1. (no component)
   - *User:* requests a record.
   - *System:* records what holds, what conflicts, and what stays open. Keeps a conflict as a
     conflict.
2. C-7 Attached Evidence
   - *User:* —
   - *System:* links each entry to its contributions and evidence.
3. C-6 Detail on Demand
   - *User:* selects an entry.
   - *System:* opens the contributions of the entry.
4. (no component)
   - *User:* continues the discussion, and requests another record.
   - *System:* keeps both records.

## Examples

- *PerspectEvolver.* Selecting Synthesize produces a Working Synthesis of the discussion so
  far: findings, limitations, unresolved disagreements, and open questions (§4.2.3).
  Unresolved differences stay explicit, and findings keep their literature links (§4.2.3).
  When the discussion supports a testable hypothesis, the thread stores a Prediction, its
  Limitations, and an Evaluation Plan (§4.2.3). The researcher can return to the thread,
  extend it, and synthesize again (§4.2.3).
