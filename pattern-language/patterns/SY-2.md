---
id: "SY-2"
name: "Summarize the Discussion"
level: "subtask"
role: "Synthesize"
status: "single-system"
context: ["WF-2"]
situation: "After a discussion, the user needs to know what it settled and what stays open."
problem: "A finished discussion is long, and the user must read it again to find what it settled."
systems: ["PerspectEvolver"]
references: ["C-6", "C-7"]
aliases: ["B3"]
---

## Example

- `figures/SY-2/1-perspectevolver.png` PerspectEvolver Fig. 1, callout 2: a thread, and its Working Synthesis

1. Request a record. The user requests a record (Synthesize). The system records what holds, what
   conflicts, and what stays open (Working Synthesis: Hypothesis, Insights, Agreement,
   Disagreement, Open question). Each entry names its contributors (P1, P2, P3).
2. Open an entry. The user selects an entry, and reads its contributions (not in the figure).
3. Continue and record again. The user continues the discussion, and requests another record
   (§4.2.3; not in the figure).

## Solution

1. Request a record — C-7 Attached Evidence
   - *User:* requests a record.
   - *System:* records what holds, what conflicts, and what stays open. Keeps a conflict as a
     conflict. Links each entry to its contributions, and attaches the [evidence](C-7).
2. Open an entry — C-6 Detail on Demand
   - *User:* selects an entry.
   - *System:* opens the [detail](C-6) of the entry: its contributions.
3. Continue and record again — (no component)
   - *User:* continues the discussion, and requests another record.
   - *System:* keeps both records.

## Examples

- *PerspectEvolver.* Selecting Synthesize produces a Working Synthesis of the discussion so
  far: findings, limitations, unresolved disagreements, and open questions (§4.2.3).
  Unresolved differences stay explicit, and findings keep their literature links (§4.2.3).
  When the discussion supports a testable hypothesis, the thread stores a Prediction, its
  Limitations, and an Evaluation Plan (§4.2.3). The researcher can return to the thread,
  extend it, and synthesize again (§4.2.3).
